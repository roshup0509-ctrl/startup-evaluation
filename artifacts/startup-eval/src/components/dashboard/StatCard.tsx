import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import AnimatedCounter from "./AnimatedCounter";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";

interface StatCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  change?: number;
  progress?: number;
  color?: "primary" | "emerald" | "blue" | "amber" | "purple";
}

export default function StatCard({ 
  title, 
  value, 
  icon: Icon, 
  prefix, 
  suffix, 
  decimals,
  change,
  progress,
  color = "primary"
}: StatCardProps) {
  const colorMap = {
    primary: "bg-primary/10 text-primary",
    emerald: "bg-emerald-500/10 text-emerald-500",
    blue: "bg-blue-500/10 text-blue-500",
    amber: "bg-amber-500/10 text-amber-500",
    purple: "bg-purple-500/10 text-purple-500",
  };

  return (
    <Card className="hover-elevate transition-all duration-200">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
          <div className={cn("p-2 rounded-full", colorMap[color])}>
            <Icon className="h-4 w-4" />
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <div className="text-2xl font-bold tracking-tight">
            <AnimatedCounter value={value} prefix={prefix} suffix={suffix} decimals={decimals} />
          </div>
          {change !== undefined && (
            <span className={cn(
              "text-xs font-medium",
              change >= 0 ? "text-emerald-500" : "text-destructive"
            )}>
              {change >= 0 ? "+" : ""}{change}%
            </span>
          )}
        </div>
        {progress !== undefined && (
          <Progress value={progress} className="h-1.5 mt-4" />
        )}
      </CardContent>
    </Card>
  );
}
