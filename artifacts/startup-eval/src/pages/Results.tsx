import { useEffect, useRef } from "react";
import { useEvaluations } from "@/contexts/EvaluationsContext";
import { useParams, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, Lightbulb, Printer, GitCompare, Presentation, TrendingUp, Map as MapIcon } from "lucide-react";
import ScoreGauge from "@/components/results/ScoreGauge";
import RiskHeatMeter from "@/components/results/RiskHeatMeter";
import FundingReadiness from "@/components/results/FundingReadiness";
import SwotGrid from "@/components/results/SwotGrid";
import RoadmapTimeline from "@/components/results/RoadmapTimeline";
import InvestorPanel from "@/components/results/InvestorPanel";
import ValuationCard from "@/components/results/ValuationCard";
import RadarBreakdown from "@/components/results/RadarBreakdown";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import confetti from "canvas-confetti";
import PageHero from "@/components/layout/PageHero";
import { Rocket } from "lucide-react";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function Results() {
  const { id } = useParams<{ id: string }>();
  const { getById } = useEvaluations();
  const evaluation = getById(id || "");

  const firedRef = useRef(false);
  useEffect(() => {
    if (!evaluation || firedRef.current) return;
    if (evaluation.successScore >= 75) {
      firedRef.current = true;
      const end = Date.now() + 800;
      const colors = ["#16a34a", "#22c55e", "#86efac", "#fbbf24"];
      (function frame() {
        confetti({ particleCount: 4, angle: 60, spread: 60, origin: { x: 0, y: 0.7 }, colors });
        confetti({ particleCount: 4, angle: 120, spread: 60, origin: { x: 1, y: 0.7 }, colors });
        if (Date.now() < end) requestAnimationFrame(frame);
      })();
    }
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

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPdf = () => {
    const baseUrl = import.meta.env.BASE_URL.replace(/\/$/, "");
    window.open(`${baseUrl}/report/${evaluation.id}?print=1`, "_blank");
  };

  return (
    <motion.div 
      className="space-y-8 pb-12"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <PageHero
        accent="indigo"
        icon={Rocket}
        eyebrow={`${evaluation.industry} • ${evaluation.recommendedLocation}`}
        title={evaluation.idea}
        subtitle="Full AI evaluation report — score, risk, valuation, roadmap and more."
        actions={
          <div className="flex items-center gap-2 flex-wrap">
            <Button variant="outline" onClick={handlePrint} className="hidden sm:flex bg-white/70 backdrop-blur">
              <Printer className="h-4 w-4 mr-2" /> Print
            </Button>
            <Button variant="outline" onClick={handleDownloadPdf} className="bg-white/70 backdrop-blur">
              <Download className="h-4 w-4 mr-2" /> PDF
            </Button>
            <Button variant="outline" asChild className="hidden sm:flex bg-white/70 backdrop-blur">
              <Link href="/compare"><GitCompare className="h-4 w-4 mr-2" /> Compare</Link>
            </Button>
            <Button asChild className="shadow-md shadow-violet-500/30">
              <Link href={`/suggestions/${evaluation.id}`}>
                <Lightbulb className="h-4 w-4 mr-2" /> Suggestions
              </Link>
            </Button>
          </div>
        }
      />

      <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1 flex flex-col justify-center border-primary/20 bg-primary/5">
          <CardContent className="pt-6">
            <ScoreGauge score={evaluation.successScore} />
          </CardContent>
        </Card>
        <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <RiskHeatMeter score={evaluation.riskScore} />
          <FundingReadiness score={evaluation.fundingReadiness} />
          <div className="sm:col-span-2">
            <ValuationCard valuation={evaluation.valuationEstimate} />
          </div>
        </div>
      </motion.div>

      <motion.div variants={item}>
        <RadarBreakdown evaluation={evaluation} />
      </motion.div>

      <motion.div variants={item}>
        <h2 className="text-xl font-bold tracking-tight mb-4">Advanced Tools</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { href: `/pitch-deck/${evaluation.id}`, icon: Presentation, title: "Pitch Deck", desc: "Auto-generated 10-slide investor deck." },
            { href: `/forecast/${evaluation.id}`, icon: TrendingUp, title: "5-Year Forecast", desc: "Revenue, opex, profit and cash flow projection." },
            { href: `/market-map/${evaluation.id}`, icon: MapIcon, title: "Market Position Map", desc: "See where you stand vs. competitors." },
          ].map(t => (
            <Link key={t.href} href={t.href}>
              <Card className="cursor-pointer hover:border-primary/40 hover:shadow-md transition-all group h-full">
                <CardContent className="pt-6">
                  <div className="h-11 w-11 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-3 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <t.icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-semibold mb-1">{t.title}</h3>
                  <p className="text-sm text-muted-foreground">{t.desc}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </motion.div>

      <motion.div variants={item} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-bold tracking-tight">SWOT Analysis</h2>
          <SwotGrid swot={evaluation.swot} />
        </div>
        <div className="space-y-6">
          <h2 className="text-xl font-bold tracking-tight">Investor Fit</h2>
          <InvestorPanel recommendation={evaluation.investorRecommendation} />
          <RoadmapTimeline roadmap={evaluation.roadmap} />
        </div>
      </motion.div>
    </motion.div>
  );
}
