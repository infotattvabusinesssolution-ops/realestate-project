import React, { useState } from 'react';
import { X, Heart, ChevronDown } from 'lucide-react';

export default function AddPackageModal({ isOpen, onClose, onSave }) {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [term, setTerm] = useState('Lifetime');
  const [agents, setAgents] = useState('');
  const [properties, setProperties] = useState('');
  const [galleryPerProp, setGalleryPerProp] = useState('');
  const [featuresPerProp, setFeaturesPerProp] = useState('');
  const [projects, setProjects] = useState('');
  const [typesPerProj, setTypesPerProj] = useState('');
  const [galleryPerProj, setGalleryPerProj] = useState('');
  const [featuresPerProj, setFeaturesPerProj] = useState('');
  const [status, setStatus] = useState('Active');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) return;

    onSave({
      title,
      price: price === '0' || price === '' ? 'Free' : `$${price}`,
      term,
      agents,
      properties,
      galleryPerProp,
      featuresPerProp,
      projects,
      typesPerProj,
      galleryPerProj,
      featuresPerProj,
      status
    });

    // Reset Form
    setTitle('');
    setPrice('');
    setTerm('Lifetime');
    setAgents('');
    setProperties('');
    setGalleryPerProp('');
    setFeaturesPerProp('');
    setProjects('');
    setTypesPerProj('');
    setGalleryPerProj('');
    setFeaturesPerProj('');
    setStatus('Active');
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4 animate-in fade-in duration-300">
      <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl border border-slate-100 overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h3 className="text-sm font-bold text-slate-800">Add Package</h3>
          <button 
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-650 transition"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body / Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          
          {/* Icon Selector Field */}
          <div className="flex flex-col space-y-2">
            <label className="text-xs font-bold text-slate-700">Icon *</label>
            <div className="flex items-center space-x-2">
              <button type="button" className="p-2.5 bg-blue-600 text-white rounded-xl">
                <Heart size={16} />
              </button>
              <button type="button" className="p-2.5 bg-blue-600 text-white rounded-xl">
                <ChevronDown size={16} />
              </button>
            </div>
            <span className="text-[10px] text-slate-400 font-semibold">NB: click on the dropdown sign to select a icon.</span>
          </div>

          {/* Core Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs font-bold text-slate-700">
            <div className="flex flex-col space-y-1.5 col-span-2 sm:col-span-1">
              <label>Package title*</label>
              <input
                type="text"
                placeholder="Enter Package title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
                required
              />
            </div>

            <div className="flex flex-col space-y-1.5 col-span-2 sm:col-span-1">
              <label>Price (NGN)*</label>
              <input
                type="text"
                placeholder="Enter Package price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
                required
              />
              <span className="text-[10px] text-amber-600 font-medium">If price is 0, than it will appear as free</span>
            </div>

            <div className="flex flex-col space-y-1.5 col-span-2 sm:col-span-1">
              <label>Package term*</label>
              <select
                value={term}
                onChange={(e) => setTerm(e.target.value)}
                className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-700 focus:outline-none"
              >
                <option value="Lifetime">Lifetime</option>
                <option value="Yearly">Yearly</option>
                <option value="Monthly">Monthly</option>
              </select>
            </div>

            <div className="flex flex-col space-y-1.5 col-span-2 sm:col-span-1">
              <label>Number of Agents *</label>
              <input
                type="text"
                placeholder="Enter how many agents the vendor can add"
                value={agents}
                onChange={(e) => setAgents(e.target.value)}
                className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none"
                required
              />
              <span className="text-[10px] text-amber-600 font-medium">Enter 999999, than it will appear as unlimited</span>
            </div>

            <div className="flex flex-col space-y-1.5 col-span-2 sm:col-span-1">
              <label>Number of Properties *</label>
              <input
                type="text"
                placeholder="Enter how many properties the vendor can add"
                value={properties}
                onChange={(e) => setProperties(e.target.value)}
                className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none"
                required
              />
              <span className="text-[10px] text-amber-600 font-medium">Enter 999999, than it will appear as unlimited</span>
            </div>

            <div className="flex flex-col space-y-1.5 col-span-2 sm:col-span-1">
              <label>Number of Gallery Images (Per Property) *</label>
              <input
                type="text"
                placeholder="Enter how many gallery images are added under a property"
                value={galleryPerProp}
                onChange={(e) => setGalleryPerProp(e.target.value)}
                className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none"
                required
              />
              <span className="text-[10px] text-amber-600 font-medium">Enter 999999, than it will appear as unlimited</span>
            </div>

            <div className="flex flex-col space-y-1.5 col-span-2 sm:col-span-1">
              <label>Number of Additional Features (Per Property) *</label>
              <input
                type="text"
                placeholder="Enter How many project additional features the vendor can add"
                value={featuresPerProp}
                onChange={(e) => setFeaturesPerProp(e.target.value)}
                className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none"
                required
              />
              <span className="text-[10px] text-amber-600 font-medium">Enter 999999, than it will appear as unlimited</span>
            </div>

            <div className="flex flex-col space-y-1.5 col-span-2 sm:col-span-1">
              <label>Number of Projects *</label>
              <input
                type="text"
                placeholder="Enter how many projects the vendor can add"
                value={projects}
                onChange={(e) => setProjects(e.target.value)}
                className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none"
                required
              />
              <span className="text-[10px] text-amber-600 font-medium">Enter 999999, than it will appear as unlimited</span>
            </div>

            <div className="flex flex-col space-y-1.5 col-span-2 sm:col-span-1">
              <label>Number of Project Types (Per Project) *</label>
              <input
                type="text"
                placeholder="Enter how many types are added under a project"
                value={typesPerProj}
                onChange={(e) => setTypesPerProj(e.target.value)}
                className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none"
                required
              />
              <span className="text-[10px] text-amber-600 font-medium">Enter 999999, than it will appear as unlimited</span>
            </div>

            <div className="flex flex-col space-y-1.5 col-span-2 sm:col-span-1">
              <label>Number of Gallery Images (Per Project) *</label>
              <input
                type="text"
                placeholder="Enter how many gallery images are added under a project"
                value={galleryPerProj}
                onChange={(e) => setGalleryPerProj(e.target.value)}
                className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none"
                required
              />
              <span className="text-[10px] text-amber-600 font-medium">Enter 999999, than it will appear as unlimited</span>
            </div>

            <div className="flex flex-col space-y-1.5 col-span-2 sm:col-span-1">
              <label>Number of Additional Features (Per Project) *</label>
              <input
                type="text"
                placeholder="Enter How many project additional features the vendor can add"
                value={featuresPerProj}
                onChange={(e) => setFeaturesPerProj(e.target.value)}
                className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none"
                required
              />
              <span className="text-[10px] text-amber-600 font-medium">Enter 999999, than it will appear as unlimited</span>
            </div>

            <div className="flex flex-col space-y-1.5 col-span-2 sm:col-span-1">
              <label>Status*</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-700 focus:outline-none"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
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
              Submit
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
