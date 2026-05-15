import { motion } from "framer-motion";
import { 
  LayoutDashboard, 
  Calendar, 
  Settings, 
  LogOut, 
  PlusCircle,
  BarChart3,
  Users
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { twMerge } from "tailwind-merge";

export const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { icon: LayoutDashboard, label: "Overview", path: "/dashboard/organizer" },
    { icon: PlusCircle, label: "Create Event", path: "/create" },
    { icon: Calendar, label: "Events List", path: "/events" },
    { icon: BarChart3, label: "Analytics", path: "/analytics" },
    { icon: Users, label: "Attendees", path: "/attendees" },
    { icon: Settings, label: "Settings", path: "/settings" },
  ];

  return (
    <div className="w-72 h-screen glass border-r border-white/5 sticky top-0 left-0 p-8 flex flex-col">
      <div className="mb-12">
        <span className="text-2xl font-black tracking-tighter">CAMPUS<span className="text-primary-purple">COMPANION</span></span>
      </div>

      <nav className="flex-1 space-y-4">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link key={item.label} to={item.path}>
              <motion.div
                whileHover={{ x: 5 }}
                className={twMerge(
                  "flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 group",
                  isActive 
                    ? "bg-primary-purple/10 border border-primary-purple/20 text-primary-purple shadow-neon-purple" 
                    : "text-text-muted hover:text-text-light hover:bg-white/5"
                )}
              >
                <item.icon size={20} className={isActive ? "text-primary-purple" : "text-text-muted group-hover:text-text-light"} />
                <span className="font-bold text-sm">{item.label}</span>
                {isActive && (
                  <motion.div 
                    layoutId="active-indicator"
                    className="ml-auto w-1.5 h-1.5 bg-primary-purple rounded-full shadow-neon-purple"
                  />
                )}
              </motion.div>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto">
        <button className="flex items-center gap-4 px-4 py-3 rounded-xl text-text-muted hover:text-accent-danger hover:bg-accent-danger/5 transition-all w-full">
          <LogOut size={20} />
          <span className="font-bold text-sm">Logout</span>
        </button>
      </div>
    </div>
  );
};
