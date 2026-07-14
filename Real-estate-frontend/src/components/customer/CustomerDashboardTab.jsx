import React from 'react';
import { Eye, Trash2 } from 'lucide-react';

export default function CustomerDashboardTab({ user = {}, wishlistItems = [], stats = {}, onRemoveWishlist, onViewProperty }) {
  
  const accountInfo = [
    { label: 'Name', value: user.name || 'Test User new' },
    { label: 'Username', value: user.username || 'user' },
    { label: 'Email', value: user.email || 'test@kreativdev.com' },
    { label: 'Phone', value: user.phone || '12345678' },
    { label: 'City', value: user.city || 'Toronto' },
    { label: 'Country', value: user.country || 'United States' },
    { label: 'State', value: user.state || 'California' },
    { label: 'Zip Code', value: user.zip || '75846' },
    { label: 'Address', value: user.address || '123 Queen Street West' }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">

      {/* Stats Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl border border-slate-100 shadow-premium p-6 flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400">Wishlist Properties</span>
            <h4 className="text-2xl font-black text-slate-800 mt-1">{stats?.wishlistCount ?? wishlistItems.length}</h4>
          </div>
          <div className="w-10 h-10 rounded-xl bg-orange-50/50 flex items-center justify-center text-orange-500 font-extrabold text-sm">
            ❤️
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 shadow-premium p-6 flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400">Support Tickets</span>
            <h4 className="text-2xl font-black text-slate-800 mt-1">{stats?.ticketsCount ?? 0}</h4>
          </div>
          <div className="w-10 h-10 rounded-xl bg-blue-50/50 flex items-center justify-center text-blue-550 font-extrabold text-sm">
            🎫
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 shadow-premium p-6 flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400">Conversations</span>
            <h4 className="text-2xl font-black text-slate-800 mt-1">{stats?.messagesCount ?? 0}</h4>
          </div>
          <div className="w-10 h-10 rounded-xl bg-green-50/50 flex items-center justify-center text-green-550 font-extrabold text-sm">
            💬
          </div>
        </div>
      </div>
      
      {/* 1. Account Information Box */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-premium p-6">
        <h3 className="text-sm font-bold text-slate-800 border-b border-slate-100 pb-3 mb-6">
          Account Information
        </h3>
        
        {/* Pills Grid */}
        <div className="flex flex-wrap gap-4">
          {accountInfo.map((info, idx) => (
            <div 
              key={idx} 
              className="border border-slate-150 rounded-xl px-4 py-2.5 bg-slate-50/20 text-xs font-semibold text-slate-700 flex items-center space-x-1.5 shadow-xs"
            >
              <span className="font-bold text-slate-900">{info.label}:</span>
              <span className="text-slate-500">{info.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Wishlists Table Box */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-premium p-6">
        <h3 className="text-sm font-bold text-slate-800 border-b border-slate-100 pb-3 mb-6">
          Wishlists
        </h3>

        {/* Table Filter Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 text-xs text-slate-500 font-medium">
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
              disabled
              placeholder="Search..."
              className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-800 focus:outline-none w-48 font-medium cursor-not-allowed"
            />
          </div>
        </div>

        {/* Wishlist Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 font-bold bg-slate-55/10">
                <th className="p-3 w-16 text-center">Serial</th>
                <th className="p-3">Property title</th>
                <th className="p-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {wishlistItems.map((item, index) => (
                <tr key={item.id} className="hover:bg-slate-50/50 transition bg-white">
                  <td className="p-3 text-center text-slate-700 font-bold">#{index + 1}</td>
                  <td className="p-3 text-slate-800 font-bold">{item.name}</td>
                  <td className="p-3">
                    <div className="flex items-center justify-center space-x-2">
                      <button 
                        type="button" 
                        onClick={() => onViewProperty && onViewProperty(item)}
                        className="px-3 py-1 border border-orange-500 hover:bg-orange-50 text-orange-500 rounded-lg text-[10px] font-bold flex items-center space-x-1.5 transition active:scale-95 shadow-xs"
                      >
                        <Eye size={12} />
                        <span>View</span>
                      </button>
                      <button 
                        type="button"
                        onClick={() => onRemoveWishlist(item.id)}
                        className="px-3 py-1 border border-orange-500 hover:bg-orange-50 text-orange-500 rounded-lg text-[10px] font-bold flex items-center space-x-1.5 transition active:scale-95 shadow-xs"
                      >
                        <Trash2 size={12} />
                        <span>Remove</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {wishlistItems.length === 0 && (
                <tr>
                  <td colSpan="3" className="p-4 text-center text-slate-400">Your wishlist is empty.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer info */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-6 text-xs text-slate-500 font-medium">
          <span>Showing 1 to {wishlistItems.length} of {wishlistItems.length} entries</span>
          <div className="flex items-center space-x-1.5">
            <button className="px-3 py-1 bg-slate-100 rounded text-slate-700 cursor-not-allowed">Previous</button>
            <button className="px-3 py-1 bg-orange-500 text-white rounded font-bold">1</button>
            <button className="px-3 py-1 bg-slate-100 rounded text-slate-700 cursor-not-allowed">Next</button>
          </div>
        </div>
      </div>

    </div>
  );
}
