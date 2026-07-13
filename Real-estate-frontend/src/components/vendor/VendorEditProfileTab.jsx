import React, { useState, useEffect, useRef } from 'react';
import { Home, ChevronDown, Camera } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import axiosInstance from '../../api/axiosInstance';

export function VendorEditProfileTab() {
  const { user, updateProfile } = useAuth();
  const fileInputRef = useRef(null);
  
  // States matching user schema
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [city, setCity] = useState('');
  const [stateName, setStateName] = useState('');
  const [zip, setZip] = useState('');
  const [address, setAddress] = useState('');
  const [details, setDetails] = useState('');

  const [showEmail, setShowEmail] = useState(true);
  const [showPhone, setShowPhone] = useState(true);
  const [showContactForm, setShowContactForm] = useState(true);
  const [arabicExpanded, setArabicExpanded] = useState(false);
  
  const [updating, setUpdating] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Load user data on mount/context change
  useEffect(() => {
    if (user) {
      setUsername(user.username || user.name || '');
      setEmail(user.email || '');
      setPhone(user.phone || '');
      setName(user.name || '');
      setAvatar(user.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80');
      setCity(user.city || '');
      setStateName(user.state || '');
      setZip(user.zip || '');
      setAddress(user.address || '');
      setDetails(user.specialization || '');
    }
  }, [user]);

  // Image Upload handler
  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      setUploading(true);
      const res = await axiosInstance.post('/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setAvatar(res.data.url);
      alert('Photo uploaded successfully!');
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to upload photo');
    } finally {
      setUploading(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      setUpdating(true);
      await updateProfile({
        name,
        phone,
        city,
        state: stateName,
        zip,
        address,
        specialization: details,
        avatar
      });
      alert('Profile updated successfully!');
    } catch (err) {
      alert(err || 'Failed to update profile.');
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 font-sans">
      
      {/* Header breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
        <h2 className="text-lg font-bold text-slate-800">Edit Profile</h2>
        <div className="flex items-center space-x-2 text-[10px] font-bold text-slate-400">
          <Home size={12} className="text-slate-350" />
          <span>&gt;</span>
          <span className="text-slate-650">Edit Profile</span>
        </div>
      </div>

      {/* Main card box */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-premium p-6">
        
        {/* Inner header title */}
        <div className="pb-3 border-b border-slate-100 mb-6">
          <h3 className="text-xs font-extrabold text-slate-800 tracking-wide uppercase">Edit Profile</h3>
        </div>

        <form onSubmit={handleUpdate} className="space-y-8 text-xs font-bold text-slate-700">
          
          {/* Details header block */}
          <div className="space-y-6">
            <h4 className="text-xs font-black text-slate-855 border-b border-slate-100 pb-2">Details</h4>
            
            {/* Photo Uploader */}
            <div className="space-y-3">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide block">Profile Photo</span>
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="relative group w-24 h-24 shrink-0">
                  <img 
                    src={avatar} 
                    alt={name || "Profile"} 
                    className="w-24 h-24 rounded-2xl object-cover border border-slate-150 shadow-sm"
                  />
                  {uploading && (
                    <div className="absolute inset-0 bg-black/50 rounded-2xl flex items-center justify-center text-white text-[9px] font-bold">
                      Uploading...
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  <input 
                    type="file"
                    ref={fileInputRef}
                    onChange={handlePhotoUpload}
                    accept="image/*"
                    className="hidden"
                  />
                  <button 
                    type="button" 
                    disabled={uploading}
                    onClick={() => fileInputRef.current.click()}
                    className="px-4 py-2 bg-[#16a34a] hover:bg-green-700 disabled:opacity-50 text-white rounded-xl font-bold text-[10px] transition active:scale-95 flex items-center gap-1.5 shadow-md shadow-green-500/10"
                  >
                    <Camera size={12} />
                    <span>{uploading ? 'Uploading...' : 'Choose Photo'}</span>
                  </button>
                  <p className="text-[9px] text-slate-400 font-semibold leading-relaxed">
                    Upload an avatar image to represent your user profile in vendor portal.
                  </p>
                </div>
              </div>
            </div>

            {/* Inputs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              <div className="flex flex-col space-y-1.5">
                <label className="text-slate-500">Username (Read-Only)</label>
                <input 
                  type="text" 
                  disabled
                  value={username} 
                  className="bg-slate-100 border border-slate-250 rounded-xl px-3 py-2 text-xs font-medium text-slate-500 cursor-not-allowed" 
                />
              </div>

              <div className="flex flex-col space-y-1.5">
                <label className="text-slate-500">Email (Read-Only)</label>
                <input 
                  type="email" 
                  disabled
                  value={email} 
                  className="bg-slate-100 border border-slate-250 rounded-xl px-3 py-2 text-xs font-medium text-slate-500 cursor-not-allowed" 
                />
              </div>

              <div className="flex flex-col space-y-1.5">
                <label>Phone</label>
                <input 
                  type="text" 
                  value={phone} 
                  onChange={(e) => setPhone(e.target.value)} 
                  className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none" 
                />
              </div>

            </div>

            {/* Checkboxes Row */}
            <div className="flex flex-wrap gap-6 pt-2">
              
              <label className="flex items-center space-x-2 text-slate-750 select-none cursor-pointer font-bold">
                <input 
                  type="checkbox" 
                  checked={showEmail} 
                  onChange={(e) => setShowEmail(e.target.checked)} 
                  className="w-4 h-4 rounded text-blue-600 border-slate-350 focus:ring-blue-500" 
                />
                <span>Show Email Address</span>
              </label>

              <label className="flex items-center space-x-2 text-slate-755 select-none cursor-pointer font-bold">
                <input 
                  type="checkbox" 
                  checked={showPhone} 
                  onChange={(e) => setShowPhone(e.target.checked)} 
                  className="w-4 h-4 rounded text-blue-600 border-slate-350 focus:ring-blue-500" 
                />
                <span>Show Phone Number</span>
              </label>

              <label className="flex items-center space-x-2 text-slate-760 select-none cursor-pointer font-bold">
                <input 
                  type="checkbox" 
                  checked={showContactForm} 
                  onChange={(e) => setShowContactForm(e.target.checked)} 
                  className="w-4 h-4 rounded text-blue-600 border-slate-350 focus:ring-blue-500" 
                />
                <span>Show Contact Form</span>
              </label>

            </div>

          </div>

          {/* Purple Header Language Box: English */}
          <div className="border border-slate-150 rounded-2xl overflow-hidden shadow-sm">
            <div className="bg-indigo-600/90 text-white px-5 py-3 font-extrabold tracking-wide">
              English Language (Default)
            </div>
            <div className="p-6 space-y-6 bg-slate-50/10">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                <div className="flex flex-col space-y-1.5">
                  <label>Name*</label>
                  <input 
                    type="text" 
                    required 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none" 
                  />
                </div>

                <div className="flex flex-col space-y-1.5">
                  <label>City</label>
                  <input 
                    type="text" 
                    value={city} 
                    onChange={(e) => setCity(e.target.value)} 
                    className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none" 
                  />
                </div>

                <div className="flex flex-col space-y-1.5">
                  <label>State</label>
                  <input 
                    type="text" 
                    value={stateName} 
                    onChange={(e) => setStateName(e.target.value)} 
                    className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none" 
                  />
                </div>

                <div className="flex flex-col space-y-1.5">
                  <label>Zip Code</label>
                  <input 
                    type="text" 
                    value={zip} 
                    onChange={(e) => setZip(e.target.value)} 
                    placeholder="Enter Zip Code" 
                    className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none w-full" 
                  />
                </div>

              </div>

              <div className="flex flex-col space-y-1.5">
                <label>Address</label>
                <input 
                  type="text" 
                  value={address} 
                  onChange={(e) => setAddress(e.target.value)} 
                  className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none w-full" 
                />
              </div>

              <div className="flex flex-col space-y-1.5">
                <label>Specialization / Details</label>
                <textarea 
                  value={details} 
                  onChange={(e) => setDetails(e.target.value)} 
                  rows="6"
                  className="bg-white border border-slate-200 rounded-xl p-4 text-xs font-medium text-slate-800 focus:outline-none w-full" 
                />
              </div>

            </div>
          </div>

          {/* Collapsible Arabic Translation Block */}
          <div className="border border-slate-150 rounded-2xl overflow-hidden shadow-sm">
            <button 
              type="button" 
              onClick={() => setArabicExpanded(!arabicExpanded)}
              className="w-full bg-slate-50 hover:bg-slate-100/70 border-b border-slate-150 px-5 py-3 font-extrabold text-blue-600 flex items-center justify-between text-left"
            >
              <span>عربي Language</span>
              <ChevronDown size={14} className={`transition-transform duration-200 ${arabicExpanded ? 'rotate-180' : ''}`} />
            </button>

            {arabicExpanded && (
              <div className="p-6 space-y-6 bg-slate-50/10 animate-in slide-in-from-top-2 duration-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  <div className="flex flex-col space-y-1.5">
                    <label>الاسم (Arabic Name)</label>
                    <input type="text" placeholder="الاسم" className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none" />
                  </div>

                  <div className="flex flex-col space-y-1.5">
                    <label>العنوان (Arabic Address)</label>
                    <input type="text" placeholder="العنوان" className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none" />
                  </div>

                </div>

                <div className="flex flex-col space-y-1.5">
                  <label>تفاصيل (Arabic Details)</label>
                  <textarea rows="6" placeholder="تفاصيل" className="bg-white border border-slate-200 rounded-xl p-4 text-xs font-medium text-slate-800 focus:outline-none w-full" />
                </div>
              </div>
            )}
          </div>

          {/* Submit button */}
          <div className="flex justify-center pt-4">
            <button 
              type="submit" 
              disabled={updating}
              className="px-8 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-bold text-xs transition active:scale-95 shadow-md shadow-emerald-500/10 disabled:opacity-50"
            >
              {updating ? 'Updating...' : 'Update'}
            </button>
          </div>

        </form>

      </div>

    </div>
  );
}
