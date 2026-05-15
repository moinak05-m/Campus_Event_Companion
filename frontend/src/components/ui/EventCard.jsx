import { motion } from "framer-motion";
import { GlassCard } from "./GlassCard";
import { Calendar, MapPin, Users, ArrowRight, Clock, Map } from "lucide-react";
import { NeonButton } from "./NeonButton";
import { twMerge } from "tailwind-merge";
import { Link } from "react-router-dom";

export const EventCard = ({ 
  title, 
  category, 
  date, 
  time,
  location, 
  attendees, 
  seatsLeft,
  image, 
  isHot = false,
  isLive = false
}) => {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="h-full"
    >
      <GlassCard className="p-0 overflow-hidden flex flex-col h-full group relative border-white/5 hover:border-primary-purple/30 transition-all duration-500 shadow-xl hover:shadow-neon-purple/20">
        
        {/* Glow Border Effect */}
        <div className="absolute inset-0 border border-transparent group-hover:border-primary-purple/20 rounded-2xl pointer-events-none transition-all duration-500" />

        {/* Poster/Banner Area */}
        <div className="relative h-52 w-full overflow-hidden">
          {/* Neon Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10 opacity-60" />
          <div className="absolute inset-0 bg-primary-purple/5 group-hover:bg-primary-purple/10 transition-colors z-10" />
          
          {image ? (
            <img 
              src={image} 
              alt={title} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
            />
          ) : (
            <div className="w-full h-full bg-neon-gradient opacity-20 group-hover:opacity-30 transition-opacity" />
          )}
          
          {/* Badges */}
          <div className="absolute top-4 left-4 z-20 flex flex-wrap gap-2">
            {isLive && (
              <div className="flex items-center gap-1.5 bg-accent-danger/20 text-accent-danger border border-accent-danger/30 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest backdrop-blur-md">
                <span className="w-1.5 h-1.5 bg-accent-danger rounded-full animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
                Live
              </div>
            )}
            {isHot && (
              <div className="flex items-center gap-1.5 bg-accent-warning/20 text-accent-warning border border-accent-warning/30 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest backdrop-blur-md">
                <Zap size={10} className="fill-current" />
                Trending
              </div>
            )}
            <span className="glass px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-primary-cyan border-white/10 backdrop-blur-md">
              {category}
            </span>
          </div>

          {/* Seats Badge */}
          {seatsLeft && (
            <div className="absolute bottom-4 right-4 z-20 glass px-3 py-1 rounded-lg text-[10px] font-bold text-text-light border-white/5 backdrop-blur-md">
              <span className="text-accent-warning">{seatsLeft}</span> Seats Left
            </div>
          )}
        </div>

        {/* Content Area */}
        <div className="p-6 flex flex-col flex-1 bg-white/[0.01]">
          <h3 className="text-xl font-black mb-4 line-clamp-2 group-hover:text-primary-cyan transition-colors duration-300">
            {title}
          </h3>
          
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="flex items-center gap-2.5 text-text-muted text-[11px] font-bold uppercase tracking-wider">
              <Calendar size={14} className="text-primary-purple" />
              {date}
            </div>
            <div className="flex items-center gap-2.5 text-text-muted text-[11px] font-bold uppercase tracking-wider">
              <Clock size={14} className="text-primary-cyan" />
              {time}
            </div>
            <div className="flex items-center gap-2.5 text-text-muted text-[11px] font-bold uppercase tracking-wider col-span-2">
              <MapPin size={14} className="text-accent-success" />
              <span className="truncate">{location}</span>
            </div>
          </div>

          {/* Action Row */}
          <div className="mt-auto flex items-center gap-3">
            <NeonButton className="flex-1 py-3 text-xs font-black uppercase tracking-widest">
              Register Now
            </NeonButton>
            <Link to={`/event/${title.replace(/\s+/g, '-').toLowerCase()}`}>
              <button className="glass p-3 rounded-xl hover:bg-primary-purple/20 hover:border-primary-purple/50 transition-all text-text-muted hover:text-white group/btn">
                <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </Link>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
};

const Zap = ({ size, className }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);
