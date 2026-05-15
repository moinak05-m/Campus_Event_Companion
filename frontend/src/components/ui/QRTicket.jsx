import { motion } from "framer-motion";
import { GlassCard } from "./GlassCard";
import { QRCodeSVG } from "qrcode.react";
import { Zap, Calendar, MapPin, User, ShieldCheck } from "lucide-react";

export const QRTicket = ({ eventTitle, eventDate, eventTime, eventLocation }) => {
  const ticketId = "TKT-" + Math.random().toString(36).substr(2, 9).toUpperCase();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative group w-full max-w-sm mx-auto"
    >
      {/* Ticket Body (Boarding Pass Design) */}
      <div className="relative glass border-primary-cyan/30 rounded-[32px] overflow-hidden shadow-2xl animate-float">
        <div className="absolute inset-0 bg-neon-gradient opacity-5" />
        
        {/* Top Section */}
        <div className="p-8 border-b border-white/10 border-dashed relative">
          <div className="flex items-center justify-between mb-8">
            <div className="w-10 h-10 bg-primary-cyan/10 rounded-xl flex items-center justify-center text-primary-cyan shadow-neon-cyan/20">
              <Zap size={20} className="fill-current" />
            </div>
            <div className="flex flex-col items-end">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-text-muted">Digital Pass</p>
              <p className="text-xs font-bold text-primary-purple">{ticketId}</p>
            </div>
          </div>

          <h3 className="text-2xl font-black mb-6 leading-tight">{eventTitle}</h3>
          
          <div className="space-y-3">
            <TicketInfo icon={Calendar} label={`${eventDate} • ${eventTime}`} />
            <TicketInfo icon={MapPin} label={eventLocation} />
            <TicketInfo icon={User} label="Rahul Sharma (Verified Student)" />
          </div>

          {/* Notch Visuals */}
          <div className="absolute -bottom-4 -left-4 w-8 h-8 bg-background rounded-full z-20" />
          <div className="absolute -bottom-4 -right-4 w-8 h-8 bg-background rounded-full z-20" />
        </div>

        {/* Bottom Section (QR Area) */}
        <div className="p-8 bg-white/[0.02] flex flex-col items-center">
          <div className="p-4 bg-white rounded-2xl shadow-xl mb-6">
            <QRCodeSVG 
              value={`https://campus-companion.edu/verify/${ticketId}`} 
              size={140}
              fgColor="#0F172A"
            />
          </div>
          
          <div className="flex items-center gap-2 text-accent-success text-xs font-black uppercase tracking-widest">
            <ShieldCheck size={16} />
            Admission Guaranteed
          </div>
        </div>
      </div>

      {/* Decorative Glow */}
      <div className="absolute -inset-2 bg-primary-cyan/20 blur-2xl -z-10 rounded-[32px] group-hover:opacity-100 opacity-50 transition-opacity" />
    </motion.div>
  );
};

const TicketInfo = ({ icon: Icon, label }) => (
  <div className="flex items-center gap-3 text-text-muted">
    <Icon size={14} className="text-primary-cyan" />
    <span className="text-[11px] font-bold uppercase tracking-wider">{label}</span>
  </div>
);
