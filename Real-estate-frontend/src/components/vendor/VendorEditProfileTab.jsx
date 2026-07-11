import React, { useState } from 'react';
import { Home, ChevronDown } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export function VendorEditProfileTab() {
  const { user, updateProfile } = useAuth();
  
  const [username, setUsername] = useState(user?.email || 'oscar_eade');
  const [email, setEmail] = useState(user?.email || 'oscar@estacy.com');
  const [phone, setPhone] = useState(user?.phone || '+535465462546');
  
  const [showEmail, setShowEmail] = useState(true);
  const [showPhone, setShowPhone] = useState(true);
  const [showContactForm, setShowContactForm] = useState(true);

  // English details states
  const [name, setName] = useState(user?.name || 'Oscar Eade');
  const [country, setCountry] = useState('USA');
  const [city, setCity] = useState(user?.city || 'San Antonio');
  const [stateName, setStateName] = useState(user?.state || 'Texas');
  const [zip, setZip] = useState(user?.zip || '');
  const [address, setAddress] = useState(user?.address || '123 Alamo Plaza San Antonio, TX 78205');
  const [details, setDetails] = useState(
    user?.specialization || "Residential Construction"
  );

  const [arabicExpanded, setArabicExpanded] = useState(false);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateProfile({
        name,
        phone,
        city,
        state: stateName,
        zip,
        address,
        specialization: details
      });
      alert('Profile updated successfully!');
    } catch (err) {
      alert(err || 'Failed to update profile.');
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
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
            <h4 className="text-xs font-black text-slate-850 border-b border-slate-100 pb-2">Details</h4>
            
            {/* Photo Uploader */}
            <div className="space-y-3">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Photo</span>
              <div className="flex items-center space-x-4">
                <img 
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80" 
                  alt="Oscar Eade" 
                  className="w-32 h-32 rounded-xl object-cover border border-slate-150 shadow-sm"
                />
                <button type="button" className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded font-bold text-[10px] transition active:scale-95">
                  Choose Photo
                </button>
              </div>
            </div>

            {/* Inputs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              <div className="flex flex-col space-y-1.5">
                <label>Username*</label>
                <input 
                  type="text" 
                  required 
                  value={username} 
                  onChange={(e) => setUsername(e.target.value)} 
                  className="bg-slate-50/50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none" 
                />
              </div>

              <div className="flex flex-col space-y-1.5">
                <label>Email*</label>
                <input 
                  type="email" 
                  required 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  className="bg-slate-50/50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none" 
                />
              </div>

              <div className="flex flex-col space-y-1.5">
                <label>Phone</label>
                <input 
                  type="text" 
                  value={phone} 
                  onChange={(e) => setPhone(e.target.value)} 
                  className="bg-slate-50/50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none" 
                />
              </div>

            </div>

            {/* Checkboxes Row */}
            <div className="flex flex-wrap gap-6 pt-2">
              
              <label className="flex items-center space-x-2 text-slate-700 select-none cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={showEmail} 
                  onChange={(e) => setShowEmail(e.target.checked)} 
                  className="w-4 h-4 rounded text-blue-600 border-slate-300 focus:ring-blue-500" 
                />
                <span>Show Email Address</span>
              </label>

              <label className="flex items-center space-x-2 text-slate-700 select-none cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={showPhone} 
                  onChange={(e) => setShowPhone(e.target.checked)} 
                  className="w-4 h-4 rounded text-blue-600 border-slate-300 focus:ring-blue-500" 
                />
                <span>Show Phone Number</span>
              </label>

              <label className="flex items-center space-x-2 text-slate-700 select-none cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={showContactForm} 
                  onChange={(e) => setShowContactForm(e.target.checked)} 
                  className="w-4 h-4 rounded text-blue-600 border-slate-300 focus:ring-blue-500" 
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
                  <label>Country</label>
                  <input 
                    type="text" 
                    value={country} 
                    onChange={(e) => setCountry(e.target.value)} 
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

              </div>

              <div className="flex flex-col space-y-1.5 col-span-2">
                <label>Zip Code</label>
                <input 
                  type="text" 
                  value={zip} 
                  onChange={(e) => setZip(e.target.value)} 
                  placeholder="Enter Zip Code" 
                  className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none w-full md:w-1/2" 
                />
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
                <label>Details</label>
                <textarea 
                  value={details} 
                  onChange={(e) => setDetails(e.target.value)} 
                  rows="8"
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

          {/* Centered green submit button */}
          <div className="flex justify-center pt-4">
            <button 
              type="submit" 
              className="px-8 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-bold text-xs transition active:scale-95 shadow-md shadow-emerald-500/10"
            >
              Update
            </button>
          </div>

        </form>

      </div>

    </div>
  );
}
