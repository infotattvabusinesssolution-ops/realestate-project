import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, Bold, Italic, Underline, Link as LinkIcon, Image, List, ListOrdered } from 'lucide-react';

export default function HomeAboutTab({ setActiveTab }) {
  const navigate = useNavigate();
  
  const [videoLink, setVideoLink] = useState("https://www.youtube.com/watch?v=F3dFlN1rsf0");
  const [title, setTitle] = useState("About Us");
  const [subtitle, setSubtitle] = useState("We Always Provide Your Favorite Destination");
  
  const [descText, setDescText] = useState(
    `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempore odio laborum magnam sequi, ducimus impedit eum eius quia obcaecati suscipit corrupti unde eaque illo fugit maxime aliquid.\n\nCurabitur non nulla sit amet nisl tempus convallis quis ac lectus. Nulla porttitor accumsan tincidunt. Curabitur arcu erat, accumsan.`
  );
  
  const [experience, setExperience] = useState("8");
  const [clientText, setClientText] = useState("Active Client's");
  const [btnName, setBtnName] = useState("About Us");
  const [btnUrl, setBtnUrl] = useState("https://example.com");

  const handleUpdateImage = (e) => {
    e.preventDefault();
    alert('About images updated successfully!');
  };

  const handleUpdateInfo = (e) => {
    e.preventDefault();
    alert('About section information updated successfully!');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Heading & Breadcrumbs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-slate-100">
        <div>
          <h1 className="text-xl lg:text-2xl font-bold tracking-tight text-slate-900">About Section</h1>
          <div className="flex items-center space-x-2 text-xs text-slate-400 mt-2">
            <Home size={14} className="text-slate-400 cursor-pointer hover:text-blue-600" onClick={() => navigate('/')} />
            <span>&gt;</span>
            <span className="hover:text-blue-600 cursor-pointer" onClick={() => setActiveTab('dashboard')}>Home Page</span>
            <span>&gt;</span>
            <span className="text-slate-500 font-semibold">About Section</span>
          </div>
        </div>
      </div>

      {/* Two panel layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        
        {/* Left Side: Images & Video Link */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-premium p-6 space-y-6">
          <h3 className="text-sm font-bold text-slate-800 pb-3 border-b border-slate-50">Section Image</h3>

          <form onSubmit={handleUpdateImage} className="space-y-6 text-xs font-bold text-slate-700">
            <div className="flex flex-col space-y-2">
              <label>Image One*</label>
              <div className="border border-slate-200 rounded-2xl overflow-hidden max-w-xs">
                <img 
                  src="https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=400&q=80" 
                  alt="About One" 
                  className="w-full aspect-[4/5] object-cover"
                />
              </div>
              <button type="button" className="px-4 py-2 bg-blue-650 text-white font-bold text-xs rounded-xl hover:bg-indigo-700 transition w-36">
                Choose Image
              </button>
            </div>

            <div className="flex flex-col space-y-2 pt-4 border-t border-slate-50">
              <label>Image Two*</label>
              <div className="border border-slate-200 rounded-2xl overflow-hidden max-w-xs">
                <img 
                  src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=400&q=80" 
                  alt="About Two" 
                  className="w-full aspect-[4/5] object-cover"
                />
              </div>
              <button type="button" className="px-4 py-2 bg-blue-650 text-white font-bold text-xs rounded-xl hover:bg-indigo-700 transition w-36">
                Choose Image
              </button>
            </div>

            <div className="flex flex-col space-y-1.5 pt-4 border-t border-slate-50">
              <label>Video Link</label>
              <input
                type="text"
                value={videoLink}
                onChange={(e) => setVideoLink(e.target.value)}
                className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-200 w-full"
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

        {/* Right Side: Information Details & Editor */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-premium p-6 space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-50">
            <h3 className="text-sm font-bold text-slate-800">About Section Information</h3>
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

            {/* Rich Editor Simulated Control */}
            <div className="flex flex-col space-y-2">
              <label>Text</label>
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
                  rows={8}
                  value={descText}
                  onChange={(e) => setDescText(e.target.value)}
                  className="w-full p-3 text-xs font-medium text-slate-800 focus:outline-none resize-none leading-relaxed bg-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col space-y-1.5">
                <label>Years of Experience</label>
                <input
                  type="text"
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none"
                  required
                />
              </div>

              <div className="flex flex-col space-y-1.5">
                <label>Client Text</label>
                <input
                  type="text"
                  value={clientText}
                  onChange={(e) => setClientText(e.target.value)}
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
                />
              </div>

              <div className="flex flex-col space-y-1.5">
                <label>Button URL</label>
                <input
                  type="text"
                  value={btnUrl}
                  onChange={(e) => setBtnUrl(e.target.value)}
                  className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none"
                />
              </div>
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
