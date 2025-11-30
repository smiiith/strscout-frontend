import * as React from "react";

interface HostAssistEarlyAccessEmailProps {
  name: string;
  email: string;
  propertyCount: string;
  message?: string;
}

export const HostAssistEarlyAccessEmailTemplate: React.FC<
  Readonly<HostAssistEarlyAccessEmailProps>
> = ({ name, email, propertyCount, message }) => (
  <div>
    <h1 style={{ fontSize: "24px", marginBottom: "20px" }}>
      🏠 Host Assist Early Access Request
    </h1>

    <div style={{ marginBottom: "15px" }}>
      <strong>Name:</strong> {name}
    </div>

    <div style={{ marginBottom: "15px" }}>
      <strong>Email:</strong> {email}
    </div>

    <div style={{ marginBottom: "15px" }}>
      <strong>Properties Managed:</strong> {propertyCount}
    </div>

    {message && (
      <>
        <div style={{ marginBottom: "15px" }}>
          <strong>Hosting Challenges:</strong>
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
      </>
    )}
  </div>
);
