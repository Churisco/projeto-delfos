import { UserAnswers, UserScores, CompatibilityResult } from "./types";
import { questions, professions, aptitudes, getQuestionsByLang, getProfessionsByLang } from "./data";

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

// Language-aware variants (pure functions)
export function calculateAptitudeScoresLocalized(userAnswers: UserAnswers, lang: "pt" | "en"): UserScores {
  const qList = getQuestionsByLang(lang);
  const sum: Record<string, number> = {};
  const wSum: Record<string, number> = {};
  aptitudes.forEach(a => { sum[a.id] = 0; wSum[a.id] = 0; });

  qList.forEach(q => {
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

export function calculateCompatibilityLocalized(scores: UserScores, lang: "pt" | "en"): CompatibilityResult[] {
  const profList = getProfessionsByLang(lang);
  const list = profList.map(p => {
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
