import type { Metadata } from "next";
import { Geist, Geist_Mono, JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local";
import { notFound } from "next/navigation";
import { Analytics } from "@vercel/analytics/next";
import { CookieConsent } from "@/components/CookieConsent";
import "../globals.css";

// Analytics — LANDING ONLY (public marketing site, no auth/memory content).
// Clarity (session replay) must NEVER touch the logged-in dashboard (§7: it would
// record private memory content). GA4 here uses standard pageviews — safe because
// landing URLs carry no memory data. Both production-gated (no preview/dev noise).
// Both are also consent-gated (CookieConsent), so they see only visitors who
// accept — Vercel Web Analytics (cookieless, no personal data) runs regardless
// and is the one source that counts every visit + referrer (2026-10-12).
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

// JetBrains Mono — kickers, step numbers, the © line (build-time self-hosted).
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

// Pretendard Variable — Korean-first display/body. Self-hosted (no third-party
// runtime request, GDPR-clean). The constellation canvas reads --font-pretendard.
const pretendard = localFont({
  src: "../fonts/PretendardVariable.woff2",
  variable: "--font-pretendard",
  display: "swap",
  weight: "45 920",
});

// Canonical host. The apex 308-redirects to www (Vercel domain config), so every
// canonical / hreflang / og:url must name www — otherwise crawlers see a canonical
// that itself redirects (observed live 2026-10-12).
const SITE = "https://www.heirmos.com";

// Search Console / Naver Search Advisor ownership tokens — set in the Vercel
// project env; the tags are emitted only when present.
const GOOGLE_SITE_VERIFICATION = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;
const NAVER_SITE_VERIFICATION = process.env.NEXT_PUBLIC_NAVER_SITE_VERIFICATION;

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
      images: [{ url: `/brand/og-${locale}.png`, width: 1200, height: 630, alt: t.meta.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: t.meta.title,
      description: t.meta.description,
      images: [`/brand/og-${locale}.png`],
    },
    robots: { index: true, follow: true },
    verification: {
      google: GOOGLE_SITE_VERIFICATION,
      other: NAVER_SITE_VERIFICATION ? { "naver-site-verification": NAVER_SITE_VERIFICATION } : undefined,
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
      className={`${pretendard.variable} ${geistSans.variable} ${geistMono.variable} ${jetbrainsMono.variable} h-full`}
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
        {/* Cookieless visit + referrer counts (sends only in production builds). */}
        <Analytics />
      </body>
    </html>
  );
}
