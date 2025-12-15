import { ContactFormEmailTemplate } from "@/components/email/contact-form-notification";
import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const resend = new Resend(process.env.RESEND_API_KEY);

// Rate limiting configuration
const RATE_LIMIT_WINDOW_MINUTES = 60; // 1 hour
const MAX_SUBMISSIONS_PER_WINDOW = 3;

// Create Supabase client with service role (bypasses RLS)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function cleanupOldSubmissions(): Promise<void> {
  try {
    // Delete submissions older than 24 hours
    const threshold = new Date();
    threshold.setHours(threshold.getHours() - 24);

    const { error } = await supabase
      .from('contact_form_submissions')
      .delete()
      .lt('submitted_at', threshold.toISOString());

    if (error) {
      console.error('Error cleaning up old submissions:', error);
    }
  } catch (error) {
    console.error('Unexpected error during cleanup:', error);
  }
}

async function checkRateLimit(ip: string): Promise<boolean> {
  try {
    // Occasionally clean up old records (10% of requests)
    if (Math.random() < 0.1) {
      cleanupOldSubmissions(); // Fire and forget
    }

    // Calculate time threshold (1 hour ago)
    const timeThreshold = new Date();
    timeThreshold.setMinutes(timeThreshold.getMinutes() - RATE_LIMIT_WINDOW_MINUTES);

    // Count recent submissions from this IP
    const { data, error, count } = await supabase
      .from('contact_form_submissions')
      .select('*', { count: 'exact', head: true })
      .eq('ip_address', ip)
      .gte('submitted_at', timeThreshold.toISOString());

    if (error) {
      console.error('Rate limit check error:', error);
      // On error, allow submission (fail open)
      return true;
    }

    // Check if rate limit exceeded
    if (count !== null && count >= MAX_SUBMISSIONS_PER_WINDOW) {
      return false; // Rate limit exceeded
    }

    // Record this submission
    const { error: insertError } = await supabase
      .from('contact_form_submissions')
      .insert({ ip_address: ip });

    if (insertError) {
      console.error('Error recording submission:', insertError);
    }

    return true; // Rate limit OK
  } catch (error) {
    console.error('Unexpected error in rate limit check:', error);
    // On unexpected error, allow submission (fail open)
    return true;
  }
}

function getClientIP(request: NextRequest): string {
  // Try various headers for IP (works with Vercel, CloudFlare, etc.)
  const forwardedFor = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');
  const cfConnectingIP = request.headers.get('cf-connecting-ip');

  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim();
  }
  if (realIP) {
    return realIP;
  }
  if (cfConnectingIP) {
    return cfConnectingIP;
  }

  return 'unknown';
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message, website } = body;

    // Honeypot check - if filled, it's a bot
    if (website) {
      console.log('🤖 Bot detected via honeypot - rejecting silently');
      // Return success to fool the bot (don't reveal the trap)
      return NextResponse.json({ success: true });
    }

    // Rate limiting check
    const clientIP = getClientIP(request);
    const rateLimitOk = await checkRateLimit(clientIP);
    if (!rateLimitOk) {
      console.log(`🚫 Rate limit exceeded for IP: ${clientIP}`);
      return NextResponse.json(
        { error: "Too many submissions. Please try again later." },
        { status: 429 }
      );
    }

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Get recipient emails from environment variables
    const recipients = process.env.CONTACT_FORM_RECIPIENTS?.split(",") || [];

    if (recipients.length === 0) {
      console.error("CONTACT_FORM_RECIPIENTS not configured");
      return NextResponse.json(
        { error: "Email recipients not configured" },
        { status: 500 }
      );
    }

    // Send email to configured recipients
    const { data, error } = await resend.emails.send({
      from: "STR Sage Feedback Form <contact@strsage.com>",
      to: recipients,
      replyTo: email,
      subject: "⚠️ STR Sage User Feedback",
      react: ContactFormEmailTemplate({ name, email, message }),
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Contact form email error:", error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
