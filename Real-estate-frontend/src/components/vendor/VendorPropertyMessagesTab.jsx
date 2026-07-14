import React, { useState, useEffect } from 'react';
import { Home, ChevronDown, Mail, Phone, Trash2, MessageCircle, X, Send } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { getVendorLeadsAPI, deleteVendorLeadAPI, replyVendorLeadAPI } from '../../api/api';
import { io } from 'socket.io-client';
import { useToast } from '../../context/ToastContext';

export default function VendorPropertyMessagesTab() {
  const { user } = useAuth();
  const toast = useToast();
  const [search, setSearch] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  // Reply modal state
  const [replyModal, setReplyModal] = useState(null); // message object or null
  const [replyText, setReplyText] = useState('');
  const [replying, setReplying] = useState(false);

  // Fetch leads on mount
  useEffect(() => {
    const fetchLeads = async () => {
      try {
        setLoading(true);
        const res = await getVendorLeadsAPI();
        const normalized = res.data.map(lead => ({
          id: lead._id,
          property: lead.property ? lead.property.name : 'General Inquiry',
          propertyPrice: lead.property ? lead.property.price : '',
          name: lead.sender ? lead.sender.name : 'Anonymous',
          email: lead.sender ? lead.sender.email : 'N/A',
          phone: lead.sender ? (lead.sender.phone || 'N/A') : 'N/A',
          text: lead.text,
          date: lead.createdAt,
        }));
        setMessages(normalized);
      } catch (err) {
        console.error('Failed to load leads:', err);
      } finally {
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
        propertyPrice: '',
        name: msg.senderName || 'Anonymous',
        email: msg.senderEmail || 'N/A',
        phone: msg.senderPhone || 'N/A',
        text: msg.text,
        date: msg.createdAt || new Date().toISOString(),
      };
      setMessages(prev => [incomingLead, ...prev]);
    });

    return () => {
      socket.disconnect();
    };
  }, [user]);

  // Delete a message
  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this message?')) return;
    try {
      await deleteVendorLeadAPI(id);
      setMessages(prev => prev.filter(m => m.id !== id));
      toast.success('Message deleted successfully!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to delete message');
    }
  };

  // Reply to a message
  const handleReply = async () => {
    if (!replyText.trim() || !replyModal) return;
    try {
      setReplying(true);
      await replyVendorLeadAPI(replyModal.id, replyText.trim());
      toast.success('Reply sent successfully!');
      setReplyModal(null);
      setReplyText('');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to send reply');
    } finally {
      setReplying(false);
    }
  };

  const filteredMessages = messages.filter(msg => 
    msg.property.toLowerCase().includes(search.toLowerCase()) ||
    msg.name.toLowerCase().includes(search.toLowerCase()) ||
    msg.email.toLowerCase().includes(search.toLowerCase())
  );

  const formatDate = (dateStr) => {
    if (!dateStr) return '—';
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

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

        {/* Loading state */}
        {loading ? (
          <div className="space-y-3">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-14 bg-slate-100 rounded-lg animate-pulse"></div>
            ))}
          </div>
        ) : (
          <>
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
                    <th className="p-3">Message</th>
                    <th className="p-3">Date</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {filteredMessages.map((msg, index) => (
                    <tr key={msg.id} className="hover:bg-slate-50/50 transition bg-white">
                      <td className="p-3 text-center text-slate-500 font-bold">{index + 1}</td>
                      <td className="p-3 font-semibold text-blue-600 hover:underline cursor-pointer max-w-[160px] truncate">{msg.property}</td>
                      <td className="p-3 text-slate-800 font-bold">{msg.name}</td>
                      <td className="p-3 text-slate-500 font-medium">{msg.email}</td>
                      <td className="p-3 text-slate-500 font-semibold">{msg.phone}</td>
                      <td className="p-3 text-slate-600 font-medium max-w-[200px] truncate" title={msg.text}>
                        {msg.text}
                      </td>
                      <td className="p-3 text-slate-400 font-medium text-[10px]">
                        {formatDate(msg.date)}
                      </td>
                      <td className="p-3 text-right">
                        <div className="flex items-center justify-end space-x-1.5">
                          <button 
                            type="button"
                            onClick={() => { setReplyModal(msg); setReplyText(''); }}
                            className="p-1.5 bg-blue-50 text-blue-500 hover:bg-blue-100 rounded-lg transition"
                            title="Reply"
                          >
                            <MessageCircle size={12} />
                          </button>
                          <button 
                            type="button"
                            onClick={() => handleDelete(msg.id)}
                            className="p-1.5 bg-red-50 text-red-500 hover:bg-red-100 rounded-lg transition"
                            title="Delete"
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredMessages.length === 0 && (
                    <tr>
                      <td colSpan="8" className="p-4 text-center text-slate-400">No messages found.</td>
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
          </>
        )}

      </div>

      {/* Reply Modal */}
      {replyModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-2xl w-full max-w-lg animate-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <div>
                <h3 className="text-sm font-bold text-slate-800">Reply to Inquiry</h3>
                <p className="text-[10px] text-slate-400 font-medium mt-0.5">
                  From: {replyModal.name} • {replyModal.property}
                </p>
              </div>
              <button 
                onClick={() => setReplyModal(null)} 
                className="p-1.5 hover:bg-slate-100 rounded-lg transition"
              >
                <X size={16} className="text-slate-400" />
              </button>
            </div>

            {/* Original Message */}
            <div className="px-6 py-4">
              <div className="bg-slate-50 rounded-xl p-4 mb-4">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Original Message</p>
                <p className="text-xs text-slate-700 font-medium leading-relaxed">{replyModal.text}</p>
              </div>

              {/* Reply Input */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700">Your Reply</label>
                <textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Type your reply here..."
                  rows="4"
                  className="w-full bg-white border border-slate-200 rounded-xl p-3 text-xs font-medium text-slate-800 focus:outline-none focus:border-blue-400 transition"
                  autoFocus
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-100">
              <button 
                onClick={() => setReplyModal(null)}
                className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition"
              >
                Cancel
              </button>
              <button 
                onClick={handleReply}
                disabled={!replyText.trim() || replying}
                className="flex items-center space-x-1.5 px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition active:scale-95 shadow-md shadow-blue-500/10 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send size={12} />
                <span>{replying ? 'Sending...' : 'Send Reply'}</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
