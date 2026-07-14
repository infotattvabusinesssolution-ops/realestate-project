import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, ChevronDown } from 'lucide-react';
import PaymentDetailsModal from '../modal/admin/PaymentDetailsModal';
import { getAdminPaymentsAPI, updateAdminPaymentAPI } from '../../api/api';

export default function PaymentLogTab({ setActiveTab }) {
  const navigate = useNavigate();
  const [searchTxn, setSearchTxn] = useState('');
  const [searchUser, setSearchUser] = useState('');
  const [paymentLogs, setPaymentLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTxnDetail, setSelectedTxnDetail] = useState(null);
  const [statusDropdownId, setStatusDropdownId] = useState(null);

  const fetchLogs = async () => {
    try {
      setLoading(true);
      const res = await getAdminPaymentsAPI();
      setPaymentLogs(res.data || []);
    } catch (err) {
      console.error('Error fetching payment logs:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await updateAdminPaymentAPI(id, { status: newStatus });
      setPaymentLogs(prev => prev.map(log => log._id === id ? res.data : log));
      setStatusDropdownId(null);
    } catch (err) {
      alert('Failed to update payment status');
    }
  };

  const filteredLogs = paymentLogs.filter(log => {
    const txnMatch = (log.txn || '').toLowerCase().includes(searchTxn.toLowerCase());
    const usernameMatch = (log.user?.name || '').toLowerCase().includes(searchUser.toLowerCase());
    return txnMatch && usernameMatch;
  });

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
          <h1 className="text-xl lg:text-2xl font-bold tracking-tight text-slate-900">Payment Logs</h1>
          <div className="flex items-center space-x-2 text-xs text-slate-400 mt-2">
            <Home size={14} className="text-slate-400 cursor-pointer hover:text-blue-600" onClick={() => navigate('/')} />
            <span>&gt;</span>
            <span className="hover:text-blue-600 cursor-pointer" onClick={() => setActiveTab('dashboard')}>Payment</span>
            <span>&gt;</span>
            <span className="text-slate-500 font-semibold">Payment Log Page</span>
          </div>
        </div>
      </div>

      {/* Main Table Box */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-premium p-6">
        
        {/* Table Header Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <h3 className="text-sm font-bold text-slate-800">Payment Log</h3>
          
          {/* Search Inputs */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <input
                type="text"
                value={searchTxn}
                onChange={(e) => setSearchTxn(e.target.value)}
                placeholder="Search by Transaction ID"
                className="bg-white border border-slate-200 rounded-xl px-4 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200 transition-all w-48"
              />
            </div>
            <div className="relative">
              <input
                type="text"
                value={searchUser}
                onChange={(e) => setSearchUser(e.target.value)}
                placeholder="Search by Username"
                className="bg-white border border-slate-200 rounded-xl px-4 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200 transition-all w-48"
              />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 font-bold">
                <th className="pb-4">Transaction Id</th>
                <th className="pb-4">Username</th>
                <th className="pb-4">Amount</th>
                <th className="pb-4">Payment Status</th>
                <th className="pb-4">Payment Method</th>
                <th className="pb-4">Receipt</th>
                <th className="pb-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredLogs.map(log => (
                <tr key={log._id} className="hover:bg-slate-50/50 transition">
                  <td className="py-4 font-mono font-semibold text-slate-800">{log.txn}</td>
                  <td className="py-4">
                    <span className="text-blue-600 font-semibold hover:underline cursor-pointer">
                      {log.user ? log.user.name : 'Unknown User'}
                    </span>
                  </td>
                  <td className="py-4 font-semibold text-slate-700">{log.amount}</td>
                  <td className="py-4 relative">
                    {log.hasDropdown ? (
                      <div className="inline-block">
                        <button
                          onClick={() => setStatusDropdownId(statusDropdownId === log._id ? null : log._id)}
                          className="flex items-center space-x-1 px-3 py-1 bg-green-500 hover:bg-green-600 text-white rounded font-bold text-[10px] transition"
                        >
                          <span>{log.status}</span>
                          <ChevronDown size={10} />
                        </button>
                        {statusDropdownId === log._id && (
                          <div className="absolute left-0 mt-1 z-30 bg-white border border-slate-100 rounded-lg shadow-lg py-1 w-24 text-[10px] font-bold text-slate-700 animate-in fade-in duration-200">
                            <button 
                              onClick={() => handleStatusChange(log._id, 'Success')}
                              className="w-full text-left px-3 py-1.5 hover:bg-slate-50 hover:text-slate-900"
                            >
                              Success
                            </button>
                            <button 
                              onClick={() => handleStatusChange(log._id, 'Pending')}
                              className="w-full text-left px-3 py-1.5 hover:bg-slate-50 hover:text-slate-900"
                            >
                              Pending
                            </button>
                            <button 
                              onClick={() => handleStatusChange(log._id, 'Failed')}
                              className="w-full text-left px-3 py-1.5 hover:bg-red-50 hover:text-red-600"
                            >
                              Failed
                            </button>
                          </div>
                        )}
                      </div>
                    ) : (
                      <span className={`inline-flex px-3 py-1 text-white rounded font-bold text-[10px] ${
                        log.status === 'Success' ? 'bg-emerald-500' :
                        log.status === 'Pending' ? 'bg-amber-500' : 'bg-red-500'
                      }`}>
                        {log.status}
                      </span>
                    )}
                  </td>
                  <td className="py-4 text-slate-500 font-semibold">{log.method}</td>
                  <td className="py-4 text-slate-400 font-semibold">{log.receipt}</td>
                  <td className="py-4">
                    <button
                      onClick={() => setSelectedTxnDetail(log)}
                      className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded text-[10px] font-bold transition active:scale-95 shadow-sm"
                    >
                      Detail
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

      <PaymentDetailsModal
        isOpen={!!selectedTxnDetail}
        onClose={() => setSelectedTxnDetail(null)}
        log={selectedTxnDetail}
      />

    </div>
  );
}
