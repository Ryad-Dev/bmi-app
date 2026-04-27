"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { analyzeBody } from "@/lib/calculations";
import { ResultsPanel } from "@/components/ResultsPanel";
import type { Gender, AnalysisResult } from "@/types";

export function BmiCalculator() {
  const [genre, setGenre] = useState<Gender>("homme");
  const [poids, setPoids] = useState<string>("75");
  const [taille, setTaille] = useState<string>("175");
  const [age, setAge] = useState<number>(25);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string>("");

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
  }

  return (
    <div className="min-h-screen bg-background py-10 px-4">
      <div className="max-w-lg mx-auto flex flex-col gap-6">

        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Analyse corporelle
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            IMC · Corpulence · Masse grasse · Recommandations musculation
          </p>
        </div>

        {/* Form Card */}
        <Card className="border border-border/60 shadow-sm">
          <CardContent className="p-6 flex flex-col gap-5">

            {/* Gender toggle */}
            <div>
              <Label className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold mb-2 block">
                Sexe
              </Label>
              <div className="grid grid-cols-2 gap-2">
                {(["homme", "femme"] as Gender[]).map((g) => (
                  <button
                    key={g}
                    onClick={() => setGenre(g)}
                    className={cn(
                      "py-2.5 px-4 rounded-lg border text-sm font-medium capitalize transition-all duration-150",
                      genre === g
                        ? "bg-violet-600 text-white border-violet-600"
                        : "bg-background text-muted-foreground border-border/60 hover:border-violet-400 hover:text-violet-600"
                    )}
                  >
                    {g === "homme" ? "Homme" : "Femme"}
                  </button>
                ))}
              </div>
            </div>

            {/* Poids & Taille */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label
                  htmlFor="poids"
                  className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold"
                >
                  Poids
                </Label>
                <div className="relative">
                  <Input
                    id="poids"
                    type="number"
                    value={poids}
                    onChange={(e) => setPoids(e.target.value)}
                    min={30}
                    max={300}
                    className="pr-9"
                    placeholder="75"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground pointer-events-none">
                    kg
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Label
                  htmlFor="taille"
                  className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold"
                >
                  Taille
                </Label>
                <div className="relative">
                  <Input
                    id="taille"
                    type="number"
                    value={taille}
                    onChange={(e) => setTaille(e.target.value)}
                    min={100}
                    max={250}
                    className="pr-9"
                    placeholder="175"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground pointer-events-none">
                    cm
                  </span>
                </div>
              </div>
            </div>

            {/* Age Slider */}
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <Label className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">
                  Âge
                </Label>
                <span className="text-sm font-semibold text-foreground tabular-nums">
                  {age} ans
                </span>
              </div>
              <Slider
                min={15}
                max={80}
                step={1}
                value={[age]}
                onValueChange={(v) => setAge(v[0])}
                className="w-full"
              />
              <div className="flex justify-between text-[10px] text-muted-foreground">
                <span>15 ans</span>
                <span>80 ans</span>
              </div>
            </div>

            {/* Error */}
            {error && (
              <p className="text-sm text-red-500 text-center">{error}</p>
            )}

            {/* CTA */}
            <Button
              onClick={handleCalculate}
              className="w-full bg-violet-600 hover:bg-violet-700 text-white font-semibold py-5 text-base"
            >
              Analyser mon profil →
            </Button>
          </CardContent>
        </Card>

        {/* Results */}
        {result && <ResultsPanel result={result} genre={genre} />}
      </div>
    </div>
  );
}
