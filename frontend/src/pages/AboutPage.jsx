import { motion } from "framer-motion";
import { GlassCard } from "../components/ui/GlassCard";
import { Sparkles, Globe, ShieldCheck, Trophy, Users } from "lucide-react";

export const AboutPage = () => {
  return (
    <div className="min-h-screen pt-32 pb-20 px-6 relative overflow-hidden bg-[#020617]">
      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-[20%] left-[10%] w-[30%] h-[30%] bg-primary-purple/20 blur-[120px] rounded-full animate-pulse-glow" />
        <div className="absolute bottom-[10%] right-[10%] w-[40%] h-[40%] bg-primary-cyan/10 blur-[120px] rounded-full animate-pulse-glow" />
      </div>

      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-[10px] font-black tracking-[0.2em] text-primary-cyan uppercase mb-6 border border-primary-cyan/20 shadow-neon-cyan/10">
            <Sparkles size={14} className="animate-pulse" /> Our Mission
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight tracking-tighter">
            Redefining the <br />
            <span className="bg-neon-gradient bg-clip-text text-transparent italic">Campus Experience.</span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <GlassCard className="p-8 md:p-12 border-white/5 shadow-2xl relative overflow-hidden">
            {/* Subtle inner glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary-cyan/5 blur-[80px] rounded-full" />
            
            <div className="relative z-10 space-y-8 text-lg md:text-xl text-text-muted leading-relaxed font-medium">
              <p>
                <strong className="text-white">Campus Companion</strong> is an AI-driven event ecosystem designed for the next generation of campus innovators. Our platform seamlessly bridges the gap between event organizers and students by providing real-time discovery, personalized scheduling, and a secure digital achievement vault.
              </p>
              <p>
                Whether you're hosting a massive university hackathon or attending a local workshop, Campus Companion empowers you to connect globally, track attendance instantly with QR verified passes, and seamlessly build your digital legacy.
              </p>
              <p>
                We believe that the best ideas are born when communities come together. We built this hub to ensure that no student misses out on the opportunities that could shape their future.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 relative z-10 border-t border-white/10 pt-12">
              <div className="flex flex-col items-center text-center gap-3">
                <div className="w-12 h-12 glass rounded-xl flex items-center justify-center text-primary-cyan shadow-neon-cyan/20">
                  <Globe size={24} />
                </div>
                <span className="text-sm font-bold uppercase tracking-widest text-white">Global Reach</span>
              </div>
              <div className="flex flex-col items-center text-center gap-3">
                <div className="w-12 h-12 glass rounded-xl flex items-center justify-center text-primary-purple shadow-neon-purple/20">
                  <ShieldCheck size={24} />
                </div>
                <span className="text-sm font-bold uppercase tracking-widest text-white">Verified</span>
              </div>
              <div className="flex flex-col items-center text-center gap-3">
                <div className="w-12 h-12 glass rounded-xl flex items-center justify-center text-accent-warning shadow-accent-warning/20">
                  <Trophy size={24} />
                </div>
                <span className="text-sm font-bold uppercase tracking-widest text-white">Achievements</span>
              </div>
              <div className="flex flex-col items-center text-center gap-3">
                <div className="w-12 h-12 glass rounded-xl flex items-center justify-center text-primary-cyan shadow-neon-cyan/20">
                  <Users size={24} />
                </div>
                <span className="text-sm font-bold uppercase tracking-widest text-white">Community</span>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
};
