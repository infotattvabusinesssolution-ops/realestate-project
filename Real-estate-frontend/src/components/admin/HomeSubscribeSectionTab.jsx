import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, Image as ImageIcon } from 'lucide-react';

export default function HomeSubscribeSectionTab({ setActiveTab }) {
  const navigate = useNavigate();
  const [title, setTitle] = useState("Do you want offer?");
  const [subtitle, setSubtitle] = useState("Let's Start Build Your Home With Us");
  const [btnName, setBtnName] = useState("Start Now");

  const handleUpdateBg = (e) => {
    e.preventDefault();
    alert('Subscribe background image updated successfully!');
  };

  const handleUpdateInfo = (e) => {
    e.preventDefault();
    alert('Subscribe section information updated successfully!');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Heading & Breadcrumbs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-slate-100">
        <div>
          <h1 className="text-xl lg:text-2xl font-bold tracking-tight text-slate-900">Subscribe Section</h1>
          <div className="flex items-center space-x-2 text-xs text-slate-400 mt-2">
            <Home size={14} className="text-slate-400 cursor-pointer hover:text-blue-600" onClick={() => navigate('/')} />
            <span>&gt;</span>
            <span className="hover:text-blue-600 cursor-pointer" onClick={() => setActiveTab('dashboard')}>Home Page</span>
            <span>&gt;</span>
            <span className="text-slate-500 font-semibold">Subscribe Section</span>
          </div>
        </div>
      </div>

      {/* Grid containing the two forms */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        
        {/* Left Side: Background Image Form */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-premium p-6 space-y-6">
          <h3 className="text-sm font-bold text-slate-800 pb-3 border-b border-slate-50">Update Subscribe Section Image</h3>
          
          <form onSubmit={handleUpdateBg} className="space-y-6 text-xs font-bold text-slate-700">
            <div className="flex flex-col space-y-2">
              <label>Background Image*</label>
              <div className="border border-slate-200 rounded-2xl overflow-hidden max-w-sm">
                <img 
                  src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=600&q=80" 
                  alt="Subscribe Background Preview" 
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

        {/* Right Side: Update Subscribe Section Details Form */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-premium p-6 space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-50">
            <h3 className="text-sm font-bold text-slate-800">Update Sibscribe Section</h3>
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
                className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none"
                required
              />
            </div>

            <div className="flex flex-col space-y-1.5">
              <label>Subtitle</label>
              <input
                type="text"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none"
                required
              />
            </div>

            <div className="flex flex-col space-y-1.5">
              <label>Button Name</label>
              <input
                type="text"
                value={btnName}
                onChange={(e) => setBtnName(e.target.value)}
                className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none"
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
