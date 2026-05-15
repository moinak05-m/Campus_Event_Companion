import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NeonButton } from "../components/ui/NeonButton";
import { GlassCard } from "../components/ui/GlassCard";
import { 
  Mail, 
  Lock, 
  Box, 
  Globe, 
  ArrowRight,
  Sparkles,
  Calendar,
  Zap
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const { login, register } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (isLogin) {
        await login(email, password);
        navigate("/dashboard/participant"); // Or check role and redirect accordingly
      } else {
        await register(name, email, password, "student"); // Default role
        navigate("/onboarding/role");
      }
    } catch (err) {
      setError(err.message || "Authentication failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Particles (Decorative) */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary-cyan/40 rounded-full"
            initial={{ 
              x: Math.random() * window.innerWidth, 
              y: Math.random() * window.innerHeight 
            }}
            animate={{ 
              y: [null, -100, null],
              opacity: [0, 0.5, 0]
            }}
            transition={{ 
              duration: 5 + Math.random() * 10, 
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>

      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        
        {/* Left Side: Cinematic Illustration */}
        <div className="hidden lg:flex flex-col items-start space-y-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl font-black mb-4">
              Join the <span className="text-primary-cyan">Network</span> <br />
              of the Future.
            </h2>
            <p className="text-text-muted text-lg max-w-md">
              Secure your spot in the most exclusive campus events with a single tap.
            </p>
          </motion.div>

          {/* Floating Event Cards */}
          <div className="relative w-full h-[400px]">
            <FloatingAuthCard 
              icon={<Zap className="text-accent-warning" />}
              title="Tech Expo 2026"
              time="Starts in 2h"
              delay={0}
              top="10%"
              left="10%"
            />
            <FloatingAuthCard 
              icon={<Calendar className="text-primary-purple" />}
              title="Design Sprint"
              time="Tomorrow, 10 AM"
              delay={1}
              top="40%"
              left="40%"
            />
            <FloatingAuthCard 
              icon={<Sparkles className="text-primary-cyan" />}
              title="AI Workshop"
              time="Join now"
              delay={2}
              top="70%"
              left="15%"
            />
          </div>
        </div>

        {/* Right Side: Auth Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <GlassCard className="p-10 border-white/5 bg-white/[0.02]">
            <div className="flex gap-8 mb-10 border-b border-white/10">
              <button 
                type="button"
                onClick={() => { setIsLogin(true); setError(""); }}
                className={`pb-4 text-sm font-bold tracking-widest uppercase transition-all ${isLogin ? "text-primary-cyan border-b-2 border-primary-cyan" : "text-text-muted hover:text-text-light"}`}
              >
                Login
              </button>
              <button 
                type="button"
                onClick={() => { setIsLogin(false); setError(""); }}
                className={`pb-4 text-sm font-bold tracking-widest uppercase transition-all ${!isLogin ? "text-primary-cyan border-b-2 border-primary-cyan" : "text-text-muted hover:text-text-light"}`}
              >
                Sign Up
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-accent-danger/10 border border-accent-danger/50 text-accent-danger text-sm rounded-xl p-3">
                  {error}
                </div>
              )}

              <AnimatePresence mode="wait">
                {!isLogin && (
                  <motion.div
                    key="name"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <label className="block text-xs font-bold uppercase text-text-muted mb-2 tracking-widest">Full Name</label>
                    <input 
                      type="text" 
                      placeholder="John Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required={!isLogin}
                      className="w-full glass border-white/10 rounded-xl px-4 py-3 text-sm focus:border-primary-cyan transition-colors"
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              <div>
                <label className="block text-xs font-bold uppercase text-text-muted mb-2 tracking-widest">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
                  <input 
                    type="email" 
                    placeholder="name@university.edu"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full glass border-white/10 rounded-xl pl-12 pr-4 py-3 text-sm focus:border-primary-cyan transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-text-muted mb-2 tracking-widest">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
                  <input 
                    type="password" 
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full glass border-white/10 rounded-xl pl-12 pr-4 py-3 text-sm focus:border-primary-cyan transition-colors"
                  />
                </div>
              </div>

              <NeonButton type="submit" disabled={loading} className="w-full py-4 text-lg mt-4">
                {loading ? "Processing..." : (isLogin ? "Welcome Back" : "Create Account")} {!loading && <ArrowRight size={20} />}
              </NeonButton>
            </form>

            <div className="mt-8">
              <div className="relative flex items-center justify-center mb-8">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/10"></div></div>
                <span className="relative px-4 text-xs font-bold text-text-muted glass uppercase tracking-widest">Or continue with</span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button className="glass flex items-center justify-center gap-2 py-3 rounded-xl hover:bg-white/10 transition-colors text-sm">
                  <Globe size={18} className="text-primary-cyan" /> Google
                </button>
                <button className="glass flex items-center justify-center gap-2 py-3 rounded-xl hover:bg-white/10 transition-colors text-sm">
                  <Box size={18} /> GitHub
                </button>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
};

const FloatingAuthCard = ({ icon, title, time, delay, top, left }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ 
      opacity: 1, 
      scale: 1,
      y: [0, -15, 0]
    }}
    transition={{ 
      opacity: { duration: 0.5, delay },
      scale: { duration: 0.5, delay },
      y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: delay * 0.5 }
    }}
    style={{ position: "absolute", top, left }}
    className="glass p-4 rounded-2xl flex items-center gap-4 min-w-[200px] border-white/10"
  >
    <div className="w-10 h-10 glass rounded-xl flex items-center justify-center text-xl">
      {icon}
    </div>
    <div>
      <p className="text-xs font-bold text-white">{title}</p>
      <p className="text-[10px] text-primary-cyan font-bold uppercase">{time}</p>
    </div>
  </motion.div>
);
