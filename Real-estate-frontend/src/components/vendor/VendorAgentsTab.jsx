import React, { useState, useEffect } from 'react';
import { Home, Plus, ChevronDown, Trash2 } from 'lucide-react';
import AddVendorAgentModal from '../modal/vendor/AddVendorAgentModal';
import { getVendorAgentsAPI, createVendorAgentAPI, updateVendorAgentAPI, deleteVendorAgentAPI } from '../../api/api';
import { useToast } from '../../context/ToastContext';

export function VendorAgentsTab() {
  const toast = useToast();
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch agents from API on mount
  const fetchAgents = async () => {
    try {
      setLoading(true);
      const res = await getVendorAgentsAPI();
      const normalized = res.data.map(a => ({
        id: a._id,
        username: a.username || a.name,
        email: a.email,
        avatar: a.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&q=80',
        status: a.status || 'Active',
      }));
      setAgents(normalized);
    } catch (err) {
      console.error('Failed to load agents:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAgents();
  }, []);

  const handleSaveAgent = async (agentData) => {
    try {
      const res = await createVendorAgentAPI({
        username: agentData.username,
        email: agentData.email,
        password: agentData.password || 'Agent@123',
        phone: agentData.phone || '',
      });
      const newAgent = {
        id: res.data._id,
        username: res.data.username || res.data.name,
        email: res.data.email,
        avatar: res.data.avatar || 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=80&q=80',
        status: res.data.status || 'Active',
      };
      setAgents([...agents, newAgent]);
      toast.success('Agent added successfully!');
      setIsModalOpen(false);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to add agent');
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateVendorAgentAPI(id, { status: newStatus });
      setAgents(agents.map(a => a.id === id ? { ...a, status: newStatus } : a));
      toast.success('Agent status updated!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update agent status');
    }
  };

  const handleDeleteAgent = async (id) => {
    if (!confirm('Are you sure you want to remove this agent?')) return;
    try {
      await deleteVendorAgentAPI(id);
      setAgents(agents.filter(a => a.id !== id));
      toast.success('Agent removed successfully!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to delete agent');
    }
  };

  const filteredAgents = agents.filter(agent => 
    agent.username.toLowerCase().includes(search.toLowerCase()) ||
    agent.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
        <h2 className="text-lg font-bold text-slate-800">Agents</h2>
        <div className="flex items-center space-x-2 text-[10px] font-bold text-slate-400">
          <Home size={12} className="text-slate-350" />
          <span>&gt;</span>
          <span className="text-slate-650">Agents</span>
        </div>
      </div>

      {/* Table Box */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-premium p-6">
        
        {/* Card Header & Add Button */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-xs font-extrabold text-slate-800 tracking-wide uppercase flex flex-wrap items-center">
              <span>All Agents</span>
              <span className="text-[10px] text-blue-500 font-medium lowercase normal-case ml-1.5">
                (Login Url: https://php83.kreativdev.com/estaty/agent/login)
              </span>
            </h3>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center space-x-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition active:scale-95 shadow-md shadow-blue-500/10 self-end sm:self-auto"
          >
            <Plus size={14} />
            <span>Add Agent</span>
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
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-800 focus:outline-none w-48 font-medium"
            />
          </div>
        </div>

        {/* Loading state */}
        {loading ? (
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-14 bg-slate-100 rounded-lg animate-pulse"></div>
            ))}
          </div>
        ) : (
          <>
            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-400 font-bold bg-slate-50/50">
                    <th className="p-3 w-12 text-center">#</th>
                    <th className="p-3 w-28">Profile Picture</th>
                    <th className="p-3">Username</th>
                    <th className="p-3">Email ID</th>
                    <th className="p-3">Status</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {filteredAgents.map((agent, index) => (
                    <tr key={agent.id} className="hover:bg-slate-50/50 transition bg-white">
                      <td className="p-3 text-center text-slate-500 font-bold">{index + 1}</td>
                      <td className="p-3">
                        <img 
                          src={agent.avatar} 
                          alt={agent.username} 
                          className="w-10 h-10 rounded object-cover ring-2 ring-slate-100" 
                        />
                      </td>
                      <td className="p-3 font-semibold text-slate-800">{agent.username}</td>
                      <td className="p-3 text-slate-550 font-medium">{agent.email}</td>
                      <td className="p-3">
                        <select 
                          value={agent.status}
                          onChange={(e) => handleStatusChange(agent.id, e.target.value)}
                          className="text-[10px] font-bold rounded-md px-1.5 py-1 bg-emerald-500 text-white border-0 focus:outline-none"
                        >
                          <option value="Active">Active</option>
                          <option value="Inactive">Inactive</option>
                        </select>
                      </td>
                      <td className="p-3 text-right">
                        <button 
                          type="button" 
                          onClick={() => handleDeleteAgent(agent.id)}
                          className="p-1.5 bg-red-50 text-red-500 hover:bg-red-100 rounded-lg transition"
                          title="Delete Agent"
                        >
                          <Trash2 size={12} />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {filteredAgents.length === 0 && (
                    <tr>
                      <td colSpan="6" className="p-4 text-center text-slate-400">No agents found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Footer pagination */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-6 text-xs text-slate-500 font-medium">
              <span>Showing 1 to {filteredAgents.length} of {agents.length} entries</span>
              <div className="flex items-center space-x-1.5">
                <button className="px-3 py-1 bg-slate-100 rounded text-slate-700 cursor-not-allowed">Previous</button>
                <button className="px-3 py-1 bg-blue-600 text-white rounded font-bold">1</button>
                <button className="px-3 py-1 bg-slate-100 rounded text-slate-700 cursor-not-allowed">Next</button>
              </div>
            </div>
          </>
        )}

      </div>

      {/* Add Agent Modal Component */}
      <AddVendorAgentModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSave={handleSaveAgent} 
      />

    </div>
  );
}
