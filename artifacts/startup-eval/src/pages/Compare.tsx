import { useState, useMemo } from "react";
import { useEvaluations } from "@/contexts/EvaluationsContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { motion } from "framer-motion";
import { GitCompare, Trophy, Plus, X } from "lucide-react";
import { Link } from "wouter";
import PageHero from "@/components/layout/PageHero";

const PALETTE = ["hsl(var(--primary))", "#3b82f6", "#f59e0b", "#ef4444"];

function formatINR(n: number) {
  if (n >= 10000000) return `\u20B9${(n / 10000000).toFixed(2)} Cr`;
  if (n >= 100000) return `\u20B9${(n / 100000).toFixed(2)} L`;
  return `\u20B9${n.toLocaleString("en-IN")}`;
}

export default function Compare() {
  const { evaluations } = useEvaluations();
  const [selectedIds, setSelectedIds] = useState<string[]>(() => evaluations.slice(0, 2).map(e => e.id));

  const selected = useMemo(
    () => selectedIds.map(id => evaluations.find(e => e.id === id)).filter(Boolean) as typeof evaluations,
    [selectedIds, evaluations]
  );

  const radarData = [
    { metric: "Success", ...Object.fromEntries(selected.map((e, i) => [`s${i}`, e.successScore])) },
    { metric: "Profit", ...Object.fromEntries(selected.map((e, i) => [`s${i}`, e.profitPotentialScore])) },
    { metric: "Market", ...Object.fromEntries(selected.map((e, i) => [`s${i}`, e.marketScore])) },
    { metric: "Risk Safety", ...Object.fromEntries(selected.map((e, i) => [`s${i}`, e.riskScore])) },
    { metric: "Funding", ...Object.fromEntries(selected.map((e, i) => [`s${i}`, e.fundingReadiness])) },
  ];

  const winnerIdx = selected.length > 0
    ? selected.reduce((best, cur, i, arr) => (cur.successScore > arr[best].successScore ? i : best), 0)
    : -1;

  const addSlot = () => {
    if (selectedIds.length >= 4) return;
    const used = new Set(selectedIds);
    const next = evaluations.find(e => !used.has(e.id));
    if (next) setSelectedIds([...selectedIds, next.id]);
  };

  const removeSlot = (idx: number) => {
    setSelectedIds(selectedIds.filter((_, i) => i !== idx));
  };

  const updateSlot = (idx: number, id: string) => {
    setSelectedIds(selectedIds.map((s, i) => (i === idx ? id : s)));
  };

  if (evaluations.length < 2) {
    return (
      <div className="space-y-6">
        <PageHero
          accent="amber"
          icon={GitCompare}
          eyebrow="Head to head"
          title="Compare Ideas"
          subtitle="Side-by-side analysis of your evaluations."
        />
        <Card>
          <CardContent className="py-16 text-center space-y-3">
            <p className="text-muted-foreground">Evaluate at least two ideas to unlock head-to-head comparison.</p>
            <Button asChild>
              <Link href="/evaluate">Evaluate an Idea</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <motion.div
      className="space-y-8"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <PageHero
        accent="amber"
        icon={GitCompare}
        eyebrow="Head to head"
        title="Compare Ideas"
        subtitle="Pick up to four ideas and see who wins on every dimension."
        actions={
          <Button variant="outline" onClick={addSlot} disabled={selectedIds.length >= 4 || selectedIds.length >= evaluations.length} className="bg-white/70 backdrop-blur">
            <Plus className="h-4 w-4 mr-2" /> Add Idea
          </Button>
        }
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {selectedIds.map((id, idx) => (
          <Card key={idx} className="relative">
            <CardContent className="pt-6 space-y-3">
              {selectedIds.length > 2 && (
                <button
                  onClick={() => removeSlot(idx)}
                  className="absolute top-2 right-2 h-7 w-7 rounded-full hover:bg-muted flex items-center justify-center text-muted-foreground"
                  aria-label="Remove"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full" style={{ backgroundColor: PALETTE[idx % PALETTE.length] }} />
                <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Slot {idx + 1}</span>
                {idx === winnerIdx && (
                  <Badge className="ml-auto bg-primary/10 text-primary border-primary/30 hover:bg-primary/20">
                    <Trophy className="h-3 w-3 mr-1" /> Winner
                  </Badge>
                )}
              </div>
              <Select value={id} onValueChange={(v) => updateSlot(idx, v)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {evaluations.map(e => (
                    <SelectItem key={e.id} value={e.id}>{e.idea}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {selected[idx] && (
                <div className="pt-2 space-y-1.5 text-sm">
                  <div className="flex justify-between"><span className="text-muted-foreground">Success</span><span className="font-semibold">{selected[idx].successScore}%</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Industry</span><span className="font-medium truncate ml-2">{selected[idx].industry}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Risk</span><span className="font-medium">{selected[idx].riskLevel}</span></div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold">Multi-Dimensional Scorecard</CardTitle>
        </CardHeader>
        <CardContent className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={radarData} margin={{ top: 20, right: 50, bottom: 20, left: 50 }}>
              <PolarGrid stroke="hsl(var(--border))" />
              <PolarAngleAxis dataKey="metric" tick={{ fontSize: 13, fill: "hsl(var(--muted-foreground))" }} />
              <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} />
              {selected.map((e, i) => (
                <Radar
                  key={e.id}
                  name={e.idea}
                  dataKey={`s${i}`}
                  stroke={PALETTE[i % PALETTE.length]}
                  fill={PALETTE[i % PALETTE.length]}
                  fillOpacity={0.18}
                  strokeWidth={2}
                />
              ))}
              <Legend wrapperStyle={{ fontSize: 12, paddingTop: 12 }} />
              <Tooltip
                contentStyle={{ backgroundColor: "hsl(var(--card))", borderColor: "hsl(var(--border))", borderRadius: "8px" }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold">Detailed Comparison</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-muted-foreground">
                <th className="text-left font-medium py-3 px-2">Metric</th>
                {selected.map((e, i) => (
                  <th key={e.id} className="text-left font-medium py-3 px-2">
                    <span className="inline-flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: PALETTE[i % PALETTE.length] }} />
                      <span className="truncate max-w-[180px] inline-block align-middle">{e.idea}</span>
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ["Success Score", (e: any) => `${e.successScore}%`],
                ["Profit Potential", (e: any) => `${e.profitPotentialScore}/100`],
                ["Market Score", (e: any) => `${e.marketScore}/100`],
                ["Risk Safety", (e: any) => `${e.riskScore}/100`],
                ["Funding Readiness", (e: any) => `${e.fundingReadiness}%`],
                ["Investment Required", (e: any) => formatINR(e.investmentRequired)],
                ["Monthly Profit", (e: any) => formatINR(e.expectedMonthlyProfit)],
                ["Valuation Estimate", (e: any) => formatINR(e.valuationEstimate)],
                ["Industry", (e: any) => e.industry],
                ["Target Location", (e: any) => e.targetLocation],
              ].map(([label, get]) => (
                <tr key={label as string} className="border-b border-border/60 last:border-0">
                  <td className="py-3 px-2 text-muted-foreground font-medium">{label as string}</td>
                  {selected.map((e) => (
                    <td key={e.id} className="py-3 px-2 font-medium">{(get as any)(e)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {winnerIdx >= 0 && selected[winnerIdx] && (
        <Card className="border-primary/30 bg-gradient-to-br from-primary/5 to-transparent">
          <CardContent className="pt-6 flex items-center gap-4 flex-wrap">
            <div className="h-12 w-12 rounded-full bg-primary/15 flex items-center justify-center">
              <Trophy className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1 min-w-[200px]">
              <p className="text-sm text-muted-foreground">Recommended pick</p>
              <h3 className="text-lg font-bold">{selected[winnerIdx].idea}</h3>
              <p className="text-sm text-muted-foreground">
                Highest overall success score at {selected[winnerIdx].successScore}% with a {selected[winnerIdx].riskLevel.toLowerCase()} risk profile.
              </p>
            </div>
            <Button asChild>
              <Link href={`/results/${selected[winnerIdx].id}`}>Open Full Report</Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </motion.div>
  );
}
