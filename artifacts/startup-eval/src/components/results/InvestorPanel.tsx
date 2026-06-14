import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users } from "lucide-react";

interface InvestorPanelProps {
  recommendation: {
    text: string;
    tags: string[];
  };
}

export default function InvestorPanel({ recommendation }: InvestorPanelProps) {
  return (
    <Card className="bg-primary text-primary-foreground border-transparent">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium flex items-center gap-2 text-primary-foreground/80">
          <Users className="h-4 w-4" />
          Investor Profile Fit
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm leading-relaxed mb-6 font-medium">
          {recommendation.text}
        </p>
        <div className="flex flex-wrap gap-2">
          {recommendation.tags.map((tag, i) => (
            <Badge key={i} variant="secondary" className="bg-primary-foreground/20 hover:bg-primary-foreground/30 text-primary-foreground border-transparent">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
