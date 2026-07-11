import React, { useState } from 'react';
import { Home, ChevronDown } from 'lucide-react';

export default function AgentPropertyMessagesTab() {
  const [search, setSearch] = useState('');
  
  const mockMessages = [
    { id: 1, property: 'Serene Meadow Villa', name: 'David Smith', email: 'david.smith@gmail.com', phone: '+1 (555) 234-5678' },
    { id: 2, property: 'Modern Glass Penthouse', name: 'Alice Cooper', email: 'alice.cooper@yahoo.com', phone: '+1 (555) 987-6543' },
    { id: 3, property: 'Urban Loft Apartment', name: 'Arthur Dent', email: 'arthur.dent@galaxy.com', phone: '+44 7911 123456' },
    { id: 4, property: 'Whispering Pines Estate', name: 'Sarah Jenkins', email: 'sarah.j@gmail.com', phone: '+1 (555) 345-6789' }
  ];

  const filteredMessages = mockMessages.filter(msg => 
    msg.property.toLowerCase().includes(search.toLowerCase()) ||
    msg.name.toLowerCase().includes(search.toLowerCase()) ||
    msg.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header Title & Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
        <h2 className="text-lg font-bold text-slate-800">Property Messages</h2>
        <div className="flex items-center space-x-2 text-[10px] font-bold text-slate-400">
          <Home size={12} className="text-slate-350" />
          <span>&gt;</span>
          <span className="text-slate-650">Property Messages</span>
        </div>
      </div>

      {/* Main Table Box */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-premium p-6">
        
        {/* Table Title */}
        <div className="pb-4 border-b border-slate-55 mb-6">
          <h3 className="text-xs font-extrabold text-slate-800 tracking-wide uppercase">All Messages</h3>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 text-xs text-slate-500 font-medium">
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
              className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-800 focus:outline-none w-48 font-medium"
            />
          </div>
        </div>

        {/* Messages Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 font-bold bg-slate-50/50">
                <th className="p-3 w-12 text-center">#</th>
                <th className="p-3">Property</th>
                <th className="p-3">Name</th>
                <th className="p-3">Email ID</th>
                <th className="p-3">Phone</th>
                <th className="p-3 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredMessages.map((msg, index) => (
                <tr key={msg.id} className="hover:bg-slate-50/50 transition bg-white">
                  <td className="p-3 text-center text-slate-500 font-bold">{index + 1}</td>
                  <td className="p-3 font-semibold text-green-600 hover:underline cursor-pointer">{msg.property}</td>
                  <td className="p-3 text-slate-800 font-bold">{msg.name}</td>
                  <td className="p-3 text-slate-500 font-medium">{msg.email}</td>
                  <td className="p-3 text-slate-500 font-semibold">{msg.phone}</td>
                  <td className="p-3 text-right">
                    <button type="button" className="px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white rounded text-[10px] font-bold flex items-center space-x-1 inline-flex transition active:scale-95">
                      <span>Select</span>
                      <ChevronDown size={8} />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredMessages.length === 0 && (
                <tr>
                  <td colSpan="6" className="p-4 text-center text-slate-400">No messages found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer info */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-6 text-xs text-slate-500 font-medium">
          <span>Showing 1 to {filteredMessages.length} of {mockMessages.length} entries</span>
          <div className="flex items-center space-x-1.5">
            <button className="px-3 py-1 bg-slate-100 rounded text-slate-700 cursor-not-allowed">Previous</button>
            <button className="px-3 py-1 bg-green-600 text-white rounded font-bold">1</button>
            <button className="px-3 py-1 bg-slate-100 rounded text-slate-700 cursor-not-allowed">Next</button>
          </div>
        </div>

      </div>
    </div>
  );
}
