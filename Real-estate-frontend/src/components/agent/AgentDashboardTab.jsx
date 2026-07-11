import React from 'react';
import { Home, Building2 } from 'lucide-react';
import { 
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, 
  CartesianGrid, Tooltip, Legend 
} from 'recharts';

export default function AgentDashboardTab({ setActiveTab, propertiesCount = 2, projectsCount = 0 }) {
  
  // Stats Data matching properties (green) and projects (purple) in the screenshot
  const statsData = [
    { id: 'properties-list', name: 'Properties', value: propertiesCount, icon: Home, bg: 'bg-[#22c55e]', shadow: 'shadow-[#22c55e]/10' },
    { id: 'projects-list', name: 'Projects', value: projectsCount, icon: Building2, bg: 'bg-[#6366f1]', shadow: 'shadow-[#6366f1]/10' }
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
          Welcome back, rendall!
        </h1>
      </div>

      {/* Grid of 2 Solid-Colored Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
        {statsData.map((card) => {
          const Icon = card.icon;
          return (
            <div 
              key={card.id}
              onClick={() => setActiveTab(card.id)}
              className={`${card.bg} text-white rounded-xl p-8 shadow-lg relative overflow-hidden group hover:scale-[1.01] transition-transform duration-300 cursor-pointer`}
            >
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <h4 className="text-xs font-semibold text-white/80 tracking-wide uppercase">{card.name}</h4>
                  <p className="text-4xl font-extrabold">{card.value}</p>
                </div>
                <div className="p-4 bg-white/10 rounded-2xl backdrop-blur-xs">
                  <Icon size={24} className="text-white" />
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
