import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const DESCRIPTION =
  "Claude · ChatGPT · Grok · Gemini — 어떤 AI와 대화하든 당신이 쌓아온 기억을 그대로 이어가세요. Heirmos는 모든 AI가 공유하는 클라우드 기억 인프라입니다.";

export const metadata: Metadata = {
  metadataBase: new URL("https://heirmos.com"),
  title: "Heirmos — 하나의 기억, 모든 AI",
  applicationName: "Heirmos",
  description: DESCRIPTION,
  keywords: [
    "Heirmos",
    "AI memory",
    "MCP",
    "Claude",
    "ChatGPT",
    "persistent memory",
    "AI 기억",
    "메모리 인프라",
  ],
  // favicon.ico / icon.svg / apple-icon.png + manifest.ts in app/ are auto-linked.
  appleWebApp: { capable: true, title: "Heirmos", statusBarStyle: "black-translucent" },
  openGraph: {
    title: "Heirmos — 하나의 기억, 모든 AI",
    description: DESCRIPTION,
    url: "https://heirmos.com",
    siteName: "Heirmos",
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Heirmos — 하나의 기억, 모든 AI",
    description: DESCRIPTION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="ko"
      className={`${geistSans.variable} ${geistMono.variable} h-full`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
