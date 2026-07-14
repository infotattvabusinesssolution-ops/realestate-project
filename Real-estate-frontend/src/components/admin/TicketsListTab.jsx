import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, ChevronDown } from 'lucide-react';
import { getAdminTicketsAPI, updateAdminTicketStatusAPI } from '../../api/api';
import AdminTicketDetailView from './AdminTicketDetailView';

export default function TicketsListTab({ setActiveTab, filterType }) {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusDropdownId, setStatusDropdownId] = useState(null);
  const [actionDropdownId, setActionDropdownId] = useState(null);
  const [selectedTicket, setSelectedTicket] = useState(null);

  const fetchTickets = async () => {
    try {
      setLoading(true);
      const res = await getAdminTicketsAPI();
      const normalized = res.data.map(t => ({
        id: t._id,
        userType: t.user ? (t.user.role === 'customer' ? 'Customer' : t.user.role.toUpperCase()) : 'Customer',
        username: t.user ? t.user.name : 'Customer',
        email: t.user ? t.user.email : 'N/A',
        subject: t.title,
        status: t.status,
        staff: t.assignedTo ? t.assignedTo.name : '-'
      }));
      setTickets(normalized);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching admin tickets:', err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const filtered = useMemo(() => {
    if (filterType === 'all') return tickets;
    return tickets.filter(t => t.status.toLowerCase() === filterType.toLowerCase());
  }, [filterType, tickets]);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateAdminTicketStatusAPI(id, { status: newStatus });
      setTickets(prev => prev.map(t => t.id === id ? { ...t, status: newStatus } : t));
      setStatusDropdownId(null);
    } catch (err) {
      alert('Failed to update ticket status');
    }
  };

  const getBreadcrumbLabel = () => {
    if (filterType === 'all') return 'All Tickets';
    if (filterType === 'pending') return 'Pending Tickets';
    if (filterType === 'open') return 'Open Tickets';
    return 'Closed Tickets';
  };

  const getStatusColor = (status) => {
    if (status === 'Open') return 'bg-emerald-500 hover:bg-emerald-650';
    if (status === 'Closed') return 'bg-red-500 hover:bg-red-650';
    return 'bg-blue-500 hover:bg-blue-650'; // Pending
  };

  if (selectedTicket) {
    return (
      <AdminTicketDetailView 
        ticket={selectedTicket} 
        onBack={() => {
          setSelectedTicket(null);
          fetchTickets();
        }} 
      />
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-20 bg-white rounded-2xl border border-slate-100 shadow-premium">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Heading & Breadcrumbs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-slate-100">
        <div>
          <h1 className="text-xl lg:text-2xl font-bold tracking-tight text-slate-900">Support Tickets</h1>
          <div className="flex items-center space-x-2 text-xs text-slate-400 mt-2">
            <Home size={14} className="text-slate-400 cursor-pointer hover:text-blue-600" onClick={() => navigate('/')} />
            <span>&gt;</span>
            <span className="hover:text-blue-600 cursor-pointer" onClick={() => setActiveTab('dashboard')}>Support Tickets</span>
            <span>&gt;</span>
            <span className="text-slate-500 font-semibold">{getBreadcrumbLabel()}</span>
          </div>
        </div>
      </div>

      {/* Main Panel Box */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-premium p-6">
        <h3 className="text-sm font-bold text-slate-800 mb-6">Support Tickets</h3>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 font-bold bg-slate-50/50">
                <th className="p-3 w-10">
                  <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500" />
                </th>
                <th className="p-3">Ticket ID</th>
                <th className="p-3">User Type</th>
                <th className="p-3">Username</th>
                <th className="p-3">Email</th>
                <th className="p-3">Subject</th>
                <th className="p-3">Status</th>
                <th className="p-3">Assigned Staff</th>
                <th className="p-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/50 transition">
                  <td className="p-3">
                    <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500" />
                  </td>
                  <td className="p-3 font-semibold text-slate-700">{item.id}</td>
                  <td className="p-3">
                    <span className="inline-flex px-2 py-0.5 rounded-full text-[9px] font-bold text-white bg-blue-600">
                      {item.userType}
                    </span>
                  </td>
                  <td className="p-3">
                    <span className="inline-flex px-2 py-0.5 rounded-full text-[9px] font-bold text-white bg-blue-500">
                      {item.username}
                    </span>
                  </td>
                  <td className="p-3 font-semibold text-blue-500 hover:underline cursor-pointer">
                    <a href={`mailto:${item.email}`}>{item.email}</a>
                  </td>
                  <td className="p-3 font-semibold text-slate-700">{item.subject}</td>
                  
                  {/* Status Toggle Dropdown */}
                  <td className="p-3 relative">
                    <button
                      onClick={() => setStatusDropdownId(statusDropdownId === item.id ? null : item.id)}
                      className={`inline-flex items-center space-x-1 px-3 py-1 rounded font-bold text-[10px] text-white transition ${getStatusColor(item.status)}`}
                    >
                      <span>{item.status}</span>
                      <ChevronDown size={10} />
                    </button>
                    {statusDropdownId === item.id && (
                      <div className="absolute left-3 mt-1 z-35 bg-white border border-slate-100 rounded-lg shadow-lg py-1 w-24 text-[10px] font-bold text-slate-700 animate-in fade-in duration-200">
                        <button
                          onClick={() => handleStatusChange(item.id, 'Open')}
                          className="w-full text-left px-3 py-1.5 hover:bg-slate-50"
                        >
                          Open
                        </button>
                        <button
                          onClick={() => handleStatusChange(item.id, 'Pending')}
                          className="w-full text-left px-3 py-1.5 hover:bg-slate-50"
                        >
                          Pending
                        </button>
                        <button
                          onClick={() => handleStatusChange(item.id, 'Closed')}
                          className="w-full text-left px-3 py-1.5 hover:bg-slate-50"
                        >
                          Closed
                        </button>
                      </div>
                    )}
                  </td>

                  <td className="p-3 font-semibold text-slate-650">{item.staff}</td>

                  <td className="p-3 text-right relative">
                    <button
                      onClick={() => setActionDropdownId(actionDropdownId === item.id ? null : item.id)}
                      className="inline-flex items-center space-x-1.5 px-3 py-1 bg-indigo-650 hover:bg-indigo-700 text-white rounded text-[10px] font-bold transition active:scale-95"
                    >
                      <span>Select</span>
                      <ChevronDown size={8} />
                    </button>
                    {actionDropdownId === item.id && (
                      <div className="absolute right-3 mt-1 z-35 bg-white border border-slate-100 rounded-lg shadow-lg py-1 w-28 text-[10px] font-bold text-slate-700 text-left animate-in fade-in duration-200">
                        <button
                          onClick={() => {
                            setSelectedTicket(item);
                            setActionDropdownId(null);
                          }}
                          className="w-full text-left px-3 py-1.5 hover:bg-slate-50 hover:text-indigo-600"
                        >
                          View Details
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}
