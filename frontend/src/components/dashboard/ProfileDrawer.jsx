import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, School, BookOpen, Star, Trophy, Calendar, Sparkles } from "lucide-react";
import { GlassCard } from "../ui/GlassCard";
import { CategoryChip } from "../ui/CategoryChip";
import { NeonButton } from "../ui/NeonButton";

export const ProfileDrawer = ({ isOpen, onClose }) => {
  const user = {
    name: "Rahul Sharma",
    dept: "Computer Science",
    college: "Institute of Engineering & Tech",
    email: "rahul.sharma@iet.edu",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul",
    interests: ["Hackathons", "AI/ML", "Coding", "Gaming"],
    stats: {
      attended: 12,
      points: "2.4k",
      badges: 8
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-background/60 backdrop-blur-md z-[100]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-screen w-full max-w-md glass border-l border-white/10 z-[101] shadow-2xl p-8 overflow-y-auto"
          >
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 text-text-muted hover:text-white transition-all"
            >
              <X size={24} />
            </button>

            {/* Profile Info */}
            <div className="flex flex-col items-center text-center mt-12 mb-10">
              <div className="relative mb-6">
                <div className="absolute -inset-2 bg-neon-gradient rounded-full blur-xl opacity-40 animate-pulse-glow" />
                <div className="relative w-32 h-32 rounded-full border-2 border-primary-cyan p-1 glass overflow-hidden">
                  <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full" />
                </div>
              </div>
              <h3 className="text-3xl font-black mb-1">{user.name}</h3>
              <p className="text-primary-cyan text-sm font-bold uppercase tracking-widest mb-6">Pro Member</p>
              
              <div className="space-y-3 w-full">
                <ProfileInfoItem icon={Mail} label={user.email} />
                <ProfileInfoItem icon={School} label={user.college} />
                <ProfileInfoItem icon={BookOpen} label={user.dept} />
              </div>
            </div>

            <hr className="border-white/5 mb-10" />

            {/* Statistics */}
            <div className="grid grid-cols-3 gap-4 mb-12">
              <StatItem icon={Calendar} value={user.stats.attended} label="Events" />
              <StatItem icon={Sparkles} value={user.stats.points} label="XP Points" />
              <StatItem icon={Trophy} value={user.stats.badges} label="Badges" />
            </div>

            {/* Interests */}
            <div className="mb-12">
              <h4 className="text-sm font-black uppercase tracking-widest mb-6 flex items-center gap-2">
                <Star size={14} className="text-accent-warning" /> Selected Interests
              </h4>
              <div className="flex flex-wrap gap-3">
                {user.interests.map(interest => (
                  <CategoryChip key={interest} label={interest} isSelected={true} />
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="mb-10">
              <h4 className="text-sm font-black uppercase tracking-widest mb-6">Recent Participation</h4>
              <div className="space-y-4">
                <ActivityItem title="Tech Expo 2026" status="Completed" date="May 10" />
                <ActivityItem title="AI Ethics Seminar" status="Attended" date="May 08" />
                <ActivityItem title="Sports Meet" status="Winner" date="May 05" color="text-accent-success" />
              </div>
            </div>

            <NeonButton className="w-full py-4 text-lg mt-auto">
              Edit Full Profile
            </NeonButton>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const ProfileInfoItem = ({ icon: Icon, label }) => (
  <div className="flex items-center gap-3 text-text-muted justify-center">
    <Icon size={16} className="text-primary-purple" />
    <span className="text-xs font-bold tracking-tight">{label}</span>
  </div>
);

const StatItem = ({ icon: Icon, value, label }) => (
  <div className="glass p-4 rounded-2xl text-center border-white/5 bg-white/[0.01]">
    <div className="flex justify-center mb-2 text-primary-cyan">
      <Icon size={18} />
    </div>
    <h5 className="text-lg font-black">{value}</h5>
    <p className="text-[10px] text-text-muted font-black uppercase">{label}</p>
  </div>
);

const ActivityItem = ({ title, status, date, color = "text-text-muted" }) => (
  <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/5">
    <div>
      <p className="text-sm font-bold">{title}</p>
      <p className="text-[10px] text-text-muted font-black uppercase">{date}</p>
    </div>
    <span className={`text-[10px] font-black uppercase ${color}`}>{status}</span>
  </div>
);
