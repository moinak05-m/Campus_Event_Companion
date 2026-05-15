import { motion } from "framer-motion";
import { SearchBar } from "../components/ui/SearchBar";
import { EventCard } from "../components/ui/EventCard";
import { CategoryChip } from "../components/ui/CategoryChip";
import { 
  Code, 
  Cpu, 
  Sparkles, 
  Trophy, 
  Music, 
  Camera,
  ChevronRight,
  TrendingUp,
  Zap,
  Loader
} from "lucide-react";
import { useState, useEffect } from "react";
import api from "../services/api";

const CATEGORIES = [
  { id: "all", label: "All Events", icon: Zap },
  { id: "tech", label: "Technology", icon: Code },
  { id: "ai", label: "AI & ML", icon: Cpu },
  { id: "cultural", label: "Cultural", icon: Music },
  { id: "sports", label: "Sports", icon: Trophy },
  { id: "design", label: "Design", icon: Camera },
];

export const EventExplorer = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await api.get("/events");
        setEvents(response.data.data || []);
      } catch (err) {
        setError(err.message || "Failed to fetch events");
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const filteredEvents = activeCategory === "all" 
    ? events 
    : events.filter(e => e.category?.toLowerCase() === activeCategory.toLowerCase());

  return (
    <div className="min-h-screen pt-32 pb-20 px-6">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary-purple/5 blur-[120px] -z-10" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary-cyan/5 blur-[120px] -z-10" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-5xl md:text-7xl font-black mb-6 tracking-tight"
          >
            Explore <span className="bg-neon-gradient bg-clip-text text-transparent">Campus</span> Life
          </motion.h1>
          <p className="text-text-muted text-lg max-w-2xl mx-auto mb-12">
            Discover thousands of events, workshops, and opportunities powered by AI recommendations.
          </p>
          <SearchBar />
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-4 mb-20">
          {CATEGORIES.map((cat) => (
            <CategoryChip 
              key={cat.id}
              label={cat.label}
              icon={cat.icon}
              isSelected={activeCategory === cat.id}
              onClick={() => setActiveCategory(cat.id)}
            />
          ))}
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
             <Loader className="animate-spin text-primary-cyan" size={48} />
          </div>
        ) : error ? (
           <div className="text-center text-accent-danger py-20 font-bold">{error}</div>
        ) : (
          <>
            {/* Featured / AI Section */}
            <section className="mb-20">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 glass rounded-xl flex items-center justify-center text-primary-purple">
                    <Sparkles size={20} />
                  </div>
                  <h2 className="text-2xl font-black">Picked for You</h2>
                </div>
                <button className="text-sm font-bold text-primary-cyan hover:underline flex items-center gap-1">
                  View AI Feed <ChevronRight size={16} />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {events.slice(0, 3).map((event, index) => (
                  <motion.div
                    key={event._id || index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <EventCard {...event} />
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Trending Section */}
            <section>
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 glass rounded-xl flex items-center justify-center text-accent-danger">
                    <TrendingUp size={20} />
                  </div>
                  <h2 className="text-2xl font-black">All Trending Events</h2>
                </div>
                <div className="flex gap-2">
                  <button className="glass px-4 py-2 rounded-xl text-xs font-bold hover:bg-white/10 transition-all">Latest</button>
                  <button className="glass px-4 py-2 rounded-xl text-xs font-bold hover:bg-white/10 transition-all">Popular</button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredEvents.map((event, index) => (
                  <motion.div
                    key={event._id || index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <EventCard {...event} />
                  </motion.div>
                ))}
              </div>
            </section>
          </>
        )}

        {/* Load More */}
        <div className="mt-16 text-center">
          <button className="glass px-10 py-4 rounded-2xl font-black text-text-muted hover:text-white hover:border-white/30 transition-all">
            Discover More Events
          </button>
        </div>
      </div>
    </div>
  );
};
