import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Info } from "lucide-react";

export default function AboutPanel() {
  return (
    <Card className="bg-primary/5 border-primary/10">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold flex items-center gap-2 text-primary">
          <Info className="h-5 w-5" />
          About ASE System
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground leading-relaxed">
          The AI Startup Evaluation System (ASE) is a proprietary model designed to evaluate the viability, risk profile, and funding readiness of early-stage startup ideas. 
          It synthesizes market potential, capital efficiency, and operational risk into a unified success score, generating actionable insights and roadmap suggestions.
        </p>
      </CardContent>
    </Card>
  );
}
