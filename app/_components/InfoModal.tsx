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
  const { language, theme } = useTheme();
  const [activeTab, setActiveTab] = useState<TabType>("project");
  const professions = getProfessionsByLang(language);
  const aptitudes = getAptitudesByLang(language);

  if (!isOpen) return null;

  // Função para obter cores baseadas no tema
  const getTextColor = (type: 'primary' | 'secondary') => {
    if (theme === 'classic') return type === 'primary' ? '#ffffff' : '#f3f4f6';
    if (theme === 'dark') return type === 'primary' ? '#f9fafb' : '#d1d5db';
    return type === 'primary' ? '#1f2937' : '#6b7280';
  };

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
              <h3 className="text-2xl font-bold mb-2" style={{ color: getTextColor('primary') }}>
                {language === 'en' ? 'The Oracle of Delphi' : 'O Oráculo de Delfos'}
              </h3>
            </div>
            
            <div className="prose prose-sm max-w-none leading-relaxed space-y-4" style={{ color: getTextColor('secondary') }}>
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
                    Segundo a mitologia grega, no centro do mundo — em Delfos — existia um santuário dedicado à deusa Gaia, Mãe-Terra. 
                    Ali vivia Python, uma serpente gigantesca, ou dragão, que guardava o <em>omphalos</em>, a pedra do "umbigo do mundo". 
                    Era um ser ctônico, ligado às forças profundas e úmidas da terra, oposto aos deuses olímpicos do céu.
                  </p>
                  <p>
                    Quando o deus Apolo, símbolo da luz, da razão e da harmonia, buscava um lugar para fundar seu templo, encontrou a serpente. 
                    Em combate, matou Python com suas flechas e tomou o oráculo para si. O sangue da criatura penetrou o solo, e dos vapores 
                    que emanaram de seu corpo nasceu a tradição profética de Delfos — as pitonisas, sacerdotisas que inalavam os gases sagrados 
                    e viam o futuro.
                  </p>
                  <p>
                    Esse mito não conta uma batalha física, mas uma passagem de eras: o triunfo da ordem solar apolínea sobre os poderes sombrios 
                    e telúricos da antiga religião da Terra. O oráculo, agora sob Apolo, tornou-se o lugar do autoconhecimento e da verdade divina, 
                    inscrito com as frases <strong>ΓΝΩΘΙ ΣΑΥΤΟΝ</strong> (Conhece-te a ti mesmo), <strong>ΜΗΔΕΝ ΑΓΑΝ</strong> (Nada em excesso) 
                    na parte de baixo do pedimento e o misterioso "E" de Delfos na parte superior, fazendo assim um triângulo.
                  </p>
                  <p>
                    <strong>O Projeto Delfos, assim como Apolo, que após derrotar Python não destruiu seu poder, mas o transformou na força vital 
                    do oráculo de Delfos — um centro de sabedoria e revelação — pretende utilizar a programação (Python), para cumprir o mesmo 
                    propósito: canalizar o conhecimento oculto dentro de cada pessoa, revelando, por meio da razão e da análise, seu próprio 
                    destino profissional, seu caminho.</strong>
                  </p>
                </>
              )}
            </div>

            <div 
              className="p-4 rounded-lg border"
              style={{
                backgroundColor: theme === 'classic' ? '#1e3a5f' : theme === 'dark' ? 'rgba(30, 58, 138, 0.3)' : 'rgb(239, 246, 255)',
                borderColor: theme === 'classic' ? '#3b82f6' : theme === 'dark' ? 'rgb(30, 58, 138)' : 'rgb(191, 219, 254)'
              }}
            >
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
              <div 
                className="p-4 rounded-lg border"
                style={{
                  backgroundColor: theme === 'classic' ? '#0a3d29' : theme === 'dark' ? 'rgba(6, 78, 59, 0.3)' : 'rgb(240, 253, 244)',
                  borderColor: theme === 'classic' ? '#16a34a' : theme === 'dark' ? 'rgb(6, 78, 59)' : 'rgb(187, 247, 208)'
                }}
              >
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

              <div 
                className="p-4 rounded-lg border"
                style={{
                  backgroundColor: theme === 'classic' ? '#4a3506' : theme === 'dark' ? 'rgba(133, 77, 14, 0.3)' : 'rgb(254, 252, 232)',
                  borderColor: theme === 'classic' ? '#ca8a04' : theme === 'dark' ? 'rgb(133, 77, 14)' : 'rgb(253, 230, 138)'
                }}
              >
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

              <div 
                className="p-4 rounded-lg border"
                style={{
                  backgroundColor: theme === 'classic' ? '#2d1b4e' : theme === 'dark' ? 'rgba(88, 28, 135, 0.3)' : 'rgb(250, 245, 255)',
                  borderColor: theme === 'classic' ? '#7c3aed' : theme === 'dark' ? 'rgb(88, 28, 135)' : 'rgb(233, 213, 255)'
                }}
              >
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
              <div 
                className="p-4 rounded-lg border"
                style={{
                  backgroundColor: theme === 'classic' ? '#1e3a5f' : theme === 'dark' ? 'rgba(30, 58, 138, 0.3)' : 'rgb(239, 246, 255)',
                  borderColor: theme === 'classic' ? '#3b82f6' : theme === 'dark' ? 'rgb(30, 58, 138)' : 'rgb(191, 219, 254)'
                }}
              >
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
                <div 
                  className="p-4 rounded-lg border text-center"
                  style={{
                    backgroundColor: theme === 'classic' ? '#4a1515' : theme === 'dark' ? 'rgba(127, 29, 29, 0.3)' : 'rgb(254, 242, 242)',
                    borderColor: theme === 'classic' ? '#dc2626' : theme === 'dark' ? 'rgb(127, 29, 29)' : 'rgb(254, 202, 202)'
                  }}
                >
                  <div className="text-2xl mb-2">📉</div>
                  <h5 className="font-semibold text-primary mb-2">0-50%</h5>
                  <p className="text-xs text-secondary">
                    {language === 'en' ? 'Low compatibility. Consider developing related skills.' : 'Baixa compatibilidade. Considere desenvolver habilidades relacionadas.'}
                  </p>
                </div>
                <div 
                  className="p-4 rounded-lg border text-center"
                  style={{
                    backgroundColor: theme === 'classic' ? '#4a3506' : theme === 'dark' ? 'rgba(133, 77, 14, 0.3)' : 'rgb(254, 252, 232)',
                    borderColor: theme === 'classic' ? '#ca8a04' : theme === 'dark' ? 'rgb(133, 77, 14)' : 'rgb(253, 230, 138)'
                  }}
                >
                  <div className="text-2xl mb-2">📊</div>
                  <h5 className="font-semibold text-primary mb-2">51-75%</h5>
                  <p className="text-xs text-secondary">
                    {language === 'en' ? 'Good match. You have many of the required aptitudes.' : 'Boa correspondência. Você possui muitas das aptidões necessárias.'}
                  </p>
                </div>
                <div 
                  className="p-4 rounded-lg border text-center"
                  style={{
                    backgroundColor: theme === 'classic' ? '#0a3d29' : theme === 'dark' ? 'rgba(6, 78, 59, 0.3)' : 'rgb(240, 253, 244)',
                    borderColor: theme === 'classic' ? '#16a34a' : theme === 'dark' ? 'rgb(6, 78, 59)' : 'rgb(187, 247, 208)'
                  }}
                >
                  <div className="text-2xl mb-2">📈</div>
                  <h5 className="font-semibold text-primary mb-2">76-100%</h5>
                  <p className="text-xs text-secondary">
                    {language === 'en' ? 'Excellent match! Your profile aligns very well.' : 'Excelente correspondência! Seu perfil se alinha muito bem.'}
                  </p>
                </div>
              </div>

              <div 
                className="p-4 rounded-lg border"
                style={{
                  backgroundColor: theme === 'classic' ? '#1f2937' : theme === 'dark' ? 'rgba(31, 41, 55, 0.3)' : 'rgb(249, 250, 251)',
                  borderColor: theme === 'classic' ? '#4b5563' : theme === 'dark' ? 'rgb(55, 65, 81)' : 'rgb(229, 231, 235)'
                }}
              >
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
                  <tr className="bg-gray-100 dark:bg-gray-800 theme-classic:!bg-[#05182d]">
                    <th className="p-3 text-left font-semibold sticky left-0 bg-gray-100 dark:bg-gray-800 theme-classic:!bg-[#05182d] min-w-[180px] text-gray-800 dark:text-gray-100 theme-classic:!text-white">
                      {language === 'en' ? 'Profession' : 'Profissão'}
                    </th>
                    {aptitudes.map((apt) => (
                      <th key={apt.id} className="p-2 text-center font-semibold text-xs min-w-[80px] text-gray-800 dark:text-gray-100 theme-classic:!text-white">
                        {apt.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {professions.map((prof, idx) => (
                    <tr
                      key={prof.id}
                      className={`border-b border-gray-200 dark:border-gray-700 theme-classic:!border-white/20 hover:bg-gray-50 dark:hover:bg-gray-800/50 theme-classic:hover:!bg-white/10 ${
                        idx % 2 === 0 ? "bg-white/50 dark:bg-black/20 theme-classic:!bg-white/5" : "theme-classic:!bg-transparent"
                      }`}
                    >
                      <td className="p-3 font-medium sticky left-0 bg-inherit text-gray-700 dark:text-gray-300 theme-classic:!text-white">
                        {prof.name}
                      </td>
                      {aptitudes.map((apt) => {
                        const requirement = prof.req[apt.id] || 0;
                        const intensity = requirement > 0.7 ? 'high' : requirement > 0.4 ? 'medium' : 'low';
                        return (
                          <td key={apt.id} className="p-2 text-center">
                            <span 
                              className="flex w-12 h-6 rounded text-xs font-mono font-bold items-center justify-center"
                              style={{
                                backgroundColor: theme === 'classic' 
                                  ? (intensity === 'high' ? '#7f1d1d' : intensity === 'medium' ? '#713f12' : '#14532d')
                                  : intensity === 'high' 
                                  ? (theme === 'dark' ? 'rgba(127, 29, 29, 0.3)' : 'rgb(254, 226, 226)')
                                  : intensity === 'medium'
                                  ? (theme === 'dark' ? 'rgba(113, 63, 18, 0.3)' : 'rgb(254, 249, 195)')
                                  : (theme === 'dark' ? 'rgba(20, 83, 45, 0.3)' : 'rgb(220, 252, 231)'),
                                color: theme === 'classic' 
                                  ? (intensity === 'high' ? '#fca5a5' : intensity === 'medium' ? '#fde047' : '#86efac')
                                  : intensity === 'high'
                                  ? (theme === 'dark' ? '#fca5a5' : '#b91c1c')
                                  : intensity === 'medium'
                                  ? (theme === 'dark' ? '#fde047' : '#a16207')
                                  : (theme === 'dark' ? '#86efac' : '#15803d')
                              }}
                            >
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
              <div 
                className="p-3 rounded-lg border text-center"
                style={{
                  backgroundColor: theme === 'classic' ? '#0a3d29' : theme === 'dark' ? 'rgba(6, 78, 59, 0.3)' : 'rgb(240, 253, 244)',
                  borderColor: theme === 'classic' ? '#16a34a' : theme === 'dark' ? 'rgb(6, 78, 59)' : 'rgb(187, 247, 208)'
                }}
              >
                <div 
                  className="font-semibold mb-1"
                  style={{ color: theme === 'classic' ? '#86efac' : theme === 'dark' ? '#86efac' : '#15803d' }}
                >
                  0.0 - 0.4
                </div>
                <div className="text-xs text-secondary">
                  {language === 'en' ? 'Basic Level' : 'Nível Básico'}
                </div>
              </div>
              <div 
                className="p-3 rounded-lg border text-center"
                style={{
                  backgroundColor: theme === 'classic' ? '#4a3506' : theme === 'dark' ? 'rgba(133, 77, 14, 0.3)' : 'rgb(254, 252, 232)',
                  borderColor: theme === 'classic' ? '#ca8a04' : theme === 'dark' ? 'rgb(133, 77, 14)' : 'rgb(253, 230, 138)'
                }}
              >
                <div 
                  className="font-semibold mb-1"
                  style={{ color: theme === 'classic' ? '#fde047' : theme === 'dark' ? '#fde047' : '#a16207' }}
                >
                  0.4 - 0.7
                </div>
                <div className="text-xs text-secondary">
                  {language === 'en' ? 'Moderate Level' : 'Nível Moderado'}
                </div>
              </div>
              <div 
                className="p-3 rounded-lg border text-center"
                style={{
                  backgroundColor: theme === 'classic' ? '#4a1515' : theme === 'dark' ? 'rgba(127, 29, 29, 0.3)' : 'rgb(254, 242, 242)',
                  borderColor: theme === 'classic' ? '#dc2626' : theme === 'dark' ? 'rgb(127, 29, 29)' : 'rgb(254, 202, 202)'
                }}
              >
                <div 
                  className="font-semibold mb-1"
                  style={{ color: theme === 'classic' ? '#fca5a5' : theme === 'dark' ? '#fca5a5' : '#b91c1c' }}
                >
                  0.7 - 1.0
                </div>
                <div className="text-xs text-secondary">
                  {language === 'en' ? 'Advanced Level' : 'Nível Avançado'}
                </div>
              </div>
            </div>

            <div 
              className="p-4 rounded-lg border"
              style={{
                backgroundColor: theme === 'classic' ? '#1e3a5f' : theme === 'dark' ? 'rgba(30, 58, 138, 0.3)' : 'rgb(239, 246, 255)',
                borderColor: theme === 'classic' ? '#3b82f6' : theme === 'dark' ? 'rgb(30, 58, 138)' : 'rgb(191, 219, 254)'
              }}
            >
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
      <div 
        data-modal="info"
        className="w-full max-w-6xl max-h-[90vh] rounded-lg shadow-2xl overflow-hidden"
        style={{
          backgroundColor: theme === 'classic' ? '#041428' : theme === 'dark' ? '#111827' : '#ffffff'
        }}
      >
        {/* Header */}
        <div 
          className="p-4 sm:p-6"
          style={{
            background: theme === 'classic' 
              ? 'linear-gradient(to right, #f5cf0d, #f5cf0d)' 
              : theme === 'dark'
              ? 'linear-gradient(to right, #1d4ed8, #7c3aed)'
              : 'linear-gradient(to right, #2563eb, #9333ea)',
            color: theme === 'classic' ? '#041428' : '#ffffff'
          }}
        >
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
        <div 
          className="border-b"
          style={{
            backgroundColor: theme === 'classic' ? '#05182d' : theme === 'dark' ? '#1f2937' : '#f9fafb',
            borderColor: theme === 'classic' ? 'rgba(255,255,255,0.2)' : theme === 'dark' ? '#374151' : '#e5e7eb'
          }}
        >
          <div className="flex overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors border-b-2"
                style={{
                  backgroundColor: activeTab === tab.id 
                    ? (theme === 'classic' ? '#041428' : theme === 'dark' ? '#111827' : '#ffffff')
                    : 'transparent',
                  color: activeTab === tab.id
                    ? (theme === 'classic' ? '#ffffff' : theme === 'dark' ? '#60a5fa' : '#2563eb')
                    : (theme === 'classic' ? '#d1d5db' : theme === 'dark' ? '#9ca3af' : '#6b7280'),
                  borderBottomColor: activeTab === tab.id
                    ? (theme === 'classic' ? '#f5cf0d' : '#3b82f6')
                    : 'transparent'
                }}
                onMouseEnter={(e) => {
                  if (activeTab !== tab.id) {
                    e.currentTarget.style.color = theme === 'classic' ? '#ffffff' : theme === 'dark' ? '#d1d5db' : '#111827';
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeTab !== tab.id) {
                    e.currentTarget.style.color = theme === 'classic' ? '#d1d5db' : theme === 'dark' ? '#9ca3af' : '#6b7280';
                  }
                }}
              >
                <span className="text-lg">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div 
          className="p-6 sm:p-8 max-h-[60vh] overflow-y-auto"
          style={{
            color: theme === 'classic' ? '#ffffff' : theme === 'dark' ? '#e5e7eb' : '#1f2937'
          }}
        >
          {renderTabContent()}
        </div>

        {/* Footer */}
        <div 
          className="border-t p-4 sm:p-6"
          style={{
            backgroundColor: theme === 'classic' ? '#05182d' : theme === 'dark' ? '#1f2937' : '#f9fafb',
            borderColor: theme === 'classic' ? 'rgba(255,255,255,0.2)' : theme === 'dark' ? '#374151' : '#e5e7eb'
          }}
        >
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