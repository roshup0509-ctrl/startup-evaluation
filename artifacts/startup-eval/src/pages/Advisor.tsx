import { useState, useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bot, Send, User as UserIcon, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEvaluations } from "@/contexts/EvaluationsContext";
import PageHero from "@/components/layout/PageHero";

interface ChatMessage {
  id: string;
  role: "user" | "bot";
  text: string;
  ts: number;
}

const STARTERS = [
  "How do I validate my startup idea?",
  "What pitch deck slides do I need?",
  "How should I price my product?",
  "When should I raise seed funding?",
  "How do I find my first 100 customers?",
];

function detectIntent(q: string): string {
  const t = q.toLowerCase();
  if (/(valid|validation|test idea|mvp)/.test(t)) {
    return "Start with the riskiest assumption first. Run 10-15 customer interviews this week, build a one-page landing with a waitlist, and ship a clickable prototype within 2 weeks. Validation is signal of paid intent, not just survey love.";
  }
  if (/(pitch|deck|slides)/.test(t)) {
    return "Use this 10-slide structure: (1) Vision, (2) Problem, (3) Solution, (4) Market size (TAM/SAM/SOM), (5) Product demo, (6) Business model, (7) Traction, (8) Competition, (9) Team, (10) The Ask. Keep it under 12 minutes verbal and 6 words per bullet.";
  }
  if (/(pric|pricing|charge|monet)/.test(t)) {
    return "Anchor pricing to value, not cost. Try a 3-tier menu (Starter / Pro / Scale) with a clear default. Run a quick Van Westendorp survey on 20 users, then A/B test two price points for 30 days before locking in.";
  }
  if (/(fund|raise|investor|seed|series|vc|angel)/.test(t)) {
    return "Raise when capital unlocks a milestone, not when you run out. For seed: target 18-24 months of runway, show repeatable acquisition, and aim for ~25 warm investor intros to close 3-5 checks. Lead first, then fill the round.";
  }
  if (/(customer|users|growth|acquire|first 100)/.test(t)) {
    return "Do things that don't scale. Manually onboard your first 50 users, ship in their workflow, and ask each one for two referrals. Pick ONE channel (community, content, outbound) and dominate it before adding a second.";
  }
  if (/(team|hire|cofounder|hiring)/.test(t)) {
    return "Hire painfully slowly until product-market fit. First 5 hires should be generalists with high agency. Avoid managers before you have 12 people. For cofounders: complementary skills, shared values, equal vesting on a 4-year cliff.";
  }
  if (/(market|tam|competitor|competition)/.test(t)) {
    return "Size your market bottom-up: # of customers x annual willingness to pay. Map 5-7 competitors on a 2x2 (e.g. price vs. feature depth). The goal is not to be 10% better, it is to be 10x better on one axis customers care about.";
  }
  if (/(risk|fail|mistake)/.test(t)) {
    return "Top 3 silent killers: (1) building before talking to users, (2) hiring too fast, (3) discounting to win logos. De-risk weekly by writing the obituary of your startup and reverse-engineering each cause.";
  }
  if (/(roadmap|plan|launch|go-?to-?market|gtm)/.test(t)) {
    return "Plan in 90-day waves. Wave 1: ship MVP and lock 10 paying design partners. Wave 2: prove a repeatable acquisition channel. Wave 3: hire to remove yourself from the bottleneck. Anything beyond 90 days is fiction.";
  }
  if (/(brand|name|logo|design)/.test(t)) {
    return "Brand follows clarity. Lock a one-line value prop first ('We help X do Y so they can Z'). Then pick a name that is short, easy to spell out loud, and has a domain you can buy. Logo can wait until $100K ARR.";
  }
  if (/(unit economics|cac|ltv|margin|burn)/.test(t)) {
    return "Healthy SaaS rules of thumb: LTV/CAC > 3, gross margin > 70%, payback < 12 months. Track these monthly from day one. If LTV/CAC < 1, fix retention before you spend another rupee on ads.";
  }
  if (/(legal|incorporate|company|gst|compliance)/.test(t)) {
    return "Incorporate as a Private Limited in India for institutional rounds, or LLP if you stay bootstrapped. Get GST + Founders Agreement + Employee ESOP pool (typically 10%) before you take outside money.";
  }
  if (/(hello|hi|hey|namaste)/.test(t)) {
    return "Hello founder. I am your startup advisor. Ask me anything about validation, pitching, pricing, fundraising, growth, hiring, or unit economics.";
  }
  return "Good question. Frame it as: who is the customer, what painful job are they hiring you to do, and what would make them switch today? If you share more context (industry, stage, team size) I can give a sharper answer.";
}

export default function Advisor() {
  const { evaluations } = useEvaluations();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "m0",
      role: "bot",
      text: `Hi there! I am your AI startup advisor. I can help you sharpen your idea, prepare for fundraising, and plan growth. ${evaluations.length > 0 ? `I see you have ${evaluations.length} idea${evaluations.length > 1 ? "s" : ""} evaluated. ` : ""}What is on your mind today?`,
      ts: Date.now(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isTyping]);

  const send = (text: string) => {
    const q = text.trim();
    if (!q) return;
    const userMsg: ChatMessage = { id: `u${Date.now()}`, role: "user", text: q, ts: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);
    const reply = detectIntent(q);
    setTimeout(() => {
      setMessages(prev => [...prev, { id: `b${Date.now()}`, role: "bot", text: reply, ts: Date.now() }]);
      setIsTyping(false);
    }, 650 + Math.min(1200, reply.length * 4));
  };

  return (
    <div className="space-y-6 h-[calc(100vh-7rem)] flex flex-col">
      <PageHero
        accent="blue"
        icon={Bot}
        eyebrow="Always on"
        title="AI Advisor"
        subtitle="Your on-demand startup mentor — ask anything about validation, pricing, fundraising, or growth."
      />

      <Card className="flex-1 flex flex-col overflow-hidden">
        <CardContent ref={scrollRef as any} className="flex-1 overflow-y-auto p-6 space-y-4">
          <AnimatePresence initial={false}>
            {messages.map(m => (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-3 ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {m.role === "bot" && (
                  <div className="h-8 w-8 rounded-full bg-primary/15 text-primary flex items-center justify-center flex-shrink-0">
                    <Bot className="h-4 w-4" />
                  </div>
                )}
                <div
                  className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    m.role === "user"
                      ? "bg-primary text-primary-foreground rounded-br-sm"
                      : "bg-muted text-foreground rounded-bl-sm"
                  }`}
                >
                  {m.text}
                </div>
                {m.role === "user" && (
                  <div className="h-8 w-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center flex-shrink-0">
                    <UserIcon className="h-4 w-4" />
                  </div>
                )}
              </motion.div>
            ))}
            {isTyping && (
              <motion.div
                key="typing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex gap-3 justify-start"
              >
                <div className="h-8 w-8 rounded-full bg-primary/15 text-primary flex items-center justify-center flex-shrink-0">
                  <Bot className="h-4 w-4" />
                </div>
                <div className="bg-muted rounded-2xl rounded-bl-sm px-4 py-3 flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-muted-foreground/60 animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="h-2 w-2 rounded-full bg-muted-foreground/60 animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="h-2 w-2 rounded-full bg-muted-foreground/60 animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>

        {messages.length <= 1 && (
          <div className="px-6 pb-3 flex flex-wrap gap-2">
            {STARTERS.map(s => (
              <button
                key={s}
                onClick={() => send(s)}
                className="text-xs px-3 py-1.5 rounded-full border border-border bg-background hover:bg-accent hover:border-primary/40 transition-colors flex items-center gap-1.5"
              >
                <Sparkles className="h-3 w-3 text-primary" />
                {s}
              </button>
            ))}
          </div>
        )}

        <div className="border-t border-border p-4 flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                send(input);
              }
            }}
            placeholder="Ask anything about your startup..."
            className="flex-1"
          />
          <Button onClick={() => send(input)} disabled={!input.trim() || isTyping}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </Card>
    </div>
  );
}
