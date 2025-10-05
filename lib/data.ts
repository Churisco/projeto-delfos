import { Aptitude, Profession, Question, Option } from "./types";

/**
 * PROJETO DELFOS - DADOS DE APTIDÕES E PROFISSÕES
 * 
 * Este arquivo contém duas versões de dados de profissões:
 * 
 * v1 (professions_v1_manual): Pesos estimados manualmente
 * - Baseado em conhecimento empírico e estimativas subjetivas
 * - Algumas aptidões não mapeadas (valores zero)
 * - Utilizado até outubro/2025
 * 
 * v2 (professions_v2_onet): Pesos científicos baseados em O*NET Database
 * - Baseado em dados empíricos de 974 ocupações profissionais
 * - Todas as 22 aptidões mapeadas com valores científicos
 * - Processamento de 5 arquivos O*NET (Abilities, Skills, Knowledge, Interests, Work Values)
 * - Sistema ativo desde outubro/2025
 * 
 * Para alternar entre versões, modifique a exportação 'professions' no final do arquivo.
 */

export const aptitudes: Aptitude[] = [
  { id: "logica", name: "Raciocínio Lógico" },
  { id: "matematica", name: "Matemática Aplicada" },
  { id: "interpretacao", name: "Interpretação de Texto" },
  { id: "escrita", name: "Escrita Estruturada" },
  { id: "espacial", name: "Capacidade Espacial" },
  { id: "detalhes", name: "Atenção a Detalhes" },
  { id: "memoria", name: "Memória de Curto Prazo" },
  { id: "velocidade", name: "Velocidade de Processamento" },
  { id: "problemas", name: "Resolução de Problemas" },
  { id: "criatividade", name: "Criatividade Prática" },
  { id: "coord_fina", name: "Coordenação Motora Fina" },
  { id: "artistica", name: "Expressão Artística" },
  { id: "musica", name: "Música e Ritmo" },
  { id: "esportes", name: "Esportes e Movimento" },
  { id: "natureza", name: "Interesse por Natureza" },
  { id: "tecnologia", name: "Interesse por Tecnologia" },
  { id: "organizacao", name: "Organização e Planejamento" },
  { id: "lideranca", name: "Liderança Prática" },
  { id: "didatica", name: "Didática e Ensino" },
  { id: "empreendedorismo", name: "Iniciativa Empreendedora" },
  { id: "curiosidade", name: "Curiosidade Autodidata" },
  { id: "comunicacao", name: "Comunicação Verbal" }
];

export const aptitudes_en: Aptitude[] = [
  { id: "logica", name: "Logical Reasoning" },
  { id: "matematica", name: "Applied Mathematics" },
  { id: "interpretacao", name: "Reading Comprehension" },
  { id: "escrita", name: "Structured Writing" },
  { id: "espacial", name: "Spatial Ability" },
  { id: "detalhes", name: "Attention to Detail" },
  { id: "memoria", name: "Short-term Memory" },
  { id: "velocidade", name: "Processing Speed" },
  { id: "problemas", name: "Problem Solving" },
  { id: "criatividade", name: "Practical Creativity" },
  { id: "coord_fina", name: "Fine Motor Coordination" },
  { id: "artistica", name: "Artistic Expression" },
  { id: "musica", name: "Music and Rhythm" },
  { id: "esportes", name: "Sports and Movement" },
  { id: "natureza", name: "Interest in Nature" },
  { id: "tecnologia", name: "Interest in Technology" },
  { id: "organizacao", name: "Organization and Planning" },
  { id: "lideranca", name: "Practical Leadership" },
  { id: "didatica", name: "Teaching and Didactics" },
  { id: "empreendedorismo", name: "Entrepreneurial Initiative" },
  { id: "curiosidade", name: "Self-taught Curiosity" },
  { id: "comunicacao", name: "Verbal Communication" }
];

export const frequencyOptions: Option[] = [
  { text: "Nunca", value: 0 },
  { text: "Raro", value: 0.3 },
  { text: "Às vezes", value: 0.5 },
  { text: "Frequente", value: 0.7 },
  { text: "Sempre", value: 1 }
];
export const frequencyOptions_en: Option[] = [
  { text: "Never", value: 0 },
  { text: "Rarely", value: 0.3 },
  { text: "Sometimes", value: 0.5 },
  { text: "Often", value: 0.7 },
  { text: "Always", value: 1 }
];
export const agreementOptions: Option[] = [
  { text: "Discordo Total.", value: 0 },
  { text: "Discordo", value: 0.3 },
  { text: "Neutro", value: 0.5 },
  { text: "Concordo", value: 0.7 },
  { text: "Concordo Total.", value: 1 }
];
export const agreementOptions_en: Option[] = [
  { text: "Strongly Disagree", value: 0 },
  { text: "Disagree", value: 0.3 },
  { text: "Neutral", value: 0.5 },
  { text: "Agree", value: 0.7 },
  { text: "Strongly Agree", value: 1 }
];
export const likingOptions: Option[] = [
  { text: "Não gosto", value: 0 },
  { text: "Pouco", value: 0.3 },
  { text: "Indiferente", value: 0.5 },
  { text: "Gosto", value: 0.7 },
  { text: "Amo", value: 1 }
];
export const likingOptions_en: Option[] = [
  { text: "Dislike", value: 0 },
  { text: "A little", value: 0.3 },
  { text: "Neutral", value: 0.5 },
  { text: "Like", value: 0.7 },
  { text: "Love", value: 1 }
];
export const intentionOptions: Option[] = [
  { text: "Nenhuma", value: 0 },
  { text: "Baixa", value: 0.3 },
  { text: "Média", value: 0.5 },
  { text: "Alta", value: 0.7 },
  { text: "Total", value: 1 }
];
export const intentionOptions_en: Option[] = [
  { text: "None", value: 0 },
  { text: "Low", value: 0.3 },
  { text: "Medium", value: 0.5 },
  { text: "High", value: 0.7 },
  { text: "Total", value: 1 }
];
export const experienceOptions: Option[] = [
  { text: "Nenhuma", value: 0 },
  { text: "Pouca", value: 0.3 },
  { text: "Alguma", value: 0.5 },
  { text: "Razoável", value: 0.7 },
  { text: "Muita", value: 1 }
];
export const experienceOptions_en: Option[] = [
  { text: "None", value: 0 },
  { text: "Little", value: 0.3 },
  { text: "Some", value: 0.5 },
  { text: "Good", value: 0.7 },
  { text: "A lot", value: 1 }
];

// Removidas as opções customizadas problemáticas - usar apenas escalas padrão

export const questions: Question[] = [
  // QUESTÕES INTELIGENTES BASEADAS EM CENÁRIOS COTIDIANOS (30 questões)
  // Cada questão mapeia múltiplas aptidões através de situações naturais
  
  // Q1: Cenário de organização pessoal
  { id: "q1", text: "Quando você chega em casa, suas coisas têm um lugar específico e você gosta de manter tudo em ordem.", options: agreementOptions, weights: { organizacao: 0.8, detalhes: 0.6, memoria: 0.4, espacial: 0.3 } },
  // Q2: Cenário de resolução de problemas tecnológicos
  { id: "q2", text: "Quando um aparelho eletrônico não funciona, você gosta de tentar descobrir o problema e consertá-lo você mesmo.", options: likingOptions, weights: { tecnologia: 0.8, problemas: 0.7, logica: 0.6, curiosidade: 0.4, espacial: 0.3 } },
  // Q3: Cenário social de comunicação
  { id: "q3", text: "Em uma conversa em grupo, você se sente confortável para falar e contribuir com suas ideias.", options: agreementOptions, weights: { comunicacao: 0.8, lideranca: 0.6, didatica: 0.5, empreendedorismo: 0.3 } },
  // Q4: Cenário de aprendizado autodidata  
  { id: "q4", text: "Você frequentemente assiste vídeos no YouTube ou pesquisa na internet sobre assuntos que te interessam, mesmo sem ninguém pedir.", options: frequencyOptions, weights: { curiosidade: 0.8, didatica: 0.5, interpretacao: 0.4, tecnologia: 0.3 } },
  // Q5: Cenário de atividade física
  { id: "q5", text: "Você pratica ou gostaria de praticar esportes, dança ou atividades físicas regularmente.", options: likingOptions, weights: { esportes: 0.8, coord_fina: 0.5, musica: 0.4, natureza: 0.3 } },
  // Q6: Cenário de expressão criativa
  { id: "q6", text: "Quando você tem tempo livre, gosta de fazer coisas como desenhar, pintar, tocar instrumento ou criar algo com as mãos.", options: likingOptions, weights: { artistica: 0.8, criatividade: 0.7, coord_fina: 0.6, musica: 0.5, espacial: 0.3 } },
  // Q7: Cenário de leitura e compreensão
  { id: "q7", text: "Quando você lê um texto ou notícia, consegue entender rapidamente a ideia principal e formar sua própria opinião.", options: agreementOptions, weights: { interpretacao: 0.8, velocidade: 0.6, logica: 0.5, curiosidade: 0.4, escrita: 0.3 } },
  // Q8: Cenário de ajuda e ensino
  { id: "q8", text: "Seus amigos ou familiares costumam te procurar quando precisam de ajuda para entender algo ou resolver problemas.", options: frequencyOptions, weights: { didatica: 0.8, comunicacao: 0.7, problemas: 0.6, lideranca: 0.4, escrita: 0.3 } },
  // Q9: Cenário de observação da natureza
  { id: "q9", text: "Você se sente bem quando está em contato com a natureza, observando animais, plantas ou paisagens.", options: likingOptions, weights: { natureza: 0.8, curiosidade: 0.5, detalhes: 0.4, espacial: 0.3 } },
  // Q10: Cenário de cálculos cotidianos
  { id: "q10", text: "Você consegue fazer contas de cabeça facilmente, como calcular trocos, porcentagens ou dividir uma conta no restaurante.", options: agreementOptions, weights: { matematica: 0.8, velocidade: 0.6, logica: 0.5, memoria: 0.3 } },
  // Q11: Cenário de escrita e expressão
  { id: "q11", text: "Você consegue escrever mensagens, textos ou posts de forma clara e que outras pessoas entendem facilmente.", options: agreementOptions, weights: { escrita: 0.8, comunicacao: 0.6, interpretacao: 0.4, organizacao: 0.3 } },
  // Q12: Cenário de memória e atenção
  { id: "q12", text: "Você lembra bem de detalhes de conversas, filmes ou coisas que aconteceram recentemente.", options: agreementOptions, weights: { memoria: 0.8, detalhes: 0.7, velocidade: 0.4, organizacao: 0.3 } },
  // Q13: Cenário de liderança prática
  { id: "q13", text: "Em trabalhos de grupo ou projetos, você naturalmente assume o papel de organizar as tarefas e coordenar as pessoas.", options: frequencyOptions, weights: { lideranca: 0.8, organizacao: 0.7, comunicacao: 0.6, empreendedorismo: 0.5, didatica: 0.3 } },
  // Q14: Cenário de inovação e empreendedorismo
  { id: "q14", text: "Você tem ideias para melhorar coisas do seu dia a dia ou criar produtos/serviços que poderiam ajudar outras pessoas.", options: frequencyOptions, weights: { empreendedorismo: 0.8, criatividade: 0.7, problemas: 0.6, curiosidade: 0.4, logica: 0.3 } },
  // Q15: Cenário de montagem e espacialidade
  { id: "q15", text: "Você tem facilidade para montar móveis, brinquedos ou objetos seguindo instruções, ou consegue imaginar como as peças se encaixam.", options: agreementOptions, weights: { espacial: 0.8, logica: 0.6, detalhes: 0.5, coord_fina: 0.4, tecnologia: 0.3 } },
  // Q16: Cenário de música e ritmo
  { id: "q16", text: "Você consegue acompanhar o ritmo de uma música batendo palma, cantando ou dançando naturalmente.", options: agreementOptions, weights: { musica: 0.8, coord_fina: 0.5, memoria: 0.4, esportes: 0.3 } },
  // Q17: Cenário de concentração e foco
  { id: "q17", text: "Você consegue se concentrar em uma atividade por muito tempo sem se distrair facilmente.", options: agreementOptions, weights: { detalhes: 0.8, memoria: 0.6, organizacao: 0.4, velocidade: 0.3 } },
  // Q18: Cenário de rapidez e agilidade mental
  { id: "q18", text: "Em jogos que exigem rapidez (como videogame, esportes ou brincadeiras), você costuma ter bons reflexos e tomar decisões rápidas.", options: agreementOptions, weights: { velocidade: 0.8, logica: 0.5, esportes: 0.4, coord_fina: 0.3 } },
  // Q19: Cenário de curiosidade científica
  { id: "q19", text: "Você se interessa por entender como as coisas funcionam, gosta de documentários ou quer saber o 'porquê' das coisas.", options: likingOptions, weights: { curiosidade: 0.8, logica: 0.6, interpretacao: 0.5, natureza: 0.4, tecnologia: 0.3 } },
  // Q20: Cenário de habilidade manual e precisão
  { id: "q20", text: "Você tem jeito para atividades que exigem delicadeza e precisão, como desenhar detalhes, fazer artesanato ou mexer com coisas pequenas.", options: agreementOptions, weights: { coord_fina: 0.8, artistica: 0.6, detalhes: 0.5, criatividade: 0.4, espacial: 0.3 } },
  // Q21: Cenário de resolução criativa
  { id: "q21", text: "Quando você enfrenta um problema no dia a dia, costuma pensar em soluções diferentes e criativas, não apenas no óbvio.", options: agreementOptions, weights: { criatividade: 0.8, problemas: 0.7, logica: 0.5, empreendedorismo: 0.4, curiosidade: 0.3 } },
  // Q22: Cenário de interação e networking
  { id: "q22", text: "Você se sente à vontade para conversar com pessoas que não conhece bem e fazer novos contatos.", options: agreementOptions, weights: { comunicacao: 0.8, lideranca: 0.5, empreendedorismo: 0.4, didatica: 0.3 } },
  // Q23: Cenário de análise e crítica
  { id: "q23", text: "Quando você assiste um filme, lê uma notícia ou ouve uma explicação, consegue identificar se faz sentido ou se tem algo estranho.", options: agreementOptions, weights: { interpretacao: 0.8, logica: 0.7, curiosidade: 0.5, velocidade: 0.3 } },
  // Q24: Cenário de planejamento e estratégia
  { id: "q24", text: "Antes de fazer algo importante (viagem, prova, projeto), você gosta de planejar e pensar em todos os detalhes.", options: agreementOptions, weights: { organizacao: 0.8, logica: 0.6, detalhes: 0.5, lideranca: 0.4, matematica: 0.3 } },
  // Q25: Cenário de atividades ao ar livre
  { id: "q25", text: "Você prefere atividades ao ar livre (praia, parque, trilha) do que ficar sempre em lugares fechados.", options: likingOptions, weights: { natureza: 0.8, esportes: 0.6, curiosidade: 0.4, espacial: 0.3 } },
  // Q26: Cenário de trabalho colaborativo
  { id: "q26", text: "Em trabalhos em grupo, você consegue explicar suas ideias claramente e ajudar o grupo a chegar numa conclusão.", options: agreementOptions, weights: { comunicacao: 0.8, didatica: 0.7, lideranca: 0.6, organizacao: 0.4, escrita: 0.3 } },
  // Q27: Cenário de tecnologia e programação
  { id: "q27", text: "Você tem interesse ou facilidade com computadores, aplicativos, jogos ou gostaria de aprender a programar.", options: likingOptions, weights: { tecnologia: 0.8, logica: 0.6, matematica: 0.5, problemas: 0.4, curiosidade: 0.3 } },
  // Q28: Cenário de iniciativa e autonomia
  { id: "q28", text: "Você costuma tomar iniciativa para resolver problemas ou iniciar projetos sem esperar que alguém te peça.", options: frequencyOptions, weights: { empreendedorismo: 0.8, lideranca: 0.6, problemas: 0.5, organizacao: 0.4, criatividade: 0.3 } },
  // Q29: Cenário de performance e apresentação
  { id: "q29", text: "Você se sente confortável falando em público, apresentando trabalhos ou se apresentando para outras pessoas.", options: agreementOptions, weights: { comunicacao: 0.8, lideranca: 0.6, didatica: 0.5, musica: 0.4, artistica: 0.3 } },
  // Q30: Cenário de síntese e análise
  { id: "q30", text: "Quando você estuda ou aprende algo novo, consegue conectar as informações e criar resumos ou mapas mentais.", options: agreementOptions, weights: { organizacao: 0.8, interpretacao: 0.7, escrita: 0.6, memoria: 0.5, logica: 0.4, didatica: 0.3 } }
];

// English translations for questions (same order/ids and weights)
export const questions_en: Question[] = [
  { id: "q1", text: "When you get home, your stuff has a specific place and you like to keep everything organized.", options: agreementOptions_en, weights: { organizacao: 0.8, detalhes: 0.6, memoria: 0.4, espacial: 0.3 } },
  { id: "q2", text: "When an electronic device doesn't work, you like to figure out the problem and fix it yourself.", options: likingOptions_en, weights: { tecnologia: 0.8, problemas: 0.7, logica: 0.6, curiosidade: 0.4, espacial: 0.3 } },
  { id: "q3", text: "In a group conversation, you feel comfortable speaking and contributing your ideas.", options: agreementOptions_en, weights: { comunicacao: 0.8, lideranca: 0.6, didatica: 0.5, empreendedorismo: 0.3 } },
  { id: "q4", text: "You often watch YouTube videos or search the internet about topics you like, even if nobody asks you to.", options: frequencyOptions_en, weights: { curiosidade: 0.8, didatica: 0.5, interpretacao: 0.4, tecnologia: 0.3 } },
  { id: "q5", text: "You practice or would like to practice sports, dance or physical activities regularly.", options: likingOptions_en, weights: { esportes: 0.8, coord_fina: 0.5, musica: 0.4, natureza: 0.3 } },
  { id: "q6", text: "In your free time, you enjoy doing things like drawing, painting, playing instruments or creating things with your hands.", options: likingOptions_en, weights: { artistica: 0.8, criatividade: 0.7, coord_fina: 0.6, musica: 0.5, espacial: 0.3 } },
  { id: "q7", text: "When you read a text or article, you quickly understand the main idea and form your own opinion.", options: agreementOptions_en, weights: { interpretacao: 0.8, velocidade: 0.6, logica: 0.5, curiosidade: 0.4, escrita: 0.3 } },
  { id: "q8", text: "Friends or family often ask you for help to understand something or solve problems.", options: frequencyOptions_en, weights: { didatica: 0.8, comunicacao: 0.7, problemas: 0.6, lideranca: 0.4, escrita: 0.3 } },
  { id: "q9", text: "You feel good when you're in contact with nature, observing animals, plants or landscapes.", options: likingOptions_en, weights: { natureza: 0.8, curiosidade: 0.5, detalhes: 0.4, espacial: 0.3 } },
  { id: "q10", text: "You're good at mental calculations like change, percentages, or splitting a restaurant bill.", options: agreementOptions_en, weights: { matematica: 0.8, velocidade: 0.6, logica: 0.5, memoria: 0.3 } },
  { id: "q11", text: "You can write messages or texts clearly so other people easily understand.", options: agreementOptions_en, weights: { escrita: 0.8, comunicacao: 0.6, interpretacao: 0.4, organizacao: 0.3 } },
  { id: "q12", text: "You remember details of conversations, movies, or recent events well.", options: agreementOptions_en, weights: { memoria: 0.8, detalhes: 0.7, velocidade: 0.4, organizacao: 0.3 } },
  { id: "q13", text: "In group projects, you naturally take the role of organizing tasks and coordinating people.", options: frequencyOptions_en, weights: { lideranca: 0.8, organizacao: 0.7, comunicacao: 0.6, empreendedorismo: 0.5, didatica: 0.3 } },
  { id: "q14", text: "You have ideas to improve everyday things or create products/services that could help people.", options: frequencyOptions_en, weights: { empreendedorismo: 0.8, criatividade: 0.7, problemas: 0.6, curiosidade: 0.4, logica: 0.3 } },
  { id: "q15", text: "You're good at assembling furniture/toys following instructions or imagining how pieces fit together.", options: agreementOptions_en, weights: { espacial: 0.8, logica: 0.6, detalhes: 0.5, coord_fina: 0.4, tecnologia: 0.3 } },
  { id: "q16", text: "You can follow a song's rhythm naturally by clapping, singing, or dancing.", options: agreementOptions_en, weights: { musica: 0.8, coord_fina: 0.5, memoria: 0.4, esportes: 0.3 } },
  { id: "q17", text: "You can focus on an activity for a long time without getting easily distracted.", options: agreementOptions_en, weights: { detalhes: 0.8, memoria: 0.6, organizacao: 0.4, velocidade: 0.3 } },
  { id: "q18", text: "In games that require quick reactions (video games, sports), you usually have good reflexes and make fast decisions.", options: agreementOptions_en, weights: { velocidade: 0.8, logica: 0.5, esportes: 0.4, coord_fina: 0.3 } },
  { id: "q19", text: "You're curious to understand how things work; you like documentaries or want to know the 'why' of things.", options: likingOptions_en, weights: { curiosidade: 0.8, logica: 0.6, interpretacao: 0.5, natureza: 0.4, tecnologia: 0.3 } },
  { id: "q20", text: "You're good at delicate and precise activities like drawing details, crafting, or handling small things.", options: agreementOptions_en, weights: { coord_fina: 0.8, artistica: 0.6, detalhes: 0.5, criatividade: 0.4, espacial: 0.3 } },
  { id: "q21", text: "When you face a problem, you tend to think of different and creative solutions, not just the obvious.", options: agreementOptions_en, weights: { criatividade: 0.8, problemas: 0.7, logica: 0.5, empreendedorismo: 0.4, curiosidade: 0.3 } },
  { id: "q22", text: "You're comfortable talking to people you don't know well and making new contacts.", options: agreementOptions_en, weights: { comunicacao: 0.8, lideranca: 0.5, empreendedorismo: 0.4, didatica: 0.3 } },
  { id: "q23", text: "When you watch a movie or read news, you can tell if it makes sense or if something feels off.", options: agreementOptions_en, weights: { interpretacao: 0.8, logica: 0.7, curiosidade: 0.5, velocidade: 0.3 } },
  { id: "q24", text: "Before doing something important (trip, test, project), you like to plan and think through all details.", options: agreementOptions_en, weights: { organizacao: 0.8, logica: 0.6, detalhes: 0.5, lideranca: 0.4, matematica: 0.3 } },
  { id: "q25", text: "You prefer outdoor activities (beach, park, trail) over always staying indoors.", options: likingOptions_en, weights: { natureza: 0.8, esportes: 0.6, curiosidade: 0.4, espacial: 0.3 } },
  { id: "q26", text: "In group work, you explain your ideas clearly and help the group reach conclusions.", options: agreementOptions_en, weights: { comunicacao: 0.8, didatica: 0.7, lideranca: 0.6, organizacao: 0.4, escrita: 0.3 } },
  { id: "q27", text: "You are interested in or comfortable with computers, apps, games, or would like to learn programming.", options: likingOptions_en, weights: { tecnologia: 0.8, logica: 0.6, matematica: 0.5, problemas: 0.4, curiosidade: 0.3 } },
  { id: "q28", text: "You usually take initiative to solve problems or start projects without waiting for someone to ask.", options: frequencyOptions_en, weights: { empreendedorismo: 0.8, lideranca: 0.6, problemas: 0.5, organizacao: 0.4, criatividade: 0.3 } },
  { id: "q29", text: "You're comfortable with public speaking, presenting work, or performing for others.", options: agreementOptions_en, weights: { comunicacao: 0.8, lideranca: 0.6, didatica: 0.5, musica: 0.4, artistica: 0.3 } },
  { id: "q30", text: "When you study something new, you connect information and create summaries or mind maps.", options: agreementOptions_en, weights: { organizacao: 0.8, interpretacao: 0.7, escrita: 0.6, memoria: 0.5, logica: 0.4, didatica: 0.3 } }
];

// Helper to pick questions by language (defaults to pt)
export function getQuestionsByLang(lang: "pt" | "en" = "pt"): Question[] {
  return lang === "en" ? questions_en : questions;
}

// Versão 1 (manual / inicial). Manter para comparação futura com pesos derivados da ONET
export const professions_v1_manual: Profession[] = [
  { id: "administracao", name: "Administração", req: { organizacao: 0.8, lideranca: 0.6, comunicacao: 0.6, problemas: 0.5, empreendedorismo: 0.5, escrita: 0.4 } },
  { id: "biologia", name: "Biologia", req: { natureza: 0.9, curiosidade: 0.8, interpretacao: 0.6, detalhes: 0.6, logica: 0.5, escrita: 0.5 } },
  { id: "ciencia_computacao", name: "Ciência da Computação", req: { logica: 0.9, matematica: 0.7, tecnologia: 0.9, problemas: 0.8, curiosidade: 0.7, detalhes: 0.6 } },
  { id: "economia", name: "Economia", req: { matematica: 0.8, logica: 0.7, interpretacao: 0.7, detalhes: 0.6, curiosidade: 0.6, escrita: 0.5 } }, // TODO: recalibrar com dados ONET
  { id: "design_grafico", name: "Design Gráfico", req: { criatividade: 0.9, artistica: 0.8, espacial: 0.6, tecnologia: 0.5, detalhes: 0.6 } },
  { id: "design_interiores", name: "Design de Interiores", req: { criatividade: 0.85, espacial: 0.7, detalhes: 0.6, artistica: 0.6, tecnologia: 0.4 } }, // TODO: recalibrar com dados ONET
  { id: "direito", name: "Direito", req: { interpretacao: 0.9, escrita: 0.8, comunicacao: 0.8, logica: 0.6, memoria: 0.6, detalhes: 0.5 } },
  { id: "educacao_fisica", name: "Educação Física", req: { esportes: 0.9, comunicacao: 0.6, didatica: 0.6, lideranca: 0.5, natureza: 0.4 } },
  { id: "engenharia_mecanica", name: "Engenharia Mecânica", req: { matematica: 0.8, logica: 0.8, espacial: 0.7, problemas: 0.8, detalhes: 0.6, criatividade: 0.5 } },
  { id: "engenharia_civil", name: "Engenharia Civil", req: { matematica: 0.9, logica: 0.8, espacial: 0.7, problemas: 0.8, detalhes: 0.6, organizacao: 0.6 } },
  { id: "engenharia_software", name: "Engenharia de Software", req: { logica: 0.9, tecnologia: 0.9, problemas: 0.8, curiosidade: 0.7, detalhes: 0.6, organizacao: 0.5 } },
  { id: "filosofia", name: "Filosofia", req: { interpretacao: 0.9, curiosidade: 0.8, escrita: 0.7, logica: 0.6, comunicacao: 0.5 } },
  { id: "geografia", name: "Geografia", req: { espacial: 0.7, natureza: 0.7, curiosidade: 0.7, interpretacao: 0.6, detalhes: 0.5 } },
  { id: "historia", name: "História", req: { interpretacao: 0.9, escrita: 0.8, curiosidade: 0.8, memoria: 0.6, comunicacao: 0.5 } },
  { id: "letras", name: "Letras", req: { escrita: 0.9, interpretacao: 0.9, comunicacao: 0.7, curiosidade: 0.5, didatica: 0.5 } },
  { id: "medicina", name: "Medicina", req: { detalhes: 0.9, memoria: 0.8, problemas: 0.8, logica: 0.7, comunicacao: 0.7, coord_fina: 0.6 } },
  { id: "musica", name: "Música", req: { musica: 0.9, artistica: 0.6, criatividade: 0.6, detalhes: 0.4, comunicacao: 0.4 } },
  { id: "pedagogia", name: "Pedagogia", req: { didatica: 0.9, comunicacao: 0.8, criatividade: 0.5, organizacao: 0.6, interpretacao: 0.5 } },
  { id: "psicologia", name: "Psicologia", req: { interpretacao: 0.8, comunicacao: 0.8, curiosidade: 0.7, problemas: 0.6, escrita: 0.5 } },
  { id: "rel_internacionais", name: "Relações Internacionais", req: { comunicacao: 0.9, interpretacao: 0.8, escrita: 0.7, curiosidade: 0.7, lideranca: 0.5 } }
];

// Versão v2 baseada em dados científicos O*NET
export const professions_v2_onet: Profession[] = [
  { id: "administracao", name: "Administração", req: { logica: 0.876, matematica: 0.655, interpretacao: 0.871, escrita: 0.861, espacial: 0.844, detalhes: 0.949, memoria: 0.714, velocidade: 0.885, problemas: 0.918, criatividade: 0.784, coord_fina: 0.658, artistica: 0.388, musica: 0.674, esportes: 0.789, natureza: 0.260, tecnologia: 0.680, organizacao: 0.968, lideranca: 1.000, didatica: 0.729, empreendedorismo: 0.751, curiosidade: 0.810, comunicacao: 0.942 } },
  { id: "biologia", name: "Biologia", req: { logica: 0.954, matematica: 0.889, interpretacao: 0.941, escrita: 0.972, espacial: 0.760, detalhes: 0.936, memoria: 0.806, velocidade: 0.844, problemas: 0.905, criatividade: 0.901, coord_fina: 0.757, artistica: 0.389, musica: 0.541, esportes: 0.557, natureza: 1.000, tecnologia: 0.766, organizacao: 0.820, lideranca: 0.766, didatica: 0.815, empreendedorismo: 0.528, curiosidade: 0.921, comunicacao: 0.847 } },
  { id: "ciencia_computacao", name: "Ciência da Computação", req: { logica: 0.887, matematica: 0.674, interpretacao: 0.861, escrita: 0.843, espacial: 0.700, detalhes: 0.888, memoria: 0.730, velocidade: 0.745, problemas: 0.886, criatividade: 0.765, coord_fina: 0.593, artistica: 0.478, musica: 0.493, esportes: 0.485, natureza: 0.179, tecnologia: 0.939, organizacao: 0.770, lideranca: 0.758, didatica: 0.661, empreendedorismo: 0.667, curiosidade: 0.761, comunicacao: 0.890 } },
  { id: "economia", name: "Economia", req: { logica: 0.897, matematica: 1.000, interpretacao: 0.898, escrita: 0.942, espacial: 0.648, detalhes: 0.782, memoria: 0.840, velocidade: 0.680, problemas: 0.764, criatividade: 0.819, coord_fina: 0.379, artistica: 0.253, musica: 0.490, esportes: 0.501, natureza: 0.336, tecnologia: 0.662, organizacao: 0.858, lideranca: 0.713, didatica: 0.720, empreendedorismo: 0.501, curiosidade: 0.823, comunicacao: 0.809 } },
  { id: "design_grafico", name: "Design Gráfico", req: { logica: 0.746, matematica: 0.490, interpretacao: 0.770, escrita: 0.789, espacial: 0.791, detalhes: 0.688, memoria: 0.588, velocidade: 0.636, problemas: 0.641, criatividade: 0.956, coord_fina: 0.740, artistica: 1.000, musica: 0.491, esportes: 0.480, natureza: 0.128, tecnologia: 0.801, organizacao: 0.656, lideranca: 0.708, didatica: 0.442, empreendedorismo: 0.928, curiosidade: 0.679, comunicacao: 0.935 } },
  { id: "design_interiores", name: "Design de Interiores", req: { logica: 0.855, matematica: 0.676, interpretacao: 0.872, escrita: 0.846, espacial: 1.000, detalhes: 0.846, memoria: 0.571, velocidade: 0.727, problemas: 0.887, criatividade: 1.000, coord_fina: 0.659, artistica: 0.888, musica: 0.511, esportes: 0.647, natureza: 0.206, tecnologia: 0.712, organizacao: 0.828, lideranca: 0.895, didatica: 0.516, empreendedorismo: 0.667, curiosidade: 0.738, comunicacao: 0.879 } },
  { id: "direito", name: "Direito", req: { logica: 0.815, matematica: 0.456, interpretacao: 0.990, escrita: 1.000, espacial: 0.643, detalhes: 0.809, memoria: 0.643, velocidade: 0.564, problemas: 0.811, criatividade: 0.804, coord_fina: 0.379, artistica: 0.192, musica: 0.468, esportes: 0.388, natureza: 0.105, tecnologia: 0.428, organizacao: 0.770, lideranca: 0.634, didatica: 0.483, empreendedorismo: 0.501, curiosidade: 0.738, comunicacao: 0.861 } },
  { id: "educacao_fisica", name: "Educação Física", req: { logica: 0.798, matematica: 0.521, interpretacao: 0.793, escrita: 0.745, espacial: 0.873, detalhes: 0.779, memoria: 0.786, velocidade: 0.727, problemas: 0.803, criatividade: 0.691, coord_fina: 0.701, artistica: 0.343, musica: 0.638, esportes: 1.000, natureza: 0.266, tecnologia: 0.428, organizacao: 0.721, lideranca: 0.728, didatica: 0.845, empreendedorismo: 0.468, curiosidade: 0.679, comunicacao: 0.869 } },
  { id: "engenharia_mecanica", name: "Engenharia Mecânica", req: { logica: 1.000, matematica: 0.894, interpretacao: 0.877, escrita: 0.877, espacial: 0.852, detalhes: 0.898, memoria: 0.821, velocidade: 0.891, problemas: 1.000, criatividade: 0.880, coord_fina: 0.740, artistica: 0.642, musica: 0.625, esportes: 0.647, natureza: 0.233, tecnologia: 1.000, organizacao: 0.803, lideranca: 0.772, didatica: 0.563, empreendedorismo: 0.612, curiosidade: 0.846, comunicacao: 0.816 } },
  { id: "engenharia_civil", name: "Engenharia Civil", req: { logica: 0.992, matematica: 0.931, interpretacao: 0.877, escrita: 0.905, espacial: 0.825, detalhes: 0.871, memoria: 0.810, velocidade: 0.818, problemas: 0.880, criatividade: 0.870, coord_fina: 0.625, artistica: 0.656, musica: 0.539, esportes: 0.647, natureza: 0.433, tecnologia: 0.943, organizacao: 0.836, lideranca: 0.882, didatica: 0.606, empreendedorismo: 0.453, curiosidade: 0.810, comunicacao: 0.802 } },
  { id: "engenharia_software", name: "Engenharia de Software", req: { logica: 0.902, matematica: 0.715, interpretacao: 0.807, escrita: 0.789, espacial: 0.652, detalhes: 0.853, memoria: 0.738, velocidade: 0.727, problemas: 0.981, criatividade: 0.773, coord_fina: 0.540, artistica: 0.485, musica: 0.468, esportes: 0.485, natureza: 0.117, tecnologia: 0.994, organizacao: 0.738, lideranca: 0.610, didatica: 0.563, empreendedorismo: 0.515, curiosidade: 0.774, comunicacao: 0.765 } },
  { id: "filosofia", name: "Filosofia", req: { logica: 0.788, matematica: 0.433, interpretacao: 0.908, escrita: 0.935, espacial: 0.608, detalhes: 0.735, memoria: 0.643, velocidade: 0.564, problemas: 0.755, criatividade: 0.714, coord_fina: 0.379, artistica: 0.319, musica: 0.468, esportes: 0.388, natureza: 0.196, tecnologia: 0.431, organizacao: 0.639, lideranca: 0.575, didatica: 0.768, empreendedorismo: 0.586, curiosidade: 0.774, comunicacao: 0.859 } },
  { id: "geografia", name: "Geografia", req: { logica: 0.817, matematica: 0.660, interpretacao: 0.880, escrita: 0.963, espacial: 0.661, detalhes: 0.779, memoria: 0.857, velocidade: 0.636, problemas: 0.736, criatividade: 0.743, coord_fina: 0.540, artistica: 0.380, musica: 0.491, esportes: 0.557, natureza: 0.395, tecnologia: 0.540, organizacao: 0.689, lideranca: 0.660, didatica: 0.768, empreendedorismo: 0.728, curiosidade: 0.810, comunicacao: 0.843 } },
  { id: "historia", name: "História", req: { logica: 0.780, matematica: 0.532, interpretacao: 0.908, escrita: 0.993, espacial: 0.626, detalhes: 0.765, memoria: 0.714, velocidade: 0.564, problemas: 0.736, criatividade: 0.728, coord_fina: 0.379, artistica: 0.365, musica: 0.426, esportes: 0.388, natureza: 0.273, tecnologia: 0.458, organizacao: 0.672, lideranca: 0.687, didatica: 0.768, empreendedorismo: 0.582, curiosidade: 0.810, comunicacao: 0.943 } },
  { id: "letras", name: "Letras", req: { logica: 0.821, matematica: 0.631, interpretacao: 0.916, escrita: 0.949, espacial: 0.617, detalhes: 0.794, memoria: 0.823, velocidade: 0.564, problemas: 0.717, criatividade: 0.757, coord_fina: 0.456, artistica: 0.267, musica: 0.468, esportes: 0.388, natureza: 0.286, tecnologia: 0.498, organizacao: 0.705, lideranca: 0.781, didatica: 0.845, empreendedorismo: 0.564, curiosidade: 0.738, comunicacao: 1.000 } },
  { id: "medicina", name: "Medicina", req: { logica: 0.922, matematica: 0.690, interpretacao: 0.939, escrita: 0.934, espacial: 0.853, detalhes: 0.944, memoria: 0.857, velocidade: 0.818, problemas: 0.887, criatividade: 0.834, coord_fina: 0.717, artistica: 0.305, musica: 0.557, esportes: 0.595, natureza: 0.862, tecnologia: 0.577, organizacao: 0.803, lideranca: 0.809, didatica: 0.661, empreendedorismo: 0.749, curiosidade: 0.846, comunicacao: 0.913 } },
  { id: "musica", name: "Música", req: { logica: 0.654, matematica: 0.443, interpretacao: 0.770, escrita: 0.686, espacial: 0.766, detalhes: 0.862, memoria: 0.749, velocidade: 0.636, problemas: 0.661, criatividade: 0.774, coord_fina: 0.779, artistica: 0.660, musica: 1.000, esportes: 0.485, natureza: 0.142, tecnologia: 0.359, organizacao: 0.557, lideranca: 0.538, didatica: 0.661, empreendedorismo: 1.000, curiosidade: 0.583, comunicacao: 0.779 } },
  { id: "pedagogia", name: "Pedagogia", req: { logica: 0.838, matematica: 0.715, interpretacao: 0.863, escrita: 0.907, espacial: 0.773, detalhes: 0.809, memoria: 0.786, velocidade: 0.636, problemas: 0.755, criatividade: 0.926, coord_fina: 0.540, artistica: 0.403, musica: 0.532, esportes: 0.485, natureza: 0.252, tecnologia: 0.529, organizacao: 0.754, lideranca: 0.677, didatica: 1.000, empreendedorismo: 0.823, curiosidade: 0.738, comunicacao: 0.941 } },
  { id: "psicologia", name: "Psicologia", req: { logica: 0.809, matematica: 0.529, interpretacao: 1.000, escrita: 0.993, espacial: 0.686, detalhes: 0.824, memoria: 0.786, velocidade: 0.600, problemas: 0.792, criatividade: 0.865, coord_fina: 0.456, artistica: 0.220, musica: 0.491, esportes: 0.485, natureza: 0.457, tecnologia: 0.439, organizacao: 0.721, lideranca: 0.699, didatica: 0.690, empreendedorismo: 0.823, curiosidade: 0.774, comunicacao: 0.937 } },
  { id: "rel_internacionais", name: "Relações Internacionais", req: { logica: 0.919, matematica: 0.818, interpretacao: 0.880, escrita: 0.935, espacial: 0.818, detalhes: 0.824, memoria: 0.823, velocidade: 0.727, problemas: 0.755, criatividade: 0.925, coord_fina: 0.540, artistica: 0.442, musica: 0.491, esportes: 0.485, natureza: 0.252, tecnologia: 0.832, organizacao: 0.787, lideranca: 0.817, didatica: 0.639, empreendedorismo: 0.719, curiosidade: 0.774, comunicacao: 0.825 } }
];

export const professions_en_v1_manual: Profession[] = professions_v1_manual.map(p => ({ ...p, name: ((
  {
    administracao: "Business Administration",
    biologia: "Biology",
    ciencia_computacao: "Computer Science",
    economia: "Economics",
    design_grafico: "Graphic Design",
    design_interiores: "Interior Design",
    direito: "Law",
    educacao_fisica: "Physical Education",
    engenharia_mecanica: "Mechanical Engineering",
    engenharia_civil: "Civil Engineering",
    engenharia_software: "Software Engineering",
    filosofia: "Philosophy",
    geografia: "Geography",
    historia: "History",
    letras: "Linguistics and Literature",
    medicina: "Medicine",
    musica: "Music",
    pedagogia: "Pedagogy",
    psicologia: "Psychology",
    rel_internacionais: "International Relations",
  } as Record<string,string>
) [p.id] || p.name) }));

export const professions_en_v2_onet: Profession[] = professions_v2_onet.map(p => ({ ...p, name: ((
  {
    administracao: "Business Administration",
    biologia: "Biology",
    ciencia_computacao: "Computer Science",
    economia: "Economics",
    design_grafico: "Graphic Design",
    design_interiores: "Interior Design",
    direito: "Law",
    educacao_fisica: "Physical Education",
    engenharia_mecanica: "Mechanical Engineering",
    engenharia_civil: "Civil Engineering",
    engenharia_software: "Software Engineering",
    filosofia: "Philosophy",
    geografia: "Geography",
    historia: "History",
    letras: "Linguistics and Literature",
    medicina: "Medicine",
    musica: "Music",
    pedagogia: "Pedagogy",
    psicologia: "Psychology",
    rel_internacionais: "International Relations",
  } as Record<string,string>
) [p.id] || p.name) }));

// Sistema ativo - escolha entre v1 (manual) ou v2 (O*NET científico)
export const professions = professions_v2_onet;

export function getAptitudesByLang(lang: "pt" | "en" = "pt"): Aptitude[] {
  return lang === "en" ? aptitudes_en : aptitudes;
}

export function getProfessionsByLang(lang: "pt" | "en" = "pt"): Profession[] {
  return lang === "en" ? professions_en_v2_onet : professions_v2_onet;
}
