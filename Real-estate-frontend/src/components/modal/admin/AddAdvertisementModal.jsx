import React, { useState } from 'react';
import { X } from 'lucide-react';

export default function AddAdvertisementModal({ isOpen, onClose, onSave }) {
  const [adType, setAdType] = useState('');
  const [resolution, setResolution] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!adType || !resolution) return;
    onSave({
      adType,
      resolution
    });
    // Reset fields
    setAdType('');
    setResolution('');
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4 animate-in fade-in duration-300">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl border border-slate-100 overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h3 className="text-sm font-bold text-slate-800">Add Advertisement</h3>
          <button 
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-650 transition"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body / Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5 text-xs font-bold text-slate-700">
          
          {/* Advertisement Type */}
          <div className="flex flex-col space-y-1.5">
            <label>Advertisement Type*</label>
            <select
              value={adType}
              onChange={(e) => setAdType(e.target.value)}
              className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-850 focus:outline-none"
              required
            >
              <option value="" disabled>Select a Type</option>
              <option value="Banner">Banner</option>
              <option value="AdSense">AdSense</option>
            </select>
          </div>

          {/* Advertisement Resolution */}
          <div className="flex flex-col space-y-1.5">
            <label>Advertisement Resolution*</label>
            <select
              value={resolution}
              onChange={(e) => setResolution(e.target.value)}
              className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-850 focus:outline-none"
              required
            >
              <option value="" disabled>Select a Resolution</option>
              <option value="728 x 90">728 x 90</option>
              <option value="300 x 250">300 x 250</option>
              <option value="300 x 600">300 x 600</option>
            </select>
          </div>

          {/* Bottom buttons */}
          <div className="flex items-center justify-end space-x-2 pt-4 border-t border-slate-100">
            <button 
              type="button" 
              onClick={onClose}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded font-bold text-xs transition active:scale-95 shadow-sm"
            >
              Close
            </button>
            <button 
              type="submit"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded font-bold text-xs transition active:scale-95 shadow-sm"
            >
              Save
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
