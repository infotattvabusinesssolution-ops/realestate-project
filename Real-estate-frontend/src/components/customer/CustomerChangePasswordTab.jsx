import React, { useState } from 'react';
import { changePasswordAPI } from '../../api/api';
import { useToast } from '../../context/ToastContext';

export default function CustomerChangePasswordTab() {
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
      
      {/* Card wrapper */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-premium p-8 space-y-6">
        
        {/* Card Header Title */}
        <div className="pb-4 border-b border-slate-100 mb-6">
          <h3 className="text-xs font-bold text-slate-800 tracking-wide uppercase">Change Password</h3>
        </div>

        <form onSubmit={handleSubmit} className="max-w-4xl space-y-4 text-xs font-bold text-slate-700">
          
          <div className="flex flex-col space-y-1">
            <input 
              type="password" 
              required 
              value={current} 
              disabled={submitting}
              onChange={(e) => setCurrent(e.target.value)} 
              placeholder="Current Password"
              className="bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs font-medium text-slate-850 focus:outline-none focus:ring-1 focus:ring-orange-500/50 disabled:bg-slate-50" 
            />
          </div>

          <div className="flex flex-col space-y-1">
            <input 
              type="password" 
              required 
              value={newPass} 
              disabled={submitting}
              onChange={(e) => setNewPass(e.target.value)} 
              placeholder="New Password"
              className="bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs font-medium text-slate-855 focus:outline-none focus:ring-1 focus:ring-orange-500/50 disabled:bg-slate-50" 
            />
          </div>

          <div className="flex flex-col space-y-1">
            <input 
              type="password" 
              required 
              value={confirm} 
              disabled={submitting}
              onChange={(e) => setConfirm(e.target.value)} 
              placeholder="Confirm Password"
              className="bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs font-medium text-slate-850 focus:outline-none focus:ring-1 focus:ring-orange-500/50 disabled:bg-slate-50" 
            />
          </div>

          {/* Orange Submit Button on the left */}
          <div className="pt-2">
            <button 
              type="submit" 
              disabled={submitting}
              className="px-6 py-2.5 bg-[#f97316] hover:bg-orange-655 text-white rounded-xl font-bold text-xs transition active:scale-95 shadow-md shadow-orange-500/10 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? 'Updating...' : 'Submit'}
            </button>
          </div>

        </form>

      </div>

    </div>
  );
}
