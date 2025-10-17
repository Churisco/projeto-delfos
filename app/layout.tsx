import "./globals.css";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import { ThemeProvider } from "@/providers/ThemeProvider";
import LayoutWrapper from "./_components/LayoutWrapper";
import ScreenDetector from "./_components/ScreenDetector";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

// Importar Cinzel via CSS Link ao invés do Next.js fonts
const cinzelLink = "https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700;800;900&display=swap";

export const metadata: Metadata = {
  title: "Projeto Delfos",
  description: "Descubra sua carreira ideal através do autoconhecimento e aptidões.",
  keywords: ["orientação vocacional", "teste vocacional", "carreira", "profissão", "aptidões"],
  authors: [{ name: "Projeto Delfos" }],
  robots: "index, follow",
  openGraph: {
    title: "Projeto Delfos",
    description: "Descubra sua carreira ideal através do autoconhecimento e aptidões.",
    type: "website",
    locale: "pt_BR",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#3b82f6",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${inter.variable}`} suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <meta name="theme-color" content="#3b82f6" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
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
          <ScreenDetector />
        </ThemeProvider>
      </body>
    </html>
  );
}
