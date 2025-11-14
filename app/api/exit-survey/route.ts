import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { Resend } from "resend";
import { ExitSurveyEmailTemplate } from "@/components/email/exit-survey-notification";

const resend = new Resend(process.env.RESEND_API_KEY);

const OPTION_LABELS: Record<string, string> = {
  "price-higher": "Price is higher than I expected",
  "no-right-plan": "I couldn't find the right plan",
  "missing-data": "The report is missing specific data I need or doesn't address my primary goal",
  "payment-trouble": "I had trouble paying",
  "just-researching": "I'm just researching for now",
  "other": "Other",
};

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const body = await request.json();

    const { page_path, selected_option, other_text } = body;

    if (!page_path || !selected_option) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Get user session if logged in (optional)
    const { data: { user } } = await supabase.auth.getUser();
    const userAgent = request.headers.get("user-agent") || null;

    // Insert survey response
    const { error } = await supabase.from("exit_survey_responses").insert({
      user_id: user?.id || null,
      page_path,
      selected_option,
      other_text: other_text || null,
      user_agent: userAgent,
    });

    if (error) {
      console.error("Error inserting survey response:", error);
      return NextResponse.json(
        { error: "Failed to save response" },
        { status: 500 }
      );
    }

    // Send notifications (don't fail the request if notifications fail)
    try {
      await sendNotifications({
        pagePath: page_path,
        selectedOption: selected_option,
        otherText: other_text,
        userId: user?.id || null,
        userAgent,
        timestamp: new Date().toISOString(),
      });
    } catch (notificationError) {
      console.error("Error sending notifications:", notificationError);
      // Continue - response was saved successfully
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error processing exit survey:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

async function sendNotifications(data: {
  pagePath: string;
  selectedOption: string;
  otherText?: string | null;
  userId?: string | null;
  userAgent?: string | null;
  timestamp: string;
}) {
  const { pagePath, selectedOption, otherText, userId, userAgent, timestamp } = data;

  // Send email notification
  const emailRecipients = process.env.EXIT_SURVEY_RECIPIENTS?.split(",") || [];
  if (emailRecipients.length > 0 && process.env.RESEND_API_KEY) {
    try {
      await resend.emails.send({
        from: "STR Sage Exit Survey <contact@strsage.com>",
        to: emailRecipients,
        subject: "🚨 Exit Survey Response - Pricing Page",
        react: ExitSurveyEmailTemplate({
          pagePath,
          selectedOption,
          otherText,
          userId,
          userAgent,
          timestamp: new Date(timestamp).toLocaleString("en-US", {
            timeZone: "America/Los_Angeles",
            dateStyle: "medium",
            timeStyle: "short",
          }),
        }),
      });
      console.log("Exit survey email sent successfully");
    } catch (emailError) {
      console.error("Failed to send exit survey email:", emailError);
    }
  }

  // Send Slack notification
  const slackWebhookUrl = process.env.SLACK_WEBHOOK_URL;
  if (slackWebhookUrl) {
    try {
      const optionLabel = OPTION_LABELS[selectedOption] || selectedOption;
      const slackMessage = {
        text: "🚨 Exit Survey Response",
        blocks: [
          {
            type: "header",
            text: {
              type: "plain_text",
              text: "🚨 Exit Survey Response",
              emoji: true,
            },
          },
          {
            type: "section",
            fields: [
              {
                type: "mrkdwn",
                text: `*Page:*\n${pagePath}`,
              },
              {
                type: "mrkdwn",
                text: `*User:*\n${userId ? `Logged in (${userId})` : "Anonymous"}`,
              },
              {
                type: "mrkdwn",
                text: `*Response:*\n${optionLabel}`,
              },
              {
                type: "mrkdwn",
                text: `*Time:*\n${new Date(timestamp).toLocaleString("en-US", {
                  timeZone: "America/Los_Angeles",
                  dateStyle: "medium",
                  timeStyle: "short",
                })}`,
              },
            ],
          },
        ],
      };

      // Add additional details if provided
      if (otherText) {
        slackMessage.blocks.push({
          type: "section",
          text: {
            type: "mrkdwn",
            text: `*Additional Details:*\n${otherText}`,
          },
        } as any);
      }

      await fetch(slackWebhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(slackMessage),
      });
      console.log("Exit survey Slack notification sent successfully");
    } catch (slackError) {
      console.error("Failed to send Slack notification:", slackError);
    }
  }
}
