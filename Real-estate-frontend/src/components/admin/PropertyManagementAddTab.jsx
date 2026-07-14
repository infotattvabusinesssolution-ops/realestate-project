import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, Building2, Loader2 } from 'lucide-react';
import { getAdminPropertiesAPI, createAdminPropertyAPI } from '../../api/api';

export default function PropertyManagementAddTab({ setActiveTab }) {
  const navigate = useNavigate();
  const [counts, setCounts] = useState({ commercial: 0, residential: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const res = await getAdminPropertiesAPI();
        const props = res.data;
        const commercial = props.filter(p => p.propertyType === 'Commercial').length;
        const residential = props.filter(p => p.propertyType === 'Residential').length;
        setCounts({ commercial, residential });
      } catch (err) {
        console.error('Error fetching property counts:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCounts();
  }, []);

  // Modal state for creating a new property
  const [showForm, setShowForm] = useState(false);
  const [selectedPropertyType, setSelectedPropertyType] = useState('');
  const [form, setForm] = useState({
    title: '', price: '', type: 'Buy', address: '', city: '',
    beds: '', baths: '', area: '', image: '', tag: '', description: ''
  });
  const [saving, setSaving] = useState(false);

  const handleTypeSelect = (pType) => {
    setSelectedPropertyType(pType);
    setShowForm(true);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setForm(prev => ({ ...prev, image: reader.result }));
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await createAdminPropertyAPI({
        ...form,
        name: form.title,
        propertyType: selectedPropertyType,
        beds: Number(form.beds) || 0,
        baths: Number(form.baths) || 0,
      });
      alert('Property created successfully!');
      setShowForm(false);
      setForm({ title: '', price: '', type: 'Buy', address: '', city: '', beds: '', baths: '', area: '', image: '', tag: '', description: '' });
      // Re-fetch counts
      const res = await getAdminPropertiesAPI();
      const props = res.data;
      setCounts({
        commercial: props.filter(p => p.propertyType === 'Commercial').length,
        residential: props.filter(p => p.propertyType === 'Residential').length,
      });
    } catch (err) {
      alert('Failed to create property: ' + (err.response?.data?.message || err.message));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Heading & Breadcrumbs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-slate-100">
        <div>
          <h1 className="text-xl lg:text-2xl font-bold tracking-tight text-slate-900">
            {showForm ? `Add ${selectedPropertyType} Property` : 'Choose Property Type'}
          </h1>
          <div className="flex items-center space-x-2 text-xs text-slate-400 mt-2">
            <Home size={14} className="text-slate-400 cursor-pointer hover:text-blue-600" onClick={() => navigate('/')} />
            <span>&gt;</span>
            <span className="hover:text-blue-600 cursor-pointer" onClick={() => setActiveTab('dashboard')}>Property Management</span>
            <span>&gt;</span>
            <span className="text-slate-500 font-semibold">{showForm ? 'Add Property' : 'Property Type'}</span>
          </div>
        </div>
        {showForm && (
          <button
            onClick={() => setShowForm(false)}
            className="mt-2 md:mt-0 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition"
          >
            ← Back to Types
          </button>
        )}
      </div>

      {!showForm ? (
        /* Choice Grid */
        <div className="bg-white rounded-2xl border border-slate-100 shadow-premium p-8">
          <h3 className="text-sm font-bold text-slate-800 mb-8">Choose Property Type</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto py-4">
            {/* Commercial Block */}
            <div 
              onClick={() => handleTypeSelect('Commercial')}
              className="border border-slate-100 hover:border-emerald-500/30 rounded-2xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 hover:shadow-premium group bg-slate-50/50 hover:bg-white active:scale-95"
            >
              <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center transition-transform group-hover:scale-110 mb-6 shadow-sm">
                <Building2 size={32} />
              </div>
              <h4 className="font-extrabold text-slate-800 text-sm tracking-wider uppercase">Commercial</h4>
              <p className="text-[10px] text-slate-400 font-semibold mt-2">
                {loading ? '...' : `Total: ${counts.commercial} Properties`}
              </p>
            </div>

            {/* Residential Block */}
            <div 
              onClick={() => handleTypeSelect('Residential')}
              className="border border-slate-100 hover:border-orange-500/30 rounded-2xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 hover:shadow-premium group bg-slate-50/50 hover:bg-white active:scale-95"
            >
              <div className="w-16 h-16 rounded-2xl bg-orange-100 text-orange-500 flex items-center justify-center transition-transform group-hover:scale-110 mb-6 shadow-sm">
                <Home size={32} />
              </div>
              <h4 className="font-extrabold text-slate-800 text-sm tracking-wider uppercase">Residential</h4>
              <p className="text-[10px] text-slate-400 font-semibold mt-2">
                {loading ? '...' : `Total: ${counts.residential} Properties`}
              </p>
            </div>
          </div>
        </div>
      ) : (
        /* Property Creation Form */
        <div className="bg-white rounded-2xl border border-slate-100 shadow-premium p-8">
          <h3 className="text-sm font-bold text-slate-800 mb-6">
            New {selectedPropertyType} Property
          </h3>

          <form onSubmit={handleSubmit} className="max-w-3xl mx-auto space-y-5">
            {/* Title */}
            <div className="flex flex-col space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Property Title*</label>
              <input required type="text" value={form.title}
                onChange={(e) => setForm(prev => ({ ...prev, title: e.target.value }))}
                placeholder="e.g. Luxury Beachfront Villa"
                className="bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500 w-full" />
            </div>

            {/* Price + Type Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Price*</label>
                <input required type="text" value={form.price}
                  onChange={(e) => setForm(prev => ({ ...prev, price: e.target.value }))}
                  placeholder="e.g. $1,250,000 or $3,500 / mo"
                  className="bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500 w-full" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Listing Type*</label>
                <select required value={form.type}
                  onChange={(e) => setForm(prev => ({ ...prev, type: e.target.value }))}
                  className="bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500 w-full">
                  <option value="Buy">Buy</option>
                  <option value="Rent">Rent</option>
                </select>
              </div>
            </div>

            {/* Address + City */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Address*</label>
                <input required type="text" value={form.address}
                  onChange={(e) => setForm(prev => ({ ...prev, address: e.target.value }))}
                  placeholder="Full street address"
                  className="bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500 w-full" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <label className="text-xs font-bold text-slate-700">City</label>
                <input type="text" value={form.city}
                  onChange={(e) => setForm(prev => ({ ...prev, city: e.target.value }))}
                  placeholder="e.g. Los Angeles"
                  className="bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500 w-full" />
              </div>
            </div>

            {/* Beds, Baths, Area */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex flex-col space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Beds*</label>
                <input required type="number" value={form.beds}
                  onChange={(e) => setForm(prev => ({ ...prev, beds: e.target.value }))}
                  placeholder="4"
                  className="bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500 w-full" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Baths*</label>
                <input required type="number" step="0.5" value={form.baths}
                  onChange={(e) => setForm(prev => ({ ...prev, baths: e.target.value }))}
                  placeholder="3"
                  className="bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500 w-full" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Area*</label>
                <input required type="text" value={form.area}
                  onChange={(e) => setForm(prev => ({ ...prev, area: e.target.value }))}
                  placeholder="3,200 sqft"
                  className="bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500 w-full" />
              </div>
            </div>

            {/* Tag + Image */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Tag</label>
                <input type="text" value={form.tag}
                  onChange={(e) => setForm(prev => ({ ...prev, tag: e.target.value }))}
                  placeholder="Villa, Apartment, Penthouse..."
                  className="bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500 w-full" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Property Image</label>
                <label className="cursor-pointer px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition inline-block text-center">
                  Choose Image
                  <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                </label>
                {form.image && (
                  <div className="w-32 h-20 rounded-lg overflow-hidden border border-slate-200 mt-1">
                    <img src={form.image} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="flex flex-col space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Description</label>
              <textarea value={form.description}
                onChange={(e) => setForm(prev => ({ ...prev, description: e.target.value }))}
                rows={4}
                placeholder="Detailed property description..."
                className="bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500 w-full resize-none" />
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-100">
              <button type="button" onClick={() => setShowForm(false)}
                className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition">
                Cancel
              </button>
              <button type="submit" disabled={saving}
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition active:scale-95 shadow-md shadow-blue-500/10 disabled:opacity-50 flex items-center space-x-2">
                {saving && <Loader2 size={14} className="animate-spin" />}
                <span>{saving ? 'Saving...' : 'Create Property'}</span>
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
