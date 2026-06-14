import { initialIdeaBank } from "@/lib/seed";
import IdeaCard from "@/components/ideabank/IdeaCard";
import { motion } from "framer-motion";
import PageHero from "@/components/layout/PageHero";
import { Library } from "lucide-react";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function IdeaBank() {
  return (
    <motion.div 
      initial="hidden"
      animate="show"
      variants={container}
      className="space-y-8"
    >
      <PageHero
        accent="cyan"
        icon={Library}
        eyebrow="Inspiration"
        title="Idea Bank"
        subtitle="Browse trending startup concepts with high market potential. Use these as a starting point or evaluate them directly."
      />

      <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {initialIdeaBank.map((idea) => (
          <IdeaCard key={idea.id} idea={idea} />
        ))}
      </motion.div>
    </motion.div>
  );
}
