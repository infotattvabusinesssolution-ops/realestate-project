import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, Plus, ChevronDown, Trash2 } from 'lucide-react';
import AddBlogCategoryModal from '../modal/admin/AddBlogCategoryModal';
import { getAdminBlogCategoriesAPI, deleteAdminBlogCategoryAPI, createAdminBlogCategoryAPI } from '../../api/api';

export default function BlogCategoriesTab() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [lang, setLang] = useState('English');
  const [selectedIds, setSelectedIds] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const res = await getAdminBlogCategoriesAPI({ lang });
      setCategories(res.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching blog categories:', err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [lang]);

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(categories.map(c => c._id));
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

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this category?')) return;
    try {
      await deleteAdminBlogCategoryAPI(id);
      setCategories(categories.filter(c => c._id !== id));
      setSelectedIds(selectedIds.filter(x => x !== id));
      alert('Category deleted successfully');
    } catch (err) {
      alert('Failed to delete category');
    }
  };

  const handleAddCategory = async (newCat) => {
    try {
      const res = await createAdminBlogCategoryAPI(newCat);
      setCategories([...categories, res.data]);
      setIsModalOpen(false);
      alert('Category added successfully!');
    } catch (err) {
      alert('Failed to add category: ' + (err.response?.data?.message || err.message));
    }
  };

  const filteredCategories = useMemo(() => {
    if (!search) return categories;
    return categories.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));
  }, [search, categories]);

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
          <h1 className="text-xl lg:text-2xl font-bold tracking-tight text-slate-900">Categories</h1>
          <div className="flex items-center space-x-2 text-xs text-slate-400 mt-2">
            <Home size={14} className="text-slate-400 cursor-pointer hover:text-blue-600" onClick={() => navigate('/')} />
            <span>&gt;</span>
            <span className="hover:text-blue-600 cursor-pointer">Blog Management</span>
            <span>&gt;</span>
            <span className="text-slate-500 font-semibold">Categories</span>
          </div>
        </div>
      </div>

      {/* Main Panel Box */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-premium p-6">
        
        {/* Header elements */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-55 mb-6">
          <div className="flex items-center space-x-4">
            <h3 className="text-sm font-bold text-slate-800">Blog Categories</h3>
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
                    checked={selectedIds.length > 0 && selectedIds.length === categories.length}
                    onChange={handleSelectAll}
                    className="rounded text-blue-600 focus:ring-blue-500" 
                  />
                </th>
                <th className="p-3">Name</th>
                <th className="p-3">Status</th>
                <th className="p-3">Serial Number</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredCategories.map((item) => (
                <tr key={item._id} className="hover:bg-slate-50/50 transition">
                  <td className="p-3">
                    <input 
                      type="checkbox" 
                      checked={selectedIds.includes(item._id)}
                      onChange={(e) => handleSelectOne(item._id, e.target.checked)}
                      className="rounded text-blue-600 focus:ring-blue-500" 
                    />
                  </td>
                  <td className="p-3 font-semibold text-slate-800">{item.name}</td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold text-white ${
                      item.status === 'Active' ? 'bg-emerald-500' : 'bg-red-500'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="p-3 font-semibold text-slate-700">{item.serialNumber}</td>
                  <td className="p-3 text-right">
                    <div className="flex items-center justify-end space-x-1.5">
                      <button 
                        type="button" 
                        onClick={() => handleDelete(item._id)}
                        className="p-1.5 bg-red-500 hover:bg-red-650 text-white rounded transition"
                      >
                        <Trash2 size={10} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredCategories.length === 0 && (
                <tr>
                  <td colSpan="5" className="p-4 text-center text-slate-400">No categories found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-6 text-xs text-slate-500 font-medium">
          <span>Showing 1 to {filteredCategories.length} of {categories.length} entries</span>
          <div className="flex items-center space-x-1.5">
            <button className="px-3 py-1 bg-slate-100 rounded text-slate-700 cursor-not-allowed">Previous</button>
            <button className="px-3 py-1 bg-blue-600 text-white rounded font-bold">1</button>
            <button className="px-3 py-1 bg-slate-100 rounded text-slate-700 cursor-not-allowed">Next</button>
          </div>
        </div>

      </div>

      <AddBlogCategoryModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSave={handleAddCategory} 
      />
    </div>
  );
}
