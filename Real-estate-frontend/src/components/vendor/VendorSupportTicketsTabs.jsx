import React, { useState, useEffect } from 'react';
import { Home, ShieldAlert } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import axiosInstance from '../../api/axiosInstance';

// 2. Support Tickets Tab — List
export function VendorSupportTicketsTab() {
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
    t.title.toLowerCase().includes(search.toLowerCase())
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
          <div className="flex items-center space-x-2">
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
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {filteredTickets.map((ticket, index) => (
                    <tr key={ticket._id} className="hover:bg-slate-50/50 transition bg-white">
                      <td className="p-3 text-center text-slate-500 font-bold">{index + 1}</td>
                      <td className="p-3 font-semibold text-slate-800">{ticket.title}</td>
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
              <div className="flex-1 bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-400 flex items-center justify-between">
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
