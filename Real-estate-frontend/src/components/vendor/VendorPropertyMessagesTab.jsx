import React, { useState, useEffect } from 'react';
import { Home, ChevronDown, Mail, Phone, Trash2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import axiosInstance from '../../api/axiosInstance';
import { io } from 'socket.io-client';

export default function VendorPropertyMessagesTab() {
  const { user } = useAuth();
  const [search, setSearch] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch leads on mount
  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const res = await axiosInstance.get('/vendor/leads');
        const normalized = res.data.map(lead => ({
          id: lead._id,
          property: lead.property ? lead.property.name : 'General Inquiry',
          name: lead.sender ? lead.sender.name : 'Anonymous',
          email: lead.sender ? lead.sender.email : 'N/A',
          phone: lead.sender ? (lead.sender.phone || 'N/A') : 'N/A',
          text: lead.text
        }));
        setMessages(normalized);
        setLoading(false);
      } catch (err) {
        console.error('Failed to load leads:', err);
        setLoading(false);
      }
    };
    fetchLeads();
  }, []);

  // Listen for real-time messages via socket
  useEffect(() => {
    if (!user) return;
    const socket = io(import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000');

    // Join personal user room to receive notifications and inquiries
    socket.emit('join_user', user._id);

    socket.on('receive_inquiry_message', (msg) => {
      const incomingLead = {
        id: msg._id || Date.now().toString(),
        property: msg.propertyName || 'General Inquiry',
        name: msg.senderName || 'Anonymous',
        email: msg.senderEmail || 'N/A',
        phone: msg.senderPhone || 'N/A',
        text: msg.text
      };
      setMessages(prev => [incomingLead, ...prev]);
    });

    return () => {
      socket.disconnect();
    };
  }, [user]);

  const filteredMessages = messages.filter(msg => 
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
          <h3 className="text-xs font-extrabold text-slate-800 tracking-wide uppercase">All Message</h3>
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
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredMessages.map((msg, index) => (
                <tr key={msg.id} className="hover:bg-slate-50/50 transition bg-white">
                  <td className="p-3 text-center text-slate-500 font-bold">{index + 1}</td>
                  <td className="p-3 font-semibold text-blue-600 hover:underline cursor-pointer">{msg.property}</td>
                  <td className="p-3 text-slate-800 font-bold">{msg.name}</td>
                  <td className="p-3 text-slate-500 font-medium">{msg.email}</td>
                  <td className="p-3 text-slate-500 font-semibold">{msg.phone}</td>
                  <td className="p-3 text-right">
                    <button type="button" className="px-3 py-1.5 bg-indigo-650 hover:bg-indigo-750 text-white rounded text-[10px] font-bold flex items-center space-x-1 inline-flex">
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
          <span>Showing 1 to {filteredMessages.length} of {messages.length} entries</span>
          <div className="flex items-center space-x-1.5">
            <button className="px-3 py-1 bg-slate-100 rounded text-slate-700 cursor-not-allowed">Previous</button>
            <button className="px-3 py-1 bg-blue-600 text-white rounded font-bold">1</button>
            <button className="px-3 py-1 bg-slate-100 rounded text-slate-700 cursor-not-allowed">Next</button>
          </div>
        </div>

      </div>
    </div>
  );
}
