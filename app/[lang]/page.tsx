import {
  ArrowRight,
  FolderTree,
  History,
  Lock,
  Network,
  Plug,
  Search,
  Sparkles,
} from "lucide-react";
import { notFound } from "next/navigation";
import {
  defaultLocale,
  getDictionary,
  isLocale,
  type Locale,
} from "../../lib/i18n";

const DASHBOARD_URL = "https://dashboard.heirmos.com";
const GUIDE_URL = "https://dashboard.heirmos.com/guide";
const CONTACT_EMAIL = "team.pneumora@gmail.com";

const AIS = ["Claude", "ChatGPT", "Grok", "Gemini", "Codex"];

// Feature/step copy lives in the dictionary; icons are matched here by key.
const FEATURE_ICONS = {
  connect: Plug,
  folder: FolderTree,
  search: Search,
  graph: Network,
  version: History,
  isolation: Lock,
} as const;

function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`flex items-center gap-2 ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/brand/heirmos-mark-dark.svg"
        alt=""
        className="h-7 w-auto"
        width={28}
        height={28}
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
    "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all";
  const styles =
    variant === "primary"
      ? "bg-[var(--color-brand-accent)] text-[#04122e] shadow-lg shadow-[var(--color-brand-accent)]/20 hover:brightness-110 hover:shadow-[var(--color-brand-accent)]/30"
      : "border border-white/15 text-zinc-200 hover:bg-white/5";
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
              active
                ? "bg-white/15 text-white"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            {text}
          </a>
        );
      })}
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

  return (
    <div className="relative flex min-h-screen flex-col">
      {/* ── Nav ───────────────────────────────────────────────── */}
      <header className="sticky top-0 z-20 border-b border-white/5 bg-[#050b1a]/70 backdrop-blur-md">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <Logo />
          <div className="flex items-center gap-2 sm:gap-3">
            <LangSwitch
              locale={locale}
              label={t.langSwitch.label}
              ko={t.langSwitch.ko}
              en={t.langSwitch.en}
            />
            <a
              href={GUIDE_URL}
              className="hidden rounded-full px-4 py-2 text-sm text-zinc-300 hover:text-white sm:inline-block"
            >
              {t.nav.guide}
            </a>
            <a
              href={DASHBOARD_URL}
              className="rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/15"
            >
              {t.nav.dashboard}
            </a>
          </div>
        </nav>
      </header>

      <main className="flex-1">
        {/* ── Hero ────────────────────────────────────────────── */}
        <section className="mx-auto max-w-6xl px-5 pt-20 pb-16 text-center md:pt-28 md:pb-24">
          <p className="animate-fade-up mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-zinc-300">
            <Sparkles className="h-3.5 w-3.5 text-[var(--color-brand-accent)]" />
            {t.hero.badge}
          </p>
          <h1 className="animate-fade-up text-balance text-5xl font-bold leading-[1.05] tracking-tight text-white md:text-7xl">
            {t.hero.titleLine1}
            <br />
            <span className="bg-gradient-to-r from-[var(--color-brand-accent)] via-sky-300 to-indigo-300 bg-clip-text text-transparent">
              {t.hero.titleAccent}
            </span>
          </h1>
          <p className="animate-fade-up mx-auto mt-6 max-w-2xl text-pretty text-base leading-relaxed text-zinc-300 md:text-lg">
            {t.hero.subtitle}
          </p>
          <div className="animate-fade-up mt-9 flex flex-wrap items-center justify-center gap-3">
            <CtaButton href={DASHBOARD_URL} variant="primary">
              {t.hero.ctaPrimary}
              <ArrowRight className="h-4 w-4" />
            </CtaButton>
            <CtaButton href="#how" variant="ghost">
              {t.hero.ctaGhost}
            </CtaButton>
          </div>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-zinc-500">
            <span className="text-xs uppercase tracking-wider text-zinc-600">
              {t.hero.worksWith}
            </span>
            {AIS.map((ai) => (
              <span key={ai} className="font-medium text-zinc-400">
                {ai}
              </span>
            ))}
          </div>
        </section>

        {/* ── Problem ─────────────────────────────────────────── */}
        <section className="border-y border-white/5 bg-white/[0.02]">
          <div className="mx-auto max-w-3xl px-5 py-20 text-center md:py-24">
            <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
              {t.problem.title}
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-pretty leading-relaxed text-zinc-400">
              {t.problem.body}
            </p>
          </div>
        </section>

        {/* ── Solution + Features ─────────────────────────────── */}
        <section className="mx-auto max-w-6xl px-5 py-20 md:py-28">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
              {t.solution.title}
            </h2>
            <p className="mt-5 text-pretty leading-relaxed text-zinc-400">
              {t.solution.body}
            </p>
          </div>

          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {t.features.map(({ key, title, body }) => {
              const Icon = FEATURE_ICONS[key as keyof typeof FEATURE_ICONS];
              return (
                <div
                  key={key}
                  className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-colors hover:border-white/20 hover:bg-white/[0.05]"
                >
                  <div className="mb-4 inline-flex rounded-xl bg-[var(--color-brand-accent)]/10 p-3 text-[var(--color-brand-accent)] ring-1 ring-inset ring-[var(--color-brand-accent)]/20">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                    {body}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── How it works ────────────────────────────────────── */}
        <section id="how" className="border-y border-white/5 bg-white/[0.02]">
          <div className="mx-auto max-w-6xl px-5 py-20 md:py-28">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
                {t.how.title}
              </h2>
              <p className="mt-5 text-pretty leading-relaxed text-zinc-400">
                {t.how.body}
              </p>
            </div>
            <div className="mt-14 grid gap-6 md:grid-cols-3">
              {t.how.steps.map(({ n, title, body }) => (
                <div key={n} className="relative">
                  <div className="font-mono text-5xl font-bold text-white/10">
                    {n}
                  </div>
                  <h3 className="mt-3 text-xl font-semibold text-white">
                    {title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                    {body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Final CTA ───────────────────────────────────────── */}
        <section className="mx-auto max-w-6xl px-5 py-24 md:py-32">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[var(--color-brand-2)]/40 to-[var(--color-brand)]/20 px-6 py-16 text-center md:py-20">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(30rem_20rem_at_50%_-5rem,rgba(91,141,239,0.25),transparent_70%)]" />
            <div className="relative">
              <h2 className="text-balance text-3xl font-bold tracking-tight text-white md:text-5xl">
                {t.finalCta.title}
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-pretty leading-relaxed text-zinc-300">
                {t.finalCta.body}
              </p>
              <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
                <CtaButton href={DASHBOARD_URL} variant="primary">
                  {t.finalCta.ctaPrimary}
                  <ArrowRight className="h-4 w-4" />
                </CtaButton>
                <CtaButton href={GUIDE_URL} variant="ghost">
                  {t.finalCta.ctaGhost}
                </CtaButton>
              </div>
              <p className="mt-6 text-sm text-zinc-400">
                {t.finalCta.contactPre}
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="font-medium text-[var(--color-brand-accent)] hover:underline"
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
      <footer className="border-t border-white/5">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 py-10 sm:flex-row">
          <Logo />
          <div className="flex items-center gap-6 text-sm text-zinc-400">
            <a href={DASHBOARD_URL} className="hover:text-white">
              {t.footer.dashboard}
            </a>
            <a href={GUIDE_URL} className="hover:text-white">
              {t.footer.guide}
            </a>
            <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-white">
              {t.footer.contact}
            </a>
            <a
              href="https://smithery.ai/servers/heirmos/memory"
              target="_blank"
              rel="noreferrer noopener"
              aria-label={t.footer.smitheryAria}
              className="hover:opacity-80"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://smithery.ai/badge/heirmos/memory"
                alt="smithery badge"
                className="h-5 w-auto"
              />
            </a>
          </div>
          <p className="text-xs text-zinc-600">© 2026 Heirmos</p>
        </div>
      </footer>
    </div>
  );
}
