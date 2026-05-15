import { motion } from "framer-motion";
import { Clock, Zap, ArrowRight } from "lucide-react";
import { NeonButton } from "../ui/NeonButton";

export const TrendingBanner = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative w-full h-[350px] rounded-[32px] overflow-hidden group cursor-pointer"
    >
      {/* Background with Neon Overlay */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80')] bg-cover bg-center transition-transform duration-1000 group-hover:scale-105" />
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent z-10" />
      <div className="absolute inset-0 bg-neon-gradient opacity-10 z-10 mix-blend-overlay" />

      {/* Content */}
      <div className="relative z-20 h-full p-8 lg:p-12 flex flex-col justify-center max-w-2xl">
        <div className="flex items-center gap-2 mb-6">
          <span className="bg-primary-cyan/20 text-primary-cyan border border-primary-cyan/30 px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest">
            Trending Now
          </span>
          <div className="flex items-center gap-2 text-accent-warning glass px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest">
            <Clock size={14} /> 02:45:12
          </div>
        </div>

        <h2 className="text-4xl lg:text-5xl font-black mb-6 leading-tight">
          Global AI <br />
          <span className="text-primary-purple">Hackathon</span> 2026
        </h2>

        <p className="text-text-muted text-sm lg:text-base mb-10 line-clamp-2 max-w-md">
          Join 5000+ innovators to build the next generation of AI solutions. 
          Winning teams get exclusive mentorship from Silicon Valley experts.
        </p>

        <div className="flex items-center gap-6">
          <NeonButton className="px-8 py-3">
            Register Now <ArrowRight size={18} />
          </NeonButton>
          <div className="flex -space-x-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="w-8 h-8 rounded-full border-2 border-background bg-white/10 glass overflow-hidden">
                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i + 10}`} alt="user" />
              </div>
            ))}
            <div className="w-8 h-8 rounded-full border-2 border-background bg-glass glass flex items-center justify-center text-[10px] font-bold text-text-muted">
              +2k
            </div>
          </div>
        </div>
      </div>

      {/* Animated Glow Ornament */}
      <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-primary-purple/20 blur-[100px] rounded-full z-0 animate-pulse-glow" />
    </motion.div>
  );
};
