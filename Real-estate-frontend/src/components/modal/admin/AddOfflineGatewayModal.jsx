import React, { useState } from 'react';
import { X, Bold, Italic, Underline, Strikethrough } from 'lucide-react';

export default function AddOfflineGatewayModal({ isOpen, onClose, onSave }) {
  const [name, setName] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [instructions, setInstructions] = useState('');
  const [attachmentStatus, setAttachmentStatus] = useState('Active');
  const [serialNumber, setSerialNumber] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !serialNumber) return;
    onSave({
      name,
      shortDescription,
      instructions,
      status: attachmentStatus,
      serialNumber: parseInt(serialNumber, 10) || 1
    });
    // Reset fields
    setName('');
    setShortDescription('');
    setInstructions('');
    setAttachmentStatus('Active');
    setSerialNumber('');
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4 animate-in fade-in duration-300">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl border border-slate-100 overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h3 className="text-sm font-bold text-slate-800">Add Gateway</h3>
          <button 
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-650 transition"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body / Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs font-bold text-slate-700 max-h-[80vh] overflow-y-auto">
          
          {/* Gateway Name */}
          <div className="flex flex-col space-y-1.5">
            <label>Gateway Name*</label>
            <input
              type="text"
              placeholder="Enter Payment Gateway Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none"
              required
            />
          </div>

          {/* Short Description */}
          <div className="flex flex-col space-y-1.5">
            <label>Short Description</label>
            <textarea
              rows={3}
              placeholder="Enter Short Description"
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
              className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none resize-none"
            />
          </div>

          {/* Instructions (Rich Text Editor simulation) */}
          <div className="flex flex-col space-y-1.5">
            <label>Instructions</label>
            <div className="border border-slate-200 rounded-xl overflow-hidden shadow-sm">
              <div className="bg-slate-50 border-b border-slate-200 p-2 flex flex-wrap items-center gap-1.5">
                <span className="text-[9px] text-slate-400 font-semibold border-r border-slate-200 pr-2 mr-1">File Edit View Insert Format Tools Table</span>
                <button type="button" className="p-1 hover:bg-slate-200 rounded text-slate-500"><Bold size={11} /></button>
                <button type="button" className="p-1 hover:bg-slate-200 rounded text-slate-500"><Italic size={11} /></button>
                <button type="button" className="p-1 hover:bg-slate-200 rounded text-slate-500"><Underline size={11} /></button>
                <button type="button" className="p-1 hover:bg-slate-200 rounded text-slate-500"><Strikethrough size={11} /></button>
              </div>
              <textarea
                rows={5}
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                placeholder="Enter Gateway Instructions"
                className="w-full p-3 text-xs font-medium text-slate-800 focus:outline-none resize-none bg-white font-sans leading-relaxed"
              />
              <div className="bg-slate-50 border-t border-slate-150 px-3 py-1 flex items-center justify-between text-[9px] text-slate-400 font-semibold">
                <span>p</span>
                <span>0 words</span>
              </div>
            </div>
          </div>

          {/* Attachment Status & Serial Number in a Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Attachment Status (Button Group style) */}
            <div className="flex flex-col space-y-1.5">
              <label>Attachment Status*</label>
              <div className="flex border border-slate-200 rounded-xl overflow-hidden bg-slate-50/50">
                <button
                  type="button"
                  onClick={() => setAttachmentStatus('Active')}
                  className={`flex-1 py-2 text-xs font-bold transition active:scale-95 ${
                    attachmentStatus === 'Active' 
                      ? 'bg-blue-600 text-white shadow-sm' 
                      : 'bg-white text-slate-500 hover:bg-slate-50'
                  }`}
                >
                  Active
                </button>
                <button
                  type="button"
                  onClick={() => setAttachmentStatus('Deactive')}
                  className={`flex-1 py-2 text-xs font-bold transition active:scale-95 ${
                    attachmentStatus === 'Deactive' 
                      ? 'bg-blue-600 text-white shadow-sm' 
                      : 'bg-white text-slate-500 hover:bg-slate-50'
                  }`}
                >
                  Deactive
                </button>
              </div>
            </div>

            {/* Serial Number */}
            <div className="flex flex-col space-y-1.5">
              <label>Serial Number*</label>
              <input
                type="number"
                placeholder="Enter Serial Number"
                value={serialNumber}
                onChange={(e) => setSerialNumber(e.target.value)}
                className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none"
                required
              />
            </div>

          </div>

          <div className="text-[10px] text-amber-600 font-medium pt-1">
            The higher the serial number is, the later the gateway will be shown.
          </div>

          {/* Bottom buttons */}
          <div className="flex items-center justify-end space-x-2 pt-4 border-t border-slate-100">
            <button 
              type="button" 
              onClick={onClose}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded font-bold text-xs transition active:scale-95 shadow-sm"
            >
              Close
            </button>
            <button 
              type="submit"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded font-bold text-xs transition active:scale-95 shadow-sm"
            >
              Submit
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
