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

const DASHBOARD_URL = "https://dashboard.heirmos.com";
const GUIDE_URL = "https://dashboard.heirmos.com/guide";

const AIS = ["Claude", "ChatGPT", "Grok", "Gemini", "Codex"];

const FEATURES = [
  {
    icon: Plug,
    title: "모든 AI에 연결",
    body: "MCP + REST 표준으로 Claude.ai · ChatGPT · Codex · Grok 어디든 커넥터 하나면 붙습니다. 별도 플러그인 개발이 필요 없습니다.",
  },
  {
    icon: FolderTree,
    title: "자동 폴더 분류",
    body: "“이거 기억해줘” 한마디면 AI가 의미를 읽어 알맞은 폴더 경로로 정리합니다. 직접 분류하지 않아도 트리가 쌓입니다.",
  },
  {
    icon: Search,
    title: "하이브리드 검색",
    body: "의미(임베딩)와 키워드를 함께 쓰는 검색에 중요도·최신성 재랭크까지. 한국어에 최적화되어 조사 경계도 잘 잡습니다.",
  },
  {
    icon: Network,
    title: "관계 그래프",
    body: "기억을 저장하면 연관된 기억과의 관계(뒷받침·모순·세분화 등)를 자동으로 제안합니다. 지식이 점이 아니라 망으로 연결됩니다.",
  },
  {
    icon: History,
    title: "무손실 · 버전관리",
    body: "수정해도 이전 버전이 남고, 삭제는 보관(soft-delete)이라 언제든 복구됩니다. 기억을 잃을 걱정이 없습니다.",
  },
  {
    icon: Lock,
    title: "완전한 격리",
    body: "모든 데이터는 사용자별로 분리됩니다. 내 기억은 나의 키로만 접근하고, 비밀·민감 정보는 저장 정책으로 보호합니다.",
  },
];

const STEPS = [
  {
    n: "01",
    title: "연결",
    body: "쓰는 AI에 Heirmos 커넥터를 추가합니다. Claude.ai는 OAuth 한 번, 나머지는 발급한 키 하나면 끝.",
  },
  {
    n: "02",
    title: "저장",
    body: "대화 중 “이거 기억해줘”라고만 하면 됩니다. AI가 핵심을 정리해 폴더에 저장합니다.",
  },
  {
    n: "03",
    title: "어디서든 꺼내쓰기",
    body: "다른 AI로 옮겨가도 같은 기억을 그대로 불러옵니다. 매번 처음부터 설명할 필요가 없습니다.",
  },
];

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

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col">
      {/* ── Nav ───────────────────────────────────────────────── */}
      <header className="sticky top-0 z-20 border-b border-white/5 bg-[#050b1a]/70 backdrop-blur-md">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <Logo />
          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href={GUIDE_URL}
              className="hidden rounded-full px-4 py-2 text-sm text-zinc-300 hover:text-white sm:inline-block"
            >
              이용 가이드
            </a>
            <a
              href={DASHBOARD_URL}
              className="rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/15"
            >
              대시보드
            </a>
          </div>
        </nav>
      </header>

      <main className="flex-1">
        {/* ── Hero ────────────────────────────────────────────── */}
        <section className="mx-auto max-w-6xl px-5 pt-20 pb-16 text-center md:pt-28 md:pb-24">
          <p className="animate-fade-up mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-zinc-300">
            <Sparkles className="h-3.5 w-3.5 text-[var(--color-brand-accent)]" />
            AI를 위한 클라우드 기억 인프라
          </p>
          <h1 className="animate-fade-up text-balance text-5xl font-bold leading-[1.05] tracking-tight text-white md:text-7xl">
            하나의 기억,
            <br />
            <span className="bg-gradient-to-r from-[var(--color-brand-accent)] via-sky-300 to-indigo-300 bg-clip-text text-transparent">
              모든 AI
            </span>
          </h1>
          <p className="animate-fade-up mx-auto mt-6 max-w-2xl text-pretty text-base leading-relaxed text-zinc-300 md:text-lg">
            Claude · ChatGPT · Grok · Gemini — 어떤 AI와 대화하든, 당신이 쌓아온
            기억을 그대로 이어갑니다. Heirmos는 AI들이 함께 쓰는 영구 기억입니다.
          </p>
          <div className="animate-fade-up mt-9 flex flex-wrap items-center justify-center gap-3">
            <CtaButton href={DASHBOARD_URL} variant="primary">
              무료로 시작하기
              <ArrowRight className="h-4 w-4" />
            </CtaButton>
            <CtaButton href="#how" variant="ghost">
              작동 방식 보기
            </CtaButton>
          </div>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-zinc-500">
            <span className="text-xs uppercase tracking-wider text-zinc-600">
              함께 쓰는 AI
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
              AI는 매번 당신을 처음 만납니다
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-pretty leading-relaxed text-zinc-400">
              대화창을 닫으면 컨텍스트가 사라지고, 새 창에서는 또 처음부터
              설명해야 합니다. ChatGPT에 알려준 걸 Claude는 모르고, 어제의 결정을
              오늘의 AI는 기억하지 못합니다. 당신의 맥락이 도구마다 흩어집니다.
            </p>
          </div>
        </section>

        {/* ── Solution + Features ─────────────────────────────── */}
        <section className="mx-auto max-w-6xl px-5 py-20 md:py-28">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
              한 번 저장하면, 모든 AI가 기억합니다
            </h2>
            <p className="mt-5 text-pretty leading-relaxed text-zinc-400">
              Heirmos는 AI들이 공유하는 클라우드 메모리입니다. 저장은 한 곳에,
              접근은 어디서나.
            </p>
          </div>

          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map(({ icon: Icon, title, body }) => (
              <div
                key={title}
                className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-colors hover:border-white/20 hover:bg-white/[0.05]"
              >
                <div className="mb-4 inline-flex rounded-xl bg-[var(--color-brand-accent)]/10 p-3 text-[var(--color-brand-accent)] ring-1 ring-inset ring-[var(--color-brand-accent)]/20">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold text-white">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">{body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── How it works ────────────────────────────────────── */}
        <section id="how" className="border-y border-white/5 bg-white/[0.02]">
          <div className="mx-auto max-w-6xl px-5 py-20 md:py-28">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
                3단계면 충분합니다
              </h2>
              <p className="mt-5 text-pretty leading-relaxed text-zinc-400">
                설치도, 코드도 필요 없습니다. 쓰던 AI에 연결만 하세요.
              </p>
            </div>
            <div className="mt-14 grid gap-6 md:grid-cols-3">
              {STEPS.map(({ n, title, body }) => (
                <div key={n} className="relative">
                  <div className="font-mono text-5xl font-bold text-white/10">
                    {n}
                  </div>
                  <h3 className="mt-3 text-xl font-semibold text-white">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-400">{body}</p>
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
                AI에게 당신을 기억하게 하세요
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-pretty leading-relaxed text-zinc-300">
                지금 대시보드에서 키를 발급하고, 첫 기억을 저장해 보세요. 몇 분이면
                됩니다.
              </p>
              <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
                <CtaButton href={DASHBOARD_URL} variant="primary">
                  무료로 시작하기
                  <ArrowRight className="h-4 w-4" />
                </CtaButton>
                <CtaButton href={GUIDE_URL} variant="ghost">
                  이용 가이드
                </CtaButton>
              </div>
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
              대시보드
            </a>
            <a href={GUIDE_URL} className="hover:text-white">
              이용 가이드
            </a>
          </div>
          <p className="text-xs text-zinc-600">
            © {new Date().getFullYear()} Heirmos
          </p>
        </div>
      </footer>
    </div>
  );
}
