"use client";
import ThemeSwitcher from "./ThemeSwitcher";
import { useTheme } from "@/providers/ThemeProvider";

export default function Header() {
  const { language } = useTheme();
  const title = language === 'en' ? 'Delphic Project' : 'Projeto Delfos';
  return (
    <header className="flex flex-col sm:flex-row justify-between items-center mb-8">
      <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4 sm:mb-0">{title}</h1>
      <ThemeSwitcher />
    </header>
  );
}
