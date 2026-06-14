import { useState } from "react";
import { useEvaluations } from "@/contexts/EvaluationsContext";
import { useSearch } from "@/contexts/SearchContext";
import { Link } from "wouter";
import { format } from "date-fns";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Eye, Trash2, Rocket, History as HistoryIcon } from "lucide-react";
import { motion } from "framer-motion";
import PageHero from "@/components/layout/PageHero";

export default function History() {
  const { evaluations, deleteEvaluation } = useEvaluations();
  const { searchQuery, setSearchQuery } = useSearch();
  const [localSearch, setLocalSearch] = useState(searchQuery);

  // Sync local search with global if needed, or just use local
  const query = localSearch.toLowerCase();
  
  const filtered = evaluations.filter(e => 
    e.idea.toLowerCase().includes(query) || 
    e.industry.toLowerCase().includes(query)
  );

  const getScoreColor = (score: number) => {
    if (score >= 75) return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
    if (score >= 50) return "bg-amber-500/10 text-amber-500 border-amber-500/20";
    return "bg-destructive/10 text-destructive border-destructive/20";
  };

  if (evaluations.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <div className="p-6 bg-primary/10 rounded-full mb-6">
          <Rocket className="h-12 w-12 text-primary" />
        </div>
        <h2 className="text-2xl font-bold tracking-tight mb-2">No evaluations yet</h2>
        <p className="text-muted-foreground max-w-md mb-8">
          You haven't evaluated any startup ideas yet. Start by generating your first AI-powered analysis.
        </p>
        <Button asChild size="lg">
          <Link href="/evaluate">Evaluate your first idea</Link>
        </Button>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <PageHero
        accent="slate"
        icon={HistoryIcon}
        eyebrow="Archive"
        title="Evaluation History"
        subtitle="View, search and manage every idea you have evaluated."
        actions={
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by idea or industry..."
              className="pl-9 bg-white/80 backdrop-blur"
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
            />
          </div>
        }
      />

      <div className="bg-card border border-border rounded-lg overflow-hidden shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Idea</TableHead>
              <TableHead>Industry</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Score</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                  No results found.
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((item) => (
                <TableRow key={item.id} className="group">
                  <TableCell className="text-muted-foreground">
                    {format(new Date(item.date), "MMM d, yyyy")}
                  </TableCell>
                  <TableCell className="font-medium">{item.idea}</TableCell>
                  <TableCell>{item.industry}</TableCell>
                  <TableCell className="text-muted-foreground">{item.targetLocation}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getScoreColor(item.successScore)}>
                      {item.successScore}%
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button variant="ghost" size="icon" asChild className="h-8 w-8">
                        <Link href={`/results/${item.id}`}>
                          <Eye className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                        onClick={() => deleteEvaluation(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </motion.div>
  );
}
