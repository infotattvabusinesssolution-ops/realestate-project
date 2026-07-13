import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, Image as ImageIcon, Loader2 } from 'lucide-react';
import axiosInstance from '../../api/axiosInstance';

export default function AddUserTab({ setActiveTab }) {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState('');
  const [saving, setSaving] = useState(false);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setAvatar(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        name,
        username,
        email,
        password,
        role: 'customer',
        phone,
        city,
        state,
        zip: zipCode,
        address,
        avatar: avatar || undefined,
        status: 'Active',
      };
      await axiosInstance.post('/admin/users', payload);
      alert('User added successfully!');
      setActiveTab('users-registered');
    } catch (err) {
      alert('Failed to add user: ' + (err.response?.data?.message || err.message));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Heading & Breadcrumbs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-slate-100">
        <div>
          <h1 className="text-xl lg:text-2xl font-bold tracking-tight text-slate-900">Add User</h1>
          <div className="flex items-center space-x-2 text-xs text-slate-400 mt-2">
            <Home size={14} className="text-slate-400 cursor-pointer hover:text-blue-600" onClick={() => navigate('/')} />
            <span>&gt;</span>
            <span className="hover:text-blue-600 cursor-pointer" onClick={() => setActiveTab('dashboard')}>Users Management</span>
            <span>&gt;</span>
            <span className="text-slate-500 font-semibold">Add User</span>
          </div>
        </div>
      </div>

      {/* Main Panel Box */}
      <form onSubmit={handleSave} className="bg-white rounded-2xl border border-slate-100 shadow-premium p-8 space-y-8">
        <h3 className="text-sm font-bold text-slate-800">Add User</h3>

        {/* Photo Upload Area */}
        <div className="flex flex-col space-y-2">
          <label className="text-xs font-bold text-slate-700">Photo*</label>
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
          <span className="text-[10px] text-amber-600 font-medium mt-1">Image Size 80x80</span>
        </div>

        {/* Form Fields Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs font-bold text-slate-700">
          <div className="flex flex-col space-y-1.5">
            <label>Name*</label>
            <input 
              type="text" 
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-200"
              required 
            />
          </div>

          <div className="flex flex-col space-y-1.5">
            <label>Username*</label>
            <input 
              type="text" 
              placeholder="Enter Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-200"
              required 
            />
          </div>

          <div className="flex flex-col space-y-1.5">
            <label>Email*</label>
            <input 
              type="email" 
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none"
              required 
            />
          </div>

          <div className="flex flex-col space-y-1.5">
            <label>Phone*</label>
            <input 
              type="text" 
              placeholder="Enter Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none"
              required 
            />
          </div>

          <div className="flex flex-col space-y-1.5">
            <label>Country *</label>
            <input 
              type="text" 
              placeholder="Enter Country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none"
              required 
            />
          </div>

          <div className="flex flex-col space-y-1.5">
            <label>City *</label>
            <input 
              type="text" 
              placeholder="Enter City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none"
              required 
            />
          </div>

          <div className="flex flex-col space-y-1.5">
            <label>State *</label>
            <input 
              type="text" 
              placeholder="Enter State"
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none"
              required 
            />
          </div>

          <div className="flex flex-col space-y-1.5">
            <label>Zip Code *</label>
            <input 
              type="text" 
              placeholder="Enter Zip Code"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none"
              required 
            />
          </div>

          <div className="flex flex-col space-y-1.5">
            <label>Address *</label>
            <input 
              type="text" 
              placeholder="Enter Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none"
              required 
            />
          </div>

          <div className="flex flex-col space-y-1.5 md:col-span-3">
            <label>Password</label>
            <input 
              type="password" 
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none max-w-sm"
              required 
            />
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
            <span>{saving ? 'Saving...' : 'Save'}</span>
          </button>
        </div>

      </form>
    </div>
  );
}
