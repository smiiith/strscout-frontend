import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { createClient } from '@/utils/supabase/server';

const resend = new Resend(process.env.RESEND_API_KEY);

interface CampaignRecipient {
  email: string;
  [key: string]: string; // Allow any additional template variables
}

export async function POST(request: NextRequest) {
  try {
    // Check if user is admin
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check admin status
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('is_admin')
      .eq('id', user.id)
      .single();

    if (profileError || !profile?.is_admin) {
      return NextResponse.json({ error: 'Forbidden - Admin access required' }, { status: 403 });
    }

    // Parse request body
    const body = await request.json();
    const { templateId, templateHtml, recipients, fromEmail, fromName, subject } = body;

    if (!recipients || !Array.isArray(recipients) || recipients.length === 0) {
      return NextResponse.json(
        { error: 'Missing required field: recipients' },
        { status: 400 }
      );
    }

    if (!templateHtml && !templateId) {
      return NextResponse.json(
        { error: 'Either templateHtml or templateId must be provided' },
        { status: 400 }
      );
    }

    // Validate recipients
    for (const recipient of recipients) {
      if (!recipient.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(recipient.email)) {
        return NextResponse.json(
          { error: `Invalid email address: ${recipient.email}` },
          { status: 400 }
        );
      }
    }

    const results = {
      successful: [] as string[],
      failed: [] as { email: string; error: string }[],
    };

    // Function to replace template variables with actual values
    // Supports: {{{variable}}}, {{variable}}, or {variable}
    const replaceTemplateVariables = (html: string, variables: Record<string, string>): string => {
      let result = html;
      Object.entries(variables).forEach(([key, value]) => {
        // Handle triple {{{variable}}}, double {{variable}}, and single {variable} curly braces
        // Use case-insensitive matching to handle Firstname vs firstname
        // IMPORTANT: Escape curly braces in regex - \{ and \}
        // Try triple first, then double, then single (most specific to least specific)
        const regexTriple = new RegExp(`\\{\\{\\{\\s*${key}\\s*\\}\\}\\}`, 'gi');
        const regexDouble = new RegExp(`\\{\\{\\s*${key}\\s*\\}\\}`, 'gi');
        const regexSingle = new RegExp(`\\{\\s*${key}\\s*\\}`, 'gi');

        result = result.replace(regexTriple, value);
        result = result.replace(regexDouble, value);
        result = result.replace(regexSingle, value);
      });
      return result;
    };

    // If using Resend template, fetch it once before the loop
    let fetchedTemplateContent = '';
    if (templateId && !templateHtml) {
      try {
        const templateResponse = await fetch(`https://api.resend.com/templates/${templateId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
            'Content-Type': 'application/json',
          },
        });

        if (!templateResponse.ok) {
          const errorText = await templateResponse.text();
          console.error('Failed to fetch template:', templateResponse.status, errorText);
          return NextResponse.json(
            { error: `Failed to fetch template: ${errorText}` },
            { status: 500 }
          );
        }

        const templateData = await templateResponse.json();
        fetchedTemplateContent = templateData.html || templateData.content || '';

        if (!fetchedTemplateContent) {
          return NextResponse.json(
            { error: 'Template has no HTML content' },
            { status: 400 }
          );
        }
      } catch (err: any) {
        console.error('Template fetch error:', err);
        return NextResponse.json(
          { error: `Failed to fetch template: ${err.message}` },
          { status: 500 }
        );
      }
    }

    // Helper function to delay between requests
    const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    // Send emails one by one with rate limiting (max 2 per second)
    for (let i = 0; i < recipients.length; i++) {
      const recipient = recipients[i];
      const { email, ...templateVariables } = recipient;

      try {
        const emailData: any = {
          from: fromName ? `${fromName} <${fromEmail || 'onboarding@resend.dev'}>` : fromEmail || 'onboarding@resend.dev',
          to: email,
          subject: subject || 'Special Offer',
        };

        // Use template content (custom HTML or fetched from Resend)
        const htmlContent = templateHtml || fetchedTemplateContent;
        if (htmlContent) {
          emailData.html = replaceTemplateVariables(htmlContent, templateVariables);
        }

        // Send individual email
        const { data, error } = await resend.emails.send(emailData);

        if (error) {
          console.error('Send error for', email, ':', error);
          results.failed.push({
            email,
            error: error.message || 'Send failed',
          });
        } else {
          results.successful.push(email);
        }

        // Respect Resend's rate limit: 2 requests per second
        // Wait 600ms between sends (allows ~1.6 emails/sec to be safe)
        if (i < recipients.length - 1) {
          await delay(600);
        }
      } catch (emailError: any) {
        console.error('Email send exception for', email, ':', emailError);
        results.failed.push({
          email,
          error: emailError.message || 'Send failed',
        });
      }
    }

    return NextResponse.json({
      success: true,
      results,
      summary: {
        total: recipients.length,
        successful: results.successful.length,
        failed: results.failed.length,
      },
    });
  } catch (error: any) {
    console.error('Send campaign API error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
