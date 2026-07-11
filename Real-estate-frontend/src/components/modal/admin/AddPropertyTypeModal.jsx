import React, { useState } from 'react';
import { X } from 'lucide-react';

export default function AddPropertyTypeModal({ isOpen, onClose, onSave }) {
  const [name, setName] = useState('');
  const [totalUnit, setTotalUnit] = useState('');
  const [minArea, setMinArea] = useState('');
  const [maxArea, setMaxArea] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [cloneLang, setCloneLang] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) return;

    onSave({
      name,
      totalUnit,
      minArea,
      maxArea,
      minPrice,
      maxPrice,
      cloneLang
    });

    // Reset Form
    setName('');
    setTotalUnit('');
    setMinArea('');
    setMaxArea('');
    setMinPrice('');
    setMaxPrice('');
    setCloneLang(false);
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4 animate-in fade-in duration-300">
      <div className="bg-white rounded-2xl w-full max-w-4xl shadow-2xl border border-slate-100 overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h3 className="text-sm font-bold text-slate-800">Add Property Type</h3>
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
          
          {/* English Lang Container */}
          <div className="border border-slate-100 rounded-xl overflow-hidden">
            <div className="bg-indigo-600/90 text-white text-xs font-bold px-4 py-3">
              English Language (Default)
            </div>
            <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-bold text-slate-700">
              <div className="flex flex-col space-y-1.5">
                <label>Name *</label>
                <input 
                  type="text" 
                  placeholder="Enter Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
                  required 
                />
              </div>

              <div className="flex flex-col space-y-1.5">
                <label>Total Unit*</label>
                <input 
                  type="text" 
                  placeholder="Enter Total Unit"
                  value={totalUnit}
                  onChange={(e) => setTotalUnit(e.target.value)}
                  className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
                  required 
                />
              </div>

              <div className="flex flex-col space-y-1.5">
                <label>Min Area (sqft)*</label>
                <input 
                  type="text" 
                  placeholder="Enter Minimum Area"
                  value={minArea}
                  onChange={(e) => setMinArea(e.target.value)}
                  className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
                  required 
                />
              </div>

              <div className="flex flex-col space-y-1.5">
                <label>Max Area (sqft)</label>
                <input 
                  type="text" 
                  placeholder="Enter Maximum Area"
                  value={maxArea}
                  onChange={(e) => setMaxArea(e.target.value)}
                  className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
                />
              </div>

              <div className="flex flex-col space-y-1.5">
                <label>Min Price (NGN) *</label>
                <input 
                  type="text" 
                  placeholder="Enter Minimum Price"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
                  required 
                />
              </div>

              <div className="flex flex-col space-y-1.5">
                <label>Max Price (NGN)</label>
                <input 
                  type="text" 
                  placeholder="Enter Maximum Price"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
                />
              </div>

              <div className="col-span-2 flex items-center space-x-2 mt-1">
                <input 
                  type="checkbox" 
                  id="clone-ar-modal" 
                  checked={cloneLang}
                  onChange={(e) => setCloneLang(e.target.checked)}
                  className="rounded text-blue-600 focus:ring-blue-500" 
                />
                <label htmlFor="clone-ar-modal" className="text-slate-500 font-semibold cursor-pointer">
                  Clone for <span className="text-blue-600 font-bold">عربي</span> language
                </label>
              </div>
            </div>
          </div>

          {/* Arabic Language Container */}
          <div className="border border-slate-100 rounded-xl overflow-hidden">
            <div className="bg-white hover:bg-slate-50 border-b border-slate-100 text-blue-600 text-xs font-bold px-4 py-3 cursor-pointer">
              عربي Language
            </div>
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
