import React, { useState, useEffect } from 'react';
import { Plus, Mail, CornerUpLeft } from 'lucide-react';
import { getCustomerTicketsAPI } from '../../api/api';

// 1. Tickets List Tab
export function CustomerSupportTicketsTab({ onViewTicket, onCreateClick }) {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        setLoading(true);
        const res = await getCustomerTicketsAPI();
        const normalized = res.data.map(t => ({
          ...t,
          id: t._id,
          subject: t.title,
          date: t.createdAt ? new Date(t.createdAt).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
          }) : 'N/A'
        }));
        setTickets(normalized);
      } catch (err) {
        console.error('Failed to fetch support tickets:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchTickets();
  }, []);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Table Box */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-premium p-6">
        
        {/* Header & Add Button */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
          <h3 className="text-sm font-bold text-slate-850 uppercase tracking-wider">Support Tickets</h3>
          <button 
            type="button"
            onClick={onCreateClick}
            className="flex items-center space-x-1.5 px-4 py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-xs font-bold transition active:scale-95 shadow-md shadow-orange-500/10"
          >
            <Plus size={14} />
            <span>Submit A Ticket</span>
          </button>
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
              disabled
              placeholder="Search..."
              className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-800 focus:outline-none w-48 font-medium cursor-not-allowed"
            />
          </div>
        </div>

        {/* Tickets Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 font-bold bg-slate-50/50">
                <th className="p-3">Ticket ID</th>
                <th className="p-3">Subject</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-center">Message</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {loading ? (
                <tr>
                  <td colSpan="4" className="p-8 text-center bg-white">
                    <div className="flex items-center justify-center space-x-2 text-slate-500">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-orange-500"></div>
                      <span>Loading support tickets...</span>
                    </div>
                  </td>
                </tr>
              ) : (
                tickets.map((t) => (
                  <tr key={t.id} className="hover:bg-slate-50/50 transition bg-white">
                    <td className="p-3 text-slate-800 font-bold">{t.id}</td>
                    <td className="p-3 text-slate-700 font-medium">{t.subject}</td>
                    <td className="p-3">
                      <span className={`inline-flex px-2.5 py-0.5 rounded-md text-[9px] font-bold uppercase ${
                        t.status === 'Open' ? 'bg-[#e6fcf5] text-[#0ca678]' :
                        t.status === 'Pending' ? 'bg-[#fff9db] text-[#f59f00]' : 'bg-[#fff5f5] text-[#f03e3e]'
                      }`}>
                        {t.status}
                      </span>
                    </td>
                    <td className="p-3 text-center">
                      <button 
                        type="button" 
                        onClick={() => onViewTicket && onViewTicket(t)}
                        className="p-2 border border-orange-500 text-orange-500 hover:bg-orange-50 rounded-lg flex items-center justify-center mx-auto transition active:scale-95 shadow-xs"
                        title="View messages"
                      >
                        <Mail size={14} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
              {!loading && tickets.length === 0 && (
                <tr>
                  <td colSpan="4" className="p-4 text-center text-slate-400">No support tickets found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer info */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-6 text-xs text-slate-500 font-medium">
          <span>Showing 1 to {tickets.length} of {tickets.length} entries</span>
          <div className="flex items-center space-x-1.5">
            <button className="px-3 py-1 bg-slate-100 rounded text-slate-700 cursor-not-allowed">Previous</button>
            <button className="px-3 py-1 bg-orange-500 text-white rounded font-bold">1</button>
            <button className="px-3 py-1 bg-slate-100 rounded text-slate-700 cursor-not-allowed">Next</button>
          </div>
        </div>

      </div>

    </div>
  );
}

// 2. Ticket Creation Tab
export function CustomerCreateTicketTab({ onBack, onSave }) {
  const [email, setEmail] = useState('test@kreativdev.com');
  const [subject, setSubject] = useState('');
  const [desc, setDesc] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!subject) return;
    onSave({
      subject,
      email,
      desc
    });
    alert('Support ticket created successfully!');
    onBack();
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Create Ticket Card Box */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-premium p-8">
        
        {/* Header & Back Button */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
          <h3 className="text-sm font-bold text-slate-850 uppercase tracking-wider">Create a Support Ticket</h3>
          <button 
            type="button" 
            onClick={onBack}
            className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition active:scale-95 shadow-xs"
          >
            &larr; Back to List
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 text-xs font-bold text-slate-655">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="flex flex-col space-y-1.5">
              <label>Email Address</label>
              <input 
                type="email" 
                required 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                className="bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs font-medium text-slate-850 focus:outline-none focus:ring-1 focus:ring-orange-500/50" 
              />
            </div>

            <div className="flex flex-col space-y-1.5">
              <label>Subject</label>
              <input 
                type="text" 
                required 
                value={subject} 
                onChange={(e) => setSubject(e.target.value)} 
                placeholder="Enter Subject" 
                className="bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs font-medium text-slate-850 focus:outline-none focus:ring-1 focus:ring-orange-500/50" 
              />
            </div>

          </div>

          <div className="flex flex-col space-y-1.5">
            <label>Description</label>
            <textarea 
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              rows="6"
              className="w-full p-4 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-850 focus:outline-none focus:ring-1 focus:ring-orange-500/50"
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
            <p className="text-[9px] text-orange-450 font-bold leading-none mt-1">Upload only ZIP files, Max File Size is 20 MB</p>
          </div>

          <button 
            type="submit"
            className="px-6 py-2.5 bg-orange-500 hover:bg-orange-655 text-white rounded-xl font-bold text-xs flex items-center space-x-1.5 transition active:scale-95 shadow-md shadow-orange-500/10"
          >
            <span>Submit</span>
          </button>

        </form>

      </div>

    </div>
  );
}
