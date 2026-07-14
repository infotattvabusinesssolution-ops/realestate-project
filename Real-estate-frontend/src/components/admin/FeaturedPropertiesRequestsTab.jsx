import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, Trash2, ChevronDown, Loader2 } from 'lucide-react';
import { getAdminFeaturedRequestsAPI, deleteAdminFeaturedRequestAPI, updateAdminFeaturedRequestAPI } from '../../api/api';

export default function FeaturedPropertiesRequestsTab({ setActiveTab, filterType }) {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTxn, setSearchTxn] = useState('');
  const [searchTitle, setSearchTitle] = useState('');
  const [statusDropdownId, setStatusDropdownId] = useState(null);

  const displayTitle = {
    all: 'All Request',
    pending: 'Pending Request',
    accepted: 'Accepted Request',
    rejected: 'Rejected Request'
  }[filterType] || 'Requests';

  // Map filterType to backend query param
  const statusMap = {
    all: 'all',
    pending: 'Pending',
    accepted: 'Featured',
    rejected: 'Rejected'
  };

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const status = statusMap[filterType] || 'all';
      const res = await getAdminFeaturedRequestsAPI({ status });
      setRequests(res.data);
    } catch (err) {
      console.error('Error fetching featured requests:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, [filterType]);

  const filteredRequests = useMemo(() => {
    let list = requests;
    if (searchTxn) {
      list = list.filter(r => r.txnNo.toLowerCase().includes(searchTxn.toLowerCase()));
    }
    if (searchTitle) {
      const title = searchTitle.toLowerCase();
      list = list.filter(r => {
        const propTitle = r.property ? (r.property.title || r.property.name || '') : '';
        return propTitle.toLowerCase().includes(title);
      });
    }
    return list;
  }, [requests, searchTxn, searchTitle]);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this feature request?')) return;
    try {
      await deleteAdminFeaturedRequestAPI(id);
      setRequests(prev => prev.filter(r => r._id !== id));
    } catch (err) {
      alert('Failed to delete request');
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await updateAdminFeaturedRequestAPI(id, {
        featuredStatus: newStatus,
      });
      setRequests(prev => prev.map(r => r._id === id ? res.data : r));
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
          <h1 className="text-xl lg:text-2xl font-bold tracking-tight text-slate-900">{displayTitle}</h1>
          <div className="flex items-center space-x-2 text-xs text-slate-400 mt-2">
            <Home size={14} className="text-slate-400 cursor-pointer hover:text-blue-600" onClick={() => navigate('/')} />
            <span>&gt;</span>
            <span className="hover:text-blue-600 cursor-pointer" onClick={() => setActiveTab('dashboard')}>Feature Properties</span>
            <span>&gt;</span>
            <span className="text-slate-500 font-semibold">{displayTitle}</span>
          </div>
        </div>
      </div>

      {/* Main Panel Box */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-premium p-6">
        
        {/* Filters Top Form */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 mb-8 bg-slate-50/50 p-6 rounded-2xl border border-slate-100/50">
          <div className="flex flex-col space-y-1.5">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Language</label>
            <select className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-700 focus:outline-none">
              <option>Select a Language</option>
              <option>English</option>
            </select>
          </div>

          <div className="flex flex-col space-y-1.5">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Transaction Number</label>
            <input
              type="text"
              placeholder="Search Here..."
              value={searchTxn}
              onChange={(e) => setSearchTxn(e.target.value)}
              className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none"
            />
          </div>

          <div className="flex flex-col space-y-1.5">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Property Title</label>
            <input
              type="text"
              placeholder="Search Here..."
              value={searchTitle}
              onChange={(e) => setSearchTitle(e.target.value)}
              className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none"
            />
          </div>

          <div className="flex flex-col space-y-1.5">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Payment Status</label>
            <select className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-700 focus:outline-none">
              <option>All</option>
              <option>Complete</option>
              <option>Pending</option>
            </select>
          </div>

          <div className="flex flex-col space-y-1.5 justify-end">
            <button
              onClick={fetchRequests}
              className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition active:scale-95 shadow-md shadow-blue-500/10"
            >
              Search
            </button>
          </div>
        </div>

        {/* Content list block */}
        {filteredRequests.length === 0 ? (
          <div className="py-16 text-center border-t border-slate-100">
            <h3 className="text-slate-400 font-extrabold text-sm tracking-wider uppercase">No Request Found Yet</h3>
          </div>
        ) : (
          <>
            {/* Show Entries */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 text-xs text-slate-500">
              <div className="flex items-center space-x-2">
                <span>Show</span>
                <select className="bg-white border border-slate-200 rounded-lg px-2 py-1 text-xs focus:outline-none">
                  <option value="10">10</option>
                </select>
                <span>entries</span>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-400 font-bold bg-slate-50/50">
                    <th className="p-3">Transaction No</th>
                    <th className="p-3">Property Title</th>
                    <th className="p-3">Vendor</th>
                    <th className="p-3">Pay Via</th>
                    <th className="p-3">Payment Status</th>
                    <th className="p-3">Attachment/Receipt</th>
                    <th className="p-3">Featured Status</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {filteredRequests.map((item) => (
                    <tr key={item._id} className="hover:bg-slate-50/50 transition">
                      <td className="p-3 font-semibold text-slate-700">{item.txnNo}</td>
                      <td className="p-3 font-bold text-blue-600 max-w-xs hover:underline cursor-pointer">
                        {item.property ? (item.property.title || item.property.name) : 'N/A'}
                      </td>
                      <td className="p-3">
                        <span className="inline-flex px-2 py-0.5 rounded bg-blue-50 text-blue-600 font-bold text-[9px] hover:underline cursor-pointer">
                          {item.vendor ? item.vendor.name : 'Unknown'}
                        </span>
                      </td>
                      <td className="p-3 text-slate-650 font-semibold">{item.payVia}</td>
                      <td className="p-3">
                        <span className={`inline-flex px-2 py-0.5 rounded font-bold text-[9px] uppercase ${
                          item.paymentStatus === 'Complete' ? 'bg-emerald-500 text-white' :
                          item.paymentStatus === 'Pending' ? 'bg-amber-500 text-white' :
                          'bg-red-500 text-white'
                        }`}>
                          {item.paymentStatus}
                        </span>
                      </td>
                      <td className="p-3 text-slate-450 font-semibold">{item.receipt}</td>
                      <td className="p-3 relative">
                        <button
                          onClick={() => setStatusDropdownId(statusDropdownId === item._id ? null : item._id)}
                          className={`inline-flex items-center space-x-1 px-2 py-0.5 rounded font-bold text-[9px] uppercase cursor-pointer ${
                            item.featuredStatus === 'Featured' ? 'bg-emerald-500 text-white' :
                            item.featuredStatus === 'Pending' ? 'bg-amber-500 text-white' :
                            'bg-red-500 text-white'
                          }`}
                        >
                          <span>{item.featuredStatus}</span>
                          <ChevronDown size={8} />
                        </button>
                        {statusDropdownId === item._id && (
                          <div className="absolute left-3 mt-1 z-30 bg-white border border-slate-100 rounded-lg shadow-lg py-1 w-24 text-[10px] font-bold text-slate-700 animate-in fade-in duration-200">
                            <button onClick={() => handleStatusChange(item._id, 'Featured')} className="w-full text-left px-3 py-1.5 hover:bg-emerald-50">Featured</button>
                            <button onClick={() => handleStatusChange(item._id, 'Pending')} className="w-full text-left px-3 py-1.5 hover:bg-amber-50">Pending</button>
                            <button onClick={() => handleStatusChange(item._id, 'Rejected')} className="w-full text-left px-3 py-1.5 hover:bg-red-50">Rejected</button>
                          </div>
                        )}
                      </td>
                      <td className="p-3 text-right">
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="inline-flex items-center justify-center p-2 bg-red-500 hover:bg-red-650 text-white rounded transition active:scale-95 shadow-sm"
                        >
                          <Trash2 size={12} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Footer */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-6 text-xs text-slate-500 font-medium">
              <span>Showing 1 to {filteredRequests.length} of {requests.length} entries</span>
              <div className="flex items-center space-x-1.5">
                <button className="px-3 py-1 bg-slate-100 hover:bg-slate-200 rounded text-slate-700 transition">Previous</button>
                <button className="px-3 py-1 bg-blue-600 text-white rounded font-bold">1</button>
                <button className="px-3 py-1 bg-slate-100 hover:bg-slate-200 rounded text-slate-700 transition">Next</button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
