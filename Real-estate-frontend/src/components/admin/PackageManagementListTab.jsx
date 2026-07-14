import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, Plus, ChevronDown, Trash2, Loader2 } from 'lucide-react';
import AddPackageModal from '../modal/admin/AddPackageModal';
import { getAdminPackagesAPI, updateAdminPackageAPI, createAdminPackageAPI, deleteAdminPackageAPI } from '../../api/api';

export default function PackageManagementListTab({ setActiveTab }) {
  const navigate = useNavigate();
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [statusDropdownId, setStatusDropdownId] = useState(null);

  const fetchPackages = async () => {
    try {
      setLoading(true);
      const res = await getAdminPackagesAPI();
      setPackages(res.data || []);
    } catch (err) {
      console.error('Error fetching packages:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  const filtered = useMemo(() => {
    if (!search) return packages;
    return packages.filter(p => (p.title || '').toLowerCase().includes(search.toLowerCase()));
  }, [search, packages]);

  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await updateAdminPackageAPI(id, { status: newStatus });
      setPackages(prev => prev.map(p => p._id === id ? res.data : p));
      setStatusDropdownId(null);
    } catch (err) {
      alert('Failed to update status');
    }
  };

  const handleAddPackage = async (newPkg) => {
    try {
      const res = await createAdminPackageAPI(newPkg);
      setPackages(prev => [res.data, ...prev]);
      setIsModalOpen(false);
    } catch (err) {
      alert('Failed to add package: ' + (err.response?.data?.message || err.message));
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this package?')) return;
    try {
      await deleteAdminPackageAPI(id);
      setPackages(prev => prev.filter(p => p._id !== id));
    } catch (err) {
      alert('Failed to delete package');
    }
  };

  const getBadgeColor = (term) => {
    if (term === 'Lifetime') return 'bg-purple-650';
    if (term === 'Yearly') return 'bg-blue-650';
    return 'bg-indigo-900'; // Monthly
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
          <h1 className="text-xl lg:text-2xl font-bold tracking-tight text-slate-900">Packages</h1>
          <div className="flex items-center space-x-2 text-xs text-slate-400 mt-2">
            <Home size={14} className="text-slate-400 cursor-pointer hover:text-blue-600" onClick={() => navigate('/')} />
            <span>&gt;</span>
            <span className="hover:text-blue-600 cursor-pointer" onClick={() => setActiveTab('dashboard')}>Package Management</span>
            <span>&gt;</span>
            <span className="text-slate-500 font-semibold">Packages</span>
          </div>
        </div>
      </div>

      {/* Main Panel Box */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-premium p-6">
        
        {/* Header elements */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <h3 className="text-sm font-bold text-slate-800">Package Page</h3>

          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition active:scale-95 shadow-md shadow-blue-500/10"
          >
            <Plus size={14} />
            <span>Add Package</span>
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
                <th className="p-3">Title</th>
                <th className="p-3">Cost</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filtered.map((item) => (
                <tr key={item._id} className="hover:bg-slate-50/50 transition">
                  <td className="p-3">
                    <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500" />
                  </td>
                  <td className="p-3">
                    <div className="flex items-center space-x-2 font-bold text-slate-800">
                      <span>{item.title}</span>
                      <span className={`inline-flex px-2 py-0.5 rounded text-[8px] font-bold text-white uppercase tracking-wide ${getBadgeColor(item.term)}`}>
                        {item.term}
                      </span>
                    </div>
                  </td>
                  <td className="p-3 font-semibold text-slate-700">{item.price}</td>
                  
                  {/* Status Toggle Dropdown */}
                  <td className="p-3 relative">
                    <button
                      onClick={() => setStatusDropdownId(statusDropdownId === item._id ? null : item._id)}
                      className={`inline-flex items-center space-x-1 px-3 py-1 rounded font-bold text-[10px] text-white transition ${
                        item.status === 'Active' ? 'bg-emerald-500 hover:bg-emerald-600' : 'bg-red-500 hover:bg-red-650'
                      }`}
                    >
                      <span>{item.status}</span>
                      <ChevronDown size={10} />
                    </button>
                    {statusDropdownId === item._id && (
                      <div className="absolute left-3 mt-1 z-35 bg-white border border-slate-100 rounded-lg shadow-lg py-1 w-24 text-[10px] font-bold text-slate-700 animate-in fade-in duration-200">
                        <button
                          onClick={() => handleStatusChange(item._id, 'Active')}
                          className="w-full text-left px-3 py-1.5 hover:bg-slate-50"
                        >
                          Active
                        </button>
                        <button
                          onClick={() => handleStatusChange(item._id, 'Inactive')}
                          className="w-full text-left px-3 py-1.5 hover:bg-slate-50"
                        >
                          Inactive
                        </button>
                      </div>
                    )}
                  </td>

                  <td className="p-3 text-right">
                    <div className="flex items-center justify-end space-x-1.5">
                      <button 
                        onClick={() => handleDelete(item._id)}
                        className="p-2 bg-red-500 hover:bg-red-600 text-white rounded transition active:scale-95 shadow-sm"
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
          <span>Showing 1 to {filtered.length} of {packages.length} entries</span>
          <div className="flex items-center space-x-1.5">
            <button className="px-3 py-1 bg-slate-100 hover:bg-slate-200 rounded text-slate-700 transition">Previous</button>
            <button className="px-3 py-1 bg-blue-600 text-white rounded font-bold">1</button>
            <button className="px-3 py-1 bg-slate-100 hover:bg-slate-200 rounded text-slate-700 transition">Next</button>
          </div>
        </div>

      </div>

      <AddPackageModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleAddPackage}
      />
    </div>
  );
}
