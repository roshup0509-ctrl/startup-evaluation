import { RadialBarChart, RadialBar, PolarAngleAxis, ResponsiveContainer } from "recharts";

interface ScoreGaugeProps {
  score: number;
}

export default function ScoreGauge({ score }: ScoreGaugeProps) {
  let color = "hsl(var(--primary))";
  if (score < 50) color = "hsl(var(--destructive))";
  else if (score < 75) color = "hsl(var(--amber-500, 38 92% 50%))";

  const data = [{ name: "Score", value: score, fill: color }];

  return (
    <div className="relative h-48 w-48 mx-auto flex items-center justify-center">
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart 
          cx="50%" 
          cy="50%" 
          innerRadius="75%" 
          outerRadius="100%" 
          barSize={16} 
          data={data}
          startAngle={90} 
          endAngle={-270}
        >
          <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
          <RadialBar
            background={{ fill: "hsl(var(--muted))" }}
            dataKey="value"
            cornerRadius={8}
          />
        </RadialBarChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-4xl font-bold tracking-tight font-variant-numeric: tabular-nums">{score}%</span>
        <span className="text-sm text-muted-foreground font-medium uppercase tracking-wider">Success</span>
      </div>
    </div>
  );
}
