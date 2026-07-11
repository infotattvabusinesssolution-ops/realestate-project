import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Home, Users, Shield, HardHat, FileText, CheckSquare, 
  Building2, Briefcase, Calendar, Star, Settings, LogOut, 
  Menu, X, ClipboardList, TrendingUp, Search, MessageSquare, Heart
} from 'lucide-react';

export default function Sidebar({ role, activeTab, setActiveTab }) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);

  // Role Theme Mapping
  const themeStyles = {
    admin: {
      activeBg: 'bg-admin text-white shadow-md shadow-admin/20',
      hoverText: 'hover:text-admin hover:bg-admin-light',
      dot: 'bg-admin',
      text: 'text-admin'
    },
    vendor: {
      activeBg: 'bg-vendor text-white shadow-md shadow-vendor/20',
      hoverText: 'hover:text-vendor hover:bg-vendor-light',
      dot: 'bg-vendor',
      text: 'text-vendor'
    },
    agent: {
      activeBg: 'bg-agent text-white shadow-md shadow-agent/20',
      hoverText: 'hover:text-agent hover:bg-agent-light',
      dot: 'bg-agent',
      text: 'text-agent'
    },
    customer: {
      activeBg: 'bg-customer text-white shadow-md shadow-customer/20',
      hoverText: 'hover:text-customer hover:bg-customer-light',
      dot: 'bg-customer',
      text: 'text-customer'
    }
  };

  const style = themeStyles[role] || themeStyles.admin;

  // Role Menus Mapping
  const menus = {
    admin: [
      { id: 'overview', name: 'Overview', icon: Shield },
      { id: 'users', name: 'Users List', icon: Users },
      { id: 'vendors', name: 'Manage Vendors', icon: HardHat },
      { id: 'properties', name: 'Properties', icon: Building2 },
      { id: 'approvals', name: 'Approvals', icon: CheckSquare },
      { id: 'settings', name: 'Settings', icon: Settings }
    ],
    vendor: [
      { id: 'overview', name: 'Overview', icon: Building2 },
      { id: 'properties', name: 'Properties', icon: ClipboardList },
      { id: 'projects', name: 'Mega Projects', icon: HardHat },
      { id: 'leads', name: 'Leads', icon: TrendingUp },
      { id: 'settings', name: 'Settings', icon: Settings }
    ],
    agent: [
      { id: 'overview', name: 'Overview', icon: Briefcase },
      { id: 'clients', name: 'Clients', icon: Users },
      { id: 'properties', name: 'Properties', icon: Building2 },
      { id: 'appointments', name: 'Appointments', icon: Calendar },
      { id: 'settings', name: 'Settings', icon: Settings }
    ],
    customer: [
      { id: 'overview', name: 'Overview', icon: Home },
      { id: 'search', name: 'Browse Properties', icon: Search },
      { id: 'wishlist', name: 'My Wishlist', icon: Heart },
      { id: 'messages', name: 'Messages', icon: MessageSquare },
      { id: 'settings', name: 'Settings', icon: Settings }
    ]
  };

  const currentMenu = menus[role] || menus.admin;

  return (
    <>
      {/* Mobile Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2.5 bg-white text-slate-800 rounded-xl shadow-premium border border-slate-100 hover:bg-slate-50 transition"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar Overlay for Mobile */}
      {isOpen && (
        <div 
          onClick={() => setIsOpen(false)}
          className="lg:hidden fixed inset-0 z-30 bg-slate-900/30 backdrop-blur-sm"
        />
      )}

      {/* Sidebar Container */}
      <aside className={`fixed top-0 bottom-0 left-0 z-40 bg-white border-r border-slate-100 flex flex-col justify-between transition-all duration-300 shadow-premium ${
        isOpen ? 'w-64 translate-x-0' : 'w-20 lg:translate-x-0 -translate-x-full'
      }`}>
        <div className="py-6 px-4 space-y-8 flex-1">
          {/* Logo / Brand */}
          <div className="flex items-center space-x-3 px-3">
            <div className={`p-2.5 rounded-xl bg-slate-950 text-white`}>
              <Home size={20} />
            </div>
            {isOpen && (
              <span className="text-xl font-extrabold tracking-tight text-slate-900">
                Estacy<span className={style.text}>.</span>
              </span>
            )}
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {currentMenu.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    // On mobile, auto-close sidebar on item click
                    if (window.innerWidth < 1024) {
                      setIsOpen(false);
                    }
                  }}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 active:scale-95 ${
                    isActive 
                      ? style.activeBg 
                      : `text-slate-500 hover:text-slate-900 ${style.hoverText}`
                  }`}
                >
                  <Icon size={18} className="flex-shrink-0" />
                  {isOpen && <span className="truncate">{item.name}</span>}
                </button>
              );
            })}
          </nav>
        </div>

        {/* User / Logout Section */}
        <div className="p-4 border-t border-slate-100 space-y-2">
          {isOpen && (
            <div className="flex items-center space-x-3 px-2 py-2">
              <span className={`h-2 w-2 rounded-full ${style.dot} animate-pulse`}></span>
              <span className="text-xs font-bold text-slate-400 tracking-wider uppercase">
                {role === 'admin' ? 'Super Admin' : role} Portal
              </span>
            </div>
          )}
          <button
            onClick={() => navigate('/')}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-semibold text-red-500 hover:bg-red-50 transition active:scale-95"
          >
            <LogOut size={18} className="flex-shrink-0" />
            {isOpen && <span>Log Out</span>}
          </button>
        </div>
      </aside>
    </>
  );
}
