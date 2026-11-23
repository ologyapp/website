import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import StructuredData from "@/components/StructuredData";
import SiteAnalytics from "@/components/SiteAnalytics";
import MotionPrefs from "@/components/MotionPrefs";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const isVercelPreview =
  process.env.VERCEL_ENV && process.env.VERCEL_ENV !== "production";

export const metadata: Metadata = {
  metadataBase: new URL("https://ologyapp.com"),
  title: "Ology | Timing Intelligence for Modern Markets",
  description:
    "Ology is a behavioral timing engine for markets. It reads your Trade DNA against the current sky, market context, and your own record. Apply for beta access.",
  robots: isVercelPreview
    ? {
        index: false,
        follow: false,
      }
    : {
        index: true,
        follow: true,
      },

  alternates: {
    canonical: "/",
  },

  openGraph: {
    title: "Ology | Timing Intelligence for Modern Markets",
    description:
      "Ology is a behavioral timing engine for markets. It reads your Trade DNA against the current sky, market context, and your own record. Apply for beta access.",
    url: "https://ologyapp.com",
    siteName: "Ology",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Ology",
      },
    ],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Ology | Timing Intelligence for Modern Markets",
    description:
      "Ology is a behavioral timing engine for markets. It reads your Trade DNA against the current sky, market context, and your own record. Apply for beta access.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} scroll-smooth h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {" "}
        <StructuredData />
        <MotionPrefs>{children}</MotionPrefs>
        <SiteAnalytics />
      </body>
    </html>
  );
}
