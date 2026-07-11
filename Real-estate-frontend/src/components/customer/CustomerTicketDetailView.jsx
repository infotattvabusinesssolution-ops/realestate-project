import React, { useState, useEffect } from 'react';
import { Download, CornerUpLeft } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import axiosInstance from '../../api/axiosInstance';
import { io } from 'socket.io-client';

export default function CustomerTicketDetailView({ ticket, onBack }) {
  const { user } = useAuth();
  const ticketId = ticket?._id || ticket?.id;
  const subject = ticket?.title || ticket?.subject || 'Unable to log in to account';
  const status = ticket?.status || 'Open';

  const [replies, setReplies] = useState([]);
  const [newReply, setNewReply] = useState('');
  const [socket, setSocket] = useState(null);

  // Fetch ticket conversation from backend on mount
  useEffect(() => {
    const fetchTicketDetails = async () => {
      try {
        const res = await axiosInstance.get(`/customer/tickets/${ticketId}`);
        // Map backend responses to table structure
        const normalized = res.data.responses.map(r => ({
          id: r._id,
          sender: r.senderName,
          role: r.sender?._id === user._id ? 'User' : 'Admin',
          avatar: r.sender?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
          message: r.text
        }));
        setReplies(normalized);
      } catch (err) {
        console.error('Failed to load support ticket conversation:', err);
      }
    };

    if (ticketId) {
      fetchTicketDetails();
    }
  }, [ticketId]);

  // Establish Socket.io connection
  useEffect(() => {
    if (!ticketId) return;
    const socketConnection = io(import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000');
    setSocket(socketConnection);

    // Join room
    socketConnection.emit('join_ticket', ticketId);

    // Listen for new messages
    socketConnection.on('new_ticket_reply', (r) => {
      const incomingReply = {
        id: r._id,
        sender: r.senderName,
        role: r.sender === user._id ? 'User' : 'Admin',
        avatar: r.senderAvatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
        message: r.text
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

    try {
      const res = await axiosInstance.post(`/customer/tickets/${ticketId}/reply`, {
        text: newReply
      });

      // Get the added response from responses array
      const addedResponse = res.data.responses[res.data.responses.length - 1];

      const userReply = {
        id: addedResponse._id,
        sender: user.name,
        role: 'User',
        avatar: user.avatar,
        message: newReply
      };

      setReplies(prev => [...prev, userReply]);

      // Emit over socket
      if (socket) {
        socket.emit('ticket_reply', {
          ticketId,
          response: {
            _id: addedResponse._id,
            sender: user._id,
            senderName: user.name,
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
            <span className={`px-2.5 py-0.5 rounded text-[9px] font-bold uppercase ${
              status === 'Open' ? 'bg-[#e6fcf5] text-[#0ca678]' :
              status === 'Pending' ? 'bg-[#fff9db] text-[#f59f00]' : 'bg-[#fff5f5] text-[#f03e3e]'
            }`}>
              {status}
            </span>
            <span className="px-2.5 py-0.5 rounded bg-slate-900 text-white text-[9px] font-bold uppercase">
              High
            </span>
          </div>
          
          <h3 className="text-sm font-extrabold text-slate-900 leading-tight">
            {subject}
          </h3>
          
          <p className="text-xs text-slate-500 font-semibold leading-relaxed">
            I am unable to log in to my account. It shows an error message. I tried resetting my password, but it didn't help. Please resolve this issue.
          </p>

          <button 
            onClick={() => alert('Downloading attachments...')}
            className="flex items-center space-x-1.5 px-4 py-2 bg-orange-500 hover:bg-orange-655 text-white rounded-xl text-[10px] font-bold transition active:scale-95 shadow-md shadow-orange-500/10"
          >
            <Download size={12} />
            <span>Download Attachment</span>
          </button>
        </div>

        {/* Conversation Thread */}
        <div className="pt-6 border-t border-slate-55 space-y-6">
          <h4 className="text-xs font-bold text-slate-800 tracking-wide uppercase">Replies</h4>
          
          <div className="space-y-6">
            {replies.map((r) => (
              <div key={r.id} className="flex space-x-4">
                
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
                  </div>
                  
                  <p className="text-xs text-slate-600 leading-relaxed font-semibold">
                    {r.message}
                  </p>
                </div>

              </div>
            ))}
          </div>
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
                className="bg-white border border-slate-200 rounded-xl p-4 text-xs font-medium text-slate-850 focus:outline-none focus:ring-1 focus:ring-orange-500/50 w-full"
              />
            </div>

            <div className="flex flex-col space-y-1.5">
              <label>Attachment</label>
              <div className="flex items-center space-x-2">
                <div className="flex-1 bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-medium text-slate-400 flex items-center justify-between">
                  <span>Choose file</span>
                  <button type="button" className="px-3 py-0.5 bg-slate-105 hover:bg-slate-200 text-slate-700 rounded text-[10px] font-bold border border-slate-300">Browse</button>
                </div>
              </div>
              <p className="text-[9px] text-orange-400 font-bold leading-none mt-1">Upload only ZIP files, Max File Size is 20 MB</p>
            </div>

            <button 
              type="submit"
              className="px-6 py-2.5 bg-orange-500 hover:bg-orange-655 text-white rounded-xl font-bold text-xs flex items-center space-x-1.5 transition active:scale-95 shadow-md shadow-orange-500/10"
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
