import { motion } from "framer-motion";
import { OrganizerSidebar } from "../components/organizer/OrganizerSidebar";
import { GlassCard } from "../components/ui/GlassCard";
import { 
  Users, 
  UserCheck, 
  UserX, 
  Activity, 
  Search, 
  Filter, 
  MoreVertical,
  CheckCircle,
  Clock,
  ArrowUpRight
} from "lucide-react";
import { useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const ATTENDEE_DATA = [
  { name: "Arjun Patel", id: "XZ892K0L", status: "Present", time: "10:02 AM", avatar: "Arjun" },
  { name: "Sarah Smith", id: "AB123C4D", status: "Present", time: "10:15 AM", avatar: "Sarah" },
  { name: "Mike Ross", id: "QR456T7U", status: "Absent", time: "N/A", avatar: "Mike" },
  { name: "Rachel Zane", id: "LM789V0W", status: "Present", time: "10:45 AM", avatar: "Rachel" },
  { name: "Harvey Specter", id: "KL012X3Y", status: "Absent", time: "N/A", avatar: "Harvey" },
  { name: "Donna Paulsen", id: "MN345Y6Z", status: "Present", time: "11:00 AM", avatar: "Donna" },
];

const PIE_DATA = [
  { name: "Present", value: 420, color: "#06B6D4" },
  { name: "Absent", value: 80, color: "#7C3AED" },
];

export const AttendanceDashboard = () => {
  return (
    <div className="flex min-h-screen bg-background">
      <OrganizerSidebar />

      <main className="flex-1 p-6 lg:p-10">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <header className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
            <div>
              <h1 className="text-4xl font-black mb-2 tracking-tight">Attendance <span className="text-primary-cyan italic">Insights</span></h1>
              <p className="text-text-muted text-sm font-medium uppercase tracking-widest opacity-60">Live Event Performance Tracking</p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="glass px-6 py-3 rounded-2xl border-white/5 flex items-center gap-3">
                <div className="w-2 h-2 bg-accent-success rounded-full animate-pulse shadow-neon-green" />
                <span className="text-xs font-black uppercase tracking-widest">Live: Global AI Hackathon</span>
              </div>
            </div>
          </header>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <StatsCard label="Live Present" value="420" icon={UserCheck} color="cyan" trend="+12%" />
            <StatsCard label="Live Absent" value="80" icon={UserX} color="purple" trend="-5%" />
            <StatsCard label="Attendance %" value="84%" icon={Activity} color="green" trend="+3%" />
            <StatsCard label="Total Registered" value="500" icon={Users} color="purple" />
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Live Attendee Feed */}
            <div className="xl:col-span-2">
              <GlassCard className="p-8 border-white/5 h-full">
                <div className="flex items-center justify-between mb-10">
                  <h3 className="text-xl font-black uppercase tracking-widest">Attendee Feed</h3>
                  <div className="flex gap-4">
                    <div className="relative hidden md:block">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={16} />
                      <input 
                        type="text" 
                        placeholder="Search ID..." 
                        className="glass border-white/5 rounded-xl pl-10 pr-4 py-2 text-xs focus:border-primary-cyan transition-all"
                      />
                    </div>
                    <button className="glass p-2 rounded-xl text-text-muted hover:text-white border-white/5 transition-all">
                      <Filter size={18} />
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  {ATTENDEE_DATA.map((attendee) => (
                    <motion.div 
                      key={attendee.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-center gap-6 p-4 glass rounded-2xl border-white/5 group hover:border-primary-cyan/20 transition-all"
                    >
                      <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center overflow-hidden shrink-0 group-hover:shadow-neon-cyan/10 transition-all">
                        <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${attendee.avatar}`} alt="avatar" />
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-sm group-hover:text-primary-cyan transition-colors">{attendee.name}</p>
                        <p className="text-[10px] text-text-muted font-black uppercase tracking-widest">Pass ID: {attendee.id}</p>
                      </div>
                      <div className="text-right flex flex-col items-end gap-1">
                        <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                          attendee.status === "Present" ? "bg-accent-success/10 text-accent-success" : "bg-accent-danger/10 text-accent-danger"
                        }`}>
                          {attendee.status === "Present" ? <CheckCircle size={10} /> : <UserX size={10} />}
                          {attendee.status}
                        </div>
                        <span className="text-[10px] text-text-muted font-bold flex items-center gap-1">
                          <Clock size={10} /> {attendee.time}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                <button className="w-full mt-10 glass py-3 rounded-xl text-xs font-black uppercase tracking-widest text-text-muted hover:text-white transition-all">
                  Load More Entries
                </button>
              </GlassCard>
            </div>

            {/* Attendance Analytics */}
            <div className="space-y-8">
              <GlassCard className="p-8 border-white/5">
                <h3 className="text-xl font-black uppercase tracking-widest mb-10">Status Ratio</h3>
                <div className="h-[250px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={PIE_DATA}
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={10}
                        dataKey="value"
                      >
                        {PIE_DATA.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#0F172A', 
                          border: '1px solid rgba(255,255,255,0.1)',
                          borderRadius: '12px'
                        }} 
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex justify-center gap-8 mt-4">
                  {PIE_DATA.map(item => (
                    <div key={item.name} className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-[10px] font-black uppercase tracking-widest text-text-muted">{item.name}</span>
                    </div>
                  ))}
                </div>
              </GlassCard>

              <GlassCard className="p-8 border-primary-cyan/20 bg-primary-cyan/5">
                <h4 className="text-lg font-black mb-4 flex items-center gap-2">
                  <Activity size={18} className="text-primary-cyan" /> Participation Score
                </h4>
                <div className="text-4xl font-black text-white mb-2">92.4</div>
                <p className="text-xs text-text-muted font-bold leading-relaxed">
                  Based on session dwell time and engagement points during the live hackathon events.
                </p>
                <button className="mt-6 flex items-center gap-2 text-xs font-black uppercase tracking-widest text-primary-cyan hover:underline">
                  Full Report <ArrowUpRight size={14} />
                </button>
              </GlassCard>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

const StatsCard = ({ label, value, icon: Icon, color, trend }) => {
  const styles = {
    cyan: "text-primary-cyan bg-primary-cyan/10 border-primary-cyan/20 shadow-neon-cyan/20",
    purple: "text-primary-purple bg-primary-purple/10 border-primary-purple/20 shadow-neon-purple/20",
    green: "text-accent-success bg-accent-success/10 border-accent-success/20 shadow-accent-success/20",
  };

  return (
    <GlassCard className="p-6 border-white/5 group hover:border-white/10 transition-all">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 ${styles[color]}`}>
          <Icon size={24} />
        </div>
        {trend && (
          <span className={`text-[10px] font-black ${trend.startsWith("+") ? "text-accent-success" : "text-accent-danger"}`}>
            {trend}
          </span>
        )}
      </div>
      <div>
        <h4 className="text-3xl font-black mb-1">{value}</h4>
        <p className="text-[10px] text-text-muted font-black uppercase tracking-widest">{label}</p>
      </div>
    </GlassCard>
  );
};
