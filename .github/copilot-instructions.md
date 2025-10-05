# Projeto Delfos – AI Agent Working Instructions

Concise, project-specific guidance for AI coding assistants. Focus on respecting existing architecture and patterns.

## Visão Geral
Aplicação Next.js (App Router) com TypeScript e TailwindCSS para recomendar carreiras a partir de respostas a um questionário. Fluxo principal: Intro -> Questionário paginado -> Cálculo de aptidões -> Top 5 profissões. Não há backend separado: toda a lógica é client-side (por enquanto) usando dados estáticos em `lib/data.ts` e funções puras em `lib/utils.ts`.

## Estrutura Chave
- `app/` (App Router): páginas e componentes UI. `layout.tsx` injeta `ThemeProvider`, `Header`, `Footer`.
- `app/_components/`: componentes coesos de UI + controle de fluxo (`TestController`, `TestSection`, etc.). Mantêm estado local via hooks.
- `providers/ThemeProvider.tsx`: contexto de tema; modifica classes no `body` e `<html>`.
- `lib/types.ts`: contratos centrais (Aptitude, Question, Profession, etc.). Expandir primeiro aqui antes de alterar lógica.
- `lib/data.ts`: fonte de verdade de aptidões, perguntas, opções e profissões (valores normalizados 0–1). Adições exigem manter consistência de pesos e escalas.
- `lib/utils.ts`: lógica determinística de cálculo (idempotente, sem efeitos colaterais). Deve permanecer pura; qualquer efeito vai em camada de controle (ex: `TestController`).
- `tailwind.config.ts` + `app/globals.css`: definem tema, animações e utilitários aplicados via variantes de classe (`theme-light`, `theme-dark`, `theme-classic`).
- `setup.ps1`: script de bootstrap (gera arquivos). Não editar em ações incrementais sem necessidade — pode sobrescrever mudanças manuais.

## Padrões e Convenções
- Diretório `app/_components` usa `"use client"` nos componentes que manipulam estado/efeitos (React 18 + Next.js). Não adicionar lógica de cálculo pesado dentro de componentes; delegar a `lib/utils.ts`.
- Pesos e opções de resposta usam valores discretos {0, 0.3, 0.5, 0.7, 1}. Manter esse conjunto para coerência estatística. Se variar, documentar impacto.
- Funções de cálculo retornam números normalizados (0–1) arredondados para 3 casas no score de aptidão e percentuais inteiros para compatibilidade.
- Layout responsive simples (Tailwind). Seguir a abordagem existente de util classes; evitar CSS isolado a menos que seja cross‑cutting (usar `@layer` em `globals.css`).
- Temas: adicionar novo tema requer (1) classe `theme-<id>` no `ThemeProvider`, (2) estilizações em `globals.css`, (3) entrada no array `themes` em `ThemeSwitcher`.
- Estado de fluxo do teste controlado por `TestController` via union type `View`. Novas etapas devem ampliar esse union e encapsular UI dedicada.

## Fluxo de Dados
1. Usuário responde perguntas (valores salvos em `answers: UserAnswers`).
2. Ao submeter: `calculateAptitudeScores` gera mapa normalizado.
3. `calculateCompatibility` cruza scores com requisitos de profissão -> ordenação descendente -> top 5.
4. Resultados + tabela de aptidões exibidos em `ResultsView`.

## Como Estender
- Nova pergunta: adicionar objeto em `questions` mantendo `weights` com chaves válidas em `aptitudes`. Evitar introduzir aptidão inexistente sem antes registrá-la em `aptitudes` e atualizar profissões relevantes.
- Nova profissão: acrescentar em `professions` com `req` usando apenas aptidões existentes; manter escala 0–0.9 ou 1 (atual max 0.9 para diferenciar pesos fortes sem saturar).
- Ajustar algoritmo: editar apenas `lib/utils.ts`; criar função adicional se mudança for experimental e manter a original até migração completa.
- Persistência (futuro): criar módulo em `lib/persistence.ts` (localStorage ou API) e chamá-lo em `TestController`; não misturar dentro das funções puras.

## Qualidade / Boas Práticas Internas
- Manter pureza de `calculateAptitudeScores` e `calculateCompatibility` (sem acesso a DOM, storage, data mutável global).
- Preferir tipos explícitos ao inferir estruturas novas; atualizar `lib/types.ts` primeiro.
- Evitar duplicar listas: reutilizar constantes exportadas (`frequencyOptions`, etc.).
- Adições ao tema: reutilizar escalas existentes antes de introduzir novas cores.

## Scripts de Desenvolvimento
- `npm run dev`: servidor Next (hot reload).
- `npm run build`: build de produção.
- `npm start`: serve build.
- `npm run lint`: ESLint (Config Next + Typescript). Corrija antes de commitar.

## Exemplos Diretos
- Criar profissão: editar `lib/data.ts` e inserir `{ id: "biomedicina", name: "Biomedicina", req: { natureza: 0.6, curiosidade: 0.6, detalhes: 0.5, logica: 0.4 } }`.
- Nova pergunta estilo frequência: reutilizar `frequencyOptions` e aplicar pesos existentes: `{ id: "q31", text: "Você revisa seu código em busca de padrões?", options: frequencyOptions, weights: { detalhes: 0.6, problemas: 0.4 } }`.

## Antipadrões a Evitar
- Alterar `setup.ps1` para gerar código que depois é editado manualmente (risco de sobrescrever).
- Introduzir side-effects em utilitários.
- Usar valores de peso fora do conjunto estabelecido sem justificativa.
- Colocar lógica de cálculo diretamente em componentes de UI.

## Prioridades para o Agente
1. Preservar pureza e consistência de dados.
2. Reuso de tipos e constantes existentes.
3. Clareza incremental: pequenas funções novas ao invés de inflar componentes.
4. Documentar no diff quando alterar escalas ou pesos.

## Próximos Passos Possíveis (não implementar sem pedido)
- Persistência de respostas entre sessões.
- Exportação/compartilhamento de resultados.
- Internacionalização (currently pt-BR fixo).
- API backend para analytics.

Se algo estiver ambíguo, peça esclarecimento antes de mudanças amplas.
