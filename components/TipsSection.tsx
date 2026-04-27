import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

interface TipsProps {
  tips: { title: string; description: string }[];
  imcLabel: string;
}

export function TipsSection({ tips, imcLabel }: TipsProps) {
  return (
    <Card className="border border-border/60">
      <CardHeader className="pb-3 pt-4 px-5">
        <CardTitle className="text-sm font-semibold tracking-wide uppercase text-muted-foreground">
          Recommandations — {imcLabel}
        </CardTitle>
      </CardHeader>
      <CardContent className="px-5 pb-5 pt-0 flex flex-col gap-0">
        {tips.map((tip, i) => (
          <div
            key={i}
            className="flex items-start gap-3 py-3 border-b border-border/40 last:border-0"
          >
            <ArrowRight
              size={14}
              className="text-violet-500 mt-0.5 shrink-0"
            />
            <div className="flex flex-col gap-0.5">
              <span className="text-sm font-semibold text-foreground">
                {tip.title}
              </span>
              <span className="text-[13px] text-muted-foreground leading-relaxed">
                {tip.description}
              </span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
