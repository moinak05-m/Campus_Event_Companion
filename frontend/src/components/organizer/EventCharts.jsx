import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts';
import { GlassCard } from '../ui/GlassCard';

const REGISTRATION_DATA = [
  { name: 'Mon', count: 40 },
  { name: 'Tue', count: 70 },
  { name: 'Wed', count: 120 },
  { name: 'Thu', count: 90 },
  { name: 'Fri', count: 200 },
  { name: 'Sat', count: 350 },
  { name: 'Sun', count: 480 },
];

const ATTENDANCE_DATA = [
  { name: 'Tech', value: 85 },
  { name: 'Cultural', value: 92 },
  { name: 'Sports', value: 78 },
  { name: 'Seminars', value: 65 },
];

export const EventCharts = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
      {/* Registration Trend */}
      <GlassCard className="p-8 border-white/5">
        <h3 className="text-lg font-black mb-8 uppercase tracking-widest flex items-center gap-3">
          <div className="w-2 h-2 bg-primary-cyan rounded-full shadow-neon-cyan" /> Registration Trend
        </h3>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={REGISTRATION_DATA}>
              <defs>
                <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#06B6D4" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" />
              <XAxis 
                dataKey="name" 
                stroke="#94A3B8" 
                fontSize={12} 
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                stroke="#94A3B8" 
                fontSize={12} 
                tickLine={false}
                axisLine={false}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#0F172A', 
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '12px',
                  backdropFilter: 'blur(10px)'
                }} 
              />
              <Area 
                type="monotone" 
                dataKey="count" 
                stroke="#06B6D4" 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#colorCount)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>

      {/* Attendance by Category */}
      <GlassCard className="p-8 border-white/5">
        <h3 className="text-lg font-black mb-8 uppercase tracking-widest flex items-center gap-3">
          <div className="w-2 h-2 bg-primary-purple rounded-full shadow-neon-purple" /> Attendance Rate (%)
        </h3>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={ATTENDANCE_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" />
              <XAxis 
                dataKey="name" 
                stroke="#94A3B8" 
                fontSize={12} 
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                stroke="#94A3B8" 
                fontSize={12} 
                tickLine={false}
                axisLine={false}
              />
              <Tooltip 
                cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                contentStyle={{ 
                  backgroundColor: '#0F172A', 
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '12px'
                }} 
              />
              <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                {ATTENDANCE_DATA.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#7C3AED' : '#06B6D4'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>
    </div>
  );
};
