"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

const KEY = "heirmos_cookie_consent"; // "granted" | "denied"
type Consent = "granted" | "denied" | null;

type Dict = { text: string; accept: string; decline: string };

/** Opt-in cookie consent (GDPR/ePrivacy): GA4 + Clarity load ONLY after the user
 *  accepts — nothing tracks before consent. Choice persists in localStorage.
 *  `enabled` gates the whole thing to production (no banner/trackers in dev/preview). */
export function CookieConsent({
  enabled,
  dict,
  clarityId,
  gaId,
}: {
  enabled: boolean;
  dict: Dict;
  clarityId: string;
  gaId: string;
}) {
  const [consent, setConsent] = useState<Consent>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let v: Consent = null;
    try {
      const s = window.localStorage.getItem(KEY);
      if (s === "granted" || s === "denied") v = s;
    } catch {}
    setConsent(v);
    setReady(true);
  }, []);

  if (!enabled || !ready) return null;

  const decide = (v: "granted" | "denied") => {
    try {
      window.localStorage.setItem(KEY, v);
    } catch {}
    setConsent(v);
  };

  return (
    <>
      {consent === "granted" ? (
        <>
          <Script id="ms-clarity" strategy="afterInteractive">
            {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${clarityId}");`}
          </Script>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
          <Script id="ga4" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${gaId}');`}
          </Script>
        </>
      ) : null}
      {consent === null ? (
        <div
          role="dialog"
          aria-live="polite"
          className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-[#0b1020]/95 px-4 py-3 backdrop-blur"
        >
          <div className="mx-auto flex max-w-3xl flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs leading-relaxed text-zinc-300">{dict.text}</p>
            <div className="flex shrink-0 gap-2">
              <button
                onClick={() => decide("denied")}
                className="rounded-md border border-white/15 px-3 py-1.5 text-xs font-medium text-zinc-300 transition-colors hover:bg-white/5"
              >
                {dict.decline}
              </button>
              <button
                onClick={() => decide("granted")}
                className="rounded-md bg-white px-3 py-1.5 text-xs font-semibold text-zinc-900 transition-colors hover:bg-zinc-200"
              >
                {dict.accept}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
