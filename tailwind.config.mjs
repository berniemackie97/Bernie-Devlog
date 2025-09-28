import defaultTheme from "tailwindcss/defaultTheme";
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      keyframes: {
        animatedgradient: {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
      },
      backgroundSize: {
        "300%": "300%",
      },
      animation: {
        gradient: "animatedgradient 6s ease infinite alternate",
      },
      fontFamily: {
        serif: ["Newsreader", ...defaultTheme.fontFamily.serif],
        display: ["Playfair Display", "Newsreader", ...defaultTheme.fontFamily.serif],
        lithops: ["Playfair Display", "Newsreader", ...defaultTheme.fontFamily.serif],
      },
      colors: {
        cream: "var(--color-cream)",
        lavender: "var(--color-lavender)",
        olive: "var(--color-olive)",
        plum: "var(--color-plum)",
        ink: "var(--color-ink)",
        muted: "var(--color-muted)",
        highlight: "var(--color-highlight)",
        border: "var(--color-border)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],

  daisyui: {
    darkTheme: "nightpress",
    themes: [
      {
        country: {
          primary: "#723480",
          secondary: "#DBD4FF",
          accent: "#808034",
          neutral: "#6F6686",
          "base-100": "#FFFFE3",
          "base-200": "#F7F3FF",
          "base-300": "#EDE6FF",
          "base-content": "#2F213C",
          info: "#7AA3FF",
          success: "#5A9962",
          warning: "#F2C26B",
          error: "#D4647A",
        },
      },
      {
        nightpress: {
          primary: "#D8C4FF",
          secondary: "#5E4B8B",
          accent: "#A9B665",
          neutral: "#3A2A4D",
          "base-100": "#1F1A24",
          "base-200": "#241C2B",
          "base-300": "#2F2438",
          "base-content": "#F1ECFF",
          info: "#7AA3FF",
          success: "#8DC891",
          warning: "#F2C26B",
          error: "#F889AB",
        },
      },
      {
        retro: {
          primary: "#84FBA2",
          secondary: "#BD93F9",
          accent: "#F3E4A2",
          neutral: "#48445A",
          "base-100": "#2B2836",
          "base-200": "#332F43",
          "base-300": "#3C384D",
          "base-content": "#CEDEFF",
          info: "#93B4FF",
          success: "#84FBA2",
          warning: "#FFB793",
          error: "#F36A66",
        },
      },
      {
        newsprint: {
          primary: "#A05C5C",
          secondary: "#E6DED1",
          accent: "#5A4632",
          neutral: "#7C6B5E",
          "base-100": "#FFF7E6",
          "base-200": "#F4EBDE",
          "base-300": "#EADFCC",
          "base-content": "#2F2118",
          info: "#7AA3FF",
          success: "#789174",
          warning: "#F0B674",
          error: "#C05B5B",
        },
      },
      "light",
      "dracula",
    ],
  },
};
