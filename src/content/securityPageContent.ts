export type SecurityPageContent = {
  languageCode: string;
  languageLabel: string;
  languageTitle: string;
  eyebrow: string;
  title: string;
  description: string;
  heroTitle: string;
  heroBody: string;
  highlightsTitle: string;
  highlights: string[];
  sections: Array<{
    title: string;
    body: string;
  }>;
  note: string;
  contactLabel: string;
};

const securityPageContent: Record<string, SecurityPageContent> = {
  en: {
    languageCode: "en",
    languageLabel: "English",
    languageTitle: "Language",
    eyebrow: "Security & privacy",
    title: "Your Seer chats stay private.",
    description:
      "Seer is built so the people in your chat can read messages, open shared media, and view shared moments without exposing private content to outsiders.",
    heroTitle: "Private by default",
    heroBody:
      "End-to-end protection keeps personal conversations inside the chat. No one outside the chat, not even Seer, can open the protected content.",
    highlightsTitle: "What this includes",
    highlights: [
      "Text and voice messages stay inside the chat.",
      "Photos, videos, and documents can be protected before delivery.",
      "Location sharing stays attached to the people you choose.",
    ],
    sections: [
      {
        title: "End-to-end protection",
        body:
          "When a chat is protected, the content is prepared so only the intended participants can read or open it on their devices.",
      },
      {
        title: "Private media timers",
        body:
          "Seer supports privacy timers for private media such as photos, videos, and voice notes. You can choose one-time viewing or a 24-hour timer when sending supported media.",
      },
      {
        title: "What Seer can and cannot see",
        body:
          "We may handle delivery metadata needed to move messages between devices, but the protected chat content itself is designed to stay private to the people in the conversation.",
      },
    ],
    note:
      "Privacy timers described here apply to supported private media. Full chat-wide disappearing text messages may be added separately.",
    contactLabel: "Questions about privacy? Contact Seer support.",
  },
  fr: {
    languageCode: "fr",
    languageLabel: "Français",
    languageTitle: "Langue",
    eyebrow: "Sécurité et confidentialité",
    title: "Vos discussions Seer restent privées.",
    description:
      "Seer est conçu pour que seules les personnes de votre discussion puissent lire les messages, ouvrir les médias partagés et voir les moments partagés.",
    heroTitle: "Privé par défaut",
    heroBody:
      "La protection de bout en bout garde les conversations personnelles dans la discussion. Personne en dehors de cette discussion, pas même Seer, ne peut ouvrir le contenu protégé.",
    highlightsTitle: "Ce que cela inclut",
    highlights: [
      "Les messages texte et vocaux restent dans la discussion.",
      "Les photos, vidéos et documents peuvent être protégés avant l’envoi.",
      "Le partage de position reste limité aux personnes que vous choisissez.",
    ],
    sections: [
      {
        title: "Protection de bout en bout",
        body:
          "Quand une discussion est protégée, le contenu est préparé pour que seuls les participants prévus puissent le lire ou l’ouvrir sur leurs appareils.",
      },
      {
        title: "Minuteurs de médias privés",
        body:
          "Seer prend en charge des minuteurs de confidentialité pour les médias privés comme les photos, vidéos et notes vocales. Vous pouvez choisir un affichage unique ou un minuteur de 24 heures.",
      },
      {
        title: "Ce que Seer peut ou ne peut pas voir",
        body:
          "Nous pouvons traiter les métadonnées nécessaires à la livraison entre appareils, mais le contenu protégé est conçu pour rester privé entre les personnes de la conversation.",
      },
    ],
    note:
      "Les minuteurs décrits ici s’appliquent aux médias privés pris en charge. Les messages texte éphémères pour toute la discussion peuvent être ajoutés séparément.",
    contactLabel: "Des questions sur la confidentialité ? Contactez Seer.",
  },
  ak: {
    languageCode: "ak",
    languageLabel: "Akan",
    languageTitle: "Kasa",
    eyebrow: "Banbɔ ne kokoamsɛm",
    title: "Wo Seer nkɔmmɔbɔ tena kokoam.",
    description:
      "Seer yɛ adwuma sɛnea nnipa a wɔwɔ chat no mu nkutoo na wobetumi akenkan nkra, abue media, na ahwɛ nneɛma a mokyekyɛ.",
    heroTitle: "Kokoamsɛm fi mfiase",
    heroBody:
      "End-to-end banbɔ ma nkɔmmɔbɔ tena chat no mu. Obiara a ɔnka ho, mpo Seer, rentumi mmue protected content no.",
    highlightsTitle: "Nea eyi kyerɛ",
    highlights: [
      "Text ne voice messages tena chat no mu.",
      "Mfonini, video ne documents betumi anya banbɔ ansa na wɔde akɔ.",
      "Location sharing kɔ nnipa a wopaw wɔn nko ara.",
    ],
    sections: [
      {
        title: "End-to-end banbɔ",
        body:
          "Sɛ wɔabɔ chat ho ban a, wɔsiesie content no ma wɔn a wɔwɔ chat no mu nko ara na wobetumi akenkan anaa abue wɔ wɔn mfiri so.",
      },
      {
        title: "Private media timers",
        body:
          "Seer wɔ privacy timers ma private media te sɛ photos, videos ne voice notes. Wubetumi apaw one-time viewing anaa 24-hour timer.",
      },
      {
        title: "Nea Seer hu ne nea enhu",
        body:
          "Yebetumi adi metadata a ɛho hia ma delivery ho dwuma, nanso protected content no ara yɛ kokoam ma nnipa a wɔwɔ nkɔmmɔbɔ no mu.",
      },
    ],
    note:
      "Timers a yɛaka ho asɛm no fa supported private media ho. Chat-wide disappearing text messages betumi aba akyiri yi.",
    contactLabel: "Sɛ wowɔ privacy ho asɛm a, kasa kyerɛ Seer support.",
  },
  ee: {
    languageCode: "ee",
    languageLabel: "Ewe",
    languageTitle: "Gbememe",
    eyebrow: "Dedienɔnɔ kple nyeɖeɖe",
    title: "Wò Seer dzeɖoɖoawo le nyeɖeɖe me.",
    description:
      "Seer wowɔe ale be ame siwo le chat la me koe ate ŋu aɖe xlã nya, aʋu media, kple akpɔ nu siwo miekpɔna.",
    heroTitle: "Nyeɖeɖe tso gɔmedzedze",
    heroBody:
      "End-to-end gaxɔxɔ meɖe nya siwo le dzeɖoɖo me la ɖe chat la me. Ame si mele afima o, gɔ̃ hã Seer o, mate ŋu aʋu protected content o.",
    highlightsTitle: "Nu si le eme",
    highlights: [
      "Text kple voice messages le chat la me.",
      "Foto, video kple documents ate ŋu anyi protected hafi woaɖo goe.",
      "Location sharing yi ame siwo nètiawo gbɔ koe.",
    ],
    sections: [
      {
        title: "End-to-end gaxɔxɔ",
        body:
          "Ne wowɔ chat la be wòanye protected la, content la woaɖo ɖe mɔ nu na ame siwo yẹa koe ate ŋu aɖe xlã alo aʋu ɖe wɔnŋutɔwo ƒe mɔ̃ dzi.",
      },
      {
        title: "Private media timers",
        body:
          "Seer le privacy timers na private media abe foto, video kple voice notes ene. Àte ŋu atia one-time viewing alo timer si le gaƒoƒowo 24.",
      },
      {
        title: "Nu si Seer kpɔna kple nu si mekɔna o",
        body:
          "Míate ŋu adze delivery metadata ŋu, gake protected chat content la wowɔe be wòanye nyeɖeɖe na ame siwo le dzeɖoɖo la me.",
      },
    ],
    note:
      "Timers siawo ku ɖe supported private media ŋu. Disappearing text messages na chat blibo la ate ŋu ava le emegbe.",
    contactLabel: "Ne èle nya kple privacy ŋu la, gblɔ na Seer support.",
  },
  ga: {
    languageCode: "ga",
    languageLabel: "Ga",
    languageTitle: "Kasa",
    eyebrow: "Hewale kple kokoamsɛm",
    title: "Wo Seer nkɔmmɔbɔ yɛ kokoamsɛm.",
    description:
      "Wɔayɛ Seer sɛ nnipa a wɔwɔ wo chat no mu nkutoo na wobetumi akenkan nkra, abue media, na ahwɛ nneɛma a mokyekyɛ.",
    heroTitle: "Kokoamsɛm fi mfiase",
    heroBody:
      "End-to-end banbɔ ma nkɔmmɔbɔ no tena chat no mu. Obiara a ɔnka ho, mpo Seer, rentumi mmue protected content no.",
    highlightsTitle: "Nea eyi kyerɛ",
    highlights: [
      "Text ne voice messages tena chat no mu.",
      "Mfonini, video ne documents betumi anya banbɔ ansa na wɔde akɔ.",
      "Location sharing kɔ nnipa a wopaw wɔn nko ara.",
    ],
    sections: [
      {
        title: "End-to-end banbɔ",
        body:
          "Sɛ wɔabɔ chat no ho ban a, wɔsiesie content no ma wɔn a wɔwɔ chat no mu nko ara na wobetumi akenkan anaa abue wɔ wɔn mfiri so.",
      },
      {
        title: "Private media timers",
        body:
          "Seer wɔ privacy timers ma private media te sɛ photos, videos ne voice notes. Wubetumi apaw one-time viewing anaa 24-hour timer.",
      },
      {
        title: "Nea Seer hu ne nea enhu",
        body:
          "Yebetumi adi metadata a ɛho hia ma delivery ho dwuma, nanso protected content no ara yɛ kokoam ma nnipa a wɔwɔ nkɔmmɔbɔ no mu.",
      },
    ],
    note:
      "Timers a yɛaka ho asɛm no fa supported private media ho. Chat-wide disappearing text messages betumi aba akyiri yi.",
    contactLabel: "Sɛ wowɔ privacy ho asɛm a, kasa kyerɛ Seer support.",
  },
};

export function resolveSecurityPageContent(languageCode: string | null | undefined) {
  if (!languageCode) {
    return securityPageContent.en;
  }
  return securityPageContent[languageCode] ?? securityPageContent.en;
}
