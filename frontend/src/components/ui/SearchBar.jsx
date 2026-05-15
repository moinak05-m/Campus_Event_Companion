import { Search, Filter, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export const SearchBar = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto w-full relative group"
    >
      <div className="absolute -inset-1 bg-neon-gradient rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
      <div className="relative glass rounded-2xl p-2 flex items-center gap-2 border-white/5">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={20} />
          <input 
            type="text" 
            placeholder="Search for hackathons, workshops, or festivals..." 
            className="w-full bg-transparent border-none focus:ring-0 text-text-light pl-12 pr-4 py-3 text-lg placeholder:text-text-muted/50"
          />
        </div>
        
        <button className="glass px-6 py-3 rounded-xl flex items-center gap-3 text-sm font-bold text-text-muted hover:text-white transition-all">
          <Filter size={18} /> Filters
        </button>
        
        <button className="bg-neon-gradient px-6 py-3 rounded-xl flex items-center gap-3 text-sm font-black text-white shadow-neon-purple">
          <Sparkles size={18} /> AI Recommend
        </button>
      </div>
    </motion.div>
  );
};
