import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, Plus, Edit2, Trash2, Loader2 } from 'lucide-react';
import { getAdminProjectTypesAPI, createAdminProjectTypeAPI, updateAdminProjectTypeAPI, deleteAdminProjectTypeAPI } from '../../api/api';

export default function ProjectTypesTab({ setActiveTab }) {
  const navigate = useNavigate();
  const [projectTypes, setProjectTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [form, setForm] = useState({ name: '', minPrice: '', minArea: '', totalUnit: '' });
  const [saving, setSaving] = useState(false);

  const fetchTypes = async () => {
    try {
      setLoading(true);
      const res = await getAdminProjectTypesAPI();
      setProjectTypes(res.data);
    } catch (err) {
      console.error('Error fetching project types:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTypes();
  }, []);

  const filtered = projectTypes.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const openAddModal = () => {
    setEditItem(null);
    setForm({ name: '', minPrice: '', minArea: '', totalUnit: '' });
    setShowModal(true);
  };

  const openEditModal = (item) => {
    setEditItem(item);
    setForm({
      name: item.name,
      minPrice: item.minPrice,
      minArea: item.minArea,
      totalUnit: item.totalUnit.toString(),
    });
    setShowModal(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editItem) {
        const res = await updateAdminProjectTypeAPI(editItem._id, form);
        setProjectTypes(projectTypes.map(p => p._id === editItem._id ? res.data : p));
      } else {
        const res = await createAdminProjectTypeAPI(form);
        setProjectTypes([...projectTypes, res.data]);
      }
      setShowModal(false);
    } catch (err) {
      alert('Failed to save: ' + (err.response?.data?.message || err.message));
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this project type?')) return;
    try {
      await deleteAdminProjectTypeAPI(id);
      setProjectTypes(projectTypes.filter(p => p._id !== id));
    } catch (err) {
      alert('Failed to delete');
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
    <div className="space-y-6 animate-in fade-in duration-300 relative">
      {/* Heading & Breadcrumbs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-slate-100">
        <div>
          <h1 className="text-xl lg:text-2xl font-bold tracking-tight text-slate-900">Project Types</h1>
          <div className="flex items-center space-x-2 text-xs text-slate-400 mt-2">
            <Home size={14} className="text-slate-400 cursor-pointer hover:text-blue-600" onClick={() => navigate('/')} />
            <span>&gt;</span>
            <span className="hover:text-blue-600 cursor-pointer" onClick={() => setActiveTab('dashboard')}>Property Management</span>
            <span>&gt;</span>
            <span className="text-slate-500 font-semibold">Project Types</span>
          </div>
        </div>
      </div>

      {/* Main Panel Box */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-premium p-6">
        
        {/* Header elements */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center space-x-4">
            <h3 className="text-sm font-bold text-slate-800">Project Types</h3>
            <select className="bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-700 focus:outline-none">
              <option>Select a Language</option>
              <option value="English">English</option>
            </select>
          </div>

          <button 
            onClick={openAddModal}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition active:scale-95 shadow-md shadow-blue-500/10"
          >
            <Plus size={14} />
            <span>Add Project Type</span>
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
                <th className="p-3">Name</th>
                <th className="p-3">Min Price</th>
                <th className="p-3">Min Area (sqft)</th>
                <th className="p-3">Total Unit</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filtered.map((item) => (
                <tr key={item._id} className="hover:bg-slate-50/50 transition">
                  <td className="p-3">
                    <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500" />
                  </td>
                  <td className="p-3 font-semibold text-slate-800">{item.name}</td>
                  <td className="p-3 font-bold text-slate-700">{item.minPrice}</td>
                  <td className="p-3 font-semibold text-slate-650">{item.minArea}</td>
                  <td className="p-3 font-semibold text-slate-700">{item.totalUnit}</td>
                  <td className="p-3 text-right">
                    <div className="inline-flex items-center space-x-2">
                      <button 
                        onClick={() => openEditModal(item)}
                        className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition active:scale-95">
                        <Edit2 size={12} />
                      </button>
                      <button 
                        onClick={() => handleDelete(item._id)}
                        className="p-2 bg-red-500 hover:bg-red-650 text-white rounded transition active:scale-95"
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
          <span>Showing 1 to {filtered.length} of {projectTypes.length} entries</span>
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
              <h2 className="text-sm font-bold text-slate-800">{editItem ? 'Edit Project Type' : 'Add Project Type'}</h2>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600 transition p-1.5 hover:bg-slate-50 rounded-lg text-lg leading-none">&times;</button>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-4 text-xs font-bold text-slate-600">
              <div className="flex flex-col space-y-1.5">
                <label>Name (English)*</label>
                <input required type="text" value={form.name}
                  onChange={(e) => setForm(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter project type name"
                  className="bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 w-full font-medium" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <label>Min Price</label>
                <input type="text" value={form.minPrice}
                  onChange={(e) => setForm(prev => ({ ...prev, minPrice: e.target.value }))}
                  placeholder="e.g. $2,500.00"
                  className="bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 w-full font-medium" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <label>Min Area (sqft)</label>
                <input type="text" value={form.minArea}
                  onChange={(e) => setForm(prev => ({ ...prev, minArea: e.target.value }))}
                  placeholder="e.g. 1200"
                  className="bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 w-full font-medium" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <label>Total Unit</label>
                <input type="number" value={form.totalUnit}
                  onChange={(e) => setForm(prev => ({ ...prev, totalUnit: e.target.value }))}
                  placeholder="e.g. 12"
                  className="bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 w-full font-medium" />
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
