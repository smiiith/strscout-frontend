import { ContactFormEmailTemplate } from "@/components/email/contact-form-notification";
import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

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
