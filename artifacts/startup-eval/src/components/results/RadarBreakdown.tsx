import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from "recharts";
import { EvaluationResult } from "@/lib/types";

interface RadarBreakdownProps {
  evaluation: EvaluationResult;
}

export default function RadarBreakdown({ evaluation }: RadarBreakdownProps) {
  const data = [
    { metric: "Success", value: evaluation.successScore },
    { metric: "Profit", value: evaluation.profitPotentialScore },
    { metric: "Market", value: evaluation.marketScore },
    { metric: "Risk Safety", value: evaluation.riskScore },
    { metric: "Funding", value: evaluation.fundingReadiness },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-semibold">Performance Radar</CardTitle>
      </CardHeader>
      <CardContent className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={data} margin={{ top: 10, right: 30, bottom: 10, left: 30 }}>
            <PolarGrid stroke="hsl(var(--border))" />
            <PolarAngleAxis dataKey="metric" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
            <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} />
            <Radar
              name="Score"
              dataKey="value"
              stroke="hsl(var(--primary))"
              fill="hsl(var(--primary))"
              fillOpacity={0.35}
              strokeWidth={2}
            />
            <Tooltip
              contentStyle={{ backgroundColor: "hsl(var(--card))", borderColor: "hsl(var(--border))", borderRadius: "8px" }}
              formatter={(value: number) => [`${value}/100`, "Score"]}
            />
          </RadarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
