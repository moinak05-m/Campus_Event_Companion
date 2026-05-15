import { motion } from "framer-motion";
import { GlassCard } from "../ui/GlassCard";
import { Bell, Trophy, Calendar, ChevronRight, Star } from "lucide-react";

export const ProfilePanel = () => {
  return (
    <div className="w-[380px] h-screen sticky top-0 hidden xl:flex flex-col p-8 glass border-l border-white/5 overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <h3 className="text-xl font-black tracking-tight">Profile</h3>
        <button className="relative glass p-2.5 rounded-xl hover:bg-white/10 transition-all text-text-muted">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-accent-danger rounded-full" />
        </button>
      </div>

      {/* User Info */}
      <div className="text-center mb-10">
        <div className="relative inline-block mb-6">
          <div className="absolute -inset-2 bg-neon-gradient rounded-full blur-lg opacity-40 animate-pulse-glow" />
          <div className="relative w-24 h-24 rounded-full border-2 border-primary-cyan p-1 glass overflow-hidden">
            <img 
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul" 
              alt="Avatar" 
              className="w-full h-full rounded-full object-cover"
            />
          </div>
          <div className="absolute bottom-0 right-0 w-8 h-8 bg-background border border-white/10 rounded-full flex items-center justify-center text-accent-warning">
            <Star size={14} fill="currentColor" />
          </div>
        </div>
        <h4 className="text-2xl font-black mb-1">Rahul Sharma</h4>
        <p className="text-text-muted text-xs font-bold uppercase tracking-widest">Tech Enthusiast • CS 2026</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4 mb-10">
        <div className="glass p-4 rounded-2xl text-center border-white/5">
          <h5 className="text-lg font-black text-primary-purple mb-1">12</h5>
          <p className="text-[10px] text-text-muted font-black uppercase">Events Joined</p>
        </div>
        <div className="glass p-4 rounded-2xl text-center border-white/5">
          <h5 className="text-lg font-black text-primary-cyan mb-1">2.4k</h5>
          <p className="text-[10px] text-text-muted font-black uppercase">XP Points</p>
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-6">
          <h5 className="text-sm font-black uppercase tracking-widest">Upcoming Deadlines</h5>
          <button className="text-[10px] font-bold text-primary-cyan uppercase">See All</button>
        </div>
        <div className="space-y-4">
          <DeadlineItem title="Hackathon Submission" date="Tomorrow, 11:59 PM" color="red" />
          <DeadlineItem title="Quiz: AI Ethics" date="May 18, 10:00 AM" color="yellow" />
          <DeadlineItem title="Cultural Fest" date="May 20, All Day" color="purple" />
        </div>
      </div>

      {/* Achievements */}
      <div className="mt-auto">
        <h5 className="text-sm font-black uppercase tracking-widest mb-6">Recent Badges</h5>
        <div className="flex gap-4">
          {[1, 2, 3].map((i) => (
            <motion.div 
              key={i}
              whileHover={{ rotate: 10, scale: 1.1 }}
              className="w-12 h-12 glass rounded-xl flex items-center justify-center text-accent-warning shadow-neon-cyan/20 border-white/10"
            >
              <Trophy size={20} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

const DeadlineItem = ({ title, date, color }) => {
  const colors = {
    red: "text-accent-danger bg-accent-danger/10",
    yellow: "text-accent-warning bg-accent-warning/10",
    purple: "text-primary-purple bg-primary-purple/10",
  };

  return (
    <div className="flex items-center gap-4 group cursor-pointer">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${colors[color]}`}>
        <Calendar size={18} />
      </div>
      <div className="flex-1">
        <p className="text-sm font-bold group-hover:text-primary-cyan transition-colors">{title}</p>
        <p className="text-[10px] text-text-muted font-medium">{date}</p>
      </div>
      <ChevronRight size={14} className="text-text-muted opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  );
};
