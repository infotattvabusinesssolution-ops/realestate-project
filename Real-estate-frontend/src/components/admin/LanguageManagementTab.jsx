import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, Plus, Edit, Trash2, ArrowLeft } from 'lucide-react';
import AddKeywordModal from '../modal/admin/AddKeywordModal';
import AddLanguageModal from '../modal/admin/AddLanguageModal';
import EditLanguageModal from '../modal/admin/EditLanguageModal';
import axiosInstance from '../../api/axiosInstance';

export default function LanguageManagementTab({ setActiveTab }) {
  const navigate = useNavigate();
  const [languages, setLanguages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [isKeywordModalOpen, setIsKeywordModalOpen] = useState(false);
  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);

  // Edit Language Modal State
  const [selectedLangForEdit, setSelectedLangForEdit] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Keywords Editing Mode State
  const [editingKeywordsLang, setEditingKeywordsLang] = useState(null);
  const [keywordsList, setKeywordsList] = useState([]);
  const [keywordSearch, setKeywordSearch] = useState('');
  const [keywordSaving, setKeywordSaving] = useState(false);

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

  const handleEditLanguage = async (updatedLang) => {
    try {
      const res = await axiosInstance.put(`/admin/languages/${selectedLangForEdit._id}`, updatedLang);
      setLanguages(prev => prev.map(l => l._id === selectedLangForEdit._id ? res.data : l));
      setIsEditModalOpen(false);
      setSelectedLangForEdit(null);
      alert('Language updated successfully!');
    } catch (err) {
      alert('Failed to update language: ' + (err.response?.data?.message || err.message));
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
      if (editingKeywordsLang) {
        // If we are currently editing keywords, append it locally too
        setKeywordsList(prev => [...prev, { key: newKeyword.keyword, value: newKeyword.value }]);
      }
    } catch (err) {
      alert('Failed to add keyword: ' + (err.response?.data?.message || err.message));
    }
  };

  const handleOpenKeywordEditor = async (lang) => {
    try {
      setLoading(true);
      const res = await axiosInstance.get(`/admin/languages/${lang._id}/keywords`);
      const dict = res.data || {};
      const arr = Object.keys(dict).map(key => ({
        key,
        value: dict[key] || ''
      }));
      setKeywordsList(arr);
      setEditingKeywordsLang(lang);
      setLoading(false);
    } catch (err) {
      alert('Failed to load keywords for ' + lang.name);
      setLoading(false);
    }
  };

  const handleKeywordValueChange = (keyName, newVal) => {
    setKeywordsList(prev => prev.map(item => item.key === keyName ? { ...item, value: newVal } : item));
  };

  const handleSaveKeywords = async () => {
    try {
      setKeywordSaving(true);
      const keywordsObj = {};
      keywordsList.forEach(item => {
        keywordsObj[item.key] = item.value;
      });
      await axiosInstance.put(`/admin/languages/${editingKeywordsLang._id}/keywords`, {
        keywords: keywordsObj
      });
      alert('Keywords saved successfully for ' + editingKeywordsLang.name);
      setEditingKeywordsLang(null);
    } catch (err) {
      alert('Failed to save keywords: ' + (err.response?.data?.message || err.message));
    } finally {
      setKeywordSaving(false);
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

  const filteredKeywords = useMemo(() => {
    if (!keywordSearch) return keywordsList;
    const q = keywordSearch.toLowerCase();
    return keywordsList.filter(item => 
      (item.key || '').toLowerCase().includes(q) ||
      (item.value || '').toLowerCase().includes(q)
    );
  }, [keywordSearch, keywordsList]);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-20 bg-white rounded-2xl border border-slate-100 shadow-premium">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // KEYWORD EDITOR VIEW
  if (editingKeywordsLang) {
    return (
      <div className="space-y-6 animate-in fade-in duration-300">
        {/* Heading & Breadcrumbs */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <h1 className="text-xl lg:text-2xl font-bold tracking-tight text-slate-900">
              Keywords of {editingKeywordsLang.name} ({editingKeywordsLang.code})
            </h1>
            <div className="flex items-center space-x-2 text-xs text-slate-400 mt-2">
              <Home size={14} className="text-slate-400 cursor-pointer hover:text-blue-600" onClick={() => navigate('/')} />
              <span>&gt;</span>
              <span className="hover:text-blue-600 cursor-pointer" onClick={() => setEditingKeywordsLang(null)}>Language Management</span>
              <span>&gt;</span>
              <span className="text-slate-500 font-semibold">Edit Keywords</span>
            </div>
          </div>
        </div>

        {/* Editor Box */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-premium p-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-50 mb-6">
            <h3 className="text-sm font-bold text-slate-800">Keywords Editor</h3>
            <button 
              onClick={() => setEditingKeywordsLang(null)}
              className="flex items-center space-x-1.5 px-4 py-2 bg-slate-600 hover:bg-slate-700 text-white rounded-xl text-xs font-bold transition active:scale-95 shadow-sm"
            >
              <ArrowLeft size={14} />
              <span>Back</span>
            </button>
          </div>

          {/* Search Row */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-2 text-xs text-slate-500">
              <span>Search:</span>
              <input
                type="text"
                value={keywordSearch}
                onChange={(e) => setKeywordSearch(e.target.value)}
                placeholder="Search keys/translations"
                className="bg-white border border-slate-200 rounded-lg px-3 py-1 text-xs text-slate-800 focus:outline-none w-64"
              />
            </div>
            
            <button 
              onClick={() => setIsKeywordModalOpen(true)}
              className="flex items-center space-x-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition"
            >
              <Plus size={14} />
              <span>Add Translation Key</span>
            </button>
          </div>

          {/* Editable Grid / Table */}
          <div className="overflow-x-auto border border-slate-100 rounded-xl">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 font-bold bg-slate-50/50">
                  <th className="p-3 w-16">#</th>
                  <th className="p-3 w-1/3">Key</th>
                  <th className="p-3">Value</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredKeywords.map((item, index) => (
                  <tr key={item.key} className="hover:bg-slate-50/50 transition bg-white">
                    <td className="p-3 font-semibold text-slate-700">{index + 1}</td>
                    <td className="p-3 font-bold text-slate-800 break-all">{item.key}</td>
                    <td className="p-3">
                      <input
                        type="text"
                        value={item.value}
                        onChange={(e) => handleKeywordValueChange(item.key, e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none focus:border-blue-500"
                      />
                    </td>
                  </tr>
                ))}
                {filteredKeywords.length === 0 && (
                  <tr>
                    <td colSpan="3" className="p-4 text-center text-slate-400">No translation keywords found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Action Row */}
          <div className="flex justify-end space-x-2 pt-6 mt-6 border-t border-slate-100">
            <button 
              onClick={() => setEditingKeywordsLang(null)}
              className="px-6 py-2.5 bg-slate-650 hover:bg-slate-700 text-white rounded-xl text-xs font-bold transition active:scale-95 shadow-sm"
            >
              Cancel
            </button>
            <button 
              onClick={handleSaveKeywords}
              disabled={keywordSaving}
              className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold transition active:scale-95 shadow-md shadow-emerald-500/10 disabled:opacity-50"
            >
              {keywordSaving ? 'Saving...' : 'Save Translations'}
            </button>
          </div>
        </div>

        {/* Global Add Key Modal */}
        <AddKeywordModal 
          isOpen={isKeywordModalOpen} 
          onClose={() => setIsKeywordModalOpen(false)} 
          onSave={handleAddKeyword} 
        />
      </div>
    );
  }

  // DEFAULT LANGUAGE LIST VIEW
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
                        onClick={() => {
                          setSelectedLangForEdit(item);
                          setIsEditModalOpen(true);
                        }}
                        className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded text-[10px] font-bold flex items-center space-x-1"
                      >
                        <Edit size={10} />
                        <span>Edit</span>
                      </button>
                      <button 
                        type="button" 
                        onClick={() => handleOpenKeywordEditor(item)}
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

      <EditLanguageModal 
        isOpen={isEditModalOpen} 
        language={selectedLangForEdit}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedLangForEdit(null);
        }} 
        onSave={handleEditLanguage} 
      />
    </div>
  );
}
