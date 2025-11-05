import * as React from "react";

interface ContactFormEmailProps {
  name: string;
  email: string;
  message: string;
}

export const ContactFormEmailTemplate: React.FC<
  Readonly<ContactFormEmailProps>
> = ({ name, email, message }) => (
  <div>
    <h1 style={{ fontSize: "24px", marginBottom: "20px" }}>
      STR Sage User Feedback
    </h1>

    <div style={{ marginBottom: "15px" }}>
      <strong>From:</strong> {name}
    </div>

    <div style={{ marginBottom: "15px" }}>
      <strong>Email:</strong> {email}
    </div>

    <div style={{ marginBottom: "15px" }}>
      <strong>Message:</strong>
    </div>

    <div
      style={{
        padding: "15px",
        backgroundColor: "#f5f5f5",
        borderRadius: "5px",
        whiteSpace: "pre-wrap",
      }}
    >
      {message}
    </div>
  </div>
);
