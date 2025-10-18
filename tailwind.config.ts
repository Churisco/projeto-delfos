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
      screens: {
        'xs': '475px',  // Breakpoint para celulares maiores
        '2xl': '1400px', // Para telas muito grandes
        '3xl': '2400px', // Para telas ultra-wide como Lenovo 2560x1600
        'lenovo': '2560px', // Breakpoint específico para o Lenovo de desenvolvimento
        'short': { 'raw': '(max-height: 600px)' }, // Para devices de altura baixa (landscape mode)
      },
      fontFamily: {
        'cinzel': ['var(--font-cinzel)', 'serif'],
        'sans': ['var(--font-inter)', 'sans-serif'],
      },
      colors: {
        classic: {
          background: "#041c3c",
            text: "#e5e7eb",
            primary: "#f5cf0d",
            secondary: "#9ca3af",
            "card-bg": "rgba(255,255,255,0.05)",
            "card-border": "rgba(245,207,13,0.3)",
            "button-bg": "#f5cf0d",
            "button-text": "#041c3c"
        }
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
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
