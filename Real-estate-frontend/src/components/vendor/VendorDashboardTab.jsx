import React, { useState, useEffect } from 'react';
import { 
  Users, Building2, HardHat, FileText, DollarSign, Award, CreditCard
} from 'lucide-react';
import { 
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, 
  CartesianGrid, Tooltip, Legend 
} from 'recharts';
import { useAuth } from '../../context/AuthContext';
import { getVendorStatsAPI, getVendorChartDataAPI } from '../../api/api';

export default function VendorDashboardTab({ setActiveTab }) {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [statsRes, chartRes] = await Promise.all([
          getVendorStatsAPI(),
          getVendorChartDataAPI(),
        ]);
        setStats(statsRes.data);
        setChartData(chartRes.data);
      } catch (err) {
        console.error('Failed to load dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  const statsData = [
    { id: 'agents', name: 'Agents', value: stats?.agents ?? 0, icon: Users, bg: 'bg-[#1e293b]', shadow: 'shadow-[#1e293b]/10' },
    { id: 'properties-list', name: 'Properties', value: stats?.myProperties ?? 0, icon: Building2, bg: 'bg-blue-600', shadow: 'shadow-blue-600/10' },
    { id: 'projects-list', name: 'Projects', value: stats?.projects ?? 0, icon: HardHat, bg: 'bg-emerald-500', shadow: 'shadow-emerald-500/10' },
    { id: 'tickets-list', name: 'Support Tickets', value: stats?.ticketsCount ?? 0, icon: FileText, bg: 'bg-indigo-500', shadow: 'shadow-indigo-500/10' },
    { id: 'payment-logs', name: 'Payment Logs', value: stats?.paymentLogsCount ?? 0, icon: DollarSign, bg: 'bg-sky-500', shadow: 'shadow-sky-500/10' }
  ];

  // Determine dynamic Y-axis domain from chart data
  const maxVal = chartData.reduce((max, d) => {
    const propVal = d['Monthly Property Posts'] || 0;
    const projVal = d['Monthly Projects Post'] || 0;
    return Math.max(max, propVal, projVal);
  }, 0);
  const yMax = Math.max(maxVal + 1, 2);

  if (loading) {
    return (
      <div className="space-y-8 animate-in fade-in duration-300">
        <div className="h-8 w-64 bg-slate-200 rounded-lg animate-pulse"></div>
        <div className="h-12 w-full bg-slate-100 rounded-xl animate-pulse"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-24 bg-slate-200 rounded-xl animate-pulse"></div>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="h-80 bg-slate-100 rounded-2xl animate-pulse"></div>
          <div className="h-80 bg-slate-100 rounded-2xl animate-pulse"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Welcome Title */}
      <div>
        <h1 className="text-xl lg:text-2xl font-bold text-slate-800 tracking-tight">
          Welcome back, {user?.name || user?.username || 'Vendor'}!
        </h1>
      </div>

      {/* Package Notice Banner */}
      <div className="bg-white border border-slate-100 rounded-xl p-4 shadow-sm text-xs font-bold text-slate-700 flex items-center space-x-2">
        <span>Current Packages: Platinum</span>
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
          <h3 className="text-sm font-bold text-slate-800 mb-6">Monthly Property Posts ({new Date().getFullYear()})</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} domain={[0, yMax]} allowDecimals={false} />
                <Tooltip contentStyle={{ background: '#0f172a', borderRadius: '12px', border: 'none', color: '#fff', fontSize: '11px' }} />
                <Legend iconType="rect" verticalAlign="bottom" align="center" wrapperStyle={{ fontSize: '11px', paddingTop: '15px' }} />
                <Line type="monotone" dataKey="Monthly Property Posts" stroke="#2563eb" strokeWidth={2} dot={{ fill: '#2563eb', strokeWidth: 1.5, r: 3 }} activeDot={{ r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Monthly Projects Post */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-premium">
          <h3 className="text-sm font-bold text-slate-800 mb-6">Monthly Projects Post ({new Date().getFullYear()})</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} domain={[0, yMax]} allowDecimals={false} />
                <Tooltip contentStyle={{ background: '#0f172a', borderRadius: '12px', border: 'none', color: '#fff', fontSize: '11px' }} />
                <Legend iconType="rect" verticalAlign="bottom" align="center" wrapperStyle={{ fontSize: '11px', paddingTop: '15px' }} />
                <Line type="monotone" dataKey="Monthly Projects Post" stroke="#10b981" strokeWidth={2} dot={{ fill: '#10b981', strokeWidth: 1.5, r: 3 }} activeDot={{ r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

    </div>
  );
}
