import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET(request: NextRequest) {
  try {
    console.log("Testing Resend API...");
    console.log("API Key present:", !!process.env.RESEND_API_KEY);

    // Use Resend's onboarding domain for testing
    const fromEmail = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";

    const testEmail = await resend.emails.send({
      from: fromEmail,
      to: "your-email@example.com", // CHANGE THIS TO YOUR EMAIL
      subject: "Test Email from STR Feedback Genius",
      html: "<p>This is a test email. If you receive this, Resend is working!</p>",
    });

    console.log("Test email response:", testEmail);

    if (testEmail.error) {
      return NextResponse.json(
        {
          success: false,
          error: testEmail.error,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      emailId: testEmail.data?.id,
      message: "Test email sent successfully! Check your inbox.",
    });
  } catch (error: any) {
    console.error("Test email error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}
