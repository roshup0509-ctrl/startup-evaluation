import { useMemo } from "react";
import { useEvaluations } from "@/contexts/EvaluationsContext";
import { useParams, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Map as MapIcon, Target } from "lucide-react";
import { motion } from "framer-motion";
import PageHero from "@/components/layout/PageHero";
import {
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ZAxis,
  ReferenceLine,
  Cell,
} from "recharts";

function hashStr(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

function generateCompetitors(industry: string) {
  const seeds = [
    "MetaForge", "Lumiant", "Northwind", "Brio Labs", "Vexa",
    "Helio", "Quanta", "Stratus", "Indra", "Nimbus",
  ];
  const h = hashStr(industry);
  const picks = [0, 1, 2, 3, 4].map(i => seeds[(h + i * 7) % seeds.length]);
  return picks.map((name, i) => ({
    name,
    x: 25 + ((h + i * 31) % 60),
    y: 20 + ((h + i * 17) % 65),
    z: 100 + ((h + i * 11) % 200),
    type: "competitor" as const,
  }));
}

export default function MarketMap() {
  const { id } = useParams<{ id: string }>();
  const { getById } = useEvaluations();
  const evaluation = getById(id || "");

  const data = useMemo(() => {
    if (!evaluation) return [];
    const competitors = generateCompetitors(evaluation.industry);
    const youX = Math.min(85, Math.max(15, 100 - evaluation.profitPotentialScore * 0.7));
    const youY = Math.min(95, Math.max(20, evaluation.successScore));
    return [
      ...competitors,
      { name: evaluation.idea, x: youX, y: youY, z: 320, type: "you" as const },
    ];
  }, [evaluation]);

  if (!evaluation) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-bold mb-2">Evaluation not found</h2>
        <Button asChild variant="outline">
          <Link href="/">Back to Dashboard</Link>
        </Button>
      </div>
    );
  }

  const youPoint = data.find(d => d.type === "you")!;
  const quadrants = [
    { label: "Premium Leaders", desc: "High differentiation, high price", x: "75%", y: "10%" },
    { label: "Niche Players", desc: "High differentiation, low price", x: "10%", y: "10%" },
    { label: "Underdogs", desc: "Low differentiation, low price", x: "10%", y: "78%" },
    { label: "Cash Cows", desc: "Low differentiation, high price", x: "75%", y: "78%" },
  ];

  const yourQuadrant =
    youPoint.x > 50 && youPoint.y > 50 ? "Premium Leaders" :
    youPoint.x <= 50 && youPoint.y > 50 ? "Niche Players" :
    youPoint.x <= 50 ? "Underdogs" : "Cash Cows";

  const competitors = data.filter(d => d.type === "competitor");

  return (
    <motion.div
      className="space-y-6 pb-12"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <PageHero
        accent="violet"
        icon={MapIcon}
        eyebrow={`${evaluation.industry}`}
        title="Market Position Map"
        subtitle={`Where ${evaluation.idea} sits versus competitors on price and innovation.`}
        actions={
          <Button variant="outline" asChild className="bg-white/70 backdrop-blur">
            <Link href={`/results/${evaluation.id}`}><ArrowLeft className="h-4 w-4 mr-2" /> Back to Results</Link>
          </Button>
        }
      />

      <Card className="border-primary/30 bg-gradient-to-br from-primary/5 to-transparent">
        <CardContent className="pt-6 flex items-center gap-4 flex-wrap">
          <div className="h-12 w-12 rounded-full bg-primary/15 flex items-center justify-center">
            <Target className="h-6 w-6 text-primary" />
          </div>
          <div className="flex-1 min-w-[200px]">
            <p className="text-sm text-muted-foreground">Your strategic quadrant</p>
            <h3 className="text-xl font-bold">{yourQuadrant}</h3>
            <p className="text-sm text-muted-foreground">
              {yourQuadrant === "Premium Leaders" && "Defend with brand and product depth. Investors love this position."}
              {yourQuadrant === "Niche Players" && "Own a focused segment first, then expand upward into premium pricing."}
              {yourQuadrant === "Underdogs" && "Race for distribution. Differentiate fast or be priced out by larger players."}
              {yourQuadrant === "Cash Cows" && "Profitable but stagnant. Reinvent the product before disruption hits."}
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold">Differentiation vs. Price Index</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative h-[460px] w-full">
            {quadrants.map(q => (
              <div
                key={q.label}
                className="absolute text-xs text-muted-foreground/70 pointer-events-none max-w-[140px]"
                style={{ left: q.x, top: q.y }}
              >
                <p className="font-semibold text-foreground/80">{q.label}</p>
                <p>{q.desc}</p>
              </div>
            ))}
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 24, right: 24, bottom: 32, left: 32 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis
                  type="number"
                  dataKey="x"
                  name="Price Index"
                  domain={[0, 100]}
                  tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                  label={{ value: "Price (low \u2192 high)", position: "insideBottom", offset: -8, fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                />
                <YAxis
                  type="number"
                  dataKey="y"
                  name="Differentiation"
                  domain={[0, 100]}
                  tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                  label={{ value: "Differentiation (low \u2192 high)", angle: -90, position: "insideLeft", fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                />
                <ZAxis type="number" dataKey="z" range={[80, 600]} />
                <ReferenceLine x={50} stroke="hsl(var(--border))" strokeDasharray="4 4" />
                <ReferenceLine y={50} stroke="hsl(var(--border))" strokeDasharray="4 4" />
                <Tooltip
                  cursor={{ strokeDasharray: "3 3" }}
                  contentStyle={{ backgroundColor: "hsl(var(--card))", borderColor: "hsl(var(--border))", borderRadius: "8px" }}
                  formatter={(value: any, name: string) => {
                    if (name === "Price Index") return [`${Math.round(value)}/100`, "Price"];
                    if (name === "Differentiation") return [`${Math.round(value)}/100`, "Differentiation"];
                    return [value, name];
                  }}
                  labelFormatter={(_, payload: any) => payload?.[0]?.payload?.name ?? ""}
                />
                <Scatter data={data}>
                  {data.map((entry, idx) => (
                    <Cell
                      key={idx}
                      fill={entry.type === "you" ? "hsl(var(--primary))" : "#94a3b8"}
                      stroke={entry.type === "you" ? "hsl(var(--primary))" : "#64748b"}
                      strokeWidth={entry.type === "you" ? 2 : 1}
                    />
                  ))}
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center gap-6 mt-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-2"><span className="h-3 w-3 rounded-full bg-primary" /> Your idea</span>
            <span className="flex items-center gap-2"><span className="h-3 w-3 rounded-full bg-slate-400" /> Competitors</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold">Competitor Snapshot</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-muted-foreground">
                <th className="text-left font-medium py-3 px-2">Player</th>
                <th className="text-right font-medium py-3 px-2">Price Index</th>
                <th className="text-right font-medium py-3 px-2">Differentiation</th>
                <th className="text-right font-medium py-3 px-2">Est. Market Share</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border/60 bg-primary/5">
                <td className="py-3 px-2 font-semibold text-primary">{evaluation.idea} (You)</td>
                <td className="py-3 px-2 text-right tabular-nums">{Math.round(youPoint.x)}/100</td>
                <td className="py-3 px-2 text-right tabular-nums">{Math.round(youPoint.y)}/100</td>
                <td className="py-3 px-2 text-right tabular-nums">{Math.round(youPoint.z / 10)}%</td>
              </tr>
              {competitors.map(c => (
                <tr key={c.name} className="border-b border-border/60 last:border-0">
                  <td className="py-3 px-2 font-medium">{c.name}</td>
                  <td className="py-3 px-2 text-right tabular-nums">{Math.round(c.x)}/100</td>
                  <td className="py-3 px-2 text-right tabular-nums">{Math.round(c.y)}/100</td>
                  <td className="py-3 px-2 text-right tabular-nums">{Math.round(c.z / 10)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </motion.div>
  );
}
