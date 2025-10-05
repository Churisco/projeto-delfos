"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";

interface LayoutContextType {
  isIntroView: boolean;
  setIsIntroView: (value: boolean) => void;
}

const LayoutContext = createContext<LayoutContextType | null>(null);

export const useLayout = () => {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error('useLayout must be used within LayoutWrapper');
  }
  return context;
};

interface LayoutWrapperProps {
  children: ReactNode;
}

export default function LayoutWrapper({ children }: LayoutWrapperProps) {
  const [isIntroView, setIsIntroView] = useState(true);

  console.log("🏛️ Layout:", isIntroView ? "INTRO" : "NORMAL");

  return (
    <LayoutContext.Provider value={{ isIntroView, setIsIntroView }}>
      {isIntroView ? (
        <div className="min-h-screen">{children}</div>
      ) : (
        <div className="container mx-auto max-w-5xl p-4 md:p-8">
          <Header />
          <main id="main-content" className="min-h-[70vh]">{children}</main>
          <Footer />
        </div>
      )}
    </LayoutContext.Provider>
  );
}