import React, { useState } from 'react';
import { X, Image as ImageIcon } from 'lucide-react';

export default function AddBrandModal({ isOpen, onClose, onSave }) {
  const [url, setUrl] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      url
    });
    setUrl('');
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4 animate-in fade-in duration-300">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl border border-slate-100 overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h3 className="text-sm font-bold text-slate-800">Add Brand</h3>
          <button 
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-650 transition"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body / Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          
          {/* Image Upload Area */}
          <div className="flex flex-col space-y-2">
            <label className="text-xs font-bold text-slate-700">Image*</label>
            <div className="border border-slate-200 rounded-2xl p-6 flex flex-col items-center justify-center text-center w-36 aspect-square bg-slate-50/30">
              <ImageIcon size={28} className="text-slate-300 mb-2" />
              <span className="text-[10px] text-slate-450 font-bold uppercase tracking-wider">No Image Found</span>
            </div>
            <button type="button" className="px-4 py-2 bg-blue-600 text-white font-bold text-xs rounded-xl hover:bg-blue-700 transition w-36">
              Choose Image
            </button>
          </div>

          {/* URL Input */}
          <div className="flex flex-col space-y-1.5 text-xs font-bold text-slate-700">
            <label>Url</label>
            <input
              type="text"
              placeholder="Enter brand url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
            />
          </div>

          {/* Bottom buttons */}
          <div className="flex items-center justify-end space-x-2 pt-4 border-t border-slate-100">
            <button 
              type="button" 
              onClick={onClose}
              className="px-4 py-2 bg-indigo-650 hover:bg-indigo-700 text-white rounded font-bold text-xs transition active:scale-95 shadow-sm"
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
