import { useMemo } from "react";
import { useEvaluations } from "@/contexts/EvaluationsContext";
import { useParams, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, TrendingUp, Target, Coins, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import PageHero from "@/components/layout/PageHero";
import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
} from "recharts";

function formatINR(n: number) {
  if (n >= 10000000) return `\u20B9${(n / 10000000).toFixed(2)} Cr`;
  if (n >= 100000) return `\u20B9${(n / 100000).toFixed(2)} L`;
  return `\u20B9${Math.round(n).toLocaleString("en-IN")}`;
}

export default function Forecast() {
  const { id } = useParams<{ id: string }>();
  const { getById } = useEvaluations();
  const evaluation = getById(id || "");

  const data = useMemo(() => {
    if (!evaluation) return [];
    const growthByMarket = { Low: 1.18, Medium: 1.42, High: 1.75 } as const;
    const churnByRisk = { Low: 0.96, Medium: 0.9, High: 0.82 } as const;
    const yearlyGrowth = growthByMarket[evaluation.marketPotential];
    const retention = churnByRisk[evaluation.riskLevel];

    const monthlyOpex = evaluation.expectedMonthlyProfit * 0.55;
    let revenue = evaluation.expectedMonthlyProfit * 12 * 1.6;
    let cumulative = -evaluation.investmentRequired;

    const out: any[] = [];
    for (let y = 1; y <= 5; y++) {
      const opex = monthlyOpex * 12 * Math.pow(1.12, y - 1);
      const profit = (revenue - opex) * retention;
      cumulative += profit;
      out.push({
        year: `Yr ${y}`,
        Revenue: Math.round(revenue),
        Opex: Math.round(opex),
        Profit: Math.round(profit),
        Cumulative: Math.round(cumulative),
      });
      revenue *= yearlyGrowth;
    }
    return out;
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

  const totalRevenue = data.reduce((a, d) => a + d.Revenue, 0);
  const totalProfit = data.reduce((a, d) => a + d.Profit, 0);
  const breakEvenIdx = data.findIndex(d => d.Cumulative >= 0);
  const breakEvenLabel = breakEvenIdx >= 0 ? data[breakEvenIdx].year : "Beyond Yr 5";
  const yr5 = data[data.length - 1];

  return (
    <motion.div
      className="space-y-6 pb-12"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <PageHero
        accent="emerald"
        icon={TrendingUp}
        eyebrow={evaluation.idea}
        title="5-Year Financial Forecast"
        subtitle="Projected revenue, operating cost, and cumulative cash flow."
        actions={
          <Button variant="outline" asChild className="bg-white/70 backdrop-blur">
            <Link href={`/results/${evaluation.id}`}><ArrowLeft className="h-4 w-4 mr-2" /> Back to Results</Link>
          </Button>
        }
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "5-Year Revenue", value: formatINR(totalRevenue), icon: TrendingUp, color: "text-primary" },
          { label: "5-Year Net Profit", value: formatINR(totalProfit), icon: Coins, color: "text-emerald-600" },
          { label: "Year 5 ARR", value: formatINR(yr5.Revenue), icon: Target, color: "text-blue-600" },
          { label: "Break-even", value: breakEvenLabel, icon: AlertCircle, color: breakEvenIdx >= 0 ? "text-amber-600" : "text-destructive" },
        ].map(s => (
          <Card key={s.label}>
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">{s.label}</p>
                  <p className="text-2xl font-bold mt-1.5">{s.value}</p>
                </div>
                <s.icon className={`h-5 w-5 ${s.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold">Revenue, Cost & Net Profit</CardTitle>
        </CardHeader>
        <CardContent className="h-[380px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={data} margin={{ top: 16, right: 16, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
              <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                tickFormatter={(v) => formatINR(v as number).replace("\u20B9", "")}
              />
              <Tooltip
                contentStyle={{ backgroundColor: "hsl(var(--card))", borderColor: "hsl(var(--border))", borderRadius: "8px" }}
                formatter={(value: any, name: any) => [formatINR(Number(value)), name]}
              />
              <Legend wrapperStyle={{ fontSize: 12, paddingTop: 8 }} />
              <Bar dataKey="Revenue" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Opex" fill="#cbd5e1" radius={[4, 4, 0, 0]} />
              <Line type="monotone" dataKey="Profit" stroke="#16a34a" strokeWidth={3} dot={{ r: 4 }} />
            </ComposedChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold">Cumulative Cash Flow</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={data} margin={{ top: 16, right: 16, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
              <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                tickFormatter={(v) => formatINR(v as number).replace("\u20B9", "")}
              />
              <Tooltip
                contentStyle={{ backgroundColor: "hsl(var(--card))", borderColor: "hsl(var(--border))", borderRadius: "8px" }}
                formatter={(value: any) => [formatINR(Number(value)), "Cumulative"]}
              />
              <ReferenceLine y={0} stroke="hsl(var(--destructive))" strokeDasharray="4 4" label={{ value: "Break-even", position: "right", fill: "hsl(var(--destructive))", fontSize: 11 }} />
              <Line type="monotone" dataKey="Cumulative" stroke="hsl(var(--primary))" strokeWidth={3} dot={{ r: 5 }} />
            </ComposedChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold">Year-by-Year Breakdown</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-muted-foreground">
                <th className="text-left font-medium py-3 px-2">Year</th>
                <th className="text-right font-medium py-3 px-2">Revenue</th>
                <th className="text-right font-medium py-3 px-2">Operating Cost</th>
                <th className="text-right font-medium py-3 px-2">Net Profit</th>
                <th className="text-right font-medium py-3 px-2">Cumulative</th>
              </tr>
            </thead>
            <tbody>
              {data.map((d, i) => (
                <tr key={d.year} className="border-b border-border/60 last:border-0">
                  <td className="py-3 px-2 font-medium">{d.year}</td>
                  <td className="py-3 px-2 text-right tabular-nums">{formatINR(d.Revenue)}</td>
                  <td className="py-3 px-2 text-right tabular-nums text-muted-foreground">{formatINR(d.Opex)}</td>
                  <td className="py-3 px-2 text-right tabular-nums font-semibold">{formatINR(d.Profit)}</td>
                  <td className={`py-3 px-2 text-right tabular-nums font-semibold ${d.Cumulative >= 0 ? "text-primary" : "text-destructive"}`}>{formatINR(d.Cumulative)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-xs text-muted-foreground mt-4">
            Assumptions: market growth based on {evaluation.marketPotential.toLowerCase()} potential, retention based on {evaluation.riskLevel.toLowerCase()} risk, opex inflates 12% YoY.
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
