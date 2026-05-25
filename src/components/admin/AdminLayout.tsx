import React, { useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { useAuth } from "./AuthContext";
import { 
  LayoutDashboard, 
  Briefcase, 
  Users, 
  BookOpen, 
  LogOut, 
  Menu, 
  X,
  User as UserIcon,
  Compass
} from "lucide-react";
import logo from "@/assets/planning-logo-white.png";

interface SidebarLinkProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ to, icon, label, onClick }) => {
  const routerState = useRouterState();
  const isActive = routerState.location.pathname === to;

  return (
    <Link
      to={to}
      onClick={onClick}
      className={`flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-300 group ${
        isActive 
          ? "bg-white/10 text-white border-l-2 border-white/80 font-normal shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)]" 
          : "text-white/60 hover:text-white hover:bg-white/5 font-light"
      }`}
    >
      <span className={`transition-transform duration-300 group-hover:scale-110 ${isActive ? "text-white" : "text-white/60 group-hover:text-white"}`}>
        {icon}
      </span>
      <span className="text-sm tracking-wide">{label}</span>
    </Link>
  );
};

export const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, signOut } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigation = [
    { to: "/admin", icon: <LayoutDashboard size={18} />, label: "Dashboard" },
    { to: "/admin/projects", icon: <Briefcase size={18} />, label: "Projects" },
    { to: "/admin/staff", icon: <Users size={18} />, label: "Staff" },
    { to: "/admin/adventures", icon: <BookOpen size={18} />, label: "Adventures" },
  ];

  return (
    <div className="min-h-screen bg-background-deep text-white flex overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden transition-opacity duration-300"
        />
      )}

      {/* Sidebar Workspace */}
      <aside className={`fixed lg:static top-0 bottom-0 left-0 z-50 w-72 bg-background border-r border-hairline flex flex-col justify-between transition-transform duration-300 ease-in-out lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}>
        <div className="p-6 flex flex-col gap-8">
          {/* Logo Zone */}
          <div className="flex items-center justify-between border-b border-hairline pb-6">
            <div className="flex items-center gap-3">
              <img src={logo} alt="Planning Logo" className="h-7 w-auto object-contain" />
              <div className="h-4 w-[1px] bg-white/20" />
              <span className="text-[10px] tracking-[0.25em] text-white/50 font-normal uppercase">CMS</span>
            </div>
            <button 
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-white/60 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-2">
            {navigation.map((item) => (
              <SidebarLink
                key={item.to}
                to={item.to}
                icon={item.icon}
                label={item.label}
                onClick={() => setSidebarOpen(false)}
              />
            ))}
          </nav>
        </div>

        {/* User / Sign Out Panel */}
        <div className="p-6 border-t border-hairline bg-black/10 flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-white/10 flex items-center justify-center text-white/80 border border-hairline">
              <UserIcon size={16} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-white/40 font-light uppercase tracking-wider">Signed In As</p>
              <p className="text-sm font-light text-white/80 truncate">{user?.email}</p>
            </div>
          </div>

          <button
            onClick={signOut}
            className="flex items-center justify-center gap-3 w-full py-2.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 hover:text-white text-white/70 transition-all duration-300 text-sm font-light shadow-sm"
          >
            <LogOut size={16} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Workspace Panel */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top bar for mobile header & status */}
        <header className="h-16 border-b border-hairline bg-background flex items-center justify-between px-6 lg:justify-end gap-4 shrink-0">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden text-white/80 hover:text-white p-2 rounded-lg bg-white/5 border border-hairline transition-colors"
          >
            <Menu size={20} />
          </button>

          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="hidden md:flex items-center gap-2 text-xs tracking-wider uppercase text-white/60 hover:text-white bg-white/5 px-3 py-1.5 rounded-lg border border-hairline transition-all"
            >
              <Compass size={13} />
              <span>Live Website</span>
            </Link>
          </div>
        </header>

        {/* Page Body Content */}
        <main className="flex-1 p-6 md:p-8 lg:p-10 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
};
