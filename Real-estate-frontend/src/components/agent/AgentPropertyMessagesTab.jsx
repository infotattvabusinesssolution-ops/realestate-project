import React, { useState, useEffect } from 'react';
import { Home, Trash2, Mail, Send, X, MessageCircle } from 'lucide-react';
import { getAgentLeadsAPI, deleteAgentLeadAPI, replyAgentLeadAPI } from '../../api/api';

export default function AgentPropertyMessagesTab() {
  const [search, setSearch] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Modals state
  const [replyMessage, setReplyMessage] = useState(null); // original message object to reply to
  const [replyText, setReplyText] = useState('');
  const [sending, setSending] = useState(false);
  const [viewMessage, setViewMessage] = useState(null); // message object to view details

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const res = await getAgentLeadsAPI();
      setMessages(res.data);
    } catch (err) {
      console.error('Failed to load agent leads:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this message?')) return;
    try {
      await deleteAgentLeadAPI(id);
      setMessages(messages.filter(msg => msg._id !== id));
      alert('Message deleted successfully!');
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete message');
    }
  };

  const handleReplySubmit = async (e) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    try {
      setSending(true);
      await replyAgentLeadAPI(replyMessage._id, replyText);
      alert('Reply sent successfully!');
      setReplyText('');
      setReplyMessage(null);
      fetchMessages(); // Refresh message lists to see reply
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to send reply');
    } finally {
      setSending(false);
    }
  };

  const filteredMessages = messages.filter(msg => {
    const propName = msg.property?.name || 'General Inquiry';
    const senderName = msg.sender?.name || 'Anonymous';
    const senderEmail = msg.sender?.email || '';
    
    return propName.toLowerCase().includes(search.toLowerCase()) ||
      senderName.toLowerCase().includes(search.toLowerCase()) ||
      senderEmail.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300 font-sans">
      
      {/* Header Title & Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
        <h2 className="text-lg font-bold text-slate-800">Property Messages</h2>
        <div className="flex items-center space-x-2 text-[10px] font-bold text-slate-400">
          <Home size={12} className="text-slate-350" />
          <span>&gt;</span>
          <span className="text-slate-655">Property Messages</span>
        </div>
      </div>

      {/* Main Table Box */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-premium p-6">
        
        {/* Table Title */}
        <div className="pb-4 border-b border-slate-55 mb-6 flex justify-between items-center">
          <h3 className="text-xs font-extrabold text-slate-800 tracking-wide uppercase">All Inquiries</h3>
          <span className="text-[10px] bg-indigo-50 text-indigo-650 px-2.5 py-0.5 rounded font-bold">
            Total: {messages.length} Inquiry
          </span>
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
              placeholder="Search by Title or Name"
              className="bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-800 focus:outline-none w-48 font-medium"
            />
          </div>
        </div>

        {loading ? (
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-12 bg-slate-100 rounded-lg animate-pulse"></div>
            ))}
          </div>
        ) : filteredMessages.length === 0 ? (
          <div className="border border-slate-150 rounded-2xl py-16 flex flex-col items-center justify-center bg-slate-50/20 text-slate-400 font-extrabold text-sm tracking-wider uppercase">
            NO MESSAGES FOUND
          </div>
        ) : (
          /* Messages Table */
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 font-bold bg-slate-50/50">
                  <th className="p-3 w-12 text-center">#</th>
                  <th className="p-3">Property</th>
                  <th className="p-3">Client</th>
                  <th className="p-3">Email ID</th>
                  <th className="p-3">Phone</th>
                  <th className="p-3">Message Snippet</th>
                  <th className="p-3 text-right font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredMessages.map((msg, index) => (
                  <tr key={msg._id || index} className="hover:bg-slate-50/30 transition bg-white text-slate-600 font-semibold">
                    <td className="p-3 text-center text-slate-400 font-bold">{index + 1}</td>
                    <td className="p-3 font-bold text-indigo-650">
                      {msg.property ? msg.property.name : 'General Inquiry'}
                    </td>
                    <td className="p-3 text-slate-800 font-bold">{msg.sender ? msg.sender.name : 'Anonymous'}</td>
                    <td className="p-3 text-slate-500 font-medium">{msg.sender ? msg.sender.email : '—'}</td>
                    <td className="p-3 text-slate-500 font-semibold">{msg.sender?.phone || '—'}</td>
                    <td className="p-3 text-slate-400 max-w-xs truncate cursor-pointer font-medium hover:text-slate-800" onClick={() => setViewMessage(msg)}>
                      {msg.text}
                    </td>
                    <td className="p-3 text-right">
                      <div className="flex items-center justify-end space-x-1.5">
                        <button 
                          onClick={() => setViewMessage(msg)}
                          className="px-2.5 py-1.5 bg-blue-50 text-blue-650 hover:bg-blue-100 rounded-lg text-[10px] font-bold transition active:scale-95 flex items-center gap-1"
                        >
                          <MessageCircle size={12} />
                          <span>View</span>
                        </button>
                        <button 
                          onClick={() => setReplyMessage(msg)}
                          className="px-2.5 py-1.5 bg-green-50 text-green-650 hover:bg-green-100 rounded-lg text-[10px] font-bold transition active:scale-95 flex items-center gap-1"
                        >
                          <Mail size={12} />
                          <span>Reply</span>
                        </button>
                        <button 
                          onClick={() => handleDelete(msg._id)}
                          className="p-1.5 bg-red-50 text-red-500 hover:bg-red-100 rounded-lg transition active:scale-90"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>

      {/* VIEW MESSAGE MODAL */}
      {viewMessage && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-2xl w-full max-w-lg animate-in zoom-in-95 duration-200 overflow-hidden text-xs text-slate-700">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
              <span className="font-extrabold text-slate-700 uppercase tracking-wider text-[10px]">Inquiry Details</span>
              <button onClick={() => setViewMessage(null)} className="p-1 hover:bg-slate-200 rounded-lg transition">
                <X size={16} className="text-slate-400" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <h4 className="text-[10px] text-slate-450 uppercase font-bold tracking-wider">Property:</h4>
                <p className="font-extrabold text-indigo-650 text-sm">{viewMessage.property ? viewMessage.property.name : 'General Inquiry'}</p>
              </div>
              <div className="grid grid-cols-2 gap-4 font-semibold text-slate-700">
                <div>
                  <h4 className="text-[10px] text-slate-455 uppercase font-bold tracking-wider">From:</h4>
                  <p className="text-slate-900 font-bold text-xs">{viewMessage.sender ? viewMessage.sender.name : 'Anonymous'}</p>
                </div>
                <div>
                  <h4 className="text-[10px] text-slate-455 uppercase font-bold tracking-wider">Phone number:</h4>
                  <p className="text-slate-900 font-bold text-xs">{viewMessage.sender?.phone || '—'}</p>
                </div>
                <div className="col-span-2">
                  <h4 className="text-[10px] text-slate-455 uppercase font-bold tracking-wider">Email Address:</h4>
                  <p className="text-slate-900 font-bold text-xs">{viewMessage.sender ? viewMessage.sender.email : '—'}</p>
                </div>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <h4 className="text-[10px] text-slate-455 uppercase font-bold tracking-wider mb-1">Message Text:</h4>
                <p className="font-medium text-slate-700 whitespace-pre-line leading-relaxed text-xs">
                  {viewMessage.text}
                </p>
              </div>
            </div>
            <div className="flex items-center justify-end px-6 py-4 border-t border-slate-100 bg-slate-50/50 gap-2">
              <button 
                onClick={() => {
                  setReplyMessage(viewMessage);
                  setViewMessage(null);
                }}
                className="px-5 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl text-[10px] font-bold transition active:scale-95"
              >
                Reply Inquiry
              </button>
              <button onClick={() => setViewMessage(null)} className="px-5 py-2 bg-slate-900 hover:bg-slate-950 text-white rounded-xl text-[10px] font-bold transition active:scale-95">
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* REPLY MODAL */}
      {replyMessage && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-2xl w-full max-w-lg animate-in zoom-in-95 duration-200 overflow-hidden text-xs text-slate-700">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
              <span className="font-extrabold text-slate-700 uppercase tracking-wider text-[10px]">Reply to Client Inquiry</span>
              <button onClick={() => setReplyMessage(null)} className="p-1 hover:bg-slate-200 rounded-lg transition">
                <X size={16} className="text-slate-400" />
              </button>
            </div>
            
            <form onSubmit={handleReplySubmit}>
              <div className="p-6 space-y-4">
                <div className="bg-indigo-50/55 p-3 rounded-xl border border-indigo-100/50 text-[10px] font-semibold text-slate-600 leading-relaxed">
                  Replying to <span className="font-bold text-indigo-700">{replyMessage.sender ? replyMessage.sender.name : 'Anonymous'}</span> regarding property: <span className="font-bold text-indigo-700">{replyMessage.property ? replyMessage.property.name : 'General Inquiry'}</span>.
                </div>
                
                <div className="flex flex-col space-y-1.5">
                  <label className="text-[10px] text-slate-450 uppercase font-bold tracking-wider">Reply message text*</label>
                  <textarea 
                    value={replyText} 
                    onChange={(e) => setReplyText(e.target.value)} 
                    placeholder="Type your message reply email details here..." 
                    rows="6" 
                    required
                    className="bg-white border border-slate-200 rounded-xl p-4 text-xs font-medium text-slate-800 focus:outline-none w-full"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end px-6 py-4 border-t border-slate-100 bg-slate-50/50 gap-2">
                <button 
                  type="button" 
                  onClick={() => setReplyMessage(null)}
                  className="px-5 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-xl text-[10px] font-bold transition active:scale-95"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={sending}
                  className="px-5 py-2 bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white rounded-xl text-[10px] font-bold transition active:scale-95 flex items-center gap-1.5"
                >
                  {sending ? (
                    <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <Send size={12} />
                      <span>Send Reply</span>
                    </>
                  )}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}
