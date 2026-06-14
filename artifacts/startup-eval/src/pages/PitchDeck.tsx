import { useEvaluations } from "@/contexts/EvaluationsContext";
import { useParams, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Printer, Presentation, Quote } from "lucide-react";
import { motion } from "framer-motion";
import PageHero from "@/components/layout/PageHero";

function formatINR(n: number) {
  if (n >= 10000000) return `\u20B9${(n / 10000000).toFixed(2)} Cr`;
  if (n >= 100000) return `\u20B9${(n / 100000).toFixed(2)} L`;
  return `\u20B9${n.toLocaleString("en-IN")}`;
}

export default function PitchDeck() {
  const { id } = useParams<{ id: string }>();
  const { getById } = useEvaluations();
  const evaluation = getById(id || "");

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

  const tam = Math.max(evaluation.expectedMonthlyProfit * 12 * 1000, 100000000);
  const sam = Math.round(tam * 0.18);
  const som = Math.round(sam * 0.08);

  const slides = [
    {
      n: "01",
      title: "Vision",
      kicker: "Our north star",
      body: (
        <div className="space-y-4">
          <p className="text-2xl font-semibold leading-tight">
            <Quote className="inline h-6 w-6 text-primary mr-2 -mt-2" />
            {evaluation.idea}
          </p>
          <p className="text-muted-foreground text-base">
            We are building the category-defining {evaluation.industry.toLowerCase()} company for {evaluation.targetLocation}, starting today.
          </p>
        </div>
      ),
    },
    {
      n: "02",
      title: "Problem",
      kicker: "Why this matters now",
      body: (
        <ul className="space-y-3">
          {evaluation.swot.weaknesses.slice(0, 2).map((w, i) => (
            <li key={i} className="flex gap-3"><span className="text-primary font-bold">·</span><span>Customers in {evaluation.industry} struggle with {w.toLowerCase()}.</span></li>
          ))}
          <li className="flex gap-3"><span className="text-primary font-bold">·</span><span>Existing solutions are fragmented, expensive, or not built for {evaluation.targetLocation}.</span></li>
          <li className="flex gap-3"><span className="text-primary font-bold">·</span><span>Demand is rising as {evaluation.swot.opportunities[0]?.toLowerCase() || "the market evolves"}.</span></li>
        </ul>
      ),
    },
    {
      n: "03",
      title: "Solution",
      kicker: "Our wedge",
      body: (
        <div className="space-y-3">
          <p className="text-base">{evaluation.idea} delivers a single integrated experience that removes the friction.</p>
          <ul className="space-y-2">
            {evaluation.swot.strengths.slice(0, 3).map((s, i) => (
              <li key={i} className="flex gap-3"><span className="text-primary font-bold">{i + 1}.</span><span>{s}</span></li>
            ))}
          </ul>
        </div>
      ),
    },
    {
      n: "04",
      title: "Market Size",
      kicker: "A category in motion",
      body: (
        <div className="grid grid-cols-3 gap-3 text-center">
          {[
            { label: "TAM", value: tam, sub: "Total addressable" },
            { label: "SAM", value: sam, sub: "Serviceable" },
            { label: "SOM", value: som, sub: "Obtainable (3 yr)" },
          ].map(m => (
            <div key={m.label} className="rounded-lg border border-border p-4">
              <p className="text-xs uppercase tracking-wider text-muted-foreground">{m.label}</p>
              <p className="text-xl font-bold mt-1">{formatINR(m.value)}</p>
              <p className="text-xs text-muted-foreground mt-1">{m.sub}</p>
            </div>
          ))}
        </div>
      ),
    },
    {
      n: "05",
      title: "Product",
      kicker: "How it works",
      body: (
        <div className="space-y-3">
          <p>A focused workflow tailored for {evaluation.industry} customers in {evaluation.recommendedLocation}.</p>
          <div className="grid grid-cols-3 gap-2 text-sm">
            {["Onboard", "Activate", "Retain"].map((step, i) => (
              <div key={step} className="rounded-md bg-primary/5 border border-primary/15 p-3">
                <p className="text-xs text-primary font-semibold">Step {i + 1}</p>
                <p className="font-medium mt-1">{step}</p>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      n: "06",
      title: "Business Model",
      kicker: "How we make money",
      body: (
        <div className="space-y-3">
          <div className="flex justify-between border-b border-border pb-2"><span className="text-muted-foreground">Investment required</span><span className="font-semibold">{formatINR(evaluation.investmentRequired)}</span></div>
          <div className="flex justify-between border-b border-border pb-2"><span className="text-muted-foreground">Expected monthly profit</span><span className="font-semibold">{formatINR(evaluation.expectedMonthlyProfit)}</span></div>
          <div className="flex justify-between border-b border-border pb-2"><span className="text-muted-foreground">Annual run-rate (Yr 1)</span><span className="font-semibold">{formatINR(evaluation.expectedMonthlyProfit * 12)}</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">Estimated valuation</span><span className="font-semibold text-primary">{formatINR(evaluation.valuationEstimate)}</span></div>
        </div>
      ),
    },
    {
      n: "07",
      title: "Traction & Roadmap",
      kicker: "Where we are going",
      body: (
        <ol className="space-y-2">
          {evaluation.roadmap.map(r => (
            <li key={r.month} className="flex gap-3">
              <span className="h-6 w-12 rounded bg-primary/10 text-primary text-xs font-semibold flex items-center justify-center flex-shrink-0">M{r.month}</span>
              <div>
                <p className="font-semibold text-sm">{r.title}</p>
                <p className="text-xs text-muted-foreground">{r.description}</p>
              </div>
            </li>
          ))}
        </ol>
      ),
    },
    {
      n: "08",
      title: "Competition",
      kicker: "Why we win",
      body: (
        <div className="space-y-3">
          <p>We compete on speed, focus, and a {evaluation.recommendedLocation}-first design.</p>
          <ul className="space-y-2">
            {evaluation.swot.threats.slice(0, 2).map((t, i) => (
              <li key={i} className="flex gap-3"><span className="text-destructive font-bold">!</span><span>Threat: {t}</span></li>
            ))}
            <li className="flex gap-3"><span className="text-primary font-bold">+</span><span>Our edge: {evaluation.swot.strengths[0] || "Tighter execution and customer empathy"}.</span></li>
          </ul>
        </div>
      ),
    },
    {
      n: "09",
      title: "Team",
      kicker: "Who is behind it",
      body: (
        <div className="space-y-3">
          <p>A founder-led, customer-obsessed team with deep insight into the {evaluation.industry} space.</p>
          <div className="grid grid-cols-3 gap-3 text-center text-sm">
            {[
              { role: "Founder & CEO", line: "Vision and GTM" },
              { role: "CTO", line: "Product and engineering" },
              { role: "Head of Growth", line: "Acquisition and retention" },
            ].map(m => (
              <div key={m.role} className="rounded-md border border-border p-3">
                <div className="h-10 w-10 rounded-full bg-primary/15 mx-auto mb-2" />
                <p className="font-semibold text-xs">{m.role}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{m.line}</p>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      n: "10",
      title: "The Ask",
      kicker: "Let us partner",
      body: (
        <div className="space-y-4">
          <div className="rounded-lg bg-primary/10 border border-primary/30 p-5">
            <p className="text-xs uppercase tracking-wider text-primary font-semibold">Raising</p>
            <p className="text-3xl font-bold mt-1">{formatINR(evaluation.investmentRequired)}</p>
            <p className="text-sm text-muted-foreground mt-2">
              For 18-24 months of runway to hit {formatINR(evaluation.expectedMonthlyProfit * 12)} ARR and a {evaluation.fundingReadiness}% funding-ready posture.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {evaluation.investorRecommendation.tags.map(t => (
              <span key={t} className="px-3 py-1 rounded-full bg-muted text-xs font-medium">{t}</span>
            ))}
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6 pb-12">
      <div className="print:hidden">
        <PageHero
          accent="rose"
          icon={Presentation}
          eyebrow={evaluation.idea}
          title="Pitch Deck"
          subtitle="Auto-generated 10-slide investor deck — ready to print or share."
          actions={
            <div className="flex gap-2 flex-wrap">
              <Button variant="outline" asChild className="bg-white/70 backdrop-blur">
                <Link href={`/results/${evaluation.id}`}><ArrowLeft className="h-4 w-4 mr-2" /> Back</Link>
              </Button>
              <Button onClick={() => window.print()} className="shadow-md shadow-rose-500/20">
                <Printer className="h-4 w-4 mr-2" /> Print Deck
              </Button>
            </div>
          }
        />
      </div>

      <motion.div
        className="grid gap-5 md:grid-cols-2"
        initial="hidden"
        animate="show"
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05 } } }}
      >
        {slides.map((s) => (
          <motion.div
            key={s.n}
            variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}
          >
            <Card className="h-full overflow-hidden border-border print:break-inside-avoid">
              <CardContent className="p-6 h-full flex flex-col">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">{s.kicker}</p>
                    <h3 className="text-2xl font-bold mt-1">{s.title}</h3>
                  </div>
                  <span className="text-3xl font-bold text-primary/30 tabular-nums">{s.n}</span>
                </div>
                <div className="flex-1 text-sm text-foreground leading-relaxed">{s.body}</div>
                <div className="mt-4 pt-3 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
                  <span className="font-medium">{evaluation.idea}</span>
                  <span>Slide {s.n} / 10</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
