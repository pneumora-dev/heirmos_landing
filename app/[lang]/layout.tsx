import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import Script from "next/script";
import "../globals.css";

// Microsoft Clarity — LANDING ONLY. Never on the logged-in dashboard
// (session replay would record private memory content = SPEC §7 violation).
// This marketing site has no auth/memory content, so it's safe here.
// Production-gated so preview/dev traffic doesn't pollute analytics.
const CLARITY_PROJECT_ID = "x7svjf45dv";
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
        {process.env.VERCEL_ENV === "production" ? (
          <Script id="ms-clarity" strategy="afterInteractive">
            {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${CLARITY_PROJECT_ID}");`}
          </Script>
        ) : null}
      </body>
    </html>
  );
}
