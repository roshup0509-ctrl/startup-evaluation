import { RoadmapStep } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Circle } from "lucide-react";

interface RoadmapTimelineProps {
  roadmap: RoadmapStep[];
}

export default function RoadmapTimeline({ roadmap }: RoadmapTimelineProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-semibold">Suggested Roadmap</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative pl-6 border-l-2 border-muted space-y-8 pb-4">
          {roadmap.map((step, index) => (
            <div key={index} className="relative">
              <div className="absolute -left-[35px] top-1 bg-background">
                {index === 0 ? (
                  <CheckCircle2 className="h-6 w-6 text-primary" />
                ) : (
                  <Circle className="h-6 w-6 text-muted-foreground fill-background" />
                )}
              </div>
              <div className="mb-1">
                <span className="text-xs font-bold text-primary uppercase tracking-wider">Month {step.month}</span>
              </div>
              <h4 className="text-sm font-semibold mb-1">{step.title}</h4>
              <p className="text-sm text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
