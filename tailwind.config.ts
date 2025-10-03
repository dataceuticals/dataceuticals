import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./packages/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        "background-solid": "var(--background-solid)",
        foreground: "var(--foreground)",
        muted: "var(--muted)",
        "muted-foreground": "var(--muted-foreground)",
        border: "var(--border)",
        card: "var(--card)",
        "card-foreground": "var(--card-foreground)",
        "card-border": "var(--card-border)",
        "brand-primary": "var(--brand-primary)",
        "brand-primary-light": "var(--brand-primary-light)",
        "brand-primary-foreground": "var(--brand-primary-foreground)",
        "brand-accent": "var(--brand-accent)",
        "brand-accent-light": "var(--brand-accent-light)",
        "brand-secondary": "var(--brand-secondary)",
        "brand-gradient": "var(--brand-gradient)",
        "brand-gradient-soft": "var(--brand-gradient-soft)",
        "navbar-bg": "var(--navbar-bg)",
        "navbar-border": "var(--navbar-border)",
        "navbar-text": "var(--navbar-text)",
        "navbar-hover": "var(--navbar-hover)",
        "navbar-hover-text": "var(--navbar-hover-text)",
        "navbar-gradient": "var(--navbar-gradient)",
      },
      animation: {
        "fade-in": "fadeIn 0.3s ease-in-out",
        "slide-up": "slideUp 0.2s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
