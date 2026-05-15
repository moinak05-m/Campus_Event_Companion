import { motion } from "framer-motion";
import { GlassCard } from "../ui/GlassCard";
import { TrendingUp, TrendingDown } from "lucide-react";

export const AnalyticsCard = ({ label, value, trend, icon: Icon, color = "purple" }) => {
  const colors = {
    purple: "text-primary-purple bg-primary-purple/10 border-primary-purple/20 shadow-neon-purple/20",
    cyan: "text-primary-cyan bg-primary-cyan/10 border-primary-cyan/20 shadow-neon-cyan/20",
    green: "text-accent-success bg-accent-success/10 border-accent-success/20 shadow-accent-success/20",
    orange: "text-accent-warning bg-accent-warning/10 border-accent-warning/20 shadow-accent-warning/20",
    red: "text-accent-danger bg-accent-danger/10 border-accent-danger/20 shadow-accent-danger/20",
  };

  const isPositive = trend > 0;

  return (
    <GlassCard className="p-6 border-white/5 group hover:border-white/10 transition-all">
      <div className="flex items-start justify-between mb-6">
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 ${colors[color]}`}>
          <Icon size={24} />
        </div>
        <div className={`flex items-center gap-1 text-[10px] font-black uppercase tracking-widest ${isPositive ? "text-accent-success" : "text-accent-danger"}`}>
          {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
          {Math.abs(trend)}%
        </div>
      </div>
      
      <div>
        <h4 className="text-3xl font-black mb-1 tracking-tight">{value}</h4>
        <p className="text-[10px] text-text-muted font-black uppercase tracking-widest opacity-70">{label}</p>
      </div>

      {/* Background Glow */}
      <div className={`absolute -bottom-4 -right-4 w-20 h-20 blur-3xl opacity-0 group-hover:opacity-20 transition-opacity rounded-full ${colors[color]}`} />
    </GlassCard>
  );
};
