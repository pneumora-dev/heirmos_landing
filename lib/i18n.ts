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
type Step = { n: string; title: string; body: string };

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
    worksWith: string;
  };
  problem: {
    title: string;
    body: string;
  };
  solution: {
    title: string;
    body: string;
  };
  features: Feature[];
  how: {
    title: string;
    body: string;
    steps: Step[];
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
};

const ko: Dictionary = {
  htmlLang: "ko",
  ogLocale: "ko_KR",
  meta: {
    title: "Heirmos — 하나의 기억, 모든 AI",
    description:
      "Claude · ChatGPT · Grok · Gemini — 어떤 AI와 대화하든 당신이 쌓아온 기억을 그대로 이어가세요. Heirmos는 모든 AI가 공유하는 클라우드 기억 인프라입니다.",
  },
  nav: {
    guide: "이용 가이드",
    dashboard: "대시보드",
  },
  langSwitch: {
    label: "언어 선택",
    ko: "한국어",
    en: "English",
  },
  hero: {
    badge: "AI를 위한 클라우드 기억 인프라",
    titleLine1: "하나의 기억,",
    titleAccent: "모든 AI",
    subtitle:
      "Claude · ChatGPT · Grok · Gemini — 어떤 AI와 대화하든, 당신이 쌓아온 기억을 그대로 이어갑니다. Heirmos는 AI들이 함께 쓰는 영구 기억입니다.",
    ctaPrimary: "무료로 시작하기",
    ctaGhost: "작동 방식 보기",
    worksWith: "함께 쓰는 AI",
  },
  problem: {
    title: "AI는 매번 당신을 처음 만납니다",
    body: "대화창을 닫으면 컨텍스트가 사라지고, 새 창에서는 또 처음부터 설명해야 합니다. ChatGPT에 알려준 걸 Claude는 모르고, 어제의 결정을 오늘의 AI는 기억하지 못합니다. 당신의 맥락이 도구마다 흩어집니다.",
  },
  solution: {
    title: "한 번 저장하면, 모든 AI가 기억합니다",
    body: "Heirmos는 AI들이 공유하는 클라우드 메모리입니다. 저장은 한 곳에, 접근은 어디서나.",
  },
  features: [
    {
      key: "connect",
      title: "모든 AI에 연결",
      body: "MCP + REST 표준으로 Claude.ai · ChatGPT · Codex · Grok 어디든 커넥터 하나면 붙습니다. 별도 플러그인 개발이 필요 없습니다.",
    },
    {
      key: "folder",
      title: "자동 폴더 분류",
      body: "“이거 기억해줘” 한마디면 AI가 의미를 읽어 알맞은 폴더 경로로 정리합니다. 직접 분류하지 않아도 트리가 쌓입니다.",
    },
    {
      key: "search",
      title: "하이브리드 검색",
      body: "의미(임베딩)와 키워드를 함께 쓰는 검색에 중요도·최신성 재랭크까지. 한국어에 최적화되어 조사 경계도 잘 잡습니다.",
    },
    {
      key: "graph",
      title: "관계 그래프",
      body: "기억을 저장하면 연관된 기억과의 관계(뒷받침·모순·세분화 등)를 자동으로 제안합니다. 지식이 점이 아니라 망으로 연결됩니다.",
    },
    {
      key: "version",
      title: "무손실 · 버전관리",
      body: "수정해도 이전 버전이 남고, 삭제는 보관(soft-delete)이라 언제든 복구됩니다. 기억을 잃을 걱정이 없습니다.",
    },
    {
      key: "isolation",
      title: "완전한 격리",
      body: "모든 데이터는 사용자별로 분리됩니다. 내 기억은 나의 키로만 접근하고, 비밀·민감 정보는 저장 정책으로 보호합니다.",
    },
  ],
  how: {
    title: "3단계면 충분합니다",
    body: "설치도, 코드도 필요 없습니다. 쓰던 AI에 연결만 하세요.",
    steps: [
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
    ],
  },
  finalCta: {
    title: "AI에게 당신을 기억하게 하세요",
    body: "지금 대시보드에서 키를 발급하고, 첫 기억을 저장해 보세요. 몇 분이면 됩니다.",
    ctaPrimary: "무료로 시작하기",
    ctaGhost: "이용 가이드",
    contactPre: "궁금한 점이 있으신가요? ",
    contactPost: " 로 문의하세요.",
  },
  footer: {
    dashboard: "대시보드",
    guide: "이용 가이드",
    contact: "문의",
    smitheryAria: "Smithery 에서 Heirmos MCP 보기",
  },
};

const en: Dictionary = {
  htmlLang: "en",
  ogLocale: "en_US",
  meta: {
    title: "Heirmos — One memory, every AI",
    description:
      "Claude · ChatGPT · Grok · Gemini — whichever AI you talk to, pick up right where your memory left off. Heirmos is cloud memory infrastructure shared by every AI.",
  },
  nav: {
    guide: "Guide",
    dashboard: "Dashboard",
  },
  langSwitch: {
    label: "Choose language",
    ko: "한국어",
    en: "English",
  },
  hero: {
    badge: "Cloud memory infrastructure for AI",
    titleLine1: "One memory,",
    titleAccent: "every AI",
    subtitle:
      "Claude · ChatGPT · Grok · Gemini — whichever AI you talk to, pick up right where your memory left off. Heirmos is the permanent memory every AI shares.",
    ctaPrimary: "Get started free",
    ctaGhost: "See how it works",
    worksWith: "Works with",
  },
  problem: {
    title: "AI meets you for the first time, every time",
    body: "Close the chat and the context is gone; in a new window you explain everything from scratch. What you told ChatGPT, Claude doesn't know — and today's AI can't recall yesterday's decision. Your context scatters across every tool.",
  },
  solution: {
    title: "Save once, every AI remembers",
    body: "Heirmos is cloud memory shared across AIs. Saved in one place, accessible everywhere.",
  },
  features: [
    {
      key: "connect",
      title: "Connect to every AI",
      body: "With the MCP + REST standard, a single connector plugs into Claude.ai · ChatGPT · Codex · Grok — anywhere. No custom plugin development required.",
    },
    {
      key: "folder",
      title: "Automatic folder sorting",
      body: "Just say “remember this” and the AI reads the meaning and files it under the right folder path. The tree grows without you sorting anything.",
    },
    {
      key: "search",
      title: "Hybrid search",
      body: "Search that combines meaning (embeddings) with keywords, re-ranked by importance and recency. Tuned for Korean, it even handles particle boundaries well.",
    },
    {
      key: "graph",
      title: "Relationship graph",
      body: "When you save a memory, Heirmos suggests how it relates to others — supports, contradicts, refines, and more. Knowledge connects as a web, not isolated points.",
    },
    {
      key: "version",
      title: "Lossless · versioned",
      body: "Edits keep the previous version, and deletes are soft — recoverable anytime. Never worry about losing a memory.",
    },
    {
      key: "isolation",
      title: "Complete isolation",
      body: "All data is isolated per user. Your memories are reachable only with your key, and secrets or sensitive data are protected by storage policy.",
    },
  ],
  how: {
    title: "Three steps is all it takes",
    body: "No installs, no code. Just connect the AI you already use.",
    steps: [
      {
        n: "01",
        title: "Connect",
        body: "Add the Heirmos connector to the AI you use. Claude.ai is one OAuth click; for the rest, a single issued key is all it takes.",
      },
      {
        n: "02",
        title: "Save",
        body: "Just say “remember this” mid-conversation. The AI distills the key points and files them into a folder.",
      },
      {
        n: "03",
        title: "Recall anywhere",
        body: "Switch to another AI and the same memories come right back. No more explaining from scratch every time.",
      },
    ],
  },
  finalCta: {
    title: "Make your AI remember you",
    body: "Issue a key in the dashboard now and save your first memory. It only takes a few minutes.",
    ctaPrimary: "Get started free",
    ctaGhost: "Guide",
    contactPre: "Have a question? Reach us at ",
    contactPost: ".",
  },
  footer: {
    dashboard: "Dashboard",
    guide: "Guide",
    contact: "Contact",
    smitheryAria: "View Heirmos MCP on Smithery",
  },
};

const dictionaries: Record<Locale, Dictionary> = { ko, en };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
