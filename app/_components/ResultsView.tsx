"use client";
import { useState, useMemo } from "react";
import { CompatibilityResult, UserScores, UserAnswers } from "@/lib/types";
import { getAptitudesByLang, getQuestionsByLang } from "@/lib/data";
import { calculateAptitudeScores } from "@/lib/utils";
import { useTheme } from "@/providers/ThemeProvider";

interface ResultsViewProps {
  results: CompatibilityResult[];
  userAnswers: UserAnswers;
  onRestart: () => void;
}

export default function ResultsView({ results, userAnswers, onRestart }: ResultsViewProps) {
  const { language } = useTheme();
  const [showApt, setShowApt] = useState(false);
  const scores: UserScores = calculateAptitudeScores(userAnswers);
  const aptList = useMemo(() => getAptitudesByLang(language), [language]);
  const qCount = useMemo(() => getQuestionsByLang(language).length, [language]);

  return (
    <section className="card" data-testid="results-section">
      <h2 className="text-2xl font-semibold mb-6 text-primary text-center">
        {language === 'en' ? 'Your Delfos Results' : 'Seu Resultado Delfos'}
      </h2>
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4 text-primary">
          {language === 'en' ? 'Top 5 Matching Professions' : 'Top 5 Profissões Compatíveis'}
        </h3>
        <div className="space-y-4">
          {results.length > 0 ? results.map((r, i) => (
            <div
              key={r.name}
              className="course-suggestion-card flex justify-between items-center shadow-sm animate-fadeIn"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <span className="text-lg font-semibold text-primary">{r.name}</span>
              <span className="text-2xl font-bold text-primary">{r.score}%</span>
            </div>
          )) : (
            <p className="text-secondary">{language === 'en' ? 'No recommendations generated.' : 'Nenhuma recomendação gerada.'}</p>
          )}
        </div>
      </div>

      <div className="mb-6 text-center">
        <button
          onClick={() => setShowApt(s => !s)}
          className="button button-secondary w-full sm:w-auto"
        >
          {showApt ? (language === 'en' ? 'Hide Aptitudes' : 'Ocultar Aptidões') : (language === 'en' ? 'My Aptitudes' : 'Minhas Aptidões')}
        </button>
      </div>

      {showApt && (
        <div className="animate-fadeIn overflow-x-auto">
          <table className="w-full border-collapse rounded-lg overflow-hidden text-sm">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-800 theme-classic:bg-white/10">
                <th className="p-3 text-left text-primary font-semibold">{language === 'en' ? 'Aptitude' : 'Aptidão'}</th>
                <th className="p-3 text-right text-primary font-semibold">{language === 'en' ? 'Score (0-1)' : 'Score (0-1)'}</th>
              </tr>
            </thead>
            <tbody>
              {aptList
                .slice()
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((apt, idx) => (
                  <tr
                    key={apt.id}
                    className={`border-b last:border-b-0 border-gray-200 dark:border-gray-700 theme-classic:border-classic-text/40 ${
                      idx % 2 === 0 ? "bg-white/50 dark:bg-black/20 theme-classic:bg-white/5" : ""
                    }`}
                  >
                    <td className="p-3 text-secondary">{apt.name}</td>
                    <td className="p-3 text-right font-mono font-medium text-primary">
                      {(scores[apt.id] ?? 0).toFixed(3)}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          <p className="text-xs text-secondary mt-2">
            {language === 'en' ? `Based on ${qCount} questions answered.` : `Baseado em ${qCount} perguntas respondidas.`}
          </p>
        </div>
      )}

      <div className="mt-10 text-center">
        <button onClick={onRestart} className="button button-primary w-full sm:w-auto">
          {language === 'en' ? 'Restart Questionnaire' : 'Refazer Questionário'}
        </button>
      </div>
    </section>
  );
}
