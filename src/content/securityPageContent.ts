export type SecurityHeroBubble = {
  variant: "outgoing" | "incoming" | "document" | "sticker";
  text?: string;
  time: string;
  read?: boolean;
  documentTitle?: string;
  documentMeta?: string;
  reactions?: string[];
};

export type SecurityPillar = {
  title: string;
  body: string;
  icon: "lock" | "timer" | "shield";
};

export type SecurityControlCard = {
  id: "encryption" | "mediaTimers" | "reportBlock" | "officialApp";
  title: string;
  body: string;
  learnMoreHref: string;
  learnMoreLabel: string;
};

export type SecurityHelpLink = {
  label: string;
  href: string;
};

export type SecurityPageContent = {
  languageCode: string;
  languageLabel: string;
  languageTitle: string;
  heroHighlight: string;
  heroRest: string;
  heroBody: string;
  pillarsHeadlineBefore: string;
  pillarsHeadlineHighlight: string;
  pillarsHeadlineAfter: string;
  pillars: SecurityPillar[];
  controlHeadlineBefore: string;
  controlHeadlineHighlight: string;
  controlHeadlineAfter: string;
  controlBody: string;
  controlCards: SecurityControlCard[];
  helpTitle: string;
  helpSeeAllLabel: string;
  helpSeeAllHref: string;
  helpLinks: SecurityHelpLink[];
  heroBubbles: SecurityHeroBubble[];
};

const englishContent: SecurityPageContent = {
  languageCode: "en",
  languageLabel: "English",
  languageTitle: "Language",
  heroHighlight: "Secure",
  heroRest: "by design",
  heroBody:
    "To keep you safe, we’ve designed messaging and calling with end-to-end protection, tools that put you in control of private media, and support when you need it—without exposing your chats to outsiders.",
  pillarsHeadlineBefore: "Built-in layers of security give you the ",
  pillarsHeadlineHighlight: "peace of mind",
  pillarsHeadlineAfter: " to focus on the people who matter.",
  pillars: [
    {
      icon: "lock",
      title: "End-to-end by default",
      body: "Protected chats are prepared so only the people in the conversation can read messages or open shared media on their devices.",
    },
    {
      icon: "timer",
      title: "Private media timers",
      body: "Send photos, videos, and voice notes with a one-time view or a 24-hour timer—so sensitive moments don’t linger forever.",
    },
    {
      icon: "shield",
      title: "You’re in control",
      body: "Block, report, and manage who can reach you. Seer is built so privacy choices stay visible and easy to change.",
    },
  ],
  controlHeadlineBefore: "Take ",
  controlHeadlineHighlight: "control",
  controlHeadlineAfter: " of your experience",
  controlBody:
    "Simple steps that help you stay safe—with multiple layers of protection for your chats, media, and account.",
  controlCards: [
    {
      id: "encryption",
      title: "Chats stay between you",
      body: "Messages are end-to-end encrypted. Only people in the chat can read or listen to them—not even Seer.",
      learnMoreHref: "/privacy",
      learnMoreLabel: "Learn more",
    },
    {
      id: "mediaTimers",
      title: "Private media timers",
      body: "Choose view once, 1 hour, or 24 hours when sending photos—just like Photo privacy in Seer.",
      learnMoreHref: "/privacy",
      learnMoreLabel: "Learn more",
    },
    {
      id: "reportBlock",
      title: "Report and block",
      body: "Use message actions in chat, report unwanted content, or block a contact from their profile—same controls as in the app.",
      learnMoreHref: "/contact",
      learnMoreLabel: "Learn more",
    },
    {
      id: "officialApp",
      title: "Always use official Seer",
      body: "Download Seer only from the App Store or Google Play. Fake apps put your account and data at risk.",
      learnMoreHref: "/download",
      learnMoreLabel: "Learn more",
    },
  ],
  helpTitle: "Need more help?",
  helpSeeAllLabel: "Contact support",
  helpSeeAllHref: "/contact",
  helpLinks: [
    { label: "How does Seer protect my chats?", href: "/privacy" },
    { label: "What can Seer see—and what can’t it?", href: "/privacy" },
    { label: "How do I manage my account requests?", href: "/requests" },
    { label: "Where do I download the official app?", href: "/download" },
    { label: "How does Seer use cookies on the web?", href: "/cookies" },
    { label: "Where can I read the terms of use?", href: "/terms" },
  ],
  heroBubbles: [
    {
      variant: "outgoing",
      text: "Mom, here are some safety tips for you",
      time: "9:41",
      read: true,
    },
    {
      variant: "document",
      documentTitle: "Safety Tips",
      documentMeta: "4 pages · PDF",
      time: "9:41",
      read: true,
    },
    {
      variant: "incoming",
      text: "Have fun, and stay safe",
      time: "11:59",
      reactions: ["❤️", "👍", "😂"],
    },
    {
      variant: "sticker",
      text: "🥰",
      time: "20:12",
      read: true,
    },
  ],
};

const securityPageContent: Record<string, SecurityPageContent> = {
  en: englishContent,
};

export function resolveSecurityPageContent(languageCode: string | null | undefined) {
  if (!languageCode) {
    return securityPageContent.en;
  }
  return securityPageContent[languageCode] ?? securityPageContent.en;
}
