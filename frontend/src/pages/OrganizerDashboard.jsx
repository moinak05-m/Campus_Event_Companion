import { motion } from "framer-motion";
import { OrganizerSidebar } from "../components/organizer/OrganizerSidebar";
import { AnalyticsCard } from "../components/organizer/AnalyticsCard";
import { EventCharts } from "../components/organizer/EventCharts";
import { GlassCard } from "../components/ui/GlassCard";
import { NeonButton } from "../components/ui/NeonButton";
import { 
  Calendar, 
  Users, 
  Activity, 
  Zap, 
  TrendingUp, 
  Plus, 
  MoreVertical,
  Search,
  Bell
} from "lucide-react";

export const OrganizerDashboard = () => {
  const stats = [
    { label: "Total Events", value: "24", trend: 12, icon: Calendar, color: "purple" },
    { label: "Total Participants", value: "8.4k", trend: 25, icon: Users, color: "cyan" },
    { label: "Attendance Rate", value: "88%", trend: 5, icon: Activity, color: "green" },
    { label: "Active Registrations", value: "1,240", trend: -2, icon: Zap, color: "orange" },
    { label: "Growth Rate", value: "+14%", trend: 8, icon: TrendingUp, color: "cyan" },
  ];

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <OrganizerSidebar />

      {/* Main Content */}
      <main className="flex-1 p-6 lg:p-10 overflow-x-hidden">
        <div className="max-w-7xl mx-auto">
          
          {/* Header */}
          <header className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
            <div>
              <h1 className="text-4xl font-black mb-2 tracking-tight">Organizer <span className="text-primary-cyan italic">Command</span></h1>
              <p className="text-text-muted text-sm font-medium uppercase tracking-widest opacity-60">System Version 4.2.0 • Live Diagnostics</p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="relative hidden xl:block">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
                <input 
                  type="text" 
                  placeholder="Global search..." 
                  className="glass border-white/5 rounded-2xl pl-12 pr-4 py-3 w-64 text-sm focus:border-primary-cyan transition-all"
                />
              </div>
              <button className="glass p-3 rounded-2xl relative text-text-muted hover:text-white transition-all">
                <Bell size={20} />
                <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-accent-danger rounded-full shadow-neon-purple animate-pulse" />
              </button>
              <NeonButton className="px-6 py-3">
                <Plus size={20} /> Create New
              </NeonButton>
            </div>
          </header>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-12">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <AnalyticsCard {...stat} />
              </motion.div>
            ))}
          </div>

          {/* Charts Section */}
          <EventCharts />

          {/* Bottom Grid: Recent Activity & Manage Events */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Manage Events Table */}
            <div className="xl:col-span-2">
              <GlassCard className="p-8 border-white/5 h-full">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-xl font-black uppercase tracking-widest">Active Events</h3>
                  <button className="text-xs font-bold text-primary-cyan hover:underline">View All</button>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-white/5 text-text-muted text-[10px] font-black uppercase tracking-widest">
                        <th className="pb-4">Event Name</th>
                        <th className="pb-4">Date</th>
                        <th className="pb-4">Capacity</th>
                        <th className="pb-4">Status</th>
                        <th className="pb-4"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      <EventRow name="Global AI Hackathon" date="May 24" capacity="1240/1500" status="Live" />
                      <EventRow name="Neon Beats Fest" date="May 28" capacity="4500/5000" status="Live" />
                      <EventRow name="Web3 Workshop" date="June 02" capacity="150/200" status="Upcoming" />
                      <EventRow name="Robo-Race 2026" date="June 18" capacity="320/400" status="Draft" />
                    </tbody>
                  </table>
                </div>
              </GlassCard>
            </div>

            {/* Recent Participants Feed */}
            <div>
              <GlassCard className="p-8 border-white/5 h-full">
                <h3 className="text-xl font-black uppercase tracking-widest mb-8">Recent Check-ins</h3>
                <div className="space-y-6">
                  <CheckInItem name="Arjun Patel" event="AI Hackathon" time="2 mins ago" />
                  <CheckInItem name="Sarah Smith" event="Web3 Workshop" time="15 mins ago" />
                  <CheckInItem name="Mike Ross" event="AI Hackathon" time="45 mins ago" />
                  <CheckInItem name="Rachel Zane" event="Neon Beats Fest" time="1 hour ago" />
                </div>
                <button className="w-full mt-10 glass py-3 rounded-xl text-xs font-black uppercase tracking-widest text-text-muted hover:text-white transition-all">
                  Launch QR Scanner
                </button>
              </GlassCard>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

const EventRow = ({ name, date, capacity, status }) => {
  const statusColors = {
    Live: "text-accent-success bg-accent-success/10",
    Upcoming: "text-primary-cyan bg-primary-cyan/10",
    Draft: "text-text-muted bg-white/5",
  };

  return (
    <tr className="group">
      <td className="py-5 font-bold text-sm group-hover:text-primary-cyan transition-colors">{name}</td>
      <td className="py-5 text-sm text-text-muted">{date}</td>
      <td className="py-5">
        <div className="flex flex-col gap-1.5">
          <span className="text-[10px] text-text-muted font-bold">{capacity}</span>
          <div className="w-24 h-1 bg-white/5 rounded-full overflow-hidden">
            <div className="h-full bg-primary-cyan shadow-neon-cyan" style={{ width: '80%' }} />
          </div>
        </div>
      </td>
      <td className="py-5">
        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${statusColors[status]}`}>
          {status}
        </span>
      </td>
      <td className="py-5 text-right">
        <button className="text-text-muted hover:text-white transition-colors">
          <MoreVertical size={18} />
        </button>
      </td>
    </tr>
  );
};

const CheckInItem = ({ name, event, time }) => (
  <div className="flex items-center gap-4 group cursor-pointer">
    <div className="w-10 h-10 rounded-xl bg-neon-gradient p-0.5 shadow-neon-purple/20">
      <div className="w-full h-full rounded-[10px] bg-background flex items-center justify-center overflow-hidden">
        <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`} alt={name} />
      </div>
    </div>
    <div className="flex-1">
      <p className="text-sm font-bold group-hover:text-primary-cyan transition-colors">{name}</p>
      <p className="text-[10px] text-text-muted font-medium uppercase tracking-widest">Joined {event}</p>
    </div>
    <span className="text-[10px] text-text-muted font-black">{time}</span>
  </div>
);
