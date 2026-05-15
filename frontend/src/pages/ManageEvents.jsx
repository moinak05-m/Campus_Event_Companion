import { motion } from "framer-motion";
import { OrganizerSidebar } from "../components/organizer/OrganizerSidebar";
import { GlassCard } from "../components/ui/GlassCard";
import { NeonButton } from "../components/ui/NeonButton";
import { 
  Search, 
  Filter, 
  MoreVertical, 
  Download, 
  Eye, 
  Plus,
  Users,
  CheckCircle,
  Clock,
  LayoutGrid,
  List
} from "lucide-react";
import { useState } from "react";

const EVENTS = [
  { id: 1, name: "Global AI Hackathon", registrations: 1240, capacity: 1500, attendance: "85%", status: "Live", date: "May 24, 2026" },
  { id: 2, name: "Neon Beats Music Fest", registrations: 4800, capacity: 5000, attendance: "92%", status: "Live", date: "May 28, 2026" },
  { id: 3, name: "Web3 Masterclass", registrations: 180, capacity: 200, attendance: "N/A", status: "Upcoming", date: "June 02, 2026" },
  { id: 4, name: "Future of UI/UX", registrations: 320, capacity: 400, attendance: "N/A", status: "Upcoming", date: "June 10, 2026" },
  { id: 5, name: "Robotics Workshop", registrations: 50, capacity: 100, attendance: "N/A", status: "Draft", date: "June 18, 2026" },
];

export const ManageEvents = () => {
  const [view, setView] = useState("table");

  return (
    <div className="flex min-h-screen bg-background">
      <OrganizerSidebar />

      <main className="flex-1 p-6 lg:p-10">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <header className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
            <div>
              <h1 className="text-4xl font-black mb-2 tracking-tight">Manage <span className="text-primary-cyan">Events</span></h1>
              <p className="text-text-muted text-sm font-medium">Full oversight of your event portfolio.</p>
            </div>
            
            <div className="flex gap-4">
              <div className="flex glass p-1 rounded-xl border-white/5">
                <button 
                  onClick={() => setView("table")}
                  className={`p-2 rounded-lg transition-all ${view === "table" ? "bg-white/10 text-primary-cyan shadow-inner" : "text-text-muted hover:text-white"}`}
                >
                  <List size={20} />
                </button>
                <button 
                  onClick={() => setView("grid")}
                  className={`p-2 rounded-lg transition-all ${view === "grid" ? "bg-white/10 text-primary-cyan shadow-inner" : "text-text-muted hover:text-white"}`}
                >
                  <LayoutGrid size={20} />
                </button>
              </div>
              <NeonButton className="px-6 py-3">
                <Plus size={20} /> Create New
              </NeonButton>
            </div>
          </header>

          {/* Filters Bar */}
          <div className="flex flex-col md:flex-row gap-4 mb-10">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
              <input 
                type="text" 
                placeholder="Search by event name..." 
                className="w-full glass border-white/5 rounded-2xl pl-12 pr-4 py-4 focus:border-primary-cyan transition-all"
              />
            </div>
            <div className="flex gap-4">
              <button className="glass px-6 py-4 rounded-2xl flex items-center gap-2 text-text-muted hover:text-white border-white/5 transition-all">
                <Filter size={18} /> Filter
              </button>
              <button className="glass px-6 py-4 rounded-2xl flex items-center gap-2 text-text-muted hover:text-white border-white/5 transition-all">
                <Download size={18} /> Export CSV
              </button>
            </div>
          </div>

          {/* Events View */}
          {view === "table" ? (
            <GlassCard className="p-0 overflow-hidden border-white/5">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-white/[0.02] border-b border-white/5">
                    <tr className="text-[10px] font-black uppercase tracking-[0.2em] text-text-muted">
                      <th className="px-8 py-6">Event Details</th>
                      <th className="px-8 py-6">Registrations</th>
                      <th className="px-8 py-6">Attendance</th>
                      <th className="px-8 py-6">Status</th>
                      <th className="px-8 py-6">Date</th>
                      <th className="px-8 py-6"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {EVENTS.map((event) => (
                      <tr key={event.id} className="group hover:bg-white/[0.01] transition-colors">
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-neon-gradient p-0.5 shadow-neon-purple/20">
                              <div className="w-full h-full rounded-[10px] bg-background flex items-center justify-center text-primary-cyan font-black">
                                {event.name[0]}
                              </div>
                            </div>
                            <span className="font-bold text-sm group-hover:text-primary-cyan transition-colors">{event.name}</span>
                          </div>
                        </td>
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-3">
                            <span className="font-black text-lg">{event.registrations}</span>
                            <span className="text-[10px] text-text-muted font-bold">/ {event.capacity}</span>
                          </div>
                          <div className="w-24 h-1 bg-white/5 rounded-full mt-2 overflow-hidden">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${(event.registrations / event.capacity) * 100}%` }}
                              className="h-full bg-primary-cyan"
                            />
                          </div>
                        </td>
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-2">
                            <CheckCircle size={14} className={event.attendance === "N/A" ? "text-text-muted" : "text-accent-success"} />
                            <span className="font-bold text-sm">{event.attendance}</span>
                          </div>
                        </td>
                        <td className="px-8 py-6">
                          <StatusBadge status={event.status} />
                        </td>
                        <td className="px-8 py-6 text-sm text-text-muted font-medium">{event.date}</td>
                        <td className="px-8 py-6 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button className="p-2 hover:text-primary-cyan transition-colors"><Eye size={18} /></button>
                            <button className="p-2 hover:text-white transition-colors"><MoreVertical size={18} /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </GlassCard>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {EVENTS.map((event) => (
                <motion.div key={event.id} layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                  <GlassCard className="p-8 border-white/5 hover:border-primary-cyan/20 transition-all group">
                    <div className="flex justify-between items-start mb-6">
                      <div className="w-14 h-14 rounded-2xl bg-primary-cyan/10 flex items-center justify-center text-primary-cyan group-hover:shadow-neon-cyan/20 transition-all">
                        <Users size={28} />
                      </div>
                      <StatusBadge status={event.status} />
                    </div>
                    <h3 className="text-xl font-black mb-2 group-hover:text-primary-cyan transition-colors line-clamp-1">{event.name}</h3>
                    <p className="text-sm text-text-muted mb-8 font-bold flex items-center gap-2">
                      <Clock size={14} /> {event.date}
                    </p>
                    
                    <div className="space-y-4 mb-8">
                      <div className="flex justify-between text-xs font-black uppercase tracking-widest text-text-muted">
                        <span>Registrations</span>
                        <span>{event.registrations} / {event.capacity}</span>
                      </div>
                      <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${(event.registrations / event.capacity) * 100}%` }}
                          className="h-full bg-neon-gradient shadow-neon-purple"
                        />
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <button className="flex-1 glass py-3 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-white/10 transition-all">Edit</button>
                      <button className="glass p-3 rounded-xl hover:bg-white/10 transition-all"><MoreVertical size={18} /></button>
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

const StatusBadge = ({ status }) => {
  const styles = {
    Live: "text-accent-success bg-accent-success/10 border-accent-success/20",
    Upcoming: "text-primary-cyan bg-primary-cyan/10 border-primary-cyan/20",
    Draft: "text-text-muted bg-white/5 border-white/10",
  };
  return (
    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${styles[status]}`}>
      {status}
    </span>
  );
};
