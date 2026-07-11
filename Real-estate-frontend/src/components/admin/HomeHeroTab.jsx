import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home } from 'lucide-react';

export default function HomeHeroTab({ setActiveTab }) {
  const navigate = useNavigate();
  const [title, setTitle] = useState("We're Best Real Estate Agency");
  const [text, setText] = useState("We are a largest real estate agency for buying and selling your property with 100% confidently.");

  const handleUpdateImage = (e) => {
    e.preventDefault();
    alert('Hero image updated successfully!');
  };

  const handleUpdateInfo = (e) => {
    e.preventDefault();
    alert('Hero section information updated successfully!');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Heading & Breadcrumbs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-slate-100">
        <div>
          <h1 className="text-xl lg:text-2xl font-bold tracking-tight text-slate-900">Hero Section</h1>
          <div className="flex items-center space-x-2 text-xs text-slate-400 mt-2">
            <Home size={14} className="text-slate-400 cursor-pointer hover:text-blue-600" onClick={() => navigate('/')} />
            <span>&gt;</span>
            <span className="hover:text-blue-600 cursor-pointer" onClick={() => setActiveTab('dashboard')}>Home Page</span>
            <span>&gt;</span>
            <span className="text-slate-500 font-semibold">Hero Section</span>
          </div>
        </div>
      </div>

      {/* Grid containing the two forms */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        
        {/* Section Image Box */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-premium p-6 space-y-6">
          <h3 className="text-sm font-bold text-slate-800 pb-3 border-b border-slate-50">Section Image</h3>
          
          <form onSubmit={handleUpdateImage} className="space-y-6">
            <div className="flex flex-col space-y-2">
              <label className="text-xs font-bold text-slate-700">Image*</label>
              <div className="border border-slate-200 rounded-2xl overflow-hidden max-w-sm">
                <img 
                  src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80" 
                  alt="Hero Preview" 
                  className="w-full aspect-[16/9] object-cover"
                />
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

        {/* Hero Section Information Box */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-premium p-6 space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-50">
            <h3 className="text-sm font-bold text-slate-800">Hero Section Information</h3>
            <select className="bg-white border border-slate-200 rounded-lg px-2 py-1 text-xs focus:outline-none">
              <option value="English">English</option>
            </select>
          </div>

          <form onSubmit={handleUpdateInfo} className="space-y-6 text-xs font-bold text-slate-700">
            <div className="flex flex-col space-y-1.5">
              <label>Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-200"
                required
              />
            </div>

            <div className="flex flex-col space-y-1.5">
              <label>Text</label>
              <textarea
                rows={5}
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none resize-none leading-relaxed"
                required
              />
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
