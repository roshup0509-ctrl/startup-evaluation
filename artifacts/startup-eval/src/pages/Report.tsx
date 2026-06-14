import { useEvaluations } from "@/contexts/EvaluationsContext";
import { useParams } from "wouter";
import { useEffect } from "react";
import { format } from "date-fns";
import Logo from "@/components/layout/Logo";

export default function Report() {
  const { id } = useParams<{ id: string }>();
  const { getById } = useEvaluations();
  const evaluation = getById(id || "");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("print") === "1") {
      setTimeout(() => {
        window.print();
      }, 500);
    }
  }, []);

  if (!evaluation) {
    return <div className="p-8">Evaluation not found.</div>;
  }

  // Formatter for Indian Rupees
  const formatCurrency = (val: number) => new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(val);

  return (
    <div className="min-h-screen bg-white text-black p-8 md:p-12 max-w-4xl mx-auto print:p-0 print:m-0">
      <style>{`
        @media print {
          @page { size: A4; margin: 20mm; }
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; background: white !important; }
        }
      `}</style>
      
      {/* Header */}
      <div className="flex justify-between items-start border-b border-gray-200 pb-6 mb-8">
        <div>
          <Logo />
          <h1 className="text-3xl font-bold mt-4">{evaluation.idea}</h1>
          <p className="text-gray-600 mt-1">Evaluation Report • {format(new Date(evaluation.date), "MMMM d, yyyy")}</p>
        </div>
        <div className="text-right">
          <div className="text-5xl font-bold text-emerald-600 font-variant-numeric: tabular-nums">{evaluation.successScore}%</div>
          <div className="text-sm font-semibold uppercase tracking-wide text-gray-500 mt-1">Success Probability</div>
        </div>
      </div>

      {/* Overview Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
        <div>
          <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Industry</div>
          <div className="font-medium text-lg">{evaluation.industry}</div>
        </div>
        <div>
          <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Location</div>
          <div className="font-medium text-lg">{evaluation.targetLocation}</div>
        </div>
        <div>
          <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Initial Cap.</div>
          <div className="font-medium text-lg">{formatCurrency(evaluation.investmentRequired)}</div>
        </div>
        <div>
          <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Risk Profile</div>
          <div className="font-medium text-lg text-amber-600">{evaluation.riskLevel}</div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 gap-8 mb-12 border-t border-b border-gray-200 py-8">
        <div>
          <h3 className="text-lg font-bold mb-2">Financial Projections</h3>
          <ul className="space-y-3">
            <li className="flex justify-between">
              <span className="text-gray-600">Expected Monthly Profit</span>
              <span className="font-semibold">{formatCurrency(evaluation.expectedMonthlyProfit)}</span>
            </li>
            <li className="flex justify-between">
              <span className="text-gray-600">Estimated Valuation</span>
              <span className="font-semibold">{formatCurrency(evaluation.valuationEstimate)}</span>
            </li>
            <li className="flex justify-between">
              <span className="text-gray-600">Funding Readiness</span>
              <span className="font-semibold">{evaluation.fundingReadiness}%</span>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-bold mb-2">Investor Fit</h3>
          <p className="text-gray-700 leading-relaxed mb-4">{evaluation.investorRecommendation.text}</p>
          <div className="flex flex-wrap gap-2">
            {evaluation.investorRecommendation.tags.map((t, i) => (
              <span key={i} className="px-2 py-1 bg-gray-100 text-sm font-medium rounded text-gray-700">{t}</span>
            ))}
          </div>
        </div>
      </div>

      {/* SWOT */}
      <div className="mb-12 page-break-inside-avoid">
        <h2 className="text-2xl font-bold mb-6">SWOT Analysis</h2>
        <div className="grid grid-cols-2 gap-x-8 gap-y-6">
          <div>
            <h3 className="font-bold text-emerald-600 mb-2 border-b pb-1">Strengths</h3>
            <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
              {evaluation.swot.strengths.map((s, i) => <li key={i}>{s}</li>)}
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-amber-600 mb-2 border-b pb-1">Weaknesses</h3>
            <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
              {evaluation.swot.weaknesses.map((s, i) => <li key={i}>{s}</li>)}
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-blue-600 mb-2 border-b pb-1">Opportunities</h3>
            <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
              {evaluation.swot.opportunities.map((s, i) => <li key={i}>{s}</li>)}
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-red-600 mb-2 border-b pb-1">Threats</h3>
            <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
              {evaluation.swot.threats.map((s, i) => <li key={i}>{s}</li>)}
            </ul>
          </div>
        </div>
      </div>

      {/* Roadmap */}
      <div className="page-break-inside-avoid">
        <h2 className="text-2xl font-bold mb-6">Execution Roadmap</h2>
        <div className="space-y-4">
          {evaluation.roadmap.map((step, i) => (
            <div key={i} className="flex gap-4">
              <div className="font-bold text-emerald-600 w-20 shrink-0">Month {step.month}</div>
              <div>
                <h4 className="font-bold">{step.title}</h4>
                <p className="text-gray-600 text-sm">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-16 pt-8 border-t border-gray-200 text-center text-gray-400 text-sm">
        Generated by AI Startup Evaluation System (ASE) • Confidential
      </div>
    </div>
  );
}
