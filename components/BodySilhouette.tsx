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

function getStyle(imc: number): {
  filter: string;
  badge: string;
  badgeText: string;
  glow: string;
} {
  if (imc < 18.5) return {
    filter: "invert(62%) sepia(50%) saturate(400%) hue-rotate(120deg) brightness(0.85)",
    badge: "#5DCAA5", badgeText: "#04342C",
    glow: "rgba(93,202,165,0.3)",
  };
  if (imc < 25) return {
    filter: "invert(40%) sepia(70%) saturate(500%) hue-rotate(210deg) brightness(0.85)",
    badge: "#534AB7", badgeText: "#EEEDFE",
    glow: "rgba(99,92,202,0.3)",
  };
  if (imc < 30) return {
    filter: "invert(65%) sepia(90%) saturate(600%) hue-rotate(10deg) brightness(0.88)",
    badge: "#EF9F27", badgeText: "#412402",
    glow: "rgba(239,159,39,0.3)",
  };
  return {
    filter: "invert(30%) sepia(90%) saturate(700%) hue-rotate(330deg) brightness(0.85)",
    badge: "#E24B4A", badgeText: "#501313",
    glow: "rgba(226,75,74,0.3)",
  };
}

// Horizontal scale to simulate fat/thin body shape
function getScaleX(imc: number): number {
  if (imc < 16)   return 0.72;
  if (imc < 18.5) return 0.82;
  if (imc < 22)   return 0.92;
  if (imc < 25)   return 1.0;
  if (imc < 28)   return 1.12;
  if (imc < 32)   return 1.26;
  return 1.4;
}

export function BodySilhouette({ imc, genre }: BodySilhouetteProps) {
  const label = getLabel(imc, genre);
  const { filter, badge, badgeText, glow } = getStyle(imc);
  const scaleX = getScaleX(imc);
  const src = genre === "homme" ? "/silhouette-man.png" : "/silhouette-woman.png";

  return (
    <div className="flex flex-col items-center gap-4 w-full select-none">
      {/* Container */}
      <div className="relative flex items-end justify-center w-full" style={{ minHeight: 280 }}>
        {/* Glow floor */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 rounded-full blur-2xl pointer-events-none"
          style={{ width: "60%", height: 48, background: glow }}
        />

        {/* Silhouette image — tinted via CSS filter, scaled horizontally for IMC */}
        <img
          src={src}
          alt={`Silhouette ${genre} — ${label}`}
          style={{
            height: 280,
            width: "auto",
            display: "block",
            objectFit: "contain",
            filter,
            transform: `scaleX(${scaleX})`,
            transformOrigin: "bottom center",
            transition: "transform 0.4s ease, filter 0.4s ease",
          }}
        />
      </div>

      {/* Badge */}
      <span
        className="text-[11px] font-bold px-5 py-1.5 rounded-full tracking-widest uppercase"
        style={{ background: badge, color: badgeText }}
      >
        {label}
      </span>
    </div>
  );
}
