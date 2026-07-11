import React from 'react';
import { X } from 'lucide-react';

export default function PaymentDetailsModal({ isOpen, onClose, log }) {
  if (!isOpen || !log) return null;

  const userObj = log.user || {};
  const username = userObj.name || 'Unknown User';
  const email = userObj.email || 'N/A';
  const phone = userObj.phone || 'N/A';

  const pkgObj = log.package || {};
  const pkgTitle = pkgObj.title || 'N/A';
  const pkgTerm = pkgObj.term || 'N/A';
  const price = log.amount || pkgObj.price || 'N/A';
  const method = log.method || 'N/A';

  const startDate = log.createdAt 
    ? new Date(log.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    : 'N/A';

  const expireDate = pkgTerm === 'Lifetime' 
    ? 'Lifetime'
    : log.createdAt 
      ? new Date(new Date(log.createdAt).setMonth(new Date(log.createdAt).getMonth() + (pkgTerm === 'Monthly' ? 1 : 12))).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      : 'N/A';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in duration-300">
      <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl border border-slate-100 animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex justify-between items-center pb-4 border-b border-slate-100 mb-6">
          <h3 className="font-bold text-slate-800 text-sm">Owner Details</h3>
          <button 
            type="button"
            onClick={onClose} 
            className="text-slate-400 hover:text-slate-650 transition"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content Body */}
        <div className="space-y-6 text-xs text-slate-700">
          {/* User details */}
          <div className="space-y-3">
            <h4 className="text-sm font-extrabold text-orange-500">User details</h4>
            <div className="grid grid-cols-3 gap-2">
              <span className="text-slate-400 font-bold">Username</span>
              <span className="col-span-2 font-semibold text-slate-700">{username}</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <span className="text-slate-400 font-bold">Email</span>
              <span className="col-span-2 font-semibold text-slate-700">{email}</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <span className="text-slate-400 font-bold">Phone</span>
              <span className="col-span-2 font-semibold text-slate-700">{phone}</span>
            </div>
          </div>

          {/* Payment details */}
          <div className="space-y-3 pt-3 border-t border-slate-50">
            <h4 className="text-sm font-extrabold text-orange-500">Payment details</h4>
            <div className="grid grid-cols-3 gap-2">
              <span className="text-slate-400 font-bold">Package Price</span>
              <span className="col-span-2 font-extrabold text-slate-800">{price}</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <span className="text-slate-400 font-bold">Currency</span>
              <span className="col-span-2 font-semibold text-slate-700">USD</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <span className="text-slate-400 font-bold">Method</span>
              <span className="col-span-2 font-semibold text-slate-700">{method}</span>
            </div>
          </div>

          {/* Package Details */}
          <div className="space-y-3 pt-3 border-t border-slate-50">
            <h4 className="text-sm font-extrabold text-orange-500">Package Details</h4>
            <div className="grid grid-cols-3 gap-2">
              <span className="text-slate-400 font-bold">Title</span>
              <span className="col-span-2 font-semibold text-slate-700">{pkgTitle}</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <span className="text-slate-400 font-bold">Term</span>
              <span className="col-span-2 font-semibold text-slate-700">{pkgTerm}</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <span className="text-slate-400 font-bold">Start Date</span>
              <span className="col-span-2 font-semibold text-slate-700">{startDate}</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <span className="text-slate-400 font-bold">Expire Date</span>
              <span className="col-span-2 font-semibold text-slate-700">{expireDate}</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <span className="text-slate-400 font-bold">Purchase Type</span>
              <span className="col-span-2 font-semibold text-slate-700">Regular</span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex justify-end pt-6 border-t border-slate-100 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded font-bold text-xs transition active:scale-95 shadow-sm"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
