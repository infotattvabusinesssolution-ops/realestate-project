import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home } from 'lucide-react';
import { getAdminTicketSettingsAPI, updateAdminSettingsAPI } from '../../api/api';

export default function AdvertisementsSettingsTab({ setActiveTab }) {
  const navigate = useNavigate();
  const [publisherId, setPublisherId] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setLoading(true);
        const res = await getAdminTicketSettingsAPI();
        setPublisherId(res.data.adsensePublisherId || '');
        setLoading(false);
      } catch (err) {
        console.error('Failed to load advertisements settings:', err);
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateAdminSettingsAPI({ adsensePublisherId: publisherId });
      alert('Google AdSense Publisher ID updated successfully!');
    } catch (err) {
      alert('Failed to update Google AdSense Publisher ID: ' + (err.response?.data?.message || err.message));
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
            <span className="hover:text-blue-600 cursor-pointer" onClick={() => setActiveTab('dashboard')}>Advertisements</span>
            <span>&gt;</span>
            <span className="text-slate-500 font-semibold">Settings</span>
          </div>
        </div>
      </div>

      {/* Main Panel Box */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-premium p-6">
        <h3 className="text-sm font-bold text-slate-800 pb-3 border-b border-slate-50 mb-6">Update Settings</h3>
        
        <form onSubmit={handleUpdate} className="max-w-xl mx-auto space-y-6 text-xs font-bold text-slate-700">
          
          <div className="flex flex-col space-y-2">
            <label>Google Adsense Publisher ID*</label>
            <input
              type="text"
              placeholder="Enter Google Adsense Publisher ID"
              value={publisherId}
              onChange={(e) => setPublisherId(e.target.value)}
              className="bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none w-full"
              required
            />
            <p className="text-[10px] text-slate-450 font-medium">
              <a 
                href="https://support.google.com/adsense/answer/105516?hl=en" 
                target="_blank" 
                rel="noreferrer" 
                className="text-blue-600 hover:underline font-bold"
              >
                Click Here
              </a>{' '}
              to find the publisher id in your google adsense account.
            </p>
          </div>

          <div className="flex justify-center pt-2">
            <button
              type="submit"
              className="px-8 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold transition active:scale-95 shadow-md shadow-emerald-500/10"
            >
              Update
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
