import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, ChevronDown, Search } from 'lucide-react';

const initialVendors = [
  { id: 1, username: 'e_abbasijk', email: 'e_abbasijk@yahoo.com', phone: '-', accountStatus: 'Deactive', emailStatus: 'Unverified' },
  { id: 2, username: 'a', email: 'xyz@gmail.com', phone: '-', accountStatus: 'Deactive', emailStatus: 'Unverified' },
  { id: 3, username: 'superadmin', email: 'superadmin@gmail.com', phone: '-', accountStatus: 'Deactive', emailStatus: 'Unverified' },
  { id: 4, username: 'wasays', email: 'abdulwasays06@gmail.com', phone: '-', accountStatus: 'Deactive', emailStatus: 'Unverified' },
  { id: 5, username: 'wasay', email: 'wasay@gmail.com', phone: '-', accountStatus: 'Deactive', emailStatus: 'Unverified' },
  { id: 6, username: 'phillip_paxton', email: 'phillip_paxton@example.com', phone: '+49860195986035', accountStatus: 'Active', emailStatus: 'Verified' },
  { id: 7, username: 'leichhardt', email: 'justinleichhardt@example.com', phone: '+69285960125', accountStatus: 'Active', emailStatus: 'Verified' },
  { id: 8, username: 'mackenzie', email: 'mackenziebuntine@gmail.com', phone: '+56567566657567', accountStatus: 'Active', emailStatus: 'Verified' },
  { id: 9, username: 'gledson', email: 'satwo7608@cenurbano.com', phone: '+54654675467567', accountStatus: 'Active', emailStatus: 'Verified' }
];

export default function VendorsManagementTab({ setActiveTab }) {
  const navigate = useNavigate();
  const [vendors, setVendors] = useState(initialVendors);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusDropdownId, setStatusDropdownId] = useState(null);
  const [emailDropdownId, setEmailDropdownId] = useState(null);

  const filteredVendors = useMemo(() => {
    if (!searchQuery) return vendors;
    const q = searchQuery.toLowerCase();
    return vendors.filter(
      v => v.username.toLowerCase().includes(q) || v.email.toLowerCase().includes(q) || v.phone.includes(q)
    );
  }, [searchQuery, vendors]);

  const handleAccountStatusChange = (id, newStatus) => {
    setVendors(vendors.map(v => v.id === id ? { ...v, accountStatus: newStatus } : v));
    setStatusDropdownId(null);
  };

  const handleEmailStatusChange = (id, newStatus) => {
    setVendors(vendors.map(v => v.id === id ? { ...v, emailStatus: newStatus } : v));
    setEmailDropdownId(null);
  };

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

      {/* Main Panel */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-premium p-6">

        {/* Header: Title + Search */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <h3 className="text-sm font-bold text-slate-800">All Vendors</h3>

          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search By Username or Email"
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
                <th className="p-3">Username</th>
                <th className="p-3">Email ID</th>
                <th className="p-3">Phone</th>
                <th className="p-3">Account Status</th>
                <th className="p-3">Email Status</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredVendors.map((vendor) => (
                <tr key={vendor.id} className="hover:bg-slate-50/50 transition">
                  <td className="p-3">
                    <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500" />
                  </td>
                  <td className="p-3 font-bold text-blue-600">{vendor.username}</td>
                  <td className="p-3 text-blue-500 font-medium">{vendor.email}</td>
                  <td className="p-3 text-slate-600 font-medium">{vendor.phone}</td>

                  {/* Account Status Dropdown */}
                  <td className="p-3 relative">
                    <button
                      onClick={() => setStatusDropdownId(statusDropdownId === vendor.id ? null : vendor.id)}
                      className={`inline-flex items-center space-x-1 px-3 py-1 rounded font-bold text-[10px] transition ${
                        vendor.accountStatus === 'Active'
                          ? 'bg-emerald-500 hover:bg-emerald-600 text-white'
                          : 'bg-red-500 hover:bg-red-600 text-white'
                      }`}
                    >
                      <span>{vendor.accountStatus}</span>
                      <ChevronDown size={10} />
                    </button>
                    {statusDropdownId === vendor.id && (
                      <div className="absolute left-3 mt-1 z-30 bg-white border border-slate-100 rounded-lg shadow-lg py-1 w-28 text-[10px] font-bold text-slate-700 animate-in fade-in duration-200">
                        <button
                          onClick={() => handleAccountStatusChange(vendor.id, 'Active')}
                          className="w-full text-left px-3 py-1.5 hover:bg-emerald-50 hover:text-emerald-600"
                        >
                          Active
                        </button>
                        <button
                          onClick={() => handleAccountStatusChange(vendor.id, 'Deactive')}
                          className="w-full text-left px-3 py-1.5 hover:bg-red-50 hover:text-red-600"
                        >
                          Deactive
                        </button>
                      </div>
                    )}
                  </td>

                  {/* Email Status Dropdown */}
                  <td className="p-3 relative">
                    <button
                      onClick={() => setEmailDropdownId(emailDropdownId === vendor.id ? null : vendor.id)}
                      className={`inline-flex items-center space-x-1 px-3 py-1 rounded font-bold text-[10px] transition ${
                        vendor.emailStatus === 'Verified'
                          ? 'bg-emerald-500 hover:bg-emerald-600 text-white'
                          : 'bg-amber-500 hover:bg-amber-600 text-white'
                      }`}
                    >
                      <span>{vendor.emailStatus}</span>
                      <ChevronDown size={10} />
                    </button>
                    {emailDropdownId === vendor.id && (
                      <div className="absolute left-3 mt-1 z-30 bg-white border border-slate-100 rounded-lg shadow-lg py-1 w-28 text-[10px] font-bold text-slate-700 animate-in fade-in duration-200">
                        <button
                          onClick={() => handleEmailStatusChange(vendor.id, 'Verified')}
                          className="w-full text-left px-3 py-1.5 hover:bg-emerald-50 hover:text-emerald-600"
                        >
                          Verified
                        </button>
                        <button
                          onClick={() => handleEmailStatusChange(vendor.id, 'Unverified')}
                          className="w-full text-left px-3 py-1.5 hover:bg-amber-50 hover:text-amber-600"
                        >
                          Unverified
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
          <span>Showing 1 to {filteredVendors.length} of {vendors.length} entries</span>

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
