import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, Plus, Edit2, Trash2, Home as HouseIcon, Key, Eye, Users } from 'lucide-react';
import AddCounterModal from '../modal/admin/AddCounterModal';

const initialCounters = [
  { id: 1, icon: 'Home', amount: 14, title: 'There are many variations of Lorem Ipsum available..' },
  { id: 2, icon: 'Key', amount: 30, title: 'There are many variations of Lorem Ipsum available..' },
  { id: 3, icon: 'Eye', amount: 250, title: 'There are many variations of Lorem Ipsum available..' },
  { id: 4, icon: 'Users', amount: 100, title: 'There are many variations of Lorem Ipsum available..' }
];

export default function HomeCounterSectionTab({ setActiveTab }) {
  const navigate = useNavigate();
  const [counters, setCounters] = useState(initialCounters);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddCounter = (newCounter) => {
    setCounters([
      ...counters,
      {
        id: Date.now(),
        icon: newCounter.icon,
        amount: newCounter.amount,
        title: newCounter.title
      }
    ]);
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    setCounters(counters.filter(c => c.id !== id));
  };

  const getIconComponent = (iconName) => {
    if (iconName === 'Home') return <HouseIcon size={16} className="text-slate-500" />;
    if (iconName === 'Key') return <Key size={16} className="text-slate-500" />;
    if (iconName === 'Eye') return <Eye size={16} className="text-slate-500" />;
    return <Users size={16} className="text-slate-500" />;
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Heading & Breadcrumbs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-slate-100">
        <div>
          <h1 className="text-xl lg:text-2xl font-bold tracking-tight text-slate-900">Counter Section</h1>
          <div className="flex items-center space-x-2 text-xs text-slate-400 mt-2">
            <Home size={14} className="text-slate-400 cursor-pointer hover:text-blue-600" onClick={() => navigate('/')} />
            <span>&gt;</span>
            <span className="hover:text-blue-600 cursor-pointer" onClick={() => setActiveTab('dashboard')}>Home Page</span>
            <span>&gt;</span>
            <span className="text-slate-500 font-semibold">Counter Section</span>
          </div>
        </div>
      </div>

      {/* Main Panel Box */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-premium p-6">
        
        {/* Header elements */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-50 mb-6">
          <div className="flex items-center space-x-4">
            <h3 className="text-sm font-bold text-slate-800">Counter Informations</h3>
            <select className="bg-white border border-slate-200 rounded-lg px-2 py-1 text-xs focus:outline-none">
              <option value="English">English</option>
            </select>
          </div>
          
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition active:scale-95 shadow-md shadow-blue-500/10"
          >
            <Plus size={14} />
            <span>+ Add</span>
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
                  <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500" />
                </th>
                <th className="p-3">Icon</th>
                <th className="p-3">Amount</th>
                <th className="p-3">Title</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {counters.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/50 transition">
                  <td className="p-3">
                    <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500" />
                  </td>
                  <td className="p-3">
                    <div className="p-2 bg-slate-100/60 rounded-lg w-fit">
                      {getIconComponent(item.icon)}
                    </div>
                  </td>
                  <td className="p-3 font-semibold text-slate-700">{item.amount}</td>
                  <td className="p-3 font-medium text-slate-650">{item.title}</td>
                  
                  <td className="p-3 text-right">
                    <div className="flex items-center justify-end space-x-1.5">
                      <button type="button" className="p-1.5 bg-blue-600 hover:bg-blue-750 text-white rounded transition">
                        <Edit2 size={10} />
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
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-6 text-xs text-slate-500 font-medium">
          <span>Showing 1 to {counters.length} of {counters.length} entries</span>
          <div className="flex items-center space-x-1.5">
            <button className="px-3 py-1 bg-slate-100 rounded text-slate-700 cursor-not-allowed">Previous</button>
            <button className="px-3 py-1 bg-blue-600 text-white rounded font-bold">1</button>
            <button className="px-3 py-1 bg-slate-100 rounded text-slate-700 cursor-not-allowed">Next</button>
          </div>
        </div>

      </div>

      <AddCounterModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleAddCounter}
      />
    </div>
  );
}
