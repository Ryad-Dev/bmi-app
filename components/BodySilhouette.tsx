"use client";

import type { Gender } from "@/types";

interface BodySilhouetteProps {
  imc: number;
  genre: Gender;
}

function getLabel(imc: number, genre: Gender): string {
  if (genre === "homme") {
    if (imc < 18.5) return "Maigreur";
    if (imc < 22)   return "Svelte";
    if (imc < 25)   return "Athlétique";
    if (imc < 27)   return "Trapu";
    if (imc < 30)   return "Surpoids";
    return "Obésité";
  } else {
    if (imc < 18.5) return "Maigreur";
    if (imc < 21)   return "Svelte";
    if (imc < 24)   return "Athlétique";
    if (imc < 27)   return "Ronde";
    if (imc < 30)   return "Surpoids";
    return "Obésité";
  }
}

function getStyle(imc: number): { filter: string; badge: string; badgeText: string; glow: string } {
  if (imc < 18.5) return { filter: "invert(62%) sepia(50%) saturate(400%) hue-rotate(120deg) brightness(0.9)", badge: "#e8faf2", badgeText: "#1a7a4a", glow: "rgba(48,209,88,0.15)" };
  if (imc < 25)   return { filter: "invert(40%) sepia(70%) saturate(500%) hue-rotate(210deg) brightness(0.9)", badge: "#EAF3FF", badgeText: "#0055CC", glow: "rgba(0,122,255,0.15)" };
  if (imc < 30)   return { filter: "invert(65%) sepia(90%) saturate(600%) hue-rotate(10deg) brightness(0.9)",  badge: "#FFF4E0", badgeText: "#A05800", glow: "rgba(255,159,10,0.15)" };
  return               { filter: "invert(30%) sepia(90%) saturate(700%) hue-rotate(330deg) brightness(0.9)",  badge: "#FFECEB", badgeText: "#CC1400", glow: "rgba(255,59,48,0.15)" };
}

function getScaleX(imc: number): number {
  if (imc < 16)   return 0.72;
  if (imc < 18.5) return 0.82;
  if (imc < 22)   return 0.92;
  if (imc < 25)   return 1.0;
  if (imc < 28)   return 1.1;
  if (imc < 32)   return 1.22;
  return 1.35;
}

export function BodySilhouette({ imc, genre }: BodySilhouetteProps) {
  const label = getLabel(imc, genre);
  const { filter, badge, badgeText, glow } = getStyle(imc);
  const scaleX = getScaleX(imc);
  const src = genre === "homme" ? "/silhouette-man.png" : "/silhouette-woman.png";

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12, width: "100%" }}>
      <div style={{ position: "relative", display: "flex", alignItems: "flex-end", justifyContent: "center", width: "100%", minHeight: 240 }}>
        {/* glow */}
        <div style={{
          position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)",
          width: "60%", height: 40, borderRadius: "50%",
          background: glow, filter: "blur(16px)",
          pointerEvents: "none",
        }} />
        <img
          src={src}
          alt={`${genre} — ${label}`}
          style={{
            height: 240, width: "auto",
            filter,
            transform: `scaleX(${scaleX})`,
            transformOrigin: "bottom center",
            transition: "transform 0.4s ease, filter 0.4s ease",
          }}
        />
      </div>
      <span style={{
        fontSize: 11, fontWeight: 700,
        padding: "5px 14px", borderRadius: 99,
        background: badge, color: badgeText,
        letterSpacing: "0.06em", textTransform: "uppercase",
      }}>
        {label}
      </span>
    </div>
  );
}
