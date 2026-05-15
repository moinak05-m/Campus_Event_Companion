import { motion } from "framer-motion";
import { ParticipantSidebar } from "../components/dashboard/ParticipantSidebar";
import { ProfilePanel } from "../components/dashboard/ProfilePanel";
import { TrendingBanner } from "../components/ui/TrendingBanner";
import { CategoryChip } from "../components/ui/CategoryChip";
import { EventSection } from "../components/dashboard/EventSection";
import { 
  Search, 
  Sparkles, 
  Code, 
  Cpu, 
  Music, 
  Trophy, 
  Users, 
  Presentation,
  Lightbulb,
  Zap,
  Activity,
  Calendar,
  Heart,
  TrendingUp,
  Bookmark
} from "lucide-react";
import { useState, useMemo } from "react";

const CATEGORIES = [
  { id: "hackathons", label: "Hackathons", icon: Code },
  { id: "workshops", label: "Workshops", icon: Presentation },
  { id: "seminars", label: "Seminars", icon: Lightbulb },
  { id: "cultural", label: "Cultural", icon: Music },
  { id: "sports", label: "Sports", icon: Trophy },
  { id: "placement", label: "Placement", icon: Users },
  { id: "quizzes", label: "Quizzes", icon: Lightbulb },
  { id: "ai-ml", label: "AI/ML", icon: Cpu },
];

const RAW_EVENTS = [
  {
    id: 1,
    title: "AI Innovation Summit",
    category: "Technology",
    date: "May 15, 2026",
    time: "10:00 AM",
    timestamp: new Date("2026-05-15T10:00:00").getTime(),
    location: "Auditorium A",
    attendees: "850",
    seatsLeft: 12,
    isHot: true,
    isLive: true,
  },
  {
    id: 2,
    title: "Code-Sprint 2026",
    category: "Coding",
    date: "May 16, 2026",
    time: "09:00 AM",
    timestamp: new Date("2026-05-16T09:00:00").getTime(),
    location: "IT Hub",
    attendees: "420",
    seatsLeft: 45,
    isHot: false,
    isLive: false,
  },
  {
    id: 3,
    title: "Startup Weekend",
    category: "Entrepreneurship",
    date: "May 22, 2026",
    time: "05:00 PM",
    timestamp: new Date("2026-05-22T17:00:00").getTime(),
    location: "Innovation Center",
    attendees: "200",
    seatsLeft: 5,
    isHot: true,
    isLive: false,
  },
  {
    id: 4,
    title: "Cultural Night",
    category: "Cultural",
    date: "May 25, 2026",
    time: "07:00 PM",
    timestamp: new Date("2026-05-25T19:00:00").getTime(),
    location: "Open Theater",
    attendees: "1.2k",
    seatsLeft: 200,
    isHot: false,
    isLive: false,
  },
  {
    id: 5,
    title: "Web3 Workshop",
    category: "Technology",
    date: "May 15, 2026",
    time: "03:45 PM", // Closer than Startup Weekend
    timestamp: new Date("2026-05-15T15:45:00").getTime(),
    location: "Lab 302",
    attendees: "80",
    seatsLeft: 2,
    isHot: true,
    isLive: true,
  }
];

export const ParticipantDashboard = () => {
  const [activeCategory, setActiveCategory] = useState("hackathons");
  const currentTime = new Date("2026-05-15T03:15:00").getTime(); // Mocked current time

  // Logic: Sort Live Events by proximity to current time
  const liveEvents = useMemo(() => {
    return RAW_EVENTS
      .filter(e => e.isLive)
      .sort((a, b) => (a.timestamp - currentTime) - (b.timestamp - currentTime));
  }, [currentTime]);

  const upcomingEvents = useMemo(() => {
    return RAW_EVENTS.filter(e => !e.isLive && e.timestamp > currentTime).slice(0, 3);
  }, [currentTime]);

  const trendingEvents = useMemo(() => {
    return RAW_EVENTS.filter(e => e.isHot).slice(0, 3);
  }, []);

  const suggestedEvents = useMemo(() => {
    return RAW_EVENTS.slice(0, 3); // Mocked recommendation
  }, []);

  return (
    <div className="flex min-h-screen bg-background">
      <ParticipantSidebar />

      <main className="flex-1 min-h-screen p-6 lg:p-10 overflow-x-hidden">
        <div className="max-w-6xl mx-auto">
          
          {/* Top Nav/Search */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
            <div>
              <motion.h1 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-3xl font-black mb-2"
              >
                Good Evening, <span className="bg-neon-gradient bg-clip-text text-transparent">Rahul</span> 👋
              </motion.h1>
              <p className="text-text-muted text-sm font-medium tracking-wide uppercase opacity-70">May 15, 2026 • 03:15 PM</p>
            </div>
            
            <div className="relative w-full md:w-[450px] group">
              <div className="absolute -inset-0.5 bg-neon-gradient rounded-2xl blur opacity-0 group-hover:opacity-20 transition duration-500"></div>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-primary-cyan transition-colors" size={18} />
                <input 
                  type="text" 
                  placeholder="Find your next opportunity..." 
                  className="w-full glass border-white/5 rounded-2xl pl-12 pr-4 py-4 focus:border-primary-cyan/50 transition-all text-sm outline-none"
                />
              </div>
            </div>
          </div>

          <TrendingBanner />

          {/* Categories Horizontal Scroll */}
          <section className="mt-16 mb-16">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-black flex items-center gap-3">
                <Sparkles className="text-primary-cyan" size={20} /> Browse by Category
              </h3>
            </div>
            <div className="flex overflow-x-auto pb-4 gap-4 no-scrollbar scroll-smooth">
              {CATEGORIES.map((cat) => (
                <div key={cat.id} className="shrink-0">
                  <CategoryChip 
                    label={cat.label}
                    icon={cat.icon}
                    isSelected={activeCategory === cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                  />
                </div>
              ))}
            </div>
          </section>

          {/* Event Sections */}
          <EventSection title="Live Now" events={liveEvents} icon={Activity} />
          
          <EventSection title="AI Suggested" events={suggestedEvents} icon={Sparkles} />
          
          <EventSection title="Upcoming This Week" events={upcomingEvents} icon={Calendar} />
          
          <EventSection title="Trending on Campus" events={trendingEvents} icon={TrendingUp} />

          <EventSection title="Saved For You" events={RAW_EVENTS.slice(2, 5)} icon={Bookmark} />

          {/* Rewards Callout */}
          <motion.div 
            whileHover={{ scale: 1.01 }}
            className="mt-10 p-10 rounded-[40px] glass border-primary-purple/20 bg-primary-purple/5 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-12 opacity-5 -rotate-12 group-hover:rotate-0 transition-transform duration-700">
              <Trophy size={160} />
            </div>
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
              <div className="flex items-center gap-8">
                <div className="w-20 h-20 glass rounded-3xl flex items-center justify-center text-primary-purple shadow-neon-purple animate-float">
                  <Zap size={40} />
                </div>
                <div>
                  <h4 className="text-3xl font-black mb-2">Claim Your Rewards</h4>
                  <p className="text-text-muted text-base max-w-md">Complete your profile and participate in events to unlock exclusive university credits and badges.</p>
                </div>
              </div>
              <button className="bg-primary-purple px-10 py-4 rounded-2xl font-black text-white hover:bg-primary-purple/80 hover:shadow-neon-purple transition-all shrink-0">
                View Rewards Hub
              </button>
            </div>
          </motion.div>
        </div>
      </main>

      <ProfilePanel />
    </div>
  );
};
