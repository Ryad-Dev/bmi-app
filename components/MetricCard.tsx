import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  label: string;
  value: string;
  sub?: string;
  accent?: boolean;
  className?: string;
}

export function MetricCard({
  label,
  value,
  sub,
  accent = false,
  className,
}: MetricCardProps) {
  return (
    <Card
      className={cn(
        "p-4 flex flex-col gap-1 border border-border/60",
        accent && "border-violet-500/30 bg-violet-50/50 dark:bg-violet-950/20",
        className
      )}
    >
      <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">
        {label}
      </span>
      <span
        className={cn(
          "text-xl font-semibold leading-tight",
          accent ? "text-violet-700 dark:text-violet-300" : "text-foreground"
        )}
      >
        {value}
      </span>
      {sub && (
        <span className="text-[11px] text-muted-foreground">{sub}</span>
      )}
    </Card>
  );
}
