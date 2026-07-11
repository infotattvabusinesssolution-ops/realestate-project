import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, Home, Loader2 } from 'lucide-react';
import axiosInstance from '../../api/axiosInstance';

const PAGE_SIZE = 10;

export default function SubscribersTab({ setActiveTab }) {
  const navigate = useNavigate();
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchSubscribers = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get('/admin/subscribers');
      setSubscribers(res.data || []);
    } catch (err) {
      console.error('Error fetching subscribers:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const totalPages = Math.ceil(subscribers.length / PAGE_SIZE) || 1;

  const paginatedSubscribers = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return subscribers.slice(start, start + PAGE_SIZE);
  }, [currentPage, subscribers]);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this subscriber?')) return;
    try {
      await axiosInstance.delete(`/admin/subscribers/${id}`);
      setSubscribers(prev => prev.filter(s => s._id !== id));
      if (paginatedSubscribers.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    } catch (err) {
      alert('Failed to delete subscriber');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-20 bg-white rounded-2xl border border-slate-100 shadow-premium">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-660"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-300">

      {/* Heading & Breadcrumbs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-slate-100">
        <div>
          <h1 className="text-xl lg:text-2xl font-bold tracking-tight text-slate-900">Subscribers</h1>
          <div className="flex items-center space-x-2 text-xs text-slate-400 mt-2">
            <Home size={14} className="text-slate-400 cursor-pointer hover:text-blue-600" onClick={() => navigate('/')} />
            <span>&gt;</span>
            <span className="hover:text-blue-600 cursor-pointer" onClick={() => setActiveTab('dashboard')}>Users Management</span>
            <span>&gt;</span>
            <span className="text-slate-500 font-semibold">Subscribers</span>
          </div>
        </div>
      </div>

      {/* Main Panel */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-premium p-6">

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 font-bold">
                <th className="p-3 w-10">
                  <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500" />
                </th>
                <th className="p-3">Email ID</th>
                <th className="p-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {paginatedSubscribers.map((sub) => (
                <tr key={sub._id} className="hover:bg-slate-50/50 transition">
                  <td className="p-3">
                    <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500" />
                  </td>
                  <td className="p-3">
                    <a href={`mailto:${sub.email}`} className="text-blue-600 font-medium hover:underline">
                      {sub.email}
                    </a>
                  </td>
                  <td className="p-3 text-right">
                    <button
                      onClick={() => handleDelete(sub._id)}
                      className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white rounded text-[10px] font-bold transition active:scale-95"
                    >
                      <Trash2 size={12} />
                      <span>Delete</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-1.5 mt-6">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 rounded text-xs text-slate-600 transition disabled:opacity-40 disabled:cursor-not-allowed"
            >
              &lsaquo;
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-8 h-8 rounded-full text-xs font-bold transition ${
                  currentPage === page
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 rounded text-xs text-slate-600 transition disabled:opacity-40 disabled:cursor-not-allowed"
            >
              &rsaquo;
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
