"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import ConfigButton from "./ConfigButton";
import { useTheme } from "@/providers/ThemeProvider";
import { trackEvent } from "@/lib/analytics";

export default function IntroSection({ onStart }: { onStart: () => void }) {
  const [showTooltip, setShowTooltip] = useState(true);
  // Dev helper: allow forcing the debug image via URL (add #debug-img or ?debug-img=1)
  const [useDebugImage, setUseDebugImage] = useState(false);
  // Allow adjusting door hotspot via query params to account for different image proportions
  const [doorTop, setDoorTop] = useState<number>(66.2);
  const [doorLeft, setDoorLeft] = useState<number>(50);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Esconder tooltip depois de 5 segundos
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTooltip(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  // Read URL flags on mount to optionally show the debug image
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const url = new URL(window.location.href);
      const hasHash = url.hash.includes("debug-img");
      const hasQuery = url.searchParams.get("debug-img") === "1";
      setUseDebugImage(hasHash || hasQuery);

      // Optional: override door hotspot position via URL (percent values 0-100)
      const dt = url.searchParams.get("doorTop");
      const dl = url.searchParams.get("doorLeft");
      if (dt) {
        const v = Math.max(0, Math.min(100, parseFloat(dt)));
        if (!Number.isNaN(v)) setDoorTop(v);
      }
      if (dl) {
        const v = Math.max(0, Math.min(100, parseFloat(dl)));
        if (!Number.isNaN(v)) setDoorLeft(v);
      }
    } catch {
      // ignore
    }
  }, []);

  const imgSrc = "/images/fundo/templooficial.png";
  const { language } = useTheme();
  const tipText = language === 'en' ? 'Click the door to enter' : 'Clique na porta para entrar';

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden -mb-8 
                    bg-white intro-bg transition-colors duration-300 px-4 sm:px-6 lg:px-8 lenovo:px-12">
      {/* Templo com a mesma arte original, mas PNG com fundo transparente */}
      <div className="absolute inset-0 flex items-center justify-center p-4 lenovo:p-6">
        <div
          ref={containerRef}
          className="relative w-full max-w-sm xs:max-w-lg sm:max-w-2xl md:max-w-4xl lg:max-w-5xl xl:max-w-6xl 
                     lenovo:max-w-6xl 3xl:max-w-7xl
                     aspect-[4/3] sm:aspect-[5/3] md:aspect-[4/3] lenovo:aspect-[4/3]"
          onClick={(e) => {
            // Fallback: if user clicks near the door area, trigger transition
            const el = containerRef.current;
            if (!el) return;
            const rect = el.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const clickY = e.clientY - rect.top;
            const centerX = (doorLeft / 100) * rect.width;
            const centerY = (doorTop / 100) * rect.height;
            // Tighter hitbox: ~10% width, ~34% height of the image area
            const hitW = rect.width * 0.10;
            const hitH = rect.height * 0.34;
            const withinX = Math.abs(clickX - centerX) <= hitW / 2;
            const withinY = Math.abs(clickY - centerY) <= hitH / 2;
            if (withinX && withinY) {
              setShowTooltip(false);
              onStart();
            }
          }}
        >
          <Image
            src={imgSrc}
            alt="Templo Grego"
            fill
            className="object-contain pointer-events-none"
            priority
            unoptimized={process.env.NODE_ENV !== "production"}
          />
          
          {/* Botão invisível sobre a porta - posição simples e funcional */}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              console.log("🚪 PORTA CLICADA!");
              setShowTooltip(false);
              trackEvent.enterTemple();
              onStart();
            }}
            onMouseDown={(e) => {
              // ensure focus and prevent parent handlers
              e.stopPropagation();
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                e.stopPropagation();
                setShowTooltip(false);
                trackEvent.enterTemple();
                onStart();
              }
            }}
            style={{
              top: `${doorTop}%`,
              left: `${doorLeft}%`,
              // Precise 1px downward adjustment while keeping -translate-y-1/2
              // Uses Tailwind's CSS variable for transform composition
              "--tw-translate-y": "calc(-50% + 1px)",
            } as React.CSSProperties}
            className={`absolute transform -translate-x-1/2 -translate-y-1/2 
                     w-8 h-16 xs:w-10 xs:h-20 sm:w-[2.75rem] sm:h-[6.75rem] 
                     md:w-[3.75rem] md:h-[7.5rem] lg:w-[4.75rem] lg:h-[8.75rem]
                     lenovo:w-[4.75rem] lenovo:h-[8.75rem] 3xl:w-[5rem] 3xl:h-[9rem]
                     bg-black hover:bg-black 
                     transition-all duration-300 hover:scale-105 
                     rounded-sm border-2 ${useDebugImage ? "border-yellow-400" : "border-transparent"}
                     focus:outline-none focus:ring-2 focus:ring-yellow-500
                     pointer-events-auto cursor-pointer z-50`}
            aria-label="Entrar no Templo"
            role="button"
            tabIndex={0}
          >
          </button>

          {/* Transição de fumaça removida da entrada */}
          
          {/* Tooltip indicativo ancorado à direita da porta */}
          {showTooltip && (
            <div
              className="absolute z-40"
              style={{
                top: `calc(${doorTop}% - 18px)`,
                left: `calc(${doorLeft}% + 40px)`,
                transform: "translateY(-50%)",
              }}
            >
              <div className="relative bg-black/90 text-white px-3 py-2 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-medium shadow-lg max-w-[180px] sm:max-w-none">
                {/* Botão X interno no canto superior direito */}
                <button
                  onClick={() => setShowTooltip(false)}
                  className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-black/70 text-white/90 hover:text-white flex items-center justify-center text-xs font-bold shadow"
                  aria-label={language === 'en' ? 'Close tip' : 'Fechar dica'}
                >
                  ×
                </button>
                {tipText}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Título no topo */}
      <div className="absolute top-4 sm:top-8 lenovo:top-10 left-1/2 transform -translate-x-1/2 z-10 px-4 w-full">
        <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 
                       lenovo:text-6xl 3xl:text-7xl
                       font-cinzel text-center text-gray-800 intro-title transition-colors duration-300
                       leading-tight">
          {language === 'en' ? 'Delphic Project' : 'PROJETO DELFOS'}
        </h1>
      </div>

      {/* Ícone de configurações - posição ajustada (mais acima) */}
      <div className="absolute top-2 right-4 sm:top-4 sm:right-6 md:top-8 md:right-12 lenovo:top-12 lenovo:right-14 z-10">
        <ConfigButton />
      </div>
    </div>
  );
}
