import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, Plus, ChevronDown, Trash2, Settings } from 'lucide-react';
import AddAdminModal from '../modal/admin/AddAdminModal';
import axiosInstance from '../../api/axiosInstance';

export default function AdminListTab({ setActiveTab }) {
  const navigate = useNavigate();
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedIds, setSelectedIds] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [statusDropdownId, setStatusDropdownId] = useState(null);

  const fetchAdmins = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get('/admin/admins');
      setAdmins(res.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching admins:', err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(admins.map(a => a._id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectOne = (id, checked) => {
    if (checked) {
      setSelectedIds([...selectedIds, id]);
    } else {
      setSelectedIds(selectedIds.filter(x => x !== id));
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this admin?')) return;
    try {
      await axiosInstance.delete(`/admin/admins/${id}`);
      setAdmins(admins.filter(a => a._id !== id));
      setSelectedIds(selectedIds.filter(x => x !== id));
      alert('Admin deleted successfully');
    } catch (err) {
      alert('Failed to delete admin');
    }
  };

  const handleAddAdmin = async (newAdmin) => {
    try {
      const res = await axiosInstance.post('/admin/admins', newAdmin);
      setAdmins([res.data, ...admins]);
      setIsModalOpen(false);
      alert('Admin added successfully!');
    } catch (err) {
      alert('Failed to add admin: ' + (err.response?.data?.message || err.message));
    }
  };

  const handleStatusChange = async (id, val) => {
    try {
      await axiosInstance.put(`/admin/users/${id}/status`, { status: val });
      setAdmins(prev => prev.map(a => a._id === id ? { ...a, status: val } : a));
      setStatusDropdownId(null);
      alert(`Admin status updated to ${val}`);
    } catch (err) {
      alert('Failed to update status');
    }
  };

  const filteredAdmins = useMemo(() => {
    if (!search) return admins;
    const q = search.toLowerCase();
    return admins.filter(a => 
      (a.username || '').toLowerCase().includes(q) ||
      (a.email || '').toLowerCase().includes(q) ||
      ((a.adminRole || a.role) || '').toLowerCase().includes(q)
    );
  }, [search, admins]);

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
          <h1 className="text-xl lg:text-2xl font-bold tracking-tight text-slate-900">Registered Admins</h1>
          <div className="flex items-center space-x-2 text-xs text-slate-400 mt-2">
            <Home size={14} className="text-slate-400 cursor-pointer hover:text-blue-600" onClick={() => navigate('/')} />
            <span>&gt;</span>
            <span className="hover:text-blue-600 cursor-pointer" onClick={() => setActiveTab('dashboard')}>Admin Management</span>
            <span>&gt;</span>
            <span className="text-slate-500 font-semibold">Registered Admins</span>
          </div>
        </div>
      </div>

      {/* Main Panel Box */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-premium p-6">
        
        {/* Header elements */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-55 mb-6">
          <h3 className="text-sm font-bold text-slate-800">All Admins</h3>
          
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition active:scale-95 shadow-md shadow-blue-500/10"
          >
            <Plus size={14} />
            <span>+ Add Admin</span>
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
              className="bg-white border border-slate-200 rounded-lg px-3 py-1 text-xs text-slate-800 focus:outline-none w-48"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 font-bold bg-slate-50/50">
                <th className="p-3 w-10">
                  <input 
                    type="checkbox" 
                    checked={selectedIds.length > 0 && selectedIds.length === admins.length}
                    onChange={handleSelectAll}
                    className="rounded text-blue-600 focus:ring-blue-500" 
                  />
                </th>
                <th className="p-3">Profile Picture</th>
                <th className="p-3">Username</th>
                <th className="p-3">Email ID</th>
                <th className="p-3">Role</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredAdmins.map((item) => (
                <tr key={item._id} className="hover:bg-slate-50/50 transition bg-white">
                  <td className="p-3">
                    <input 
                      type="checkbox" 
                      checked={selectedIds.includes(item._id)}
                      onChange={(e) => handleSelectOne(item._id, e.target.checked)}
                      className="rounded text-blue-600 focus:ring-blue-500" 
                    />
                  </td>
                  <td className="p-3">
                    {item.avatar ? (
                      <img src={item.avatar} alt="Admin" className="w-8 h-8 rounded-full object-cover" />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 border border-blue-200">
                        <Settings size={14} className="animate-spin duration-10000" />
                      </div>
                    )}
                  </td>
                  <td className="p-3 font-semibold text-slate-800">{item.username}</td>
                  <td className="p-3 font-semibold text-slate-600 hover:underline cursor-pointer">
                    <a href={`mailto:${item.email}`}>{item.email}</a>
                  </td>
                  <td className="p-3 font-semibold text-slate-700">{item.adminRole || 'Admin'}</td>
                  
                  {/* Status Dropdown */}
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
                          onClick={() => handleStatusChange(item._id, 'Deactive')}
                          className="w-full text-left px-3 py-1.5 hover:bg-slate-50"
                        >
                          Deactive
                        </button>
                      </div>
                    )}
                  </td>

                  <td className="p-3 text-right">
                    <div className="flex items-center justify-end space-x-1.5">
                      <button 
                        type="button" 
                        onClick={() => handleDelete(item._id)}
                        className="p-1.5 bg-red-500 hover:bg-red-650 text-white rounded transition"
                      >
                        <Trash2 size={10} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredAdmins.length === 0 && (
                <tr>
                  <td colSpan="7" className="p-4 text-center text-slate-400">No admins found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-6 text-xs text-slate-500 font-medium">
          <span>Showing 1 to {filteredAdmins.length} of {admins.length} entries</span>
          <div className="flex items-center space-x-1.5">
            <button className="px-3 py-1 bg-slate-100 rounded text-slate-700 cursor-not-allowed">Previous</button>
            <button className="px-3 py-1 bg-blue-600 text-white rounded font-bold">1</button>
            <button className="px-3 py-1 bg-slate-100 rounded text-slate-700 cursor-not-allowed">Next</button>
          </div>
        </div>

      </div>

      <AddAdminModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSave={handleAddAdmin} 
      />
    </div>
  );
}
