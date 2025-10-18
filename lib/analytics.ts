'use client';
import { track } from '@vercel/analytics';

// Eventos personalizados para tracking
export const trackEvent = {
  // Eventos da página inicial
  enterTemple: () => track('temple_door_clicked'),
  configOpened: () => track('config_modal_opened'),
  themeChanged: (theme: string) => track('theme_changed', { theme }),
  languageChanged: (language: string) => track('language_changed', { language }),
  
  // Eventos do questionário
  testStarted: () => track('questionnaire_started'),
  questionAnswered: (questionId: string, page: number) => track('question_answered', { 
    questionId, 
    page 
  }),
  navigateQuestions: (direction: 'next' | 'previous', currentPage: number) => 
    track('navigate_questions', { direction, currentPage }),
  exitTest: () => track('test_exited'),
  pageCompleted: (page: number, totalPages: number) => track('page_completed', { 
    page, 
    totalPages,
    progress: Math.round((page / totalPages) * 100)
  }),
  testAbandoned: (page: number, totalPages: number) => track('test_abandoned', { 
    page, 
    totalPages,
    progress: Math.round((page / totalPages) * 100)
  }),
  
  // Eventos dos resultados
  resultsCalculated: (topProfession: string, score: number) => track('results_calculated', { 
    topProfession,
    score 
  }),
  aptitudesViewed: () => track('aptitudes_table_viewed'),
  testRestarted: () => track('test_restarted'),
  
  // Eventos de conversão
  testCompleted: (timeSpent: number, totalQuestions: number) => track('test_completed', { 
    timeSpent,
    totalQuestions,
    conversion: true
  }),
  
  // Eventos técnicos
  screenResolution: (width: number, height: number) => track('screen_resolution', { 
    width, 
    height,
    ratio: Math.round((width / height) * 100) / 100
  }),
  
  // Eventos de erro (se necessário)
  error: (errorType: string, context?: string) => track('error_occurred', { 
    errorType,
    ...(context && { context })
  })
};

export default trackEvent;