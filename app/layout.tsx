import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import StructuredData from "@/components/StructuredData";

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
  title: "Ology | Market Timing Intelligence for Modern Investors",
  description:
    "Ology synthesizes celestial cycles, behavioral psychology, and live market data into a personalized timing profile...",
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
    title: "Ology | Market Timing Intelligence for Modern Investors",
    description:
      "Ology synthesizes celestial cycles, behavioral psychology, and live market data into a personalized timing profile. Pattern over prediction. Beta opening in waves through 2026.",
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
    title: "Ology | Market Timing Intelligence for Modern Investors",
    description:
      "Ology synthesizes celestial cycles, behavioral psychology, and live market data into a personalized timing profile. Pattern over prediction. Beta opening in waves through 2026.",
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
        {children}
      </body>
    </html>
  );
}
