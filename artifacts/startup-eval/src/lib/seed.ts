import { EvaluationResult, IdeaBankItem } from "./types";
import { evaluateIdea } from "./scoring";

export const initialIdeaBank: IdeaBankItem[] = [
  {
    id: "ib1",
    title: "Cloud Kitchen Network",
    category: "FoodTech",
    description: "Delivery-only kitchen optimized for high-density urban areas.",
    investmentRange: "₹10L - ₹25L",
    trendPercentage: 24,
    chartData: [20, 35, 40, 55, 60, 80, 100]
  },
  {
    id: "ib2",
    title: "AI Recruitment Agency",
    category: "SaaS",
    description: "Automated candidate screening and interview scheduling platform.",
    investmentRange: "₹5L - ₹15L",
    trendPercentage: 45,
    chartData: [10, 20, 40, 45, 70, 85, 95]
  },
  {
    id: "ib3",
    title: "Eco-Friendly Packaging",
    category: "D2C",
    description: "Biodegradable alternatives to single-use plastics for e-commerce.",
    investmentRange: "₹20L - ₹50L",
    trendPercentage: 18,
    chartData: [30, 35, 45, 50, 60, 75, 80]
  },
  {
    id: "ib4",
    title: "Hyperlocal Quick Commerce",
    category: "Retail",
    description: "15-minute delivery for niche product categories.",
    investmentRange: "₹50L+",
    trendPercentage: 12,
    chartData: [50, 45, 60, 55, 70, 80, 90]
  },
  {
    id: "ib5",
    title: "EdTech Upskilling",
    category: "EdTech",
    description: "Cohort-based specialized tech skills training.",
    investmentRange: "₹2L - ₹10L",
    trendPercentage: 30,
    chartData: [15, 30, 45, 50, 65, 85, 95]
  }
];

export const initialEvaluations: EvaluationResult[] = [
  evaluateIdea({
    idea: "Online Tutoring Platform",
    industry: "EdTech",
    investmentRequired: 500000,
    expectedMonthlyProfit: 150000,
    riskLevel: "Low",
    marketPotential: "High",
    targetLocation: "Remote/Online"
  }),
  evaluateIdea({
    idea: "Eco Friendly Packaging",
    industry: "Manufacturing",
    investmentRequired: 2000000,
    expectedMonthlyProfit: 300000,
    riskLevel: "Medium",
    marketPotential: "Medium",
    targetLocation: "Pune"
  }),
  evaluateIdea({
    idea: "Home Cooked Food Platform",
    industry: "FoodTech",
    investmentRequired: 1000000,
    expectedMonthlyProfit: 80000,
    riskLevel: "High",
    marketPotential: "Low",
    targetLocation: "Mumbai"
  })
];

// Modify dates to be in the past
initialEvaluations[0].date = new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString();
initialEvaluations[1].date = new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString();
initialEvaluations[2].date = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
