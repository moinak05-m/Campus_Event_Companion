import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlassCard } from "./GlassCard";
import { NeonButton } from "./NeonButton";
import { ConflictModal } from "./ConflictModal";
import { QRTicket } from "./QRTicket";
import { CalendarReminderModal } from "./CalendarReminderModal";
import { useRegistration } from "../../context/RegistrationContext";
import { X, CheckCircle, ShieldCheck, Zap, Download, Bell } from "lucide-react";
import confetti from "canvas-confetti";

export const RegistrationModal = ({ isOpen, onClose, eventTitle, eventDate, eventTime, eventLocation }) => {
  const { registerEvent, checkConflict } = useRegistration();
  const [isConflictOpen, setIsConflictOpen] = useState(false);
  const [isReminderOpen, setIsReminderOpen] = useState(false);
  const [conflictingEvent, setConflictingEvent] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const triggerConfetti = () => {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#7C3AED", "#06B6D4", "#F8FAFC"]
    });
  };

  const handleRegister = () => {
    const newEvent = {
      id: Math.random().toString(36).substr(2, 9),
      title: eventTitle,
      date: eventDate,
      time: eventTime,
      location: eventLocation
    };

    const conflict = checkConflict(newEvent);
    if (conflict) {
      setConflictingEvent(conflict);
      setIsConflictOpen(true);
      return;
    }

    registerEvent(newEvent);
    setIsSuccess(true);
    triggerConfetti();
  };

  return (
    <>
      <ConflictModal 
        isOpen={isConflictOpen} 
        onClose={() => setIsConflictOpen(false)} 
        conflictingEvent={conflictingEvent}
      />

      <CalendarReminderModal 
        isOpen={isReminderOpen}
        onClose={() => setIsReminderOpen(false)}
      />

      <AnimatePresence>
        {isOpen && !isConflictOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="absolute inset-0 bg-background/80 backdrop-blur-md"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="w-full max-w-2xl relative my-auto"
            >
              <GlassCard className="p-8 md:p-12 border-white/10 overflow-hidden">
                <button 
                  onClick={onClose}
                  className="absolute top-6 right-6 text-text-muted hover:text-white transition-all z-50"
                >
                  <X size={24} />
                </button>

                <div className="flex flex-col items-center text-center">
                  {!isSuccess ? (
                    <div className="max-w-md mx-auto">
                      <div className="w-20 h-20 bg-primary-purple/10 rounded-3xl flex items-center justify-center text-primary-purple mb-8 shadow-neon-purple animate-float mx-auto">
                        <ShieldCheck size={40} />
                      </div>

                      <h3 className="text-3xl font-black mb-4">Confirm Registration</h3>
                      <p className="text-text-muted mb-8 leading-relaxed">
                        You are about to register for <span className="text-primary-cyan font-bold">{eventTitle}</span>. 
                        A digital pass will be generated instantly.
                      </p>

                      <div className="w-full space-y-4 mb-10">
                        <BenefitItem label="Instant QR Pass Generation" />
                        <BenefitItem label="Automatic Calendar Reminder" />
                      </div>

                      <NeonButton onClick={handleRegister} className="w-full py-4 text-lg">
                        Secure My Spot Now
                      </NeonButton>
                      
                      <button 
                        onClick={onClose}
                        className="mt-6 text-sm font-bold text-text-muted hover:text-text-light transition-colors"
                      >
                        Cancel and Review
                      </button>
                    </div>
                  ) : (
                    <div className="w-full">
                      <motion.div 
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="mb-10"
                      >
                        <div className="w-16 h-16 bg-accent-success/20 rounded-full flex items-center justify-center text-accent-success mb-4 mx-auto shadow-[0_0_20px_rgba(34,197,94,0.3)]">
                          <CheckCircle size={32} />
                        </div>
                        <h3 className="text-3xl font-black mb-1">Registration Secured!</h3>
                        <p className="text-text-muted text-sm uppercase font-black tracking-widest">Boarding Pass Ready</p>
                      </motion.div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <QRTicket 
                          eventTitle={eventTitle}
                          eventDate={eventDate}
                          eventTime={eventTime}
                          eventLocation={eventLocation}
                        />

                        <div className="flex flex-col gap-6 text-left">
                          <GlassCard className="p-6 border-white/5 bg-white/[0.01]">
                            <h4 className="text-lg font-bold mb-4 flex items-center gap-2">
                              <Zap size={18} className="text-primary-cyan" /> Next Steps
                            </h4>
                            <ul className="space-y-4">
                              <NextStepItem 
                                icon={Download} 
                                label="Download PDF Pass" 
                                desc="For offline access"
                              />
                              <NextStepItem 
                                icon={Bell} 
                                label="Set AI Reminders" 
                                desc="Sync with your calendar"
                                onClick={() => setIsReminderOpen(true)}
                                active={true}
                              />
                            </ul>
                          </GlassCard>

                          <NeonButton onClick={onClose} className="w-full py-4">
                            Go to My Events
                          </NeonButton>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </GlassCard>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

const BenefitItem = ({ label }) => (
  <div className="flex items-center gap-3 glass p-4 rounded-xl border-white/5">
    <CheckCircle size={18} className="text-accent-success" />
    <span className="text-sm font-medium">{label}</span>
  </div>
);

const NextStepItem = ({ icon: Icon, label, desc, onClick, active = false }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-4 group text-left p-2 rounded-xl transition-all ${active ? "hover:bg-primary-cyan/5" : "hover:bg-white/5"}`}
  >
    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${active ? "bg-primary-cyan/10 text-primary-cyan shadow-neon-cyan/10" : "bg-white/5 text-text-muted group-hover:text-text-light"}`}>
      <Icon size={18} />
    </div>
    <div>
      <p className={`text-sm font-bold ${active ? "text-primary-cyan" : "group-hover:text-text-light"}`}>{label}</p>
      <p className="text-[10px] text-text-muted font-medium uppercase tracking-widest">{desc}</p>
    </div>
  </button>
);
