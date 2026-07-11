import React from 'react';
import { 
  Users, Building2, HardHat, FileText, DollarSign, Award, CreditCard
} from 'lucide-react';
import { 
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, 
  CartesianGrid, Tooltip, Legend 
} from 'recharts';

export default function VendorDashboardTab({ setActiveTab }) {
  
  const statsData = [
    { id: 'agents', name: 'Agents', value: 1, icon: Users, bg: 'bg-[#1e293b]', shadow: 'shadow-[#1e293b]/10' },
    { id: 'properties', name: 'Properties', value: 3, icon: Building2, bg: 'bg-blue-600', shadow: 'shadow-blue-600/10' },
    { id: 'projects', name: 'Projects', value: 2, icon: HardHat, bg: 'bg-emerald-500', shadow: 'shadow-emerald-500/10' },
    { id: 'tickets', name: 'Support Tickets', value: 0, icon: FileText, bg: 'bg-indigo-500', shadow: 'shadow-indigo-500/10' },
    { id: 'payment-log', name: 'Payment Logs', value: 1, icon: DollarSign, bg: 'bg-sky-500', shadow: 'shadow-sky-500/10' }
  ];

  // Flat data matching flat charts in the mockup
  const chartData = [
    { month: 'Jan', 'Monthly Property Posts': 0, 'Monthly Projects Post': 0 },
    { month: 'Feb', 'Monthly Property Posts': 0, 'Monthly Projects Post': 0 },
    { month: 'Mar', 'Monthly Property Posts': 0, 'Monthly Projects Post': 0 },
    { month: 'Apr', 'Monthly Property Posts': 0, 'Monthly Projects Post': 0 },
    { month: 'May', 'Monthly Property Posts': 0, 'Monthly Projects Post': 0 },
    { month: 'Jun', 'Monthly Property Posts': 0, 'Monthly Projects Post': 0 },
    { month: 'Jul', 'Monthly Property Posts': 0, 'Monthly Projects Post': 0 },
    { month: 'Aug', 'Monthly Property Posts': 0, 'Monthly Projects Post': 0 },
    { month: 'Sep', 'Monthly Property Posts': 0, 'Monthly Projects Post': 0 },
    { month: 'Oct', 'Monthly Property Posts': 0, 'Monthly Projects Post': 0 },
    { month: 'Nov', 'Monthly Property Posts': 0, 'Monthly Projects Post': 0 },
    { month: 'Dec', 'Monthly Property Posts': 0, 'Monthly Projects Post': 0 }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Welcome Title */}
      <div>
        <h1 className="text-xl lg:text-2xl font-bold text-slate-800 tracking-tight">
          Welcome back, oscar_eade!
        </h1>
      </div>

      {/* Package Notice Banner */}
      <div className="bg-white border border-slate-100 rounded-xl p-4 shadow-sm text-xs font-bold text-slate-700 flex items-center space-x-2">
        <span>Current Package: Platinum</span>
        <span className="px-2 py-0.5 bg-indigo-600 text-white rounded text-[10px] uppercase font-bold tracking-wider">Lifetime</span>
        <span>(Expire Date: Lifetime)</span>
      </div>

      {/* Grid of 5 Solid-Colored Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {statsData.map((card) => {
          const Icon = card.icon;
          return (
            <div 
              key={card.id}
              onClick={() => setActiveTab(card.id)}
              className={`${card.bg} text-white rounded-xl p-5 shadow-lg relative overflow-hidden group hover:scale-[1.02] transition-transform duration-300 cursor-pointer`}
            >
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <h4 className="text-xs font-semibold text-white/80 tracking-wide uppercase">{card.name}</h4>
                  <p className="text-3xl font-extrabold">{card.value}</p>
                </div>
                <div className="p-3 bg-white/10 rounded-xl backdrop-blur-xs">
                  <Icon size={20} className="text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Chart 1: Monthly Property Posts */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-premium">
          <h3 className="text-sm font-bold text-slate-800 mb-6">Monthly Property Posts (2026)</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} domain={[-1.0, 1.0]} ticks={[-1.0, -0.8, -0.6, -0.4, -0.2, 0, 0.2, 0.4, 0.6, 0.8, 1.0]} />
                <Tooltip contentStyle={{ background: '#0f172a', borderRadius: '12px', border: 'none', color: '#fff', fontSize: '11px' }} />
                <Legend iconType="rect" verticalAlign="bottom" align="center" wrapperStyle={{ fontSize: '11px', paddingTop: '15px' }} />
                <Line type="linear" dataKey="Monthly Property Posts" stroke="#2563eb" strokeWidth={2} dot={{ fill: '#2563eb', strokeWidth: 1.5, r: 3 }} activeDot={{ r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Monthly Projects Post */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-premium">
          <h3 className="text-sm font-bold text-slate-800 mb-6">Monthly Projects Post (2026)</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} domain={[-1.0, 1.0]} ticks={[-1.0, -0.8, -0.6, -0.4, -0.2, 0, 0.2, 0.4, 0.6, 0.8, 1.0]} />
                <Tooltip contentStyle={{ background: '#0f172a', borderRadius: '12px', border: 'none', color: '#fff', fontSize: '11px' }} />
                <Legend iconType="rect" verticalAlign="bottom" align="center" wrapperStyle={{ fontSize: '11px', paddingTop: '15px' }} />
                <Line type="linear" dataKey="Monthly Projects Post" stroke="#2563eb" strokeWidth={2} dot={{ fill: '#2563eb', strokeWidth: 1.5, r: 3 }} activeDot={{ r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

    </div>
  );
}
