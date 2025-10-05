import "./globals.css";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import { ThemeProvider } from "@/providers/ThemeProvider";
import LayoutWrapper from "./_components/LayoutWrapper";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

// Importar Cinzel via CSS Link ao invés do Next.js fonts
const cinzelLink = "https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700;800;900&display=swap";

export const metadata: Metadata = {
  title: "Projeto Delfos",
    description: "Descubra sua carreira ideal através do autoconhecimento e aptidões."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${inter.variable}`} suppressHydrationWarning>
      <head>
  <link rel="icon" href="/images/icons/delfos_classico.ico" />
        {/* Preload smoke transition GIF to avoid first-click delay */}
        <link rel="preload" as="image" href="/images/gifs/fumaca.gif" />
        <link href={cinzelLink} rel="stylesheet" />
        <script
          // Evita flash de tema incorreto e reduz risco de mismatch
          dangerouslySetInnerHTML={{
            __html: `(() => {try { const t = localStorage.getItem('delfos-theme') || 'light'; document.documentElement.classList.toggle('dark', t==='dark'); document.body?.classList.add('theme-' + t); } catch(_) {} })();`
          }}
        />
      </head>
      <body className="font-sans bg-white dark:bg-black theme-classic:bg-classic-background transition-colors duration-300" suppressHydrationWarning>
        <ThemeProvider>
          <LayoutWrapper>{children}</LayoutWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
