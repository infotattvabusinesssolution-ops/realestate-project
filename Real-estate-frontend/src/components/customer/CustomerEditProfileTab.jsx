import React, { useState, useEffect } from 'react';
import { fetchCountriesAPI, fetchStatesAPI, fetchCitiesAPI } from '../../api/api';

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

  const [countriesList, setCountriesList] = useState([]);
  const [statesList, setStatesList] = useState([]);
  const [citiesList, setCitiesList] = useState([]);
  const [countriesLoading, setCountriesLoading] = useState(false);
  const [statesLoading, setStatesLoading] = useState(false);
  const [citiesLoading, setCitiesLoading] = useState(false);

  useEffect(() => {
    const loadCountries = async () => {
      try {
        setCountriesLoading(true);
        const data = await fetchCountriesAPI();
        setCountriesList(data);
      } catch (err) {
        console.error('Failed to load countries:', err);
      } finally {
        setCountriesLoading(false);
      }
    };
    loadCountries();
  }, []);

  useEffect(() => {
    const loadStates = async () => {
      if (!country) {
        setStatesList([]);
        return;
      }
      try {
        setStatesLoading(true);
        const data = await fetchStatesAPI(country);
        setStatesList(data);
      } catch (err) {
        console.error('Failed to load states:', err);
      } finally {
        setStatesLoading(false);
      }
    };
    loadStates();
  }, [country]);

  useEffect(() => {
    const loadCities = async () => {
      if (!country || !stateName) {
        setCitiesList([]);
        return;
      }
      try {
        setCitiesLoading(true);
        const data = await fetchCitiesAPI(country, stateName);
        setCitiesList(data);
      } catch (err) {
        console.error('Failed to load cities:', err);
      } finally {
        setCitiesLoading(false);
      }
    };
    loadCities();
  }, [country, stateName]);

  const handleCountryChange = (val) => {
    setCountry(val);
    setStateName('');
    setCity('');
  };

  const handleStateChange = (val) => {
    setStateName(val);
    setCity('');
  };

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
              <select 
                value={country} 
                onChange={(e) => handleCountryChange(e.target.value)} 
                className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-850 focus:outline-none focus:ring-1 focus:ring-orange-500/50 w-full"
              >
                <option value="">{countriesLoading ? 'Loading countries...' : 'Select Country'}</option>
                {countriesList.map((c, idx) => (
                  <option key={idx} value={c.name}>{c.name}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-col space-y-1.5">
              <label className="text-slate-655 font-extrabold">State</label>
              <select 
                value={stateName} 
                onChange={(e) => handleStateChange(e.target.value)} 
                disabled={!country || statesLoading}
                className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none w-full disabled:opacity-50"
              >
                <option value="">{statesLoading ? 'Loading states...' : 'Select State'}</option>
                {statesList.map((s, idx) => (
                  <option key={idx} value={s.name}>{s.name}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-col space-y-1.5">
              <label className="text-slate-655 font-extrabold">City</label>
              <select 
                value={city} 
                onChange={(e) => setCity(e.target.value)} 
                disabled={!stateName || citiesLoading}
                className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-850 focus:outline-none focus:ring-1 focus:ring-orange-500/50 w-full disabled:opacity-50"
              >
                <option value="">{citiesLoading ? 'Loading cities...' : 'Select City'}</option>
                {citiesList.map((c, idx) => (
                  <option key={idx} value={c}>{c}</option>
                ))}
              </select>
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
