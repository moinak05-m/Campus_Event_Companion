import { motion } from "framer-motion";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const GlassCard = ({ children, className, delay = 0, hover = true }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={hover ? { y: -5, borderColor: "rgba(255, 255, 255, 0.2)" } : {}}
      className={twMerge(
        "glass-card",
        className
      )}
    >
      {children}
    </motion.div>
  );
};
