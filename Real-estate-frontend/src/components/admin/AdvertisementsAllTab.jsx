import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, Plus, ChevronDown, Trash2, Image as ImageIcon } from 'lucide-react';
import AddAdvertisementModal from '../modal/admin/AddAdvertisementModal';

const initialAds = [
  { id: 1, adType: 'Banner', resolution: '728 x 90', views: 36, img: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=80&q=80' },
  { id: 2, adType: 'Banner', resolution: '300 x 250', views: 1, img: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=80&q=80' },
  { id: 3, adType: 'Banner', resolution: '300 x 600', views: 18, img: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=80&q=80' },
  { id: 4, adType: 'Banner', resolution: '300 x 250', views: 2, img: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=80&q=80' },
  { id: 5, adType: 'Banner', resolution: '300 x 250', views: 1, img: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=80&q=80' },
  { id: 6, adType: 'Banner', resolution: '300 x 600', views: 23, img: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=80&q=80' },
  { id: 7, adType: 'Banner', resolution: '728 x 90', views: 52, img: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=80&q=80' }
];

export default function AdvertisementsAllTab({ setActiveTab }) {
  const navigate = useNavigate();
  const [ads, setAds] = useState(initialAds);
  const [search, setSearch] = useState('');
  const [selectedIds, setSelectedIds] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(ads.map(ad => ad.id));
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
    setAds(ads.filter(ad => ad.id !== id));
    setSelectedIds(selectedIds.filter(x => x !== id));
  };

  const handleAddAd = (newAd) => {
    setAds([
      ...ads,
      {
        id: Date.now(),
        adType: newAd.adType,
        resolution: newAd.resolution,
        views: 0,
        img: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=80&q=80'
      }
    ]);
    setIsModalOpen(false);
  };

  const filteredAds = useMemo(() => {
    if (!search) return ads;
    return ads.filter(ad => 
      ad.adType.toLowerCase().includes(search.toLowerCase()) ||
      ad.resolution.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, ads]);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Heading & Breadcrumbs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-slate-100">
        <div>
          <h1 className="text-xl lg:text-2xl font-bold tracking-tight text-slate-900">All Advertisements</h1>
          <div className="flex items-center space-x-2 text-xs text-slate-400 mt-2">
            <Home size={14} className="text-slate-400 cursor-pointer hover:text-blue-600" onClick={() => navigate('/')} />
            <span>&gt;</span>
            <span className="hover:text-blue-600 cursor-pointer" onClick={() => setActiveTab('dashboard')}>Advertisements</span>
            <span>&gt;</span>
            <span className="text-slate-500 font-semibold">All Advertisements</span>
          </div>
        </div>
      </div>

      {/* Main Panel Box */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-premium p-6">
        
        {/* Header elements */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-55 mb-6">
          <h3 className="text-sm font-bold text-slate-800">All Advertisements</h3>
          
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
                    checked={selectedIds.length > 0 && selectedIds.length === ads.length}
                    onChange={handleSelectAll}
                    className="rounded text-blue-600 focus:ring-blue-500" 
                  />
                </th>
                <th className="p-3">Ad Type</th>
                <th className="p-3">Resolution</th>
                <th className="p-3">Image</th>
                <th className="p-3">Views</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredAds.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/50 transition bg-white">
                  <td className="p-3">
                    <input 
                      type="checkbox" 
                      checked={selectedIds.includes(item.id)}
                      onChange={(e) => handleSelectOne(item.id, e.target.checked)}
                      className="rounded text-blue-600 focus:ring-blue-500" 
                    />
                  </td>
                  <td className="p-3 font-semibold text-slate-800">{item.adType}</td>
                  <td className="p-3 font-semibold text-slate-700">{item.resolution}</td>
                  <td className="p-3">
                    {item.img ? (
                      <img src={item.img} alt="Ad Preview" className="h-6 object-contain rounded" />
                    ) : (
                      <ImageIcon size={16} className="text-slate-350" />
                    )}
                  </td>
                  <td className="p-3 font-semibold text-slate-700">{item.views}</td>
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
              {filteredAds.length === 0 && (
                <tr>
                  <td colSpan="6" className="p-4 text-center text-slate-400">No advertisements found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-6 text-xs text-slate-500 font-medium">
          <span>Showing 1 to {filteredAds.length} of {ads.length} entries</span>
          <div className="flex items-center space-x-1.5">
            <button className="px-3 py-1 bg-slate-100 rounded text-slate-700 cursor-not-allowed">Previous</button>
            <button className="px-3 py-1 bg-blue-600 text-white rounded font-bold">1</button>
            <button className="px-3 py-1 bg-slate-100 rounded text-slate-700 cursor-not-allowed">Next</button>
          </div>
        </div>

      </div>

      <AddAdvertisementModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSave={handleAddAd} 
      />
    </div>
  );
}
