# setup.ps1 - Cria a estrutura do Projeto Delfos no Windows
# Execute com: powershell -ExecutionPolicy Bypass -File .\setup.ps1

Write-Host "==> Criando estrutura de pastas..."
New-Item -ItemType Directory -Force -Path app/_components | Out-Null
New-Item -ItemType Directory -Force -Path lib | Out-Null
New-Item -ItemType Directory -Force -Path providers | Out-Null
New-Item -ItemType Directory -Force -Path public | Out-Null

function Write-File($path, $content) {
    $dir = Split-Path $path
    if (!(Test-Path $dir)) { New-Item -ItemType Directory -Path $dir | Out-Null }
    $content | Out-File -FilePath $path -Encoding UTF8 -Force
    Write-Host "[OK] $path"
}

Write-Host "==> Criando arquivos..."

# package.json
Write-File package.json @'
{
  "name": "projeto-delfos",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "latest",
    "react": "^18",
    "react-dom": "^18"
  },
  "devDependencies": {
    "@types/node": "^20",
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "autoprefixer": "^10.4.17",
    "postcss": "^8.4.35",
    "tailwindcss": "^3.3.6",
    "typescript": "^5.4.0",
    "eslint": "^8.57.0",
    "eslint-config-next": "latest"
  }
}
'@

# tsconfig.json
Write-File tsconfig.json @'
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["DOM", "DOM.Iterable", "ES2022"],
    "allowJs": false,
    "skipLibCheck": true,
    "strict": true,
    "noImplicitAny": false,
    "noEmit": true,
    "module": "ESNext",
    "moduleResolution": "NodeNext",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "esModuleInterop": true,
    "jsx": "preserve",
    "incremental": true,
    "types": ["node", "react", "react-dom"]
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules"]
}
'@

# next-env.d.ts
Write-File next-env.d.ts @'
/// <reference types="next" />
/// <reference types="next/types/global" />
/// <reference types="next/image-types/global" />
'@

# postcss.config.js
Write-File postcss.config.js @'
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
'@

# tailwind.config.ts
Write-File tailwind.config.ts @'
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
    "./providers/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        classic: {
          background: "#051d3b",
            text: "#f5cf0d",
            primary: "#f5cf0d",
            secondary: "#e0e0e0",
            "card-bg": "rgba(245,207,13,0.1)",
            "card-border": "#f5cf0d",
            "button-bg": "#f5cf0d",
            "button-text": "#051d3b"
        }
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        fadeOut: {
          "0%": { opacity: "1", transform: "translateY(0)" },
          "100%": { opacity: "0", transform: "translateY(-10px)" }
        }
      },
      animation: {
        fadeIn: "fadeIn 0.5s ease-in-out",
        fadeOut: "fadeOut 0.3s ease-in-out forwards"
      }
    }
  },
  plugins: []
};

export default config;
'@

# .gitignore
Write-File .gitignore @'
node_modules
.next
dist
.DS_Store
.env.local
.env
npm-debug.log
yarn-error.log
package-lock.json
'@

# app/globals.css
Write-File app/globals.css @'
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body.theme-light { @apply bg-slate-50 text-gray-800; }
  body.theme-dark { @apply bg-black text-gray-100; }
  body.theme-classic { @apply bg-classic-background text-classic-text; }
  body { @apply transition-colors duration-300 font-sans; }
}

@layer components {
  /* Theme utility aliases (from static prototype) */
  .theme-light .text-primary { @apply text-gray-800; }
  .theme-light .text-secondary { @apply text-gray-600; }
  .theme-dark .text-primary { @apply text-gray-100; }
  .theme-dark .text-secondary { @apply text-gray-400; }
  .theme-classic .text-primary { @apply text-classic-text; }
  .theme-classic .text-secondary { @apply text-classic-secondary; }

  .theme-light .bg-card { @apply bg-white; }
  .theme-dark .bg-card { @apply bg-[#1d2024]; }
  .theme-classic .bg-card { @apply bg-classic-card-bg; }

  .theme-light .border-card { @apply border-gray-200; }
  .theme-dark .border-card { @apply border-gray-700; }
  .theme-classic .border-card { @apply border-classic-card-border; }

  .course-suggestion-card { @apply p-4 rounded-lg transition-transform duration-200; }
  .course-suggestion-card:hover { @apply -translate-y-0.5; }
  .theme-light .course-suggestion-card { @apply bg-blue-50 border border-blue-200; }
  .theme-dark .course-suggestion-card { @apply bg-slate-800 border border-blue-500; }
  .theme-classic .course-suggestion-card { @apply bg-classic-card-bg border border-classic-card-border; }

  .button { @apply py-3 px-6 rounded-lg font-semibold transition-all duration-200 ease-in-out cursor-pointer text-center disabled:cursor-not-allowed; }
  .button-primary { @apply bg-blue-500 text-white hover:bg-blue-600 disabled:bg-gray-400; }
  .dark .button-primary { @apply bg-blue-400 text-gray-900 hover:bg-blue-500 disabled:bg-gray-600 disabled:text-gray-400; }
  .theme-classic .button-primary { @apply bg-classic-button-bg text-classic-button-text hover:opacity-90 disabled:bg-opacity-50 disabled:text-opacity-70; }
  .button-secondary { @apply bg-gray-200 text-gray-800 hover:bg-gray-300 disabled:bg-gray-100 disabled:text-gray-400; }
  .dark .button-secondary { @apply bg-gray-700 text-gray-100 hover:bg-gray-600 disabled:bg-gray-800 disabled:text-gray-500; }
  .theme-classic .button-secondary { @apply bg-transparent text-classic-text border border-classic-text hover:bg-white/10 disabled:opacity-50; }
  .card { @apply p-6 rounded-lg shadow border animate-fadeIn; }
  .theme-light .card { @apply bg-white border-gray-200; }
  .theme-dark .card { @apply bg-[#1d2024] border-gray-700; }
  .theme-classic .card { @apply bg-classic-card-bg border-classic-card-border; }
  .radio-option-label { @apply block py-3 px-5 border rounded-md cursor-pointer transition-all duration-200 text-center; }
  .radio-option-input { @apply hidden; }
  .theme-light .radio-option-label { @apply border-gray-300 text-gray-700 hover:bg-blue-50 hover:border-blue-300; }
  .theme-light .radio-option-input:checked + .radio-option-label { @apply bg-blue-500 border-blue-600 text-white font-medium; }
  .theme-dark .radio-option-label { @apply border-gray-600 text-gray-300 hover:bg-gray-700 hover:border-blue-400; }
  .theme-dark .radio-option-input:checked + .radio-option-label { @apply bg-blue-400 border-blue-500 text-gray-900 font-medium; }
  .theme-classic .radio-option-label { @apply border-classic-border text-gray-200 hover:bg-white/10; }
  .theme-classic .radio-option-input:checked + .radio-option-label { @apply bg-classic-button-bg border-opacity-90 text-classic-button-text font-medium; }
}
'@

# providers/ThemeProvider.tsx
Write-File providers/ThemeProvider.tsx @'
"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Theme } from "@/lib/types";

interface ThemeContextType {
  theme: Theme;
  setTheme: (t: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("light");

  useEffect(() => {
    const stored = localStorage.getItem("delfos-theme") as Theme | null;
    const initial = stored || "light";
    applyThemeClass(initial);
    setThemeState(initial);
  }, []);

  function applyThemeClass(t: Theme) {
    document.body.classList.remove("theme-light", "theme-dark", "theme-classic");
    document.body.classList.add(`theme-${t}`);
    if (t === "dark") document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }

  function setTheme(t: Theme) {
    setThemeState(t);
    localStorage.setItem("delfos-theme", t);
    applyThemeClass(t);
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside ThemeProvider");
  return ctx;
}
'@

# lib/types.ts
Write-File lib/types.ts @'
export interface Aptitude { id: string; name: string; }
export interface Option { text: string; value: number; }
export interface Question {
  id: string;
  text: string;
  options: Option[];
  weights: { [aptitudeId: string]: number };
}
export interface Profession {
  id: string;
  name: string;
  req: { [aptitudeId: string]: number };
}
export interface UserAnswers { [questionId: string]: number; }
export interface UserScores { [aptitudeId: string]: number; }
export interface CompatibilityResult { name: string; score: number; }
export type Theme = "light" | "dark" | "classic";
'@

# lib/data.ts
Write-File lib/data.ts @'
import { Aptitude, Profession, Question, Option } from "./types";

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

export const frequencyOptions: Option[] = [
  { text: "Nunca", value: 0 },
  { text: "Raro", value: 0.3 },
  { text: "Às vezes", value: 0.5 },
  { text: "Frequente", value: 0.7 },
  { text: "Sempre", value: 1 }
];
export const agreementOptions: Option[] = [
  { text: "Discordo Total.", value: 0 },
  { text: "Discordo", value: 0.3 },
  { text: "Neutro", value: 0.5 },
  { text: "Concordo", value: 0.7 },
  { text: "Concordo Total.", value: 1 }
];
export const likingOptions: Option[] = [
  { text: "Não gosto", value: 0 },
  { text: "Pouco", value: 0.3 },
  { text: "Indiferente", value: 0.5 },
  { text: "Gosto", value: 0.7 },
  { text: "Amo", value: 1 }
];
export const intentionOptions: Option[] = [
  { text: "Nenhuma", value: 0 },
  { text: "Baixa", value: 0.3 },
  { text: "Média", value: 0.5 },
  { text: "Alta", value: 0.7 },
  { text: "Total", value: 1 }
];
export const experienceOptions: Option[] = [
  { text: "Nenhuma", value: 0 },
  { text: "Pouca", value: 0.3 },
  { text: "Alguma", value: 0.5 },
  { text: "Razoável", value: 0.7 },
  { text: "Muita", value: 1 }
];

export const questions: Question[] = [
  { id: "q1", text: "Você gosta de praticar pintura, desenho ou escultura?", options: likingOptions, weights: { artistica: 0.9, criatividade: 0.6 } },
  { id: "q2", text: "Você toca instrumento? Tem interesse em música e dança?", options: intentionOptions, weights: { musica: 0.9, criatividade: 0.5, curiosidade: 0.3 } },
  { id: "q3", text: "Com que frequência você faz atividades físicas?", options: frequencyOptions, weights: { esportes: 0.9, natureza: 0.4 } },
  { id: "q4", text: "Você gosta de fazer trilhas ou acampar?", options: likingOptions, weights: { natureza: 0.9, curiosidade: 0.4 } },
  { id: "q5", text: "Você tem a intenção de programar algo? Criar um app, site ou jogo?", options: intentionOptions, weights: { tecnologia: 0.9, curiosidade: 0.6, criatividade: 0.5 } },
  { id: "q6", text: "Tem experiência em organizar festas, viagens ou projetos?", options: experienceOptions, weights: { organizacao: 0.8, lideranca: 0.6, empreendedorismo: 0.4 } },
  { id: "q7", text: "Tem experiência em liderar projetos ou times? Foi representante de classe?", options: experienceOptions, weights: { lideranca: 0.9, comunicacao: 0.6, organizacao: 0.3 } },
  { id: "q8", text: "Você já ajudou alguém a estudar ou aprender algo novo?", options: frequencyOptions, weights: { didatica: 0.8, comunicacao: 0.6, curiosidade: 0.4 } },
  { id: "q9", text: "Tem experiência em vender algo ou criar um negócio próprio?", options: experienceOptions, weights: { empreendedorismo: 0.9, lideranca: 0.5, criatividade: 0.3 } },
  { id: "q10", text: "Você estuda por conta própria sobre temas fora da escola?", options: frequencyOptions, weights: { curiosidade: 0.9, didatica: 0.4, empreendedorismo: 0.3 } },
  { id: "q11", text: "Tenho facilidade em me expressar em público e em conversas com diferentes pessoas.", options: agreementOptions, weights: { comunicacao: 0.9, lideranca: 0.5, didatica: 0.3 } },
  { id: "q12", text: "Eu me sinto confortável em planejar atividades.", options: agreementOptions, weights: { organizacao: 0.7, lideranca: 0.4, problemas: 0.4 } },
  { id: "q13", text: "Tenho facilidade para visualizar mentalmente como as coisas funcionam ou se encaixam.", options: agreementOptions, weights: { espacial: 0.8, logica: 0.5, criatividade: 0.2 } },
  { id: "q14", text: "Sempre que algo não está funcionando, tento buscar alternativas ou novas formas de resolver.", options: agreementOptions, weights: { problemas: 0.9, criatividade: 0.6, curiosidade: 0.3 } },
  { id: "q15", text: "Adoro resolver desafios, como quebra-cabeças ou problemas lógicos.", options: likingOptions, weights: { logica: 0.8, problemas: 0.5, criatividade: 0.3 } },
  { id: "q16", text: "Quando me deparo com um problema difícil, tento resolvê-lo antes de pedir ajuda.", options: agreementOptions, weights: { problemas: 0.8, logica: 0.6, criatividade: 0.3 } },
  { id: "q17", text: "Consigo manter o foco por longos períodos em uma tarefa que exige concentração.", options: agreementOptions, weights: { detalhes: 0.8, memoria: 0.5, velocidade: 0.4 } },
  { id: "q18", text: "Sempre procuro maneiras de melhorar e otimizar os processos ao meu redor.", options: agreementOptions, weights: { empreendedorismo: 0.8, problemas: 0.6, organizacao: 0.6 } },
  { id: "q19", text: "Estou sempre interessado em aprender novas habilidades ou explorar novos conhecimentos.", options: agreementOptions, weights: { curiosidade: 0.9, didatica: 0.4, comunicacao: 0.3 } },
  { id: "q20", text: "Quando preciso escrever, sou capaz de estruturar minhas ideias de forma clara e objetiva.", options: agreementOptions, weights: { escrita: 0.8, comunicacao: 0.6, logica: 0.3 } },
  { id: "q21", text: "Gostaria de fazer parte de algo que envolvesse a natureza, como trabalhar com animais ou pesquisa ambiental.", options: likingOptions, weights: { natureza: 0.9, curiosidade: 0.5, problemas: 0.4 } },
  { id: "q22", text: "Eu me sinto motivado a aprender coisas novas quando vejo aplicações práticas para o conhecimento.", options: agreementOptions, weights: { curiosidade: 0.8, criatividade: 0.7, didatica: 0.4 } },
  { id: "q23", text: "Eu tenho facilidade em coordenar diferentes tarefas ao mesmo tempo.", options: agreementOptions, weights: { organizacao: 0.7, problemas: 0.5, detalhes: 0.6 } },
  { id: "q24", text: "Eu sempre tento buscar soluções criativas para os problemas que enfrento.", options: agreementOptions, weights: { criatividade: 0.9, problemas: 0.8, logica: 0.3 } },
  { id: "q25", text: "Quando estou praticando um esporte, me concentro bastante nos detalhes do movimento e na precisão.", options: agreementOptions, weights: { esportes: 0.9, coord_fina: 0.7, detalhes: 0.6 } },
  { id: "q26", text: "Eu gosto de conversar sobre diferentes temas e trocar ideias com outras pessoas.", options: likingOptions, weights: { comunicacao: 0.9, curiosidade: 0.5, lideranca: 0.5 } },
  { id: "q27", text: "Tenho facilidade em montar ou desmontar dispositivos eletrônicos ou mecânicos.", options: agreementOptions, weights: { tecnologia: 0.9, espacial: 0.7, criatividade: 0.5 } },
  { id: "q28", text: "Eu sou muito atento a detalhes e consigo identificar pequenas diferenças facilmente.", options: agreementOptions, weights: { detalhes: 0.9, memoria: 0.5, espacial: 0.4 } },
  { id: "q29", text: "Eu sou capaz de criar soluções práticas e rápidas quando estou em uma situação inesperada.", options: agreementOptions, weights: { criatividade: 0.8, problemas: 0.9, logica: 0.5 } },
  { id: "q30", text: "Minhas coisas são organizadas e gosto de planejar as coisas.", options: agreementOptions, weights: { organizacao: 0.7, problemas: 0.6, lideranca: 0.5 } }
];

export const professions: Profession[] = [
  { id: "administracao", name: "Administração", req: { organizacao: 0.8, lideranca: 0.6, comunicacao: 0.6, problemas: 0.5, empreendedorismo: 0.5, escrita: 0.4 } },
  { id: "administracao_publica", name: "Administração Pública", req: { organizacao: 0.8, comunicacao: 0.6, interpretacao: 0.6, lideranca: 0.5, problemas: 0.5, escrita: 0.5 } },
  { id: "agronomia", name: "Agronomia", req: { natureza: 0.9, problemas: 0.6, logica: 0.5, curiosidade: 0.6, detalhes: 0.5, organizacao: 0.4 } },
  { id: "ads", name: "Análise e Desenvolvimento de Sistemas", req: { logica: 0.9, tecnologia: 0.9, problemas: 0.8, curiosidade: 0.6, detalhes: 0.6, escrita: 0.4 } },
  { id: "arquitetura", name: "Arquitetura e Urbanismo", req: { espacial: 0.8, criatividade: 0.7, artistica: 0.6, detalhes: 0.6, tecnologia: 0.5, problemas: 0.5 } },
  { id: "artes_visuais", name: "Artes Visuais", req: { artistica: 0.9, criatividade: 0.8, detalhes: 0.5, coord_fina: 0.5, curiosidade: 0.5 } },
  { id: "biologia", name: "Biologia", req: { natureza: 0.9, curiosidade: 0.8, interpretacao: 0.6, detalhes: 0.6, logica: 0.5, escrita: 0.5 } },
  { id: "ciencia_computacao", name: "Ciência da Computação", req: { logica: 0.9, matematica: 0.7, tecnologia: 0.9, problemas: 0.8, curiosidade: 0.7, detalhes: 0.6 } },
  { id: "ciencia_tecnologia", name: "Ciência e Tecnologia", req: { logica: 0.8, curiosidade: 0.8, tecnologia: 0.8, matematica: 0.7, problemas: 0.7 } },
  { id: "ciencia_politica", name: "Ciência Política", req: { interpretacao: 0.8, comunicacao: 0.7, curiosidade: 0.7, escrita: 0.7, lideranca: 0.5 } },
  { id: "contabeis", name: "Ciências Contábeis", req: { detalhes: 0.8, matematica: 0.7, organizacao: 0.7, logica: 0.6, escrita: 0.4 } },
  { id: "cinesiologia", name: "Cinesiologia", req: { esportes: 0.9, curiosidade: 0.6, problemas: 0.5, comunicacao: 0.5, natureza: 0.4 } },
  { id: "comunicacao_social", name: "Comunicação Social", req: { comunicacao: 0.9, escrita: 0.7, criatividade: 0.6, interpretacao: 0.6, curiosidade: 0.6 } },
  { id: "design_moda", name: "Design de Moda", req: { criatividade: 0.9, artistica: 0.7, detalhes: 0.6, tecnologia: 0.4, curiosidade: 0.5 } },
  { id: "design_grafico", name: "Design Gráfico", req: { criatividade: 0.9, artistica: 0.8, espacial: 0.6, tecnologia: 0.5, detalhes: 0.6 } },
  { id: "direito", name: "Direito", req: { interpretacao: 0.9, escrita: 0.8, comunicacao: 0.8, logica: 0.6, memoria: 0.6, detalhes: 0.5 } },
  { id: "educacao_tecnologia", name: "Educação e Tecnologia", req: { didatica: 0.8, tecnologia: 0.7, curiosidade: 0.7, comunicacao: 0.7, escrita: 0.5 } },
  { id: "educacao_fisica", name: "Educação Física", req: { esportes: 0.9, comunicacao: 0.6, didatica: 0.6, lideranca: 0.5, natureza: 0.4 } },
  { id: "enfermagem", name: "Enfermagem", req: { detalhes: 0.8, comunicacao: 0.7, memoria: 0.6, problemas: 0.6, coord_fina: 0.5, organizacao: 0.6 } },
  { id: "engenharia_ambiental", name: "Engenharia Ambiental", req: { natureza: 0.8, problemas: 0.7, logica: 0.7, matematica: 0.7, curiosidade: 0.6 } },
  { id: "engenharia_civil", name: "Engenharia Civil", req: { matematica: 0.9, logica: 0.8, espacial: 0.7, problemas: 0.8, detalhes: 0.6, organizacao: 0.6 } },
  { id: "engenharia_software", name: "Engenharia de Software", req: { logica: 0.9, tecnologia: 0.9, problemas: 0.8, curiosidade: 0.7, detalhes: 0.6, organizacao: 0.5 } },
  { id: "engenharia_eletrica", name: "Engenharia Elétrica", req: { matematica: 0.9, logica: 0.9, problemas: 0.8, tecnologia: 0.8, detalhes: 0.6 } },
  { id: "engenharia_mecanica", name: "Engenharia Mecânica", req: { matematica: 0.8, logica: 0.8, espacial: 0.7, problemas: 0.8, detalhes: 0.6, criatividade: 0.5 } },
  { id: "farmacia", name: "Farmácia", req: { detalhes: 0.9, memoria: 0.7, logica: 0.6, curiosidade: 0.6, organizacao: 0.5 } },
  { id: "filosofia", name: "Filosofia", req: { interpretacao: 0.9, curiosidade: 0.8, escrita: 0.7, logica: 0.6, comunicacao: 0.5 } },
  { id: "fisioterapia", name: "Fisioterapia", req: { coord_fina: 0.7, esportes: 0.6, comunicacao: 0.6, problemas: 0.5, detalhes: 0.5 } },
  { id: "geografia", name: "Geografia", req: { espacial: 0.7, natureza: 0.7, curiosidade: 0.7, interpretacao: 0.6, detalhes: 0.5 } },
  { id: "geologia", name: "Geologia", req: { natureza: 0.8, curiosidade: 0.7, detalhes: 0.7, logica: 0.6, espacial: 0.6 } },
  { id: "gestao_ambiental", name: "Gestão Ambiental", req: { natureza: 0.9, organizacao: 0.6, problemas: 0.6, curiosidade: 0.6, comunicacao: 0.5 } },
  { id: "gestao_projetos", name: "Gestão de Projetos", req: { organizacao: 0.9, lideranca: 0.8, comunicacao: 0.7, problemas: 0.6, detalhes: 0.5 } },
  { id: "gestao_rh", name: "Gestão de Recursos Humanos", req: { comunicacao: 0.8, lideranca: 0.7, organizacao: 0.6, interpretacao: 0.5, curiosidade: 0.5 } },
  { id: "gestao_ti", name: "Gestão de TI", req: { tecnologia: 0.8, organizacao: 0.7, lideranca: 0.6, problemas: 0.6, comunicacao: 0.6 } },
  { id: "historia", name: "História", req: { interpretacao: 0.9, escrita: 0.8, curiosidade: 0.8, memoria: 0.6, comunicacao: 0.5 } },
  { id: "letras", name: "Letras", req: { escrita: 0.9, interpretacao: 0.9, comunicacao: 0.7, curiosidade: 0.5, didatica: 0.5 } },
  { id: "medicina", name: "Medicina", req: { detalhes: 0.9, memoria: 0.8, problemas: 0.8, logica: 0.7, comunicacao: 0.7, coord_fina: 0.6 } },
  { id: "musica", name: "Música", req: { musica: 0.9, artistica: 0.6, criatividade: 0.6, detalhes: 0.4, comunicacao: 0.4 } },
  { id: "nutricao", name: "Nutrição", req: { natureza: 0.5, curiosidade: 0.6, detalhes: 0.6, comunicacao: 0.6, organizacao: 0.5 } },
  { id: "odontologia", name: "Odontologia", req: { coord_fina: 0.8, detalhes: 0.8, comunicacao: 0.6, memoria: 0.6, problemas: 0.5 } },
  { id: "pedagogia", name: "Pedagogia", req: { didatica: 0.9, comunicacao: 0.8, criatividade: 0.5, organizacao: 0.6, interpretacao: 0.5 } },
  { id: "psicologia", name: "Psicologia", req: { interpretacao: 0.8, comunicacao: 0.8, curiosidade: 0.7, problemas: 0.6, escrita: 0.5 } },
  { id: "publicidade", name: "Publicidade e Propaganda", req: { criatividade: 0.9, comunicacao: 0.8, escrita: 0.6, curiosidade: 0.6, interpretacao: 0.5 } },
  { id: "rel_internacionais", name: "Relações Internacionais", req: { comunicacao: 0.9, interpretacao: 0.8, escrita: 0.7, curiosidade: 0.7, lideranca: 0.5 } },
  { id: "rel_publicas", name: "Relações Públicas", req: { comunicacao: 0.9, organizacao: 0.6, criatividade: 0.5, escrita: 0.5, curiosidade: 0.5 } },
  { id: "secretariado", name: "Secretariado Executivo", req: { organizacao: 0.9, comunicacao: 0.7, detalhes: 0.6, escrita: 0.5, problemas: 0.4 } },
  { id: "sistemas_info", name: "Sistemas de Informação", req: { tecnologia: 0.9, logica: 0.8, problemas: 0.7, curiosidade: 0.6, organizacao: 0.5 } },
  { id: "terapia_ocupacional", name: "Terapia Ocupacional", req: { coord_fina: 0.7, comunicacao: 0.6, didatica: 0.6, curiosidade: 0.5, problemas: 0.5 } },
  { id: "turismo", name: "Turismo", req: { comunicacao: 0.8, curiosidade: 0.6, organizacao: 0.6, natureza: 0.5 } },
  { id: "veterinaria", name: "Veterinária", req: { natureza: 0.9, detalhes: 0.7, curiosidade: 0.7, comunicacao: 0.5, problemas: 0.5 } },
  { id: "zootecnia", name: "Zootecnia", req: { natureza: 0.9, curiosidade: 0.7, organizacao: 0.5, problemas: 0.5, detalhes: 0.5 } }
];
'@

# lib/utils.ts
Write-File lib/utils.ts @'
import { UserAnswers, UserScores, CompatibilityResult } from "./types";
import { questions, professions, aptitudes } from "./data";

export function calculateAptitudeScores(userAnswers: UserAnswers): UserScores {
  const sum: Record<string, number> = {};
  const wSum: Record<string, number> = {};
  aptitudes.forEach(a => { sum[a.id] = 0; wSum[a.id] = 0; });

  questions.forEach(q => {
    const v = userAnswers[q.id];
    if (v === undefined) return;
    Object.entries(q.weights).forEach(([apt, w]) => {
      if (sum[apt] !== undefined) {
        sum[apt] += v * w;
        wSum[apt] += w;
      }
    });
  });

  const finalScores: UserScores = {};
  aptitudes.forEach(a => {
    finalScores[a.id] = wSum[a.id] > 0
      ? parseFloat((sum[a.id] / wSum[a.id]).toFixed(3))
      : 0;
  });
  return finalScores;
}

export function calculateCompatibility(scores: UserScores): CompatibilityResult[] {
  const list = professions.map(p => {
    let total = 0;
    let weight = 0;
    Object.entries(p.req).forEach(([apt, reqVal]) => {
      total += (scores[apt] ?? 0) * reqVal;
      weight += reqVal;
    });
    const compat = weight > 0 ? total / weight : 0;
    return { name: p.name, score: Math.round(compat * 100) };
  });
  return list.sort((a,b) => b.score - a.score).slice(0,5);
}
'@

# app/layout.tsx
Write-File app/layout.tsx @'
import "./globals.css";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import { ThemeProvider } from "@/providers/ThemeProvider";
import Header from "./_components/Header";
import Footer from "./_components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Projeto Delfos",
  description: "Descubra sua carreira ideal através do autoconhecimento e aptidões."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <div className="container mx-auto max-w-5xl p-4 md:p-8">
            <Header />
            <main id="main-content" className="min-h-[70vh]">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
'@

# app/page.tsx
Write-File app/page.tsx @'
import TestController from "./_components/TestController";
export default function HomePage() { return <TestController />; }
'@

# app/_components/Header.tsx
Write-File app/_components/Header.tsx @'
"use client";
import ThemeSwitcher from "./ThemeSwitcher";

export default function Header() {
  return (
    <header className="flex flex-col sm:flex-row justify-between items-center mb-8">
      <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4 sm:mb-0">
        <span className="text-yellow-500">Π</span>rojeto Delfos
      </h1>
      <ThemeSwitcher />
    </header>
  );
}
'@

# app/_components/Footer.tsx
Write-File app/_components/Footer.tsx @'
export default function Footer() {
  return (
    <footer className="text-center mt-12 py-4 border-t border-gray-200 dark:border-gray-700 theme-classic:border-classic-text/40">
      <p className="text-sm text-gray-500 dark:text-gray-400 theme-classic:text-classic-secondary">
        &copy; {new Date().getFullYear()} Projeto Delfos. Inspirado no Oráculo, guiado pela tecnologia.
      </p>
    </footer>
  );
}
'@

# app/_components/ThemeSwitcher.tsx
Write-File app/_components/ThemeSwitcher.tsx @'
"use client";
import { useTheme } from "@/providers/ThemeProvider";
import { Theme } from "@/lib/types";

const themes: { id: Theme; icon: string; label: string }[] = [
  { id: "light", icon: "☀️", label: "Claro" },
  { id: "dark", icon: "🌙", label: "Escuro" },
  { id: "classic", icon: "🏛️", label: "Clássico" }
];

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  return (
    <div className="flex space-x-2">
      {themes.map(t => (
        <button
          key={t.id}
          className={`py-2 px-4 rounded-lg border transition-colors ${
            theme === t.id
              ? "bg-blue-500 text-white dark:bg-blue-400 dark:text-black theme-classic:bg-classic-card-bg"
              : "bg-transparent text-secondary"
          } theme-light:border-gray-300 theme-dark:border-gray-600 theme-classic:border-classic-text`}
          onClick={() => setTheme(t.id)}
          title={`Tema ${t.label}`}
        >
          {t.icon}
        </button>
      ))}
    </div>
  );
}
'@

# app/_components/IntroSection.tsx
Write-File app/_components/IntroSection.tsx @'
export default function IntroSection({ onStart }: { onStart: () => void }) {
  return (
    <>
      <section className="card mb-8 bg-card border-card">
        <h2 className="text-2xl font-semibold mb-4 text-primary">A Lenda de Delfos</h2>
        <p className="text-secondary leading-relaxed">
          Segundo a mitologia grega, Apolo matou a dragoa Python, guardiã do santuário de Gaia, que tentara impedir seu nascimento. Dos vapores sob Delfos surgiam visões às sacerdotisas.
        </p>
        <p className="text-secondary leading-relaxed mt-4">
          Assim como o Oráculo orientava os antigos, usamos dados e lógica para ajudar você a explorar caminhos profissionais alinhados às suas aptidões e interesses.
        </p>
      </section>
      <section className="card bg-card border-card">
        <h2 className="text-2xl font-semibold mb-4 text-primary">Descubra sua Carreira Ideal</h2>
        <p className="text-secondary mb-6">
          Responda ao questionário para avaliarmos aptidões cognitivas, traços práticos e interesses. Ao final você verá as 5 profissões com maior compatibilidade relativa.
        </p>
        <button onClick={onStart} className="button button-primary w-full sm:w-auto">
          Iniciar Questionário
        </button>
      </section>
    </>
  );
}
'@

# app/_components/TestSection.tsx
Write-File app/_components/TestSection.tsx @'
"use client";
import { questions } from "@/lib/data";
import { UserAnswers } from "@/lib/types";
import { useMemo, useState } from "react";

interface TestSectionProps {
  answers: UserAnswers;
  setAnswers: (a: UserAnswers) => void;
  onSubmit: () => void;
  onBackToIntro: () => void;
}

const PER_PAGE = 5;

export default function TestSection({ answers, setAnswers, onSubmit, onBackToIntro }: TestSectionProps) {
  const [page, setPage] = useState(0);
  const totalPages = Math.ceil(questions.length / PER_PAGE);
  const start = page * PER_PAGE;
  const currentQuestions = useMemo(() => questions.slice(start, start + PER_PAGE), [page]);

  function setAnswer(qId: string, value: number) {
    setAnswers({ ...answers, [qId]: value });
  }

  const allAnsweredPage = currentQuestions.every(q => answers[q.id] !== undefined);
  const allAnsweredGlobal = questions.every(q => answers[q.id] !== undefined);
  const progressPercent = ((page + 1) / totalPages) * 100;

  return (
    <section className="card">
      <h2 className="text-2xl font-semibold mb-4 text-primary">Questionário de Aptidões</h2>
      <div className="my-6">
        <div className="w-full bg-gray-200 dark:bg-gray-700 theme-classic:bg-white/20 rounded-full h-2.5">
          <div
            className="bg-blue-500 dark:bg-blue-400 theme-classic:bg-classic-button-bg h-2.5 rounded-full transition-all"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      <div className="space-y-6">
        {currentQuestions.map((q, idx) => (
          <div key={q.id} className="animate-fadeIn" style={{ animationDelay: `${idx * 0.05}s` }}>
            <p className="text-primary font-medium mb-3">
              {start + idx + 1}. {q.text}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
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
                    <label htmlFor={id} className="radio-option-label">
                      {opt.text}
                    </label>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center mt-10 pt-4 border-t border-gray-200 dark:border-gray-700 theme-classic:border-classic-text/40 gap-4">
        <div className="flex gap-2 w-full sm:w-auto">
          <button
            onClick={() => (page === 0 ? onBackToIntro() : setPage(p => p - 1))}
            className="button button-secondary w-full sm:w-auto"
          >
            {page === 0 ? "Sair" : "Anterior"}
          </button>
          {page < totalPages - 1 && (
            <button
              onClick={() => allAnsweredPage && setPage(p => p + 1)}
              disabled={!allAnsweredPage}
              className="button button-primary w-full sm:w-auto"
            >
              Próxima
            </button>
          )}
        </div>
        <span className="text-secondary text-sm">
          Página {page + 1} de {totalPages}
        </span>
        {page === totalPages - 1 && (
          <button
            onClick={() => allAnsweredGlobal && onSubmit()}
            disabled={!allAnsweredGlobal}
            className="button button-primary w-full sm:w-auto"
          >
            Calcular Resultados
          </button>
        )}
      </div>

      {!allAnsweredPage && (
        <p className="mt-4 text-sm text-red-600 text-center">
          Responda todas as perguntas desta página para avançar.
        </p>
      )}
    </section>
  );
}
'@

# app/_components/ResultsView.tsx
Write-File app/_components/ResultsView.tsx @'
"use client";
import { useState } from "react";
import { CompatibilityResult, UserScores, UserAnswers } from "@/lib/types";
import { aptitudes, questions } from "@/lib/data";
import { calculateAptitudeScores } from "@/lib/utils";

interface ResultsViewProps {
  results: CompatibilityResult[];
  userAnswers: UserAnswers;
  onRestart: () => void;
}

export default function ResultsView({ results, userAnswers, onRestart }: ResultsViewProps) {
  const [showApt, setShowApt] = useState(false);
  const scores: UserScores = calculateAptitudeScores(userAnswers);

  return (
    <section className="card">
      <h2 className="text-2xl font-semibold mb-6 text-primary text-center">Seu Resultado Delfos</h2>
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4 text-primary">Top 5 Profissões Compatíveis</h3>
        <div className="space-y-4">
          {results.length > 0 ? results.map((r, i) => (
            <div
              key={r.name}
              className="p-4 border rounded-lg flex justify-between items-center shadow-sm theme-light:bg-blue-50 theme-light:border-blue-200 dark:bg-slate-800 dark:border-blue-500 theme-classic:bg-classic-card-bg theme-classic:border-classic-card-border animate-fadeIn"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <span className="text-lg font-semibold text-primary">{r.name}</span>
              <span className="text-2xl font-bold text-primary">{r.score}%</span>
            </div>
          )) : (
            <p className="text-secondary">Nenhuma recomendação gerada.</p>
          )}
        </div>
      </div>

      <div className="mb-6 text-center">
        <button
          onClick={() => setShowApt(s => !s)}
          className="button button-secondary w-full sm:w-auto"
        >
          {showApt ? "Ocultar Aptidões" : "Minhas Aptidões"}
        </button>
      </div>

      {showApt && (
        <div className="animate-fadeIn overflow-x-auto">
          <table className="w-full border-collapse rounded-lg overflow-hidden text-sm">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-800 theme-classic:bg-white/10">
                <th className="p-3 text-left text-primary font-semibold">Aptidão</th>
                <th className="p-3 text-right text-primary font-semibold">Score (0-1)</th>
              </tr>
            </thead>
            <tbody>
              {aptitudes
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
            Baseado em {questions.length} perguntas respondidas.
          </p>
        </div>
      )}

      <div className="mt-10 text-center">
        <button onClick={onRestart} className="button button-primary w-full sm:w-auto">
          Refazer Questionário
        </button>
      </div>
    </section>
  );
}
'@

# app/_components/TestController.tsx
Write-File app/_components/TestController.tsx @'
"use client";
import { useState } from "react";
import IntroSection from "./IntroSection";
import TestSection from "./TestSection";
import ResultsView from "./ResultsView";
import { UserAnswers, CompatibilityResult } from "@/lib/types";
import { calculateAptitudeScores, calculateCompatibility } from "@/lib/utils";

type View = "intro" | "test" | "results";

export default function TestController() {
  const [view, setView] = useState<View>("intro");
  const [answers, setAnswers] = useState<UserAnswers>({});
  const [results, setResults] = useState<CompatibilityResult[]>([]);

  function handleStart() {
    setAnswers({});
    setResults([]);
    setView("test");
  }

  function handleSubmit() {
    const scores = calculateAptitudeScores(answers);
    const compat = calculateCompatibility(scores);
    setResults(compat);
    setView("results");
  }

  function handleRestart() {
    setAnswers({});
    setResults([]);
    setView("intro");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <>
      {view === "intro" && <IntroSection onStart={handleStart} />}
      {view === "test" && (
        <TestSection
          answers={answers}
          setAnswers={setAnswers}
          onSubmit={handleSubmit}
          onBackToIntro={() => setView("intro")}
        />
      )}
      {view === "results" && (
        <ResultsView
          results={results}
          userAnswers={answers}
          onRestart={handleRestart}
        />
      )}
    </>
  );
}
'@

# README
Write-File README.md @'
# Projeto Delfos

Aplicação Next.js + TypeScript + Tailwind para recomendação de carreiras baseada em aptidões e interesses.

## Rodando

```bash
npm install
npm run dev
```
'@