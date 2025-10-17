"use client";
import ThemeSwitcher from "./ThemeSwitcher";
import { useTheme } from "@/providers/ThemeProvider";

export default function Header() {
  const { language } = useTheme();
  const title = language === 'en' ? 'Delphic Project' : 'Projeto Delfos';
  return (
    <header className="flex flex-col sm:flex-row justify-between items-center mb-6 sm:mb-8 lenovo:mb-10 gap-4 lenovo:gap-6">
      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl lenovo:text-5xl 3xl:text-6xl 
                     font-bold text-primary text-center sm:text-left">
        {title}
      </h1>
      <div className="flex-shrink-0 lenovo:scale-110 3xl:scale-125">
        <ThemeSwitcher />
      </div>
    </header>
  );
}
