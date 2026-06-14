import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Banknote } from "lucide-react";

interface FundingReadinessProps {
  score: number;
}

export default function FundingReadiness({ score }: FundingReadinessProps) {
  let status = "Not Ready";
  let colorClass = "text-destructive";
  
  if (score >= 80) {
    status = "Highly Investable";
    colorClass = "text-emerald-500";
  } else if (score >= 50) {
    status = "Needs Preparation";
    colorClass = "text-amber-500";
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium flex items-center gap-2 text-muted-foreground">
          <Banknote className="h-4 w-4" />
          Funding Readiness
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-end justify-between mb-2">
          <span className="text-3xl font-bold font-variant-numeric: tabular-nums">{score}%</span>
          <span className={`text-sm font-semibold mb-1 ${colorClass}`}>{status}</span>
        </div>
        <Progress value={score} className="h-2" />
        <p className="mt-3 text-xs text-muted-foreground leading-relaxed">
          {score >= 80 
            ? "Your startup shows strong fundamentals to attract early-stage capital."
            : score >= 50 
              ? "Focus on demonstrating early traction to improve fundability."
              : "Significant structural improvements needed before approaching investors."}
        </p>
      </CardContent>
    </Card>
  );
}
