import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, locales } from "./lib/i18n";

// Pick the best locale from the Accept-Language header, falling back to the
// default. Simple prefix match is enough for a two-locale landing page.
function pickLocale(req: NextRequest): string {
  const header = req.headers.get("accept-language");
  if (!header) return defaultLocale;
  for (const part of header.split(",")) {
    const tag = part.split(";")[0].trim().toLowerCase();
    const base = tag.split("-")[0];
    const hit = locales.find((l) => l === tag || l === base);
    if (hit) return hit;
  }
  return defaultLocale;
}

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Already prefixed with a known locale → leave it alone.
  const hasLocale = locales.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`),
  );
  if (hasLocale) return NextResponse.next();

  // Redirect bare paths (e.g. "/") to the negotiated locale.
  const locale = pickLocale(req);
  const url = req.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Skip Next internals, metadata files, and anything with a file extension
  // (brand assets, favicon, manifest, etc.).
  matcher: ["/((?!_next|.*\\..*).*)"],
};
