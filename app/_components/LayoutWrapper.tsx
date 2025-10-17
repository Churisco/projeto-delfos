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
        <div className="container mx-auto max-w-7xl lenovo:max-w-[80vw] 3xl:max-w-[75vw] 
                        px-3 sm:px-4 md:px-6 lg:px-8 lenovo:px-10 3xl:px-12 
                        py-4 md:py-8 lenovo:py-10">
          <Header />
          <main id="main-content" className="min-h-[70vh]">{children}</main>
          <Footer />
        </div>
      )}
    </LayoutContext.Provider>
  );
}