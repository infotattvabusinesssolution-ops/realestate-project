import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, Trash2 } from 'lucide-react';
import axiosInstance from '../../api/axiosInstance';

export default function PropertyMessagesTab({ setActiveTab }) {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axiosInstance.get('/admin/messages');
        setMessages(res.data);
      } catch (err) {
        console.error('Error fetching messages:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchMessages();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this message?')) return;
    try {
      await axiosInstance.delete(`/admin/messages/${id}`);
      setMessages(prev => prev.filter(m => m._id !== id));
    } catch (err) {
      alert('Failed to delete message');
    }
  };

  const filtered = useMemo(() => {
    if (!search) return messages;
    const q = search.toLowerCase();
    return messages.filter(m => {
      const propName = m.property ? (m.property.name || '') : '';
      const senderName = m.sender ? m.sender.name : '';
      const senderEmail = m.sender ? m.sender.email : '';
      const senderPhone = m.sender ? (m.sender.phone || '') : '';
      return (
        propName.toLowerCase().includes(q) ||
        senderName.toLowerCase().includes(q) ||
        senderEmail.toLowerCase().includes(q) ||
        senderPhone.includes(q)
      );
    });
  }, [search, messages]);

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
          <h1 className="text-xl lg:text-2xl font-bold tracking-tight text-slate-900">Messages</h1>
          <div className="flex items-center space-x-2 text-xs text-slate-400 mt-2">
            <Home size={14} className="text-slate-400 cursor-pointer hover:text-blue-600" onClick={() => navigate('/')} />
            <span>&gt;</span>
            <span className="text-slate-500 font-semibold">Messages</span>
          </div>
        </div>
      </div>

      {/* Main Panel Box */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-premium p-6">
        
        {/* Header elements */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <h3 className="text-sm font-bold text-slate-800">All Message</h3>
        </div>

        {/* Filters Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 text-xs text-slate-500">
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
              className="bg-white border border-slate-200 rounded-lg px-3 py-1 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-200 transition-all w-48"
            />
          </div>
        </div>

        {/* Table */}
        {filtered.length === 0 ? (
          <div className="py-16 text-center border-t border-slate-100">
            <h3 className="text-slate-400 font-extrabold text-sm tracking-wider uppercase">No Messages Found</h3>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 font-bold bg-slate-50/50">
                  <th className="p-3 w-12">#</th>
                  <th className="p-3">Property</th>
                  <th className="p-3">Name</th>
                  <th className="p-3">Email ID</th>
                  <th className="p-3">Phone</th>
                  <th className="p-3">Message</th>
                  <th className="p-3">Date</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filtered.map((msg, index) => (
                  <tr key={msg._id} className="hover:bg-slate-50/50 transition">
                    <td className="p-3 font-semibold text-slate-500">{index + 1}</td>
                    <td className="p-3 font-bold text-blue-600 max-w-xs hover:underline cursor-pointer">
                      {msg.property ? msg.property.name : 'N/A'}
                    </td>
                    <td className="p-3 font-bold text-slate-800">
                      {msg.sender ? msg.sender.name : 'Unknown'}
                    </td>
                    <td className="p-3 font-semibold text-blue-500 hover:underline cursor-pointer">
                      {msg.sender ? (
                        <a href={`mailto:${msg.sender.email}`}>{msg.sender.email}</a>
                      ) : 'N/A'}
                    </td>
                    <td className="p-3 font-semibold text-blue-500 hover:underline cursor-pointer">
                      {msg.sender && msg.sender.phone ? (
                        <a href={`tel:${msg.sender.phone}`}>{msg.sender.phone}</a>
                      ) : '-'}
                    </td>
                    <td className="p-3 text-slate-600 font-medium max-w-xs truncate">
                      {msg.text}
                    </td>
                    <td className="p-3 text-slate-450 font-medium text-[10px]">
                      {new Date(msg.createdAt).toLocaleDateString('en-US', {
                        month: 'short', day: 'numeric', year: 'numeric'
                      })}
                    </td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => handleDelete(msg._id)}
                        className="inline-flex items-center justify-center p-2 bg-red-500 hover:bg-red-600 text-white rounded transition active:scale-95 shadow-sm"
                      >
                        <Trash2 size={12} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Footer */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-6 text-xs text-slate-500 font-medium">
          <span>Showing 1 to {filtered.length} of {messages.length} entries</span>
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
