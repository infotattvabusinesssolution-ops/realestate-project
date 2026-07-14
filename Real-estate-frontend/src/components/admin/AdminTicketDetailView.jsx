import React, { useState, useEffect } from 'react';
import { Download, CornerUpLeft, Home, ChevronDown, Loader2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { getAdminTicketDetailAPI, replyAdminTicketAPI, updateAdminTicketStatusAPI } from '../../api/api';
import { io } from 'socket.io-client';

export default function AdminTicketDetailView({ ticket, onBack }) {
  const { user } = useAuth();
  const ticketId = ticket?._id || ticket?.id;

  const [ticketDetails, setTicketDetails] = useState(null);
  const [replies, setReplies] = useState([]);
  const [newReply, setNewReply] = useState('');
  const [status, setStatus] = useState(ticket?.status || 'Open');
  const [loading, setLoading] = useState(true);
  const [replying, setReplying] = useState(false);
  const [statusDropdownOpen, setStatusDropdownOpen] = useState(false);
  const [socket, setSocket] = useState(null);

  // Fetch complete ticket details including responses
  const fetchTicketDetails = async () => {
    try {
      setLoading(true);
      const res = await getAdminTicketDetailAPI(ticketId);
      setTicketDetails(res.data);
      setStatus(res.data.status);
      
      const normalized = res.data.responses.map(r => ({
        id: r._id,
        sender: r.senderName,
        role: r.sender?.role === 'admin' ? 'Admin' : 'User',
        avatar: r.sender?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
        message: r.text,
        timestamp: r.timestamp
      }));
      setReplies(normalized);
    } catch (err) {
      console.error('Failed to load support ticket details:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (ticketId) {
      fetchTicketDetails();
    }
  }, [ticketId]);

  // WebSocket connection for real-time chat updates
  useEffect(() => {
    if (!ticketId) return;
    const socketConnection = io(import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000');
    setSocket(socketConnection);

    // Join room for this specific ticket
    socketConnection.emit('join_ticket', ticketId);

    // Listen for new messages from the customer
    socketConnection.on('new_ticket_reply', (r) => {
      const incomingReply = {
        id: r._id,
        sender: r.senderName,
        role: r.senderRole === 'admin' ? 'Admin' : 'User',
        avatar: r.senderAvatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
        message: r.text,
        timestamp: r.timestamp
      };
      setReplies(prev => [...prev, incomingReply]);
    });

    return () => {
      socketConnection.disconnect();
    };
  }, [ticketId]);

  const handleReplySubmit = async (e) => {
    e.preventDefault();
    if (!newReply.trim()) return;

    setReplying(true);
    try {
      const res = await replyAdminTicketAPI(ticketId, {
        text: newReply
      });

      // Retrieve the added response from responses array
      const addedResponse = res.data.responses[res.data.responses.length - 1];

      const adminReply = {
        id: addedResponse._id,
        sender: user.name,
        role: 'Admin',
        avatar: user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
        message: newReply,
        timestamp: addedResponse.timestamp
      };

      setReplies(prev => [...prev, adminReply]);

      // Emit reply over socket to inform customer
      if (socket) {
        socket.emit('ticket_reply', {
          ticketId,
          response: {
            _id: addedResponse._id,
            sender: user._id,
            senderName: user.name,
            senderRole: 'admin',
            senderAvatar: user.avatar,
            text: newReply,
            timestamp: addedResponse.timestamp
          }
        });
      }

      setNewReply('');
    } catch (err) {
      alert('Failed to submit ticket reply');
    } finally {
      setReplying(false);
    }
  };

  const handleStatusChange = async (newStatus) => {
    try {
      await updateAdminTicketStatusAPI(ticketId, {
        status: newStatus
      });
      setStatus(newStatus);
      setStatusDropdownOpen(false);
    } catch (err) {
      alert('Failed to update ticket status');
    }
  };

  const getStatusColor = (s) => {
    if (s === 'Open') return 'bg-emerald-500 hover:bg-emerald-650';
    if (s === 'Closed') return 'bg-red-500 hover:bg-red-650';
    return 'bg-blue-500 hover:bg-blue-650'; // Pending
  };

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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-4">
        <div>
          <h1 className="text-xl lg:text-2xl font-bold tracking-tight text-slate-900">Support Ticket Details</h1>
          <div className="flex items-center space-x-2 text-xs text-slate-400 mt-2">
            <Home size={14} className="text-slate-400 cursor-pointer hover:text-blue-600" onClick={onBack} />
            <span>&gt;</span>
            <span className="hover:text-blue-600 cursor-pointer" onClick={onBack}>Support Tickets</span>
            <span>&gt;</span>
            <span className="text-slate-500 font-semibold">Ticket {ticketId.substring(ticketId.length - 6)}</span>
          </div>
        </div>
        <button
          onClick={onBack}
          className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition active:scale-95 shadow-sm border border-slate-150"
        >
          &larr; Back to Tickets List
        </button>
      </div>

      {/* Main Container */}
      <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-premium space-y-8">
        
        {/* Ticket Header Metadata */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-6 border-b border-slate-100">
          <div className="space-y-3">
            <div className="flex items-center space-x-2.5">
              {/* Status Badge Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setStatusDropdownOpen(!statusDropdownOpen)}
                  className={`inline-flex items-center space-x-1.5 px-3 py-1 rounded font-bold text-[10px] text-white transition ${getStatusColor(status)}`}
                >
                  <span>{status}</span>
                  <ChevronDown size={10} />
                </button>
                {statusDropdownOpen && (
                  <div className="absolute left-0 mt-1 z-35 bg-white border border-slate-150 rounded-lg shadow-lg py-1 w-28 text-[10px] font-bold text-slate-700 animate-in fade-in duration-200">
                    <button
                      onClick={() => handleStatusChange('Open')}
                      className="w-full text-left px-3 py-1.5 hover:bg-emerald-50 hover:text-emerald-600"
                    >
                      Open
                    </button>
                    <button
                      onClick={() => handleStatusChange('Pending')}
                      className="w-full text-left px-3 py-1.5 hover:bg-blue-50 hover:text-blue-600"
                    >
                      Pending
                    </button>
                    <button
                      onClick={() => handleStatusChange('Closed')}
                      className="w-full text-left px-3 py-1.5 hover:bg-red-50 hover:text-red-650"
                    >
                      Closed
                    </button>
                  </div>
                )}
              </div>
              <span className={`px-2.5 py-0.5 rounded text-[9px] font-bold uppercase ${
                ticketDetails?.urgency === 'High' ? 'bg-[#fff5f5] text-[#f03e3e]' :
                ticketDetails?.urgency === 'Medium' ? 'bg-[#fff9db] text-[#f59f00]' : 'bg-[#e6fcf5] text-[#0ca678]'
              }`}>
                {ticketDetails?.urgency || 'Medium'} Urgency
              </span>
            </div>
            
            <h3 className="text-base font-extrabold text-slate-900 leading-tight">
              {ticketDetails?.title}
            </h3>

            <div className="flex flex-col text-[11px] font-semibold text-slate-450 space-y-1">
              <p>Submitted by: <span className="text-slate-800 font-bold">{ticketDetails?.user?.name}</span> ({ticketDetails?.user?.email})</p>
              <p>User Role: <span className="text-indigo-600 font-bold capitalize">{ticketDetails?.user?.role}</span></p>
              <p>Created: {new Date(ticketDetails?.createdAt).toLocaleString()}</p>
            </div>
          </div>

          {ticketDetails?.attachment && (
            <button 
              onClick={() => window.open(ticketDetails.attachment, '_blank')}
              className="flex items-center space-x-1.5 px-4 py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-[11px] font-bold transition active:scale-95 shadow-md shadow-orange-500/10 self-start md:self-auto"
            >
              <Download size={14} />
              <span>Download Attachment</span>
            </button>
          )}
        </div>

        {/* Conversation Message List */}
        <div className="space-y-6">
          <h4 className="text-xs font-black text-slate-850 uppercase tracking-wider pb-2 border-b border-slate-50">Conversation Thread</h4>
          
          <div className="space-y-6 max-h-[450px] overflow-y-auto pr-2">
            {replies.map((r) => (
              <div key={r.id} className={`flex space-x-4 ${r.role === 'Admin' ? 'bg-indigo-50/20 p-4 rounded-2xl border border-indigo-50/30' : ''}`}>
                
                {/* Sender Avatar */}
                <div className="w-10 h-10 rounded-xl overflow-hidden shrink-0 border border-slate-100 shadow-sm">
                  <img src={r.avatar} alt={r.sender} className="w-full h-full object-cover" />
                </div>
                
                {/* Content */}
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="font-extrabold text-xs text-slate-850">{r.sender}</span>
                      <span className={`px-2 py-0.2 rounded text-[8px] font-bold uppercase ${
                        r.role === 'Admin' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-500'
                      }`}>
                        {r.role}
                      </span>
                    </div>
                    <span className="text-[9px] text-slate-400 font-medium">
                      {new Date(r.timestamp).toLocaleString()}
                    </span>
                  </div>
                  
                  <p className="text-xs text-slate-650 leading-relaxed font-semibold white-space-pre-line">
                    {r.message}
                  </p>
                </div>

              </div>
            ))}
          </div>
        </div>

        {/* Admin Response Area */}
        <div className="pt-6 border-t border-slate-100">
          <form onSubmit={handleReplySubmit} className="space-y-5 text-xs font-bold text-slate-700">
            
            <div className="flex flex-col space-y-1.5">
              <label className="text-slate-800 font-bold text-xs">Response Message*</label>
              <textarea 
                required
                value={newReply}
                onChange={(e) => setNewReply(e.target.value)}
                placeholder="Write your support response message here..."
                rows={5}
                className="bg-white border border-slate-200 rounded-xl p-4 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-150 w-full resize-none"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-[10px] text-slate-400 font-semibold">Replies will instantly be visible to the customer and ticket status updated.</span>
              <button 
                type="submit"
                disabled={replying || !newReply.trim()}
                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-xs flex items-center space-x-1.5 transition active:scale-95 shadow-md shadow-indigo-600/10 disabled:opacity-50"
              >
                {replying ? (
                  <Loader2 size={12} className="animate-spin" />
                ) : (
                  <CornerUpLeft size={12} />
                )}
                <span>{replying ? 'Sending Reply...' : 'Send Reply'}</span>
              </button>
            </div>

          </form>
        </div>

      </div>
    </div>
  );
}
