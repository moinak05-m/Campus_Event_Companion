import { motion } from "framer-motion";

export const TimelineItem = ({ time, title, description, isLast }) => {
  return (
    <div className="flex gap-6 relative">
      {!isLast && (
        <div className="absolute left-[15px] top-8 bottom-0 w-[2px] bg-gradient-to-b from-primary-purple/50 to-transparent" />
      )}
      
      <div className="relative">
        <motion.div 
          whileHover={{ scale: 1.2 }}
          className="w-8 h-8 rounded-full glass border-primary-purple flex items-center justify-center z-10 relative"
        >
          <div className="w-2 h-2 bg-primary-purple rounded-full shadow-neon-purple" />
        </motion.div>
      </div>

      <div className="pb-12">
        <span className="text-xs font-black text-primary-cyan uppercase tracking-widest">{time}</span>
        <h4 className="text-xl font-bold mt-1 mb-2 text-text-light">{title}</h4>
        <p className="text-text-muted text-sm leading-relaxed max-w-md">
          {description}
        </p>
      </div>
    </div>
  );
};
