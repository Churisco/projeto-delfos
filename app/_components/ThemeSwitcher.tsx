"use client";
import { useTheme } from "@/providers/ThemeProvider";
import { Theme } from "@/lib/types";
import { trackEvent } from "@/lib/analytics";

const themes: { id: Theme; icon: JSX.Element; label: string }[] = [
  {
    id: "light",
    label: "Claro",
    icon: (
      <svg viewBox="0 0 24 24" className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="5" />
        <path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
      </svg>
    ),
  },
  {
    id: "dark",
    label: "Escuro",
    icon: (
      <svg viewBox="0 0 24 24" className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12.79A9 9 0 0 1 11.21 3 7 7 0 1 0 21 12.79z" />
      </svg>
    ),
  },
  {
    id: "classic",
    label: "Clássico",
    icon: (
      <svg viewBox="0 0 24 24" className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 10h18M5 10v10m14-10v10M2 10l10-6 10 6M9 21h6" />
      </svg>
    ),
  },
];

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  return (
    <div className="flex space-x-1 sm:space-x-2" role="group" aria-label="Alternar tema">
      {themes.map(t => (
        <button
          key={t.id}
          className={`py-1.5 px-2 sm:py-2 sm:px-3 rounded-lg border transition-colors flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900 focus-visible:ring-offset-1 ${
            theme === t.id
              ? "bg-blue-500 text-white dark:bg-blue-400 dark:text-black theme-classic:bg-classic-card-bg"
              : "bg-transparent text-secondary"
          } theme-light:border-gray-300 theme-dark:border-gray-600 theme-classic:border-gray-600`}
          onClick={() => {
            trackEvent.themeChanged(t.id);
            setTheme(t.id);
          }}
          title={`Tema ${t.label}`}
          aria-pressed={theme === t.id}
          aria-label={`Tema ${t.label}`}
        >
          <span className="w-4 h-4 sm:w-5 sm:h-5">
            {t.icon}
          </span>
        </button>
      ))}
    </div>
  );
}
