"use client";

interface ImcGaugeProps {
  percent: number;
}

const zones = [
  { label: "Maigreur", color: "#30D158", width: 15 },
  { label: "Normal",   color: "#007AFF", width: 30 },
  { label: "Surpoids", color: "#FF9F0A", width: 20 },
  { label: "Obésité",  color: "#FF3B30", width: 35 },
];

export function ImcGauge({ percent }: ImcGaugeProps) {
  const clamped = Math.min(Math.max(percent, 2), 98);
  return (
    <div style={{ marginTop: 20 }}>
      <div style={{ position: "relative", height: 8, borderRadius: 8, overflow: "hidden", display: "flex", marginBottom: 10 }}>
        {zones.map((z) => (
          <div key={z.label} style={{ width: `${z.width}%`, background: z.color }} />
        ))}
        <div style={{
          position: "absolute", top: "50%", left: `${clamped}%`,
          transform: "translate(-50%, -50%)",
          width: 18, height: 18, borderRadius: "50%",
          background: "#fff",
          boxShadow: "0 2px 8px rgba(0,0,0,0.22), 0 0 0 2px rgba(0,0,0,0.08)",
          transition: "left 0.4s ease",
        }} />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {zones.map((z) => (
          <span key={z.label} style={{ fontSize: 10, fontWeight: 600, color: "#aeaeb2", textTransform: "uppercase", letterSpacing: "0.04em" }}>{z.label}</span>
        ))}
      </div>
    </div>
  );
}
