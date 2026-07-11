import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, Plus, ChevronDown, Trash2, Loader2 } from 'lucide-react';
import axiosInstance from '../../api/axiosInstance';

export default function FeaturedPropertiesPricingTab({ setActiveTab }) {
  const navigate = useNavigate();
  const [pricing, setPricing] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [form, setForm] = useState({ days: '', cost: '', status: 'Active' });
  const [saving, setSaving] = useState(false);
  const [statusDropdownId, setStatusDropdownId] = useState(null);

  const fetchPricing = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get('/admin/featured/pricing');
      setPricing(res.data);
    } catch (err) {
      console.error('Error fetching pricing:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPricing();
  }, []);

  const filtered = pricing.filter(p =>
    p.days.toString().includes(search) || p.cost.includes(search)
  );

  const openAddModal = () => {
    setEditItem(null);
    setForm({ days: '', cost: '', status: 'Active' });
    setShowModal(true);
  };

  const openEditModal = (item) => {
    setEditItem(item);
    setForm({ days: item.days.toString(), cost: item.cost, status: item.status });
    setShowModal(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editItem) {
        const res = await axiosInstance.put(`/admin/featured/pricing/${editItem._id}`, {
          days: Number(form.days),
          cost: form.cost,
          status: form.status,
        });
        setPricing(pricing.map(p => p._id === editItem._id ? res.data : p));
      } else {
        const res = await axiosInstance.post('/admin/featured/pricing', {
          days: Number(form.days),
          cost: form.cost,
          status: form.status,
        });
        setPricing([...pricing, res.data]);
      }
      setShowModal(false);
    } catch (err) {
      alert('Failed to save: ' + (err.response?.data?.message || err.message));
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this pricing tier?')) return;
    try {
      await axiosInstance.delete(`/admin/featured/pricing/${id}`);
      setPricing(pricing.filter(p => p._id !== id));
    } catch (err) {
      alert('Failed to delete');
    }
  };

  const handleStatusToggle = async (id, newStatus) => {
    try {
      const res = await axiosInstance.put(`/admin/featured/pricing/${id}`, { status: newStatus });
      setPricing(pricing.map(p => p._id === id ? res.data : p));
      setStatusDropdownId(null);
    } catch (err) {
      alert('Failed to update status');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-20 bg-white rounded-2xl border border-slate-100 shadow-premium">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-650"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Heading & Breadcrumbs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-slate-100">
        <div>
          <h1 className="text-xl lg:text-2xl font-bold tracking-tight text-slate-900">Feature Properties</h1>
          <div className="flex items-center space-x-2 text-xs text-slate-400 mt-2">
            <Home size={14} className="text-slate-400 cursor-pointer hover:text-blue-600" onClick={() => navigate('/')} />
            <span>&gt;</span>
            <span className="hover:text-blue-600 cursor-pointer" onClick={() => setActiveTab('dashboard')}>Feature Properties</span>
            <span>&gt;</span>
            <span className="text-slate-500 font-semibold">Pricing</span>
          </div>
        </div>
      </div>

      {/* Main Panel Box */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-premium p-6">
        
        {/* Header elements */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <h3 className="text-sm font-bold text-slate-800">Pricing</h3>
          <button
            onClick={openAddModal}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition active:scale-95 shadow-md shadow-blue-500/10"
          >
            <Plus size={14} />
            <span>Add Pricing</span>
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
                <th className="p-3">Number of Days</th>
                <th className="p-3">Cost</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filtered.map((item) => (
                <tr key={item._id} className="hover:bg-slate-50/50 transition">
                  <td className="p-3 font-semibold text-slate-700">{item.days}</td>
                  <td className="p-3 font-bold text-slate-800">{item.cost}</td>
                  <td className="p-3 relative">
                    <button
                      onClick={() => setStatusDropdownId(statusDropdownId === item._id ? null : item._id)}
                      className={`inline-flex items-center space-x-1 px-2 py-0.5 rounded-full font-bold text-[9px] uppercase cursor-pointer ${
                        item.status === 'Active' ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white'
                      }`}
                    >
                      <span>{item.status}</span>
                      <ChevronDown size={8} />
                    </button>
                    {statusDropdownId === item._id && (
                      <div className="absolute left-3 mt-1 z-30 bg-white border border-slate-100 rounded-lg shadow-lg py-1 w-24 text-[10px] font-bold text-slate-700 animate-in fade-in duration-200">
                        <button onClick={() => handleStatusToggle(item._id, 'Active')} className="w-full text-left px-3 py-1.5 hover:bg-emerald-50">Active</button>
                        <button onClick={() => handleStatusToggle(item._id, 'Deactive')} className="w-full text-left px-3 py-1.5 hover:bg-red-50">Deactive</button>
                      </div>
                    )}
                  </td>
                  <td className="p-3 text-right">
                    <div className="flex items-center justify-end space-x-1.5">
                      <button
                        onClick={() => openEditModal(item)}
                        className="inline-flex items-center px-3 py-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded text-[10px] font-bold transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="inline-flex items-center justify-center p-1.5 bg-red-500 hover:bg-red-600 text-white rounded transition active:scale-95"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-6 text-xs text-slate-500 font-medium">
          <span>Showing 1 to {filtered.length} of {pricing.length} entries</span>
          <div className="flex items-center space-x-1.5">
            <button className="px-3 py-1 bg-slate-100 hover:bg-slate-200 rounded text-slate-700 transition">Previous</button>
            <button className="px-3 py-1 bg-blue-600 text-white rounded font-bold">1</button>
            <button className="px-3 py-1 bg-slate-100 hover:bg-slate-200 rounded text-slate-700 transition">Next</button>
          </div>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <h2 className="text-sm font-bold text-slate-800">{editItem ? 'Edit Pricing' : 'Add Pricing'}</h2>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600 transition p-1.5 hover:bg-slate-50 rounded-lg text-lg leading-none">&times;</button>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-4 text-xs font-bold text-slate-600">
              <div className="flex flex-col space-y-1.5">
                <label>Number of Days*</label>
                <input required type="number" value={form.days}
                  onChange={(e) => setForm(prev => ({ ...prev, days: e.target.value }))}
                  placeholder="e.g. 30"
                  className="bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 w-full font-medium" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <label>Cost*</label>
                <input required type="text" value={form.cost}
                  onChange={(e) => setForm(prev => ({ ...prev, cost: e.target.value }))}
                  placeholder="e.g. $120.00"
                  className="bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 w-full font-medium" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <label>Status*</label>
                <select required value={form.status}
                  onChange={(e) => setForm(prev => ({ ...prev, status: e.target.value }))}
                  className="bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 w-full font-medium">
                  <option value="Active">Active</option>
                  <option value="Deactive">Deactive</option>
                </select>
              </div>
              <div className="pt-4 border-t border-slate-100 flex items-center justify-end space-x-2.5">
                <button type="button" onClick={() => setShowModal(false)}
                  className="px-5 py-2 bg-indigo-500 hover:bg-indigo-600 text-white text-[11px] font-bold rounded-xl transition shadow-md shadow-indigo-500/10">
                  Close
                </button>
                <button type="submit" disabled={saving}
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-bold rounded-xl transition shadow-md shadow-blue-500/10 disabled:opacity-50 flex items-center space-x-1.5">
                  {saving && <Loader2 size={12} className="animate-spin" />}
                  <span>{saving ? 'Saving...' : 'Save'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
