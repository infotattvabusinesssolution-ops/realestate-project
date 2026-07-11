import React, { useState } from 'react';
import { Home, ShieldAlert } from 'lucide-react';

// 2. Support Tickets Tab
export function VendorSupportTicketsTab() {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
        <h2 className="text-lg font-bold text-slate-800">Support Tickets</h2>
        <div className="flex items-center space-x-2 text-[10px] font-bold text-slate-400">
          <Home size={12} className="text-slate-350" />
          <span>&gt;</span>
          <span className="text-slate-650">Support Tickets</span>
        </div>
      </div>

      {/* Main card box */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-premium p-6">
        <div className="pb-4 border-b border-slate-55 mb-6">
          <h3 className="text-xs font-extrabold text-slate-800 tracking-wide uppercase">Support Tickets</h3>
        </div>
        
        {/* Bordered alert block */}
        <div className="border border-slate-150 rounded-2xl py-16 flex flex-col items-center justify-center bg-slate-50/20 text-slate-400 font-extrabold text-sm tracking-wider uppercase">
          NO SUPPORT TICKETS FOUND !
        </div>
      </div>
    </div>
  );
}

// 2b. Create Support Ticket Tab
export function VendorSupportTicketsAddTab({ setActiveTab }) {
  const [email, setEmail] = useState('fomima3881@eqvox.com');
  const [subject, setSubject] = useState('');
  const [desc, setDesc] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!subject) return;
    alert('Support ticket created successfully!');
    setActiveTab('tickets-list');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
        <h2 className="text-lg font-bold text-slate-800">Create a support ticket</h2>
        <div className="flex items-center space-x-2 text-[10px] font-bold text-slate-400">
          <Home size={12} className="text-slate-350" />
          <span>&gt;</span>
          <span>Support Ticket</span>
          <span>&gt;</span>
          <span className="text-slate-600">Create a support ticket</span>
        </div>
      </div>

      {/* Form card */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-premium p-6 space-y-6">
        <div className="pb-4 border-b border-slate-55 mb-6">
          <h3 className="text-xs font-extrabold text-slate-800 tracking-wide uppercase">Create a support ticket</h3>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 text-xs font-bold text-slate-700">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="flex flex-col space-y-1.5">
              <label>Email*</label>
              <input 
                type="email" 
                required 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none" 
              />
            </div>

            <div className="flex flex-col space-y-1.5">
              <label>Subject*</label>
              <input 
                type="text" 
                required 
                value={subject} 
                onChange={(e) => setSubject(e.target.value)} 
                placeholder="Enter Subject" 
                className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none" 
              />
            </div>

          </div>

          <div className="flex flex-col space-y-1.5">
            <label>Description</label>
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              {/* Rich text mock bar */}
              <div className="bg-slate-50 border-b border-slate-200 p-2 flex flex-wrap gap-2 text-[10px] text-slate-500 font-bold select-none">
                <span className="px-2 py-0.5 hover:bg-slate-200 rounded cursor-pointer">File</span>
                <span className="px-2 py-0.5 hover:bg-slate-200 rounded cursor-pointer">Edit</span>
                <span className="px-2 py-0.5 hover:bg-slate-200 rounded cursor-pointer">View</span>
                <span className="px-2 py-0.5 hover:bg-slate-200 rounded cursor-pointer">Insert</span>
                <span className="px-2 py-0.5 hover:bg-slate-200 rounded cursor-pointer">Format</span>
                <span className="px-2 py-0.5 hover:bg-slate-200 rounded cursor-pointer">Tools</span>
                <span className="px-2 py-0.5 hover:bg-slate-200 rounded cursor-pointer">Table</span>
              </div>
              <textarea 
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                rows="6"
                placeholder="Describe your issue in detail..."
                className="w-full p-4 text-xs font-medium text-slate-800 focus:outline-none"
              />
            </div>
          </div>

          <div className="flex flex-col space-y-1.5">
            <label>Attachment</label>
            <div className="flex items-center space-x-2">
              <div className="flex-1 bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-400 flex items-center justify-between">
                <span>Choose file</span>
                <button type="button" className="px-3 py-0.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-[10px] font-bold border border-slate-300">Browse</button>
              </div>
            </div>
            <p className="text-[9px] text-orange-400 font-bold leading-none mt-1">Upload only ZIP files, Max File Size is 20 MB</p>
          </div>

          {/* Centered Save Button */}
          <div className="flex justify-center pt-6">
            <button 
              type="submit"
              className="px-8 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-bold text-xs transition active:scale-95 shadow-md shadow-emerald-500/10"
            >
              Save
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
