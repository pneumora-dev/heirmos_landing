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
  /** The "write on the phone, the AI reads it" scene under the hero. All
   *  sample text is invented — never a real user's note. */
  demo: {
    kicker: string;
    title: string;
    body: string;
    phoneTitle: string;
    phoneNote: string;
    phoneSaved: string;
    phoneRecent: string;
    phoneRecentItems: { title: string; when: string }[];
    chatUser: string;
    chatTool: string;
    chatAi: string;
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

const ko: Dictionary = {
  htmlLang: "ko",
  ogLocale: "ko_KR",
  meta: {
    title: "Heirmos — AI가 읽는 빠른 메모장",
    description:
      "폰 홈 화면에서 바로 열리는 메모장. 적어둔 메모를 Claude · ChatGPT · Codex 가 그대로 읽고 답합니다. Google 로그인 한 번, 무료.",
  },
  nav: {
    guide: "이용 가이드",
    dashboard: "로그인",
  },
  langSwitch: {
    label: "언어 선택",
    ko: "한국어",
    en: "English",
  },
  hero: {
    badge: "AI가 읽는 빠른 메모장",
    titleLine1: "적어두면,",
    titleAccent: "AI가 기억합니다",
    subtitle:
      "폰 홈 화면에서 바로 열리는 메모장. 떠오른 생각을 적어두면 Claude · ChatGPT · Codex 가 그 메모를 읽고 답합니다. 더는 AI에게 처음부터 설명하지 마세요.",
    ctaPrimary: "무료로 메모 시작하기",
    ctaGhost: "어떻게 쓰나요",
    worksWith: "메모를 읽는 AI",
  },
  demo: {
    kicker: "이렇게 씁니다",
    title: "폰에 적고, AI에게 물어보세요",
    body: "메모장은 바로 열리고 오프라인에서도 적힙니다. 연결된 AI는 묻는 순간 당신의 메모를 찾아 읽습니다.",
    phoneTitle: "빠른 메모",
    phoneNote: "사이드 프로젝트 이름 후보\n- 담다\n- 한줄\n- 모아\n→ 짧고 동사형이 좋다. 도메인 확인하기",
    phoneSaved: "저장됨",
    phoneRecent: "최근 메모",
    phoneRecentItems: [
      { title: "다음 주 발표 구성 메모", when: "2시간 전" },
      { title: "읽을 책 — 리스트 업데이트", when: "어제" },
    ],
    chatUser: "내가 적어둔 사이드 프로젝트 이름 후보 중에 하나 골라줘",
    chatTool: "Heirmos 메모 검색 · 1건",
    chatAi: "메모에 적으신 기준이 “짧고 동사형”이었죠. 그 기준이면 ‘담다’가 가장 잘 맞아요. 다음으로 적어두신 도메인 확인부터 해볼까요?",
  },
  problem: {
    kicker: "왜 필요한가요",
    title: "좋은 생각은 AI 앞에서 떠오르지 않습니다",
    body: "아이디어는 길에서, 회의 중에, 자기 전에 옵니다. 메모 앱에 적으면 AI는 모르고, AI 채팅에 쓰면 대화창과 함께 묻힙니다. 그래서 매번 처음부터 다시 설명하게 됩니다.",
  },
  solution: {
    kicker: "Heirmos",
    title: "메모장과 AI 사이를 잇습니다",
    body: "적는 건 메모장처럼 가볍게, 꺼내 쓰는 건 AI가 알아서.",
  },
  features: [
    {
      key: "instant",
      title: "바로 열리는 메모장",
      body: "홈 화면 아이콘을 누르면 바로 입력창. 폰에 먼저 저장되니 지하철·비행기에서도 적히고, 연결되면 알아서 올라갑니다.",
    },
    {
      key: "connect",
      title: "모든 AI가 같은 메모를 읽음",
      body: "Claude · ChatGPT · Codex · Grok 에 커넥터 한 번이면 끝. 어느 AI에서 물어도 같은 메모를 찾아 답합니다.",
    },
    {
      key: "folder",
      title: "정리는 AI가",
      body: "폴더를 고를 필요가 없습니다. 의미를 읽어 알맞은 자리에 두고, 한국어 검색도 정확하게 찾아냅니다.",
    },
    {
      key: "import",
      title: "지난 대화도 메모로",
      body: "ChatGPT · Claude 대화 내보내기 파일을 넣으면 오래 남길 사실과 결정만 골라 메모로 만들어 줍니다.",
    },
    {
      key: "version",
      title: "지워도 잃지 않음",
      body: "수정하면 이전 버전이 남고, 삭제는 보관함으로 갑니다. 언제든 되살릴 수 있습니다.",
    },
    {
      key: "isolation",
      title: "내 메모는 나만",
      body: "모든 메모는 계정별로 완전히 분리됩니다. 비밀번호·카드번호 같은 민감 정보는 저장하지 않도록 막습니다.",
    },
  ],
  how: {
    kicker: "시작하기",
    title: "3단계면 충분합니다",
    body: "설치도, 코드도 필요 없습니다.",
    steps: [
      {
        n: "01",
        title: "로그인하고 홈 화면에 추가",
        body: "Google 로그인 한 번이면 메모장이 열립니다. 폰에서는 ‘홈 화면에 추가’로 앱처럼 쓰세요.",
      },
      {
        n: "02",
        title: "떠오르면 적기",
        body: "제목도 폴더도 필요 없습니다. 한 줄이어도 괜찮아요.",
      },
      {
        n: "03",
        title: "AI에 연결하고 물어보기",
        body: "쓰는 AI에 Heirmos 를 한 번 연결하면 “내 메모에서 찾아줘” 한마디로 꺼내 씁니다. Claude.ai 는 클릭 한 번.",
      },
    ],
  },
  finalCta: {
    title: "오늘 떠오른 생각부터 적어두세요",
    body: "Google 로그인 한 번이면 바로 메모장이 열립니다. AI 연결은 나중에 해도 됩니다.",
    ctaPrimary: "무료로 메모 시작하기",
    ctaGhost: "AI 연결 가이드",
    contactPre: "궁금한 점이 있으신가요? ",
    contactPost: " 로 문의하세요.",
  },
  footer: {
    dashboard: "로그인",
    guide: "이용 가이드",
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
    title: "Heirmos — The quick notepad your AI reads",
    description:
      "A notepad that opens straight from your home screen. Claude, ChatGPT and Codex read what you jot down and answer with it. One Google sign-in, free.",
  },
  nav: {
    guide: "Guide",
    dashboard: "Sign in",
  },
  langSwitch: {
    label: "Choose language",
    ko: "한국어",
    en: "English",
  },
  hero: {
    badge: "The quick notepad your AI reads",
    titleLine1: "Jot it down,",
    titleAccent: "your AI remembers",
    subtitle:
      "A notepad that opens straight from your home screen. Write a thought down and Claude · ChatGPT · Codex read that note when you ask. Stop explaining everything from scratch.",
    ctaPrimary: "Start writing — free",
    ctaGhost: "How it works",
    worksWith: "AIs that read your notes",
  },
  demo: {
    kicker: "In practice",
    title: "Write on your phone. Ask your AI.",
    body: "The notepad opens instantly and works offline. A connected AI finds and reads your notes the moment you ask.",
    phoneTitle: "Quick memo",
    phoneNote: "Side project name ideas\n- Keep\n- Jot\n- Gather\n→ short + a verb works best. check domains",
    phoneSaved: "Saved",
    phoneRecent: "Recent notes",
    phoneRecentItems: [
      { title: "Outline for next week's talk", when: "2h ago" },
      { title: "Books to read — updated list", when: "Yesterday" },
    ],
    chatUser: "Pick one of the side project names I wrote down",
    chatTool: "Heirmos note search · 1 result",
    chatAi: "Your note says you want something “short and a verb”. By that rule, ‘Keep’ fits best. Want to start on the domain check you noted next?",
  },
  problem: {
    kicker: "Why it matters",
    title: "Good ideas don't show up while you're chatting with an AI",
    body: "They come on the street, in meetings, right before sleep. Put them in a notes app and your AI never sees them; put them in a chat and they sink with the thread. So you explain everything again, every time.",
  },
  solution: {
    kicker: "Heirmos",
    title: "A bridge between your notes and your AI",
    body: "Writing feels like a notepad. Recall is the AI's job.",
  },
  features: [
    {
      key: "instant",
      title: "Opens instantly",
      body: "Tap the home-screen icon and you're typing. Notes save to your phone first, so they work on the subway or a plane and sync once you're back online.",
    },
    {
      key: "connect",
      title: "Every AI reads the same notes",
      body: "One connector for Claude · ChatGPT · Codex · Grok. Whichever AI you ask, it finds the same notes.",
    },
    {
      key: "folder",
      title: "The AI does the filing",
      body: "No folders to pick. Heirmos reads the meaning, files it in the right place, and finds it again with accurate search.",
    },
    {
      key: "import",
      title: "Old chats become notes",
      body: "Drop in a ChatGPT or Claude export and Heirmos keeps only the facts and decisions worth remembering.",
    },
    {
      key: "version",
      title: "Nothing is ever lost",
      body: "Edits keep the previous version and deletes go to an archive. Restore anything, anytime.",
    },
    {
      key: "isolation",
      title: "Your notes are yours",
      body: "Every account is fully isolated. Passwords, card numbers and other sensitive data are blocked from being stored.",
    },
  ],
  how: {
    kicker: "Get going",
    title: "Three steps is all it takes",
    body: "No installs, no code.",
    steps: [
      {
        n: "01",
        title: "Sign in, add to home screen",
        body: "One Google sign-in opens your notepad. On a phone, use ‘Add to Home Screen’ to use it like an app.",
      },
      {
        n: "02",
        title: "Write when it hits you",
        body: "No title, no folder. A single line is fine.",
      },
      {
        n: "03",
        title: "Connect your AI and ask",
        body: "Connect Heirmos to the AI you use once, then just say “find it in my notes”. Claude.ai is a single click.",
      },
    ],
  },
  finalCta: {
    title: "Start with today's idea",
    body: "One Google sign-in and your notepad is open. Connect your AI whenever you like.",
    ctaPrimary: "Start writing — free",
    ctaGhost: "AI connection guide",
    contactPre: "Have a question? Reach us at ",
    contactPost: ".",
  },
  footer: {
    dashboard: "Sign in",
    guide: "Guide",
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
