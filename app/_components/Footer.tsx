"use client";
import { useTheme } from "@/providers/ThemeProvider";

export default function Footer() {
  const { language } = useTheme();
  const title = language === 'en' ? 'Delphic Project' : 'Projeto Delfos';
  const tagline = language === 'en'
    ? 'Inspired by the Oracle, guided by technology.'
    : 'Inspirado no Oráculo, guiado pela tecnologia.';
  return (
    <footer className="text-center mt-12 py-4 border-t border-gray-200 dark:border-gray-700 theme-classic:border-classic-text/40">
      <p className="text-sm text-gray-500 dark:text-gray-400 theme-classic:text-classic-secondary">
  &copy; {new Date().getFullYear()} {title}. {tagline}
      </p>
    </footer>
  );
}
