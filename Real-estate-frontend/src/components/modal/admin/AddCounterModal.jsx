import React, { useState } from 'react';
import { X, Heart, ChevronDown } from 'lucide-react';

export default function AddCounterModal({ isOpen, onClose, onSave }) {
  const [icon, setIcon] = useState('Home');
  const [amount, setAmount] = useState('');
  const [title, setTitle] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount || !title) return;
    onSave({
      icon,
      amount: parseInt(amount, 10) || 0,
      title
    });
    setAmount('');
    setTitle('');
    setIcon('Home');
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4 animate-in fade-in duration-300">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl border border-slate-100 overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h3 className="text-sm font-bold text-slate-800">Add Counter</h3>
          <button 
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-650 transition"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body / Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6 text-xs font-bold text-slate-700">
          
          {/* Icon Selection */}
          <div className="flex flex-col space-y-2">
            <label>Icon *</label>
            <select
              value={icon}
              onChange={(e) => setIcon(e.target.value)}
              className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none"
            >
              <option value="Home">Home / House Icon</option>
              <option value="Key">Key / Apartment Icon</option>
              <option value="Eye">Eye Icon</option>
              <option value="Users">Users Icon</option>
            </select>
          </div>

          {/* Amount */}
          <div className="flex flex-col space-y-1.5">
            <label>Amount*</label>
            <input
              type="number"
              placeholder="Enter counter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-200"
              required
            />
          </div>

          {/* Title / Description */}
          <div className="flex flex-col space-y-1.5">
            <label>Title*</label>
            <input
              type="text"
              placeholder="Enter counter description text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
              required
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
