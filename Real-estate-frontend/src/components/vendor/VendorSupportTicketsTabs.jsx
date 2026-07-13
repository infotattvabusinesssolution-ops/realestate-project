import React, { useState, useEffect } from 'react';
import { Home, ShieldAlert, Download, CornerUpLeft, Plus } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import axiosInstance from '../../api/axiosInstance';
import { io } from 'socket.io-client';

// 1. Support Tickets Tab — List & Details router
export function VendorSupportTicketsTab({ onAddClick }) {
  const [selectedTicket, setSelectedTicket] = useState(null);

  if (selectedTicket) {
    return (
      <VendorTicketDetailView 
        ticket={selectedTicket} 
        onBack={() => setSelectedTicket(null)} 
      />
    );
  }

  return (
    <VendorSupportTicketsListView 
      onSelectTicket={setSelectedTicket} 
      onAddClick={onAddClick}
    />
  );
}

// 1b. Support Tickets List View
function VendorSupportTicketsListView({ onSelectTicket, onAddClick }) {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get('/vendor/tickets');
        setTickets(res.data);
      } catch (err) {
        console.error('Failed to load tickets:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchTickets();
  }, []);

  const filteredTickets = tickets.filter(t =>
    (t.title || '').toLowerCase().includes(search.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'Open': return 'bg-emerald-500';
      case 'Pending': return 'bg-amber-500';
      case 'Closed': return 'bg-red-500';
      default: return 'bg-slate-400';
    }
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'High': return 'bg-red-500';
      case 'Medium': return 'bg-amber-500';
      case 'Low': return 'bg-blue-500';
      default: return 'bg-slate-400';
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
        <h2 className="text-lg font-bold text-slate-800">Support Tickets</h2>
        <div className="flex items-center space-x-2 text-[10px] font-bold text-slate-400">
          <Home size={12} className="text-slate-350" />
          <span>&gt;</span>
          <span className="text-slate-650">Support Tickets</span>
        </div>
      </div>

      {/* Main card box */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-premium p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-55 mb-6">
          <h3 className="text-xs font-extrabold text-slate-800 tracking-wide uppercase">Support Tickets</h3>
          <div className="flex items-center space-x-2 self-end sm:self-auto">
            <span className="text-xs text-slate-500 font-medium">Search:</span>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by subject..."
              className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-800 focus:outline-none w-48 font-medium"
            />
          </div>
        </div>
        
        {loading ? (
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-12 bg-slate-100 rounded-lg animate-pulse"></div>
            ))}
          </div>
        ) : filteredTickets.length === 0 ? (
          <div className="border border-slate-150 rounded-2xl py-16 flex flex-col items-center justify-center bg-slate-50/20 text-slate-400 font-extrabold text-sm tracking-wider uppercase">
            NO SUPPORT TICKETS FOUND !
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-400 font-bold bg-slate-50/50">
                    <th className="p-3 w-12 text-center">#</th>
                    <th className="p-3">Subject</th>
                    <th className="p-3">Urgency</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Created</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {filteredTickets.map((ticket, index) => (
                    <tr key={ticket._id} className="hover:bg-slate-50/50 transition bg-white">
                      <td className="p-3 text-center text-slate-500 font-bold">{index + 1}</td>
                      <td 
                        onClick={() => onSelectTicket(ticket)}
                        className="p-3 font-semibold text-blue-650 hover:underline cursor-pointer"
                      >
                        {ticket.title}
                      </td>
                      <td className="p-3">
                        <span className={`px-2.5 py-0.5 ${getUrgencyColor(ticket.urgency)} text-white rounded-full text-[9px] font-bold uppercase`}>
                          {ticket.urgency}
                        </span>
                      </td>
                      <td className="p-3">
                        <span className={`px-2.5 py-0.5 ${getStatusColor(ticket.status)} text-white rounded-full text-[9px] font-bold uppercase`}>
                          {ticket.status}
                        </span>
                      </td>
                      <td className="p-3 text-slate-500 font-medium">
                        {new Date(ticket.createdAt).toLocaleDateString()}
                      </td>
                      <td className="p-3 text-right">
                        <button 
                          onClick={() => onSelectTicket(ticket)}
                          className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded text-[10px] font-bold tracking-wide"
                        >
                          Detail
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-6 text-xs text-slate-500 font-medium">
              <span>Showing 1 to {filteredTickets.length} of {tickets.length} entries</span>
              <div className="flex items-center space-x-1.5">
                <button className="px-3 py-1 bg-slate-100 rounded text-slate-700 cursor-not-allowed">Previous</button>
                <button className="px-3 py-1 bg-blue-600 text-white rounded font-bold">1</button>
                <button className="px-3 py-1 bg-slate-100 rounded text-slate-700 cursor-not-allowed">Next</button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// 1c. Support Ticket Detail & Real-Time Replies View
function VendorTicketDetailView({ ticket, onBack }) {
  const { user } = useAuth();
  const ticketId = ticket?._id || ticket?.id;
  const [replies, setReplies] = useState([]);
  const [newReply, setNewReply] = useState('');
  const [socket, setSocket] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch ticket conversation details
  useEffect(() => {
    const fetchTicketDetails = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get(`/vendor/tickets/${ticketId}`);
        const normalized = res.data.responses.map(r => ({
          id: r._id || Math.random().toString(),
          sender: r.senderName || 'Anonymous',
          role: r.sender?._id === user._id || r.sender === user._id ? 'Vendor' : 'Admin',
          avatar: r.sender?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
          message: r.text,
          date: r.timestamp || new Date()
        }));
        setReplies(normalized);
      } catch (err) {
        console.error('Failed to load support ticket details:', err);
      } finally {
        setLoading(false);
      }
    };

    if (ticketId) {
      fetchTicketDetails();
    }
  }, [ticketId, user._id]);

  // Handle Socket.io events
  useEffect(() => {
    if (!ticketId) return;
    const socketConnection = io(import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000');
    setSocket(socketConnection);

    socketConnection.emit('join_ticket', ticketId);

    socketConnection.on('new_ticket_reply', (r) => {
      const incomingReply = {
        id: r._id || Math.random().toString(),
        sender: r.senderName,
        role: r.sender === user._id ? 'Vendor' : 'Admin',
        avatar: r.senderAvatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
        message: r.text,
        date: new Date()
      };
      setReplies(prev => [...prev, incomingReply]);
    });

    return () => {
      socketConnection.disconnect();
    };
  }, [ticketId, user._id]);

  const handleReplySubmit = async (e) => {
    e.preventDefault();
    if (!newReply.trim()) return;

    try {
      const res = await axiosInstance.post(`/vendor/tickets/${ticketId}/reply`, {
        text: newReply
      });

      const addedResponse = res.data.responses[res.data.responses.length - 1];

      const vendorReply = {
        id: addedResponse._id || Math.random().toString(),
        sender: user.name || user.username,
        role: 'Vendor',
        avatar: user.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
        message: newReply,
        date: new Date()
      };

      setReplies(prev => [...prev, vendorReply]);

      if (socket) {
        socket.emit('ticket_reply', {
          ticketId,
          response: {
            _id: addedResponse._id,
            sender: user._id,
            senderName: user.name || user.username,
            senderAvatar: user.avatar,
            text: newReply
          }
        });
      }

      setNewReply('');
    } catch (err) {
      alert('Failed to submit ticket reply');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Open': return 'bg-emerald-500';
      case 'Pending': return 'bg-amber-500';
      case 'Closed': return 'bg-red-500';
      default: return 'bg-slate-400';
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header with back trigger */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <h2 className="text-base font-bold text-slate-800">Support Ticket Details</h2>
        <button 
          onClick={onBack}
          className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition active:scale-95 shadow-xs"
        >
          &larr; Back to List
        </button>
      </div>

      {/* Main Ticket Box */}
      <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-premium space-y-6">
        
        {/* Ticket Header & Subject */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2.5">
            <span className={`px-2.5 py-0.5 rounded text-[9px] font-bold uppercase text-white ${getStatusColor(ticket?.status)}`}>
              {ticket?.status || 'Open'}
            </span>
            <span className="px-2.5 py-0.5 rounded bg-slate-900 text-white text-[9px] font-bold uppercase">
              {ticket?.urgency || 'Medium'}
            </span>
          </div>
          
          <h3 className="text-sm font-extrabold text-slate-900 leading-tight">
            {ticket?.title}
          </h3>

          <button 
            onClick={() => alert('Downloading attachments...')}
            className="flex items-center space-x-1.5 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-[10px] font-bold transition active:scale-95 shadow-md shadow-orange-500/10"
          >
            <Download size={12} />
            <span>Download Attachment</span>
          </button>
        </div>

        {/* Conversation Thread */}
        <div className="pt-6 border-t border-slate-55 space-y-6">
          <h4 className="text-xs font-bold text-slate-800 tracking-wide uppercase">Replies</h4>
          
          {loading ? (
            <div className="space-y-4">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="flex space-x-4 animate-pulse">
                  <div className="w-10 h-10 bg-slate-100 rounded-xl"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 w-32 bg-slate-100 rounded"></div>
                    <div className="h-8 w-full bg-slate-50 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : replies.length === 0 ? (
            <p className="text-slate-400 text-xs font-medium">No replies found.</p>
          ) : (
            <div className="space-y-6">
              {replies.map((r, index) => (
                <div key={r.id || index} className="flex space-x-4">
                  
                  {/* Sender Avatar */}
                  <div className="w-10 h-10 rounded-xl overflow-hidden shrink-0 border border-slate-100 shadow-xs">
                    <img src={r.avatar} alt={r.sender} className="w-full h-full object-cover" />
                  </div>
                  
                  {/* Content */}
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-extrabold text-xs text-slate-850">{r.sender}</span>
                      <span className={`px-2 py-0.2 rounded text-[8px] font-bold uppercase ${
                        r.role === 'Admin' ? 'bg-blue-50 text-blue-600' : 'bg-slate-100 text-slate-500'
                      }`}>
                        {r.role}
                      </span>
                      <span className="text-[9px] text-slate-400 font-medium">
                        {new Date(r.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    
                    <p className="text-xs text-slate-600 leading-relaxed font-semibold">
                      {r.message}
                    </p>
                  </div>

                </div>
              ))}
            </div>
          )}
        </div>

        {/* Reply form editor */}
        <div className="pt-6 border-t border-slate-100">
          <form onSubmit={handleReplySubmit} className="space-y-4 text-xs font-bold text-slate-655">
            
            <div className="flex flex-col space-y-1.5">
              <label>Reply*</label>
              <textarea 
                required
                value={newReply}
                onChange={(e) => setNewReply(e.target.value)}
                placeholder="Write your response here..."
                rows="5"
                className="bg-white border border-slate-200 rounded-xl p-4 text-xs font-medium text-slate-855 focus:outline-none focus:ring-1 focus:ring-orange-500/50 w-full"
              />
            </div>

            <div className="flex flex-col space-y-1.5">
              <label>Attachment</label>
              <div className="flex items-center space-x-2">
                <div className="flex-1 bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-medium text-slate-400 flex items-center justify-between">
                  <span>Choose file</span>
                  <button type="button" className="px-3 py-0.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-[10px] font-bold border border-slate-300">Browse</button>
                </div>
              </div>
              <p className="text-[9px] text-orange-400 font-bold leading-none mt-1">Upload only ZIP files, Max File Size is 20 MB</p>
            </div>

            <button 
              type="submit"
              className="px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-bold text-xs flex items-center space-x-1.5 transition active:scale-95 shadow-md shadow-orange-500/10"
            >
              <CornerUpLeft size={12} />
              <span>Reply</span>
            </button>

          </form>
        </div>

      </div>

    </div>
  );
}

// 2b. Create Support Ticket Tab
export function VendorSupportTicketsAddTab({ setActiveTab }) {
  const { user } = useAuth();
  const [email, setEmail] = useState(user?.email || '');
  const [subject, setSubject] = useState('');
  const [urgency, setUrgency] = useState('Medium');
  const [desc, setDesc] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!subject) return;

    try {
      setSubmitting(true);
      await axiosInstance.post('/vendor/tickets', {
        title: subject,
        urgency,
        text: desc || subject,
      });
      alert('Support ticket created successfully!');
      setActiveTab('tickets-list');
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to create ticket');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
        <h2 className="text-lg font-bold text-slate-800">Create a support ticket</h2>
        <div className="flex items-center space-x-2 text-[10px] font-bold text-slate-400">
          <Home size={12} className="text-slate-350" />
          <span>&gt;</span>
          <span>Support Ticket</span>
          <span>&gt;</span>
          <span className="text-slate-600">Create a support ticket</span>
        </div>
      </div>

      {/* Form card */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-premium p-6 space-y-6">
        <div className="pb-4 border-b border-slate-55 mb-6">
          <h3 className="text-xs font-extrabold text-slate-800 tracking-wide uppercase">Create a support ticket</h3>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 text-xs font-bold text-slate-700">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="flex flex-col space-y-1.5">
              <label>Email*</label>
              <input 
                type="email" 
                required 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none" 
              />
            </div>

            <div className="flex flex-col space-y-1.5">
              <label>Subject*</label>
              <input 
                type="text" 
                required 
                value={subject} 
                onChange={(e) => setSubject(e.target.value)} 
                placeholder="Enter Subject" 
                className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none" 
              />
            </div>

            <div className="flex flex-col space-y-1.5">
              <label>Urgency</label>
              <select
                value={urgency}
                onChange={(e) => setUrgency(e.target.value)}
                className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>

          </div>

          <div className="flex flex-col space-y-1.5">
            <label>Description</label>
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              {/* Rich text mock bar */}
              <div className="bg-slate-50 border-b border-slate-200 p-2 flex flex-wrap gap-2 text-[10px] text-slate-500 font-bold select-none">
                <span className="px-2 py-0.5 hover:bg-slate-200 rounded cursor-pointer">File</span>
                <span className="px-2 py-0.5 hover:bg-slate-200 rounded cursor-pointer">Edit</span>
                <span className="px-2 py-0.5 hover:bg-slate-200 rounded cursor-pointer">View</span>
                <span className="px-2 py-0.5 hover:bg-slate-200 rounded cursor-pointer">Insert</span>
                <span className="px-2 py-0.5 hover:bg-slate-200 rounded cursor-pointer">Format</span>
                <span className="px-2 py-0.5 hover:bg-slate-200 rounded cursor-pointer">Tools</span>
                <span className="px-2 py-0.5 hover:bg-slate-200 rounded cursor-pointer">Table</span>
              </div>
              <textarea 
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                rows="6"
                placeholder="Describe your issue in detail..."
                className="w-full p-4 text-xs font-medium text-slate-800 focus:outline-none"
              />
            </div>
          </div>

          <div className="flex flex-col space-y-1.5">
            <label>Attachment</label>
            <div className="flex items-center space-x-2">
              <div className="flex-1 bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-medium text-slate-400 flex items-center justify-between">
                <span>Choose file</span>
                <button type="button" className="px-3 py-0.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-[10px] font-bold border border-slate-300">Browse</button>
              </div>
            </div>
            <p className="text-[9px] text-orange-400 font-bold leading-none mt-1">Upload only ZIP files, Max File Size is 20 MB</p>
          </div>

          {/* Centered Save Button */}
          <div className="flex justify-center pt-6">
            <button 
              type="submit"
              disabled={submitting}
              className="px-8 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-bold text-xs transition active:scale-95 shadow-md shadow-emerald-500/10 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? 'Saving...' : 'Save'}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
