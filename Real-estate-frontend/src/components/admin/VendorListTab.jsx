import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, ChevronDown } from 'lucide-react';
import { getAdminUsersAPI, deleteAdminUserAPI, updateAdminUserStatusAPI, updateAdminUserAPI } from '../../api/api';

export default function VendorListTab({ setActiveTab }) {
  const navigate = useNavigate();
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [accDropdownId, setAccDropdownId] = useState(null);
  const [emailDropdownId, setEmailDropdownId] = useState(null);
  const [actionDropdownId, setActionDropdownId] = useState(null);

  const fetchVendors = async () => {
    try {
      setLoading(true);
      const res = await getAdminUsersAPI({ role: 'vendor' });
      const normalized = res.data.map(v => ({
        id: v._id,
        username: v.username || v.name,
        email: v.email,
        phone: v.phone || '-',
        accountStatus: v.isActive ? 'Active' : 'Deactive',
        emailStatus: v.emailStatus || 'Verified'
      }));
      setVendors(normalized);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching admin vendors:', err);
      setLoading(false);
    }
  };

  const handleDeleteVendor = async (id) => {
    if (!window.confirm('Are you sure you want to delete this vendor?')) return;
    try {
      await deleteAdminUserAPI(id);
      setVendors(prev => prev.filter(v => v.id !== id));
      setActionDropdownId(null);
      alert('Vendor removed successfully');
    } catch (err) {
      alert('Failed to delete vendor: ' + (err.response?.data?.message || err.message));
    }
  };

  useEffect(() => {
    fetchVendors();
  }, []);

  const filtered = useMemo(() => {
    if (!search) return vendors;
    const q = search.toLowerCase();
    return vendors.filter(v =>
      (v.username || '').toLowerCase().includes(q) ||
      (v.email || '').toLowerCase().includes(q)
    );
  }, [search, vendors]);

  const handleAccountStatusChange = async (id, val) => {
    try {
      await updateAdminUserStatusAPI(id, {
        isActive: val === 'Active'
      });
      setVendors(prev => prev.map(v => v.id === id ? { ...v, accountStatus: val } : v));
      setAccDropdownId(null);
    } catch (err) {
      alert('Failed to change vendor status');
    }
  };

  const handleEmailStatusChange = async (id, val) => {
    try {
      await updateAdminUserAPI(id, {
        emailStatus: val,
        isEmailVerified: val === 'Verified'
      });
      setVendors(prev => prev.map(v => v.id === id ? { ...v, emailStatus: val } : v));
      setEmailDropdownId(null);
    } catch (err) {
      alert('Failed to change email verification status');
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
          <h1 className="text-xl lg:text-2xl font-bold tracking-tight text-slate-900">Registered Vendor</h1>
          <div className="flex items-center space-x-2 text-xs text-slate-400 mt-2">
            <Home size={14} className="text-slate-400 cursor-pointer hover:text-blue-600" onClick={() => navigate('/')} />
            <span>&gt;</span>
            <span className="hover:text-blue-600 cursor-pointer" onClick={() => setActiveTab('dashboard')}>Vendor Management</span>
            <span>&gt;</span>
            <span className="text-slate-500 font-semibold">Registered Vendor</span>
          </div>
        </div>
      </div>

      {/* Main Panel Box */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-premium p-6">
        
        {/* Header elements */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <h3 className="text-sm font-bold text-slate-800">All Vendors</h3>
          <div className="relative">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search By Username or Email..."
              className="bg-white border border-slate-200 rounded-xl px-4 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200 transition-all w-64"
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
                <th className="p-3">Username</th>
                <th className="p-3">Email ID</th>
                <th className="p-3">Phone</th>
                <th className="p-3">Account Status</th>
                <th className="p-3">Email Status</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/50 transition">
                  <td className="p-3">
                    <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500" />
                  </td>
                  <td className="p-3 font-semibold text-slate-800">{item.username}</td>
                  <td className="p-3 font-semibold text-blue-500 hover:underline cursor-pointer">
                    <a href={`mailto:${item.email}`}>{item.email}</a>
                  </td>
                  <td className="p-3 font-semibold text-slate-650">{item.phone}</td>
                  
                  {/* Account Status Toggle */}
                  <td className="p-3 relative">
                    <button
                      onClick={() => setAccDropdownId(accDropdownId === item.id ? null : item.id)}
                      className={`inline-flex items-center space-x-1 px-3 py-1 rounded font-bold text-[10px] text-white transition ${
                        item.accountStatus === 'Active' ? 'bg-emerald-500 hover:bg-emerald-600' : 'bg-red-500 hover:bg-red-650'
                      }`}
                    >
                      <span>{item.accountStatus}</span>
                      <ChevronDown size={10} />
                    </button>
                    {accDropdownId === item.id && (
                      <div className="absolute left-3 mt-1 z-35 bg-white border border-slate-100 rounded-lg shadow-lg py-1 w-24 text-[10px] font-bold text-slate-700 animate-in fade-in duration-200">
                        <button
                          onClick={() => handleAccountStatusChange(item.id, 'Active')}
                          className="w-full text-left px-3 py-1.5 hover:bg-slate-50"
                        >
                          Active
                        </button>
                        <button
                          onClick={() => handleAccountStatusChange(item.id, 'Deactive')}
                          className="w-full text-left px-3 py-1.5 hover:bg-slate-50"
                        >
                          Deactive
                        </button>
                      </div>
                    )}
                  </td>

                  {/* Email Status Toggle */}
                  <td className="p-3 relative">
                    <button
                      onClick={() => setEmailDropdownId(emailDropdownId === item.id ? null : item.id)}
                      className={`inline-flex items-center space-x-1 px-3 py-1 rounded font-bold text-[10px] text-white transition ${
                        item.emailStatus === 'Verified' ? 'bg-emerald-500 hover:bg-emerald-600' : 'bg-red-500 hover:bg-red-650'
                      }`}
                    >
                      <span>{item.emailStatus}</span>
                      <ChevronDown size={10} />
                    </button>
                    {emailDropdownId === item.id && (
                      <div className="absolute left-3 mt-1 z-35 bg-white border border-slate-100 rounded-lg shadow-lg py-1 w-24 text-[10px] font-bold text-slate-700 animate-in fade-in duration-200">
                        <button
                          onClick={() => handleEmailStatusChange(item.id, 'Verified')}
                          className="w-full text-left px-3 py-1.5 hover:bg-slate-50"
                        >
                          Verified
                        </button>
                        <button
                          onClick={() => handleEmailStatusChange(item.id, 'Unverified')}
                          className="w-full text-left px-3 py-1.5 hover:bg-slate-50"
                        >
                          Unverified
                        </button>
                      </div>
                    )}
                  </td>

                  <td className="p-3 text-right relative">
                    <button
                      onClick={() => setActionDropdownId(actionDropdownId === item.id ? null : item.id)}
                      className="inline-flex items-center space-x-1.5 px-3 py-1 bg-indigo-650 hover:bg-indigo-700 text-white rounded text-[10px] font-bold transition active:scale-95"
                    >
                      <span>Select</span>
                      <ChevronDown size={8} />
                    </button>
                    {actionDropdownId === item.id && (
                      <div className="absolute right-3 mt-1 z-35 bg-white border border-slate-100 rounded-lg shadow-lg py-1 w-24 text-[10px] font-bold text-slate-700 text-left animate-in fade-in duration-200">
                        <button
                          onClick={() => handleDeleteVendor(item.id)}
                          className="w-full text-left px-3 py-1.5 text-red-650 hover:bg-red-50"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-6 text-xs text-slate-500 font-medium">
          <span>Showing 1 to {filtered.length} of {vendors.length} entries</span>
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
