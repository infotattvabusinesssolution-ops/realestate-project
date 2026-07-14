import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, Plus, ChevronDown, Search } from 'lucide-react';

import { getCategoriesAPI, createSpecsCategoryAPI, updateSpecsCategoryStatusAPI } from '../../api/api';

export default function PropertySpecsCategoriesTab({ setActiveTab }) {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalForm, setModalForm] = useState({
    type: '',
    name: '',
    nameAr: '',
    status: 'Active',
    serial: '',
    image: ''
  });

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const res = await getCategoriesAPI();
      const normalized = res.data.map(c => ({
        id: c._id,
        type: c.type,
        name: c.name,
        status: c.status,
        serial: c.serial
      }));
      setCategories(normalized);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching specs categories:', err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const filtered = categories.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.type.toLowerCase().includes(search.toLowerCase())
  );

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setModalForm(prev => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveCategory = async (e) => {
    e.preventDefault();
    if (!modalForm.type || !modalForm.name || !modalForm.serial) {
      alert('Please fill in all required fields.');
      return;
    }

    try {
      const res = await createSpecsCategoryAPI({
        type: modalForm.type,
        name: modalForm.name,
        nameAr: modalForm.nameAr,
        status: modalForm.status,
        serial: Number(modalForm.serial),
        image: modalForm.image || ''
      });

      const newCat = {
        id: res.data._id,
        type: res.data.type,
        name: res.data.name,
        nameAr: res.data.nameAr,
        status: res.data.status,
        serial: res.data.serial
      };

      setCategories(prev => [...prev, newCat]);
      
      setModalForm({
        type: '',
        name: '',
        nameAr: '',
        status: 'Active',
        serial: '',
        image: ''
      });
      setIsModalOpen(false);
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to save new category.');
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateSpecsCategoryStatusAPI(id, { status: newStatus });
      setCategories(prev => prev.map(c => c.id === id ? { ...c, status: newStatus } : c));
    } catch (err) {
      alert('Failed to change category status');
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
          <h1 className="text-xl lg:text-2xl font-bold tracking-tight text-slate-900">Categories</h1>
          <div className="flex items-center space-x-2 text-xs text-slate-400 mt-2">
            <Home size={14} className="text-slate-400 cursor-pointer hover:text-blue-600" onClick={() => navigate('/')} />
            <span>&gt;</span>
            <span className="hover:text-blue-600 cursor-pointer" onClick={() => setActiveTab('dashboard')}>Property Specifications</span>
            <span>&gt;</span>
            <span className="text-slate-500 font-semibold">Categories</span>
          </div>
        </div>
      </div>

      {/* Main Panel Box */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-premium p-6">
        
        {/* Header elements */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center space-x-4">
            <h3 className="text-sm font-bold text-slate-800">Property Categories</h3>
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
                <th className="p-3">Type</th>
                <th className="p-3">Name</th>
                <th className="p-3">Status</th>
                <th className="p-3">Serial Number</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filtered.map((cat) => (
                <tr key={cat.id} className="hover:bg-slate-50/50 transition">
                  <td className="p-3">
                    <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500" />
                  </td>
                  <td className="p-3 font-medium text-slate-700">{cat.type}</td>
                  <td className="p-3 font-bold text-blue-600">{cat.name}</td>
                  <td className="p-3">
                    <span className="inline-flex px-2 py-0.5 rounded-full font-bold text-[9px] bg-emerald-500 text-white uppercase">
                      {cat.status}
                    </span>
                  </td>
                  <td className="p-3 font-semibold text-slate-700">{cat.serial}</td>
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
          <span>Showing 1 to {filtered.length} of {categories.length} entries</span>
          <div className="flex items-center space-x-1.5">
            <button className="px-3 py-1 bg-slate-100 hover:bg-slate-200 rounded text-slate-700 transition">Previous</button>
            <button className="px-3 py-1 bg-blue-600 text-white rounded font-bold">1</button>
            <button className="px-3 py-1 bg-slate-100 hover:bg-slate-200 rounded text-slate-700 transition">Next</button>
          </div>
        </div>

      </div>

      {/* Add Property Category Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <h2 className="text-sm font-bold text-slate-800">Add Property Category</h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-655 transition p-1.5 hover:bg-slate-50 rounded-lg text-lg leading-none"
              >
                &times;
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSaveCategory} className="flex-1 overflow-y-auto p-6 space-y-4 text-xs font-bold text-slate-600 text-left">
              {/* Image Input Block */}
              <div className="space-y-2 flex flex-col items-center">
                <label className="w-full text-left text-slate-600">Image*</label>
                {modalForm.image ? (
                  <div className="w-44 h-44 border border-slate-200 rounded-xl overflow-hidden shadow-sm bg-white flex items-center justify-center">
                    <img src={modalForm.image} alt="Selected preview" className="max-w-full max-h-full object-contain" />
                  </div>
                ) : (
                  <div className="w-44 h-44 border border-slate-200 rounded-xl bg-slate-50 flex flex-col items-center justify-center p-4">
                    <div className="w-24 h-24 text-slate-300 flex items-center justify-center mb-1">
                      {/* Detailed placeholder card frame matching mockup */}
                      <svg className="w-full h-full text-slate-200" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-5.04-6.71l-2.75 3.54-1.96-2.36L6.5 17h11l-3.54-4.71z" />
                      </svg>
                    </div>
                    <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider">No Image Found</span>
                  </div>
                )}
                
                <div className="w-full flex justify-start">
                  <label className="cursor-pointer px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-[10px] font-bold rounded-xl transition inline-block">
                    Choose Image
                    <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                  </label>
                </div>
              </div>

              {/* Type Select */}
              <div className="flex flex-col space-y-1.5">
                <label className="text-slate-600">Type*</label>
                <select 
                  required
                  value={modalForm.type}
                  onChange={(e) => setModalForm(prev => ({ ...prev, type: e.target.value }))}
                  className="bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500 w-full font-medium"
                >
                  <option value="">Select a Type</option>
                  <option value="Residential">Residential</option>
                  <option value="Commercial">Commercial</option>
                </select>
              </div>

              {/* Name English */}
              <div className="flex flex-col space-y-1.5">
                <label className="text-slate-600">Name* (English)</label>
                <input 
                  required
                  type="text"
                  value={modalForm.name}
                  onChange={(e) => setModalForm(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter category name"
                  className="bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-850 focus:outline-none focus:ring-1 focus:ring-blue-500 w-full font-medium"
                />
              </div>

              {/* Name Arabic */}
              <div className="flex flex-col space-y-1.5">
                <label className="text-right w-full text-slate-600">Name* (عربي)</label>
                <input 
                  type="text"
                  value={modalForm.nameAr}
                  onChange={(e) => setModalForm(prev => ({ ...prev, nameAr: e.target.value }))}
                  placeholder="Enter category name"
                  className="bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-850 text-right focus:outline-none focus:ring-1 focus:ring-blue-500 w-full font-medium"
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
                  <option value="">Select Category Status</option>
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
                  The higher the serial number is, the later the category will be shown.
                </span>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-end space-x-2.5">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2 bg-indigo-500 hover:bg-indigo-650 text-white text-[11px] font-bold rounded-xl transition shadow-md shadow-indigo-500/10"
                >
                  Close
                </button>
                <button 
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-bold rounded-xl transition shadow-md shadow-blue-500/10"
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
