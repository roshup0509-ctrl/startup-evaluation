import { IdeaBankItem } from "@/lib/types";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Line, LineChart, ResponsiveContainer } from "recharts";
import { TrendingUp, ArrowRight } from "lucide-react";
import { Link } from "wouter";

interface IdeaCardProps {
  idea: IdeaBankItem;
}

export default function IdeaCard({ idea }: IdeaCardProps) {
  const chartData = idea.chartData.map((val, i) => ({ index: i, value: val }));

  return (
    <Card className="flex flex-col hover-elevate transition-all duration-200">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start mb-2">
          <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">
            {idea.category}
          </Badge>
          <div className="flex items-center text-emerald-500 text-xs font-semibold">
            <TrendingUp className="h-3 w-3 mr-1" />
            +{idea.trendPercentage}%
          </div>
        </div>
        <CardTitle className="text-lg leading-tight">{idea.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-4">
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
          {idea.description}
        </p>
        
        <div className="mb-4">
          <div className="text-xs text-muted-foreground mb-1 font-medium uppercase tracking-wider">Investment Range</div>
          <div className="text-sm font-semibold">{idea.investmentRange}</div>
        </div>

        <div className="h-10 w-full mt-auto">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="hsl(var(--primary))" 
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <Button asChild className="w-full group" variant="outline">
          <Link href={`/evaluate?prefillIdea=${encodeURIComponent(idea.title)}&industry=${encodeURIComponent(idea.category)}`}>
            Evaluate this idea
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
