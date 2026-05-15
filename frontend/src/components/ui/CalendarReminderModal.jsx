import { motion, AnimatePresence } from "framer-motion";
import { GlassCard } from "./GlassCard";
import { NeonButton } from "./NeonButton";
import { X, Calendar, Bell, Check, Sparkles } from "lucide-react";
import { useState } from "react";

export const CalendarReminderModal = ({ isOpen, onClose }) => {
  const [selected, setSelected] = useState("1-hour");

  const options = [
    { id: "1-day", label: "1 Day Before", desc: "For full mental prep" },
    { id: "1-hour", label: "1 Hour Before", desc: "Time to head to venue" },
    { id: "15-min", label: "15 Minutes Before", desc: "Immediate reminder" },
  ];

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[120] flex items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-background/80 backdrop-blur-xl"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="w-full max-w-md relative"
        >
          <GlassCard className="p-8 border-white/10">
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 text-text-muted hover:text-white transition-all"
            >
              <X size={20} />
            </button>

            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-primary-cyan/10 rounded-2xl flex items-center justify-center text-primary-cyan mb-6 shadow-neon-cyan/20">
                <Bell size={32} />
              </div>
              
              <h3 className="text-2xl font-black mb-2">Smart Reminders</h3>
              <p className="text-text-muted text-sm mb-8">AI-optimized scheduling to ensure you never miss a session.</p>

              <div className="w-full space-y-3 mb-10">
                {options.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setSelected(opt.id)}
                    className={`w-full p-4 rounded-2xl border transition-all duration-300 flex items-center justify-between group ${
                      selected === opt.id 
                        ? "bg-primary-cyan/10 border-primary-cyan/40 shadow-neon-cyan/10" 
                        : "glass border-white/5 hover:border-white/10"
                    }`}
                  >
                    <div className="flex items-center gap-4 text-left">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                        selected === opt.id ? "bg-primary-cyan text-white" : "bg-white/5 text-text-muted group-hover:text-text-light"
                      }`}>
                        <Calendar size={18} />
                      </div>
                      <div>
                        <p className={`text-sm font-bold ${selected === opt.id ? "text-white" : "text-text-muted group-hover:text-text-light"}`}>{opt.label}</p>
                        <p className="text-[10px] text-text-muted font-medium uppercase tracking-widest">{opt.desc}</p>
                      </div>
                    </div>
                    {selected === opt.id && <Check size={18} className="text-primary-cyan" />}
                  </button>
                ))}
              </div>

              <NeonButton onClick={onClose} className="w-full py-4 text-lg">
                <Sparkles size={20} className="mr-2" /> Sync with AI Calendar
              </NeonButton>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
