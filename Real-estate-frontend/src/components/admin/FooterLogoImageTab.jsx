import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, Image as ImageIcon } from 'lucide-react';

export default function FooterLogoImageTab({ setActiveTab }) {
  const navigate = useNavigate();

  const handleUpdateLogo = (e) => {
    e.preventDefault();
    alert('Footer logo updated successfully!');
  };

  const handleUpdateBg = (e) => {
    e.preventDefault();
    alert('Footer background image updated successfully!');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Heading & Breadcrumbs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-slate-100">
        <div>
          <h1 className="text-xl lg:text-2xl font-bold tracking-tight text-slate-900">Logo & Image</h1>
          <div className="flex items-center space-x-2 text-xs text-slate-400 mt-2">
            <Home size={14} className="text-slate-400 cursor-pointer hover:text-blue-600" onClick={() => navigate('/')} />
            <span>&gt;</span>
            <span className="hover:text-blue-600 cursor-pointer" onClick={() => setActiveTab('dashboard')}>Footer</span>
            <span>&gt;</span>
            <span className="text-slate-500 font-semibold">Logo & Image</span>
          </div>
        </div>
      </div>

      {/* Grid structure */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        
        {/* Left Column: Logo panel */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-premium p-6 space-y-6">
          <h3 className="text-sm font-bold text-slate-800 pb-3 border-b border-slate-50">Update Footer Logo</h3>
          
          <form onSubmit={handleUpdateLogo} className="space-y-6 text-xs font-bold text-slate-700">
            <div className="flex flex-col space-y-2">
              <label>Logo*</label>
              <div className="border border-slate-200 rounded-2xl p-4 flex items-center justify-center text-center w-36 bg-slate-50/50">
                <span className="text-orange-500 font-extrabold text-xl tracking-wide flex items-center space-x-1 select-none">
                  <span className="w-5 h-5 rounded-lg bg-orange-500 flex items-center justify-center text-white text-xs">H</span>
                  <span>Estaty</span>
                </span>
              </div>
              <button type="button" className="px-4 py-2 bg-blue-600 text-white font-bold text-xs rounded-xl hover:bg-blue-700 transition w-36">
                Choose Image
              </button>
            </div>

            <div className="flex justify-center pt-2">
              <button
                type="submit"
                className="px-8 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold transition active:scale-95 shadow-md shadow-emerald-500/10"
              >
                Update
              </button>
            </div>
          </form>
        </div>

        {/* Right Column: Background image panel */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-premium p-6 space-y-6">
          <h3 className="text-sm font-bold text-slate-800 pb-3 border-b border-slate-50">Update Footer Background Image</h3>
          
          <form onSubmit={handleUpdateBg} className="space-y-6 text-xs font-bold text-slate-700">
            <div className="flex flex-col space-y-2">
              <label>Background Image*</label>
              <div className="border border-slate-200 rounded-2xl p-6 flex flex-col items-center justify-center text-center w-48 aspect-[16/9] bg-slate-50/30">
                <ImageIcon size={28} className="text-slate-300 mb-2" />
                <span className="text-[10px] text-slate-450 font-bold uppercase tracking-wider">No Image Found</span>
              </div>
              <button type="button" className="px-4 py-2 bg-blue-600 text-white font-bold text-xs rounded-xl hover:bg-blue-700 transition w-36">
                Choose Image
              </button>
            </div>

            <div className="flex justify-center pt-2">
              <button
                type="submit"
                className="px-8 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold transition active:scale-95 shadow-md shadow-emerald-500/10"
              >
                Update
              </button>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
}
