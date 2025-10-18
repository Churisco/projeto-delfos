"use client";
import { useState, useMemo, useEffect } from "react";
import { CompatibilityResult, UserScores, UserAnswers } from "@/lib/types";
import { getAptitudesByLang, getQuestionsByLang, getProfessionsByLang } from "@/lib/data";
import { calculateAptitudeScores, calculateCompatibilityLocalized } from "@/lib/utils";
import { useTheme } from "@/providers/ThemeProvider";
import { trackEvent } from "@/lib/analytics";
import InfoModal from "./InfoModal";

interface ResultsViewProps {
  results: CompatibilityResult[];
  userAnswers: UserAnswers;
  onRestart: () => void;
}

export default function ResultsView({ results, userAnswers, onRestart }: ResultsViewProps) {
  const { language } = useTheme();
  const [showAllProfessions, setShowAllProfessions] = useState(false);
  const [showAllAptitudes, setShowAllAptitudes] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [showAllProfessionsModal, setShowAllProfessionsModal] = useState(false);
  const [showAllAptitudesModal, setShowAllAptitudesModal] = useState(false);

  const scores: UserScores = calculateAptitudeScores(userAnswers);
  const aptList = useMemo(() => getAptitudesByLang(language), [language]);
  const qCount = useMemo(() => getQuestionsByLang(language).length, [language]);
  const allProfessions = useMemo(() => getProfessionsByLang(language), [language]);

  // Recalcular todas as profissões para ter o ranking completo
  const allResults = useMemo(() => {
    return calculateCompatibilityLocalized(scores, language);
  }, [scores, language]);

  // Aptidões ordenadas por score (decrescente)
  const sortedAptitudes = useMemo(() => {
    return aptList
      .map(apt => ({
        ...apt,
        score: scores[apt.id] ?? 0
      }))
      .sort((a, b) => b.score - a.score);
  }, [aptList, scores]);

  // Track results calculation when component mounts
  useEffect(() => {
    if (results.length > 0) {
      const topProfession = results[0];
      trackEvent.resultsCalculated(topProfession.name, Math.round(topProfession.score * 100));
    }
  }, [results]);

  // Ícones SVG inline simples
  const ChevronDownIcon = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );

  const ChevronUpIcon = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
    </svg>
  );

  const ExternalLinkIcon = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
    </svg>
  );

  const InfoIcon = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );

  return (
    <>
      <section className="card" data-testid="results-section">
        <div className="text-center mb-6 lenovo:mb-7">
          <h2 className="text-xl sm:text-2xl lenovo:text-2xl 3xl:text-3xl font-semibold mb-4 text-primary">
            {language === 'en' ? 'Your Delfos Results' : 'Seu Resultado Delfos'}
          </h2>
        </div>

        {/* Layout Responsivo: Mobile vertical, Desktop horizontal */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 xl:gap-8">
          
          {/* Coluna Esquerda: Profissões */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg sm:text-xl lenovo:text-xl 3xl:text-2xl font-semibold mb-4 lenovo:mb-5 text-primary text-center xl:text-left">
                {language === 'en' ? 'Top Career Matches' : 'Cursos mais compatíveis'}
              </h3>
              
              <div className="space-y-3 sm:space-y-4 lenovo:space-y-4">
                {allResults.slice(0, 5).map((r, i) => (
                  <div
                    key={r.name}
                    className="course-suggestion-card flex flex-col xs:flex-row justify-between items-center shadow-sm animate-fadeIn gap-2 xs:gap-0 lenovo:gap-3"
                    style={{ animationDelay: `${i * 0.02}s` }}
                  >
                    <span className="text-base sm:text-lg lenovo:text-lg 3xl:text-xl font-semibold text-primary text-center xs:text-left">
                      #{i + 1} {r.name}
                    </span>
                    <span className="text-xl sm:text-2xl lenovo:text-2xl 3xl:text-3xl font-bold text-primary">{r.score}%</span>
                  </div>
                ))}
              </div>

              <div className="text-center mt-4">
                <button
                  onClick={() => {
                    setShowAllProfessionsModal(true);
                    trackEvent.aptitudesViewed(); // Track when showing all professions modal
                  }}
                  className="button button-secondary text-sm flex items-center gap-2 mx-auto"
                >
                  {language === 'en' ? `View Detailed Rankings` : `Ver rankings detalhados`}
                  <ChevronDownIcon />
                </button>
              </div>
            </div>
          </div>

          {/* Coluna Direita: Aptidões */}
          <div className="space-y-6">
            {/* Seção de Aptidões */}
            <div>
              <h3 className="text-lg sm:text-xl lenovo:text-xl 3xl:text-2xl font-semibold mb-4 lenovo:mb-5 text-primary text-center xl:text-left">
                {language === 'en' ? 'Your Aptitudes' : 'Minhas aptidões'}
              </h3>

              {/* Top 5 Aptidões como tabela direta */}
              <div className="mb-4">
                <h4 className="font-semibold text-primary mb-3 text-sm">
                  {language === 'en' ? 'Your Top 5 Strengths' : 'Seus 5 Pontos Fortes'}
                </h4>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse rounded-lg overflow-hidden text-sm min-w-[280px]">
                    <thead>
                      <tr className="bg-gray-100 dark:bg-gray-800 theme-classic:bg-white/20">
                        <th className="p-2 text-left font-semibold text-xs w-12 text-gray-800 dark:text-gray-100 theme-classic:text-gray-100">
                          #
                        </th>
                        <th className="p-2 text-left font-semibold text-xs text-gray-800 dark:text-gray-100 theme-classic:text-gray-100">
                          {language === 'en' ? 'Aptitude' : 'Aptidão'}
                        </th>
                        <th className="p-2 text-right font-semibold text-xs w-16 text-gray-800 dark:text-gray-100 theme-classic:text-gray-100">
                          {language === 'en' ? 'Score' : 'Nota'}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {sortedAptitudes.slice(0, 5).map((apt, idx) => (
                        <tr
                          key={apt.id}
                          className={`border-b border-gray-200 dark:border-gray-700 theme-classic:border-white/10 ${
                            idx % 2 === 0 ? "bg-white/50 dark:bg-black/20 theme-classic:bg-white/5" : "theme-classic:bg-transparent"
                          }`}
                        >
                          <td className="p-2 text-xs font-medium w-12 text-gray-600 dark:text-gray-400 theme-classic:text-gray-300">
                            #{idx + 1}
                          </td>
                          <td className="p-2 text-xs text-gray-700 dark:text-gray-300 theme-classic:text-gray-200">{apt.name}</td>
                          <td className="p-2 text-right font-mono font-medium text-xs w-16 text-gray-800 dark:text-gray-100 theme-classic:text-white">
                            {apt.score.toFixed(3)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Botão para ver todas as aptidões em modal */}
              <div className="text-center">
                <button
                  onClick={() => {
                    setShowAllAptitudesModal(true);
                    trackEvent.aptitudesViewed();
                  }}
                  className="button button-secondary text-sm flex items-center gap-2 mx-auto"
                >
                  {language === 'en' ? `Show All ${sortedAptitudes.length} Aptitudes` : `Ver todas as aptidões`}
                  <ChevronDownIcon />
                </button>
              </div>
            </div>

            {/* Botão Saiba Mais */}
            <div className="text-center">
              <button
                onClick={() => {
                  setShowInfoModal(true);
                  trackEvent.configOpened();
                }}
                className="button button-primary text-sm flex items-center gap-2 mx-auto"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 16v-4M12 8h.01" />
                </svg>
                {language === 'en' ? 'Learn More' : 'Saiba mais'}
              </button>
            </div>

            {/* Selo de Confiabilidade O*NET */}
            <div className="flex items-center justify-center gap-3 p-3 bg-blue-50 dark:bg-blue-950/30 theme-classic:bg-blue-100/20 rounded-lg border border-blue-200 dark:border-blue-800 theme-classic:border-blue-300/50 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <div className="text-xs font-semibold text-blue-700 dark:text-blue-300 theme-classic:text-blue-800">
                    {language === 'en' ? 'U.S. Department of Labor' : 'Ministério do Trabalho dos EUA'}
                  </div>
                  <div className="text-xs text-blue-600 dark:text-blue-400 theme-classic:text-blue-700">
                    {language === 'en' ? 'O*NET Certified Data' : 'Dados Certificados O*NET'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Botão de Reiniciar */}
        <div className="mt-8 text-center">
          <button 
            onClick={() => {
              trackEvent.testRestarted();
              onRestart();
            }} 
            className="button button-primary w-full xs:w-auto"
          >
            {language === 'en' ? 'Take Test Again' : 'Refazer Questionário'}
          </button>
        </div>
      </section>

    {/* Modal Informativo */}
    <InfoModal 
      isOpen={showInfoModal} 
      onClose={() => setShowInfoModal(false)} 
    />

    {/* Modal Todos os Cursos */}
    {showAllProfessionsModal && (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
        <div className="bg-white dark:bg-gray-900 theme-classic:bg-classic-bg w-full max-w-4xl max-h-[90vh] rounded-lg shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-700 dark:to-purple-700 theme-classic:from-classic-button-bg theme-classic:to-classic-button-bg text-white p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl sm:text-2xl font-bold">
                {language === 'en' ? 'All Career Matches' : 'Todos os Cursos Compatíveis'}
              </h2>
              <button
                onClick={() => setShowAllProfessionsModal(false)}
                className="p-2 hover:bg-white/20 rounded-full transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
          <div className="p-6 max-h-[70vh] overflow-y-auto">
            <div className="space-y-3">
              {allResults.map((r, i) => (
                <div
                  key={r.name}
                  className="course-suggestion-card flex flex-col xs:flex-row justify-between items-center shadow-sm gap-2 xs:gap-0"
                >
                  <span className="text-base font-semibold text-primary text-center xs:text-left">
                    #{i + 1} {r.name}
                  </span>
                  <span className="text-xl font-bold text-primary">{r.score}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )}

    {/* Modal Todas as Aptidões */}
    {showAllAptitudesModal && (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
        <div className="bg-white dark:bg-gray-900 theme-classic:bg-classic-bg w-full max-w-4xl max-h-[90vh] rounded-lg shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-green-600 to-blue-600 dark:from-green-700 dark:to-blue-700 theme-classic:from-classic-button-bg theme-classic:to-classic-button-bg text-white p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl sm:text-2xl font-bold">
                {language === 'en' ? 'All Your Aptitudes' : 'Todas as Suas Aptidões'}
              </h2>
              <button
                onClick={() => setShowAllAptitudesModal(false)}
                className="p-2 hover:bg-white/20 rounded-full transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
          <div className="p-6 max-h-[70vh] overflow-y-auto">
            <table className="w-full border-collapse rounded-lg overflow-hidden text-sm">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-800 theme-classic:bg-white/20">
                  <th className="p-3 text-left font-semibold text-gray-800 dark:text-gray-100 theme-classic:text-gray-100">
                    #
                  </th>
                  <th className="p-3 text-left font-semibold text-gray-800 dark:text-gray-100 theme-classic:text-gray-100">
                    {language === 'en' ? 'Aptitude' : 'Aptidão'}
                  </th>
                  <th className="p-3 text-right font-semibold text-gray-800 dark:text-gray-100 theme-classic:text-gray-100">
                    {language === 'en' ? 'Score (0-1)' : 'Pontuação (0-1)'}
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortedAptitudes.map((apt, idx) => (
                  <tr
                    key={apt.id}
                    className={`border-b border-gray-200 dark:border-gray-700 theme-classic:border-white/10 ${
                      idx % 2 === 0 ? "bg-white/50 dark:bg-black/20 theme-classic:bg-white/5" : "theme-classic:bg-transparent"
                    } ${idx < 5 ? "bg-green-50/50 dark:bg-green-950/10 theme-classic:bg-green-900/20" : ""}`}
                  >
                    <td className="p-3 font-medium text-gray-600 dark:text-gray-400 theme-classic:text-gray-300">
                      #{idx + 1}
                    </td>
                    <td className="p-3 text-gray-700 dark:text-gray-300 theme-classic:text-gray-200">{apt.name}</td>
                    <td className="p-3 text-right font-mono font-medium text-gray-800 dark:text-gray-100 theme-classic:text-white">
                      {apt.score.toFixed(3)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="text-sm text-secondary mt-4 text-center">
              {language === 'en' ? `Based on ${qCount} questions answered.` : `Baseado em ${qCount} perguntas respondidas.`}
            </p>
          </div>
        </div>
      </div>
    )}
    </>
  );
}