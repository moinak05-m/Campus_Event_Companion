import { motion } from "framer-motion";
import { 
  LayoutDashboard, 
  PlusCircle, 
  Edit3, 
  List, 
  QrCode, 
  BarChart3, 
  LineChart, 
  Calendar, 
  Users, 
  Bell, 
  Settings,
  Zap,
  LogOut
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { twMerge } from "tailwind-merge";

export const OrganizerSidebar = () => {
  const location = useLocation();

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard/organizer" },
    { icon: PlusCircle, label: "Create Event", path: "/organizer/create" },
    { icon: Edit3, label: "Edit Event", path: "/organizer/edit" },
    { icon: List, label: "Manage Events", path: "/organizer/manage" },
    { icon: QrCode, label: "QR Scanner", path: "/organizer/scanner" },
    { icon: BarChart3, label: "Attendance", path: "/organizer/attendance" },
    { icon: LineChart, label: "Analytics", path: "/organizer/analytics" },
    { icon: Calendar, label: "Calendar", path: "/organizer/calendar" },
    { icon: Users, label: "Participants", path: "/organizer/participants" },
    { icon: Bell, label: "Notifications", path: "/organizer/notifications" },
    { icon: Settings, label: "Settings", path: "/organizer/settings" },
  ];

  return (
    <div className="w-20 lg:w-72 h-screen glass border-r border-white/5 sticky top-0 left-0 p-4 lg:p-8 flex flex-col transition-all duration-500 overflow-y-auto overflow-x-hidden">
      <div className="mb-12 flex items-center gap-3">
        <div className="w-10 h-10 bg-neon-gradient rounded-xl flex items-center justify-center shadow-neon-purple shrink-0">
          <Zap className="text-white" size={20} />
        </div>
        <span className="text-xl font-black tracking-tighter hidden lg:block leading-none uppercase italic">Admin<span className="text-primary-cyan">Hub</span></span>
      </div>

      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link key={item.label} to={item.path}>
              <motion.div
                whileHover={{ x: 5 }}
                className={twMerge(
                  "flex items-center gap-4 px-3 lg:px-4 py-3 rounded-xl transition-all duration-300 group",
                  isActive 
                    ? "bg-primary-cyan/10 border border-primary-cyan/20 text-primary-cyan shadow-neon-cyan/10" 
                    : "text-text-muted hover:text-text-light hover:bg-white/5"
                )}
              >
                <item.icon size={20} className={isActive ? "text-primary-cyan" : "text-text-muted group-hover:text-text-light"} />
                <span className="font-bold text-xs uppercase tracking-widest hidden lg:block">{item.label}</span>
                {isActive && (
                  <motion.div 
                    layoutId="active-indicator-org"
                    className="ml-auto w-1.5 h-1.5 bg-primary-cyan rounded-full shadow-neon-cyan hidden lg:block"
                  />
                )}
              </motion.div>
            </Link>
          );
        })}
      </nav>

      <div className="mt-12">
        <button className="flex items-center gap-4 px-3 lg:px-4 py-3 rounded-xl text-text-muted hover:text-accent-danger hover:bg-accent-danger/5 transition-all w-full group">
          <LogOut size={20} className="group-hover:text-accent-danger" />
          <span className="font-bold text-xs uppercase tracking-widest hidden lg:block">Sign Out</span>
        </button>
      </div>
    </div>
  );
};
