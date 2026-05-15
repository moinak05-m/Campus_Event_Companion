import { motion, useScroll, useTransform } from "framer-motion";
import { NeonButton } from "../components/ui/NeonButton";
import { GlassCard } from "../components/ui/GlassCard";
import { 
  Zap, 
  Calendar, 
  Users, 
  Award, 
  ChevronRight, 
  Star,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Globe,
  Trophy,
  MousePointer2
} from "lucide-react";
import { Link } from "react-router-dom";

export const LandingPage = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#020617]">
      {/* Cinematic Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary-purple/20 blur-[120px] rounded-full animate-pulse-glow" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary-cyan/20 blur-[120px] rounded-full animate-pulse-glow" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03]" />
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 px-6">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-[10px] font-black tracking-[0.2em] text-primary-cyan uppercase mb-8 border border-primary-cyan/20 shadow-neon-cyan/10">
              <Sparkles size={14} className="animate-pulse" /> AI-Driven Event Ecosystem
            </div>
            <h1 className="text-6xl md:text-8xl font-black mb-8 leading-[0.95] tracking-tighter">
              The Next <br />
              <span className="bg-neon-gradient bg-clip-text text-transparent italic">Dimension</span> <br />
              of Campus Life.
            </h1>
            <p className="text-xl text-text-muted max-w-xl mb-12 leading-relaxed font-medium">
              Join the elite circle of campus innovators. Real-time discovery, 
              AI-personalized scheduling, and digital achievement vaults.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <Link to="/auth">
                <NeonButton className="px-10 py-5 text-lg shadow-neon-purple group">
                  Enter The Hub <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </NeonButton>
              </Link>
              <div className="flex -space-x-4">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-background glass overflow-hidden">
                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`} alt="user" />
                  </div>
                ))}
                <div className="w-10 h-10 rounded-full border-2 border-background glass flex items-center justify-center text-[10px] font-bold text-primary-cyan">
                  12k+
                </div>
              </div>
            </div>
          </motion.div>

          {/* Floating Mockup */}
          <motion.div
            style={{ y: y1 }}
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.2, ease: "backOut" }}
            className="relative hidden lg:block"
          >
            <div className="absolute inset-0 bg-neon-gradient blur-[80px] opacity-20 rounded-full animate-pulse" />
            <div className="relative glass p-4 rounded-[48px] border-white/10 shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-700">
              <img 
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000" 
                alt="App Mockup" 
                className="rounded-[36px] shadow-2xl border border-white/5"
              />
              {/* Floating Notifications */}
              <motion.div 
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -left-12 top-1/4 glass p-4 rounded-2xl border-primary-cyan/20 shadow-neon-cyan/20"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary-cyan/20 rounded-lg flex items-center justify-center text-primary-cyan">
                    <Zap size={16} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase text-white">Event Live</p>
                    <p className="text-[8px] text-text-muted">AI Hackathon starts now</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-40 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">Everything You Need <br /> To <span className="text-primary-cyan italic">Excel.</span></h2>
            <p className="text-text-muted max-w-2xl mx-auto font-medium">A complete ecosystem for modern students and event organizers.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard 
              icon={<Globe className="text-primary-purple" />}
              title="Global Network"
              desc="Connect with participants across universities worldwide."
            />
            <FeatureCard 
              icon={<ShieldCheck className="text-primary-cyan" />}
              title="Verified Passes"
              desc="Digital QR tickets for instant, secure entry to every event."
            />
            <FeatureCard 
              icon={<Trophy className="text-accent-warning" />}
              title="Achievement Vault"
              desc="Automatically store and showcase your event certificates."
            />
            <FeatureCard 
              icon={<MousePointer2 className="text-primary-cyan" />}
              title="Smart Discovery"
              desc="AI-driven recommendations tailored to your unique profile."
            />
          </div>
        </div>
      </section>

      {/* Interactive Ticker */}
      <section className="py-20 glass border-y border-white/5 overflow-hidden">
        <div className="flex gap-20 whitespace-nowrap animate-infinite-scroll">
          {[1,2,3,4,5].map(i => (
            <div key={i} className="flex items-center gap-10">
              <span className="text-6xl font-black text-white/5 uppercase tracking-tighter">AI HACKATHON 2026</span>
              <Sparkles className="text-primary-cyan opacity-20" size={32} />
              <span className="text-6xl font-black text-white/5 uppercase tracking-tighter">NEON BEATS FEST</span>
              <Sparkles className="text-primary-purple opacity-20" size={32} />
              <span className="text-6xl font-black text-white/5 uppercase tracking-tighter">WEB3 SUMMIT</span>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-40 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="relative glass p-12 md:p-24 rounded-[64px] border-primary-cyan/20 text-center overflow-hidden group">
            <div className="absolute inset-0 bg-neon-gradient opacity-0 group-hover:opacity-10 transition-opacity duration-700" />
            <h2 className="text-5xl md:text-7xl font-black mb-8 leading-tight tracking-tighter">Ready to Claim Your <br /> Future?</h2>
            <p className="text-xl text-text-muted mb-12 max-w-xl mx-auto font-medium">Join thousands of students building their legacy today.</p>
            <Link to="/auth">
              <NeonButton className="px-16 py-6 text-xl shadow-neon-cyan">
                Launch Dashboard
              </NeonButton>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-white/5 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col items-center md:items-start gap-2">
            <span className="text-2xl font-black tracking-tighter">CAMPUS<span className="text-primary-cyan">COMPANION</span></span>
            <p className="text-xs text-text-muted font-bold uppercase tracking-widest">Built for the next generation of leaders.</p>
          </div>
          <div className="flex gap-8 text-xs font-black uppercase tracking-widest text-text-muted">
            <button className="hover:text-primary-cyan transition-colors">Privacy</button>
            <button className="hover:text-primary-cyan transition-colors">Terms</button>
            <button className="hover:text-primary-cyan transition-colors">Support</button>
          </div>
          <p className="text-[10px] text-text-muted font-black">© 2026 CAMPUS COMPANION. ALL RIGHTS RESERVED.</p>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, desc }) => (
  <GlassCard className="p-10 border-white/5 hover:border-primary-cyan/20 transition-all group">
    <div className="w-16 h-16 glass rounded-2xl flex items-center justify-center mb-8 group-hover:shadow-neon-cyan/20 transition-all">
      {icon}
    </div>
    <h3 className="text-2xl font-black mb-4 group-hover:text-primary-cyan transition-colors">{title}</h3>
    <p className="text-text-muted text-sm font-medium leading-relaxed">{desc}</p>
  </GlassCard>
);
