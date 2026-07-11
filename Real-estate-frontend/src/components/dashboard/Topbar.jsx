import React from 'react';
import { Bell, Search, Settings } from 'lucide-react';

export default function Topbar({ user, role }) {
  // Title mapping
  const titleMap = {
    admin: 'System Control Center',
    vendor: 'Builder Workspace',
    agent: 'Agent Desk',
    customer: 'My Property Hub'
  };

  const badgeColor = {
    admin: 'bg-admin text-white',
    vendor: 'bg-vendor text-white',
    agent: 'bg-agent text-white',
    customer: 'bg-customer text-white'
  };

  return (
    <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-100 flex items-center justify-between px-6 lg:px-10 sticky top-0 z-20">
      {/* Page Title & Context */}
      <div className="flex flex-col pl-12 lg:pl-0">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          {titleMap[role] || 'Dashboard'}
        </span>
        <h2 className="text-lg font-bold text-slate-800 tracking-tight">
          Hello, {user?.name || 'User'}
        </h2>
      </div>

      {/* Actions */}
      <div className="flex items-center space-x-6">
        {/* Search */}
        <div className="hidden sm:flex items-center relative">
          <Search size={16} className="absolute left-3.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search assets, leads, updates..."
            className="bg-slate-50 border border-slate-100 hover:bg-slate-100/50 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200 transition-all w-60"
          />
        </div>

        {/* Notifications */}
        <button className="p-2.5 bg-slate-50 text-slate-500 hover:text-slate-800 rounded-xl border border-slate-100 relative transition active:scale-95">
          <Bell size={18} />
          <span className="absolute top-1 right-1.5 h-2.5 w-2.5 bg-red-500 rounded-full ring-2 ring-white"></span>
        </button>

        {/* User Profile */}
        <div className="flex items-center space-x-3 pl-4 border-l border-slate-100">
          <img
            src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80'}
            alt={user?.name}
            className="h-10 w-10 rounded-xl object-cover ring-2 ring-slate-100"
          />
          <div className="hidden md:flex flex-col items-start text-left">
            <span className="text-sm font-bold text-slate-800">{user?.name}</span>
            <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${badgeColor[role] || 'bg-slate-900 text-white'}`}>
              {role === 'admin' ? 'Super Admin' : role}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
