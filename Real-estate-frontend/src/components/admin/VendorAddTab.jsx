import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, Image as ImageIcon, Loader2 } from 'lucide-react';
import { createAdminUserAPI } from '../../api/api';
import { useToast } from '../../context/ToastContext';

export default function VendorAddTab({ setActiveTab }) {
  const navigate = useNavigate();
  const toast = useToast();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  
  const [showEmail, setShowEmail] = useState(false);
  const [showPhone, setShowPhone] = useState(false);
  const [showContact, setShowContact] = useState(false);

  const [name, setName] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [address, setAddress] = useState('');
  const [details, setDetails] = useState('');
  const [cloneLang, setCloneLang] = useState(false);
  const [avatar, setAvatar] = useState('');
  const [saving, setSaving] = useState(false);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setAvatar(reader.result);
    reader.readAsDataURL(file);
  };

  const validateEmail = (emailVal) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!username.trim()) {
      toast.error('Username is required');
      return;
    }
    if (!password) {
      toast.error('Password is required');
      return;
    }
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }
    if (!email.trim()) {
      toast.error('Email is required');
      return;
    }
    if (!validateEmail(email.trim())) {
      toast.error('Please enter a valid email address');
      return;
    }
    if (!name.trim()) {
      toast.error('Name is required');
      return;
    }

    setSaving(true);
    try {
      const payload = {
        name: name.trim(),
        username: username.trim(),
        email: email.trim(),
        password,
        role: 'vendor',
        phone: phone.trim(),
        city: city.trim(),
        state: state.trim(),
        zip: zipCode.trim(),
        address: address.trim(),
        avatar: avatar || undefined,
        specialization: details.trim() || 'General',
        status: 'Active',
      };
      await createAdminUserAPI(payload);
      toast.success('Vendor added successfully!');
      setActiveTab('vendor-list');
    } catch (err) {
      toast.error('Failed to add vendor: ' + (err.response?.data?.message || err.message));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Heading & Breadcrumbs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-slate-100">
        <div>
          <h1 className="text-xl lg:text-2xl font-bold tracking-tight text-slate-900">Add Vendor</h1>
          <div className="flex items-center space-x-2 text-xs text-slate-400 mt-2">
            <Home size={14} className="text-slate-400 cursor-pointer hover:text-blue-600" onClick={() => navigate('/')} />
            <span>&gt;</span>
            <span className="hover:text-blue-600 cursor-pointer" onClick={() => setActiveTab('dashboard')}>Vendor Management</span>
            <span>&gt;</span>
            <span className="text-slate-500 font-semibold">Add Vendor</span>
          </div>
        </div>
      </div>

      {/* Main Panel Box */}
      <form onSubmit={handleUpdate} className="bg-white rounded-2xl border border-slate-100 shadow-premium p-6 space-y-8">
        <h3 className="text-sm font-bold text-slate-800">Add Vendor</h3>

        {/* Photo Upload Area */}
        <div className="flex flex-col space-y-2">
          <label className="text-xs font-bold text-slate-700">Photo</label>
          <div className="border border-slate-200 rounded-2xl p-2 flex flex-col items-center justify-center text-center w-36 aspect-square bg-slate-50/30 overflow-hidden">
            {avatar ? (
              <img src={avatar} alt="Preview" className="w-full h-full object-cover rounded-xl" />
            ) : (
              <>
                <ImageIcon size={28} className="text-slate-300 mb-2" />
                <span className="text-[10px] text-slate-450 font-bold uppercase tracking-wider">No Image Found</span>
              </>
            )}
          </div>
          <label className="px-4 py-2 bg-blue-600 text-white font-bold text-xs rounded-xl hover:bg-blue-700 transition cursor-pointer text-center w-36">
            Choose Photo
            <input type="file" accept="image/*" className="hidden" onChange={handlePhotoChange} />
          </label>
        </div>

        {/* Base Fields */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-xs font-bold text-slate-700">
          <div className="flex flex-col space-y-1.5">
            <label>Username*</label>
            <input 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-200"
              required 
            />
          </div>

          <div className="flex flex-col space-y-1.5">
            <label>Password *</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none"
              required 
            />
          </div>

          <div className="flex flex-col space-y-1.5">
            <label>Email *</label>
            <input 
              type="email" 
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 placeholder-slate-450 focus:outline-none"
              required 
            />
          </div>

          <div className="flex flex-col space-y-1.5">
            <label>Phone</label>
            <input 
              type="text" 
              placeholder="Enter Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 placeholder-slate-455 focus:outline-none"
            />
          </div>
        </div>

        {/* Display Checkboxes */}
        <div className="flex flex-wrap items-center gap-6 text-[11px] font-bold text-slate-500">
          <div className="flex items-center space-x-2">
            <input 
              type="checkbox" 
              id="show-email" 
              checked={showEmail} 
              onChange={(e) => setShowEmail(e.target.checked)}
              className="rounded text-blue-650 focus:ring-blue-500" 
            />
            <label htmlFor="show-email" className="cursor-pointer">Show Email Address in Profile Page</label>
          </div>

          <div className="flex items-center space-x-2">
            <input 
              type="checkbox" 
              id="show-phone" 
              checked={showPhone} 
              onChange={(e) => setShowPhone(e.target.checked)}
              className="rounded text-blue-650 focus:ring-blue-500" 
            />
            <label htmlFor="show-phone" className="cursor-pointer">Show Phone Number in Profile Page</label>
          </div>

          <div className="flex items-center space-x-2">
            <input 
              type="checkbox" 
              id="show-contact" 
              checked={showContact} 
              onChange={(e) => setShowContact(e.target.checked)}
              className="rounded text-blue-650 focus:ring-blue-500" 
            />
            <label htmlFor="show-contact" className="cursor-pointer">Show Contact Form</label>
          </div>
        </div>

        {/* English Language (Default) */}
        <div className="border border-slate-100 rounded-2xl overflow-hidden shadow-sm">
          <div className="bg-indigo-600/90 text-white text-xs font-bold px-4 py-3">
            English Language (Default)
          </div>
          <div className="p-6 space-y-6 text-xs font-bold text-slate-700">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col space-y-1.5">
                <label>Name*</label>
                <input 
                  type="text" 
                  placeholder="Enter Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none"
                  required 
                />
              </div>

              <div className="flex flex-col space-y-1.5">
                <label>Country</label>
                <input 
                  type="text" 
                  placeholder="Enter Country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none"
                />
              </div>

              <div className="flex flex-col space-y-1.5">
                <label>City</label>
                <input 
                  type="text" 
                  placeholder="Enter City"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none"
                />
              </div>

              <div className="flex flex-col space-y-1.5">
                <label>State</label>
                <input 
                  type="text" 
                  placeholder="Enter State"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none"
                />
              </div>

              <div className="flex flex-col space-y-1.5">
                <label>Zip Code</label>
                <input 
                  type="text" 
                  placeholder="Enter Zip Code"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col space-y-1.5">
                <label>Address</label>
                <textarea 
                  rows={4} 
                  placeholder="Enter Address" 
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none resize-none"
                />
              </div>

              <div className="flex flex-col space-y-1.5">
                <label>Details</label>
                <textarea 
                  rows={4} 
                  placeholder="Enter Details" 
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none resize-none"
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <input 
                type="checkbox" 
                id="clone-vendor-ar" 
                checked={cloneLang} 
                onChange={(e) => setCloneLang(e.target.checked)}
                className="rounded text-blue-600 focus:ring-blue-500" 
              />
              <label htmlFor="clone-vendor-ar" className="text-slate-500 font-semibold cursor-pointer">Clone for عربي language</label>
            </div>
          </div>
        </div>

        {/* عربي Language Box */}
        <div className="border border-slate-100 rounded-xl overflow-hidden">
          <div className="bg-white hover:bg-slate-50 border-b border-slate-100 text-blue-600 text-xs font-bold px-4 py-3 cursor-pointer">
            عربي Language
          </div>
        </div>

        {/* Action Button */}
        <div className="flex justify-center pt-4">
          <button
            type="submit"
            disabled={saving}
            className="px-8 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold transition active:scale-95 shadow-md shadow-emerald-500/10 disabled:opacity-50 flex items-center space-x-2"
          >
            {saving && <Loader2 size={14} className="animate-spin" />}
            <span>{saving ? 'Updating...' : 'Update'}</span>
          </button>
        </div>

      </form>
    </div>
  );
}
