import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Home, ArrowLeft, Bold, Italic, Underline, Strikethrough,
  Link as LinkIcon, Image, Film, Table, AlignLeft, AlignCenter,
  AlignRight, AlignJustify, List, ListOrdered, Code, Maximize2, HelpCircle, Globe
} from 'lucide-react';

export default function CustomPagesAddTab({ setActiveTab }) {
  const navigate = useNavigate();
  
  const [status, setStatus] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [metaKeywords, setMetaKeywords] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [cloneArabic, setCloneArabic] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!status || !title || !content) {
      alert('Please fill out all required fields.');
      return;
    }
    // Mock save
    alert('Page saved successfully!');
    setActiveTab('custom-pages');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Heading & Breadcrumbs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-slate-100">
        <div>
          <h1 className="text-xl lg:text-2xl font-bold tracking-tight text-slate-900">Add Page</h1>
          <div className="flex items-center space-x-2 text-xs text-slate-400 mt-2">
            <Home size={14} className="text-slate-400 cursor-pointer hover:text-blue-600" onClick={() => navigate('/')} />
            <span>&gt;</span>
            <span className="hover:text-blue-600 cursor-pointer" onClick={() => setActiveTab('custom-pages')}>Custom Pages</span>
            <span>&gt;</span>
            <span className="text-slate-500 font-semibold">Add Page</span>
          </div>
        </div>
      </div>

      {/* Form Container */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-premium p-6">
        
        {/* Header elements */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-50 mb-6">
          <h3 className="text-sm font-bold text-slate-800">Add Page</h3>
          
          <button 
            type="button"
            onClick={() => setActiveTab('custom-pages')}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition active:scale-95 shadow-md shadow-blue-500/10"
          >
            <ArrowLeft size={14} />
            <span>Back</span>
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="max-w-5xl mx-auto space-y-6 text-xs font-bold text-slate-700">
          
          {/* Page Status */}
          <div className="flex flex-col space-y-1.5">
            <label>Page Status*</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-850 focus:outline-none w-full"
              required
            >
              <option value="">Select a Status</option>
              <option value="Active">Active</option>
              <option value="Deactive">Deactive</option>
            </select>
          </div>

          {/* Banner: English Language */}
          <div className="bg-indigo-500 text-white py-2.5 px-4 rounded-xl text-xs font-bold tracking-wide">
            English Language (Default)
          </div>

          {/* Title */}
          <div className="flex flex-col space-y-1.5">
            <label>Title*</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter Title"
              className="bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-100 w-full"
              required
            />
          </div>

          {/* Content (Rich Text Editor simulation) */}
          <div className="flex flex-col space-y-1.5">
            <label>Content*</label>
            <div className="border border-slate-200 rounded-xl overflow-hidden shadow-sm">
              {/* Rich text Toolbar */}
              <div className="bg-slate-55 border-b border-slate-200 p-2 flex flex-wrap items-center gap-1.5 bg-slate-50/50">
                <span className="text-[10px] text-slate-400 px-1 font-semibold border-r border-slate-200 pr-2 mr-1">File Edit View Insert Format Tools Table</span>
                
                <button type="button" className="p-1 hover:bg-slate-200 rounded text-slate-500"><Bold size={13} /></button>
                <button type="button" className="p-1 hover:bg-slate-200 rounded text-slate-500"><Italic size={13} /></button>
                <button type="button" className="p-1 hover:bg-slate-200 rounded text-slate-500"><Underline size={13} /></button>
                <button type="button" className="p-1 hover:bg-slate-200 rounded text-slate-500"><Strikethrough size={13} /></button>
                
                <span className="w-px h-4 bg-slate-200 mx-1"></span>
                
                <button type="button" className="p-1 hover:bg-slate-200 rounded text-slate-500"><LinkIcon size={13} /></button>
                <button type="button" className="p-1 hover:bg-slate-200 rounded text-slate-500"><Image size={13} /></button>
                <button type="button" className="p-1 hover:bg-slate-200 rounded text-slate-500"><Film size={13} /></button>
                <button type="button" className="p-1 hover:bg-slate-200 rounded text-slate-500"><Table size={13} /></button>
                
                <span className="w-px h-4 bg-slate-200 mx-1"></span>
                
                <button type="button" className="p-1 hover:bg-slate-200 rounded text-slate-500"><AlignLeft size={13} /></button>
                <button type="button" className="p-1 hover:bg-slate-200 rounded text-slate-500"><AlignCenter size={13} /></button>
                <button type="button" className="p-1 hover:bg-slate-200 rounded text-slate-500"><AlignRight size={13} /></button>
                <button type="button" className="p-1 hover:bg-slate-200 rounded text-slate-500"><AlignJustify size={13} /></button>
                
                <span className="w-px h-4 bg-slate-200 mx-1"></span>
                
                <button type="button" className="p-1 hover:bg-slate-200 rounded text-slate-500"><List size={13} /></button>
                <button type="button" className="p-1 hover:bg-slate-200 rounded text-slate-500"><ListOrdered size={13} /></button>
                
                <span className="w-px h-4 bg-slate-200 mx-1"></span>
                
                <button type="button" className="p-1 hover:bg-slate-200 rounded text-slate-500"><Code size={13} /></button>
                <button type="button" className="p-1 hover:bg-slate-200 rounded text-slate-500"><Maximize2 size={13} /></button>
                <button type="button" className="p-1 hover:bg-slate-200 rounded text-slate-500"><HelpCircle size={13} /></button>
              </div>
              
              {/* Text Area */}
              <textarea
                rows={10}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Start typing your page content..."
                className="w-full p-4 text-xs font-medium text-slate-800 focus:outline-none resize-none bg-white font-mono leading-relaxed"
                required
              />
              <div className="bg-slate-50 border-t border-slate-150 px-3 py-1 flex items-center justify-between text-[9px] text-slate-400 font-semibold">
                <span>p</span>
                <span>0 words</span>
              </div>
            </div>
          </div>

          {/* Meta Keywords */}
          <div className="flex flex-col space-y-1.5">
            <label>Meta Keywords</label>
            <input
              type="text"
              value={metaKeywords}
              onChange={(e) => setMetaKeywords(e.target.value)}
              placeholder="Enter Meta Keywords"
              className="bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-100 w-full"
            />
          </div>

          {/* Meta Description */}
          <div className="flex flex-col space-y-1.5">
            <label>Meta Description</label>
            <textarea
              rows={4}
              value={metaDescription}
              onChange={(e) => setMetaDescription(e.target.value)}
              placeholder="Enter Meta Description"
              className="bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-100 resize-none w-full"
            />
          </div>

          {/* Clone for Arabic checkbox */}
          <div className="flex items-center space-x-2 pt-2">
            <input
              type="checkbox"
              id="cloneArabic"
              checked={cloneArabic}
              onChange={(e) => setCloneArabic(e.target.checked)}
              className="w-4 h-4 text-blue-600 border-slate-200 rounded focus:ring-blue-500"
            />
            <label htmlFor="cloneArabic" className="text-xs font-bold text-slate-700 cursor-pointer select-none">
              Clone for عربي language
            </label>
          </div>

          {/* Language selector block at the bottom right */}
          <div className="bg-slate-50/50 border border-slate-200/60 rounded-xl p-3 flex items-center justify-between mt-6">
            <span className="text-[10px] text-slate-450 font-bold uppercase tracking-wider">Arabic Version Configuration</span>
            <div className="flex items-center space-x-1.5 text-blue-600 font-bold hover:underline cursor-pointer">
              <Globe size={12} />
              <span>Language عربي</span>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center pt-4">
            <button
              type="submit"
              className="px-8 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold transition active:scale-95 shadow-md shadow-emerald-500/10"
            >
              Save
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
