import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, Bold, Italic, Underline, Link as LinkIcon, Image, List, ListOrdered, Building2, Hotel } from 'lucide-react';

export default function HomeWhyChooseTab({ setActiveTab }) {
  const navigate = useNavigate();
  const [videoLink, setVideoLink] = useState("https://www.youtube.com/watch?v=mrp1_PK0_upQ");
  const [title, setTitle] = useState("Why Choose Us Teste");
  const [subtitle, setSubtitle] = useState("Our Great Services Waiting For You");
  
  const [descText, setDescText] = useState(
    "Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Nulla porttitor accumsan tincidunt. Curabitur arcu erat, accumsan id imperdiet et, porttitor at."
  );

  const handleUpdateImage = (e) => {
    e.preventDefault();
    alert('Why Choose Us images updated successfully!');
  };

  const handleUpdateInfo = (e) => {
    e.preventDefault();
    alert('Why Choose Us section information updated successfully!');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Heading & Breadcrumbs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-slate-100">
        <div>
          <h1 className="text-xl lg:text-2xl font-bold tracking-tight text-slate-900">Why Choose Us Section</h1>
          <div className="flex items-center space-x-2 text-xs text-slate-400 mt-2">
            <Home size={14} className="text-slate-400 cursor-pointer hover:text-blue-600" onClick={() => navigate('/')} />
            <span>&gt;</span>
            <span className="hover:text-blue-600 cursor-pointer" onClick={() => setActiveTab('dashboard')}>Home Page</span>
            <span>&gt;</span>
            <span className="text-slate-500 font-semibold">Why Choose Us Section</span>
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
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=400&q=80" 
                  alt="Why Choose Us One" 
                  className="w-full aspect-[4/3] object-cover"
                />
              </div>
              <button type="button" className="px-4 py-2 bg-blue-600 text-white font-bold text-xs rounded-xl hover:bg-blue-750 transition w-36">
                Choose Image
              </button>
            </div>

            <div className="flex flex-col space-y-2 pt-4 border-t border-slate-50">
              <label>Image Two*</label>
              <div className="border border-slate-200 rounded-2xl overflow-hidden max-w-xs">
                <img 
                  src="https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=400&q=80" 
                  alt="Why Choose Us Two" 
                  className="w-full aspect-[4/3] object-cover"
                />
              </div>
              <button type="button" className="px-4 py-2 bg-blue-650 text-white font-bold text-xs rounded-xl hover:bg-blue-700 transition w-36">
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

        {/* Right Side: Information Details & Simulated Editor */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-premium p-6 space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-50">
            <h3 className="text-sm font-bold text-slate-800">Why Choose Us Section Information</h3>
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
                <div className="p-4 space-y-4 bg-white min-h-[220px]">
                  <textarea
                    rows={3}
                    value={descText}
                    onChange={(e) => setDescText(e.target.value)}
                    className="w-full text-xs font-medium text-slate-800 focus:outline-none resize-none leading-relaxed border-0 p-0"
                  />
                  
                  {/* Grid of features icons representing the UI screenshot */}
                  <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-100 text-center text-xs font-bold text-slate-700">
                    <div className="flex flex-col items-center p-3 border border-slate-100 rounded-xl bg-slate-50/50">
                      <div className="p-2 bg-emerald-500 text-white rounded-lg mb-1.5">
                        <Home size={16} />
                      </div>
                      <span className="text-[10px]">House</span>
                    </div>

                    <div className="flex flex-col items-center p-3 border border-slate-100 rounded-xl bg-slate-50/50">
                      <div className="p-2 bg-blue-600 text-white rounded-lg mb-1.5">
                        <Building2 size={16} />
                      </div>
                      <span className="text-[10px]">Apartment</span>
                    </div>

                    <div className="flex flex-col items-center p-3 border border-slate-100 rounded-xl bg-slate-50/50">
                      <div className="p-2 bg-indigo-650 text-white rounded-lg mb-1.5">
                        <Hotel size={16} />
                      </div>
                      <span className="text-[10px]">Hotel</span>
                    </div>
                  </div>
                </div>

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
