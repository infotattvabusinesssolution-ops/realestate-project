import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home } from 'lucide-react';

const initialStatus = {
  featured: true,
  property: true,
  aboutUs: true,
  counter: true,
  vendor: true,
  testimonial: true,
  cities: true,
  subscribe: true,
  whyChoose: true,
  footer: true
};

export default function HomeSectionShowHideTab({ setActiveTab }) {
  const navigate = useNavigate();
  const [statuses, setStatuses] = useState(initialStatus);

  const toggleStatus = (section, val) => {
    setStatuses(prev => ({ ...prev, [section]: val }));
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    alert('Homepage sections customization updated successfully!');
  };

  const sectionRows = [
    { key: 'featured', label: 'Featured Properties Section Status' },
    { key: 'property', label: 'Property Section Status' },
    { key: 'aboutUs', label: 'About Us Section Status' },
    { key: 'counter', label: 'Counter Section Status' },
    { key: 'vendor', label: 'Vendor Section Status' },
    { key: 'testimonial', label: 'Testimonial Section Status' },
    { key: 'cities', label: 'Cities Section Status' },
    { key: 'subscribe', label: 'Subscribe Section Status' },
    { key: 'whyChoose', label: 'Why Choose Us Section Status' },
    { key: 'footer', label: 'Footer Section Status' }
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Heading & Breadcrumbs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-slate-100">
        <div>
          <h1 className="text-xl lg:text-2xl font-bold tracking-tight text-slate-900">Section Show/Hide</h1>
          <div className="flex items-center space-x-2 text-xs text-slate-400 mt-2">
            <Home size={14} className="text-slate-400 cursor-pointer hover:text-blue-600" onClick={() => navigate('/')} />
            <span>&gt;</span>
            <span className="hover:text-blue-600 cursor-pointer" onClick={() => setActiveTab('dashboard')}>Home Page</span>
            <span>&gt;</span>
            <span className="text-slate-500 font-semibold">Section Show/Hide</span>
          </div>
        </div>
      </div>

      {/* Main Panel Box */}
      <form onSubmit={handleUpdate} className="bg-white rounded-2xl border border-slate-100 shadow-premium p-6 space-y-6">
        <h3 className="text-sm font-bold text-slate-800 pb-3 border-b border-slate-50">Customize Sections</h3>

        <div className="space-y-4 max-w-4xl mx-auto">
          {sectionRows.map((row) => (
            <div key={row.key} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-2 border-b border-slate-50">
              <span className="text-xs font-bold text-slate-700">{row.label}</span>
              
              {/* Enable / Disable Slider Switch */}
              <div className="flex border border-slate-200 rounded-xl overflow-hidden w-64 text-center">
                <button
                  type="button"
                  onClick={() => toggleStatus(row.key, true)}
                  className={`flex-1 py-2 text-[10px] font-extrabold transition-all ${
                    statuses[row.key]
                      ? 'bg-blue-50 text-blue-600 border-r border-blue-100 outline-none ring-1 ring-blue-200'
                      : 'bg-white text-slate-450 hover:bg-slate-50'
                  }`}
                >
                  Enable
                </button>
                <button
                  type="button"
                  onClick={() => toggleStatus(row.key, false)}
                  className={`flex-1 py-2 text-[10px] font-extrabold transition-all ${
                    !statuses[row.key]
                      ? 'bg-blue-50 text-blue-600 border-l border-blue-100 outline-none ring-1 ring-blue-200'
                      : 'bg-white text-slate-450 hover:bg-slate-50'
                  }`}
                >
                  Disable
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Action Button */}
        <div className="flex justify-center pt-6">
          <button
            type="submit"
            className="px-8 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold transition active:scale-95 shadow-md shadow-emerald-500/10"
          >
            Update
          </button>
        </div>

      </form>
    </div>
  );
}
