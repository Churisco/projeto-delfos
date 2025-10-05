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
