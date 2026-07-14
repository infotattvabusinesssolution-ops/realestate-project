import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, ChevronUp, ChevronDown, Edit2, Trash2, Plus, Loader2 } from 'lucide-react';
import { getAdminMenusAPI, syncAdminMenusAPI } from '../../api/api';

const initialBuiltIn = [
  { name: 'Home', url: '/', isCustom: false },
  { name: 'Properties', url: '/properties', isCustom: false },
  { name: 'Projects', url: '/projects', isCustom: false },
  { name: 'Pricing', url: '/pricing', isCustom: false },
  { name: 'Contact', url: '/contact', isCustom: false },
  { name: 'Vendors', url: '/vendors', isCustom: false },
  { name: 'Blog', url: '/blog', isCustom: false },
  { name: 'FAQ', url: '/faq', isCustom: false },
  { name: 'About Us', url: '/about-us', isCustom: false },
  { name: 'Privacy Policy', url: '/privacy-policy', isCustom: true },
  { name: 'Terms & Condition', url: '/terms-condition', isCustom: true }
];

export default function MenuBuilderTab({ setActiveTab }) {
  const navigate = useNavigate();
  const [builtIn, setBuiltIn] = useState(initialBuiltIn);
  const [websiteMenus, setWebsiteMenus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Form states
  const [menuName, setMenuName] = useState('');
  const [menuUrl, setMenuUrl] = useState('');
  const [menuTarget, setMenuTarget] = useState('Self');
  const [editItem, setEditItem] = useState(null);

  const fetchMenus = async () => {
    try {
      setLoading(true);
      const res = await getAdminMenusAPI();
      setWebsiteMenus(res.data || []);
    } catch (err) {
      console.error('Error fetching menus:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenus();
  }, []);

  const handleAddOrEdit = (e) => {
    e.preventDefault();
    if (!menuName) return;

    if (editItem) {
      // Update existing item in state
      setWebsiteMenus(prev => prev.map(m =>
        m._id === editItem._id || m.id === editItem.id
          ? { ...m, name: menuName, url: menuUrl, target: menuTarget }
          : m
      ));
      setEditItem(null);
    } else {
      // Add new item to state
      const newItem = {
        id: Date.now(),
        name: menuName,
        url: menuUrl || '#',
        target: menuTarget,
        isExpandable: false,
        isCustom: true
      };
      setWebsiteMenus(prev => [...prev, newItem]);
    }

    setMenuName('');
    setMenuUrl('');
    setMenuTarget('Self');
  };

  const handleAddToMenu = (builtInItem) => {
    const newItem = {
      id: Date.now(),
      name: builtInItem.name,
      url: builtInItem.url,
      target: 'Self',
      isExpandable: false,
      isCustom: builtInItem.isCustom
    };
    setWebsiteMenus(prev => [...prev, newItem]);
  };

  const handleDelete = (item) => {
    setWebsiteMenus(prev => prev.filter(m => {
      if (item._id) return m._id !== item._id;
      return m.id !== item.id;
    }));
  };

  const handleEditSelect = (item) => {
    setEditItem(item);
    setMenuName(item.name);
    setMenuUrl(item.url);
    setMenuTarget(item.target || 'Self');
  };

  // Move up/down handlers
  const moveUp = (index) => {
    if (index === 0) return;
    const updated = [...websiteMenus];
    const temp = updated[index];
    updated[index] = updated[index - 1];
    updated[index - 1] = temp;
    setWebsiteMenus(updated);
  };

  const moveDown = (index) => {
    if (index === websiteMenus.length - 1) return;
    const updated = [...websiteMenus];
    const temp = updated[index];
    updated[index] = updated[index + 1];
    updated[index + 1] = temp;
    setWebsiteMenus(updated);
  };

  const handleSyncUpdate = async () => {
    setSaving(true);
    try {
      const res = await syncAdminMenusAPI({ menus: websiteMenus });
      setWebsiteMenus(res.data);
      alert('Navigation menu structure updated successfully!');
    } catch (err) {
      alert('Failed to update navigation menu');
    } finally {
      setSaving(false);
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
          <h1 className="text-xl lg:text-2xl font-bold tracking-tight text-slate-900">Menu Builder</h1>
          <div className="flex items-center space-x-2 text-xs text-slate-400 mt-2">
            <Home size={14} className="text-slate-400 cursor-pointer hover:text-blue-600" onClick={() => navigate('/')} />
            <span>&gt;</span>
            <span className="text-slate-500 font-semibold">Menu Builder</span>
          </div>
        </div>
      </div>

      {/* Grid structure */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        {/* Built-In Menus Column */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-premium overflow-hidden">
          <div className="bg-blue-650 text-white text-xs font-bold px-4 py-3">
            Built-In Menus
          </div>
          <div className="p-4 divide-y divide-slate-50 max-h-[70vh] overflow-y-auto">
            {builtIn.map((menu, i) => (
              <div key={i} className="flex justify-between items-center py-2.5 text-xs text-slate-700">
                <div className="flex items-center space-x-2">
                  <span>{menu.name}</span>
                  {menu.isCustom && (
                    <span className="inline-flex px-1.5 py-0.5 rounded bg-orange-500 text-white font-bold text-[8px] uppercase">
                      Custom Page
                    </span>
                  )}
                </div>
                <button
                  onClick={() => handleAddToMenu(menu)}
                  className="px-2.5 py-1 bg-blue-600 hover:bg-blue-700 text-white text-[10px] font-bold rounded-lg transition active:scale-95 shadow-sm"
                >
                  Add To Menu
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Add/Edit Menu Form Column */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-premium overflow-hidden">
          <div className="bg-blue-650 text-white text-xs font-bold px-4 py-3">
            {editItem ? 'Edit Menu Item' : 'Add Custom Menu'}
          </div>
          <form onSubmit={handleAddOrEdit} className="p-6 space-y-4 text-xs font-bold text-slate-700">
            <div className="flex flex-col space-y-1.5">
              <label>Text</label>
              <input
                type="text"
                placeholder="Enter Menu Name"
                value={menuName}
                onChange={(e) => setMenuName(e.target.value)}
                className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none"
                required
              />
            </div>

            <div className="flex flex-col space-y-1.5">
              <label>URL</label>
              <input
                type="text"
                placeholder="Enter Menu URL"
                value={menuUrl}
                onChange={(e) => setMenuUrl(e.target.value)}
                className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none"
              />
            </div>

            <div className="flex flex-col space-y-1.5">
              <label>Target</label>
              <select
                value={menuTarget}
                onChange={(e) => setMenuTarget(e.target.value)}
                className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-700 focus:outline-none"
              >
                <option value="Self">Self</option>
                <option value="Blank">Blank</option>
              </select>
            </div>

            <div className="flex items-center space-x-2 pt-2">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded font-bold text-xs transition active:scale-95 shadow-sm"
              >
                {editItem ? 'Save Edit' : '+ Add'}
              </button>
              {editItem && (
                <button
                  type="button"
                  onClick={() => {
                    setEditItem(null);
                    setMenuName('');
                    setMenuUrl('');
                    setMenuTarget('Self');
                  }}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded font-bold text-xs transition active:scale-95 shadow-sm"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Website Menus Tree Column */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-premium overflow-hidden">
          <div className="bg-blue-650 text-white text-xs font-bold px-4 py-3">
            Website Menus
          </div>
          <div className="p-4 space-y-2 max-h-[70vh] overflow-y-auto">
            {websiteMenus.length === 0 ? (
              <div className="py-8 text-center text-slate-400 font-semibold uppercase text-[10px]">No menus added yet</div>
            ) : (
              websiteMenus.map((menu, index) => (
                <div key={menu._id || menu.id} className="flex justify-between items-center text-xs font-bold text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-100/50 hover:bg-slate-100/30 transition">
                  <div className="flex items-center space-x-2">
                    {menu.isExpandable && (
                      <span className="w-5 h-5 rounded bg-emerald-500 text-white flex items-center justify-center font-bold text-xs select-none">
                        +
                      </span>
                    )}
                    <span>{menu.name}</span>
                  </div>
                  
                  <div className="flex items-center space-x-1">
                    <button type="button" onClick={() => moveUp(index)} className="p-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded transition">
                      <ChevronUp size={10} />
                    </button>
                    <button type="button" onClick={() => moveDown(index)} className="p-1.5 bg-indigo-655 hover:bg-indigo-700 text-white rounded transition">
                      <ChevronDown size={10} />
                    </button>
                    <button type="button" onClick={() => handleEditSelect(menu)} className="p-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded transition">
                      <Edit2 size={10} />
                    </button>
                    <button 
                      type="button" 
                      onClick={() => handleDelete(menu)}
                      className="p-1.5 bg-red-500 hover:bg-red-655 text-white rounded transition"
                    >
                      <Trash2 size={10} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>

      {/* Global save/update action at the bottom */}
      <div className="flex justify-center pt-4">
        <button
          onClick={handleSyncUpdate}
          disabled={saving}
          className="px-8 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold transition active:scale-95 shadow-md shadow-emerald-500/10 disabled:opacity-50 flex items-center space-x-2"
        >
          {saving && <Loader2 size={14} className="animate-spin" />}
          <span>{saving ? 'Updating...' : 'Update'}</span>
        </button>
      </div>

    </div>
  );
}
