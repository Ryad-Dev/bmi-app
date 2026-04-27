"use client";

import { ImcGauge } from "@/components/ImcGauge";
import { BodySilhouette } from "@/components/BodySilhouette";
import { cn } from "@/lib/utils";
import type { AnalysisResult, Gender } from "@/types";

interface ResultsPanelProps {
  result: AnalysisResult;
  genre: Gender;
}

function StatRow({ label, value, sub, accent }: { label: string; value: string; sub?: string; accent?: string }) {
  return (
    <div className="flex items-center justify-between py-3 border-b last:border-0" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
      <span className="text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>{label}</span>
      <div className="flex items-baseline gap-1.5">
        <span className="text-sm font-bold" style={{ color: accent ?? "white" }}>{value}</span>
        {sub && <span className="text-[11px]" style={{ color: "rgba(255,255,255,0.3)" }}>{sub}</span>}
      </div>
    </div>
  );
}

function TipCard({ icon, title, desc, color }: { icon: string; title: string; desc: string; color: string }) {
  return (
    <div
      className="flex items-start gap-3 p-4 rounded-2xl"
      style={{ background: color + "14", border: `1px solid ${color}30` }}
    >
      <span className="text-xl shrink-0 mt-0.5">{icon}</span>
      <div className="flex flex-col gap-0.5">
        <span className="text-sm font-bold text-white">{title}</span>
        <span className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>{desc}</span>
      </div>
    </div>
  );
}

function getImcAccent(imc: number): string {
  if (imc < 18.5) return "#5DCAA5";
  if (imc < 25)   return "#818cf8";
  if (imc < 30)   return "#f59e0b";
  return "#ef4444";
}

function getGymTips(imc: number, genre: Gender): { icon: string; title: string; desc: string; color: string }[] {
  const base = [];

  if (imc < 18.5) {
    base.push(
      { icon: "🏋️", title: "Force avant tout", desc: "Priorité aux mouvements polyarticulaires : squat, soulevé de terre, développé couché. 3×8 avec charges progressives.", color: "#5DCAA5" },
      { icon: "📅", title: "Fréquence optimale", desc: "3 séances par semaine avec 48h de récupération entre chaque. Évite le surentraînement qui freinerait ta prise de masse.", color: "#5DCAA5" },
      { icon: "🍗", title: "Nutrition gym", desc: "Mange 1h avant chaque séance (glucides + protéines). Shake protéiné dans les 30 min après l'effort.", color: "#5DCAA5" },
      { icon: "😴", title: "Récupération", desc: "La croissance musculaire se fait au repos. Vise 8h de sommeil — c'est là que la GH est sécrétée.", color: "#5DCAA5" },
    );
  } else if (imc < 25) {
    base.push(
      { icon: "🏋️", title: "Recomposition corporelle", desc: "Alterne phases de force (5×5) et hypertrophie (4×10–12). C'est la zone idéale pour gagner du muscle et perdre du gras.", color: "#818cf8" },
      { icon: "🔄", title: "Split recommandé", desc: genre === "homme" ? "Push/Pull/Legs 4×/sem ou Upper/Lower. Chaque groupe musculaire 2× par semaine pour l'hypertrophie maximale." : "Full body 3×/sem + 1 séance cardio. Insiste sur fessiers, ischio, épaules.", color: "#818cf8" },
      { icon: "⚡", title: "Cardio stratégique", desc: "2 sessions HIIT de 20 min par semaine suffisent. Pas besoin de longues séances cardio — concentre-toi sur la musculation.", color: "#818cf8" },
      { icon: "📈", title: "Surcharge progressive", desc: "Augmente le poids de 2,5 kg dès que tu complètes toutes tes séries. C'est le moteur n°1 de la progression.", color: "#818cf8" },
    );
  } else if (imc < 30) {
    base.push(
      { icon: "🔥", title: "Brûle les graisses", desc: "Combine musculation (3×/sem) + cardio modéré (3×/sem). La musculation augmente ton métabolisme même au repos.", color: "#f59e0b" },
      { icon: "🏃", title: "Cardio recommandé", desc: "LISS 30–45 min (marche rapide, vélo, natation) à 60–70% FCmax. Brûle les graisses sans cataboliser le muscle.", color: "#f59e0b" },
      { icon: "💪", title: "Préserve le muscle", desc: "Ne coupe pas trop les calories. Fais du circuit training ou supersets pour maximiser la dépense calorique en séance.", color: "#f59e0b" },
      { icon: "🎯", title: "Objectif réaliste", desc: "Vise 0.5–1 kg de perte par semaine. Trop vite = perte musculaire. La patience est ta meilleure stratégie.", color: "#f59e0b" },
    );
  } else {
    base.push(
      { icon: "🚶", title: "Commence doucement", desc: "Marche 30 min par jour d'abord. Puis natation ou vélo : sports portés qui ménagent les articulations.", color: "#ef4444" },
      { icon: "🏋️", title: "Musculation adaptée", desc: "Machines guidées plutôt que poids libres pour débuter. Protège tes articulations et apprends les bons gestes.", color: "#ef4444" },
      { icon: "⏱️", title: "Progression lente", desc: "Augmente l'intensité toutes les 2–3 semaines. Prévois un bilan médical avant de démarrer un programme intensif.", color: "#ef4444" },
      { icon: "🧘", title: "Récupération active", desc: "Stretching et mobilité après chaque séance. Réduit les courbatures et améliore la récupération articulaire.", color: "#ef4444" },
    );
  }

  if (genre === "femme") {
    base.push({ icon: "🍑", title: "Tip féminin", desc: "Privilégie les exercices fessiers : hip thrust, romanian deadlift, Bulgarian split squat. 3–4× par semaine pour des résultats visibles.", color: "#ec4899" });
  } else {
    base.push({ icon: "💪", title: "Tip masculin", desc: "N'oublie pas le dos : tractions, rowing, tirage. Un dos fort protège tes épaules et améliore ta posture et ta force globale.", color: "#6366f1" });
  }

  return base;
}

const card = "rounded-3xl overflow-hidden";
const cardBg = { background: "linear-gradient(145deg, #111118 0%, #1a1726 100%)" };
const accentBg = (color: string) => ({ background: `linear-gradient(145deg, ${color}22 0%, ${color}08 100%)`, border: `1px solid ${color}35` });

export function ResultsPanel({ result, genre }: ResultsPanelProps) {
  const {
    imc, imcLabel, imcDescription, imcColor, gaugePercent,
    poidsIdeal, masseGrassePct, masseGrasseKg, masseMaigreKg,
    bmr, tdee, corpulence, tips,
  } = result;

  const accent = getImcAccent(imc);
  const gymTips = getGymTips(imc, genre);

  return (
    <div className="flex flex-col gap-4 animate-fade-in">

      {/* ── HERO CARD ── */}
      <div className={card} style={{ ...cardBg, border: `1px solid ${accent}30` }}>

        {/* IMC Header */}
        <div className="px-6 pt-6 pb-5" style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
          <p className="text-[10px] uppercase tracking-widest font-bold mb-3" style={{ color: "rgba(255,255,255,0.35)" }}>
            Indice de masse corporelle
          </p>
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-baseline gap-2">
                <span className={cn("text-7xl font-black tabular-nums leading-none", imcColor)}>
                  {imc.toFixed(1)}
                </span>
                <span className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.35)" }}>kg/m²</span>
              </div>
              <p className="text-xl font-bold text-white mt-1">{imcLabel}</p>
              <p className="text-xs mt-1 leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>{imcDescription}</p>
            </div>
            {/* Mini donut indicator */}
            <div className="shrink-0 w-16 h-16 rounded-full flex items-center justify-center" style={{ background: accent + "20", border: `2px solid ${accent}50` }}>
              <span className="text-2xl font-black" style={{ color: accent }}>{imc < 18.5 ? "↑" : imc < 25 ? "✓" : imc < 30 ? "↗" : "!"}</span>
            </div>
          </div>
          <ImcGauge percent={gaugePercent} />
        </div>

        {/* Silhouette + Stats grid */}
        <div className="grid grid-cols-2">
          {/* Silhouette */}
          <div
            className="flex flex-col items-center justify-end px-4 pt-5 pb-6"
            style={{ borderRight: "1px solid rgba(255,255,255,0.07)", background: accent + "08" }}
          >
            <p className="text-[9px] uppercase tracking-widest font-bold mb-4 self-start" style={{ color: "rgba(255,255,255,0.3)" }}>
              Corpulence · {corpulence}
            </p>
            <BodySilhouette imc={imc} genre={genre} />
          </div>

          {/* Stats */}
          <div className="px-5 py-5">
            <p className="text-[9px] uppercase tracking-widest font-bold mb-2" style={{ color: "rgba(255,255,255,0.3)" }}>Métriques</p>
            <StatRow label="Poids idéal"  value={`${poidsIdeal} kg`}               sub="Broca" />
            <StatRow label="Masse grasse" value={`${masseGrasseKg.toFixed(1)} kg`} sub={`${masseGrassePct.toFixed(0)}%`} accent="#f59e0b" />
            <StatRow label="Masse maigre" value={`${masseMaigreKg.toFixed(1)} kg`} accent="#818cf8" />
            <StatRow label="Bésoin énergetique"  value={`${Math.round(bmr)}`}             sub="kcal/j" />
            <StatRow label="Protéines"    value={`${Math.round(poidsIdeal * 2)} g`} sub="/jour" />
          </div>
        </div>
      </div>

   
      {/* ── RECOMMANDATIONS GYM ── */}
      <div className={card} style={cardBg}>
        <div className="px-5 pt-5 pb-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
          <p className="text-[10px] uppercase tracking-widest font-bold mb-0.5" style={{ color: "#a78bfa" }}>
          Recommandations personnalisées
          </p>
          <p className="text-[10px]" style={{ color: "rgba(255,255,255,0.35)" }}>Adapté à ton profil corporel</p>
        </div>
        <div className="p-4 flex flex-col gap-3">
          {gymTips.map((tip, i) => (
            <TipCard key={i} {...tip} />
          ))}
        </div>
      </div>

    </div>
  );
}
