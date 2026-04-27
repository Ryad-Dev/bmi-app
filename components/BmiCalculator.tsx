"use client";

import { useState, useEffect } from "react";
import { analyzeBody } from "@/lib/calculations";
import { ResultsPanel } from "@/components/ResultsPanel";
import { cn } from "@/lib/utils";
import type { Gender, AnalysisResult } from "@/types";

const WHATSAPP_LINK = "https://whatsapp.com/channel/0029Vb7pQxx7IUYM33fuyV2r";

function WhatsappPopup({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 12000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40"
        style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className="fixed z-50 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-sm rounded-3xl p-6 flex flex-col items-center gap-4"
        style={{
          background: "linear-gradient(145deg, #111118 0%, #1a1726 100%)",
          border: "1px solid rgba(255,255,255,0.1)",
          boxShadow: "0 32px 80px rgba(0,0,0,0.6)",
        }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-white/40 hover:text-white transition-colors"
          style={{ background: "rgba(255,255,255,0.07)" }}
        >
          ✕
        </button>

        {/* WhatsApp icon */}
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl"
          style={{ background: "linear-gradient(135deg, #25D36622 0%, #25D36640 100%)", border: "1px solid #25D36640" }}
        >
          💬
        </div>

        {/* Text */}
        <div className="text-center flex flex-col gap-2">
          <h2 className="text-lg font-black text-white leading-tight">
            Rejoins la communauté WhatsApp !
          </h2>
          <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
            Astuces exclusives sur la création d'applications et le développement.
          </p>
        </div>

        {/* CTA */}
        <a
          href={WHATSAPP_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-4 rounded-2xl text-white font-bold text-sm text-center transition-all hover:opacity-90 active:scale-[0.98]"
          style={{ background: "linear-gradient(135deg, #25D366 0%, #128C7E 100%)" }}
          onClick={onClose}
        >
          📲 Rejoindre le canal WhatsApp
        </a>

        {/* Skip */}
       
      </div>
    </>
  );
}

export function BmiCalculator() {
  const [genre, setGenre] = useState<Gender>("homme");
  const [poids, setPoids] = useState<string>("75");
  const [taille, setTaille] = useState<string>("175");
  const [age, setAge] = useState<number>(25);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string>("");
  const [showPopup, setShowPopup] = useState(false);

  function handleCalculate() {
    const p = parseFloat(poids);
    const t = parseFloat(taille);
    if (!p || !t || p < 30 || p > 300 || t < 100 || t > 250) {
      setError("Vérifie ton poids (30–300 kg) et ta taille (100–250 cm).");
      return;
    }
    setError("");
    const analysis = analyzeBody({ poids: p, taille: t, age, genre });
    setResult(analysis);
    // Show popup 2 seconds after results appear
    setTimeout(() => setShowPopup(true), 2000);
  }

  function handleClosePopup() {
    setShowPopup(false);
  }

  return (
    <div className="min-h-screen py-10 px-4" style={{ background: "#08080d" }}>
      {/* WhatsApp Popup */}
      {showPopup && <WhatsappPopup onClose={handleClosePopup} />}

      <div className="max-w-lg mx-auto flex flex-col gap-6">

        {/* Header */}
        <div className="text-center pt-4">
          <h1 className="text-3xl font-black tracking-tight text-white">
            Analyse corporelle
          </h1>
          <p className="text-sm text-white/40 mt-1">
            IMC · Corpulence · Masse grasse · Musculation
          </p>
        </div>

        {/* Form */}
        <div className="rounded-3xl p-6 flex flex-col gap-5" style={{ background: "linear-gradient(145deg, #0f0f14 0%, #16141f 100%)" }}>

          {/* Gender */}
          <div>
            <p className="text-[10px] uppercase tracking-widest text-white/40 font-semibold mb-3">Sexe</p>
            <div className="grid grid-cols-2 gap-2">
              {(["homme", "femme"] as Gender[]).map((g) => (
                <button
                  key={g}
                  onClick={() => setGenre(g)}
                  className={cn(
                    "py-3 px-4 rounded-xl text-sm font-semibold capitalize transition-all duration-150 border",
                    genre === g
                      ? "bg-violet-600 text-white border-violet-500"
                      : "bg-white/4 text-white/50 border-white/8 hover:border-violet-500/50 hover:text-white/80"
                  )}
                >
                  {g === "homme" ? "👨 Homme" : "👩 Femme"}
                </button>
              ))}
            </div>
          </div>

          {/* Poids & Taille */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { id: "poids", label: "Poids", unit: "kg", value: poids, set: setPoids, ph: "75" },
              { id: "taille", label: "Taille", unit: "cm", value: taille, set: setTaille, ph: "175" },
            ].map(({ id, label, unit, value, set, ph }) => (
              <div key={id} className="flex flex-col gap-2">
                <label className="text-[10px] uppercase tracking-widest text-white/40 font-semibold">{label}</label>
                <div className="relative">
                  <input
                    id={id}
                    type="number"
                    value={value}
                    onChange={(e) => set(e.target.value)}
                    placeholder={ph}
                    className="w-full py-3 pl-4 pr-10 rounded-xl text-white font-semibold text-base outline-none transition-all"
                    style={{
                      background: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.1)",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "#7c3aed")}
                    onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-white/30 pointer-events-none">{unit}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Age slider */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <label className="text-[10px] uppercase tracking-widest text-white/40 font-semibold">Âge</label>
              <span className="text-sm font-bold text-white tabular-nums">{age} ans</span>
            </div>
            <input
              type="range"
              min={15} max={80} step={1}
              value={age}
              onChange={(e) => setAge(Number(e.target.value))}
              className="w-full"
              style={{ accentColor: "#7c3aed" }}
            />
            <div className="flex justify-between text-[10px] text-white/25 mt-1">
              <span>15 ans</span>
              <span>80 ans</span>
            </div>
          </div>

          {error && <p className="text-sm text-red-400 text-center">{error}</p>}

          <button
            onClick={handleCalculate}
            className="w-full py-4 rounded-xl text-white font-bold text-base transition-all duration-150 hover:opacity-90 active:scale-[0.98]"
            style={{ background: "linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)" }}
          >
            Analyser mon profil →
          </button>
        </div>

        {result && <ResultsPanel result={result} genre={genre} />}
      </div>
    </div>
  );
}
