import { SwotItem } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Target, ShieldAlert } from "lucide-react";

interface SwotGridProps {
  swot: SwotItem;
}

export default function SwotGrid({ swot }: SwotGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Strengths */}
      <Card className="border-t-4 border-t-emerald-500 hover-elevate">
        <CardContent className="pt-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 rounded-full bg-emerald-500/10 text-emerald-500">
              <TrendingUp className="h-5 w-5" />
            </div>
            <h3 className="font-semibold text-lg">Strengths</h3>
          </div>
          <ul className="space-y-2">
            {swot.strengths.map((item, i) => (
              <li key={i} className="text-sm text-muted-foreground flex items-start">
                <span className="mr-2 text-emerald-500 font-bold">•</span>
                {item}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Weaknesses */}
      <Card className="border-t-4 border-t-amber-500 hover-elevate">
        <CardContent className="pt-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 rounded-full bg-amber-500/10 text-amber-500">
              <TrendingDown className="h-5 w-5" />
            </div>
            <h3 className="font-semibold text-lg">Weaknesses</h3>
          </div>
          <ul className="space-y-2">
            {swot.weaknesses.map((item, i) => (
              <li key={i} className="text-sm text-muted-foreground flex items-start">
                <span className="mr-2 text-amber-500 font-bold">•</span>
                {item}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Opportunities */}
      <Card className="border-t-4 border-t-blue-500 hover-elevate">
        <CardContent className="pt-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 rounded-full bg-blue-500/10 text-blue-500">
              <Target className="h-5 w-5" />
            </div>
            <h3 className="font-semibold text-lg">Opportunities</h3>
          </div>
          <ul className="space-y-2">
            {swot.opportunities.map((item, i) => (
              <li key={i} className="text-sm text-muted-foreground flex items-start">
                <span className="mr-2 text-blue-500 font-bold">•</span>
                {item}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Threats */}
      <Card className="border-t-4 border-t-destructive hover-elevate">
        <CardContent className="pt-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 rounded-full bg-destructive/10 text-destructive">
              <ShieldAlert className="h-5 w-5" />
            </div>
            <h3 className="font-semibold text-lg">Threats</h3>
          </div>
          <ul className="space-y-2">
            {swot.threats.map((item, i) => (
              <li key={i} className="text-sm text-muted-foreground flex items-start">
                <span className="mr-2 text-destructive font-bold">•</span>
                {item}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
