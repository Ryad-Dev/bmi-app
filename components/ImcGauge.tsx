"use client";

interface ImcGaugeProps {
  percent: number;
}

const zones = [
  { label: "Maigreur", color: "#10b981", width: 15 },
  { label: "Normal", color: "#22c55e", width: 30 },
  { label: "Surpoids", color: "#f59e0b", width: 20 },
  { label: "Obésité", color: "#ef4444", width: 35 },
];

export function ImcGauge({ percent }: ImcGaugeProps) {
  const clampedPct = Math.min(Math.max(percent, 2), 98);

  return (
    <div className="mt-4 mb-1">
      {/* Colored bar */}
      <div className="relative h-3 rounded-full overflow-hidden flex mb-3">
        {zones.map((z) => (
          <div
            key={z.label}
            style={{ width: `${z.width}%`, backgroundColor: z.color }}
          />
        ))}
        {/* Cursor */}
        <div
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-white border-2 border-slate-800 shadow-md transition-all duration-500 ease-out"
          style={{ left: `${clampedPct}%` }}
        />
      </div>
      {/* Zone labels */}
      <div className="flex justify-between text-[10px] text-muted-foreground font-medium">
        {zones.map((z) => (
          <span key={z.label}>{z.label}</span>
        ))}
      </div>
    </div>
  );
}
