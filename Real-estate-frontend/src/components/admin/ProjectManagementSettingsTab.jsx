import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, Loader2 } from 'lucide-react';
import { getAdminProjectSettingsAPI, updateAdminProjectSettingsAPI } from '../../api/api';

export default function ProjectManagementSettingsTab({ setActiveTab }) {
  const navigate = useNavigate();
  const [needsApproval, setNeedsApproval] = useState(true);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await getAdminProjectSettingsAPI();
        setNeedsApproval(res.data.needsProjectApproval);
      } catch (err) {
        console.error('Error fetching project settings:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleUpdate = async () => {
    setSaving(true);
    try {
      await updateAdminProjectSettingsAPI({ needsProjectApproval: needsApproval });
      alert('Project settings updated successfully!');
    } catch (err) {
      alert('Failed to update project settings');
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
            <span className="hover:text-blue-600 cursor-pointer" onClick={() => setActiveTab('dashboard')}>Project Management</span>
            <span>&gt;</span>
            <span className="text-slate-500 font-semibold">Settings</span>
          </div>
        </div>
      </div>

      {/* Main Panel Box */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-premium p-8">
        <h3 className="text-sm font-bold text-slate-800 mb-8">Settings</h3>
        
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="flex flex-col space-y-2">
            <label className="text-xs font-bold text-slate-700">Needs Admin Approval for Project*</label>
            <div className="flex border border-slate-200 rounded-xl overflow-hidden max-w-md">
              <button
                type="button"
                onClick={() => setNeedsApproval(true)}
                className={`flex-1 py-3 text-xs font-bold transition-all ${
                  needsApproval
                    ? 'bg-blue-50 text-blue-600 border-r border-slate-200'
                    : 'bg-white text-slate-450 hover:bg-slate-50 border-r border-slate-200'
                }`}
              >
                Yes
              </button>
              <button
                type="button"
                onClick={() => setNeedsApproval(false)}
                className={`flex-1 py-3 text-xs font-bold transition-all ${
                  !needsApproval
                    ? 'bg-blue-50 text-blue-600'
                    : 'bg-white text-slate-450 hover:bg-slate-50'
                }`}
              >
                No
              </button>
            </div>
            <p className="text-[10px] text-amber-600 font-medium mt-1 leading-relaxed">
              Note: if you select yes, when vendor or agent post/listing a property they need to get approval from admin to show project in frontend.
            </p>
          </div>

          <div className="flex justify-center pt-4">
            <button
              onClick={handleUpdate}
              disabled={saving}
              className="px-8 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold transition active:scale-95 shadow-md shadow-emerald-500/10 disabled:opacity-50 flex items-center space-x-2"
            >
              {saving && <Loader2 size={14} className="animate-spin" />}
              <span>{saving ? 'Updating...' : 'Update'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
