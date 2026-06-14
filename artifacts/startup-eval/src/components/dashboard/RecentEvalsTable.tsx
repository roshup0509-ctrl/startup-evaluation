import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EvaluationResult } from "@/lib/types";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { ChevronRight } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface RecentEvalsTableProps {
  evaluations: EvaluationResult[];
}

export default function RecentEvalsTable({ evaluations }: RecentEvalsTableProps) {
  const recent = evaluations.slice(0, 5);

  const getScoreColor = (score: number) => {
    if (score >= 75) return "bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 border-emerald-500/20";
    if (score >= 50) return "bg-amber-500/10 text-amber-500 hover:bg-amber-500/20 border-amber-500/20";
    return "bg-destructive/10 text-destructive hover:bg-destructive/20 border-destructive/20";
  };

  return (
    <Card className="col-span-full xl:col-span-2">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-base font-semibold">Recent Evaluations</CardTitle>
        <Link href="/history" className="text-sm text-primary hover:underline flex items-center">
          View all <ChevronRight className="h-4 w-4 ml-1" />
        </Link>
      </CardHeader>
      <CardContent>
        {recent.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground text-sm">
            No evaluations yet.
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Idea</TableHead>
                <TableHead>Industry</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Score</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recent.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.idea}</TableCell>
                  <TableCell className="text-muted-foreground">{item.industry}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {format(new Date(item.date), "MMM d, yyyy")}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getScoreColor(item.successScore)}>
                      {item.successScore}%
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Link href={`/results/${item.id}`} className="text-sm text-primary hover:underline">
                      View
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
