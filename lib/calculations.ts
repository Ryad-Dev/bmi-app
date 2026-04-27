import type { BodyMetrics, AnalysisResult } from "@/types";

export function analyzeBody(metrics: BodyMetrics): AnalysisResult {
  const { poids, taille, age, genre } = metrics;
  const h = taille / 100;
  const imc = poids / (h * h);

  // IMC classification
  let imcLabel: string;
  let imcDescription: string;
  let imcColor: string;
  let gaugePercent: number;

  if (imc < 16.5) {
    imcLabel = "Maigreur sévère";
    imcDescription = "Déficit important — consultation médicale recommandée";
    imcColor = "text-emerald-500";
    gaugePercent = 4;
  } else if (imc < 18.5) {
    imcLabel = "Maigreur";
    imcDescription = "En-dessous du poids santé recommandé";
    imcColor = "text-teal-500";
    gaugePercent = 14;
  } else if (imc < 25) {
    imcLabel = "Poids normal";
    imcDescription = "Tu es dans la zone santé idéale !";
    imcColor = "text-green-500";
    gaugePercent = 38;
  } else if (imc < 30) {
    imcLabel = "Surpoids";
    imcDescription = "Légèrement au-dessus de la normale";
    imcColor = "text-amber-500";
    gaugePercent = 62;
  } else if (imc < 35) {
    imcLabel = "Obésité modérée";
    imcDescription = "Zone à risque — sport et nutrition adaptés conseillés";
    imcColor = "text-orange-500";
    gaugePercent = 78;
  } else {
    imcLabel = "Obésité sévère";
    imcDescription = "Suivi médical recommandé en priorité";
    imcColor = "text-red-500";
    gaugePercent = 93;
  }

  // Poids idéal — formule de Lorentz / Broca
  const poidsIdeal =
    genre === "homme"
      ? taille - 100 - (taille - 150) / 4
      : taille - 100 - (taille - 150) / 2.5;

  // Masse grasse — formule Deurenberg
  const masseGrassePct =
    genre === "homme"
      ? 1.2 * imc + 0.23 * age - 16.2
      : 1.2 * imc + 0.23 * age - 5.4;
  const masseGrasseKg = poids * (masseGrassePct / 100);
  const masseMaigreKg = poids - masseGrasseKg;

  // Métabolisme de base — formule Mifflin-St Jeor
  const bmr =
    genre === "homme"
      ? 10 * poids + 6.25 * taille - 5 * age + 5
      : 10 * poids + 6.25 * taille - 5 * age - 161;
  const tdee = Math.round(bmr * 1.55);

  // Corpulence
  let corpulence: string;
  let corpulenceDetail: string;

  if (genre === "homme") {
    if (imc < 18.5) { corpulence = "Mince"; corpulenceDetail = "En-dessous du poids santé"; }
    else if (imc < 22) { corpulence = "Svelte"; corpulenceDetail = "Silhouette longiligne"; }
    else if (imc < 25) { corpulence = "Normal"; corpulenceDetail = "Corpulence saine"; }
    else if (imc < 27) { corpulence = "Trapu"; corpulenceDetail = "Légèrement fort de carrure"; }
    else if (imc < 30) { corpulence = "Costaud"; corpulenceDetail = "Surpoids modéré"; }
    else { corpulence = "Fort"; corpulenceDetail = "Corpulence élevée"; }
  } else {
    if (imc < 18.5) { corpulence = "Mince"; corpulenceDetail = "En-dessous du poids santé"; }
    else if (imc < 21) { corpulence = "Svelte"; corpulenceDetail = "Silhouette fine"; }
    else if (imc < 24) { corpulence = "Normal"; corpulenceDetail = "Corpulence saine"; }
    else if (imc < 27) { corpulence = "Ronde"; corpulenceDetail = "Légèrement au-dessus"; }
    else if (imc < 30) { corpulence = "Forte"; corpulenceDetail = "Surpoids modéré"; }
    else { corpulence = "Très forte"; corpulenceDetail = "Corpulence élevée"; }
  }

  // Recommandations personnalisées
  const tips: { title: string; description: string }[] = [];
  const optMg = genre === "homme" ? 15 : 22;

  if (imc < 18.5) {
    tips.push({ title: "Calories", description: "Augmente de 300–500 kcal/jour pour une prise de masse progressive" });
    tips.push({ title: "Protéines", description: "Vise 1.8–2.2 g de protéines par kg de poids corporel" });
    tips.push({ title: "Entraînement", description: "Privilégie la force (5×5) pour stimuler la croissance musculaire" });
    tips.push({ title: "Sommeil", description: "8h minimum — la croissance musculaire se fait la nuit" });
  } else if (imc < 25) {
    tips.push({ title: "Zone idéale", description: "Tu es dans la zone parfaite pour une recomposition corporelle" });
    tips.push({ title: "Nutrition", description: "Maintiens tes calories à l'entretien ou légère hausse pour la masse" });
    tips.push({ title: "Entraînement", description: "Musculation 4×/sem + cardio 2×/sem est l'équilibre optimal" });
    tips.push({ title: "Protéines", description: "1.6–2 g/kg pour optimiser la synthèse protéique musculaire" });
  } else if (imc < 30) {
    tips.push({ title: "Déficit calorique", description: "Réduis de 300–400 kcal/jour pour perdre de la graisse progressivement" });
    tips.push({ title: "Protéines", description: "Maintiens 2 g/kg pour préserver la masse musculaire en déficit" });
    tips.push({ title: "Cardio", description: "Ajoute 2–3 sessions LISS de 30–45 min (marche rapide, vélo)" });
    tips.push({ title: "Musculation", description: "Continue la musculation pour maintenir ta masse maigre" });
  } else {
    tips.push({ title: "Priorité", description: "Commence par un déficit modéré de 500 kcal/jour, progressivement" });
    tips.push({ title: "Médecin", description: "Un bilan médical préalable est recommandé avant de démarrer" });
    tips.push({ title: "Activité", description: "Commence par la marche, la natation puis intègre la musculation" });
    tips.push({ title: "Patience", description: "Vise 0.5–1 kg de perte par semaine, la régularité prime" });
  }

  if (masseGrassePct > optMg + 5) {
    tips.push({ title: "Masse grasse", description: "Ta masse grasse est au-dessus de l'optimal — focus sur le déficit calorique" });
  }
  if (age > 40) {
    tips.push({ title: "Récupération", description: "Après 40 ans, prévois 48h de récupération entre les séances intenses" });
  }

  return {
    imc,
    imcLabel,
    imcDescription,
    imcColor,
    gaugePercent,
    poidsIdeal: Math.round(poidsIdeal),
    masseGrassePct,
    masseGrasseKg,
    masseMaigreKg,
    bmr,
    tdee,
    corpulence,
    corpulenceDetail,
    tips,
  };
}
