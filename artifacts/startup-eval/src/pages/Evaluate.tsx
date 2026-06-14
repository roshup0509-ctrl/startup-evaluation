import { useState, useEffect } from "react";
import { useEvaluations } from "@/contexts/EvaluationsContext";
import { useLocation } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { EvaluationInput, RiskLevel, MarketPotential } from "@/lib/types";
import { Loader2, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import PageHero from "@/components/layout/PageHero";

export default function Evaluate() {
  const { addEvaluation } = useEvaluations();
  const [, setLocation] = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [idea, setIdea] = useState("");
  const [industry, setIndustry] = useState("");
  const [investment, setInvestment] = useState("");
  const [profit, setProfit] = useState("");
  const [risk, setRisk] = useState<RiskLevel>("Medium");
  const [market, setMarket] = useState<MarketPotential>("Medium");
  const [location, setTargetLocation] = useState("Bangalore");

  useEffect(() => {
    // Parse query params
    const params = new URLSearchParams(window.location.search);
    const prefillIdea = params.get("prefillIdea");
    const prefillIndustry = params.get("industry");
    
    if (prefillIdea) setIdea(prefillIdea);
    if (prefillIndustry) setIndustry(prefillIndustry);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const input: EvaluationInput = {
      idea,
      industry,
      investmentRequired: Number(investment) || 0,
      expectedMonthlyProfit: Number(profit) || 0,
      riskLevel: risk,
      marketPotential: market,
      targetLocation: location
    };

    // Simulate thinking time for effect
    setTimeout(() => {
      const result = addEvaluation(input);
      setLocation(`/results/${result.id}`);
    }, 1500);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto space-y-6"
    >
      <PageHero
        accent="violet"
        icon={Sparkles}
        eyebrow="New Evaluation"
        title="Evaluate your idea"
        subtitle="Enter your startup details below for instant AI-driven analysis."
      />

      <Card>
        <CardHeader>
          <CardTitle>Startup Profile</CardTitle>
          <CardDescription>Provide realistic estimates for better accuracy.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="idea">Idea / Concept Name</Label>
                <Input 
                  id="idea" 
                  required 
                  value={idea} 
                  onChange={(e) => setIdea(e.target.value)} 
                  placeholder="e.g. AI-powered Coffee Roaster" 
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="industry">Industry</Label>
                  <Select value={industry} onValueChange={setIndustry} required>
                    <SelectTrigger id="industry">
                      <SelectValue placeholder="Select industry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="SaaS">SaaS / Software</SelectItem>
                      <SelectItem value="FinTech">FinTech</SelectItem>
                      <SelectItem value="HealthTech">HealthTech</SelectItem>
                      <SelectItem value="EdTech">EdTech</SelectItem>
                      <SelectItem value="FoodTech">FoodTech</SelectItem>
                      <SelectItem value="D2C">D2C / E-commerce</SelectItem>
                      <SelectItem value="Manufacturing">Manufacturing</SelectItem>
                      <SelectItem value="Retail">Retail</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Target Location</Label>
                  <Select value={location} onValueChange={setTargetLocation} required>
                    <SelectTrigger id="location">
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Bangalore">Bangalore</SelectItem>
                      <SelectItem value="Mumbai">Mumbai</SelectItem>
                      <SelectItem value="Delhi NCR">Delhi NCR</SelectItem>
                      <SelectItem value="Pune">Pune</SelectItem>
                      <SelectItem value="Hyderabad">Hyderabad</SelectItem>
                      <SelectItem value="Remote/Online">Remote / Global</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="investment">Initial Investment (₹)</Label>
                  <Input 
                    id="investment" 
                    type="number" 
                    min="0"
                    required 
                    value={investment} 
                    onChange={(e) => setInvestment(e.target.value)} 
                    placeholder="5000000" 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="profit">Expected Monthly Profit (₹)</Label>
                  <Input 
                    id="profit" 
                    type="number" 
                    min="0"
                    required 
                    value={profit} 
                    onChange={(e) => setProfit(e.target.value)} 
                    placeholder="200000" 
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="market">Market Potential</Label>
                  <Select value={market} onValueChange={(val: MarketPotential) => setMarket(val)} required>
                    <SelectTrigger id="market">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="High">High (Massive TAM)</SelectItem>
                      <SelectItem value="Medium">Medium (Growing/Niche)</SelectItem>
                      <SelectItem value="Low">Low (Saturated/Small)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="risk">Operational Risk</Label>
                  <Select value={risk} onValueChange={(val: RiskLevel) => setRisk(val)} required>
                    <SelectTrigger id="risk">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Low">Low (Proven model)</SelectItem>
                      <SelectItem value="Medium">Medium (Some unknowns)</SelectItem>
                      <SelectItem value="High">High (Capital intensive/New tech)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <Button type="submit" size="lg" disabled={isSubmitting} className="w-full md:w-auto">
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  "Generate Evaluation"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
