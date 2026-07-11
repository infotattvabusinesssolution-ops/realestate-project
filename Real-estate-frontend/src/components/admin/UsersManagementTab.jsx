import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, ChevronDown, Search } from 'lucide-react';
import axiosInstance from '../../api/axiosInstance';

export default function UsersManagementTab({ setActiveTab }) {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusDropdownId, setStatusDropdownId] = useState(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get('/admin/users?role=customer');
      const normalized = res.data.map(u => ({
        id: u._id,
        name: u.name,
        username: u.name,
        email: u.email,
        emailStatus: 'Verified',
        accountStatus: u.isActive ? 'Active' : 'Deactive'
      }));
      setUsers(normalized);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching admin users:', err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = useMemo(() => {
    if (!searchQuery) return users;
    const q = searchQuery.toLowerCase();
    return users.filter(
      u => (u.username?.toLowerCase().includes(q) || u.email?.toLowerCase().includes(q) || u.name?.toLowerCase().includes(q))
    );
  }, [searchQuery, users]);

  const handleAccountStatusChange = async (id, newStatus) => {
    try {
      await axiosInstance.put(`/admin/users/${id}/status`, {
        isActive: newStatus === 'Active'
      });
      setUsers(users.map(u => u.id === id ? { ...u, accountStatus: newStatus } : u));
      setStatusDropdownId(null);
    } catch (err) {
      alert('Failed to change user status');
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
          <h1 className="text-xl lg:text-2xl font-bold tracking-tight text-slate-900">Registered Users</h1>
          <div className="flex items-center space-x-2 text-xs text-slate-400 mt-2">
            <Home size={14} className="text-slate-400 cursor-pointer hover:text-blue-600" onClick={() => navigate('/')} />
            <span>&gt;</span>
            <span className="hover:text-blue-600 cursor-pointer" onClick={() => setActiveTab('dashboard')}>Users Management</span>
            <span>&gt;</span>
            <span className="text-slate-500 font-semibold">Registered Users</span>
          </div>
        </div>
      </div>

      {/* Main Panel */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-premium p-6">

        {/* Header: Title + Search */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <h3 className="text-sm font-bold text-slate-800">All Users</h3>

          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search By Username or Email ID"
              className="bg-white border border-slate-200 rounded-xl pl-4 pr-10 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200 transition-all w-64"
            />
            <Search size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
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
                <th className="p-3">Username</th>
                <th className="p-3">Email</th>
                <th className="p-3">Email Status</th>
                <th className="p-3">Account Status</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50/50 transition">
                  <td className="p-3">
                    <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500" />
                  </td>
                  <td className="p-3 font-bold text-slate-800">{user.name || '-'}</td>
                  <td className="p-3 font-bold text-blue-600">{user.username}</td>
                  <td className="p-3 text-blue-500 font-medium">{user.email}</td>

                  {/* Email Status Badge */}
                  <td className="p-3">
                    <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded font-bold text-[10px] ${
                      user.emailStatus === 'Verified'
                        ? 'bg-emerald-500 text-white'
                        : 'bg-amber-500 text-white'
                    }`}>
                      <span>{user.emailStatus}</span>
                      <ChevronDown size={10} />
                    </span>
                  </td>

                  {/* Account Status Dropdown */}
                  <td className="p-3 relative">
                    <button
                      onClick={() => setStatusDropdownId(statusDropdownId === user.id ? null : user.id)}
                      className={`inline-flex items-center space-x-1 px-3 py-1 rounded font-bold text-[10px] transition ${
                        user.accountStatus === 'Active'
                          ? 'bg-emerald-500 hover:bg-emerald-600 text-white'
                          : 'bg-red-500 hover:bg-red-600 text-white'
                      }`}
                    >
                      <span>{user.accountStatus}</span>
                      <ChevronDown size={10} />
                    </button>
                    {statusDropdownId === user.id && (
                      <div className="absolute left-3 mt-1 z-30 bg-white border border-slate-100 rounded-lg shadow-lg py-1 w-28 text-[10px] font-bold text-slate-700 animate-in fade-in duration-200">
                        <button
                          onClick={() => handleAccountStatusChange(user.id, 'Active')}
                          className="w-full text-left px-3 py-1.5 hover:bg-emerald-50 hover:text-emerald-600"
                        >
                          Active
                        </button>
                        <button
                          onClick={() => handleAccountStatusChange(user.id, 'Deactive')}
                          className="w-full text-left px-3 py-1.5 hover:bg-red-50 hover:text-red-600"
                        >
                          Deactive
                        </button>
                      </div>
                    )}
                  </td>

                  {/* Actions */}
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

        {/* Table Footer */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-6 text-xs text-slate-500 font-medium">
          <span>Showing 1 to {filteredUsers.length} of {users.length} entries</span>

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
