"use client";
import { useEffect, useState } from 'react';

export function useScreenSize() {
  const [screenSize, setScreenSize] = useState({
    width: 0,
    height: 0,
    isLenovo: false,
    isUltraWide: false,
  });

  useEffect(() => {
    function updateScreenSize() {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      setScreenSize({
        width,
        height,
        isLenovo: width >= 2560 && height >= 1600,
        isUltraWide: width >= 2400,
      });
    }

    updateScreenSize();
    window.addEventListener('resize', updateScreenSize);
    
    return () => window.removeEventListener('resize', updateScreenSize);
  }, []);

  return screenSize;
}

// Hook para aplicar classes condicionais baseadas na tela
export function useResponsiveClasses() {
  const { isLenovo, isUltraWide } = useScreenSize();
  
  return {
    container: `${isLenovo ? 'lenovo-optimized' : ''} ${isUltraWide ? 'ultra-wide' : ''}`,
    text: isLenovo ? 'text-lg' : isUltraWide ? 'text-base' : 'text-sm',
    spacing: isLenovo ? 'p-8 gap-6' : isUltraWide ? 'p-6 gap-4' : 'p-4 gap-3',
  };
}

export default function ScreenDetector() {
  const { width, height, isLenovo } = useScreenSize();
  
  // Só mostra em desenvolvimento
  if (process.env.NODE_ENV !== 'development') return null;
  
  return (
    <div className="fixed bottom-4 left-4 bg-black/80 text-white p-2 rounded text-xs z-50">
      {width}x{height} {isLenovo && '(Lenovo Optimized)'}
    </div>
  );
}