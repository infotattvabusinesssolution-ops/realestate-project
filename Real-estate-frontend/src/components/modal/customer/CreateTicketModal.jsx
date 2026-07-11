import React, { useState } from 'react';
import { X } from 'lucide-react';

export default function CreateTicketModal({ isOpen, onClose, onSave }) {
  const [subject, setSubject] = useState('');
  const [urgency, setUrgency] = useState('Medium');
  const [desc, setDesc] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!subject) return;
    onSave({
      subject,
      urgency,
      desc
    });
    // Reset
    setSubject('');
    setUrgency('Medium');
    setDesc('');
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4 animate-in fade-in duration-300">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl border border-slate-100 overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h3 className="text-sm font-bold text-slate-800">Create Support Ticket</h3>
          <button 
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-655 transition"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs font-bold text-slate-700">
          
          <div className="flex flex-col space-y-1.5">
            <label>Subject*</label>
            <input
              type="text"
              required
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="e.g. Refund issue with lifetime subscription"
              className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none focus:ring-1 focus:ring-orange-500/50"
            />
          </div>

          <div className="flex flex-col space-y-1.5">
            <label>Urgency Level</label>
            <select
              value={urgency}
              onChange={(e) => setUrgency(e.target.value)}
              className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none w-full"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          <div className="flex flex-col space-y-1.5">
            <label>Description</label>
            <textarea
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              rows="4"
              placeholder="Describe your issue or query..."
              className="bg-white border border-slate-200 rounded-xl p-3 text-xs font-medium text-slate-800 focus:outline-none focus:ring-1 focus:ring-orange-500/50 w-full"
            />
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-end space-x-2 pt-4 border-t border-slate-100">
            <button 
              type="button" 
              onClick={onClose}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-bold text-xs transition active:scale-95 shadow-sm"
            >
              Close
            </button>
            <button 
              type="submit"
              className="px-4 py-2 bg-orange-500 hover:bg-orange-650 text-white rounded-lg font-bold text-xs transition active:scale-95 shadow-sm"
            >
              Submit Ticket
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
