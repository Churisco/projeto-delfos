"use client";
import { getQuestionsByLang } from "@/lib/data";
import { UserAnswers } from "@/lib/types";
import { useMemo, useState } from "react";
import { useTheme } from "@/providers/ThemeProvider";
import { trackEvent } from "@/lib/analytics";

interface TestSectionProps {
  answers: UserAnswers;
  setAnswers: (a: UserAnswers) => void;
  onSubmit: () => void;
  onBackToIntro: () => void;
}

const PER_PAGE = 5;

export default function TestSection({ answers, setAnswers, onSubmit, onBackToIntro }: TestSectionProps) {
  const { language } = useTheme();
  const questions = useMemo(() => getQuestionsByLang(language), [language]);
  const [page, setPage] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const totalPages = Math.ceil(questions.length / PER_PAGE);
  const start = page * PER_PAGE;
  const currentQuestions = useMemo(() => questions.slice(start, start + PER_PAGE), [page]);

  console.log("📝 TestSection renderizada - Página:", page + 1, "de", totalPages);

  function setAnswer(qId: string, value: number) {
    setAnswers({ ...answers, [qId]: value });
    trackEvent.questionAnswered(qId, page);
  }

  const allAnsweredPage = currentQuestions.every(q => answers[q.id] !== undefined);
  const allAnsweredGlobal = questions.every(q => answers[q.id] !== undefined);
  const progressPercent = ((page + 1) / totalPages) * 100;

  return (
    <section className="card relative overflow-hidden" data-testid="test-section">
      <h2 className="text-xl sm:text-2xl lenovo:text-2xl 3xl:text-3xl font-semibold mb-4 lenovo:mb-5 text-primary text-center sm:text-left">
        {language === 'en' ? 'Aptitudes Questionnaire' : 'Questionário de Aptidões'}
      </h2>
      <div className="my-6">
        <div className="w-full bg-gray-200 dark:bg-gray-700 theme-classic:bg-white/20 rounded-full h-2.5">
          <div
            className="bg-blue-500 dark:bg-blue-400 theme-classic:bg-classic-button-bg h-2.5 rounded-full transition-all"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      <div className="space-y-6 lenovo:space-y-7">
        {currentQuestions.map((q, idx) => (
          <div key={q.id} className="animate-fadeIn" style={{ animationDelay: `${idx * 0.05}s` }}>
            <p className="text-primary font-medium mb-3 lenovo:mb-4 text-sm sm:text-base lenovo:text-base 3xl:text-lg leading-relaxed">
              {start + idx + 1}. {q.text}
            </p>
            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lenovo:grid-cols-5 gap-2 sm:gap-3 lenovo:gap-3">
              {q.options.map(opt => {
                const id = `${q.id}_${opt.value.toString().replace(".", "")}`;
                return (
                  <div key={id}>
                    <input
                      type="radio"
                      id={id}
                      name={q.id}
                      value={opt.value}
                      className="radio-option-input"
                      checked={answers[q.id] === opt.value}
                      onChange={() => setAnswer(q.id, opt.value)}
                    />
                    <label htmlFor={id} className="radio-option-label text-xs sm:text-sm lenovo:text-sm 3xl:text-base">
                      {opt.text}
                    </label>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center mt-8 sm:mt-10 pt-4 border-t border-gray-200 dark:border-gray-700 theme-classic:border-gray-600 gap-3 sm:gap-4">
        <div className="flex flex-row gap-2 sm:gap-3 w-full sm:w-auto">
          <button
            onClick={() => {
              if (page === 0) {
                trackEvent.exitTest();
                onBackToIntro();
              } else {
                trackEvent.navigateQuestions('previous', page);
                setPage(p => p - 1);
              }
            }}
            className="button button-secondary flex-1 sm:w-auto"
          >
            {page === 0 ? (language === 'en' ? 'Exit' : 'Sair') : (language === 'en' ? 'Previous' : 'Anterior')}
          </button>
          {page < totalPages - 1 && (
            <button
              onClick={() => {
                if (allAnsweredPage) {
                  trackEvent.navigateQuestions('next', page);
                  trackEvent.pageCompleted(page, totalPages);
                  setPage(p => p + 1);
                }
              }}
              disabled={!allAnsweredPage}
              className="button button-primary flex-1 sm:w-auto"
            >
              {language === 'en' ? 'Next' : 'Próxima'}
            </button>
          )}
          {page === totalPages - 1 && (
            <button
              onClick={() => {
                if (!allAnsweredGlobal || isSubmitting) return;
                setIsSubmitting(true);
                trackEvent.testCompleted(Date.now(), questions.length); // Usar timestamp simples
                trackEvent.pageCompleted(page, totalPages);
                // Pequena transição visual antes de mostrar os resultados
                setTimeout(() => {
                  onSubmit();
                }, 1200);
              }}
              disabled={!allAnsweredGlobal || isSubmitting}
              className="button button-primary flex-1 sm:w-auto"
            >
              {language === 'en' ? 'Calculate Results' : 'Calcular Resultados'}
            </button>
          )}
        </div>
        <span className="text-secondary text-sm text-center sm:text-right order-3 sm:order-none">
          {language === 'en' ? 'Page' : 'Página'} {page + 1} {language === 'en' ? 'of' : 'de'} {totalPages}
        </span>
      </div>

      {!allAnsweredPage && (
        <p className="mt-4 text-sm text-red-600 text-center">
          {language === 'en' ? 'Please answer all questions on this page to continue.' : 'Responda todas as perguntas desta página para avançar.'}
        </p>
      )}
      {isSubmitting && (
        <div className="fixed inset-0 z-[9999] pointer-events-none animate-fadeIn">
          <img src="/images/gifs/fumaca.gif" alt="Transição de fumaça" className="w-full h-full object-cover opacity-95" />
        </div>
      )}
    </section>
  );
}
