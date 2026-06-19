import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import { CookieConsent } from "@/components/CookieConsent";
import "../globals.css";

// Analytics — LANDING ONLY (public marketing site, no auth/memory content).
// Clarity (session replay) must NEVER touch the logged-in dashboard (§7: it would
// record private memory content). GA4 here uses standard pageviews — safe because
// landing URLs carry no memory data. Both production-gated (no preview/dev noise).
const CLARITY_PROJECT_ID = "x7svjf45dv";
const GA4_MEASUREMENT_ID = "G-CLMTJQ232S";
import {
  defaultLocale,
  getDictionary,
  isLocale,
  locales,
  type Locale,
} from "../../lib/i18n";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE = "https://heirmos.com";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : defaultLocale;
  const t = getDictionary(locale);

  // hreflang alternates so search engines surface the right language.
  const languages = Object.fromEntries(
    locales.map((l) => [l, `/${l}`]),
  ) as Record<string, string>;

  return {
    metadataBase: new URL(SITE),
    title: t.meta.title,
    applicationName: "Heirmos",
    description: t.meta.description,
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
    alternates: {
      canonical: `/${locale}`,
      languages: { ...languages, "x-default": `/${defaultLocale}` },
    },
    appleWebApp: {
      capable: true,
      title: "Heirmos",
      statusBarStyle: "black-translucent",
    },
    openGraph: {
      title: t.meta.title,
      description: t.meta.description,
      url: `${SITE}/${locale}`,
      siteName: "Heirmos",
      locale: t.ogLocale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t.meta.title,
      description: t.meta.description,
    },
  };
}

export default async function LangLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDictionary(lang);

  return (
    <html
      lang={t.htmlLang}
      className={`${geistSans.variable} ${geistMono.variable} h-full`}
    >
      <body className="min-h-full">
        {children}
        {/* Analytics load ONLY after cookie consent (GDPR opt-in); prod only. */}
        <CookieConsent
          enabled={process.env.VERCEL_ENV === "production"}
          dict={t.cookie}
          clarityId={CLARITY_PROJECT_ID}
          gaId={GA4_MEASUREMENT_ID}
        />
      </body>
    </html>
  );
}
