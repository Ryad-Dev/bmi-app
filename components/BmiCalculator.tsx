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
    <div style={{
      position: "fixed", inset: 0, zIndex: 50,
      background: "rgba(0,0,0,0.18)",
      backdropFilter: "blur(8px)",
      display: "flex", alignItems: "center", justifyContent: "center",
    }} onClick={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#fff",
          borderRadius: 24,
          padding: "32px 28px",
          width: "90%", maxWidth: 360,
          display: "flex", flexDirection: "column", alignItems: "center", gap: 20,
          boxShadow: "0 32px 80px rgba(0,0,0,0.14), 0 4px 16px rgba(0,0,0,0.06)",
          position: "relative",
        }}
      >
        <button onClick={onClose} style={{
          position: "absolute", top: 14, right: 14,
          width: 30, height: 30, borderRadius: "50%",
          background: "#ffffff", border: "none", cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 13, color: "#8e8e93",
        }}>✕</button>

        <div style={{
          width: 64, height: 64, borderRadius: 16,
          background: "#e8faf2",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 28,
        }}>💬</div>

        <div style={{ textAlign: "center" }}>
          <p style={{ fontSize: 18, fontWeight: 700, color: "#1c1c1e", margin: "0 0 8px" }}>
            Rejoins la communauté !
          </p>
          <p style={{ fontSize: 14, color: "#6e6e73", lineHeight: 1.6, margin: 0 }}>
            Reçois des astuces exclusives sur la création d'apps et le développement sur mon canal WhatsApp.
          </p>
        </div>

        <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer"
          onClick={onClose}
          style={{
            display: "block", width: "100%",
            padding: "14px 0", borderRadius: 14,
            background: "#25D366", color: "#fff",
            textAlign: "center", fontWeight: 700, fontSize: 15,
            textDecoration: "none",
          }}>
          📲 Rejoindre le canal WhatsApp
        </a>

        <button onClick={onClose} style={{
          background: "none", border: "none", cursor: "pointer",
          fontSize: 13, color: "#aeaeb2",
        }}>
          Non merci, continuer
        </button>
      </div>
    </div>
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
    setTimeout(() => setShowPopup(true), 5000);
  }

  return (
    <div style={{ minHeight: "100vh", background: "#ffffff", paddingBottom: 60 }}>
      {showPopup && <WhatsappPopup onClose={() => setShowPopup(false)} />}

      {/* Header */}
      <div style={{
        background: "rgba(255,255,255,0.85)",
        backdropFilter: "blur(20px)",
        borderBottom: "0.5px solid rgba(0,0,0,0.08)",
        padding: "20px 20px 18px",
        textAlign: "center",
        position: "sticky", top: 0, zIndex: 10,
      }}>
        <p style={{ fontSize: 12, fontWeight: 600, color: "#8e8e93", letterSpacing: "0.08em", textTransform: "uppercase", margin: "0 0 4px" }}>
          Musculation
        </p>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: "#1c1c1e", margin: 0, letterSpacing: "-0.3px" }}>
          Analyse corporelle
        </h1>
      </div>

      <div style={{ maxWidth: 480, margin: "0 auto", padding: "24px 16px 0" }}>

        {/* Form Card */}
        <div style={{
          background: "#fff",
          borderRadius: 20,
          padding: "24px 20px",
          boxShadow: "0 8px 40px rgba(0,0,0,0.13), 0 2px 8px rgba(0,0,0,0.08), 0 0 0 0.5px rgba(0,0,0,0.06)",
          marginBottom: 16,
        }}>

          {/* Gender */}
          <p style={{ fontSize: 11, fontWeight: 600, color: "#8e8e93", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 10 }}>Sexe</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 24 }}>
            {(["homme", "femme"] as Gender[]).map((g) => (
              <button key={g} onClick={() => setGenre(g)} style={{
                padding: "12px 0",
                borderRadius: 12,
                border: genre === g ? "1.5px solid #007AFF" : "1px solid #e5e5ea",
                background: genre === g ? "#EAF3FF" : "#fff",
                color: genre === g ? "#007AFF" : "#6e6e73",
                fontWeight: 600, fontSize: 14,
                cursor: "pointer", transition: "all 0.15s",
              }}>
                {g === "homme" ? "👨 Homme" : "👩 Femme"}
              </button>
            ))}
          </div>

          {/* Poids & Taille */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 24 }}>
            {[
              { id: "poids", label: "Poids", unit: "kg", value: poids, set: setPoids, ph: "75" },
              { id: "taille", label: "Taille", unit: "cm", value: taille, set: setTaille, ph: "175" },
            ].map(({ id, label, unit, value, set, ph }) => (
              <div key={id}>
                <p style={{ fontSize: 11, fontWeight: 600, color: "#8e8e93", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 8 }}>{label}</p>
                <div style={{ position: "relative" }}>
                  <input
                    type="number" value={value} placeholder={ph}
                    onChange={(e) => set(e.target.value)}
                    style={{
                      width: "100%", padding: "12px 36px 12px 14px",
                      borderRadius: 12, border: "1px solid #e5e5ea",
                      fontSize: 17, fontWeight: 600, color: "#1c1c1e",
                      background: "#fff", outline: "none",
                      boxSizing: "border-box",
                    }}
                    onFocus={(e) => { e.target.style.borderColor = "#007AFF"; e.target.style.boxShadow = "0 0 0 3px rgba(0,122,255,0.12)"; }}
                    onBlur={(e) => { e.target.style.borderColor = "#e5e5ea"; e.target.style.boxShadow = "none"; }}
                  />
                  <span style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", fontSize: 13, color: "#aeaeb2", pointerEvents: "none" }}>{unit}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Age */}
          <div style={{ marginBottom: 28 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
              <p style={{ fontSize: 11, fontWeight: 600, color: "#8e8e93", textTransform: "uppercase", letterSpacing: "0.07em", margin: 0 }}>Âge</p>
              <span style={{ fontSize: 17, fontWeight: 700, color: "#1c1c1e" }}>{age} ans</span>
            </div>
            <input type="range" min={15} max={80} step={1} value={age}
              onChange={(e) => setAge(Number(e.target.value))}
              style={{ width: "100%", accentColor: "#007AFF" }}
            />
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#aeaeb2", marginTop: 4 }}>
              <span>15 ans</span><span>80 ans</span>
            </div>
          </div>

          {error && <p style={{ fontSize: 13, color: "#FF3B30", textAlign: "center", marginBottom: 16 }}>{error}</p>}

          <button onClick={handleCalculate} style={{
            width: "100%", padding: "15px 0",
            borderRadius: 14, border: "none",
            background: "#007AFF", color: "#fff",
            fontSize: 16, fontWeight: 700, cursor: "pointer",
            letterSpacing: "-0.2px",
          }}>
            Analyser mon profil →
          </button>
        </div>

        {result && <ResultsPanel result={result} genre={genre} />}
      </div>
    </div>
  );
}
