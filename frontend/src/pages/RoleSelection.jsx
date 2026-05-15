import { useState } from "react";
import { motion } from "framer-motion";
import { RoleCard } from "../components/ui/RoleCard";
import { NeonButton } from "../components/ui/NeonButton";
import { 
  User, 
  ShieldCheck, 
  ArrowRight,
  Sparkles
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export const RoleSelection = () => {
  const [selectedRole, setSelectedRole] = useState(null);
  const navigate = useNavigate();

  const handleContinue = () => {
    if (selectedRole === "participant") {
      navigate("/onboarding/interests");
    } else {
      navigate("/dashboard/organizer");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl w-full"
      >
        <span className="glass px-4 py-2 rounded-full text-xs font-bold tracking-widest text-primary-purple uppercase mb-6 inline-block">
          Step 1: Choose Your Path
        </span>
        <h2 className="text-5xl font-black mb-6">
          How will you <span className="text-primary-purple">experience</span> the campus?
        </h2>
        <p className="text-text-muted text-lg mb-16 max-w-2xl mx-auto">
          Tailor your experience. Participants join events, while organizers create and manage them.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <RoleCard 
            title="Participant"
            description="Explore events, join hackathons, and build your portfolio with exclusive certificates."
            icon={User}
            isSelected={selectedRole === "participant"}
            onClick={() => setSelectedRole("participant")}
          />
          <RoleCard 
            title="Organizer"
            description="Create events, manage registrations, and track analytics for your campus community."
            icon={ShieldCheck}
            isSelected={selectedRole === "organizer"}
            onClick={() => setSelectedRole("organizer")}
          />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: selectedRole ? 1 : 0 }}
        >
          <NeonButton 
            onClick={handleContinue}
            className="px-12 py-4 text-xl"
            disabled={!selectedRole}
          >
            Continue Journey <ArrowRight size={24} />
          </NeonButton>
        </motion.div>
      </motion.div>
    </div>
  );
};
