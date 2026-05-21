export type RequestCategory = {
  id: string;
  title: string;
  description: string;
  href: string;
};

export const requestCategories: RequestCategory[] = [
  {
    id: "account",
    title: "Account",
    description: "Delete your account, export data, fix profile details, or resolve login issues.",
    href: "/requests/account",
  },
  {
    id: "billing",
    title: "Billing & payments",
    description: "Report a failed transaction, missing receipt, or incorrect charge.",
    href: "/requests/billing/payment-issue",
  },
  {
    id: "technical",
    title: "Technical support",
    description: "App crashes, sync problems, notifications, or other technical issues.",
    href: "/requests/technical/app-issue",
  },
  {
    id: "other",
    title: "Other",
    description: "Anything that does not fit the categories above.",
    href: "/requests/other/general",
  },
];

export type AccountRequestOption = {
  slug: string;
  title: string;
  description: string;
};

export const accountRequestOptions: AccountRequestOption[] = [
  {
    slug: "delete",
    title: "Delete account",
    description: "Request permanent deletion of your Seer account and associated data.",
  },
  {
    slug: "data-export",
    title: "Data export",
    description: "Request a copy of the personal data we hold about you.",
  },
  {
    slug: "profile-correction",
    title: "Profile correction",
    description: "Update your display name, phone number, or other profile details.",
  },
  {
    slug: "login-issues",
    title: "Login issues",
    description: "Trouble signing in, OTP not arriving, or PIN reset problems.",
  },
];
