import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, Plus, ChevronDown, Trash2, Loader2 } from 'lucide-react';
import AddAgentModal from '../modal/admin/AddAgentModal';
import { getAdminUsersAPI, updateAdminUserAPI, createAdminUserAPI, deleteAdminUserAPI } from '../../api/api';

export default function AgentsTab({ setActiveTab }) {
  const navigate = useNavigate();
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [statusDropdownId, setStatusDropdownId] = useState(null);

  const fetchAgents = async () => {
    try {
      setLoading(true);
      const res = await getAdminUsersAPI({ role: 'agent' });
      setAgents(res.data || []);
    } catch (err) {
      console.error('Error fetching agents:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAgents();
  }, []);

  const filtered = useMemo(() => {
    if (!search) return agents;
    const q = search.toLowerCase();
    return agents.filter(a =>
      (a.name || '').toLowerCase().includes(q) ||
      (a.email || '').toLowerCase().includes(q)
    );
  }, [search, agents]);

  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await updateAdminUserAPI(id, { status: newStatus });
      setAgents(prev => prev.map(a => a._id === id ? res.data : a));
      setStatusDropdownId(null);
    } catch (err) {
      alert('Failed to update status');
    }
  };

  const handleAddAgent = async (newAgent) => {
    try {
      const payload = {
        name: `${newAgent.firstName} ${newAgent.lastName}`,
        email: newAgent.email,
        password: newAgent.password,
        role: 'agent',
        avatar: newAgent.avatar,
        status: 'Active',
      };
      const res = await createAdminUserAPI(payload);
      setAgents(prev => [res.data, ...prev]);
      setIsModalOpen(false);
    } catch (err) {
      alert('Failed to add agent: ' + (err.response?.data?.message || err.message));
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this agent?')) return;
    try {
      await deleteAdminUserAPI(id);
      setAgents(prev => prev.filter(a => a._id !== id));
    } catch (err) {
      alert('Failed to delete agent');
    }
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
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-slate-100">
        <div>
          <h1 className="text-xl lg:text-2xl font-bold tracking-tight text-slate-900">Agents</h1>
          <div className="flex items-center space-x-2 text-xs text-slate-400 mt-2">
            <Home size={14} className="text-slate-400 cursor-pointer hover:text-blue-600" onClick={() => navigate('/')} />
            <span>&gt;</span>
            <span className="text-slate-500 font-semibold">Agents</span>
          </div>
        </div>
      </div>

      {/* Main Panel Box */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-premium p-6">
        
        {/* Header elements */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-sm font-bold text-slate-800">
              All Agents
            </h3>
          </div>

          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition active:scale-95 shadow-md shadow-blue-500/10"
          >
            <Plus size={14} />
            <span>Add Agent</span>
          </button>
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
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 font-bold bg-slate-50/50">
                <th className="p-3 w-12">#</th>
                <th className="p-3">Profile Picture</th>
                <th className="p-3">Username/Name</th>
                <th className="p-3">Email ID</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filtered.map((agent, index) => (
                <tr key={agent._id} className="hover:bg-slate-50/50 transition">
                  <td className="p-3 font-semibold text-slate-500">{index + 1}</td>
                  <td className="p-3">
                    <img src={agent.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'} alt={agent.name} className="w-8 h-8 rounded-lg object-cover ring-2 ring-slate-100" />
                  </td>
                  <td className="p-3 font-bold text-slate-800">{agent.name}</td>
                  <td className="p-3 font-semibold text-blue-500 hover:underline cursor-pointer">
                    <a href={`mailto:${agent.email}`}>{agent.email}</a>
                  </td>
                  
                  {/* Status Toggle Dropdown */}
                  <td className="p-3 relative">
                    <button
                      onClick={() => setStatusDropdownId(statusDropdownId === agent._id ? null : agent._id)}
                      className={`inline-flex items-center space-x-1 px-3 py-1 rounded font-bold text-[10px] text-white transition ${
                        agent.status !== 'Inactive' ? 'bg-emerald-500 hover:bg-emerald-600' : 'bg-red-500 hover:bg-red-650'
                      }`}
                    >
                      <span>{agent.status || 'Active'}</span>
                      <ChevronDown size={10} />
                    </button>
                    {statusDropdownId === agent._id && (
                      <div className="absolute left-3 mt-1 z-35 bg-white border border-slate-100 rounded-lg shadow-lg py-1 w-24 text-[10px] font-bold text-slate-700 animate-in fade-in duration-200">
                        <button
                          onClick={() => handleStatusChange(agent._id, 'Active')}
                          className="w-full text-left px-3 py-1.5 hover:bg-slate-50"
                        >
                          Active
                        </button>
                        <button
                          onClick={() => handleStatusChange(agent._id, 'Inactive')}
                          className="w-full text-left px-3 py-1.5 hover:bg-slate-50"
                        >
                          Inactive
                        </button>
                      </div>
                    )}
                  </td>

                  <td className="p-3 text-right">
                    <div className="flex items-center justify-end space-x-1.5">
                      <button 
                        onClick={() => handleDelete(agent._id)}
                        className="p-2 bg-red-500 hover:bg-red-600 text-white rounded transition active:scale-95 shadow-sm"
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

        {/* Footer */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-6 text-xs text-slate-500 font-medium">
          <span>Showing 1 to {filtered.length} of {agents.length} entries</span>
          <div className="flex items-center space-x-1.5">
            <button className="px-3 py-1 bg-slate-100 hover:bg-slate-200 rounded text-slate-700 transition">Previous</button>
            <button className="px-3 py-1 bg-blue-600 text-white rounded font-bold">1</button>
            <button className="px-3 py-1 bg-slate-100 hover:bg-slate-200 rounded text-slate-700 transition">Next</button>
          </div>
        </div>

      </div>

      <AddAgentModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleAddAgent}
      />
    </div>
  );
}
