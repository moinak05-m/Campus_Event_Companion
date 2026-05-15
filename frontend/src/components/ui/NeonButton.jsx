import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";

export const NeonButton = ({ 
  children, 
  className, 
  variant = "primary", 
  onClick, 
  type = "button" 
}) => {
  const variants = {
    primary: "bg-neon-gradient text-white shadow-neon-purple hover:shadow-neon-cyan",
    secondary: "glass text-text-light hover:bg-white/10",
    outline: "border border-primary-purple/50 text-primary-purple hover:bg-primary-purple/10",
    ghost: "text-text-muted hover:text-text-light hover:bg-white/5",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      type={type}
      onClick={onClick}
      className={twMerge(
        "px-6 py-2.5 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2",
        variants[variant],
        className
      )}
    >
      {children}
    </motion.button>
  );
};
