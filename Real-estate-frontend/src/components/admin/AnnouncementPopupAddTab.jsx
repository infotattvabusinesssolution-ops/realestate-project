import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, ArrowLeft, Image as ImageIcon, Globe } from 'lucide-react';

export default function AnnouncementPopupAddTab({ setActiveTab }) {
  const navigate = useNavigate();

  const [imagePreview, setImagePreview] = useState(null);
  const [lang, setLang] = useState('');
  const [name, setName] = useState('');
  const [bgColor, setBgColor] = useState('');
  const [bgOpacity, setBgOpacity] = useState('');
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [btnText, setBtnText] = useState('');
  const [btnColor, setBtnColor] = useState('');
  const [delay, setDelay] = useState('');
  const [serialNumber, setSerialNumber] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!lang || !name || !bgColor || !bgOpacity || !title || !text || !delay || !serialNumber) {
      alert('Please fill out all required fields.');
      return;
    }
    alert('Announcement popup saved successfully!');
    setActiveTab('announcement-popups');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Heading & Breadcrumbs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-slate-100">
        <div>
          <h1 className="text-xl lg:text-2xl font-bold tracking-tight text-slate-900">Add Popup</h1>
          <div className="flex items-center space-x-2 text-xs text-slate-400 mt-2">
            <Home size={14} className="text-slate-400 cursor-pointer hover:text-blue-600" onClick={() => navigate('/')} />
            <span>&gt;</span>
            <span className="hover:text-blue-600 cursor-pointer" onClick={() => setActiveTab('announcement-popups')}>Announcement Popups</span>
            <span>&gt;</span>
            <span className="text-slate-500 font-semibold">Add Popup</span>
          </div>
        </div>
      </div>

      {/* Form Container */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-premium p-6">
        
        {/* Header elements */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-50 mb-6">
          <h3 className="text-sm font-bold text-slate-800">Add Popup (Type - 7)</h3>
          
          <button 
            type="button"
            onClick={() => setActiveTab('announcement-popups')}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition active:scale-95 shadow-md shadow-blue-500/10"
          >
            <ArrowLeft size={14} />
            <span>Back</span>
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-6 text-xs font-bold text-slate-700">
          
          {/* Image Upload Block */}
          <div className="flex flex-col space-y-2">
            <label>Image*</label>
            <div className="border border-slate-200 rounded-2xl p-6 flex flex-col items-center justify-center text-center w-48 aspect-[4/3] bg-slate-50/30">
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" className="w-full h-full object-cover rounded-xl" />
              ) : (
                <>
                  <ImageIcon size={28} className="text-slate-350 mb-2" />
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">No Image Found</span>
                </>
              )}
            </div>
            <button 
              type="button" 
              onClick={() => setImagePreview('https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=400&q=80')}
              className="px-4 py-2 bg-blue-600 text-white font-bold text-xs rounded-xl hover:bg-blue-700 transition w-36 shadow-sm"
            >
              Choose Image
            </button>
          </div>

          {/* Language Selection */}
          <div className="flex flex-col space-y-1.5">
            <label>Language*</label>
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value)}
              className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-850 focus:outline-none w-full"
              required
            >
              <option value="" disabled>Select a Language</option>
              <option value="English">English</option>
              <option value="Arabic">Arabic</option>
            </select>
          </div>

          {/* Name */}
          <div className="flex flex-col space-y-1.5">
            <label>Name*</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter Popup Name"
              className="bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none w-full"
              required
            />
            <span className="text-[10px] text-amber-600 font-medium">
              This name is for database. It is useful for admin to identify the popup.
            </span>
          </div>

          {/* Background Color Code */}
          <div className="flex flex-col space-y-1.5">
            <label>Background Color Code*</label>
            <input
              type="text"
              value={bgColor}
              onChange={(e) => setBgColor(e.target.value)}
              placeholder="Enter Background Color Code (e.g. #ffffff)"
              className="bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none w-full"
              required
            />
          </div>

          {/* Background Color Opacity */}
          <div className="flex flex-col space-y-1.5">
            <label>Background Color Opacity*</label>
            <input
              type="text"
              value={bgOpacity}
              onChange={(e) => setBgOpacity(e.target.value)}
              placeholder="Enter Background Color Opacity (0 to 1)"
              className="bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none w-full"
              required
            />
            <span className="text-[10px] text-amber-600 font-medium">
              Provide decimal value for background opacity level of the color. Value should be between 0 to 1. Transparency level will raise with the increment of the value.
            </span>
          </div>

          {/* Title */}
          <div className="flex flex-col space-y-1.5">
            <label>Title*</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter Popup Title"
              className="bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none w-full"
              required
            />
          </div>

          {/* Text */}
          <div className="flex flex-col space-y-1.5">
            <label>Text*</label>
            <textarea
              rows={4}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter Popup Text"
              className="bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none resize-none w-full"
              required
            />
          </div>

          {/* Buttons Settings Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col space-y-1.5">
              <label>Button Text</label>
              <input
                type="text"
                value={btnText}
                onChange={(e) => setBtnText(e.target.value)}
                placeholder="Enter Button Text"
                className="bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none w-full"
              />
            </div>

            <div className="flex flex-col space-y-1.5">
              <label>Button Color Code</label>
              <input
                type="text"
                value={btnColor}
                onChange={(e) => setBtnColor(e.target.value)}
                placeholder="Enter Button Color Code (e.g. #2563eb)"
                className="bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none w-full"
              />
            </div>
          </div>

          {/* Delay (in Seconds)* */}
          <div className="flex flex-col space-y-1.5">
            <label>Delay (in Seconds)*</label>
            <input
              type="number"
              value={delay}
              onChange={(e) => setDelay(e.target.value)}
              placeholder="Enter Popup Delay"
              className="bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none w-full"
              required
            />
            <span className="text-[10px] text-amber-600 font-medium">
              popup will appear after this delay time
            </span>
          </div>

          {/* Serial Number */}
          <div className="flex flex-col space-y-1.5">
            <label>Serial Number*</label>
            <input
              type="number"
              value={serialNumber}
              onChange={(e) => setSerialNumber(e.target.value)}
              placeholder="Enter Serial Number"
              className="bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none w-full"
              required
            />
            <span className="text-[10px] text-amber-600 font-medium">
              If there are multiple active popups, then popups will be shown in UI according to serial number. The higher the serial number is, the earlier the popup will be shown.
            </span>
          </div>

          {/* Bottom language configuration indicator */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex items-center justify-between mt-6">
            <span className="text-[10px] text-slate-450 font-bold uppercase tracking-wider">Arabic Version Configuration</span>
            <div className="flex items-center space-x-1.5 text-blue-600 font-bold hover:underline cursor-pointer">
              <Globe size={12} />
              <span>Language عربي</span>
            </div>
          </div>

          {/* Save Button */}
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
