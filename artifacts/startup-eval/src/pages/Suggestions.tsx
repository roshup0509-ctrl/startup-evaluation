import { useEvaluations } from "@/contexts/EvaluationsContext";
import { useParams, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle2, Lightbulb } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import PageHero from "@/components/layout/PageHero";

export default function Suggestions() {
  const { id } = useParams<{ id: string }>();
  const { getById } = useEvaluations();
  const evaluation = getById(id || "");

  if (!evaluation) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-bold mb-2">Evaluation not found</h2>
        <Button asChild variant="outline">
          <Link href="/">Back to Dashboard</Link>
        </Button>
      </div>
    );
  }

  const categories = ["Marketing", "Product", "Operations", "Growth", "Funding"] as const;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 max-w-4xl mx-auto"
    >
      <PageHero
        accent="cyan"
        icon={Lightbulb}
        eyebrow={`For ${evaluation.idea}`}
        title="Actionable Suggestions"
        subtitle="Concrete next steps grouped by Marketing, Product, Operations, Growth and Funding."
        actions={
          <Button asChild variant="outline" className="bg-white/70 backdrop-blur">
            <Link href={`/results/${evaluation.id}`}><ArrowLeft className="h-4 w-4 mr-2" /> Back to Results</Link>
          </Button>
        }
      />

      <Tabs defaultValue="Marketing" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 mb-8 h-auto p-1">
          {categories.map(cat => (
            <TabsTrigger key={cat} value={cat} className="py-2.5">
              {cat}
            </TabsTrigger>
          ))}
        </TabsList>
        
        {categories.map(cat => {
          const catSuggestions = evaluation.suggestions.filter(s => s.category === cat);
          return (
            <TabsContent key={cat} value={cat}>
              <Card>
                <CardContent className="pt-6">
                  {catSuggestions.length === 0 ? (
                    <p className="text-muted-foreground text-center py-8">No specific suggestions for this category yet.</p>
                  ) : (
                    <ul className="space-y-4">
                      {catSuggestions.map((suggestion) => (
                        <li key={suggestion.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                          <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                          <span className="text-foreground leading-relaxed">{suggestion.text}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          );
        })}
      </Tabs>
    </motion.div>
  );
}
