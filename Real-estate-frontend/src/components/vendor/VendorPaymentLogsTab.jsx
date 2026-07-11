import React, { useState } from 'react';
import { Home } from 'lucide-react';

export function VendorPaymentLogsTab() {
  const [search, setSearch] = useState('');
  const logs = [
    {
      id: 'f359072f',
      amount: '$399.99',
      status: 'Success',
      method: 'PayPal',
      receipt: '-'
    }
  ];

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

        {/* Table */}
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
              {logs.map((log, index) => (
                <tr key={index} className="hover:bg-slate-50/30 transition bg-white border-b border-slate-50 text-[11px] font-medium text-slate-600">
                  <td className="p-4 font-bold text-slate-800">{log.id}</td>
                  <td className="p-4 font-extrabold text-slate-800">{log.amount}</td>
                  <td className="p-4">
                    <span className="px-2.5 py-0.5 bg-emerald-500 text-white text-[9px] font-bold uppercase rounded-md">
                      {log.status}
                    </span>
                  </td>
                  <td className="p-4 font-bold text-slate-700">{log.method}</td>
                  <td className="p-4 text-slate-400">{log.receipt}</td>
                  <td className="p-4">
                    <button 
                      onClick={() => alert(`View receipt detail for TXN: ${log.id}`)}
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

      </div>

    </div>
  );
}
