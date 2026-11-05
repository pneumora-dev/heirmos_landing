// i18n dictionaries for the Heirmos landing page.
// Route-based: /ko and /en are statically generated; middleware picks the
// default from Accept-Language. Add a locale here + to `locales` to ship it.

export const locales = ["ko", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "ko";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

type Feature = { key: string; title: string; body: string };
/** `code` is shown verbatim in a mono block under the step (install commands). */
type Step = { n: string; title: string; body: string; code?: string };

export type Dictionary = {
  htmlLang: string;
  ogLocale: string;
  meta: {
    title: string;
    description: string;
  };
  nav: {
    guide: string;
    dashboard: string;
  };
  langSwitch: {
    label: string; // aria-label for the switcher group
    ko: string;
    en: string;
  };
  hero: {
    badge: string;
    titleLine1: string;
    titleAccent: string;
    subtitle: string;
    ctaPrimary: string;
    ctaGhost: string;
  };
  /** Two terminal panes: a Claude Code session ends and is captured, the next
   *  day a Codex session starts with that decision in its briefing. All sample
   *  text is invented — never a real user's memory. */
  demo: {
    kicker: string;
    title: string;
    body: string;
    leftLabel: string;
    leftWhen: string;
    leftUser: string;
    leftAgent: string;
    leftCapture: string;
    rightLabel: string;
    rightWhen: string;
    briefingTitle: string;
    briefingItems: string[];
    rightUser: string;
    rightAgent: string;
  };
  problem: {
    kicker: string;
    title: string;
    body: string;
  };
  solution: {
    kicker: string;
    title: string;
    body: string;
  };
  features: Feature[];
  how: {
    kicker: string;
    title: string;
    body: string;
    steps: Step[];
    otherAgents: string;
  };
  finalCta: {
    title: string;
    body: string;
    ctaPrimary: string;
    ctaGhost: string;
    contactPre: string;
    contactPost: string;
  };
  footer: {
    dashboard: string;
    guide: string;
    contact: string;
    smitheryAria: string;
  };
  cookie: {
    text: string;
    accept: string;
    decline: string;
  };
};

const INSTALL_CLI = "uv tool install heirmos-cli";
const INSTALL_KEY = 'export HEIRMOS_API_KEY="hk_..."';
const INSTALL_PLUGIN =
  "/plugin marketplace add team-pneumora/pneumora-plugins\n/plugin install heirmos@pneumora-plugins";

const ko: Dictionary = {
  htmlLang: "ko",
  ogLocale: "ko_KR",
  meta: {
    title: "Heirmos — 코딩 에이전트의 기억",
    description:
      "Claude Code · Codex 세션의 결정과 맥락을 자동으로 남기고, 다음 세션 시작에 브리핑으로 돌려줍니다. 에이전트를 바꿔도 같은 기억. CLI 설치 한 번, 무료.",
  },
  nav: {
    guide: "설치 가이드",
    dashboard: "로그인",
  },
  langSwitch: {
    label: "언어 선택",
    ko: "한국어",
    en: "English",
  },
  hero: {
    badge: "Claude Code · Codex 를 위한 기억",
    titleLine1: "어제 정한 것을",
    titleAccent: "오늘 에이전트가 압니다",
    subtitle:
      "세션이 끝나면 결정·선호·맥락을 자동으로 남기고, 다음 세션이 시작될 때 브리핑으로 돌려줍니다. Claude Code 에서 정한 것을 Codex 가 이어받습니다. “기억해” 라고 말할 필요도 없습니다.",
    ctaPrimary: "무료로 시작하기",
    ctaGhost: "어떻게 동작하나요",
  },
  demo: {
    kicker: "이렇게 이어집니다",
    title: "월요일 Claude Code 의 결정, 화요일 Codex 가 압니다",
    body: "세션이 끝날 때 훅이 대화에서 오래 남을 것만 추려 저장합니다. 다음 세션은 그 저장소의 최근 결정을 브리핑으로 받고 시작합니다.",
    leftLabel: "Claude Code",
    leftWhen: "월요일",
    leftUser: "결제 재시도는 큐로 빼지 말고 일단 동기로 가자. 웹훅 중복은 idempotency key 로 막고.",
    leftAgent: "좋습니다. 재시도는 동기 3회 · 지수 백오프로 두고, 웹훅은 event_id 를 키로 중복을 거릅니다.",
    leftCapture: "세션 종료 · 기억 3개 저장됨",
    rightLabel: "Codex",
    rightWhen: "화요일",
    briefingTitle: "세션 시작 브리핑 · 이 저장소",
    briefingItems: [
      "결제 재시도 = 동기 3회 + 지수 백오프 (큐 도입 보류)",
      "웹훅 중복 방지 = event_id idempotency key",
    ],
    rightUser: "환불 웹훅 핸들러 추가해줘",
    rightAgent: "어제 정한 대로 event_id 로 중복을 거르고, 실패 시 동기 3회 재시도로 붙이겠습니다.",
  },
  problem: {
    kicker: "왜 필요한가요",
    title: "에이전트는 매 세션 처음부터 시작합니다",
    body: "결정은 대화 속에서 내려지는데, 세션이 끝나거나 컴팩트가 지나가면 “왜 그렇게 정했는지” 가 사라집니다. CLAUDE.md 에 다 옮겨 적기엔 너무 자주 바뀌고, 에이전트를 바꾸면 처음부터 다시 설명합니다.",
  },
  solution: {
    kicker: "Heirmos",
    title: "세션과 세션, 에이전트와 에이전트 사이를 잇습니다",
    body: "남기는 건 훅이 알아서, 꺼내는 건 세션 시작 브리핑이.",
  },
  features: [
    {
      key: "capture",
      title: "자동으로 남김",
      body: "컴팩트 직전과 세션 종료 때 훅이 대화를 보내고, 추출 엔진이 오래 남을 사실·결정·선호만 기억으로 만듭니다.",
    },
    {
      key: "briefing",
      title: "세션 시작 브리핑",
      body: "새 세션 첫 맥락으로 이 저장소의 최근 결정과, 지금 작업에 닿는 오래된 기억을 짧게 넣어 줍니다.",
    },
    {
      key: "cross",
      title: "에이전트를 바꿔도 같은 기억",
      body: "Claude Code · Codex · Cursor 가 같은 기억을 씁니다. MCP 로 연결하면 Claude.ai · ChatGPT 에서도 꺼내 볼 수 있습니다.",
    },
    {
      key: "privacy",
      title: "보내는 건 대화 글만",
      body: "당신의 프롬프트와 에이전트의 답변 글만 나갑니다. 도구 출력·파일 내용·thinking 은 빼고, 키·토큰 모양 문자열은 기기에서 가립니다.",
    },
    {
      key: "safe",
      title: "세션을 막지 않음",
      body: "CLI 가 없거나, 키가 없거나, 네트워크가 끊겨도 훅은 조용히 넘어갑니다. 저장은 백그라운드에서 끝납니다.",
    },
    {
      key: "isolation",
      title: "내 기억은 나만",
      body: "계정별로 완전히 분리되고, 수정하면 이전 버전이 남고 삭제는 보관함으로 갑니다. 대시보드에서 직접 고치고 지울 수 있습니다.",
    },
  ],
  how: {
    kicker: "설치",
    title: "Claude Code 기준 3단계",
    body: "새 세션의 첫 맥락이 브리핑이면 연결된 겁니다.",
    steps: [
      {
        n: "01",
        title: "CLI 설치",
        body: "플러그인이 쓰는 heirmos 명령입니다. pipx install heirmos-cli 도 됩니다.",
        code: INSTALL_CLI,
      },
      {
        n: "02",
        title: "API 키 발급",
        body: "Google 로그인 후 계정 → API 키에서 발급해 환경 변수로 둡니다.",
        code: INSTALL_KEY,
      },
      {
        n: "03",
        title: "플러그인 설치",
        body: "Claude Code 안에서 실행하고 /reload-plugins 또는 재시작.",
        code: INSTALL_PLUGIN,
      },
    ],
    otherAgents: "Codex · Cursor 연결은 설치 가이드에 있습니다.",
  },
  finalCta: {
    title: "다음 세션부터, 어제를 기억하는 에이전트",
    body: "로그인해서 API 키를 받으면 5분 안에 설치가 끝납니다. 무료입니다.",
    ctaPrimary: "무료로 시작하기",
    ctaGhost: "설치 가이드",
    contactPre: "설치가 막히면 ",
    contactPost: " 로 알려 주세요. 직접 도와드립니다.",
  },
  footer: {
    dashboard: "로그인",
    guide: "설치 가이드",
    contact: "문의",
    smitheryAria: "Smithery 에서 Heirmos MCP 보기",
  },
  cookie: {
    text: "서비스 개선을 위해 분석 쿠키(Google Analytics · Microsoft Clarity)를 사용합니다. 동의하시겠어요?",
    accept: "동의",
    decline: "거부",
  },
};

const en: Dictionary = {
  htmlLang: "en",
  ogLocale: "en_US",
  meta: {
    title: "Heirmos — Memory for your coding agents",
    description:
      "Heirmos captures the decisions and context from your Claude Code and Codex sessions and hands them back as a briefing when the next session starts. Switch agents, keep the memory. One CLI install, free.",
  },
  nav: {
    guide: "Install guide",
    dashboard: "Sign in",
  },
  langSwitch: {
    label: "Choose language",
    ko: "한국어",
    en: "English",
  },
  hero: {
    badge: "Memory for Claude Code · Codex",
    titleLine1: "Decided yesterday.",
    titleAccent: "Known today.",
    subtitle:
      "When a session ends, Heirmos keeps the decisions, preferences and context. When the next one starts, it hands them back as a briefing. Decide something in Claude Code, and Codex picks it up. You never have to say “remember this”.",
    ctaPrimary: "Start free",
    ctaGhost: "How it works",
  },
  demo: {
    kicker: "How it carries over",
    title: "Monday's decision in Claude Code. Tuesday, Codex knows it.",
    body: "When a session ends, a hook keeps only what's worth remembering. The next session starts with this repo's recent decisions as a briefing.",
    leftLabel: "Claude Code",
    leftWhen: "Monday",
    leftUser: "Let's keep payment retries synchronous for now, no queue. Dedupe webhooks with an idempotency key.",
    leftAgent: "Got it. Retries stay synchronous, 3 attempts with exponential backoff, and webhooks are deduped by event_id.",
    leftCapture: "Session ended · 3 memories saved",
    rightLabel: "Codex",
    rightWhen: "Tuesday",
    briefingTitle: "Session briefing · this repo",
    briefingItems: [
      "Payment retries = 3 synchronous attempts + exponential backoff (queue on hold)",
      "Webhook dedupe = event_id idempotency key",
    ],
    rightUser: "Add a refund webhook handler",
    rightAgent: "Following yesterday's decision: I'll dedupe on event_id and retry failures synchronously, 3 times.",
  },
  problem: {
    kicker: "Why it matters",
    title: "Your agent starts every session from zero",
    body: "Decisions get made in the conversation. Then the session ends, or compaction runs, and the “why” is gone. CLAUDE.md changes too often to keep by hand, and switching agents means explaining everything again.",
  },
  solution: {
    kicker: "Heirmos",
    title: "A bridge between sessions, and between agents",
    body: "Hooks do the saving. The session-start briefing does the recall.",
  },
  features: [
    {
      key: "capture",
      title: "Captured automatically",
      body: "Before compaction and at session end, a hook sends the conversation and the extraction engine keeps only durable facts, decisions and preferences.",
    },
    {
      key: "briefing",
      title: "Session-start briefing",
      body: "Every new session opens with this repo's recent decisions, plus older memories that touch what you're about to do.",
    },
    {
      key: "cross",
      title: "Same memory across agents",
      body: "Claude Code, Codex and Cursor share one memory. Connect over MCP and Claude.ai or ChatGPT can read it too.",
    },
    {
      key: "privacy",
      title: "Only the conversation leaves",
      body: "Just your prompts and the agent's prose. Tool output, file contents and thinking are dropped, and key-shaped strings are redacted on your machine.",
    },
    {
      key: "safe",
      title: "Never blocks a session",
      body: "No CLI, no key, no network? The hooks exit quietly. Saving finishes in the background.",
    },
    {
      key: "isolation",
      title: "Your memory is yours",
      body: "Fully isolated per account. Edits keep the previous version and deletes go to an archive. Fix or remove anything from the dashboard.",
    },
  ],
  how: {
    kicker: "Install",
    title: "Three steps for Claude Code",
    body: "If a new session's first context is a briefing, you're connected.",
    steps: [
      {
        n: "01",
        title: "Install the CLI",
        body: "The heirmos command the plugin drives. pipx install heirmos-cli works too.",
        code: INSTALL_CLI,
      },
      {
        n: "02",
        title: "Get an API key",
        body: "Sign in with Google, open Account → API keys, and export it.",
        code: INSTALL_KEY,
      },
      {
        n: "03",
        title: "Install the plugin",
        body: "Run inside Claude Code, then /reload-plugins or restart.",
        code: INSTALL_PLUGIN,
      },
    ],
    otherAgents: "Codex and Cursor setup is in the install guide.",
  },
  finalCta: {
    title: "From the next session on, an agent that remembers yesterday",
    body: "Sign in, grab an API key, and you're set up in five minutes. Free.",
    ctaPrimary: "Start free",
    ctaGhost: "Install guide",
    contactPre: "Stuck on setup? Write to ",
    contactPost: " and we'll help you directly.",
  },
  footer: {
    dashboard: "Sign in",
    guide: "Install guide",
    contact: "Contact",
    smitheryAria: "View Heirmos MCP on Smithery",
  },
  cookie: {
    text: "We use analytics cookies (Google Analytics · Microsoft Clarity) to improve the service. Do you consent?",
    accept: "Accept",
    decline: "Decline",
  },
};

const dictionaries: Record<Locale, Dictionary> = { ko, en };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
