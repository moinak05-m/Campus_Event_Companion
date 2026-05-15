import { motion } from "framer-motion";
import { GlassCard } from "./GlassCard";
import { Download, Eye, Award, ExternalLink } from "lucide-react";
import { NeonButton } from "./NeonButton";

export const CertificateCard = ({ title, issuer, date, type }) => {
  return (
    <GlassCard className="p-0 overflow-hidden flex flex-col group border-white/5 hover:border-primary-cyan/30 transition-all duration-500">
      {/* Preview Area */}
      <div className="relative h-44 bg-gradient-to-br from-primary-purple/20 to-primary-cyan/20 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-neon-gradient opacity-0 group-hover:opacity-10 transition-opacity" />
        <motion.div 
          whileHover={{ rotate: 5, scale: 1.1 }}
          className="w-24 h-32 bg-white/10 glass border-white/20 rounded shadow-2xl flex flex-col items-center justify-center p-4 relative"
        >
          <Award size={32} className="text-accent-warning mb-2" />
          <div className="w-12 h-1 bg-primary-cyan/30 rounded-full mb-1" />
          <div className="w-12 h-1 bg-white/10 rounded-full mb-1" />
          <div className="w-8 h-1 bg-white/10 rounded-full" />
          <div className="absolute bottom-2 right-2 w-4 h-4 rounded-full border border-primary-purple/30" />
        </motion.div>
        
        {/* Hover Actions */}
        <div className="absolute inset-0 bg-background/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-4">
          <button className="glass p-3 rounded-full hover:bg-white/20 text-white transition-all">
            <Eye size={20} />
          </button>
          <button className="bg-primary-cyan p-3 rounded-full hover:bg-primary-cyan/80 text-white transition-all shadow-neon-cyan">
            <Download size={20} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary-cyan bg-primary-cyan/10 px-2 py-0.5 rounded">
            {type}
          </span>
          <span className="text-[10px] font-black text-text-muted">{date}</span>
        </div>
        <h4 className="text-lg font-black mb-1 group-hover:text-primary-cyan transition-colors line-clamp-1">{title}</h4>
        <p className="text-xs text-text-muted font-bold uppercase tracking-widest">{issuer}</p>
      </div>

      {/* Bottom Action */}
      <div className="px-6 pb-6 mt-auto">
        <button className="w-full glass py-2.5 rounded-xl text-xs font-black uppercase tracking-widest text-text-muted hover:text-white hover:bg-white/5 flex items-center justify-center gap-2 transition-all">
          Verify Link <ExternalLink size={14} />
        </button>
      </div>
    </GlassCard>
  );
};
