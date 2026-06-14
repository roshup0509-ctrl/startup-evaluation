import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Line, LineChart, ResponsiveContainer } from "recharts";
import { TrendingUp } from "lucide-react";

interface ValuationCardProps {
  valuation: number;
}

export default function ValuationCard({ valuation }: ValuationCardProps) {
  // Formatter for Indian Rupees
  const formattedValuation = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(valuation);

  // Dummy upward trend data
  const data = [
    { value: valuation * 0.5 },
    { value: valuation * 0.7 },
    { value: valuation * 0.8 },
    { value: valuation * 0.9 },
    { value: valuation * 0.95 },
    { value: valuation }
  ];

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium flex items-center gap-2 text-muted-foreground">
          <TrendingUp className="h-4 w-4" />
          Est. Valuation (3 Yr)
        </CardTitle>
      </CardHeader>
      <CardContent className="relative pb-0">
        <div className="text-3xl font-bold mb-4 font-variant-numeric: tabular-nums">
          {formattedValuation}
        </div>
        
        <div className="h-16 w-full -mx-6 -mb-6 px-6">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="hsl(var(--primary))" 
                strokeWidth={2}
                dot={false}
                isAnimationActive={true}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
