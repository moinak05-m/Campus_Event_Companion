import { useState } from "react";
import { motion } from "framer-motion";
import { CategoryChip } from "../components/ui/CategoryChip";
import { NeonButton } from "../components/ui/NeonButton";
import { 
  Code, 
  Cpu, 
  Terminal, 
  Palette, 
  Camera, 
  Music, 
  Trophy, 
  Users, 
  Lightbulb, 
  Gamepad2, 
  Presentation, 
  BookOpen,
  ArrowRight,
  Sparkles
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const INTERESTS = [
  { id: "hackathons", label: "Hackathons", icon: Code },
  { id: "ai-ml", label: "AI/ML", icon: Cpu },
  { id: "coding", label: "Coding", icon: Terminal },
  { id: "workshops", label: "Workshops", icon: BookOpen },
  { id: "seminars", label: "Seminars", icon: Presentation },
  { id: "cultural", label: "Cultural Programs", icon: Sparkles },
  { id: "sports", label: "Sports", icon: Trophy },
  { id: "placement", label: "Placement Drives", icon: Users },
  { id: "quizzes", label: "Quizzes", icon: Lightbulb },
  { id: "entrepreneurship", label: "Entrepreneurship", icon: Presentation },
  { id: "gaming", label: "Gaming", icon: Gamepad2 },
  { id: "music", label: "Music", icon: Music },
  { id: "photography", label: "Photography", icon: Camera },
  { id: "design", label: "Design", icon: Palette },
];

export const InterestSelection = () => {
  const [selected, setSelected] = useState([]);
  const navigate = useNavigate();

  const toggleInterest = (id) => {
    setSelected(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-5xl w-full"
      >
        <span className="glass px-4 py-2 rounded-full text-xs font-bold tracking-widest text-primary-cyan uppercase mb-6 inline-block">
          Step 2: Personalize Feed
        </span>
        <h2 className="text-5xl font-black mb-6 leading-tight">
          What <span className="text-primary-cyan">interests</span> you most?
        </h2>
        <p className="text-text-muted text-lg mb-12 max-w-2xl mx-auto">
          Our AI will use these to recommend events that match your profile and career goals.
        </p>

        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {INTERESTS.map((interest) => (
            <CategoryChip 
              key={interest.id}
              label={interest.label}
              icon={interest.icon}
              isSelected={selected.includes(interest.id)}
              onClick={() => toggleInterest(interest.id)}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: selected.length > 0 ? 1 : 0.5 }}
        >
          <NeonButton 
            onClick={() => navigate("/dashboard/participant")}
            className="px-12 py-4 text-xl"
            disabled={selected.length === 0}
          >
            Enter Dashboard <ArrowRight size={24} />
          </NeonButton>
          <p className="mt-4 text-text-muted text-sm font-medium">
            {selected.length} interests selected
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};
