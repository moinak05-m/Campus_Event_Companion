import { motion, AnimatePresence } from "framer-motion";
import { OrganizerSidebar } from "../components/organizer/OrganizerSidebar";
import { GlassCard } from "../components/ui/GlassCard";
import { NeonButton } from "../components/ui/NeonButton";
import { 
  QrCode, 
  Camera, 
  Zap, 
  ShieldCheck, 
  X, 
  Maximize, 
  Flashlight,
  User,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import { useState } from "react";

export const QRScanner = () => {
  const [isScanning, setIsScanning] = useState(true);
  const [scanResult, setScanResult] = useState(null);

  const simulateScan = () => {
    setIsScanning(false);
    setTimeout(() => {
      setScanResult({
        participant: "Arjun Patel",
        event: "Global AI Hackathon 2026",
        id: "TKT-XZ892K0L",
        status: "success"
      });
    }, 800);
  };

  return (
    <div className="flex min-h-screen bg-background">
      <OrganizerSidebar />

      <main className="flex-1 p-6 lg:p-10 flex flex-col">
        <div className="max-w-4xl mx-auto w-full flex-1 flex flex-col">
          {/* Header */}
          <header className="mb-12 text-center lg:text-left">
            <h1 className="text-4xl font-black mb-2 tracking-tight">Attendance <span className="text-primary-cyan italic">Scanner</span></h1>
            <p className="text-text-muted text-sm font-medium uppercase tracking-[0.2em]">Real-time Verification Protocol</p>
          </header>

          <div className="flex-1 flex items-center justify-center">
            <div className="relative w-full max-w-lg aspect-square">
              {/* Scanner Frame */}
              <div className="absolute inset-0 border-2 border-white/5 rounded-[40px] glass z-0 overflow-hidden">
                {/* Camera Mockup Background */}
                <div className="absolute inset-0 bg-slate-900 flex items-center justify-center">
                  <div className="w-full h-full opacity-20 bg-[url('https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80')] bg-cover bg-center" />
                  <Camera size={64} className="text-white/10 absolute animate-pulse" />
                </div>
                
                {/* Scan Line Animation */}
                {isScanning && (
                  <motion.div 
                    initial={{ top: "0%" }}
                    animate={{ top: "100%" }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="absolute left-0 right-0 h-1 bg-primary-cyan shadow-[0_0_20px_#06B6D4] z-20"
                  />
                )}

                {/* Corner Accents */}
                <div className="absolute top-8 left-8 w-12 h-12 border-t-4 border-l-4 border-primary-cyan rounded-tl-2xl z-30 shadow-neon-cyan/40" />
                <div className="absolute top-8 right-8 w-12 h-12 border-t-4 border-r-4 border-primary-cyan rounded-tr-2xl z-30 shadow-neon-cyan/40" />
                <div className="absolute bottom-8 left-8 w-12 h-12 border-b-4 border-l-4 border-primary-cyan rounded-bl-2xl z-30 shadow-neon-cyan/40" />
                <div className="absolute bottom-8 right-8 w-12 h-12 border-b-4 border-r-4 border-primary-cyan rounded-br-2xl z-30 shadow-neon-cyan/40" />
              </div>

              {/* Controls */}
              <div className="absolute -bottom-20 left-0 right-0 flex justify-center gap-6">
                <button className="glass p-5 rounded-3xl hover:text-primary-cyan transition-all border-white/5">
                  <Flashlight size={24} />
                </button>
                <NeonButton onClick={simulateScan} className="px-10 py-5 text-lg shadow-neon-cyan">
                  {isScanning ? "Capture Pass" : "Re-initialize"}
                </NeonButton>
                <button className="glass p-5 rounded-3xl hover:text-primary-cyan transition-all border-white/5">
                  <Maximize size={24} />
                </button>
              </div>

              {/* Status Indicator */}
              <div className="absolute top-12 left-1/2 -translate-x-1/2 glass px-6 py-2 rounded-full border-primary-cyan/20 flex items-center gap-2 z-40">
                <div className="w-2 h-2 bg-primary-cyan rounded-full animate-pulse shadow-neon-cyan" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white">System Active</span>
              </div>
            </div>
          </div>

          {/* Verification Popup */}
          <AnimatePresence>
            {scanResult && (
              <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setScanResult(null)}
                  className="absolute inset-0 bg-background/80 backdrop-blur-xl"
                />
                
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 20 }}
                  className="w-full max-w-md relative"
                >
                  <GlassCard className="p-8 border-accent-success/20 shadow-[0_0_50px_rgba(34,197,94,0.1)]">
                    <button 
                      onClick={() => { setScanResult(null); setIsScanning(true); }}
                      className="absolute top-4 right-4 text-text-muted hover:text-white transition-all"
                    >
                      <X size={24} />
                    </button>

                    <div className="flex flex-col items-center text-center">
                      <div className="w-20 h-20 bg-accent-success/10 rounded-full flex items-center justify-center text-accent-success mb-6 shadow-[0_0_30px_rgba(34,197,94,0.3)]">
                        <CheckCircle size={40} />
                      </div>

                      <h3 className="text-3xl font-black mb-2">Verified!</h3>
                      <p className="text-text-muted text-sm font-black uppercase tracking-widest mb-8">Access Granted</p>

                      <div className="w-full glass p-6 rounded-2xl border-white/5 text-left space-y-4 mb-8">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center overflow-hidden">
                            <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${scanResult.participant}`} alt="avatar" />
                          </div>
                          <div>
                            <p className="text-[10px] text-text-muted font-black uppercase tracking-widest">Participant</p>
                            <p className="font-bold text-lg">{scanResult.participant}</p>
                          </div>
                        </div>
                        <hr className="border-white/5" />
                        <div>
                          <p className="text-[10px] text-text-muted font-black uppercase tracking-widest">Event Hub</p>
                          <p className="font-bold text-sm text-primary-cyan">{scanResult.event}</p>
                        </div>
                        <div className="flex justify-between items-center pt-2">
                          <span className="text-[10px] font-black text-text-muted uppercase tracking-widest">Pass ID</span>
                          <span className="text-xs font-mono font-bold text-primary-purple">{scanResult.id}</span>
                        </div>
                      </div>

                      <NeonButton 
                        onClick={() => { setScanResult(null); setIsScanning(true); }}
                        className="w-full py-4 text-lg"
                      >
                        Scan Next Pass
                      </NeonButton>
                    </div>
                  </GlassCard>
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};
