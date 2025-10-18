"use client";
import { useState, useEffect } from "react";
import IntroSection from "./IntroSection";
import TestSection from "./TestSection";
import ResultsView from "./ResultsView";
import { useLayout } from "./LayoutWrapper";
import { UserAnswers, CompatibilityResult } from "@/lib/types";
import { calculateAptitudeScoresLocalized, calculateCompatibilityLocalized } from "@/lib/utils";
import { loadView, saveView, clearView } from "@/lib/persistence";
import { useTheme } from "@/providers/ThemeProvider";
import { trackEvent } from "@/lib/analytics";

type View = "intro" | "test" | "results";

export default function TestController() {
  const { language } = useTheme();
  const [view, setView] = useState<View>(() => loadView() || "intro");
  const [answers, setAnswers] = useState<UserAnswers>({});
  const [results, setResults] = useState<CompatibilityResult[]>([]);
  const { setIsIntroView } = useLayout();

  // Atualizar o layout quando a view mudar
  useEffect(() => {
    setIsIntroView(view === "intro");
    saveView(view);
  }, [view, setIsIntroView]);

  function handleStart() {
    console.log("⚡ Iniciando o teste!");
    trackEvent.testStarted();
    // Persist view immediately to avoid remount race conditions
    saveView("test");
    setView("test");
  }

  function handleSubmit() {
    const scores = calculateAptitudeScoresLocalized(answers, language);
    const compat = calculateCompatibilityLocalized(scores, language);
    setResults(compat);
    // Persist before switching view
    saveView("results");
    setView("results");
  }

  function handleRestart() {
    setAnswers({});
    setResults([]);
    // Ensure persistence reflects intro
    saveView("intro");
    setView("intro");
    window.scrollTo({ top: 0, behavior: "smooth" });
    clearView();
  }

  if (view === "intro") {
    return <IntroSection onStart={handleStart} />;
  }

  if (view === "test") {
    return (
      <TestSection
        answers={answers}
        setAnswers={setAnswers}
        onSubmit={handleSubmit}
        onBackToIntro={() => setView("intro")}
      />
    );
  }

  if (view === "results") {
    return (
      <ResultsView
        results={results}
        userAnswers={answers}
        onRestart={handleRestart}
      />
    );
  }

  return null;
}