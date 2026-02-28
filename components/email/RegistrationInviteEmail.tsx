import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface RegistrationInviteEmailProps {
  email: string;
  registrationUrl: string;
}

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.strsage.com";

export const RegistrationInviteEmail = ({
  email,
  registrationUrl,
}: RegistrationInviteEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Complete your registration to view your Feedback Genius report</Preview>
      <Body style={main}>
        <Container style={container}>
          <Img
            src={`${baseUrl}/STR-Feedback-Genius-Logo-single-line.png`}
            width="400"
            height="auto"
            alt="STR Feedback Genius"
            style={logo}
          />
          <Heading style={heading}>
            Your Analysis is Ready! 🎉
          </Heading>
          <Text style={paragraph}>
            Thanks for trying STR Feedback Genius! Your property analysis is
            complete, and we're excited to share the results with you.
          </Text>
          <Text style={paragraph}>
            To view your full detailed report, complete your free account by
            setting a password:
          </Text>
          <Section style={buttonContainer}>
            <Button style={button} href={registrationUrl}>
              Set Password & View Report
            </Button>
          </Section>
          <Text style={paragraph}>
            Or copy and paste this URL into your browser:
          </Text>
          <Link href={registrationUrl} style={link}>
            {registrationUrl}
          </Link>
          <Hr style={hr} />
          <Text style={paragraph}>
            <strong>What happens next:</strong>
          </Text>
          <Text style={steps}>
            1. Click the button above (your email {email} is already saved)
            <br />
            2. Set your password
            <br />
            3. Confirm your email (we'll send one more quick email)
            <br />
            4. Automatically view your complete report
          </Text>
          <Hr style={hr} />
          <Text style={paragraph}>
            <strong>Your free account includes:</strong>
          </Text>
          <Text style={bulletList}>
            • Complete detailed feedback for all 6 categories
            <br />
            • Specific improvement suggestions
            <br />
            • AI-generated title and description rewrites
            <br />
            • Up to 6 properties (free plan)
            <br />
            • 3 assessments per property per month
          </Text>
          <Hr style={hr} />
          <Text style={footer}>
            If you have any questions, please contact us at{" "}
            <Link href="mailto:info@strsage.com" style={link}>
              info@strsage.com
            </Link>
          </Text>
          <Text style={footer}>
            © 2024 STR Feedback Genius. All rights reserved.
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export default RegistrationInviteEmail;

const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0 48px",
  marginBottom: "64px",
};

const logo = {
  margin: "0 auto",
  display: "block",
  padding: "20px",
};

const heading = {
  fontSize: "32px",
  lineHeight: "1.3",
  fontWeight: "700",
  color: "#484848",
  padding: "0 20px",
};

const paragraph = {
  fontSize: "18px",
  lineHeight: "1.4",
  color: "#484848",
  padding: "0 20px",
};

const buttonContainer = {
  padding: "27px 20px",
};

const button = {
  backgroundColor: "#22c55e",
  borderRadius: "8px",
  color: "#fff",
  fontSize: "18px",
  fontWeight: "bold",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  width: "100%",
  padding: "16px 0",
};

const link = {
  color: "#22c55e",
  textDecoration: "underline",
  wordBreak: "break-all" as const,
};

const hr = {
  borderColor: "#e6ebf1",
  margin: "20px 0",
};

const steps = {
  fontSize: "16px",
  lineHeight: "1.8",
  color: "#484848",
  padding: "0 20px",
};

const bulletList = {
  fontSize: "16px",
  lineHeight: "1.8",
  color: "#484848",
  padding: "0 20px",
};

const footer = {
  color: "#8898aa",
  fontSize: "14px",
  lineHeight: "16px",
  padding: "0 20px",
};
