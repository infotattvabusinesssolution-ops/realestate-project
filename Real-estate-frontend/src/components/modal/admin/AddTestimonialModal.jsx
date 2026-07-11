import React, { useState } from 'react';
import { X, Image as ImageIcon } from 'lucide-react';

export default function AddTestimonialModal({ isOpen, onClose, onSave }) {
  const [lang, setLang] = useState('English');
  const [name, setName] = useState('');
  const [occupation, setOccupation] = useState('');
  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !occupation) return;
    onSave({
      lang,
      name,
      occupation,
      rating,
      comment
    });
    // Reset fields
    setName('');
    setOccupation('');
    setRating('');
    setComment('');
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4 animate-in fade-in duration-300">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl border border-slate-100 overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h3 className="text-sm font-bold text-slate-800">Add Testimonial</h3>
          <button 
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-650 transition"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body / Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[80vh] overflow-y-auto text-xs font-bold text-slate-700">
          
          <div className="flex flex-col space-y-1.5">
            <label>Language*</label>
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value)}
              className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-850 focus:outline-none"
            >
              <option value="English">English</option>
              <option value="Arabic">Arabic</option>
            </select>
          </div>

          {/* Client Image Upload */}
          <div className="flex flex-col space-y-2">
            <label>Client Image*</label>
            <div className="border border-slate-200 rounded-2xl p-6 flex flex-col items-center justify-center text-center w-36 aspect-square bg-slate-50/30">
              <ImageIcon size={28} className="text-slate-300 mb-2" />
              <span className="text-[10px] text-slate-450 font-bold uppercase tracking-wider">No Image Found</span>
            </div>
            <button type="button" className="px-4 py-2 bg-blue-600 text-white font-bold text-xs rounded-xl hover:bg-blue-700 transition w-36">
              Choose Image
            </button>
          </div>

          <div className="flex flex-col space-y-1.5">
            <label>Name*</label>
            <input
              type="text"
              placeholder="Enter Client Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none"
              required
            />
          </div>

          <div className="flex flex-col space-y-1.5">
            <label>Occupation*</label>
            <input
              type="text"
              placeholder="Enter Client Occupation"
              value={occupation}
              onChange={(e) => setOccupation(e.target.value)}
              className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none"
              required
            />
          </div>

          <div className="flex flex-col space-y-1.5">
            <label>Rating*</label>
            <input
              type="number"
              placeholder="Enter Rating"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none"
              required
            />
          </div>

          <div className="flex flex-col space-y-1.5">
            <label>Comment*</label>
            <textarea
              rows={4}
              placeholder="Enter Client Comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none resize-none"
              required
            />
          </div>

          {/* Bottom buttons */}
          <div className="flex items-center justify-end space-x-2 pt-4 border-t border-slate-100">
            <button 
              type="button" 
              onClick={onClose}
              className="px-4 py-2 bg-indigo-650 hover:bg-indigo-700 text-white rounded font-bold text-xs transition active:scale-95 shadow-sm"
            >
              Close
            </button>
            <button 
              type="submit"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded font-bold text-xs transition active:scale-95 shadow-sm"
            >
              Save
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
