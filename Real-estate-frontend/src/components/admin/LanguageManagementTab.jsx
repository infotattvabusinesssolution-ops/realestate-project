import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, Plus, Edit, Trash2 } from 'lucide-react';
import AddKeywordModal from '../modal/admin/AddKeywordModal';
import AddLanguageModal from '../modal/admin/AddLanguageModal';
import axiosInstance from '../../api/axiosInstance';

export default function LanguageManagementTab({ setActiveTab }) {
  const navigate = useNavigate();
  const [languages, setLanguages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [isKeywordModalOpen, setIsKeywordModalOpen] = useState(false);
  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);

  const fetchLanguages = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get('/admin/languages');
      setLanguages(res.data || []);
    } catch (err) {
      console.error('Error fetching languages:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLanguages();
  }, []);

  const handleMakeDefault = async (id) => {
    try {
      await axiosInstance.put(`/admin/languages/${id}/default`);
      setLanguages(prev => prev.map(lang => ({
        ...lang,
        isDefault: lang._id === id
      })));
    } catch (err) {
      alert('Failed to set default language');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this language?')) return;
    try {
      await axiosInstance.delete(`/admin/languages/${id}`);
      setLanguages(languages.filter(l => l._id !== id));
    } catch (err) {
      alert('Failed to delete language: ' + (err.response?.data?.message || err.message));
    }
  };

  const handleAddLanguage = async (newLang) => {
    try {
      const res = await axiosInstance.post('/admin/languages', {
        name: newLang.name,
        code: newLang.code,
        direction: newLang.direction
      });
      setLanguages(prev => [...prev, res.data]);
      setIsLanguageModalOpen(false);
    } catch (err) {
      alert('Failed to add language: ' + (err.response?.data?.message || err.message));
    }
  };

  const handleAddKeyword = async (newKeyword) => {
    try {
      await axiosInstance.post('/admin/languages/keywords', {
        keyword: newKeyword.keyword,
        value: newKeyword.value
      });
      alert(`New keyword "${newKeyword.keyword}" added successfully across all languages!`);
      setIsKeywordModalOpen(false);
    } catch (err) {
      alert('Failed to add keyword: ' + (err.response?.data?.message || err.message));
    }
  };

  const filteredLanguages = useMemo(() => {
    if (!search) return languages;
    const q = search.toLowerCase();
    return languages.filter(l => 
      (l.name || '').toLowerCase().includes(q) ||
      (l.code || '').toLowerCase().includes(q) ||
      (l.direction || '').toLowerCase().includes(q)
    );
  }, [search, languages]);

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
          <h1 className="text-xl lg:text-2xl font-bold tracking-tight text-slate-900">Language Management</h1>
          <div className="flex items-center space-x-2 text-xs text-slate-400 mt-2">
            <Home size={14} className="text-slate-400 cursor-pointer hover:text-blue-600" onClick={() => navigate('/')} />
            <span>&gt;</span>
            <span className="text-slate-500 font-semibold">Language Management</span>
          </div>
        </div>
      </div>

      {/* Main Panel Box */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-premium p-6">
        
        {/* Header elements */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-50 mb-6">
          <h3 className="text-sm font-bold text-slate-800">Languages</h3>
          
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => setIsKeywordModalOpen(true)}
              className="flex items-center space-x-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition active:scale-95 shadow-md shadow-indigo-500/10"
            >
              <Plus size={14} />
              <span>+ Add New Keyword</span>
            </button>
            <button 
              onClick={() => setIsLanguageModalOpen(true)}
              className="flex items-center space-x-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition active:scale-95 shadow-md shadow-blue-500/10"
            >
              <Plus size={14} />
              <span>+ Add</span>
            </button>
          </div>
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
                <th className="p-3 w-16">#</th>
                <th className="p-3">Name</th>
                <th className="p-3">Code</th>
                <th className="p-3">Direction</th>
                <th className="p-3">Website Language</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredLanguages.map((item, index) => (
                <tr key={item._id} className="hover:bg-slate-50/50 transition bg-white">
                  <td className="p-3 font-semibold text-slate-700">{index + 1}</td>
                  <td className="p-3 font-bold text-slate-800">{item.name}</td>
                  <td className="p-3 font-semibold text-slate-700">{item.code}</td>
                  <td className="p-3 font-semibold text-slate-700">{item.direction}</td>
                  <td className="p-3">
                    {item.isDefault ? (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold text-white uppercase bg-emerald-500">
                        Default
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleMakeDefault(item._id)}
                        className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded text-[10px] font-bold transition active:scale-95 shadow-sm shadow-blue-500/5"
                      >
                        Make Default
                      </button>
                    )}
                  </td>
                  <td className="p-3 text-right">
                    <div className="flex items-center justify-end space-x-1.5">
                      <button 
                        type="button" 
                        onClick={() => alert(`Edit language ${item.name}`)}
                        className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded text-[10px] font-bold flex items-center space-x-1"
                      >
                        <Edit size={10} />
                        <span>Edit</span>
                      </button>
                      <button 
                        type="button" 
                        onClick={() => alert(`Edit keywords for ${item.name}`)}
                        className="px-3 py-1.5 bg-blue-500 hover:bg-blue-600 text-white rounded text-[10px] font-bold flex items-center space-x-1"
                      >
                        <Edit size={10} />
                        <span>Edit Keyword</span>
                      </button>
                      {!item.isDefault && (
                        <button 
                          type="button" 
                          onClick={() => handleDelete(item._id)}
                          className="p-1.5 bg-red-500 hover:bg-red-650 text-white rounded transition"
                        >
                          <Trash2 size={10} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {filteredLanguages.length === 0 && (
                <tr>
                  <td colSpan="6" className="p-4 text-center text-slate-400">No languages found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-6 text-xs text-slate-500 font-medium">
          <span>Showing 1 to {filteredLanguages.length} of {languages.length} entries</span>
          <div className="flex items-center space-x-1.5">
            <button className="px-3 py-1 bg-slate-100 rounded text-slate-700 cursor-not-allowed">Previous</button>
            <button className="px-3 py-1 bg-blue-600 text-white rounded font-bold">1</button>
            <button className="px-3 py-1 bg-slate-100 rounded text-slate-700 cursor-not-allowed">Next</button>
          </div>
        </div>

      </div>

      {/* Modals */}
      <AddKeywordModal 
        isOpen={isKeywordModalOpen} 
        onClose={() => setIsKeywordModalOpen(false)} 
        onSave={handleAddKeyword} 
      />

      <AddLanguageModal 
        isOpen={isLanguageModalOpen} 
        onClose={() => setIsLanguageModalOpen(false)} 
        onSave={handleAddLanguage} 
      />
    </div>
  );
}
