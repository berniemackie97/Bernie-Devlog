export interface ThemeOption {
  id: string;
  label: string;
  description: string;
  swatch: string[];
  isDark?: boolean;
}

export const THEMES: ThemeOption[] = [
  {
    id: "country",
    label: "Country Garden",
    description: "Lavender mornings and olive ink",
    swatch: ["#FFFFE3", "#DBD4FF", "#808034", "#723480"],
  },
  {
    id: "nightpress",
    label: "Night Press",
    description: "Midnight ledger with soft violet highlights",
    swatch: ["#1F1A24", "#5E4B8B", "#A9B665", "#F1ECFF"],
    isDark: true,
  },
  {
    id: "retro",
    label: "Retro Neon",
    description: "Original technomantic palette",
    swatch: ["#2B2836", "#84FBA2", "#BD93F9", "#F3E4A2"],
    isDark: true,
  },
  {
    id: "newsprint",
    label: "Sunday Newsprint",
    description: "Warm paper with burgundy ink",
    swatch: ["#FFF7E6", "#E6DED1", "#5A4632", "#A05C5C"],
  },
];

export const DEFAULT_THEME = "country";
