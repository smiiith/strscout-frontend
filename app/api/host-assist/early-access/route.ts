import { HostAssistEarlyAccessEmailTemplate } from "@/components/email/host-assist-early-access";
import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, propertyCount, message } = body;

    if (!name || !email || !propertyCount) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Get recipient emails from environment variables
    // Reusing CONTACT_FORM_RECIPIENTS for now, but you can create a separate HOST_ASSIST_RECIPIENTS if needed
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
      from: "STR Sage Host Assist <contact@strsage.com>",
      to: recipients,
      replyTo: email,
      subject: "🏠 Host Assist Early Access Request",
      react: HostAssistEarlyAccessEmailTemplate({
        name,
        email,
        propertyCount,
        message
      }),
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Host Assist early access email error:", error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
