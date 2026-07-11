import React, { useState } from 'react';
import { X } from 'lucide-react';

export default function AddAgentPropertyModal({ isOpen, onClose, onSave }) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [tag, setTag] = useState('Villa');
  const [type, setType] = useState('Buy');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !price) return;
    onSave({
      name,
      price,
      tag,
      type
    });
    // Reset
    setName('');
    setPrice('');
    setTag('Villa');
    setType('Buy');
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4 animate-in fade-in duration-300">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl border border-slate-100 overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h3 className="text-sm font-bold text-slate-800">Add New Listing</h3>
          <button 
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body / Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs font-bold text-slate-700">
          
          <div className="flex flex-col space-y-1.5">
            <label>Listing Title</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Serene Meadow Villa"
              className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none"
            />
          </div>

          <div className="flex flex-col space-y-1.5">
            <label>Target Price</label>
            <input
              type="text"
              required
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="e.g. $1,250,000"
              className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col space-y-1.5">
              <label>Listing Tag</label>
              <select
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none w-full"
              >
                <option value="Villa">Villa</option>
                <option value="Penthouse">Penthouse</option>
                <option value="Estate">Estate</option>
                <option value="Apartment">Apartment</option>
              </select>
            </div>
            
            <div className="flex flex-col space-y-1.5">
              <label>Type</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none w-full"
              >
                <option value="Buy">For Buy</option>
                <option value="Rent">For Rent</option>
              </select>
            </div>
          </div>

          {/* Bottom buttons */}
          <div className="flex items-center justify-end space-x-2 pt-4 border-t border-slate-100">
            <button 
              type="button" 
              onClick={onClose}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded font-bold text-xs transition active:scale-95 shadow-sm"
            >
              Close
            </button>
            <button 
              type="submit"
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded font-bold text-xs transition active:scale-95 shadow-sm"
            >
              Submit Listing
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
