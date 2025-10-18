"use client";
import { useState } from "react";
import { useTheme } from "@/providers/ThemeProvider";
import { getProfessionsByLang, getAptitudesByLang } from "@/lib/data";

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type TabType = "project" | "data" | "percentages" | "aptitudes";

export default function InfoModal({ isOpen, onClose }: InfoModalProps) {
  const { language } = useTheme();
  const [activeTab, setActiveTab] = useState<TabType>("project");
  const professions = getProfessionsByLang(language);
  const aptitudes = getAptitudesByLang(language);

  if (!isOpen) return null;

  const tabs = [
    {
      id: "project" as TabType,
      label: language === 'en' ? 'Why Delfos?' : 'Por que Delfos?',
      icon: "🏛️"
    },
    {
      id: "data" as TabType,
      label: language === 'en' ? 'Data Sources' : 'Fontes dos Dados',
      icon: "📊"
    },
    {
      id: "percentages" as TabType,
      label: language === 'en' ? 'How Percentages Work' : 'Como Funcionam as %',
      icon: "🔢"
    },
    {
      id: "aptitudes" as TabType,
      label: language === 'en' ? 'Course Requirements' : 'Aptidões dos Cursos',
      icon: "🎯"
    }
  ];

  const CloseIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );

  const ExternalLinkIcon = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
    </svg>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case "project":
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">🏛️</div>
              <h3 className="text-2xl font-bold text-primary mb-2">
                {language === 'en' ? 'The Oracle of Delphi' : 'O Oráculo de Delfos'}
              </h3>
            </div>
            
            <div className="prose prose-sm max-w-none text-secondary leading-relaxed space-y-4">
              {language === 'en' ? (
                <>
                  <p>
                    According to Greek mythology, <strong>Apollo killed the dragon Python</strong>, guardian of Gaia's sanctuary, 
                    who had tried to prevent his birth. From Python's decomposing body, beneath Delphi, 
                    vapors emanated that induced visions in the priestesses, allowing them to prophesy.
                  </p>
                  <p>
                    In ancient times, <strong>Python was the source of predictions about the future</strong> — today, 
                    we use the power of the Python programming language and, with data and artificial intelligence, 
                    help you discover your own destiny.
                  </p>
                  <p>
                    <strong>Just as the Oracle of Delphi guided the ancients, Project Delfos seeks to guide your 
                    professional path through self-knowledge.</strong>
                  </p>
                </>
              ) : (
                <>
                  <p>
                    Segundo a mitologia grega, <strong>Apolo matou a dragoa Python</strong>, guardiã do santuário de Gaia, 
                    que tentara impedir seu nascimento. Do corpo em decomposição de Python, sob Delfos, 
                    emanavam vapores que induziam visões nas sacerdotisas, permitindo que profetizassem.
                  </p>
                  <p>
                    Antigamente, <strong>Python era fonte de previsões sobre o futuro</strong> — hoje, 
                    usamos o poder da linguagem Python para programar e, com dados e inteligência artificial, 
                    ajudar você a descobrir seu próprio destino.
                  </p>
                  <p>
                    <strong>Assim como o Oráculo de Delfos guiava os antigos, o Projeto Delfos busca orientar 
                    seu caminho profissional por meio do autoconhecimento.</strong>
                  </p>
                </>
              )}
            </div>

            <div className="bg-blue-50 dark:bg-blue-950/30 theme-classic:bg-blue-100/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800 theme-classic:border-blue-300/50">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">🔮</span>
                <h4 className="font-semibold text-primary">
                  {language === 'en' ? 'Modern Oracle' : 'Oráculo Moderno'}
                </h4>
              </div>
              <p className="text-sm text-secondary">
                {language === 'en' 
                  ? 'Using official labor data and AI algorithms to reveal career paths aligned with your natural aptitudes.'
                  : 'Utilizando dados oficiais do trabalho e algoritmos de IA para revelar caminhos profissionais alinhados com suas aptidões naturais.'
                }
              </p>
            </div>
          </div>
        );

      case "data":
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">📊</div>
              <h3 className="text-2xl font-bold text-primary mb-2">
                {language === 'en' ? 'Data Sources' : 'Fontes dos Dados'}
              </h3>
            </div>

            <div className="space-y-6">
              <div className="bg-green-50 dark:bg-green-950/30 theme-classic:bg-green-100/20 p-4 rounded-lg border border-green-200 dark:border-green-800 theme-classic:border-green-300/50">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-primary">
                    {language === 'en' ? 'U.S. Department of Labor - O*NET Database' : 'Departamento de Trabalho dos EUA - Base O*NET'}
                  </h4>
                </div>
                <p className="text-sm text-secondary mb-3">
                  {language === 'en'
                    ? 'The most comprehensive and authoritative source of occupational information available. Contains detailed data on over 900 occupations, including required skills, aptitudes, and work activities.'
                    : 'A fonte mais abrangente e oficial de informações ocupacionais disponível. Contém dados detalhados sobre mais de 900 ocupações, incluindo habilidades, aptidões e atividades de trabalho necessárias.'
                  }
                </p>
                <div className="flex items-center gap-2">
                  <ExternalLinkIcon />
                  <a 
                    href="https://www.onetcenter.org/database.html#individual-files" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 theme-classic:text-blue-700 hover:underline text-sm font-medium"
                  >
                    {language === 'en' ? 'Access O*NET Database' : 'Acessar Base de Dados O*NET'}
                  </a>
                </div>
              </div>

              <div className="bg-yellow-50 dark:bg-yellow-950/30 theme-classic:bg-yellow-100/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800 theme-classic:border-yellow-300/50">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">⚙️</span>
                  <h4 className="font-semibold text-primary">
                    {language === 'en' ? 'Data Processing' : 'Processamento dos Dados'}
                  </h4>
                </div>
                <ul className="text-sm text-secondary space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">•</span>
                    {language === 'en'
                      ? 'Normalization from O*NET scale (1-7) to our scale (0-1)'
                      : 'Normalização da escala O*NET (1-7) para nossa escala (0-1)'
                    }
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">•</span>
                    {language === 'en'
                      ? 'Filtering by relevance and importance levels'
                      : 'Filtragem por relevância e níveis de importância'
                    }
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">•</span>
                    {language === 'en'
                      ? 'Weighting according to job market demands'
                      : 'Ponderação conforme demandas do mercado de trabalho'
                    }
                  </li>
                </ul>
              </div>

              <div className="bg-purple-50 dark:bg-purple-950/30 theme-classic:bg-purple-100/20 p-4 rounded-lg border border-purple-200 dark:border-purple-800 theme-classic:border-purple-300/50">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">🔍</span>
                  <h4 className="font-semibold text-primary">
                    {language === 'en' ? 'Quality Assurance' : 'Garantia de Qualidade'}
                  </h4>
                </div>
                <p className="text-sm text-secondary">
                  {language === 'en'
                    ? 'All data is cross-referenced with multiple sources and updated regularly to ensure accuracy and relevance in career matching.'
                    : 'Todos os dados são cruzados com múltiplas fontes e atualizados regularmente para garantir precisão e relevância na compatibilidade de carreiras.'
                  }
                </p>
              </div>
            </div>
          </div>
        );

      case "percentages":
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">🔢</div>
              <h3 className="text-2xl font-bold text-primary mb-2">
                {language === 'en' ? 'How Percentages Work' : 'Como Funcionam as Porcentagens'}
              </h3>
            </div>

            <div className="space-y-6">
              <div className="bg-blue-50 dark:bg-blue-950/30 theme-classic:bg-blue-100/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800 theme-classic:border-blue-300/50">
                <h4 className="font-semibold text-primary mb-3 flex items-center gap-2">
                  <span className="text-xl">📊</span>
                  {language === 'en' ? 'Compatibility Calculation' : 'Cálculo de Compatibilidade'}
                </h4>
                <div className="text-sm text-secondary space-y-3">
                  <p>
                    {language === 'en'
                      ? 'The percentage represents how well your aptitude profile matches the requirements of each profession, calculated through a sophisticated algorithm that:'
                      : 'A porcentagem representa o quão bem seu perfil de aptidões corresponde aos requisitos de cada profissão, calculada através de um algoritmo sofisticado que:'
                    }
                  </p>
                  <ol className="list-decimal list-inside space-y-2 ml-4">
                    <li>
                      {language === 'en'
                        ? 'Analyzes your responses to extract aptitude scores (0-1 scale)'
                        : 'Analisa suas respostas para extrair pontuações de aptidão (escala 0-1)'
                      }
                    </li>
                    <li>
                      {language === 'en'
                        ? 'Compares against profession requirements from O*NET data'
                        : 'Compara com os requisitos profissionais dos dados O*NET'
                      }
                    </li>
                    <li>
                      {language === 'en'
                        ? 'Weights matches based on importance to the profession'
                        : 'Pondera as correspondências baseado na importância para a profissão'
                      }
                    </li>
                    <li>
                      {language === 'en'
                        ? 'Converts to percentage for easy interpretation'
                        : 'Converte para porcentagem para fácil interpretação'
                      }
                    </li>
                  </ol>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-red-50 dark:bg-red-950/30 theme-classic:bg-red-100/20 p-4 rounded-lg border border-red-200 dark:border-red-800 theme-classic:border-red-300/50 text-center">
                  <div className="text-2xl mb-2">📉</div>
                  <h5 className="font-semibold text-primary mb-2">0-50%</h5>
                  <p className="text-xs text-secondary">
                    {language === 'en' ? 'Low compatibility. Consider developing related skills.' : 'Baixa compatibilidade. Considere desenvolver habilidades relacionadas.'}
                  </p>
                </div>
                <div className="bg-yellow-50 dark:bg-yellow-950/30 theme-classic:bg-yellow-100/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800 theme-classic:border-yellow-300/50 text-center">
                  <div className="text-2xl mb-2">📊</div>
                  <h5 className="font-semibold text-primary mb-2">51-75%</h5>
                  <p className="text-xs text-secondary">
                    {language === 'en' ? 'Good match. You have many of the required aptitudes.' : 'Boa correspondência. Você possui muitas das aptidões necessárias.'}
                  </p>
                </div>
                <div className="bg-green-50 dark:bg-green-950/30 theme-classic:bg-green-100/20 p-4 rounded-lg border border-green-200 dark:border-green-800 theme-classic:border-green-300/50 text-center">
                  <div className="text-2xl mb-2">📈</div>
                  <h5 className="font-semibold text-primary mb-2">76-100%</h5>
                  <p className="text-xs text-secondary">
                    {language === 'en' ? 'Excellent match! Your profile aligns very well.' : 'Excelente correspondência! Seu perfil se alinha muito bem.'}
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-900/30 theme-classic:bg-gray-100/20 p-4 rounded-lg border border-gray-200 dark:border-gray-700 theme-classic:border-gray-300/50">
                <h4 className="font-semibold text-primary mb-3 flex items-center gap-2">
                  <span className="text-xl">💡</span>
                  {language === 'en' ? 'Important Notes' : 'Observações Importantes'}
                </h4>
                <ul className="text-sm text-secondary space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    {language === 'en'
                      ? 'Higher percentages indicate better natural fit, but success depends on many factors'
                      : 'Porcentagens maiores indicam melhor aptidão natural, mas o sucesso depende de muitos fatores'
                    }
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    {language === 'en'
                      ? 'Results are based on current aptitudes and can change with learning and experience'
                      : 'Resultados são baseados em aptidões atuais e podem mudar com aprendizado e experiência'
                    }
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    {language === 'en'
                      ? 'Consider multiple factors like interests, values, and market opportunities'
                      : 'Considere múltiplos fatores como interesses, valores e oportunidades de mercado'
                    }
                  </li>
                </ul>
              </div>
            </div>
          </div>
        );

      case "aptitudes":
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">🎯</div>
              <h3 className="text-2xl font-bold text-primary mb-2">
                {language === 'en' ? 'Course Aptitude Requirements' : 'Aptidões Ideais dos Cursos'}
              </h3>
              <p className="text-secondary text-sm">
                {language === 'en' 
                  ? 'Minimum aptitude levels recommended for success in each field'
                  : 'Níveis mínimos de aptidão recomendados para sucesso em cada área'
                }
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse rounded-lg overflow-hidden text-sm">
                <thead>
                  <tr className="bg-gray-100 dark:bg-gray-800 theme-classic:bg-white/10">
                    <th className="p-3 text-left text-primary font-semibold sticky left-0 bg-gray-100 dark:bg-gray-800 theme-classic:bg-white/10 min-w-[180px]">
                      {language === 'en' ? 'Profession' : 'Profissão'}
                    </th>
                    {aptitudes.slice(0, 6).map((apt) => (
                      <th key={apt.id} className="p-2 text-center text-primary font-semibold text-xs min-w-[80px]">
                        {apt.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {professions.slice(0, 10).map((prof, idx) => (
                    <tr
                      key={prof.id}
                      className={`border-b border-gray-200 dark:border-gray-700 theme-classic:border-classic-text/40 hover:bg-gray-50 dark:hover:bg-gray-800/50 theme-classic:hover:bg-white/5 ${
                        idx % 2 === 0 ? "bg-white/50 dark:bg-black/20 theme-classic:bg-white/5" : ""
                      }`}
                    >
                      <td className="p-3 text-secondary font-medium sticky left-0 bg-inherit">
                        {prof.name}
                      </td>
                      {aptitudes.slice(0, 6).map((apt) => {
                        const requirement = prof.req[apt.id] || 0;
                        const intensity = requirement > 0.7 ? 'high' : requirement > 0.4 ? 'medium' : 'low';
                        return (
                          <td key={apt.id} className="p-2 text-center">
                            <span className={`inline-block w-12 h-6 rounded text-xs font-mono font-bold flex items-center justify-center ${
                              intensity === 'high' 
                                ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300' 
                                : intensity === 'medium'
                                ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300'
                                : 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                            }`}>
                              {requirement.toFixed(1)}
                            </span>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="bg-green-50 dark:bg-green-950/30 theme-classic:bg-green-100/20 p-3 rounded-lg border border-green-200 dark:border-green-800 theme-classic:border-green-300/50 text-center">
                <div className="font-semibold text-green-700 dark:text-green-300 mb-1">0.0 - 0.4</div>
                <div className="text-xs text-secondary">
                  {language === 'en' ? 'Basic Level' : 'Nível Básico'}
                </div>
              </div>
              <div className="bg-yellow-50 dark:bg-yellow-950/30 theme-classic:bg-yellow-100/20 p-3 rounded-lg border border-yellow-200 dark:border-yellow-800 theme-classic:border-yellow-300/50 text-center">
                <div className="font-semibold text-yellow-700 dark:text-yellow-300 mb-1">0.4 - 0.7</div>
                <div className="text-xs text-secondary">
                  {language === 'en' ? 'Intermediate Level' : 'Nível Intermediário'}
                </div>
              </div>
              <div className="bg-red-50 dark:bg-red-950/30 theme-classic:bg-red-100/20 p-3 rounded-lg border border-red-200 dark:border-red-800 theme-classic:border-red-300/50 text-center">
                <div className="font-semibold text-red-700 dark:text-red-300 mb-1">0.7 - 1.0</div>
                <div className="text-xs text-secondary">
                  {language === 'en' ? 'Advanced Level' : 'Nível Avançado'}
                </div>
              </div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-950/30 theme-classic:bg-blue-100/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800 theme-classic:border-blue-300/50">
              <p className="text-sm text-secondary">
                <strong>{language === 'en' ? 'Note:' : 'Nota:'}</strong>{' '}
                {language === 'en'
                  ? 'These values represent the minimum recommended aptitude levels. Higher scores in key areas generally indicate better chances of success and satisfaction in the field.'
                  : 'Estes valores representam os níveis mínimos recomendados de aptidão. Pontuações mais altas nas áreas-chave geralmente indicam melhores chances de sucesso e satisfação na área.'
                }
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white dark:bg-gray-900 theme-classic:bg-classic-bg w-full max-w-6xl max-h-[90vh] rounded-lg shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-700 dark:to-purple-700 theme-classic:from-classic-button-bg theme-classic:to-classic-button-bg text-white p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-bold">
              {language === 'en' ? 'About Project Delfos' : 'Sobre o Projeto Delfos'}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
              aria-label={language === 'en' ? 'Close' : 'Fechar'}
            >
              <CloseIcon />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 dark:border-gray-700 theme-classic:border-classic-text/40 bg-gray-50 dark:bg-gray-800 theme-classic:bg-white/5">
          <div className="flex overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400 theme-classic:text-blue-700 bg-white dark:bg-gray-900 theme-classic:bg-classic-bg'
                    : 'text-gray-600 dark:text-gray-400 theme-classic:text-classic-text/70 hover:text-gray-900 dark:hover:text-gray-200 theme-classic:hover:text-classic-text'
                }`}
              >
                <span className="text-lg">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 max-h-[60vh] overflow-y-auto">
          {renderTabContent()}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 dark:border-gray-700 theme-classic:border-classic-text/40 p-4 sm:p-6 bg-gray-50 dark:bg-gray-800 theme-classic:bg-white/5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm text-secondary text-center sm:text-left">
              {language === 'en' 
                ? 'Discover your professional path with artificial intelligence and official data.'
                : 'Descubra seu caminho profissional com inteligência artificial e dados oficiais.'
              }
            </div>
            <button
              onClick={onClose}
              className="button button-primary"
            >
              {language === 'en' ? 'Start Questionnaire' : 'Iniciar Questionário'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}