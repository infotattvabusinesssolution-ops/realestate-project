import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, Plus, ChevronDown } from 'lucide-react';
import { getSpecsCitiesAPI, getSpecsCountriesAPI, getSpecsStatesAPI, createSpecsCityAPI, updateSpecsCityStatusAPI } from '../../api/api';

export default function PropertySpecsCitiesTab({ setActiveTab }) {
  const navigate = useNavigate();
  const [cities, setCities] = useState([]);
  const [countries, setCountries] = useState([]);
  const [allStates, setAllStates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [featuredDropdownId, setFeaturedDropdownId] = useState(null);
  const [statusDropdownId, setStatusDropdownId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalForm, setModalForm] = useState({
    country: '',
    state: '',
    name: '',
    featured: 'No',
    status: 'Active',
    serial: ''
  });

  const fetchCities = async () => {
    try {
      setLoading(true);
      const res = await getSpecsCitiesAPI();
      const normalized = res.data.map(c => ({
        id: c._id,
        country: c.country ? c.country.name : 'Unknown',
        state: c.state ? c.state.name : '-',
        city: c.name,
        featured: c.status === 'Active' ? 'Yes' : 'No', // For demo mapping
        status: c.status,
        serial: c.serial
      }));
      setCities(normalized);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching specs cities:', err);
      setLoading(false);
    }
  };

  const fetchCountriesAndStates = async () => {
    try {
      const countryRes = await getSpecsCountriesAPI();
      setCountries(countryRes.data);
      const stateRes = await getSpecsStatesAPI();
      setAllStates(stateRes.data);
    } catch (err) {
      console.error('Error fetching specs data:', err);
    }
  };

  useEffect(() => {
    fetchCities();
    fetchCountriesAndStates();
  }, []);

  const filtered = useMemo(() => {
    if (!search) return cities;
    const q = search.toLowerCase();
    return cities.filter(c =>
      c.city.toLowerCase().includes(q) ||
      c.state.toLowerCase().includes(q) ||
      c.country.toLowerCase().includes(q)
    );
  }, [search, cities]);

  const handleSaveCity = async (e) => {
    e.preventDefault();
    if (!modalForm.country || !modalForm.state || !modalForm.name || !modalForm.serial) {
      alert('Please fill in all required fields.');
      return;
    }

    try {
      const res = await createSpecsCityAPI({
        country: modalForm.country,
        state: modalForm.state,
        name: modalForm.name,
        status: modalForm.status,
        serial: Number(modalForm.serial)
      });

      // Refetch cities list to load newly created city populated references
      await fetchCities();

      setModalForm({
        country: '',
        state: '',
        name: '',
        featured: 'No',
        status: 'Active',
        serial: ''
      });
      setIsModalOpen(false);
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to save new city.');
    }
  };

  const handleFeaturedToggle = (id, val) => {
    setCities(cities.map(c => c.id === id ? { ...c, featured: val } : c));
    setFeaturedDropdownId(null);
  };

  const handleStatusToggle = async (id, val) => {
    try {
      await updateSpecsCityStatusAPI(id, { status: val });
      setCities(cities.map(c => c.id === id ? { ...c, status: val } : c));
      setStatusDropdownId(null);
    } catch (err) {
      alert('Failed to change city status');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-20 bg-white rounded-2xl border border-slate-100 shadow-premium">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Heading & Breadcrumbs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-slate-100">
        <div>
          <h1 className="text-xl lg:text-2xl font-bold tracking-tight text-slate-900">Cities</h1>
          <div className="flex items-center space-x-2 text-xs text-slate-400 mt-2">
            <Home size={14} className="text-slate-400 cursor-pointer hover:text-blue-600" onClick={() => navigate('/')} />
            <span>&gt;</span>
            <span className="hover:text-blue-600 cursor-pointer" onClick={() => setActiveTab('dashboard')}>Property Specifications</span>
            <span>&gt;</span>
            <span className="text-slate-500 font-semibold">Cities</span>
          </div>
        </div>
      </div>

      {/* Main Panel Box */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-premium p-6">
        
        {/* Header elements */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center space-x-4">
            <h3 className="text-sm font-bold text-slate-800">Cities</h3>
            <select className="bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-200 transition font-medium">
              <option value="English">English</option>
            </select>
          </div>

          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition active:scale-95 shadow-md shadow-blue-500/10"
          >
            <Plus size={14} />
            <span>Add</span>
          </button>
        </div>

        {/* Filters Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 text-xs text-slate-500">
          <div className="flex items-center space-x-2">
            <span>Show</span>
            <select className="bg-white border border-slate-200 rounded-lg px-2 py-1 text-xs focus:outline-none">
              <option value="10">10</option>
            </select>
            <span>entries</span>
          </div>

          <div className="flex items-center space-x-2">
            <span>Search:</span>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-white border border-slate-200 rounded-lg px-3 py-1 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-200 transition-all w-48"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 font-bold bg-slate-50/50">
                <th className="p-3 w-10">
                  <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500" />
                </th>
                <th className="p-3">Country Name</th>
                <th className="p-3">State Name</th>
                <th className="p-3">City Name</th>
                <th className="p-3">Featured</th>
                <th className="p-3">Status</th>
                <th className="p-3">Serial Number</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/50 transition">
                  <td className="p-3">
                    <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500" />
                  </td>
                  <td className="p-3 font-semibold text-slate-500">{item.country}</td>
                  <td className="p-3 font-semibold text-slate-500">{item.state}</td>
                  <td className="p-3 font-bold text-slate-800">{item.city}</td>
                  
                  {/* Featured Toggle Dropdown */}
                  <td className="p-3 relative">
                    <button
                      onClick={() => setFeaturedDropdownId(featuredDropdownId === item.id ? null : item.id)}
                      className={`inline-flex items-center space-x-1 px-3 py-1 rounded font-bold text-[10px] transition ${
                        item.featured === 'Yes'
                          ? 'bg-emerald-500 hover:bg-emerald-600 text-white'
                          : 'bg-red-500 hover:bg-red-600 text-white'
                      }`}
                    >
                      <span>{item.featured}</span>
                      <ChevronDown size={10} />
                    </button>
                    {featuredDropdownId === item.id && (
                      <div className="absolute left-3 mt-1 z-30 bg-white border border-slate-100 rounded-lg shadow-lg py-1 w-24 text-[10px] font-bold text-slate-700 animate-in fade-in duration-200">
                        <button
                          onClick={() => handleFeaturedToggle(item.id, 'Yes')}
                          className="w-full text-left px-3 py-1.5 hover:bg-emerald-50 hover:text-emerald-600"
                        >
                          Yes
                        </button>
                        <button
                          onClick={() => handleFeaturedToggle(item.id, 'No')}
                          className="w-full text-left px-3 py-1.5 hover:bg-red-50 hover:text-red-600"
                        >
                          No
                        </button>
                      </div>
                    )}
                  </td>

                  {/* Status Toggle Dropdown */}
                  <td className="p-3 relative">
                    <button
                      onClick={() => setStatusDropdownId(statusDropdownId === item.id ? null : item.id)}
                      className={`inline-flex items-center space-x-1 px-3 py-1 rounded font-bold text-[10px] transition ${
                        item.status === 'Active'
                          ? 'bg-emerald-500 hover:bg-emerald-600 text-white'
                          : 'bg-red-500 hover:bg-red-600 text-white'
                      }`}
                    >
                      <span>{item.status}</span>
                      <ChevronDown size={10} />
                    </button>
                    {statusDropdownId === item.id && (
                      <div className="absolute left-3 mt-1 z-30 bg-white border border-slate-100 rounded-lg shadow-lg py-1 w-24 text-[10px] font-bold text-slate-700 animate-in fade-in duration-200">
                        <button
                          onClick={() => handleStatusToggle(item.id, 'Active')}
                          className="w-full text-left px-3 py-1.5 hover:bg-emerald-50 hover:text-emerald-600"
                        >
                          Active
                        </button>
                        <button
                          onClick={() => handleStatusToggle(item.id, 'Deactive')}
                          className="w-full text-left px-3 py-1.5 hover:bg-red-50 hover:text-red-600"
                        >
                          Deactive
                        </button>
                      </div>
                    )}
                  </td>

                  <td className="p-3 font-semibold text-slate-700">{item.serial}</td>
                  <td className="p-3 text-right">
                    <button className="inline-flex items-center space-x-1.5 px-3 py-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded text-[10px] font-bold transition">
                      <span>Select</span>
                      <ChevronDown size={8} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-6 text-xs text-slate-500 font-medium">
          <span>Showing 1 to {filtered.length} of {cities.length} entries</span>
          <div className="flex items-center space-x-1.5">
            <button className="px-3 py-1 bg-slate-100 hover:bg-slate-200 rounded text-slate-700 transition">Previous</button>
            <button className="px-3 py-1 bg-blue-600 text-white rounded font-bold">1</button>
            <button className="px-3 py-1 bg-slate-100 hover:bg-slate-200 rounded text-slate-700 transition">Next</button>
          </div>
        </div>

      </div>

      {/* Add City Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <h2 className="text-sm font-bold text-slate-800">Add City</h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-655 transition p-1.5 hover:bg-slate-50 rounded-lg text-lg leading-none"
              >
                &times;
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSaveCity} className="flex-1 overflow-y-auto p-6 space-y-4 text-xs font-bold text-slate-600 text-left">
              {/* Country Select */}
              <div className="flex flex-col space-y-1.5">
                <label className="text-slate-600">Country*</label>
                <select 
                  required
                  value={modalForm.country}
                  onChange={(e) => setModalForm(prev => ({ ...prev, country: e.target.value, state: '' }))}
                  className="bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500 w-full font-medium"
                >
                  <option value="">Select a Country</option>
                  {countries.map(c => (
                    <option key={c._id} value={c._id}>{c.name}</option>
                  ))}
                </select>
              </div>

              {/* State Select */}
              <div className="flex flex-col space-y-1.5">
                <label className="text-slate-600">State*</label>
                <select 
                  required
                  disabled={!modalForm.country}
                  value={modalForm.state}
                  onChange={(e) => setModalForm(prev => ({ ...prev, state: e.target.value }))}
                  className="bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500 w-full font-medium disabled:bg-slate-50 disabled:cursor-not-allowed"
                >
                  <option value="">Select a State</option>
                  {allStates
                    .filter(s => s.country && (s.country._id === modalForm.country || s.country === modalForm.country))
                    .map(s => (
                      <option key={s._id} value={s._id}>{s.name}</option>
                    ))}
                </select>
              </div>

              {/* City Name */}
              <div className="flex flex-col space-y-1.5">
                <label className="text-slate-600">City Name*</label>
                <input 
                  required
                  type="text"
                  value={modalForm.name}
                  onChange={(e) => setModalForm(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter city name"
                  className="bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-850 focus:outline-none focus:ring-1 focus:ring-blue-500 w-full font-medium"
                />
              </div>

              {/* Featured */}
              <div className="flex flex-col space-y-1.5">
                <label className="text-slate-600">Featured*</label>
                <select 
                  required
                  value={modalForm.featured}
                  onChange={(e) => setModalForm(prev => ({ ...prev, featured: e.target.value }))}
                  className="bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500 w-full font-medium"
                >
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>

              {/* Status */}
              <div className="flex flex-col space-y-1.5">
                <label className="text-slate-600">Status*</label>
                <select 
                  required
                  value={modalForm.status}
                  onChange={(e) => setModalForm(prev => ({ ...prev, status: e.target.value }))}
                  className="bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500 w-full font-medium"
                >
                  <option value="Active">Active</option>
                  <option value="Deactive">Deactive</option>
                </select>
              </div>

              {/* Serial Number */}
              <div className="flex flex-col space-y-1.5">
                <label className="text-slate-600">Serial Number*</label>
                <input 
                  required
                  type="number"
                  value={modalForm.serial}
                  onChange={(e) => setModalForm(prev => ({ ...prev, serial: e.target.value }))}
                  placeholder="Enter Serial Number"
                  className="bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-850 focus:outline-none focus:ring-1 focus:ring-blue-500 w-full font-medium"
                />
                <span className="text-[10px] text-orange-500 font-bold leading-normal">
                  The higher the serial number is, the later the city will be shown.
                </span>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-end space-x-2.5">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-bold rounded-xl transition"
                >
                  Close
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-bold rounded-xl transition shadow-md shadow-blue-500/10"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
