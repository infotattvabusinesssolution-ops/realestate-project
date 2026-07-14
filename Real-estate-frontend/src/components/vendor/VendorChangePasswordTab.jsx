import React, { useState } from 'react';
import { Home } from 'lucide-react';
import { changePasswordAPI } from '../../api/api';
import { useToast } from '../../context/ToastContext';

export function VendorChangePasswordTab() {
  const toast = useToast();
  const [current, setCurrent] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirm, setConfirm] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPass.length < 6) {
      toast.error('New password must be at least 6 characters');
      return;
    }
    if (newPass !== confirm) {
      toast.error('Passwords do not match');
      return;
    }
    
    try {
      setSubmitting(true);
      await changePasswordAPI(current, newPass);
      toast.success('Password updated successfully!');
      setCurrent('');
      setNewPass('');
      setConfirm('');
    } catch (err) {
      toast.error(err || 'Failed to change password. Please verify current password.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
        <h2 className="text-lg font-bold text-slate-800">Change Password</h2>
        <div className="flex items-center space-x-2 text-[10px] font-bold text-slate-400">
          <Home size={12} className="text-slate-350" />
          <span>&gt;</span>
          <span className="text-slate-650">Password Settings</span>
        </div>
      </div>

      {/* Card wrapper */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-premium p-6 space-y-6">
        
        {/* Card Header Title */}
        <div className="pb-3 border-b border-slate-100 mb-6">
          <h3 className="text-xs font-extrabold text-slate-800 tracking-wide uppercase">Change Password</h3>
        </div>

        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6 text-xs font-bold text-slate-700">
          
          <div className="flex flex-col space-y-1.5">
            <label>Current Password*</label>
            <input 
              type="password" 
              required 
              value={current} 
              onChange={(e) => setCurrent(e.target.value)} 
              className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none" 
            />
          </div>

          <div className="flex flex-col space-y-1.5">
            <label>New Password*</label>
            <input 
              type="password" 
              required 
              value={newPass} 
              onChange={(e) => setNewPass(e.target.value)} 
              className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none" 
            />
          </div>

          <div className="flex flex-col space-y-1.5">
            <label>Confirm New Password*</label>
            <input 
              type="password" 
              required 
              value={confirm} 
              onChange={(e) => setConfirm(e.target.value)} 
              className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none" 
            />
          </div>

          {/* Centered green submit button */}
          <div className="flex justify-center pt-6">
            <button 
              type="submit" 
              disabled={submitting}
              className="px-8 py-3 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-white rounded-lg font-bold text-xs transition active:scale-95 shadow-md shadow-emerald-500/10"
            >
              {submitting ? 'Updating...' : 'Update'}
            </button>
          </div>

        </form>

      </div>

    </div>
  );
}
