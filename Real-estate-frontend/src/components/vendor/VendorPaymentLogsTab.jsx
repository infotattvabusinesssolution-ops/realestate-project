import React, { useState, useEffect } from 'react';
import { Home } from 'lucide-react';
import axiosInstance from '../../api/axiosInstance';

export function VendorPaymentLogsTab() {
  const [search, setSearch] = useState('');
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPaymentLogs = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get('/vendor/payment-logs');
        setLogs(res.data);
      } catch (err) {
        console.error('Failed to load payment logs:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPaymentLogs();
  }, []);

  const filteredLogs = logs.filter(log =>
    (log.txn || '').toLowerCase().includes(search.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'Success': return 'bg-emerald-500';
      case 'Pending': return 'bg-amber-500';
      case 'Failed': return 'bg-red-500';
      default: return 'bg-slate-400';
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
        <h2 className="text-lg font-bold text-slate-800">Payment Logs</h2>
        <div className="flex items-center space-x-2 text-[10px] font-bold text-slate-400">
          <Home size={12} className="text-slate-350" />
          <span>&gt;</span>
          <span>Payment</span>
          <span>&gt;</span>
          <span className="text-slate-650">Payment Logs</span>
        </div>
      </div>

      {/* Table Box */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-premium p-6">
        
        {/* Card Header & Search */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <h3 className="text-xs font-extrabold text-slate-800 tracking-wide uppercase">
            Payment Log
          </h3>
          <div className="relative">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by Transaction ID"
              className="bg-white border border-slate-200 rounded-xl pl-4 pr-10 py-1.5 text-xs text-slate-800 focus:outline-none w-56 font-medium"
            />
          </div>
        </div>

        {loading ? (
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-12 bg-slate-100 rounded-lg animate-pulse"></div>
            ))}
          </div>
        ) : filteredLogs.length === 0 ? (
          <div className="border border-slate-150 rounded-2xl py-16 flex flex-col items-center justify-center bg-slate-50/20 text-slate-400 font-extrabold text-sm tracking-wider uppercase">
            NO PAYMENT LOGS FOUND
          </div>
        ) : (
          /* Table */
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 font-bold bg-slate-50/50">
                  <th className="p-4">Transaction Id</th>
                  <th className="p-4">Amount</th>
                  <th className="p-4">Payment Status</th>
                  <th className="p-4">Payment Method</th>
                  <th className="p-4">Receipt</th>
                  <th className="p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredLogs.map((log, index) => (
                  <tr key={log._id || index} className="hover:bg-slate-50/30 transition bg-white border-b border-slate-50 text-[11px] font-medium text-slate-600">
                    <td className="p-4 font-bold text-slate-800">{log.txn}</td>
                    <td className="p-4 font-extrabold text-slate-800">{log.amount}</td>
                    <td className="p-4">
                      <span className={`px-2.5 py-0.5 ${getStatusColor(log.status)} text-white text-[9px] font-bold uppercase rounded-md`}>
                        {log.status}
                      </span>
                    </td>
                    <td className="p-4 font-bold text-slate-700">{log.method}</td>
                    <td className="p-4 text-slate-400">{log.receipt || '-'}</td>
                    <td className="p-4">
                      <button 
                        onClick={() => alert(`View receipt detail for TXN: ${log.txn}`)}
                        className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded text-[10px] font-bold tracking-wide transition active:scale-95"
                      >
                        Detail
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>

    </div>
  );
}
