import { motion, useScroll, useTransform } from "framer-motion";
import { NeonButton } from "./NeonButton";
import { Zap, Users } from "lucide-react";

export const StickyRegister = ({ eventTitle, seatsLeft, onRegister }) => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [300, 400], [100, 0]);
  const opacity = useTransform(scrollY, [300, 400], [0, 1]);

  return (
    <motion.div
      style={{ y, opacity }}
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[80] w-[90%] max-w-3xl"
    >
      <div className="glass p-4 rounded-[24px] border-primary-cyan/20 flex items-center justify-between gap-8 shadow-2xl backdrop-blur-2xl">
        <div className="hidden sm:flex items-center gap-4 pl-4">
          <div className="w-10 h-10 bg-primary-cyan/10 rounded-xl flex items-center justify-center text-primary-cyan">
            <Zap size={20} className="fill-current" />
          </div>
          <div>
            <p className="text-xs font-black uppercase tracking-widest text-text-muted">Registering for</p>
            <p className="text-sm font-bold truncate max-w-[200px]">{eventTitle}</p>
          </div>
        </div>

        <div className="flex items-center gap-6 pr-2">
          <div className="hidden md:flex flex-col items-end">
            <p className="text-[10px] font-black uppercase tracking-widest text-accent-warning">Hurrying Up!</p>
            <div className="flex items-center gap-1.5 text-text-light font-black text-sm">
              <Users size={14} /> {seatsLeft} Seats Left
            </div>
          </div>
          <NeonButton onClick={onRegister} className="px-10 py-3 shadow-neon-cyan">
            Claim Your Spot
          </NeonButton>
        </div>
      </div>
    </motion.div>
  );
};
