import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, Plus, ChevronDown } from 'lucide-react';
import axiosInstance from '../../api/axiosInstance';

export default function PropertySpecsStatesTab({ setActiveTab }) {
  const navigate = useNavigate();
  const [states, setStates] = useState([]);
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalForm, setModalForm] = useState({
    country: '',
    name: '',
    status: 'Active',
    serial: ''
  });

  const fetchStates = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get('/specs/states');
      const normalized = res.data.map(s => ({
        id: s._id,
        country: s.country ? s.country.name : 'Unknown',
        stateName: s.name
      }));
      setStates(normalized);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching specs states:', err);
      setLoading(false);
    }
  };

  const fetchCountries = async () => {
    try {
      const res = await axiosInstance.get('/specs/countries');
      setCountries(res.data);
    } catch (err) {
      console.error('Error fetching countries:', err);
    }
  };

  useEffect(() => {
    fetchStates();
    fetchCountries();
  }, []);

  const filtered = states.filter(s =>
    s.stateName.toLowerCase().includes(search.toLowerCase()) ||
    s.country.toLowerCase().includes(search.toLowerCase())
  );

  const handleSaveState = async (e) => {
    e.preventDefault();
    if (!modalForm.country || !modalForm.name || !modalForm.serial) {
      alert('Please fill in all required fields.');
      return;
    }

    try {
      const res = await axiosInstance.post('/specs/states', {
        country: modalForm.country,
        name: modalForm.name,
        status: modalForm.status,
        serial: Number(modalForm.serial)
      });

      // Refetch states to populate with populated country object
      await fetchStates();

      setModalForm({
        country: '',
        name: '',
        status: 'Active',
        serial: ''
      });
      setIsModalOpen(false);
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to save new state.');
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
          <h1 className="text-xl lg:text-2xl font-bold tracking-tight text-slate-900">States</h1>
          <div className="flex items-center space-x-2 text-xs text-slate-400 mt-2">
            <Home size={14} className="text-slate-400 cursor-pointer hover:text-blue-600" onClick={() => navigate('/')} />
            <span>&gt;</span>
            <span className="hover:text-blue-600 cursor-pointer" onClick={() => setActiveTab('dashboard')}>Property Specifications</span>
            <span>&gt;</span>
            <span className="text-slate-500 font-semibold">States</span>
          </div>
        </div>
      </div>

      {/* Main Panel Box */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-premium p-6">
        
        {/* Header elements */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center space-x-4">
            <h3 className="text-sm font-bold text-slate-800">States</h3>
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
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filtered.map((state) => (
                <tr key={state.id} className="hover:bg-slate-50/50 transition">
                  <td className="p-3">
                    <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500" />
                  </td>
                  <td className="p-3 text-slate-600 font-medium">{state.country}</td>
                  <td className="p-3 font-bold text-slate-800">{state.stateName}</td>
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
          <span>Showing 1 to {filtered.length} of {states.length} entries</span>
          <div className="flex items-center space-x-1.5">
            <button className="px-3 py-1 bg-slate-100 hover:bg-slate-200 rounded text-slate-700 transition">Previous</button>
            <button className="px-3 py-1 bg-blue-600 text-white rounded font-bold">1</button>
            <button className="px-3 py-1 bg-slate-100 hover:bg-slate-200 rounded text-slate-700 transition">Next</button>
          </div>
        </div>

      </div>

      {/* Add State Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <h2 className="text-sm font-bold text-slate-800">Add State</h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-655 transition p-1.5 hover:bg-slate-50 rounded-lg text-lg leading-none"
              >
                &times;
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSaveState} className="flex-1 overflow-y-auto p-6 space-y-4 text-xs font-bold text-slate-600 text-left">
              {/* Country Select */}
              <div className="flex flex-col space-y-1.5">
                <label className="text-slate-600">Country*</label>
                <select 
                  required
                  value={modalForm.country}
                  onChange={(e) => setModalForm(prev => ({ ...prev, country: e.target.value }))}
                  className="bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500 w-full font-medium"
                >
                  <option value="">Select a Country</option>
                  {countries.map(c => (
                    <option key={c._id} value={c._id}>{c.name}</option>
                  ))}
                </select>
              </div>

              {/* State Name */}
              <div className="flex flex-col space-y-1.5">
                <label className="text-slate-600">State Name*</label>
                <input 
                  required
                  type="text"
                  value={modalForm.name}
                  onChange={(e) => setModalForm(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter state name"
                  className="bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-850 focus:outline-none focus:ring-1 focus:ring-blue-500 w-full font-medium"
                />
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
                  The higher the serial number is, the later the state will be shown.
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
