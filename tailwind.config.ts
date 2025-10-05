import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
    "./providers/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        'cinzel': ['var(--font-cinzel)', 'serif'],
        'sans': ['var(--font-inter)', 'sans-serif'],
      },
      colors: {
        classic: {
          background: "#051d3b",
            text: "#f5cf0d",
            primary: "#f5cf0d",
            secondary: "#e0e0e0",
            "card-bg": "rgba(245,207,13,0.1)",
            "card-border": "#f5cf0d",
            "button-bg": "#f5cf0d",
            "button-text": "#051d3b"
        }
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        fadeOut: {
          "0%": { opacity: "1", transform: "translateY(0)" },
          "100%": { opacity: "0", transform: "translateY(-10px)" }
        }
      },
      animation: {
        fadeIn: "fadeIn 0.5s ease-in-out",
        fadeOut: "fadeOut 0.3s ease-in-out forwards"
      }
    }
  },
  plugins: []
};

export default config;
