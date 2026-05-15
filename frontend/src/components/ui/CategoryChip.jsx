import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";

export const CategoryChip = ({ label, icon: Icon, isSelected, onClick }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={twMerge(
        "flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-300",
        isSelected 
          ? "bg-neon-gradient border-transparent text-white shadow-neon-purple" 
          : "glass border-white/10 text-text-muted hover:border-white/20 hover:text-text-light"
      )}
    >
      {Icon && <Icon size={16} className={isSelected ? "text-white" : "text-primary-purple"} />}
      <span className="text-sm font-medium">{label}</span>
    </motion.button>
  );
};
