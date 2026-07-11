import React, { useState } from 'react';

export default function CustomerEditProfileTab({ user = {}, onUpdateUser }) {
  const [name, setName] = useState(user.name || 'Test User new');
  const [username, setUsername] = useState(user.username || 'user');
  const [email, setEmail] = useState(user.email || 'test@kreativdev.com');
  const [phone, setPhone] = useState(user.phone || '12345678');
  
  const [country, setCountry] = useState(user.country || 'United States');
  const [city, setCity] = useState(user.city || 'Toronto');
  const [stateName, setStateName] = useState(user.state || 'California');
  const [zip, setZip] = useState(user.zip || '75846');
  const [address, setAddress] = useState(user.address || '123 Queen Street West');

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateUser({
      name, username, email, phone, country, state: stateName, city, zip, address
    });
    alert('Profile updated successfully!');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Card wrapper */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-premium p-8">
        
        {/* Card Header Title */}
        <div className="pb-4 border-b border-slate-100 mb-6">
          <h3 className="text-xs font-bold text-slate-800 tracking-wide uppercase">Edit Profile</h3>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 text-xs font-bold text-slate-700">
          
          {/* Avatar Area */}
          <div className="flex flex-col items-start space-y-2 mb-4">
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-slate-200">
              <img 
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80" 
                alt="Avatar" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Inputs Grid matching mockup columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="flex flex-col space-y-1.5">
              <label className="text-slate-655 font-extrabold">Name*</label>
              <input 
                type="text" 
                required 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-850 focus:outline-none focus:ring-1 focus:ring-orange-500/50" 
              />
            </div>

            <div className="flex flex-col space-y-1.5">
              <label className="text-slate-655 font-extrabold">Username*</label>
              <input 
                type="text" 
                required 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-850 focus:outline-none focus:ring-1 focus:ring-orange-500/50" 
              />
            </div>

            <div className="flex flex-col space-y-1.5">
              <label className="text-slate-655 font-extrabold">Email*</label>
              <input 
                type="email" 
                required 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-855 focus:outline-none focus:ring-1 focus:ring-orange-500/50" 
              />
            </div>

            <div className="flex flex-col space-y-1.5">
              <label className="text-slate-655 font-extrabold">Phone</label>
              <input 
                type="text" 
                value={phone} 
                onChange={(e) => setPhone(e.target.value)} 
                className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-850 focus:outline-none focus:ring-1 focus:ring-orange-500/50" 
              />
            </div>

            <div className="flex flex-col space-y-1.5">
              <label className="text-slate-655 font-extrabold">Country</label>
              <input 
                type="text" 
                value={country} 
                onChange={(e) => setCountry(e.target.value)} 
                className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-850 focus:outline-none focus:ring-1 focus:ring-orange-500/50" 
              />
            </div>

            <div className="flex flex-col space-y-1.5">
              <label className="text-slate-655 font-extrabold">City</label>
              <input 
                type="text" 
                value={city} 
                onChange={(e) => setCity(e.target.value)} 
                className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-850 focus:outline-none focus:ring-1 focus:ring-orange-500/50" 
              />
            </div>

            <div className="flex flex-col space-y-1.5">
              <label className="text-slate-655 font-extrabold">State</label>
              <input 
                type="text" 
                value={stateName} 
                onChange={(e) => setStateName(e.target.value)} 
                className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none" 
              />
            </div>

            <div className="flex flex-col space-y-1.5">
              <label className="text-slate-655 font-extrabold">Zip Code</label>
              <input 
                type="text" 
                value={zip} 
                onChange={(e) => setZip(e.target.value)} 
                className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-850 focus:outline-none focus:ring-1 focus:ring-orange-500/50" 
              />
            </div>

            <div className="flex flex-col space-y-1.5 md:col-span-2">
              <label className="text-slate-655 font-extrabold">Address</label>
              <textarea 
                value={address} 
                onChange={(e) => setAddress(e.target.value)} 
                rows="4"
                className="bg-white border border-slate-200 rounded-xl p-3 text-xs font-medium text-slate-850 focus:outline-none focus:ring-1 focus:ring-orange-500/50 w-full" 
              />
            </div>

          </div>

          {/* Submit button */}
          <div className="pt-4">
            <button 
              type="submit" 
              className="px-6 py-2.5 bg-[#f97316] hover:bg-orange-600 text-white rounded-xl font-bold text-xs transition active:scale-95 shadow-md shadow-orange-500/10"
            >
              Update profile
            </button>
          </div>

        </form>

      </div>

    </div>
  );
}
