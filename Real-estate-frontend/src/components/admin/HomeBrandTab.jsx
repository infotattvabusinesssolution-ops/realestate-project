import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, Plus, Edit2, Trash2 } from 'lucide-react';
import AddBrandModal from '../modal/admin/AddBrandModal';

const initialBrands = [
  { id: 1, logo: 'https://images.unsplash.com/photo-1516876437184-593fda40c7ce?auto=format&fit=crop&w=300&q=80', name: 'WEPIDRA' },
  { id: 2, logo: 'https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?auto=format&fit=crop&w=300&q=80', name: 'AVEXI' },
  { id: 3, logo: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=300&q=80', name: 'ZETIXE' },
  { id: 4, logo: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=300&q=80', name: 'VECTRO' }
];

export default function HomeBrandTab({ setActiveTab }) {
  const navigate = useNavigate();
  const [brands, setBrands] = useState(initialBrands);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddBrand = (newBrand) => {
    setBrands([
      ...brands,
      {
        id: Date.now(),
        logo: 'https://images.unsplash.com/photo-1516876437184-593fda40c7ce?auto=format&fit=crop&w=300&q=80', // Default placeholder
        name: 'New Brand'
      }
    ]);
    setIsModalOpen(false);
  };

  const handleDeleteBrand = (id) => {
    setBrands(brands.filter(b => b.id !== id));
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Heading & Breadcrumbs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-slate-100">
        <div>
          <h1 className="text-xl lg:text-2xl font-bold tracking-tight text-slate-900">Brand Section</h1>
          <div className="flex items-center space-x-2 text-xs text-slate-400 mt-2">
            <Home size={14} className="text-slate-400 cursor-pointer hover:text-blue-600" onClick={() => navigate('/')} />
            <span>&gt;</span>
            <span className="hover:text-blue-600 cursor-pointer" onClick={() => setActiveTab('dashboard')}>Home Page</span>
            <span>&gt;</span>
            <span className="text-slate-500 font-semibold">Brand Section</span>
          </div>
        </div>
      </div>

      {/* Main Panel Box */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-premium p-6">
        
        {/* Header elements */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-50 mb-6">
          <h3 className="text-sm font-bold text-slate-800">Brands</h3>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-650 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition active:scale-95 shadow-md shadow-blue-500/10"
          >
            <Plus size={14} />
            <span>+ Add</span>
          </button>
        </div>

        {/* Brands Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {brands.map((brand) => (
            <div key={brand.id} className="border border-slate-100 rounded-2xl p-6 flex flex-col items-center justify-between bg-slate-50/50 hover:shadow-premium transition duration-300">
              
              {/* Brand Logo Wrapper */}
              <div className="h-16 flex items-center justify-center mb-6">
                <span className="font-extrabold text-slate-500 text-xl tracking-widest filter grayscale select-none uppercase">
                  {brand.name}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-2">
                <button type="button" className="p-2 bg-indigo-650 hover:bg-indigo-700 text-white rounded-lg transition active:scale-95">
                  <Edit2 size={12} />
                </button>
                <button 
                  type="button" 
                  onClick={() => handleDeleteBrand(brand.id)}
                  className="p-2 bg-red-500 hover:bg-red-650 text-white rounded-lg transition active:scale-95"
                >
                  <Trash2 size={12} />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>

      <AddBrandModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleAddBrand}
      />
    </div>
  );
}
