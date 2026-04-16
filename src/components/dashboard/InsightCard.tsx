import { Lightbulb, AlertTriangle, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

type InsightType = "warning" | "success" | "info";

interface InsightCardProps {
  message: string;
  type: InsightType;
  action?: string;
  onClick?: () => void;
}

const iconMap = {
  warning: AlertTriangle,
  success: TrendingUp,
  info: Lightbulb,
};

const colorMap = {
  warning: "border-warning/30 bg-warning/5",
  success: "border-success/30 bg-success/5",
  info: "border-primary/30 bg-primary/5",
};

const iconColorMap = {
  warning: "text-warning",
  success: "text-success",
  info: "text-primary",
};

export function InsightCard({ message, type, action, onClick }: InsightCardProps) {
  const Icon = iconMap[type];

  return (
    <div
      className={cn(
        "rounded-xl border p-4 flex items-start gap-3 transition-all",
        colorMap[type],
        onClick && "cursor-pointer hover:shadow-md"
      )}
      onClick={onClick}
    >
      <Icon className={cn("h-4 w-4 mt-0.5 flex-shrink-0", iconColorMap[type])} />
      <div className="flex-1 min-w-0">
        <p className="text-sm text-foreground leading-relaxed">{message}</p>
        {action && (
          <button className="text-xs text-primary font-medium mt-2 hover:underline">{action}</button>
        )}
      </div>
    </div>
  );
}
