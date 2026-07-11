import React, { useState } from 'react';
import { X } from 'lucide-react';

export default function AddLanguageModal({ isOpen, onClose, onSave }) {
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [direction, setDirection] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !code || !direction) return;
    onSave({
      name,
      code,
      direction
    });
    // Reset
    setName('');
    setCode('');
    setDirection('');
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4 animate-in fade-in duration-300">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl border border-slate-100 overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h3 className="text-sm font-bold text-slate-800">Add Language</h3>
          <button 
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-650 transition"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body / Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs font-bold text-slate-700">
          
          {/* Name */}
          <div className="flex flex-col space-y-1.5">
            <label>Name*</label>
            <input
              type="text"
              placeholder="Enter Language Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none"
              required
            />
          </div>

          {/* Code */}
          <div className="flex flex-col space-y-1.5">
            <label>Code*</label>
            <input
              type="text"
              placeholder="Enter Language Code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none"
              required
            />
          </div>

          {/* Direction */}
          <div className="flex flex-col space-y-1.5">
            <label>Direction*</label>
            <select
              value={direction}
              onChange={(e) => setDirection(e.target.value)}
              className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-850 focus:outline-none w-full"
              required
            >
              <option value="" disabled>Select a Direction</option>
              <option value="LTR">LTR</option>
              <option value="RTL">RTL</option>
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
              Submit
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
