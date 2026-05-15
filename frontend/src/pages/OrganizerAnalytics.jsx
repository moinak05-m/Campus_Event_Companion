import { motion } from "framer-motion";
import { OrganizerSidebar } from "../components/organizer/OrganizerSidebar";
import { GlassCard } from "../components/ui/GlassCard";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis,
  AreaChart,
  Area,
  Cell
} from "recharts";
import { 
  TrendingUp, 
  Target, 
  Zap, 
  Award, 
  Download, 
  Share2,
  Calendar,
  Layers,
  Activity
} from "lucide-react";

const GROWTH_DATA = [
  { month: 'Jan', reg: 400, att: 320 },
  { month: 'Feb', reg: 600, att: 480 },
  { month: 'Mar', reg: 800, att: 700 },
  { month: 'Apr', reg: 1200, att: 950 },
  { month: 'May', reg: 1800, att: 1600 },
  { month: 'Jun', reg: 2400, att: 2100 },
];

const CATEGORY_RADAR = [
  { subject: 'AI/ML', A: 120, fullMark: 150 },
  { subject: 'Web Dev', A: 98, fullMark: 150 },
  { subject: 'Design', A: 86, fullMark: 150 },
  { subject: 'Sports', A: 99, fullMark: 150 },
  { subject: 'Quizzes', A: 85, fullMark: 150 },
  { subject: 'Music', A: 65, fullMark: 150 },
];

const ENGAGEMENT_DATA = [
  { name: '10am', score: 40 },
  { name: '12pm', score: 85 },
  { name: '2pm', score: 60 },
  { name: '4pm', score: 95 },
  { name: '6pm', score: 75 },
  { name: '8pm', score: 90 },
];

export const OrganizerAnalytics = () => {
  return (
    <div className="flex min-h-screen bg-background">
      <OrganizerSidebar />

      <main className="flex-1 p-6 lg:p-10">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <header className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16">
            <div>
              <h1 className="text-4xl font-black mb-2 tracking-tight">Performance <span className="text-primary-cyan italic">Analytics</span></h1>
              <p className="text-text-muted text-sm font-medium uppercase tracking-widest opacity-60">Deep Insight into Campus Engagement</p>
            </div>
            
            <div className="flex gap-4">
              <button className="glass px-6 py-3 rounded-2xl flex items-center gap-2 text-text-muted hover:text-white border-white/5 transition-all text-xs font-bold">
                <Share2 size={16} /> Share Report
              </button>
              <button className="bg-primary-cyan text-white px-6 py-3 rounded-2xl flex items-center gap-2 shadow-neon-cyan hover:shadow-neon-cyan/60 transition-all text-xs font-bold">
                <Download size={16} /> Export Data
              </button>
            </div>
          </header>

          {/* Top Analytics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <BigStatCard 
              label="Engagement Score" 
              value="8.4/10" 
              trend="+1.2" 
              icon={Target} 
              desc="High engagement during peak event hours."
            />
            <BigStatCard 
              label="Avg. Retention" 
              value="76%" 
              trend="+4%" 
              icon={Layers} 
              desc="Increased from previous semester averages."
            />
            <BigStatCard 
              label="Conversion Rate" 
              value="32%" 
              trend="+8%" 
              icon={TrendingUp} 
              desc="Visitors converting to active registrations."
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Growth Chart */}
            <GlassCard className="p-8 border-white/5">
              <div className="flex items-center justify-between mb-10">
                <h3 className="text-xl font-black uppercase tracking-widest">Growth Forecast</h3>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5 text-[10px] font-black uppercase text-primary-cyan">
                    <div className="w-2 h-2 rounded-full bg-primary-cyan" /> Registered
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] font-black uppercase text-primary-purple">
                    <div className="w-2 h-2 rounded-full bg-primary-purple" /> Attended
                  </div>
                </div>
              </div>
              <div className="h-[350px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={GROWTH_DATA}>
                    <defs>
                      <linearGradient id="colorReg" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#06B6D4" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorAtt" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#7C3AED" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" />
                    <XAxis dataKey="month" stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0F172A', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }} 
                    />
                    <Area type="monotone" dataKey="reg" stroke="#06B6D4" fillOpacity={1} fill="url(#colorReg)" strokeWidth={3} />
                    <Area type="monotone" dataKey="att" stroke="#7C3AED" fillOpacity={1} fill="url(#colorAtt)" strokeWidth={3} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </GlassCard>

            {/* Category Radar */}
            <GlassCard className="p-8 border-white/5">
              <h3 className="text-xl font-black uppercase tracking-widest mb-10">Popular Domains</h3>
              <div className="h-[350px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={CATEGORY_RADAR}>
                    <PolarGrid stroke="#ffffff10" />
                    <PolarAngleAxis dataKey="subject" stroke="#94A3B8" fontSize={10} />
                    <PolarRadiusAxis angle={30} domain={[0, 150]} stroke="none" />
                    <Radar
                      name="Interests"
                      dataKey="A"
                      stroke="#06B6D4"
                      fill="#06B6D4"
                      fillOpacity={0.4}
                    />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0F172A', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }} 
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </GlassCard>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Live Engagement Area */}
            <div className="xl:col-span-2">
              <GlassCard className="p-8 border-white/5">
                <h3 className="text-xl font-black uppercase tracking-widest mb-10">Live Engagement Flow</h3>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={ENGAGEMENT_DATA}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" />
                      <XAxis dataKey="name" stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#0F172A', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }} 
                      />
                      <Line 
                        type="stepAfter" 
                        dataKey="score" 
                        stroke="#06B6D4" 
                        strokeWidth={3} 
                        dot={{ fill: '#06B6D4', strokeWidth: 2, r: 4 }}
                        activeDot={{ r: 8, stroke: '#fff', strokeWidth: 2 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </GlassCard>
            </div>

            {/* Top Insights Feed */}
            <GlassCard className="p-8 border-primary-purple/20 bg-primary-purple/5">
              <h3 className="text-xl font-black uppercase tracking-widest mb-8 flex items-center gap-2">
                <Zap size={20} className="text-accent-warning" /> AI Insights
              </h3>
              <div className="space-y-6">
                <InsightItem title="Peak Hour" desc="Attendance peaks at 4:00 PM. Schedule major announcements then." />
                <InsightItem title="Category Alpha" desc="AI/ML interest has grown by 40% this month. More workshops recommended." />
                <InsightItem title="Retention Hack" desc="Early check-in rewards increased retention by 15%." />
              </div>
            </GlassCard>
          </div>
        </div>
      </main>
    </div>
  );
};

const BigStatCard = ({ label, value, trend, icon: Icon, desc }) => (
  <GlassCard className="p-8 border-white/5 group hover:border-white/10 transition-all">
    <div className="flex items-center justify-between mb-6">
      <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-primary-cyan group-hover:scale-110 transition-transform">
        <Icon size={28} />
      </div>
      <div className="text-right">
        <div className="text-accent-success font-black text-sm">{trend}</div>
        <div className="text-[10px] text-text-muted font-black uppercase tracking-widest">vs Last Month</div>
      </div>
    </div>
    <h4 className="text-4xl font-black mb-2 tracking-tight">{value}</h4>
    <p className="text-xs font-black uppercase tracking-[0.2em] text-text-muted mb-4">{label}</p>
    <p className="text-[11px] text-text-muted font-medium italic opacity-70">{desc}</p>
  </GlassCard>
);

const InsightItem = ({ title, desc }) => (
  <div className="p-4 glass rounded-2xl border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-all group">
    <h5 className="font-bold text-sm mb-1 group-hover:text-primary-cyan transition-colors">{title}</h5>
    <p className="text-[11px] text-text-muted font-medium leading-relaxed">{desc}</p>
  </div>
);
