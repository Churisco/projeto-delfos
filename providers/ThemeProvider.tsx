"use client";
import { createContext, useContext, useState, useEffect, useLayoutEffect, ReactNode } from "react";
import { Theme } from "@/lib/types";

interface ThemeContextType {
  theme: Theme;
  setTheme: (t: Theme) => void;
  language: "pt" | "en";
  setLanguage: (l: "pt" | "en") => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("light");
  const [language, setLanguageState] = useState<"pt" | "en">("pt");

  // Apply theme classes before paint to reduce hydration/style flicker
  useLayoutEffect(() => {
    try {
      const stored = (typeof window !== 'undefined') ? (localStorage.getItem("delfos-theme") as Theme | null) : null;
      const initial = stored || "light";
  applyThemeClass(initial);
  setThemeState(initial);
  updateFavicon(initial);
      try {
        const lang = (localStorage.getItem("delfos-lang") as "pt" | "en" | null) || "pt";
        setLanguageState(lang);
        document.documentElement.setAttribute("lang", lang === "pt" ? "pt-BR" : "en");
        // Ensure title matches language on first paint
        const initialTitle = lang === 'en' ? 'Delphic Project' : 'Projeto Delfos';
        if (typeof document !== 'undefined') {
          document.title = initialTitle;
        }
      } catch {}
    } catch {
      // no-op
    }
  }, []);

  function applyThemeClass(t: Theme) {
  if (typeof document === 'undefined') return;
  document.body.classList.remove("theme-light", "theme-dark", "theme-classic");
  document.body.classList.add(`theme-${t}`);
  if (t === "dark") document.documentElement.classList.add("dark");
  else document.documentElement.classList.remove("dark");
  }

  function updateFavicon(theme: Theme) {
    if (typeof window !== 'undefined') {
      const favicon = document.querySelector('link[rel="icon"]') as HTMLLinkElement;
      if (favicon) {
        // Logic: classic theme -> classic icon; dark theme -> light icon; light theme -> dark icon
        if (theme === "classic") {
          favicon.href = "/images/icons/delfos_classico.ico";
        } else if (theme === "dark") {
          favicon.href = "/images/icons/delfos_claro.ico";
        } else {
          favicon.href = "/images/icons/delfos_escuro.ico";
        }
        console.log("🎨 Favicon atualizado para tema:", theme, "- URL:", favicon.href);
      } else {
        console.log("❌ Favicon não encontrado");
      }
    }
  }

  function setTheme(t: Theme) {
    setThemeState(t);
    localStorage.setItem("delfos-theme", t);
    applyThemeClass(t);
    updateFavicon(t);
  }

  function setLanguage(l: "pt" | "en") {
    setLanguageState(l);
    try {
      localStorage.setItem("delfos-lang", l);
      document.documentElement.setAttribute("lang", l === "pt" ? "pt-BR" : "en");
      // Update document title to match language
      const newTitle = l === 'en' ? 'Delphic Project' : 'Projeto Delfos';
      if (typeof document !== 'undefined') {
        document.title = newTitle;
      }
    } catch {}
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme, language, setLanguage }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside ThemeProvider");
  return ctx;
}
