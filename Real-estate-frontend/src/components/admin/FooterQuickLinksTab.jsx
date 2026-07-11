import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, Plus, ChevronDown, Trash2 } from 'lucide-react';
import AddQuickLinkModal from '../modal/admin/AddQuickLinkModal';

const initialLinks = [
  { id: 1, title: 'Vendors', url: 'https://codecanyon8.kreativdev.com/estaty/vendors', serialNumber: 3 },
  { id: 2, title: 'FAQ', url: 'https://codecanyon8.kreativdev.com/estaty/faq', serialNumber: 4 },
  { id: 3, title: 'Contact', url: 'https://codecanyon8.kreativdev.com/estaty/contact', serialNumber: 2 },
  { id: 4, title: 'About Us', url: 'https://codecanyon8.kreativdev.com/estaty/about-us', serialNumber: 1 }
];

export default function FooterQuickLinksTab({ setActiveTab }) {
  const navigate = useNavigate();
  const [links, setLinks] = useState(initialLinks);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddLink = (newLink) => {
    setLinks([
      ...links,
      {
        id: Date.now(),
        title: newLink.title,
        url: newLink.url,
        serialNumber: newLink.serialNumber
      }
    ]);
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    setLinks(links.filter(l => l.id !== id));
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Heading & Breadcrumbs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-slate-100">
        <div>
          <h1 className="text-xl lg:text-2xl font-bold tracking-tight text-slate-900">Quick Links</h1>
          <div className="flex items-center space-x-2 text-xs text-slate-400 mt-2">
            <Home size={14} className="text-slate-400 cursor-pointer hover:text-blue-600" onClick={() => navigate('/')} />
            <span>&gt;</span>
            <span className="hover:text-blue-600 cursor-pointer" onClick={() => setActiveTab('dashboard')}>Footer</span>
            <span>&gt;</span>
            <span className="text-slate-500 font-semibold">Quick Links</span>
          </div>
        </div>
      </div>

      {/* Main Panel Box */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-premium p-6">
        
        {/* Header elements */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-50 mb-6">
          <div className="flex items-center space-x-4">
            <h3 className="text-sm font-bold text-slate-800">Quick Links</h3>
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
                <th className="p-3 w-10">#</th>
                <th className="p-3">Title</th>
                <th className="p-3">URL</th>
                <th className="p-3">Serial Number</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {links.map((item, index) => (
                <tr key={item.id} className="hover:bg-slate-50/50 transition">
                  <td className="p-3 text-slate-450 font-bold">{index + 1}</td>
                  <td className="p-3 font-semibold text-slate-800">{item.title}</td>
                  <td className="p-3 font-semibold text-blue-500 hover:underline cursor-pointer">
                    <a href={item.url} target="_blank" rel="noreferrer">{item.url}</a>
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
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-6 text-xs text-slate-500 font-medium">
          <span>Showing 1 to {links.length} of {links.length} entries</span>
          <div className="flex items-center space-x-1.5">
            <button className="px-3 py-1 bg-slate-100 rounded text-slate-700 cursor-not-allowed">Previous</button>
            <button className="px-3 py-1 bg-blue-600 text-white rounded font-bold">1</button>
            <button className="px-3 py-1 bg-slate-100 rounded text-slate-700 cursor-not-allowed">Next</button>
          </div>
        </div>

      </div>

      <AddQuickLinkModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSave={handleAddLink} 
      />
    </div>
  );
}
