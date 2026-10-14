import {
  ArrowRight,
  Download,
  FolderTree,
  History,
  Lock,
  Plug,
  Search,
  Zap,
} from "lucide-react";
import { notFound } from "next/navigation";
import {
  defaultLocale,
  getDictionary,
  isLocale,
  locales,
  type Dictionary,
  type Locale,
} from "../../lib/i18n";
import { HeroConstellation } from "@/components/HeroConstellation";

const SITE = "https://www.heirmos.com";
const DASHBOARD_URL = "https://dashboard.heirmos.com";
// CTA links go to /login with utm_* so the dashboard's Web Analytics can count
// which button brought the visit (signed-in visitors are sent straight in).
const ctaUrl = (content: "nav" | "hero" | "final" | "footer", locale: string) =>
  `${DASHBOARD_URL}/login?utm_source=landing&utm_medium=cta&utm_content=${content}&utm_campaign=${locale}`;
const GUIDE_URL = "https://dashboard.heirmos.com/guide";
const CONTACT_EMAIL = "team.pneumora@gmail.com";

// Labels drawn on the constellation canvas (one node per AI).
const AIS = ["Claude", "ChatGPT", "Grok", "Gemini", "Codex"];

// Feature/step copy lives in the dictionary; icons are matched here by key.
const FEATURE_ICONS = {
  instant: Zap,
  connect: Plug,
  folder: FolderTree,
  import: Download,
  version: History,
  isolation: Lock,
} as const;

/** The demo scene: a drawn `/q` phone screen next to an AI chat that answers
 *  from that note. Pure markup (no screenshot) so it stays crisp, translatable,
 *  and can never leak a real note — every string comes from the dictionary. */
function DemoScene({ d }: { d: Dictionary["demo"] }) {
  return (
    <div className="mt-14 grid items-center gap-8 md:grid-cols-[minmax(0,320px)_minmax(0,1fr)] md:gap-12">
      {/* Phone — mirrors the real /q layout: header, open note, recent list */}
      <div className="mx-auto w-full max-w-[320px] rounded-[42px] border border-white/10 bg-[#0b0e1c] p-3 shadow-[0_30px_80px_-30px_rgba(91,141,239,0.55)]">
        <div className="overflow-hidden rounded-[32px] bg-white text-zinc-900">
          <div className="flex items-center justify-between px-5 pt-5 pb-3">
            <span className="text-[15px] font-semibold">{d.phoneTitle}</span>
            <span className="flex items-center gap-1.5 text-[11.5px] text-emerald-600">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              {d.phoneSaved}
            </span>
          </div>
          <div className="mx-4 min-h-[188px] whitespace-pre-line rounded-2xl bg-zinc-50 px-4 py-3.5 text-[14px] leading-[1.7] text-zinc-800">
            {d.phoneNote}
            <span className="ml-0.5 inline-block h-[17px] w-[1.5px] translate-y-[3px] animate-pulse bg-[#5B8DEF]" />
          </div>
          <div className="px-5 pt-5 pb-6">
            <div className="text-[11.5px] font-medium text-zinc-400">{d.phoneRecent}</div>
            <ul className="mt-2 divide-y divide-zinc-100">
              {d.phoneRecentItems.map((it) => (
                <li key={it.title} className="flex items-center justify-between py-2.5 text-[13px]">
                  <span className="truncate text-zinc-700">{it.title}</span>
                  <span className="ml-3 shrink-0 text-[11.5px] text-zinc-400">{it.when}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Chat — the AI answers from the note above */}
      <div className="rounded-3xl border border-white/[0.08] bg-white/[0.025] p-6 md:p-8">
        <div className="ml-auto max-w-[88%] rounded-2xl rounded-br-md bg-[#5B8DEF] px-4 py-3 text-[15px] leading-relaxed text-white">
          {d.chatUser}
        </div>
        <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-[#8B6BFF]/30 bg-[#8B6BFF]/10 px-3 py-1 text-[12px] text-[#C9BEFF]">
          <Search className="h-3.5 w-3.5" />
          {d.chatTool}
        </div>
        <div className="mt-3 max-w-[92%] rounded-2xl rounded-bl-md bg-white/[0.06] px-4 py-3 text-[15px] leading-[1.7] text-[#D6DEF5]">
          {d.chatAi}
        </div>
      </div>
    </div>
  );
}

function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/brand/heirmos-mark-dark.svg"
        alt=""
        className="h-[26px] w-auto"
        width={26}
        height={31}
      />
      <span className="text-lg font-bold tracking-tight text-white">Heirmos</span>
    </span>
  );
}

function CtaButton({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost";
}) {
  const base =
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full px-6 py-3.5 text-[15px] transition-all";
  const styles =
    variant === "primary"
      ? "font-semibold text-[#05060f] bg-gradient-to-r from-[#7FB0FF] to-[#5B8DEF] shadow-[0_10px_34px_-10px_rgba(91,141,239,0.7)] hover:brightness-110"
      : "font-medium text-[#D6DEF5] border border-white/15 bg-white/[0.03] hover:bg-white/[0.06]";
  return (
    <a href={href} className={`${base} ${styles}`}>
      {children}
    </a>
  );
}

function LangSwitch({
  locale,
  label,
  ko,
  en,
}: {
  locale: Locale;
  label: string;
  ko: string;
  en: string;
}) {
  const opts: { code: Locale; text: string }[] = [
    { code: "ko", text: ko },
    { code: "en", text: en },
  ];
  return (
    <div
      role="group"
      aria-label={label}
      className="flex items-center rounded-full border border-white/10 bg-white/5 p-0.5 text-xs"
    >
      {opts.map(({ code, text }) => {
        const active = code === locale;
        return (
          <a
            key={code}
            href={`/${code}`}
            hrefLang={code}
            aria-current={active ? "true" : undefined}
            className={`rounded-full px-2.5 py-1 font-medium transition-colors ${
              active ? "bg-white/15 text-white" : "text-zinc-400 hover:text-white"
            }`}
          >
            {text}
          </a>
        );
      })}
    </div>
  );
}

function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-4 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-[#6E8BFF]">
      {children}
    </div>
  );
}

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const locale: Locale = isLocale(lang) ? lang : defaultLocale;
  const t = getDictionary(locale);

  // Structured data (schema.org) — what the product is, in machine-readable form,
  // for search engines and answer engines. Copy comes from the same dictionary as
  // the visible page so the two cannot drift. No ratings/reviews: none exist.
  const organization = {
    "@type": "Organization",
    "@id": `${SITE}/#org`,
    name: "Pneumora",
    url: SITE,
    email: CONTACT_EMAIL,
    logo: `${SITE}/brand/heirmos-icon-512.png`,
  };
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      organization,
      {
        "@type": "SoftwareApplication",
        name: "Heirmos",
        url: `${SITE}/${locale}`,
        inLanguage: locale,
        description: t.meta.description,
        applicationCategory: "ProductivityApplication",
        operatingSystem: "Web",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        featureList: t.features.map((f) => f.title),
        publisher: { "@id": organization["@id"] },
        installUrl: DASHBOARD_URL,
        softwareHelp: { "@type": "CreativeWork", url: GUIDE_URL },
      },
      {
        "@type": "WebSite",
        name: "Heirmos",
        url: SITE,
        inLanguage: locales,
        publisher: { "@id": organization["@id"] },
      },
    ],
  };

  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden">
      <script
        type="application/ld+json"
        // JSON.stringify output; `<` is escaped so the script cannot be closed early.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      {/* ── Nav ───────────────────────────────────────────────── */}
      <header className="sticky top-0 z-40 border-b border-white/[0.06] bg-[#05060f]/55 backdrop-blur-md">
        <nav className="mx-auto flex max-w-[1160px] items-center justify-between px-6 py-4">
          <Logo />
          <div className="flex items-center gap-2.5">
            <LangSwitch
              locale={locale}
              label={t.langSwitch.label}
              ko={t.langSwitch.ko}
              en={t.langSwitch.en}
            />
            <a
              href={GUIDE_URL}
              className="hidden whitespace-nowrap px-3.5 py-2 text-sm text-[#9AA6C8] hover:text-white sm:inline-block"
            >
              {t.nav.guide}
            </a>
            <a
              href={ctaUrl("nav", lang)}
              className="whitespace-nowrap rounded-full border border-white/[0.07] bg-white/[0.08] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/[0.14]"
            >
              {t.nav.dashboard}
            </a>
          </div>
        </nav>
      </header>

      <main className="flex-1">
        {/* ── Hero: living memory constellation ───────────────── */}
        <section className="relative">
          <HeroConstellation ais={AIS} className="absolute inset-0 z-0" />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-[1]"
            style={{
              background:
                "radial-gradient(120% 80% at 50% 8%, rgba(5,6,15,0) 38%, rgba(5,6,15,0.55) 100%), linear-gradient(180deg, rgba(5,6,15,0.4) 0%, rgba(5,6,15,0) 22%)",
            }}
          />
          <div className="relative z-[2] mx-auto max-w-[880px] px-6 pt-28 pb-[340px] text-center md:pt-32 md:pb-[380px]">
            <span className="mb-7 inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-[#8B6BFF]/30 bg-[#8B6BFF]/10 px-4 py-1.5 text-[12.5px] font-medium text-[#C9BEFF]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#8B6BFF] shadow-[0_0_10px_1px_#8B6BFF]" />
              {t.hero.badge}
            </span>
            <h1 className="text-balance text-[clamp(40px,7vw,78px)] font-extrabold leading-[1.04] tracking-[-0.035em] text-white">
              {t.hero.titleLine1}
              <br />
              <span className="bg-gradient-to-r from-[#8B6BFF] via-[#5B8DEF] to-[#48D7FF] bg-clip-text text-transparent">
                {t.hero.titleAccent}
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-[620px] text-pretty text-[clamp(16px,1.7vw,19px)] leading-relaxed text-[#9AA6C8]">
              {t.hero.subtitle}
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <CtaButton href={ctaUrl("hero", lang)} variant="primary">
                {t.hero.ctaPrimary}
                <ArrowRight className="h-4 w-4" />
              </CtaButton>
              <CtaButton href="#how-it-works" variant="ghost">
                {t.hero.ctaGhost}
              </CtaButton>
            </div>
          </div>
        </section>

        {/* ── Demo: write on the phone, the AI reads it ───────── */}
        <section id="how-it-works" className="border-t border-white/[0.06]">
          <div className="mx-auto max-w-[1000px] px-6 py-24 md:py-28">
            <div className="mx-auto max-w-[620px] text-center">
              <Kicker>{t.demo.kicker}</Kicker>
              <h2 className="text-balance text-[clamp(27px,4vw,42px)] font-bold leading-[1.2] tracking-[-0.025em] text-white">
                {t.demo.title}
              </h2>
              <p className="mx-auto mt-5 max-w-[520px] text-pretty text-[17px] leading-relaxed text-[#8A95B5]">
                {t.demo.body}
              </p>
            </div>
            <DemoScene d={t.demo} />
          </div>
        </section>

        {/* ── Problem ─────────────────────────────────────────── */}
        <section className="border-t border-white/[0.06]">
          <div className="mx-auto max-w-[760px] px-6 py-28 text-center">
            <Kicker>{t.problem.kicker}</Kicker>
            <h2 className="text-balance text-[clamp(27px,4vw,42px)] font-bold leading-[1.2] tracking-[-0.025em] text-[#EAEFFF]">
              {t.problem.title}
            </h2>
            <p className="mx-auto mt-5 max-w-[600px] text-pretty text-[17px] leading-[1.72] text-[#8A95B5]">
              {t.problem.body}
            </p>
          </div>
        </section>

        {/* ── Solution + Features ─────────────────────────────── */}
        <section className="border-t border-white/[0.06] bg-gradient-to-b from-[#8FB4FF]/[0.022] to-transparent">
          <div className="mx-auto max-w-[1160px] px-6 py-26 md:py-28">
            <div className="mx-auto max-w-[660px] text-center">
              <Kicker>{t.solution.kicker}</Kicker>
              <h2 className="text-balance text-[clamp(27px,4vw,42px)] font-bold leading-[1.2] tracking-[-0.025em] text-white">
                {t.solution.title}
              </h2>
              <p className="mx-auto mt-5 max-w-[520px] text-[17px] leading-relaxed text-[#8A95B5]">
                {t.solution.body}
              </p>
            </div>

            <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {t.features.map(({ key, title, body }) => {
                const Icon = FEATURE_ICONS[key as keyof typeof FEATURE_ICONS];
                return (
                  <div
                    key={key}
                    className="group rounded-2xl border border-white/[0.07] bg-white/[0.02] p-7 transition-all hover:-translate-y-0.5 hover:border-[#8FB4FF]/30 hover:bg-[#8FB4FF]/[0.045]"
                  >
                    <div className="mb-4 inline-flex rounded-xl border border-[#5B8DEF]/20 bg-[#5B8DEF]/10 p-3 text-[#9FC0FF]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-[17px] font-semibold tracking-[-0.01em] text-[#EAEFFF]">
                      {title}
                    </h3>
                    <p className="mt-2.5 text-sm leading-[1.64] text-[#828DAD]">
                      {body}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── How it works ────────────────────────────────────── */}
        <section id="how" className="border-t border-white/[0.06]">
          <div className="mx-auto max-w-[1000px] px-6 py-26 md:py-28">
            <div className="mx-auto max-w-[600px] text-center">
              <Kicker>{t.how.kicker}</Kicker>
              <h2 className="text-balance text-[clamp(27px,4vw,42px)] font-bold leading-[1.2] tracking-[-0.025em] text-white">
                {t.how.title}
              </h2>
              <p className="mx-auto mt-5 max-w-[480px] text-[17px] leading-relaxed text-[#8A95B5]">
                {t.how.body}
              </p>
            </div>
            <div className="mt-15 grid gap-8 md:grid-cols-3">
              {t.how.steps.map(({ n, title, body }) => (
                <div key={n}>
                  <div
                    className="font-mono text-5xl font-semibold text-transparent"
                    style={{ WebkitTextStroke: "1px rgba(143,180,255,0.4)" }}
                  >
                    {n}
                  </div>
                  <h3 className="mt-4 text-[19px] font-semibold tracking-[-0.01em] text-[#EAEFFF]">
                    {title}
                  </h3>
                  <p className="mt-2.5 text-[14.5px] leading-[1.66] text-[#828DAD]">
                    {body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Final CTA ───────────────────────────────────────── */}
        <section className="border-t border-white/[0.06]">
          <div className="mx-auto max-w-[1000px] px-6 pb-26 pt-22 md:pb-28">
            <div
              className="relative overflow-hidden rounded-[28px] border border-[#8B6BFF]/20 px-8 py-[76px] text-center"
              style={{
                background:
                  "radial-gradient(120% 150% at 50% -25%, rgba(91,141,239,0.24), rgba(139,107,255,0.07) 48%, rgba(5,6,15,0) 78%), rgba(255,255,255,0.018)",
              }}
            >
              <h2 className="mx-auto max-w-[640px] text-balance text-[clamp(29px,4.6vw,50px)] font-bold leading-[1.12] tracking-[-0.03em] text-white">
                {t.finalCta.title}
              </h2>
              <p className="mx-auto mt-5 max-w-[480px] text-[17px] leading-relaxed text-[#A6B0CE]">
                {t.finalCta.body}
              </p>
              <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
                <CtaButton href={ctaUrl("final", lang)} variant="primary">
                  {t.finalCta.ctaPrimary}
                  <ArrowRight className="h-4 w-4" />
                </CtaButton>
                <CtaButton href={GUIDE_URL} variant="ghost">
                  {t.finalCta.ctaGhost}
                </CtaButton>
              </div>
              <p className="mt-6 text-[13.5px] text-[#6E7693]">
                {t.finalCta.contactPre}
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="text-[#9FC0FF] underline decoration-[#9FC0FF]/35 underline-offset-2 hover:decoration-[#9FC0FF]"
                >
                  {CONTACT_EMAIL}
                </a>
                {t.finalCta.contactPost}
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* ── Footer ──────────────────────────────────────────── */}
      <footer className="border-t border-white/[0.06]">
        <div className="mx-auto flex max-w-[1160px] flex-col items-center justify-between gap-4 px-6 py-9 sm:flex-row">
          <Logo />
          <div className="flex items-center gap-6 text-sm text-[#828DAD]">
            <a href={ctaUrl("footer", lang)} className="hover:text-white">
              {t.footer.dashboard}
            </a>
            <a href={GUIDE_URL} className="hover:text-white">
              {t.footer.guide}
            </a>
            <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-white">
              {t.footer.contact}
            </a>
          </div>
          <p className="font-mono text-xs text-[#4F5670]">© 2026 Heirmos</p>
        </div>
      </footer>
    </div>
  );
}
