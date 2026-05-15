import { motion, AnimatePresence } from "framer-motion";
import { GlassCard } from "./GlassCard";
import { NeonButton } from "./NeonButton";
import { X, AlertTriangle, Calendar, Clock, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const ConflictModal = ({ isOpen, onClose, conflictingEvent }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[110] flex items-center justify-center p-6">
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-background/90 backdrop-blur-xl"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ 
            opacity: 1, 
            scale: 1, 
            y: 0,
            x: [0, -10, 10, -10, 10, 0], // Shake animation
          }}
          transition={{
            x: { duration: 0.4, times: [0, 0.2, 0.4, 0.6, 0.8, 1] },
            default: { duration: 0.3 }
          }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="w-full max-w-lg relative"
        >
          <GlassCard className="p-10 border-accent-danger/30 shadow-[0_0_50px_rgba(239,68,68,0.2)]">
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 text-text-muted hover:text-white transition-colors"
            >
              <X size={24} />
            </button>

            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-accent-danger/10 rounded-3xl flex items-center justify-center text-accent-danger mb-8 shadow-[0_0_30px_rgba(239,68,68,0.4)]">
                <AlertTriangle size={40} />
              </div>

              <h3 className="text-3xl font-black mb-4">Registration Conflict</h3>
              <p className="text-text-muted mb-8 leading-relaxed">
                You have already registered for another event during this time slot.
              </p>

              {/* Conflicting Event Card */}
              {conflictingEvent && (
                <div className="w-full glass p-6 rounded-2xl border-white/5 mb-10 text-left relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-5">
                    <Calendar size={80} />
                  </div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-primary-cyan mb-2">Existing Booking</p>
                  <h4 className="text-lg font-bold mb-4">{conflictingEvent.title}</h4>
                  <div className="flex gap-6">
                    <div className="flex items-center gap-2 text-xs text-text-muted">
                      <Calendar size={14} className="text-primary-purple" /> {conflictingEvent.date}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-text-muted">
                      <Clock size={14} className="text-primary-cyan" /> {conflictingEvent.time}
                    </div>
                  </div>
                </div>
              )}

              <p className="text-sm text-text-muted mb-8">
                Please complete or cancel your existing registration before registering for this event.
              </p>

              <div className="w-full flex flex-col gap-4">
                <NeonButton 
                  onClick={() => {
                    onClose();
                    navigate("/my-events");
                  }} 
                  className="w-full py-4 text-lg shadow-neon-purple"
                >
                  View My Events <ArrowRight size={20} className="ml-2" />
                </NeonButton>
                
                <button 
                  onClick={onClose}
                  className="mt-2 text-sm font-bold text-text-muted hover:text-text-light transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
