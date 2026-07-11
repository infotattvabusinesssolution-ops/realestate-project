import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home } from 'lucide-react';

export default function PropertySpecsSettingsTab({ setActiveTab }) {
  const navigate = useNavigate();
  const [countryActive, setCountryActive] = useState(true);
  const [stateActive, setStateActive] = useState(true);

  const handleUpdate = () => {
    alert('Settings updated successfully!');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Heading & Breadcrumbs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-slate-100">
        <div>
          <h1 className="text-xl lg:text-2xl font-bold tracking-tight text-slate-900">Setting</h1>
          <div className="flex items-center space-x-2 text-xs text-slate-400 mt-2">
            <Home size={14} className="text-slate-400 cursor-pointer hover:text-blue-600" onClick={() => navigate('/')} />
            <span>&gt;</span>
            <span className="hover:text-blue-600 cursor-pointer" onClick={() => setActiveTab('dashboard')}>Property Specifications</span>
            <span>&gt;</span>
            <span className="text-slate-500 font-semibold">Settings</span>
          </div>
        </div>
      </div>

      {/* Main Form Box */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-premium p-8">
        <h3 className="text-sm font-bold text-slate-800 mb-8">Settings</h3>
        
        <div className="max-w-2xl mx-auto space-y-8">
          
          {/* Country Field */}
          <div className="flex flex-col space-y-2">
            <label className="text-xs font-bold text-slate-700">Country*</label>
            <div className="flex border border-slate-200 rounded-xl overflow-hidden max-w-md">
              <button
                type="button"
                onClick={() => setCountryActive(true)}
                className={`flex-1 py-3 text-xs font-bold transition-all ${
                  countryActive
                    ? 'bg-blue-50 text-blue-600 border-r border-slate-200'
                    : 'bg-white text-slate-450 hover:bg-slate-50 border-r border-slate-200'
                }`}
              >
                Active
              </button>
              <button
                type="button"
                onClick={() => setCountryActive(false)}
                className={`flex-1 py-3 text-xs font-bold transition-all ${
                  !countryActive
                    ? 'bg-blue-50 text-blue-600'
                    : 'bg-white text-slate-450 hover:bg-slate-50'
                }`}
              >
                Deactive
              </button>
            </div>
          </div>

          {/* State Field */}
          <div className="flex flex-col space-y-2">
            <label className="text-xs font-bold text-slate-700">State*</label>
            <div className="flex border border-slate-200 rounded-xl overflow-hidden max-w-md">
              <button
                type="button"
                onClick={() => setStateActive(true)}
                className={`flex-1 py-3 text-xs font-bold transition-all ${
                  stateActive
                    ? 'bg-blue-50 text-blue-600 border-r border-slate-200'
                    : 'bg-white text-slate-450 hover:bg-slate-50 border-r border-slate-200'
                }`}
              >
                Active
              </button>
              <button
                type="button"
                onClick={() => setStateActive(false)}
                className={`flex-1 py-3 text-xs font-bold transition-all ${
                  !stateActive
                    ? 'bg-blue-50 text-blue-600'
                    : 'bg-white text-slate-450 hover:bg-slate-50'
                }`}
              >
                Deactive
              </button>
            </div>
          </div>

          {/* Update Button */}
          <div className="flex justify-center pt-4">
            <button
              onClick={handleUpdate}
              className="px-8 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold transition active:scale-95 shadow-md shadow-emerald-500/10"
            >
              Update
            </button>
          </div>

        </div>
      </div>

    </div>
  );
}
