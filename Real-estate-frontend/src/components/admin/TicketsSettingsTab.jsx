import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, Loader2 } from 'lucide-react';
import axiosInstance from '../../api/axiosInstance';

export default function TicketsSettingsTab({ setActiveTab }) {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(true);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await axiosInstance.get('/admin/settings');
        setIsActive(res.data.ticketsActive !== false);
      } catch (err) {
        console.error('Error fetching ticket settings:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await axiosInstance.put('/admin/settings', {
        ticketsActive: isActive
      });
      alert('Support ticket settings updated successfully!');
    } catch (err) {
      alert('Failed to update ticket settings');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-20 bg-white rounded-2xl border border-slate-100 shadow-premium">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-650"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Heading & Breadcrumbs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-slate-100">
        <div>
          <h1 className="text-xl lg:text-2xl font-bold tracking-tight text-slate-900">Setting</h1>
          <div className="flex items-center space-x-2 text-xs text-slate-400 mt-2">
            <Home size={14} className="text-slate-400 cursor-pointer hover:text-blue-600" onClick={() => navigate('/')} />
            <span>&gt;</span>
            <span className="hover:text-blue-600 cursor-pointer" onClick={() => setActiveTab('dashboard')}>Support Tickets</span>
            <span>&gt;</span>
            <span className="text-slate-500 font-semibold">Setting</span>
          </div>
        </div>
      </div>

      {/* Main Panel Box */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-premium p-8">
        <h3 className="text-sm font-bold text-slate-800 mb-8">Setting</h3>

        <form onSubmit={handleUpdate} className="max-w-xl mx-auto space-y-8">
          
          {/* Active / Deactive sliding choice toggle */}
          <div className="flex flex-col space-y-3">
            <label className="text-xs font-bold text-slate-700">Support Ticket*</label>
            <div className="flex border border-slate-200 rounded-xl overflow-hidden max-w-sm">
              <button
                type="button"
                onClick={() => setIsActive(true)}
                className={`flex-1 py-3 text-xs font-bold transition-all ${
                  isActive 
                    ? 'bg-blue-50 text-blue-600 border-r border-blue-100 outline-none ring-1 ring-blue-200' 
                    : 'bg-white text-slate-450 hover:bg-slate-50'
                }`}
              >
                Active
              </button>
              <button
                type="button"
                onClick={() => setIsActive(false)}
                className={`flex-1 py-3 text-xs font-bold transition-all ${
                  !isActive 
                    ? 'bg-blue-50 text-blue-600 border-l border-blue-100 outline-none ring-1 ring-blue-200' 
                    : 'bg-white text-slate-450 hover:bg-slate-50'
                }`}
              >
                Deactive
              </button>
            </div>
          </div>

          {/* Action Update button */}
          <div className="flex justify-center pt-4">
            <button
              type="submit"
              disabled={saving}
              className="px-8 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold transition active:scale-95 shadow-md shadow-emerald-500/10 disabled:opacity-50 flex items-center space-x-2"
            >
              {saving && <Loader2 size={14} className="animate-spin" />}
              <span>{saving ? 'Updating...' : 'Update'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
