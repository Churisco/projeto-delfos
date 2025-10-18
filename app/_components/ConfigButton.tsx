"use client";
import { useRef, useState, useEffect } from "react";
import ThemeSwitcher from "./ThemeSwitcher";
import { useTheme } from "@/providers/ThemeProvider";
import { trackEvent } from "@/lib/analytics";

interface ConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  anchor?: { x: number; y: number } | null;
}

function ConfigModal({ isOpen, onClose, anchor }: ConfigModalProps) {
  const { setTheme, theme, language, setLanguage } = useTheme();

  const changeFavicon = (type: "claro" | "escuro") => {
    try {
      localStorage.setItem("delfos-favicon", type);
      const favicon = document.querySelector('link[rel="icon"]') as HTMLLinkElement;
      if (favicon) {
        favicon.href = type === "claro" ? "/images/icons/delfos_claro.ico" : "/images/icons/delfos_escuro.ico";
      }
      console.log(`Favicon definido para ${type}`);
    } catch {}
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 p-4" onClick={onClose}>
      <div
        className="bg-white dark:bg-gray-800 theme-classic:bg-classic-card-bg rounded-lg p-4 sm:p-6 
                   w-full max-w-sm mx-auto shadow-xl"
        style={typeof window !== 'undefined' && window.innerWidth >= 640 && anchor ? { 
          position: 'absolute',
          left: Math.min(anchor.x, window.innerWidth - 400), 
          top: anchor.y, 
          transform: "translate(-100%, 0)",
          width: '380px',
          maxWidth: 'none'
        } : { 
          marginTop: '20vh'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-gray-100 theme-classic:text-classic-text">Configurações</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 theme-classic:text-classic-secondary theme-classic:hover:text-classic-text text-xl sm:text-2xl leading-none p-1"
          >
            ×
          </button>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 theme-classic:text-classic-text mb-2">
              Tema
            </label>
            <ThemeSwitcher />
          </div>
          
          {/* Favicon switching removed as requested; official favicon set in layout */}

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 theme-classic:text-classic-text mb-2">
              Idioma / Language
            </label>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  trackEvent.languageChanged("pt");
                  setLanguage("pt");
                }}
                className={`px-3 py-1.5 text-sm rounded transition-colors ${language === 'pt' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
              >
                Português
              </button>
              <button
                onClick={() => {
                  trackEvent.languageChanged("en");
                  setLanguage("en");
                }}
                className={`px-3 py-1.5 text-sm rounded transition-colors ${language === 'en' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
              >
                English
              </button>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 theme-classic:text-classic-secondary mt-2 leading-relaxed">(rótulos básicos; conteúdo do questionário permanece pt-BR por enquanto)</p>
          </div>

          {/* Informações da tela (só em dev) */}
          {process.env.NODE_ENV === 'development' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Resolução da Tela
              </label>
              <div className="text-xs text-gray-600 bg-gray-50 p-2 rounded">
                <div>Largura: {typeof window !== 'undefined' ? window.innerWidth : '0'}px</div>
                <div>Altura: {typeof window !== 'undefined' ? window.innerHeight : '0'}px</div>
                {typeof window !== 'undefined' && window.innerWidth >= 2560 && (
                  <div className="text-green-600 font-medium mt-1">✓ Otimizado para Lenovo 2560x1600</div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ConfigButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const [anchor, setAnchor] = useState<{x:number;y:number} | null>(null);

  return (
    <>
      <button 
        ref={btnRef}
        onClick={() => {
          const rect = btnRef.current?.getBoundingClientRect();
          if (rect) setAnchor({ x: rect.right, y: rect.bottom + 8 });
          trackEvent.configOpened();
          setIsModalOpen(true);
        }}
        className="p-2 sm:p-3 rounded-full bg-white/90 hover:bg-white shadow-lg transition-all duration-300 hover:scale-110 border border-gray-200/50"
        aria-label="Configurações"
      >
        {/* Ícone de engrenagem mais detalhado */}
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="sm:w-7 sm:h-7">
          <path 
            d="M12 15.5A3.5 3.5 0 0 1 8.5 12A3.5 3.5 0 0 1 12 8.5a3.5 3.5 0 0 1 3.5 3.5a3.5 3.5 0 0 1-3.5 3.5m7.43-2.53c.04-.32.07-.64.07-.97c0-.33-.03-.66-.07-1l2.11-1.63c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.31-.61-.22l-2.49 1c-.52-.39-1.06-.73-1.69-.98l-.37-2.65A.506.506 0 0 0 14 2h-4c-.25 0-.46.18-.5.42l-.37 2.65c-.63.25-1.17.59-1.69.98l-2.49-1c-.22-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64L4.57 11c-.04.34-.07.67-.07 1c0 .33.03.65.07.97l-2.11 1.66c-.19.15-.25.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1.01c.52.4 1.06.74 1.69.99l.37 2.65c.04.24.25.42.5.42h4c.25 0 .46-.18.5-.42l.37-2.65c.63-.26 1.17-.59 1.69-.99l2.49 1.01c.22.08.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.66Z" 
            fill="#374151"
            className="group-hover:fill-gray-600 transition-colors"
          />
        </svg>
      </button>
      
      <ConfigModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} anchor={anchor} />
    </>
  );
}