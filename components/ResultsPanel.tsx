"use client";

import { ImcGauge } from "@/components/ImcGauge";
import { BodySilhouette } from "@/components/BodySilhouette";
import type { AnalysisResult, Gender } from "@/types";

interface ResultsPanelProps {
  result: AnalysisResult;
  genre: Gender;
}

const card: React.CSSProperties = {
  background: "#fff",
  borderRadius: 20,
  boxShadow: "0 8px 40px rgba(0,0,0,0.13), 0 2px 8px rgba(0,0,0,0.08), 0 0 0 0.5px rgba(0,0,0,0.06)",
  marginBottom: 16,
  overflow: "hidden",
};

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ fontSize: 11, fontWeight: 600, color: "#8e8e93", textTransform: "uppercase", letterSpacing: "0.07em", margin: "0 0 16px" }}>
      {children}
    </p>
  );
}

function StatRow({ label, value, sub, color }: { label: string; value: string; sub?: string; color?: string }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "11px 0", borderBottom: "0.5px solid #f2f2f7" }}>
      <span style={{ fontSize: 14, color: "#6e6e73" }}>{label}</span>
      <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
        <span style={{ fontSize: 15, fontWeight: 700, color: color ?? "#1c1c1e" }}>{value}</span>
        {sub && <span style={{ fontSize: 12, color: "#aeaeb2" }}>{sub}</span>}
      </div>
    </div>
  );
}

function TipRow({ icon, title, desc, color }: { icon: string; title: string; desc: string; color: string }) {
  return (
    <div style={{ display: "flex", gap: 14, padding: "14px 0", borderBottom: "0.5px solid #f2f2f7" }}>
      <div style={{
        width: 38, height: 38, borderRadius: 10, flexShrink: 0,
        background: color + "18",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 18,
      }}>{icon}</div>
      <div>
        <p style={{ fontSize: 14, fontWeight: 700, color: "#1c1c1e", margin: "0 0 3px" }}>{title}</p>
        <p style={{ fontSize: 13, color: "#6e6e73", lineHeight: 1.55, margin: 0 }}>{desc}</p>
      </div>
    </div>
  );
}

function getImcColor(imc: number): string {
  if (imc < 18.5) return "#30D158";
  if (imc < 25) return "#007AFF";
  if (imc < 30) return "#FF9F0A";
  return "#FF3B30";
}

function getGymTips(imc: number, genre: Gender) {
  const color = getImcColor(imc);
  const base = imc < 18.5 ? [
    { icon: "🏋️", title: "Force avant tout", desc: "Priorité aux mouvements polyarticulaires : squat, soulevé de terre, développé couché. 3×8 avec charges progressives.", color },
    { icon: "📅", title: "Fréquence optimale", desc: "3 séances par semaine avec 48h de récupération entre chaque. Évite le surentraînement.", color },
    { icon: "🍗", title: "Nutrition pré-séance", desc: "Mange 1h avant (glucides + protéines). Shake protéiné dans les 30 min après l'effort.", color },
    { icon: "😴", title: "Récupération", desc: "8h de sommeil minimum — la croissance musculaire se fait la nuit grâce à la GH.", color },
  ] : imc < 25 ? [
    { icon: "🏋️", title: "Recomposition corporelle", desc: "Alterne force (5×5) et hypertrophie (4×10–12). Zone idéale pour gagner du muscle et perdre du gras.", color },
    { icon: "🔄", title: "Split recommandé", desc: genre === "homme" ? "Push/Pull/Legs 4×/sem. Chaque groupe musculaire 2× par semaine." : "Full body 3×/sem + 1 cardio. Insiste sur fessiers, ischio, épaules.", color },
    { icon: "⚡", title: "Cardio stratégique", desc: "2 sessions HIIT de 20 min par semaine suffisent. Concentre-toi sur la musculation.", color },
    { icon: "📈", title: "Surcharge progressive", desc: "Augmente le poids de 2.5 kg dès que tu complètes toutes tes séries.", color },
  ] : imc < 30 ? [
    { icon: "🔥", title: "Brûle les graisses", desc: "Musculation 3×/sem + cardio 3×/sem. La musculation booste ton métabolisme au repos.", color },
    { icon: "🏃", title: "Cardio recommandé", desc: "LISS 30–45 min à 60–70% FCmax. Marche rapide, vélo, natation — idéal pour perdre du gras.", color },
    { icon: "💪", title: "Préserve le muscle", desc: "Ne coupe pas trop les calories. Fais du circuit training pour maximiser la dépense calorique.", color },
    { icon: "🎯", title: "Objectif réaliste", desc: "Vise 0.5–1 kg de perte par semaine. Trop vite = perte musculaire. La régularité prime.", color },
  ] : [
    { icon: "🚶", title: "Commence doucement", desc: "30 min de marche par jour d'abord. Natation ou vélo : sports portés qui ménagent les articulations.", color },
    { icon: "🏋️", title: "Machines guidées", desc: "Préfère les machines aux poids libres pour débuter. Apprends les bons gestes en sécurité.", color },
    { icon: "⏱️", title: "Progression douce", desc: "Augmente l'intensité toutes les 2–3 semaines. Bilan médical conseillé avant un programme intensif.", color },
    { icon: "🧘", title: "Récupération active", desc: "Stretching après chaque séance. Réduit les courbatures et améliore la mobilité articulaire.", color },
  ];

  base.push(genre === "femme"
    ? { icon: "🍑", title: "Exercices fessiers", desc: "Hip thrust, romanian deadlift, split squat bulgare. 3–4× par semaine pour des résultats visibles.", color: "#FF2D55" }
    : { icon: "💪", title: "N'oublie pas le dos", desc: "Tractions, rowing, tirage nuque. Un dos fort protège tes épaules et améliore ta posture.", color: "#5856D6" }
  );

  return base;
}

export function ResultsPanel({ result, genre }: ResultsPanelProps) {
  const {
    imc, imcLabel, imcDescription, gaugePercent,
    poidsIdeal, masseGrassePct, masseGrasseKg, masseMaigreKg,
    bmr, tdee, corpulence, tips,
  } = result;

  const accentColor = getImcColor(imc);
  const gymTips = getGymTips(imc, genre);

  return (
    <div>

      {/* ── HERO CARD ── */}
      <div style={card}>
        {/* IMC */}
        <div style={{ padding: "22px 20px 18px", borderBottom: "0.5px solid #f2f2f7" }}>
          <SectionTitle>Indice de masse corporelle</SectionTitle>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
            <div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
                <span style={{ fontSize: 56, fontWeight: 800, letterSpacing: "-2px", color: accentColor, lineHeight: 1 }}>
                  {imc.toFixed(1)}
                </span>
                <span style={{ fontSize: 14, color: "#aeaeb2", fontWeight: 500 }}>kg/m²</span>
              </div>
              <p style={{ fontSize: 18, fontWeight: 700, color: "#1c1c1e", margin: "4px 0 2px" }}>{imcLabel}</p>
              <p style={{ fontSize: 13, color: "#6e6e73", margin: 0 }}>{imcDescription}</p>
            </div>
            {/* Status badge */}
            <div style={{
              width: 54, height: 54, borderRadius: 14, flexShrink: 0,
              background: accentColor + "15",
              border: `1.5px solid ${accentColor}40`,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <span style={{
                fontSize: 24,
                fontWeight: 800,
                color: accentColor,
                lineHeight: 1,
                fontFamily: "system-ui, -apple-system, sans-serif",
              }}>
                {imc < 18.5 ? "↑" : imc < 25 ? "✓" : imc < 30 ? "↗" : "!"}
              </span>
            </div>
          </div>
          <ImcGauge percent={gaugePercent} />
        </div>

        {/* Silhouette + Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
          <div style={{ padding: "20px 16px 20px", borderRight: "0.5px solid #f2f2f7", background: "#fafafa", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <p style={{ fontSize: 11, fontWeight: 600, color: "#8e8e93", textTransform: "uppercase", letterSpacing: "0.07em", margin: "0 0 12px", alignSelf: "flex-start" }}>
              Corpulence · {corpulence}
            </p>
            <BodySilhouette imc={imc} genre={genre} />
          </div>

          <div style={{ padding: "20px 16px" }}>
            <SectionTitle>Métriques</SectionTitle>
            <StatRow label="Poids idéal" value={`${poidsIdeal} kg`} sub="Broca" />
            <StatRow label="Masse grasse" value={`${masseGrasseKg.toFixed(1)} kg`} sub={`${masseGrassePct.toFixed(0)}%`} color="#FF9F0A" />
            <StatRow label="Masse maigre" value={`${masseMaigreKg.toFixed(1)} kg`} color="#5856D6" />
            <StatRow label="Bésoin énergetique" value={`${Math.round(bmr)}`} sub="kcal/j" />
            <StatRow label="Protéines" value={`${Math.round(poidsIdeal * 2)} g`} sub="/j" />
          </div>
        </div>
      </div>

      {/* ── NUTRITION ── */}


      {/* ── GYM ── */}
      <div style={card}>
        <div style={{ padding: "22px 20px" }}>
          <SectionTitle>Conseils personnalisés</SectionTitle>
          {gymTips.map((tip, i) => (
            <div key={i} style={{ borderBottom: i < gymTips.length - 1 ? "0.5px solid #f2f2f7" : "none" }}>
              <TipRow {...tip} />
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
