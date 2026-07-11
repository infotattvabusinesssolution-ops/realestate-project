import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, Bold, Italic, Underline, Link as LinkIcon, Image, List, ListOrdered } from 'lucide-react';

export default function FooterContentTab({ setActiveTab }) {
  const navigate = useNavigate();
  const [aboutCompany, setAboutCompany] = useState("Estaty is a dynamic and forward-thinking real estate company dedicated to providing exceptional real estate services across residential, commercial, and investment properties.");
  const [copyrightText, setCopyrightText] = useState("Copyright ©2026. All Rights Reserved.");

  const handleUpdate = (e) => {
    e.preventDefault();
    alert('Footer content details updated successfully!');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Heading & Breadcrumbs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-slate-100">
        <div>
          <h1 className="text-xl lg:text-2xl font-bold tracking-tight text-slate-900">Footer Content</h1>
          <div className="flex items-center space-x-2 text-xs text-slate-400 mt-2">
            <Home size={14} className="text-slate-400 cursor-pointer hover:text-blue-600" onClick={() => navigate('/')} />
            <span>&gt;</span>
            <span className="hover:text-blue-600 cursor-pointer" onClick={() => setActiveTab('dashboard')}>Footer</span>
            <span>&gt;</span>
            <span className="text-slate-500 font-semibold">Footer Content</span>
          </div>
        </div>
      </div>

      {/* Main Panel Box */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-premium p-6 space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-slate-55">
          <h3 className="text-sm font-bold text-slate-800">Update Footer Content</h3>
          <select className="bg-white border border-slate-200 rounded-lg px-2 py-1 text-xs focus:outline-none">
            <option value="English">English</option>
          </select>
        </div>

        <form onSubmit={handleUpdate} className="max-w-4xl mx-auto space-y-6 text-xs font-bold text-slate-700">
          
          <div className="flex flex-col space-y-1.5">
            <label>About Company*</label>
            <textarea
              rows={4}
              value={aboutCompany}
              onChange={(e) => setAboutCompany(e.target.value)}
              className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-200 resize-none leading-relaxed w-full"
              required
            />
          </div>

          {/* Simulated rich editor for Copyright */}
          <div className="flex flex-col space-y-2">
            <label>Copyright Text*</label>
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              {/* Editor Top Bar Icons */}
              <div className="bg-slate-50 border-b border-slate-200 p-2 flex flex-wrap items-center gap-1">
                <button type="button" className="p-1 hover:bg-slate-200 rounded text-slate-500"><Bold size={13} /></button>
                <button type="button" className="p-1 hover:bg-slate-200 rounded text-slate-500"><Italic size={13} /></button>
                <button type="button" className="p-1 hover:bg-slate-200 rounded text-slate-500"><Underline size={13} /></button>
                <span className="w-px h-4 bg-slate-200 mx-1"></span>
                <button type="button" className="p-1 hover:bg-slate-200 rounded text-slate-500"><LinkIcon size={13} /></button>
                <button type="button" className="p-1 hover:bg-slate-200 rounded text-slate-500"><Image size={13} /></button>
                <span className="w-px h-4 bg-slate-200 mx-1"></span>
                <button type="button" className="p-1 hover:bg-slate-200 rounded text-slate-500"><List size={13} /></button>
                <button type="button" className="p-1 hover:bg-slate-200 rounded text-slate-500"><ListOrdered size={13} /></button>
              </div>
              {/* Editor Content Area */}
              <textarea
                rows={4}
                value={copyrightText}
                onChange={(e) => setCopyrightText(e.target.value)}
                className="w-full p-3 text-xs font-medium text-slate-800 focus:outline-none resize-none bg-white font-mono"
                required
              />
            </div>
          </div>

          <div className="flex justify-center pt-4">
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
