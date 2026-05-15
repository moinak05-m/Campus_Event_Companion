import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { EventCard } from "../ui/EventCard";

export const EventSection = ({ title, events, icon: Icon }) => {
  return (
    <section className="mb-20">
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-4">
          {Icon && (
            <div className="w-12 h-12 glass rounded-2xl flex items-center justify-center text-primary-purple shadow-neon-purple/20">
              <Icon size={24} />
            </div>
          )}
          <h2 className="text-3xl font-black tracking-tight">{title}</h2>
        </div>
        <button className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-text-muted hover:text-primary-cyan transition-all group">
          View All <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {events.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <EventCard {...event} />
          </motion.div>
        ))}
      </div>
    </section>
  );
};
