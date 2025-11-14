import * as React from "react";

interface ExitSurveyEmailProps {
  pagePath: string;
  selectedOption: string;
  otherText?: string | null;
  userId?: string | null;
  userAgent?: string | null;
  timestamp: string;
}

const OPTION_LABELS: Record<string, string> = {
  "price-higher": "Price is higher than I expected",
  "no-right-plan": "I couldn't find the right plan",
  "missing-data": "The report is missing specific data I need or doesn't address my primary goal",
  "payment-trouble": "I had trouble paying",
  "just-researching": "I'm just researching for now",
  "other": "Other",
};

export const ExitSurveyEmailTemplate: React.FC<
  Readonly<ExitSurveyEmailProps>
> = ({ pagePath, selectedOption, otherText, userId, userAgent, timestamp }) => (
  <div>
    <h1 style={{ fontSize: "24px", marginBottom: "20px", color: "#dc2626" }}>
      🚨 Exit Survey Response
    </h1>

    <p style={{ marginBottom: "20px", color: "#666" }}>
      A visitor on the pricing page submitted feedback about what's holding them back from purchasing.
    </p>

    <div style={{ marginBottom: "15px" }}>
      <strong>Page:</strong> {pagePath}
    </div>

    <div style={{ marginBottom: "15px" }}>
      <strong>Response:</strong> {OPTION_LABELS[selectedOption] || selectedOption}
    </div>

    {otherText && (
      <div style={{ marginBottom: "15px" }}>
        <strong>Additional Details:</strong>
        <div
          style={{
            marginTop: "8px",
            padding: "15px",
            backgroundColor: "#fef3c7",
            borderLeft: "4px solid #f59e0b",
            borderRadius: "5px",
            whiteSpace: "pre-wrap",
          }}
        >
          {otherText}
        </div>
      </div>
    )}

    <div style={{ marginBottom: "15px" }}>
      <strong>User:</strong> {userId ? `Logged in (${userId})` : "Anonymous"}
    </div>

    <div style={{ marginBottom: "15px" }}>
      <strong>Time:</strong> {timestamp}
    </div>

    {userAgent && (
      <div style={{ marginBottom: "15px", fontSize: "12px", color: "#999" }}>
        <strong>Device:</strong> {userAgent}
      </div>
    )}

    <hr style={{ margin: "20px 0", border: "none", borderTop: "1px solid #ddd" }} />

    <p style={{ fontSize: "14px", color: "#666" }}>
      <strong>Next Steps:</strong>
    </p>
    <ul style={{ fontSize: "14px", color: "#666", paddingLeft: "20px" }}>
      <li>Review this feedback and identify patterns</li>
      <li>Consider addressing common objections on the pricing page</li>
      <li>Track conversion rate changes over time</li>
    </ul>
  </div>
);
