export type RiskLevel = "Low" | "Medium" | "High";
export type MarketPotential = "Low" | "Medium" | "High";

export interface EvaluationInput {
  idea: string;
  industry: string;
  investmentRequired: number;
  expectedMonthlyProfit: number;
  riskLevel: RiskLevel;
  marketPotential: MarketPotential;
  targetLocation: string;
}

export interface SwotItem {
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  threats: string[];
}

export interface Suggestion {
  id: string;
  category: "Marketing" | "Product" | "Operations" | "Growth" | "Funding";
  text: string;
}

export interface RoadmapStep {
  month: number;
  title: string;
  description: string;
}

export interface EvaluationResult extends EvaluationInput {
  id: string;
  date: string; // ISO string
  successScore: number;
  profitPotentialScore: number;
  riskScore: number;
  marketScore: number;
  fundingReadiness: number;
  valuationEstimate: number;
  recommendedLocation: string;
  investorRecommendation: {
    text: string;
    tags: string[];
  };
  swot: SwotItem;
  suggestions: Suggestion[];
  roadmap: RoadmapStep[];
}

export interface IdeaBankItem {
  id: string;
  title: string;
  category: string;
  description: string;
  investmentRange: string;
  trendPercentage: number;
  chartData: number[]; // For sparkline
}

export interface UserProfile {
  name: string;
  email: string;
  role: string;
  memberSince: string;
  ideasEvaluated: number;
}

export interface Notification {
  id: string;
  title: string;
  description: string;
  date: string;
  read: boolean;
}
