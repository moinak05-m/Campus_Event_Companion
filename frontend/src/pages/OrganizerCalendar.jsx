import { motion } from "framer-motion";
import { OrganizerSidebar } from "../components/organizer/OrganizerSidebar";
import { GlassCard } from "../components/ui/GlassCard";
import { NeonButton } from "../components/ui/NeonButton";
import { 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Calendar as CalendarIcon, 
  Clock, 
  Zap, 
  Bell, 
  Search,
  Filter,
  CheckCircle,
  MoreVertical,
  Star
} from "lucide-react";
import { useState } from "react";

const CALENDAR_DAYS = Array.from({ length: 31 }, (_, i) => i + 1);
const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const UPCOMING_EVENTS = [
  { id: 1, title: "Global AI Hackathon", date: "May 24", time: "10:00 AM", type: "Main", priority: "High" },
  { id: 2, title: "Web3 Masterclass", date: "May 26", time: "02:00 PM", type: "Workshop", priority: "Medium" },
  { id: 3, title: "Tech Expo 2026", date: "June 05", time: "09:00 AM", type: "Seminar", priority: "High" },
];

export const OrganizerCalendar = () => {
  const [currentMonth, setCurrentMonth] = useState("May 2026");

  return (
    <div className="flex min-h-screen bg-background">
      <OrganizerSidebar />

      <main className="flex-1 p-6 lg:p-10">
        <div className="max-w-7xl mx-auto flex flex-col xl:flex-row gap-10 h-[calc(100vh-80px)]">
          
          {/* Main Calendar View */}
          <div className="flex-1 flex flex-col">
            {/* Header */}
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-10">
              <div className="flex items-center gap-6">
                <h1 className="text-3xl font-black tracking-tight">{currentMonth}</h1>
                <div className="flex glass rounded-xl border-white/5 p-1">
                  <button className="p-2 hover:bg-white/5 rounded-lg transition-all"><ChevronLeft size={18} /></button>
                  <button className="p-2 hover:bg-white/5 rounded-lg transition-all"><ChevronRight size={18} /></button>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="hidden lg:flex glass p-1 rounded-xl border-white/5">
                  <button className="px-4 py-2 text-xs font-black uppercase tracking-widest bg-white/10 text-primary-cyan rounded-lg">Month</button>
                  <button className="px-4 py-2 text-xs font-black uppercase tracking-widest text-text-muted hover:text-white rounded-lg">Week</button>
                  <button className="px-4 py-2 text-xs font-black uppercase tracking-widest text-text-muted hover:text-white rounded-lg">Day</button>
                </div>
                <NeonButton className="px-6 py-3">
                  <Plus size={18} /> Schedule
                </NeonButton>
              </div>
            </header>

            {/* Calendar Grid */}
            <div className="flex-1 glass border-white/5 rounded-[32px] overflow-hidden flex flex-col shadow-2xl">
              {/* Weekdays */}
              <div className="grid grid-cols-7 border-b border-white/5 bg-white/[0.02]">
                {WEEKDAYS.map(day => (
                  <div key={day} className="py-4 text-center text-[10px] font-black uppercase tracking-[0.2em] text-text-muted">
                    {day}
                  </div>
                ))}
              </div>
              
              {/* Days Grid */}
              <div className="flex-1 grid grid-cols-7">
                {CALENDAR_DAYS.map(day => (
                  <CalendarDay key={day} day={day} hasEvents={day === 24 || day === 26 || day === 5} />
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar: Agenda & AI Scheduler */}
          <div className="w-full xl:w-96 flex flex-col gap-8">
            {/* Agenda View */}
            <GlassCard className="p-8 border-white/5 flex-1 overflow-y-auto">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-black uppercase tracking-widest">Agenda</h3>
                <button className="text-text-muted hover:text-white transition-all"><Filter size={18} /></button>
              </div>

              <div className="space-y-6">
                {UPCOMING_EVENTS.map(event => (
                  <motion.div 
                    key={event.id}
                    whileHover={{ x: 5 }}
                    className="p-5 glass rounded-2xl border-white/5 bg-white/[0.02] group hover:border-primary-cyan/30 transition-all cursor-pointer"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded ${
                        event.priority === "High" ? "bg-accent-danger/20 text-accent-danger" : "bg-primary-cyan/20 text-primary-cyan"
                      }`}>
                        {event.priority} Priority
                      </span>
                      <MoreVertical size={14} className="text-text-muted opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <h4 className="font-bold text-sm mb-3 group-hover:text-primary-cyan transition-colors">{event.title}</h4>
                    <div className="flex items-center gap-4 text-[10px] text-text-muted font-black uppercase">
                      <span className="flex items-center gap-1"><CalendarIcon size={12} /> {event.date}</span>
                      <span className="flex items-center gap-1"><Clock size={12} /> {event.time}</span>
                    </div>
                  </motion.div>
                ))}
              </div>

              <button className="w-full mt-10 glass py-3 rounded-xl text-xs font-black uppercase tracking-widest text-text-muted hover:text-white transition-all border-dashed border-white/10">
                + Add Reminder
              </button>
            </GlassCard>

            {/* AI Scheduling Assistant */}
            <GlassCard className="p-8 border-primary-cyan/20 bg-primary-cyan/5 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <Zap size={100} className="text-primary-cyan" />
              </div>
              <h3 className="text-xl font-black uppercase tracking-widest mb-6 flex items-center gap-2">
                <Zap size={20} className="text-primary-cyan fill-current" /> AI Assistant
              </h3>
              <p className="text-xs text-text-muted font-medium mb-8 leading-relaxed">
                Found an optimal slot for your next <span className="text-primary-cyan font-bold">Tech Workshop</span> on <span className="text-white font-bold">May 30</span> at 4:00 PM based on past engagement data.
              </p>
              <div className="flex gap-4">
                <button className="flex-1 glass py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white/10">Ignore</button>
                <button className="flex-1 bg-primary-cyan text-white py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-neon-cyan">Auto-Book</button>
              </div>
            </GlassCard>
          </div>

        </div>
      </main>
    </div>
  );
};

const CalendarDay = ({ day, hasEvents }) => (
  <div className={`border-r border-b border-white/5 p-4 min-h-[100px] hover:bg-white/[0.01] transition-all relative group cursor-pointer ${day > 31 ? 'opacity-20' : ''}`}>
    <span className="text-xs font-black text-text-muted group-hover:text-white transition-colors">{day}</span>
    {hasEvents && (
      <div className="mt-2 space-y-1">
        <div className="w-full h-1.5 bg-primary-cyan/40 rounded-full shadow-neon-cyan/20" />
        {day === 24 && <div className="w-full h-1.5 bg-primary-purple/40 rounded-full shadow-neon-purple/20" />}
      </div>
    )}
    {day === 15 && (
      <div className="absolute inset-0 bg-primary-cyan/5 flex items-center justify-center pointer-events-none">
        <div className="w-1 h-1 bg-primary-cyan rounded-full shadow-neon-cyan" />
      </div>
    )}
  </div>
);
