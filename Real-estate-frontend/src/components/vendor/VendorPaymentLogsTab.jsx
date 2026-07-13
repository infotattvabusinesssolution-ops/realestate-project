import React, { useState, useEffect } from 'react';
import { Home, X, CheckCircle, HelpCircle, XCircle } from 'lucide-react';
import axiosInstance from '../../api/axiosInstance';

export function VendorPaymentLogsTab() {
  const [search, setSearch] = useState('');
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLog, setSelectedLog] = useState(null); // for Receipt Details modal

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

  useEffect(() => {
    fetchPaymentLogs();
  }, []);

  const filteredLogs = logs.filter(log =>
    (log.txn || '').toLowerCase().includes(search.toLowerCase()) ||
    (log.package?.title || '').toLowerCase().includes(search.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'Success': return 'bg-emerald-500 text-white';
      case 'Pending': return 'bg-amber-500 text-white';
      case 'Failed': return 'bg-red-500 text-white';
      default: return 'bg-slate-400 text-white';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Success': return <CheckCircle size={32} className="text-emerald-500" />;
      case 'Pending': return <HelpCircle size={32} className="text-amber-500" />;
      case 'Failed': return <XCircle size={32} className="text-red-500" />;
      default: return null;
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
          <span className="text-slate-655">Payment Logs</span>
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
              placeholder="Search by Txn ID or Package"
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
                  <th className="p-4">Package</th>
                  <th className="p-4">Amount</th>
                  <th className="p-4">Payment Status</th>
                  <th className="p-4">Payment Method</th>
                  <th className="p-4">Purchase Date</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredLogs.map((log, index) => (
                  <tr key={log._id || index} className="hover:bg-slate-50/30 transition bg-white border-b border-slate-50 text-[11px] font-medium text-slate-650">
                    <td className="p-4 font-bold text-slate-800">{log.txn}</td>
                    <td className="p-4 font-extrabold text-blue-600">
                      {log.package ? log.package.title : 'Subscription Plan'}
                    </td>
                    <td className="p-4 font-extrabold text-slate-800">{log.amount}</td>
                    <td className="p-4">
                      <span className={`px-2.5 py-0.5 ${getStatusColor(log.status)} text-[9px] font-bold uppercase rounded-md`}>
                        {log.status}
                      </span>
                    </td>
                    <td className="p-4 font-bold text-slate-700">{log.method}</td>
                    <td className="p-4 text-slate-400">
                      {log.createdAt ? new Date(log.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '—'}
                    </td>
                    <td className="p-4 text-right">
                      <button 
                        onClick={() => setSelectedLog(log)}
                        className="px-3 py-1.5 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-[10px] font-bold tracking-wide transition active:scale-95 shadow-md shadow-blue-500/10"
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

      {/* RECEIPT DETAIL MODAL */}
      {selectedLog && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-2xl w-full max-w-md animate-in zoom-in-95 duration-200 overflow-hidden text-xs">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
              <span className="font-extrabold text-slate-700 uppercase tracking-wider text-[10px]">Receipt Information</span>
              <button 
                onClick={() => setSelectedLog(null)} 
                className="p-1 hover:bg-slate-200 rounded-lg transition"
              >
                <X size={16} className="text-slate-400" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              <div className="flex flex-col items-center text-center space-y-2 border-b border-slate-100 pb-5">
                {getStatusIcon(selectedLog.status)}
                <h3 className="text-sm font-black text-slate-900 mt-1">
                  {selectedLog.package ? selectedLog.package.title : 'Subscription Plan'}
                </h3>
                <span className="text-lg font-black text-indigo-650">{selectedLog.amount}</span>
                <span className="text-[10px] text-slate-400 font-medium leading-none">
                  Transaction status: {selectedLog.status}
                </span>
              </div>

              <div className="space-y-3 font-semibold text-slate-700">
                <div className="flex justify-between">
                  <span className="text-slate-400">Transaction ID:</span>
                  <span className="text-slate-800 font-bold">{selectedLog.txn}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Payment Gateway:</span>
                  <span className="text-slate-800 font-bold">{selectedLog.method}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Transaction Time:</span>
                  <span className="text-slate-800 font-bold">
                    {selectedLog.createdAt ? new Date(selectedLog.createdAt).toLocaleString() : '—'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Receipt reference:</span>
                  <span className="text-slate-500">{selectedLog.receipt || '—'}</span>
                </div>
              </div>

              {/* Extra checkmark */}
              {selectedLog.status === 'Success' && (
                <div className="bg-emerald-50 text-emerald-700 p-3.5 rounded-xl border border-emerald-100 text-[10px] font-bold text-center leading-relaxed">
                  Thank you! Your active package features have been successfully provisioned.
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end px-6 py-4 border-t border-slate-100 bg-slate-50/50">
              <button 
                onClick={() => setSelectedLog(null)}
                className="px-5 py-2 bg-slate-900 hover:bg-slate-950 text-white rounded-xl text-[10px] font-bold transition active:scale-95"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
