import React, { useState } from 'react';
import { X } from 'lucide-react';

export default function AddVendorAgentModal({ isOpen, onClose, onSave }) {
  const [username, setUsername] = useState('admin');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('•••••');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !email) {
      alert('Please enter username and email');
      return;
    }
    onSave({
      username,
      email,
      firstName,
      lastName,
      password
    });
    // Reset modal states
    setUsername('admin');
    setEmail('');
    setFirstName('');
    setLastName('');
    setPassword('•••••');
    setConfirmPassword('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center z-[100] animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl overflow-hidden animate-in zoom-in-95 duration-200 relative flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between shrink-0">
          <h3 className="font-extrabold text-slate-900 text-sm">Add Agent</h3>
          <button 
            onClick={onClose}
            className="p-1 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-700 transition"
          >
            <X size={16} />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6 text-xs font-bold text-slate-700">
          
          {/* Image Selector Slot */}
          <div className="space-y-2">
            <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block">Image*</label>
            <div className="w-44 h-44 border border-dashed border-slate-200 bg-slate-50 rounded-xl flex flex-col items-center justify-center text-slate-300 text-center mx-auto">
              <span className="text-[10px] font-bold text-slate-400 leading-none mb-1">NO IMAGE</span>
              <span className="text-[10px] font-bold text-slate-400 leading-none">FOUND</span>
            </div>
            <div className="flex justify-center">
              <button type="button" className="px-4 py-1.5 bg-blue-600 text-white rounded font-bold text-[10px] hover:bg-blue-700 transition mt-2">Choose Image</button>
            </div>
          </div>

          {/* Form Grid */}
          <div className="grid grid-cols-2 gap-4">
            
            <div className="flex flex-col space-y-1.5">
              <label>Username*</label>
              <input 
                type="text" 
                required 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                placeholder="Enter Username" 
                className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none" 
              />
            </div>

            <div className="flex flex-col space-y-1.5">
              <label>Email*</label>
              <input 
                type="email" 
                required 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="Enter Email" 
                className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none" 
              />
            </div>

            <div className="flex flex-col space-y-1.5">
              <label>First Name*</label>
              <input 
                type="text" 
                required 
                value={firstName} 
                onChange={(e) => setFirstName(e.target.value)} 
                placeholder="Enter First Name" 
                className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none" 
              />
            </div>

            <div className="flex flex-col space-y-1.5">
              <label>Last Name*</label>
              <input 
                type="text" 
                required 
                value={lastName} 
                onChange={(e) => setLastName(e.target.value)} 
                placeholder="Enter Last Name" 
                className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none" 
              />
            </div>

            <div className="flex flex-col space-y-1.5">
              <label>Password*</label>
              <input 
                type="password" 
                required 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none" 
              />
            </div>

            <div className="flex flex-col space-y-1.5">
              <label>Confirm Password*</label>
              <input 
                type="password" 
                required 
                value={confirmPassword} 
                onChange={(e) => setConfirmPassword(e.target.value)} 
                placeholder="Re-Enter Password" 
                className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none" 
              />
            </div>

          </div>

          {/* Modal Footer */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-end space-x-2 shrink-0">
            <button 
              type="button" 
              onClick={onClose}
              className="px-5 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg font-bold text-xs transition active:scale-95"
            >
              Close
            </button>
            <button 
              type="submit"
              className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold text-xs transition active:scale-95 shadow-md shadow-blue-500/10"
            >
              Save
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
