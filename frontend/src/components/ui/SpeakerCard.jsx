import { motion } from "framer-motion";
import { GlassCard } from "./GlassCard";
import { Share2, Globe } from "lucide-react";

export const SpeakerCard = ({ name, role, company, image }) => {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="h-full"
    >
      <GlassCard className="p-0 overflow-hidden flex flex-col items-center group border-white/5 hover:border-primary-cyan/30 transition-all duration-500">
        <div className="relative w-full aspect-square overflow-hidden">
          <div className="absolute inset-0 bg-neon-gradient opacity-0 group-hover:opacity-20 transition-opacity z-10" />
          <img 
            src={image} 
            alt={name} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
          />
          
          {/* Social Links Overlay */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4 translate-y-12 group-hover:translate-y-0 transition-transform duration-300 z-20">
            <SocialIcon icon={Share2} />
            <SocialIcon icon={Globe} />
            <SocialIcon icon={Globe} />
          </div>
        </div>

        <div className="p-6 text-center">
          <h4 className="text-xl font-black mb-1 group-hover:text-primary-cyan transition-colors">{name}</h4>
          <p className="text-sm font-bold text-primary-purple mb-2">{role}</p>
          <p className="text-xs text-text-muted font-black uppercase tracking-widest">{company}</p>
        </div>
      </GlassCard>
    </motion.div>
  );
};

const SocialIcon = ({ icon: Icon }) => (
  <button className="glass p-2 rounded-xl hover:bg-white/20 text-white transition-all shadow-neon-purple/20">
    <Icon size={16} />
  </button>
);
