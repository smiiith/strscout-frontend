import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | STR Sage",
  description:
    "Get in touch with the STR Sage team. We're here to help with questions about our Airbnb listing analysis tools, market research, and subscription plans.",
  robots: {
    index: process.env.NODE_ENV === "production",
    follow: process.env.NODE_ENV === "production",
  },
  alternates: {
    canonical: "https://www.strsage.com/contact-us",
  },
  openGraph: {
    title: "Contact Us | STR Sage",
    description:
      "Get in touch with the STR Sage team. Questions about Airbnb listing analysis, market research, or pricing? We're here to help.",
    url: "https://www.strsage.com/contact-us",
    type: "website",
  },
};

export default function ContactUsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
