import { EvaluationInput, EvaluationResult, Suggestion, SwotItem, RoadmapStep } from "./types";

function generateSwot(input: EvaluationInput): SwotItem {
  const strengths = ["Innovative concept", "Scalable model"];
  const weaknesses = ["High initial capital requirement", "Unproven market fit"];
  const opportunities = ["Growing digital adoption", "Untapped regional markets"];
  const threats = ["Established competitors", "Regulatory changes"];

  if (input.riskLevel === "Low") strengths.push("Predictable revenue stream");
  if (input.riskLevel === "High") threats.push("High failure rate in sector");
  if (input.marketPotential === "High") opportunities.push("Massive total addressable market");

  return { strengths, weaknesses, opportunities, threats };
}

function generateSuggestions(input: EvaluationInput): Suggestion[] {
  return [
    { id: "s1", category: "Marketing", text: "Implement targeted local SEO campaigns" },
    { id: "s2", category: "Marketing", text: "Leverage social media influencers for early traction" },
    { id: "s3", category: "Product", text: "Launch MVP within 3 months to gather feedback" },
    { id: "s4", category: "Product", text: "Focus on mobile-first user experience" },
    { id: "s5", category: "Operations", text: "Automate core customer service processes" },
    { id: "s6", category: "Growth", text: "Explore B2B partnerships for bulk acquisition" },
    { id: "s7", category: "Funding", text: "Prepare pitch deck for seed round next quarter" },
  ];
}

function generateRoadmap(): RoadmapStep[] {
  return [
    { month: 1, title: "Market Validation & MVP", description: "Finalize core features and begin targeted beta testing." },
    { month: 3, title: "Initial Launch", description: "Go live in primary target location with focused marketing." },
    { month: 6, title: "Growth & Optimization", description: "Analyze user data, optimize acquisition channels." },
    { month: 12, title: "Scale & Fundraise", description: "Expand to secondary locations, begin Series A talks." },
  ];
}

export function evaluateIdea(input: EvaluationInput): EvaluationResult {
  const { investmentRequired, expectedMonthlyProfit, riskLevel, marketPotential, targetLocation } = input;

  const roiRatio = investmentRequired > 0 ? (expectedMonthlyProfit * 12) / investmentRequired : 0;
  
  let profitPotentialScore = Math.min(100, Math.max(0, roiRatio * 50));
  
  const riskScores = { Low: 80, Medium: 50, High: 20 };
  const marketScores = { Low: 30, Medium: 60, High: 90 };
  
  const riskScore = riskScores[riskLevel];
  const marketScore = marketScores[marketPotential];

  let successScore = (profitPotentialScore * 0.4) + (marketScore * 0.4) + (riskScore * 0.2);
  
  // Location bonus
  if (["Bangalore", "Remote/Online"].includes(targetLocation)) {
    successScore = Math.min(100, successScore + 5);
  }

  const fundingReadiness = Math.min(100, successScore * 0.9 + (marketScore * 0.1));
  const valuationEstimate = expectedMonthlyProfit * 24 + (marketScore * 100000); // Rough dummy formula

  let investorTag = "Angel / Seed";
  if (investmentRequired > 10000000) investorTag = "VC / Series A";

  return {
    ...input,
    id: Math.random().toString(36).substr(2, 9),
    date: new Date().toISOString(),
    successScore: Math.round(successScore),
    profitPotentialScore: Math.round(profitPotentialScore),
    riskScore,
    marketScore,
    fundingReadiness: Math.round(fundingReadiness),
    valuationEstimate: Math.round(valuationEstimate),
    recommendedLocation: targetLocation === "Remote/Online" ? "Remote/Online" : `${targetLocation} & Tier 1 Cities`,
    investorRecommendation: {
      text: "Based on the risk-reward profile, this startup is best suited for early-stage risk-tolerant capital.",
      tags: [investorTag, riskLevel === "High" ? "High Risk" : "Stable Return", industryTag(input.industry)]
    },
    swot: generateSwot(input),
    suggestions: generateSuggestions(input),
    roadmap: generateRoadmap()
  };
}

function industryTag(ind: string) {
  return ind ? ind : "Tech";
}
