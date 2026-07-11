import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, Plus, ChevronDown, Search } from 'lucide-react';
import axiosInstance from '../../api/axiosInstance';

export default function PropertyManagementListTab({ setActiveTab }) {
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTitle, setSearchTitle] = useState('');
  const [approvalDropdownId, setApprovalDropdownId] = useState(null);
  const [statusDropdownId, setStatusDropdownId] = useState(null);
  const [featuredDropdownId, setFeaturedDropdownId] = useState(null);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get('/admin/properties');
      const normalized = res.data.map(p => ({
        id: p._id,
        title: p.title || p.name,
        postBy: p.vendor ? p.vendor.name : 'Admin',
        postByType: p.vendor && p.vendor._id !== undefined ? 'user' : 'admin',
        type: p.propertyType || 'Residential',
        city: p.city || 'N/A',
        approvalStatus: p.status === 'Approved' ? 'Approve' : (p.status === 'Rejected' ? 'Rejected' : 'Pending'),
        featured: p.isFeatured ? 'Yes' : 'No',
        status: p.isActive !== false ? 'Active' : 'Deactive'
      }));
      setProperties(normalized);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching admin properties:', err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const filtered = useMemo(() => {
    if (!searchTitle) return properties;
    return properties.filter(p => p.title.toLowerCase().includes(searchTitle.toLowerCase()));
  }, [searchTitle, properties]);

  const handleApprovalChange = async (id, val) => {
    try {
      if (val === 'Approve') {
        await axiosInstance.put(`/admin/properties/${id}/approve`);
      } else {
        await axiosInstance.put(`/admin/properties/${id}/reject`);
      }
      setProperties(properties.map(p => p.id === id ? { 
        ...p, 
        approvalStatus: val,
        status: val === 'Approve' ? 'Active' : 'Deactive' 
      } : p));
      setApprovalDropdownId(null);
    } catch (err) {
      alert('Failed to change approval status');
    }
  };

  const handleStatusChange = async (id, val) => {
    try {
      await axiosInstance.put(`/admin/properties/${id}/toggle-status`, {
        isActive: val === 'Active'
      });
      setProperties(properties.map(p => p.id === id ? { ...p, status: val } : p));
      setStatusDropdownId(null);
    } catch (err) {
      alert('Failed to change status');
    }
  };

  const handleFeaturedChange = async (id, val) => {
    try {
      await axiosInstance.put(`/admin/properties/${id}/toggle-featured`, {
        isFeatured: val === 'Yes'
      });
      setProperties(properties.map(p => p.id === id ? { ...p, featured: val } : p));
      setFeaturedDropdownId(null);
    } catch (err) {
      alert('Failed to change featured status');
    }
  };

  const handleDeleteProperty = async (id) => {
    if (!window.confirm('Are you sure you want to delete this property?')) return;
    try {
      await axiosInstance.delete(`/admin/properties/${id}`);
      setProperties(properties.filter(p => p.id !== id));
    } catch (err) {
      alert('Failed to delete property');
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
          <h1 className="text-xl lg:text-2xl font-bold tracking-tight text-slate-900">Properties</h1>
          <div className="flex items-center space-x-2 text-xs text-slate-400 mt-2">
            <Home size={14} className="text-slate-400 cursor-pointer hover:text-blue-600" onClick={() => navigate('/')} />
            <span>&gt;</span>
            <span className="hover:text-blue-600 cursor-pointer" onClick={() => setActiveTab('dashboard')}>Property Management</span>
            <span>&gt;</span>
            <span className="text-slate-500 font-semibold">Properties</span>
          </div>
        </div>
      </div>

      {/* Main Panel Box */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-premium p-6">
        
        {/* Header Elements */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex flex-wrap items-center gap-3">
            <h3 className="text-sm font-bold text-slate-800 mr-2">Properties</h3>
            
            <select className="bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-200 transition font-medium">
              <option value="All">All</option>
            </select>

            <input
              type="text"
              value={searchTitle}
              onChange={(e) => setSearchTitle(e.target.value)}
              placeholder="Title"
              className="bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200 transition-all w-48"
            />

            <select className="bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-200 transition font-medium">
              <option value="English">English</option>
            </select>
          </div>

          <button 
            onClick={() => setActiveTab('property-add')}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition active:scale-95 shadow-md shadow-blue-500/10 whitespace-nowrap"
          >
            <Plus size={14} />
            <span>Add Property</span>
          </button>
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
                <th className="p-3">Post by</th>
                <th className="p-3">Type</th>
                <th className="p-3">City</th>
                <th className="p-3">Approval Status</th>
                <th className="p-3">Featured</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/50 transition">
                  <td className="p-3">
                    <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500" />
                  </td>
                  <td className="p-3 font-bold text-blue-600 max-w-xs hover:underline cursor-pointer">
                    {item.title}
                  </td>
                  <td className="p-3">
                    {item.postByType === 'admin' ? (
                      <span className="inline-flex px-2 py-0.5 rounded bg-emerald-500 text-white font-bold text-[9px] uppercase">
                        {item.postBy}
                      </span>
                    ) : (
                      <span className="inline-flex px-2 py-0.5 rounded bg-blue-50 hover:bg-blue-100 text-blue-600 font-bold text-[9px] cursor-pointer hover:underline">
                        {item.postBy}
                      </span>
                    )}
                  </td>
                  <td className="p-3 text-slate-500 font-semibold">{item.type}</td>
                  <td className="p-3 text-slate-600 font-semibold">{item.city}</td>

                  {/* Approval Status Toggle */}
                  <td className="p-3 relative">
                    <button
                      onClick={() => setApprovalDropdownId(approvalDropdownId === item.id ? null : item.id)}
                      className="inline-flex items-center space-x-1 px-3 py-1 bg-emerald-500 hover:bg-emerald-600 text-white rounded font-bold text-[10px] transition"
                    >
                      <span>{item.approvalStatus}</span>
                      <ChevronDown size={10} />
                    </button>
                    {approvalDropdownId === item.id && (
                      <div className="absolute left-3 mt-1 z-35 bg-white border border-slate-100 rounded-lg shadow-lg py-1 w-24 text-[10px] font-bold text-slate-700 animate-in fade-in duration-200">
                        <button
                          onClick={() => handleApprovalChange(item.id, 'Approve')}
                          className="w-full text-left px-3 py-1.5 hover:bg-slate-50"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleApprovalChange(item.id, 'Pending')}
                          className="w-full text-left px-3 py-1.5 hover:bg-slate-50"
                        >
                          Pending
                        </button>
                      </div>
                    )}
                  </td>

                  {/* Featured Status Toggle */}
                  <td className="p-3 relative">
                    <div className="flex items-center space-x-2">
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
                      {item.featured === 'Yes' && (
                        <button 
                          onClick={() => alert('Editing featured highlights placement.')}
                          className="px-2 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded font-bold text-[9px] transition"
                        >
                          Edit
                        </button>
                      )}
                      {featuredDropdownId === item.id && (
                        <div className="absolute left-3 mt-1 z-35 bg-white border border-slate-100 rounded-lg shadow-lg py-1 w-24 text-[10px] font-bold text-slate-700 animate-in fade-in duration-200">
                          <button
                            onClick={() => handleFeaturedChange(item.id, 'Yes')}
                            className="w-full text-left px-3 py-1.5 hover:bg-emerald-50"
                          >
                            Yes
                          </button>
                          <button
                            onClick={() => handleFeaturedChange(item.id, 'No')}
                            className="w-full text-left px-3 py-1.5 hover:bg-red-50"
                          >
                            No
                          </button>
                        </div>
                      )}
                    </div>
                  </td>

                  {/* Status Toggle */}
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
                      <div className="absolute left-3 mt-1 z-35 bg-white border border-slate-100 rounded-lg shadow-lg py-1 w-24 text-[10px] font-bold text-slate-700 animate-in fade-in duration-200">
                        <button
                          onClick={() => handleStatusChange(item.id, 'Active')}
                          className="w-full text-left px-3 py-1.5 hover:bg-emerald-50"
                        >
                          Active
                        </button>
                        <button
                          onClick={() => handleStatusChange(item.id, 'Deactive')}
                          className="w-full text-left px-3 py-1.5 hover:bg-red-50"
                        >
                          Deactive
                        </button>
                      </div>
                    )}
                  </td>

                  <td className="p-3 text-right">
                    <div className="flex items-center justify-end space-x-1.5">
                      <button
                        onClick={() => handleDeleteProperty(item.id)}
                        className="inline-flex items-center px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded text-[10px] font-bold transition"
                      >
                        Delete
                      </button>
                      <button className="inline-flex items-center space-x-1.5 px-3 py-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded text-[10px] font-bold transition">
                        <span>Select</span>
                        <ChevronDown size={8} />
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
          <span>Showing 1 to {filtered.length} of {properties.length} entries</span>
          <div className="flex items-center space-x-1.5">
            <button className="px-3 py-1 bg-slate-100 hover:bg-slate-200 rounded text-slate-700 transition">Previous</button>
            <button className="px-3 py-1 bg-blue-600 text-white rounded font-bold">1</button>
            <button className="px-3 py-1 bg-slate-100 hover:bg-slate-200 rounded text-slate-700 transition">Next</button>
          </div>
        </div>

      </div>
    </div>
  );
}
