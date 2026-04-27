export type Gender = "homme" | "femme";

export interface BodyMetrics {
  poids: number;
  taille: number;
  age: number;
  genre: Gender;
}

export interface AnalysisResult {
  imc: number;
  imcLabel: string;
  imcDescription: string;
  imcColor: string;
  gaugePercent: number;
  poidsIdeal: number;
  masseGrassePct: number;
  masseGrasseKg: number;
  masseMaigreKg: number;
  bmr: number;
  tdee: number;
  corpulence: string;
  corpulenceDetail: string;
  tips: { title: string; description: string }[];
}
