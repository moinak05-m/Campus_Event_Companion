import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";

export const RoleCard = ({ title, description, icon: Icon, isSelected, onClick }) => {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={twMerge(
        "cursor-pointer group relative p-8 rounded-3xl transition-all duration-500",
        isSelected 
          ? "glass border-primary-purple bg-primary-purple/10 shadow-neon-purple" 
          : "glass border-white/10 hover:border-white/30"
      )}
    >
      {/* Glow Effect */}
      <div className={twMerge(
        "absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl -z-10",
        isSelected ? "bg-primary-purple/20 opacity-100" : "bg-primary-cyan/10"
      )} />

      <div className={twMerge(
        "w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-colors duration-300",
        isSelected ? "bg-primary-purple text-white" : "glass text-primary-cyan group-hover:text-primary-purple"
      )}>
        <Icon size={32} />
      </div>

      <h3 className={twMerge(
        "text-2xl font-black mb-3 transition-colors",
        isSelected ? "text-white" : "text-text-light group-hover:text-primary-purple"
      )}>
        {title}
      </h3>
      
      <p className="text-text-muted leading-relaxed">
        {description}
      </p>

      {/* Selected Indicator */}
      {isSelected && (
        <motion.div
          layoutId="selected"
          className="absolute -top-2 -right-2 w-6 h-6 bg-primary-purple rounded-full flex items-center justify-center shadow-neon-purple"
        >
          <div className="w-2 h-2 bg-white rounded-full" />
        </motion.div>
      )}
    </motion.div>
  );
};
