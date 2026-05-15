import { motion } from "framer-motion";
import { ParticipantSidebar } from "../components/dashboard/ParticipantSidebar";
import { CertificateCard } from "../components/ui/CertificateCard";
import { NeonButton } from "../components/ui/NeonButton";
import { 
  Award, 
  Upload, 
  Search, 
  Filter, 
  History, 
  Trophy,
  ShieldCheck,
  Star,
  Zap
} from "lucide-react";

const CERTIFICATES = [
  { id: 1, title: "AI Hackathon Winner", issuer: "Google Developer Group", date: "May 2026", type: "First Place" },
  { id: 2, title: "React Masterclass", issuer: "Meta University", date: "April 2026", type: "Participation" },
  { id: 3, title: "UI/UX Design Sprint", issuer: "Design Hub", date: "March 2026", type: "Special Mention" },
  { id: 4, title: "Cloud Computing 101", issuer: "AWS Academy", date: "Feb 2026", type: "Certificate" },
  { id: 5, title: "Cyber Security Workshop", issuer: "Defense Hub", date: "Jan 2026", type: "Participation" },
  { id: 6, title: "Open Source Contributor", issuer: "GitHub Campus", date: "Dec 2025", type: "Achievement" },
];

export const CertificatesVault = () => {
  return (
    <div className="flex min-h-screen bg-background">
      <ParticipantSidebar />

      <main className="flex-1 p-6 lg:p-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <header className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16">
            <div>
              <h1 className="text-4xl font-black mb-2 tracking-tight">Certificates <span className="text-primary-cyan">Vault</span></h1>
              <p className="text-text-muted text-sm font-medium">Manage and showcase your campus achievements.</p>
            </div>
            <div className="flex gap-4">
              <div className="relative hidden md:block">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
                <input 
                  type="text" 
                  placeholder="Search vault..." 
                  className="glass border-white/5 rounded-2xl pl-12 pr-4 py-3 w-64 focus:border-primary-cyan transition-all"
                />
              </div>
              <NeonButton className="px-6 py-3 text-sm">
                <Upload size={18} /> Upload New
              </NeonButton>
            </div>
          </header>

          {/* Quick Stats Banner */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <StatCard label="Total Certificates" value="12" icon={Award} color="purple" />
            <StatCard label="Achievements" value="08" icon={Trophy} color="cyan" />
            <StatCard label="Verified Hubs" value="04" icon={ShieldCheck} color="green" />
          </div>

          {/* Vault Section */}
          <section className="mb-20">
            <div className="flex items-center justify-between mb-10">
              <h3 className="text-xl font-black flex items-center gap-3">
                <History className="text-primary-cyan" size={20} /> Achievement History
              </h3>
              <div className="flex gap-2">
                <button className="glass px-4 py-2 rounded-xl text-xs font-bold text-text-light hover:bg-white/10">Recent</button>
                <button className="glass px-4 py-2 rounded-xl text-xs font-bold text-text-muted hover:text-white transition-all">Type</button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {CERTIFICATES.map((cert, index) => (
                <motion.div
                  key={cert.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <CertificateCard {...cert} />
                </motion.div>
              ))}
            </div>
          </section>

          {/* Badges Section */}
          <section>
            <h3 className="text-xl font-black mb-10 flex items-center gap-3">
              <Zap className="text-accent-warning" size={20} /> Earned Badges
            </h3>
            <div className="glass p-10 rounded-[32px] border-white/5 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <BadgeItem key={i} index={i} />
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

const StatCard = ({ label, value, icon: Icon, color }) => {
  const colors = {
    purple: "text-primary-purple bg-primary-purple/10",
    cyan: "text-primary-cyan bg-primary-cyan/10",
    green: "text-accent-success bg-accent-success/10",
  };

  return (
    <div className="glass p-6 rounded-3xl border-white/5 flex items-center gap-6 group hover:border-white/20 transition-all">
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 ${colors[color]}`}>
        <Icon size={28} />
      </div>
      <div>
        <h4 className="text-3xl font-black">{value}</h4>
        <p className="text-[10px] text-text-muted font-black uppercase tracking-widest">{label}</p>
      </div>
    </div>
  );
};

const BadgeItem = ({ index }) => (
  <motion.div 
    whileHover={{ y: -5, scale: 1.1 }}
    className="flex flex-col items-center gap-4 group cursor-pointer"
  >
    <div className="w-16 h-16 glass rounded-2xl border-accent-warning/20 flex items-center justify-center text-accent-warning group-hover:shadow-neon-purple transition-all relative">
      <Star size={32} />
      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-primary-cyan rounded-full border-2 border-background flex items-center justify-center text-[8px] font-black text-white">
        {index}
      </div>
    </div>
    <span className="text-[10px] font-black uppercase tracking-widest text-text-muted group-hover:text-white transition-colors">Elite Pro</span>
  </motion.div>
);
