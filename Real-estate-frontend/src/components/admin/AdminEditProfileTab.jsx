import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, Image as ImageIcon, Camera } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import axiosInstance from '../../api/axiosInstance';

export default function AdminEditProfileTab({ setActiveTab }) {
  const navigate = useNavigate();
  const { user, updateProfile } = useAuth();
  const fileInputRef = useRef(null);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');
  const [address, setAddress] = useState('');
  const [avatar, setAvatar] = useState('');
  
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setPhone(user.phone || '');
      setCity(user.city || '');
      setState(user.state || '');
      setZip(user.zip || '');
      setAddress(user.address || '');
      setAvatar(user.avatar || '');
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name) {
      alert('Name is required.');
      return;
    }

    try {
      setSaving(true);
      await updateProfile({
        name,
        phone,
        city,
        state,
        zip,
        address,
        avatar
      });
      alert('Profile updated successfully!');
      setActiveTab('dashboard');
    } catch (err) {
      alert('Failed to update profile: ' + err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 font-sans">
      {/* Heading & Breadcrumbs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-slate-100">
        <div>
          <h1 className="text-xl lg:text-2xl font-bold tracking-tight text-slate-900">Edit Profile</h1>
          <div className="flex items-center space-x-2 text-xs text-slate-400 mt-2">
            <Home size={14} className="text-slate-400 cursor-pointer hover:text-blue-600" onClick={() => navigate('/')} />
            <span>&gt;</span>
            <span className="text-slate-500 font-semibold">Edit Profile</span>
          </div>
        </div>
      </div>

      {/* Form Container */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-premium p-6">
        <h3 className="text-sm font-bold text-slate-800 pb-4 border-b border-slate-50 mb-6">Profile Settings</h3>

        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-6 text-xs font-bold text-slate-700">
          
          {/* Avatar Block */}
          <div className="flex flex-col space-y-2">
            <label>Avatar Picture</label>
            <div className="flex items-center space-x-4">
              <div className="border border-slate-200 rounded-full w-24 h-24 overflow-hidden bg-slate-50 flex items-center justify-center relative shrink-0">
                {avatar ? (
                  <img src={avatar} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  <ImageIcon size={32} className="text-slate-350" />
                )}
                {uploading && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-[9px] font-bold">
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
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold text-xs rounded-xl transition shadow-sm flex items-center gap-1.5"
                >
                  <Camera size={14} />
                  <span>{uploading ? 'Uploading...' : 'Choose Photo'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Name & Email (Disabled) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col space-y-1.5">
              <label>Name*</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter Full Name"
                className="bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-medium text-slate-800 focus:outline-none w-full"
                required
              />
            </div>

            <div className="flex flex-col space-y-1.5">
              <label>Email Address (Locked)</label>
              <input
                type="email"
                value={user?.email || ''}
                className="bg-slate-50 border border-slate-200 text-slate-400 rounded-xl px-3 py-2.5 text-xs font-medium focus:outline-none w-full cursor-not-allowed"
                disabled
              />
            </div>
          </div>

          {/* Phone & Address */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col space-y-1.5">
              <label>Phone Number</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter Phone Number"
                className="bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-medium text-slate-800 focus:outline-none w-full"
              />
            </div>

            <div className="flex flex-col space-y-1.5">
              <label>Street Address</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter Street Address"
                className="bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-medium text-slate-800 focus:outline-none w-full"
              />
            </div>
          </div>

          {/* City, State & Zip */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col space-y-1.5">
              <label>City</label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter City"
                className="bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-medium text-slate-800 focus:outline-none w-full"
              />
            </div>

            <div className="flex flex-col space-y-1.5">
              <label>State</label>
              <input
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
                placeholder="Enter State"
                className="bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-medium text-slate-800 focus:outline-none w-full"
              />
            </div>

            <div className="flex flex-col space-y-1.5">
              <label>Zip Code</label>
              <input
                type="text"
                value={zip}
                onChange={(e) => setZip(e.target.value)}
                placeholder="Enter Zip Code"
                className="bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-medium text-slate-800 focus:outline-none w-full"
              />
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-center pt-4">
            <button
              type="submit"
              disabled={saving}
              className="px-8 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold transition active:scale-95 shadow-md shadow-emerald-500/10 disabled:opacity-50"
            >
              {saving ? 'Saving...' : 'Save Profile Details'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
