import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, Plus, ChevronDown, Trash2 } from 'lucide-react';
import AddOfflineGatewayModal from '../modal/admin/AddOfflineGatewayModal';

const initialGateways = [
  { id: 1, name: 'Bank of America', status: 'Active', serialNumber: 2 },
  { id: 2, name: 'Citibank', status: 'Active', serialNumber: 1 }
];

export default function OfflineGatewaysTab({ setActiveTab }) {
  const navigate = useNavigate();
  const [gateways, setGateways] = useState(initialGateways);
  const [search, setSearch] = useState('');
  const [selectedIds, setSelectedIds] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(gateways.map(g => g.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectOne = (id, checked) => {
    if (checked) {
      setSelectedIds([...selectedIds, id]);
    } else {
      setSelectedIds(selectedIds.filter(x => x !== id));
    }
  };

  const handleDelete = (id) => {
    setGateways(gateways.filter(g => g.id !== id));
    setSelectedIds(selectedIds.filter(x => x !== id));
  };

  const handleAddGateway = (newGateway) => {
    setGateways([
      ...gateways,
      {
        id: Date.now(),
        name: newGateway.name,
        status: newGateway.status,
        serialNumber: newGateway.serialNumber
      }
    ]);
    setIsModalOpen(false);
  };

  const filteredGateways = useMemo(() => {
    if (!search) return gateways;
    return gateways.filter(g => g.name.toLowerCase().includes(search.toLowerCase()));
  }, [search, gateways]);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Heading & Breadcrumbs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-slate-100">
        <div>
          <h1 className="text-xl lg:text-2xl font-bold tracking-tight text-slate-900">Offline Gateways</h1>
          <div className="flex items-center space-x-2 text-xs text-slate-400 mt-2">
            <Home size={14} className="text-slate-400 cursor-pointer hover:text-blue-600" onClick={() => navigate('/')} />
            <span>&gt;</span>
            <span className="hover:text-blue-600 cursor-pointer" onClick={() => setActiveTab('dashboard')}>Payment Gateways</span>
            <span>&gt;</span>
            <span className="text-slate-500 font-semibold">Offline Gateways</span>
          </div>
        </div>
      </div>

      {/* Main Panel Box */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-premium p-6">
        
        {/* Header elements */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-55 mb-6">
          <h3 className="text-sm font-bold text-slate-800">Offline Gateways</h3>
          
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition active:scale-95 shadow-md shadow-blue-500/10"
          >
            <Plus size={14} />
            <span>+ Add Gateway</span>
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
              className="bg-white border border-slate-200 rounded-lg px-3 py-1 text-xs text-slate-800 focus:outline-none w-48"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 font-bold bg-slate-50/50">
                <th className="p-3 w-10">#</th>
                <th className="p-3">Gateway Name</th>
                <th className="p-3">Status</th>
                <th className="p-3">Serial Number</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredGateways.map((item, index) => (
                <tr key={item.id} className="hover:bg-slate-50/50 transition bg-white">
                  <td className="p-3 font-semibold text-slate-700">{index + 1}</td>
                  <td className="p-3 font-semibold text-slate-800">{item.name}</td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold text-white uppercase ${
                      item.status === 'Active' ? 'bg-emerald-500' : 'bg-red-500'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="p-3 font-semibold text-slate-700">{item.serialNumber}</td>
                  <td className="p-3 text-right">
                    <div className="flex items-center justify-end space-x-1.5">
                      <button type="button" className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded text-[10px] font-bold flex items-center space-x-1">
                        <span>Select</span>
                        <ChevronDown size={8} />
                      </button>
                      <button 
                        type="button" 
                        onClick={() => handleDelete(item.id)}
                        className="p-1.5 bg-red-500 hover:bg-red-650 text-white rounded transition"
                      >
                        <Trash2 size={10} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredGateways.length === 0 && (
                <tr>
                  <td colSpan="5" className="p-4 text-center text-slate-400">No offline gateways found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-6 text-xs text-slate-500 font-medium">
          <span>Showing 1 to {filteredGateways.length} of {gateways.length} entries</span>
          <div className="flex items-center space-x-1.5">
            <button className="px-3 py-1 bg-slate-100 rounded text-slate-700 cursor-not-allowed">Previous</button>
            <button className="px-3 py-1 bg-blue-600 text-white rounded font-bold">1</button>
            <button className="px-3 py-1 bg-slate-100 rounded text-slate-700 cursor-not-allowed">Next</button>
          </div>
        </div>

      </div>

      <AddOfflineGatewayModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSave={handleAddGateway} 
      />
    </div>
  );
}
