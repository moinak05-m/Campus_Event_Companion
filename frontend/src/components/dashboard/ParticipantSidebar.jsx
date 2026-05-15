import { motion } from "framer-motion";
import { 
  Home, 
  Calendar, 
  Award, 
  Zap, 
  Settings, 
  LogOut,
  Search,
  MessageSquare
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { twMerge } from "tailwind-merge";

export const ParticipantSidebar = () => {
  const location = useLocation();

  const menuItems = [
    { icon: Home, label: "Home", path: "/dashboard/participant" },
    { icon: Calendar, label: "My Events", path: "/my-events" },
    { icon: Award, label: "Certificates", path: "/certificates" },
    { icon: Zap, label: "Points & Rewards", path: "/rewards" },
    { icon: MessageSquare, label: "AI Assistant", path: "/ai-chat" },
    { icon: Settings, label: "Settings", path: "/settings" },
  ];

  return (
    <div className="w-20 lg:w-72 h-screen glass border-r border-white/5 sticky top-0 left-0 p-4 lg:p-8 flex flex-col transition-all duration-500 overflow-hidden">
      <div className="mb-12 flex items-center gap-3">
        <div className="w-10 h-10 bg-neon-gradient rounded-xl flex items-center justify-center shadow-neon-purple shrink-0">
          <Zap className="text-white" size={20} />
        </div>
        <span className="text-xl font-black tracking-tighter hidden lg:block leading-none">CAMPUS<span className="text-primary-cyan">COMPANION</span></span>
      </div>

      <nav className="flex-1 space-y-4">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link key={item.label} to={item.path}>
              <motion.div
                whileHover={{ x: 5 }}
                className={twMerge(
                  "flex items-center gap-4 px-3 lg:px-4 py-3 rounded-xl transition-all duration-300 group",
                  isActive 
                    ? "bg-primary-purple/10 border border-primary-purple/20 text-primary-purple shadow-neon-purple" 
                    : "text-text-muted hover:text-text-light hover:bg-white/5"
                )}
              >
                <item.icon size={20} className={isActive ? "text-primary-purple" : "text-text-muted group-hover:text-text-light"} />
                <span className="font-bold text-sm hidden lg:block">{item.label}</span>
                {isActive && (
                  <motion.div 
                    layoutId="active-indicator-p"
                    className="ml-auto w-1.5 h-1.5 bg-primary-purple rounded-full shadow-neon-purple hidden lg:block"
                  />
                )}
              </motion.div>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto">
        <button className="flex items-center gap-4 px-3 lg:px-4 py-3 rounded-xl text-text-muted hover:text-accent-danger hover:bg-accent-danger/5 transition-all w-full group">
          <LogOut size={20} className="group-hover:text-accent-danger" />
          <span className="font-bold text-sm hidden lg:block">Logout</span>
        </button>
      </div>
    </div>
  );
};
