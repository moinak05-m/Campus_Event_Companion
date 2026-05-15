import { motion } from "framer-motion";
import { NeonButton } from "../ui/NeonButton";
import { Sparkles, Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ProfileDrawer } from "../../components/dashboard/ProfileDrawer";
import { useAuth } from "../../context/AuthContext";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { user } = useAuth();

  return (
    <>
      <ProfileDrawer isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto glass rounded-2xl px-6 py-3 flex items-center justify-between border-white/5">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-neon-gradient rounded-xl flex items-center justify-center shadow-neon-purple group-hover:shadow-neon-cyan transition-all duration-500">
              <Sparkles className="text-white" size={20} />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-black tracking-tighter leading-none">CAMPUS<span className="text-primary-cyan">COMPANION</span></span>
              <span className="text-[10px] font-bold text-text-muted uppercase tracking-[0.2em] leading-none mt-1">AI-Powered Hub</span>
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            <NavLink to="/explorer" label="Events" />
            {user && <NavLink to="/certificates" label="Vault" />}
            <NavLink to="/about" label="About" />
          </div>

          <div className="hidden md:flex items-center gap-4">
            {!user ? (
              <>
                <Link to="/auth">
                  <NeonButton variant="ghost" className="px-5">Log In</NeonButton>
                </Link>
                <Link to="/auth">
                  <NeonButton className="px-6">Join Now</NeonButton>
                </Link>
              </>
            ) : (
              <button
                onClick={() => setIsProfileOpen(true)}
                className="relative group ml-2"
              >
                <div className="absolute -inset-1 bg-neon-gradient rounded-full blur opacity-40 group-hover:opacity-100 transition duration-500" />
                <div className="relative w-10 h-10 rounded-full border-2 border-primary-cyan p-0.5 glass overflow-hidden">
                  <img
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name || 'User'}`}
                    alt="Avatar"
                    className="w-full h-full rounded-full"
                  />
                </div>
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden glass p-2 rounded-xl" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Drawer */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-full left-6 right-6 mt-4 glass rounded-3xl p-8 md:hidden border-white/5 flex flex-col gap-6"
          >
            <NavLink to="/explorer" label="Events" onClick={() => setIsOpen(false)} />
            {user && <NavLink to="/certificates" label="Certificates" onClick={() => setIsOpen(false)} />}
            <NavLink to="/about" label="About" onClick={() => setIsOpen(false)} />
            <hr className="border-white/5" />
            {!user && (
              <Link to="/auth" onClick={() => setIsOpen(false)}>
                <NeonButton className="w-full">Get Started</NeonButton>
              </Link>
            )}
          </motion.div>
        )}
      </nav>
    </>
  );
};

const NavLink = ({ label, to, onClick }) => {
  const content = (
    <button
      onClick={onClick}
      className="text-sm font-bold text-text-muted hover:text-primary-cyan transition-colors uppercase tracking-widest"
    >
      {label}
    </button>
  );

  if (to) return <Link to={to}>{content}</Link>;
  return content;
};
