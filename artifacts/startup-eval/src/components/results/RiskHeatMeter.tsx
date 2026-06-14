import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";

interface RiskHeatMeterProps {
  score: number; // 20 (High risk), 50 (Medium), 80 (Low risk)
}

export default function RiskHeatMeter({ score }: RiskHeatMeterProps) {
  // Map score to percentage position (invert since higher score = lower risk)
  // If score is 80 (low risk) -> marker should be at left (green)
  // If score is 50 (medium) -> marker at center
  // If score is 20 (high risk) -> marker at right (red)
  
  // Transform score to position:
  // 80 -> 10%
  // 50 -> 50%
  // 20 -> 90%
  let position = "50%";
  let label = "Medium Risk";
  if (score >= 70) {
    position = "10%";
    label = "Low Risk";
  } else if (score <= 30) {
    position = "90%";
    label = "High Risk";
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium flex items-center gap-2 text-muted-foreground">
          <AlertTriangle className="h-4 w-4" />
          Risk Assessment
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-2 flex justify-between text-xs font-medium">
          <span className="text-emerald-500">Low</span>
          <span className="text-amber-500">Medium</span>
          <span className="text-destructive">High</span>
        </div>
        <div className="relative h-3 w-full rounded-full bg-gradient-to-r from-emerald-500 via-amber-500 to-destructive">
          <div 
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 bg-background border-2 border-foreground rounded-full shadow-sm"
            style={{ left: position }}
          />
        </div>
        <p className="mt-4 text-center font-semibold text-sm">{label}</p>
      </CardContent>
    </Card>
  );
}
