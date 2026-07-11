import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home } from 'lucide-react';

export default function HomeCitySectionTab({ setActiveTab }) {
  const navigate = useNavigate();
  const [title, setTitle] = useState("Our Cities");
  const [subtitle, setSubtitle] = useState("Explore The City");

  const handleUpdate = (e) => {
    e.preventDefault();
    alert('City section updated successfully!');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Heading & Breadcrumbs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-slate-100">
        <div>
          <h1 className="text-xl lg:text-2xl font-bold tracking-tight text-slate-900">City Section</h1>
          <div className="flex items-center space-x-2 text-xs text-slate-400 mt-2">
            <Home size={14} className="text-slate-400 cursor-pointer hover:text-blue-600" onClick={() => navigate('/')} />
            <span>&gt;</span>
            <span className="hover:text-blue-600 cursor-pointer" onClick={() => setActiveTab('dashboard')}>Home Page</span>
            <span>&gt;</span>
            <span className="text-slate-500 font-semibold">City Section</span>
          </div>
        </div>
      </div>

      {/* Main Panel Box */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-premium p-6 space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-slate-55">
          <h3 className="text-sm font-bold text-slate-800">Update City Section</h3>
          <select className="bg-white border border-slate-200 rounded-lg px-2 py-1 text-xs focus:outline-none">
            <option value="English">English</option>
          </select>
        </div>

        <form onSubmit={handleUpdate} className="max-w-2xl mx-auto space-y-6 text-xs font-bold text-slate-700">
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
            <label>Subtitle</label>
            <input
              type="text"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-200"
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
  );
}
