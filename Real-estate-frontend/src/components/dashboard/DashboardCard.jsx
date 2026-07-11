import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

export default function DashboardCard({ title, value, change, changeType, icon: Icon, role }) {
  // Theme highlights
  const bgStyles = {
    admin: 'text-admin bg-admin-light',
    vendor: 'text-vendor bg-vendor-light',
    agent: 'text-agent bg-agent-light',
    customer: 'text-customer bg-customer-light'
  };

  const currentBg = bgStyles[role] || 'text-blue-600 bg-blue-50';

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-premium hover:shadow-premium-hover transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-semibold text-slate-400">{title}</span>
        <div className={`p-3 rounded-xl ${currentBg}`}>
          <Icon size={20} />
        </div>
      </div>

      <div className="flex items-baseline space-x-2">
        <span className="text-2xl font-extrabold text-slate-800 tracking-tight">{value}</span>
        {change && (
          <span className={`inline-flex items-center text-xs font-bold px-2 py-0.5 rounded-full ${
            changeType === 'up' 
              ? 'bg-emerald-50 text-emerald-600' 
              : changeType === 'down' 
              ? 'bg-red-50 text-red-600' 
              : 'bg-slate-50 text-slate-500'
          }`}>
            {changeType === 'up' ? (
              <ArrowUpRight size={12} className="mr-0.5" />
            ) : changeType === 'down' ? (
              <ArrowDownRight size={12} className="mr-0.5" />
            ) : null}
            {change}
          </span>
        )}
      </div>
    </div>
  );
}
