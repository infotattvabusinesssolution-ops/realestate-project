import React, { useState } from 'react';
import { X } from 'lucide-react';

export default function AddQuickLinkModal({ isOpen, onClose, onSave }) {
  const [lang, setLang] = useState('');
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [serialNumber, setSerialNumber] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!lang || !title || !url || !serialNumber) return;
    onSave({
      lang,
      title,
      url,
      serialNumber: parseInt(serialNumber, 10) || 1
    });
    // Reset fields
    setTitle('');
    setUrl('');
    setSerialNumber('');
    setLang('');
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4 animate-in fade-in duration-300">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl border border-slate-100 overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h3 className="text-sm font-bold text-slate-800">Add Quick Link</h3>
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
          
          <div className="flex flex-col space-y-1.5">
            <label>Language*</label>
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value)}
              className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-850 focus:outline-none"
              required
            >
              <option value="" disabled>Select a Language</option>
              <option value="English">English</option>
              <option value="Arabic">Arabic</option>
            </select>
          </div>

          <div className="flex flex-col space-y-1.5">
            <label>Title*</label>
            <input
              type="text"
              placeholder="Enter Quick Link Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none"
              required
            />
          </div>

          <div className="flex flex-col space-y-1.5">
            <label>URL*</label>
            <input
              type="text"
              placeholder="Enter Quick Link URL"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none"
              required
            />
          </div>

          <div className="flex flex-col space-y-1.5">
            <label>Serial Number*</label>
            <input
              type="number"
              placeholder="Enter Serial Number"
              value={serialNumber}
              onChange={(e) => setSerialNumber(e.target.value)}
              className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none"
              required
            />
            <span className="text-[10px] text-amber-600 font-medium">The higher the serial number is, the later the quick link will be shown.</span>
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
