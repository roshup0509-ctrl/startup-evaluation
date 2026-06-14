import { useEvaluations } from "@/contexts/EvaluationsContext";
import { useAuth } from "@/contexts/AuthContext";
import StatCard from "@/components/dashboard/StatCard";
import ScoreTrendChart from "@/components/dashboard/ScoreTrendChart";
import IndustryBreakdown from "@/components/dashboard/IndustryBreakdown";
import RecentEvalsTable from "@/components/dashboard/RecentEvalsTable";
import AboutPanel from "@/components/dashboard/AboutPanel";
import DailyTip from "@/components/dashboard/DailyTip";
import PageHero from "@/components/layout/PageHero";
import { Button } from "@/components/ui/button";
import { Sparkles, Target, Activity, Zap, LayoutDashboard, Plus } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "wouter";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function Dashboard() {
  const { user } = useAuth();
  const { evaluations } = useEvaluations();

  const totalEvals = evaluations.length;
  const avgScore = evaluations.length > 0 
    ? Math.round(evaluations.reduce((acc, curr) => acc + curr.successScore, 0) / evaluations.length) 
    : 0;
  
  const highPotential = evaluations.filter(e => e.successScore >= 75).length;
  const avgRiskScore = evaluations.length > 0
    ? Math.round(evaluations.reduce((acc, curr) => acc + curr.riskScore, 0) / evaluations.length)
    : 0;

  return (
    <motion.div 
      className="space-y-8"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <PageHero
        accent="indigo"
        icon={LayoutDashboard}
        eyebrow="Overview"
        title={`Welcome back, ${user?.name?.split(" ")[0] || "Founder"}`}
        subtitle="Here's the pulse of every idea you have evaluated so far."
        actions={
          <Button asChild size="lg" className="shadow-md shadow-violet-500/30">
            <Link href="/evaluate"><Plus className="h-4 w-4 mr-2" /> New Evaluation</Link>
          </Button>
        }
      />

      <motion.div variants={item}>
        <DailyTip />
      </motion.div>

      <motion.div variants={item} className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Evaluations"
          value={totalEvals}
          icon={Activity}
          color="primary"
        />
        <StatCard
          title="Average Success Score"
          value={avgScore}
          suffix="%"
          icon={Target}
          color="blue"
          progress={avgScore}
        />
        <StatCard
          title="High Potential Ideas"
          value={highPotential}
          icon={Sparkles}
          color="emerald"
        />
        <StatCard
          title="Average Risk Score"
          value={avgRiskScore}
          suffix="/100"
          icon={Zap}
          color="amber"
          progress={avgRiskScore}
        />
      </motion.div>

      <motion.div variants={item} className="grid gap-4 grid-cols-1 lg:grid-cols-3">
        <ScoreTrendChart evaluations={evaluations} />
        <IndustryBreakdown evaluations={evaluations} />
      </motion.div>

      <motion.div variants={item} className="grid gap-4 grid-cols-1 xl:grid-cols-3">
        <RecentEvalsTable evaluations={evaluations} />
        <div className="xl:col-span-1">
          <AboutPanel />
        </div>
      </motion.div>
    </motion.div>
  );
}
