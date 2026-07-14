import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, Loader2 } from 'lucide-react';
import { getAdminPackageSettingsAPI, updateAdminPackageSettingsAPI } from '../../api/api';

export default function PackageManagementSettingsTab({ setActiveTab }) {
  const navigate = useNavigate();
  const [remindDays, setRemindDays] = useState('3');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await getAdminPackageSettingsAPI();
        setRemindDays(res.data.packageRemindDays.toString());
      } catch (err) {
        console.error('Error fetching package settings:', err);
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
      await updateAdminPackageSettingsAPI({ packageRemindDays: Number(remindDays) });
      alert('Settings updated successfully!');
    } catch (err) {
      alert('Failed to update settings');
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
          <h1 className="text-xl lg:text-2xl font-bold tracking-tight text-slate-900">Settings</h1>
          <div className="flex items-center space-x-2 text-xs text-slate-400 mt-2">
            <Home size={14} className="text-slate-400 cursor-pointer hover:text-blue-600" onClick={() => navigate('/')} />
            <span>&gt;</span>
            <span className="hover:text-blue-600 cursor-pointer" onClick={() => setActiveTab('dashboard')}>Package Management</span>
            <span>&gt;</span>
            <span className="text-slate-500 font-semibold">Settings</span>
          </div>
        </div>
      </div>

      {/* Main Panel Box */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-premium p-8">
        <h3 className="text-sm font-bold text-slate-800 mb-8">Settings</h3>

        <form onSubmit={handleUpdate} className="max-w-2xl mx-auto space-y-6">
          <div className="flex flex-col space-y-1.5">
            <label className="text-xs font-bold text-slate-700">Remind Before (Days) **</label>
            <input
              type="number"
              value={remindDays}
              onChange={(e) => setRemindDays(e.target.value)}
              className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-200 max-w-md"
              required
            />
            <p className="text-[10px] text-amber-600 font-medium leading-relaxed">
              Specify how many days before you want to remind your customers about subscription expiration. (via mail)
            </p>
          </div>

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
