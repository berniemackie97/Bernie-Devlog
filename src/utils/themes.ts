export interface ThemeOption {
  id: string;
  label: string;
  description: string;
  swatch: string[];
  isDark?: boolean;
  fonts?: {
    display: string;
    body: string;
  };
}

export const THEMES: ThemeOption[] = [
  {
    id: "country",
    label: "Country Garden",
    description: "Lavender mornings and olive ink",
    swatch: ["#FFFFE3", "#DBD4FF", "#808034", "#723480"],
    fonts: {
      display: "Playfair Display, serif",
      body: "Newsreader, serif",
    },
  },
  {
    id: "nightpress",
    label: "Night Press",
    description: "Midnight ledger with soft violet highlights",
    swatch: ["#1F1A24", "#5E4B8B", "#A9B665", "#F1ECFF"],
    isDark: true,
    fonts: {
      display: "Cormorant Garamond, serif",
      body: "IBM Plex Sans, sans-serif",
    },
  },
  {
    id: "retro",
    label: "Retro Neon",
    description: "Original technomantic palette",
    fonts: {
      display: "Basteleur Bold, serif",
      body: "Young Serif, serif",
    },
    swatch: ["#2B2836", "#84FBA2", "#BD93F9", "#F3E4A2"],
    isDark: true,
  },
  {
    id: "newsprint",
    label: "Sunday Newsprint",
    description: "Warm paper with burgundy ink",
    fonts: {
      display: "Playfair Display, serif",
      body: "Newsreader, serif",
    },
    swatch: ["#FFF7E6", "#E6DED1", "#5A4632", "#A05C5C"],
  },
];

export const DEFAULT_THEME = "country";
