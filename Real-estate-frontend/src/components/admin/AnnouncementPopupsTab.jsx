import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, Plus, ChevronDown, Trash2, Info } from 'lucide-react';

const initialPopups = [
  { id: 7, type: 'Type - 7', name: 'Flash Deals', img: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=80&q=80', status: 'Active', serialNumber: 7 },
  { id: 6, type: 'Type - 6', name: 'Countdown Popup', img: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=80&q=80', status: 'Deactive', serialNumber: 6 },
  { id: 5, type: 'Type - 5', name: 'Final Popup', img: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=80&q=80', status: 'Active', serialNumber: 5 },
  { id: 4, type: 'Type - 4', name: 'Winter Offer', img: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=80&q=80', status: 'Deactive', serialNumber: 4 },
  { id: 3, type: 'Type - 3', name: 'Summer Offer', img: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=80&q=80', status: 'Deactive', serialNumber: 3 },
  { id: 2, type: 'Type - 2', name: 'Month End Sale', img: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=80&q=80', status: 'Deactive', serialNumber: 2 },
  { id: 1, type: 'Type - 1', name: 'Black Friday', img: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=80&q=80', status: 'Deactive', serialNumber: 1 }
];

export default function AnnouncementPopupsTab({ setActiveTab }) {
  const navigate = useNavigate();
  const [popups, setPopups] = useState(initialPopups);
  const [search, setSearch] = useState('');
  const [lang, setLang] = useState('English');
  const [selectedIds, setSelectedIds] = useState([]);

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(popups.map(p => p.id));
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
    setPopups(popups.filter(p => p.id !== id));
    setSelectedIds(selectedIds.filter(x => x !== id));
  };

  const filteredPopups = useMemo(() => {
    if (!search) return popups;
    return popups.filter(p => 
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.type.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, popups]);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Heading & Breadcrumbs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-slate-100">
        <div>
          <h1 className="text-xl lg:text-2xl font-bold tracking-tight text-slate-900">Announcement Popups</h1>
          <div className="flex items-center space-x-2 text-xs text-slate-400 mt-2">
            <Home size={14} className="text-slate-400 cursor-pointer hover:text-blue-600" onClick={() => navigate('/')} />
            <span>&gt;</span>
            <span className="text-slate-500 font-semibold">Announcement Popups</span>
          </div>
        </div>
      </div>

      {/* Main Panel Box */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-premium p-6">
        
        {/* Header elements */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-50 mb-6">
          <div className="flex items-center space-x-4">
            <h3 className="text-sm font-bold text-slate-800">Popups</h3>
            <select 
              value={lang}
              onChange={(e) => setLang(e.target.value)}
              className="bg-white border border-slate-200 rounded-lg px-2 py-1 text-xs focus:outline-none"
            >
              <option value="English">English</option>
              <option value="Arabic">Arabic</option>
            </select>
          </div>
          
          <button 
            onClick={() => setActiveTab('announcement-popups-add')}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition active:scale-95 shadow-md shadow-blue-500/10"
          >
            <Plus size={14} />
            <span>+ Add Popup</span>
          </button>
        </div>

        {/* Informational Alert banner */}
        <div className="bg-amber-50/55 border border-amber-100 text-amber-700 py-3 px-4 rounded-xl text-[11px] font-bold flex items-center space-x-2.5 mb-6">
          <Info size={14} className="text-amber-600 shrink-0" />
          <span>All activated popups will be appear in UI according to serial number.</span>
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
                <th className="p-3 w-10">
                  <input 
                    type="checkbox" 
                    checked={selectedIds.length > 0 && selectedIds.length === popups.length}
                    onChange={handleSelectAll}
                    className="rounded text-blue-600 focus:ring-blue-500" 
                  />
                </th>
                <th className="p-3">Type</th>
                <th className="p-3">Name</th>
                <th className="p-3">Image</th>
                <th className="p-3">Status</th>
                <th className="p-3">Serial Number</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredPopups.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/50 transition bg-white">
                  <td className="p-3">
                    <input 
                      type="checkbox" 
                      checked={selectedIds.includes(item.id)}
                      onChange={(e) => handleSelectOne(item.id, e.target.checked)}
                      className="rounded text-blue-600 focus:ring-blue-500" 
                    />
                  </td>
                  <td className="p-3 font-semibold text-slate-800">
                    <div className="flex items-center space-x-2.5">
                      <img src={item.img} alt="Popup Type Layout" className="w-6 h-6 object-cover border border-slate-100 rounded" />
                      <span className="text-[11px] font-bold text-slate-700">{item.type}</span>
                    </div>
                  </td>
                  <td className="p-3 font-bold text-slate-900">{item.name}</td>
                  <td className="p-3">
                    <img src={item.img} alt="Preview" className="h-6 object-contain rounded" />
                  </td>
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
              {filteredPopups.length === 0 && (
                <tr>
                  <td colSpan="7" className="p-4 text-center text-slate-400">No popups found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-6 text-xs text-slate-500 font-medium">
          <span>Showing 1 to {filteredPopups.length} of {popups.length} entries</span>
          <div className="flex items-center space-x-1.5">
            <button className="px-3 py-1 bg-slate-100 rounded text-slate-700 cursor-not-allowed">Previous</button>
            <button className="px-3 py-1 bg-blue-600 text-white rounded font-bold">1</button>
            <button className="px-3 py-1 bg-slate-100 rounded text-slate-700 cursor-not-allowed">Next</button>
          </div>
        </div>

      </div>
    </div>
  );
}
