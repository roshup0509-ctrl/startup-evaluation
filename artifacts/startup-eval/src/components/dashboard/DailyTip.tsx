import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Lightbulb, RefreshCw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const TIPS = [
  { author: "Paul Graham", text: "Make something people want. Everything else is secondary." },
  { author: "Sam Altman", text: "It is much better to build something a small number of users love than something a large number kind of like." },
  { author: "Reid Hoffman", text: "If you are not embarrassed by the first version of your product, you have launched too late." },
  { author: "Marc Andreessen", text: "The only thing that matters is getting to product-market fit." },
  { author: "Peter Thiel", text: "Competition is for losers. Build a monopoly by going where no one else is." },
  { author: "Naval Ravikant", text: "Specific knowledge is found by pursuing your genuine curiosity." },
  { author: "Drew Houston", text: "Don't worry about failure; you only have to be right once." },
  { author: "Eric Ries", text: "If you cannot fail, you cannot learn." },
  { author: "Brian Chesky", text: "Build something 100 people love, not something 1 million people kind of like." },
  { author: "Steve Jobs", text: "Stay hungry, stay foolish." },
  { author: "Y Combinator", text: "Talk to users every day for the first six months. No exceptions." },
  { author: "Founder Wisdom", text: "Revenue cures most problems. Growth without revenue creates new ones." },
];

export default function DailyTip() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const day = Math.floor(Date.now() / 86400000);
    setIdx(day % TIPS.length);
  }, []);

  const next = () => setIdx((i) => (i + 1) % TIPS.length);
  const tip = TIPS[idx];

  return (
    <Card className="overflow-hidden border-amber-200/60 bg-gradient-to-br from-amber-50 via-white to-rose-50">
      <CardContent className="pt-6 relative">
        <div className="pointer-events-none absolute -top-8 -right-8 w-32 h-32 rounded-full bg-amber-200/40 blur-2xl" />
        <div className="relative flex items-start gap-4">
          <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-amber-400 to-rose-400 text-white flex items-center justify-center flex-shrink-0 shadow-md">
            <Lightbulb className="h-5 w-5" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2 mb-2">
              <p className="text-xs uppercase tracking-wider font-semibold text-amber-700">Founder Tip of the Day</p>
              <button
                onClick={next}
                className="text-amber-700 hover:text-amber-900 transition-colors p-1 rounded-md hover:bg-amber-100"
                aria-label="Next tip"
              >
                <RefreshCw className="h-3.5 w-3.5" />
              </button>
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25 }}
              >
                <p className="text-base text-slate-800 leading-relaxed font-medium">"{tip.text}"</p>
                <p className="text-sm text-slate-600 mt-2">— {tip.author}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
