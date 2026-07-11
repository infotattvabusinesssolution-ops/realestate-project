import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, Plus, ChevronDown, Trash2, Edit } from 'lucide-react';
import AddRoleModal from '../modal/admin/AddRoleModal';

const initialRoles = [
  { id: 1, name: 'Supervisor' },
  { id: 2, name: 'Moderator' },
  { id: 3, name: 'Admin' }
];

export default function AdminRolesTab({ setActiveTab }) {
  const navigate = useNavigate();
  const [roles, setRoles] = useState(initialRoles);
  const [search, setSearch] = useState('');
  const [selectedIds, setSelectedIds] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(roles.map(r => r.id));
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
    setRoles(roles.filter(r => r.id !== id));
    setSelectedIds(selectedIds.filter(x => x !== id));
  };

  const handleAddRole = (newRole) => {
    setRoles([
      ...roles,
      {
        id: Date.now(),
        name: newRole.name
      }
    ]);
    setIsModalOpen(false);
  };

  const filteredRoles = useMemo(() => {
    if (!search) return roles;
    return roles.filter(r => r.name.toLowerCase().includes(search.toLowerCase()));
  }, [search, roles]);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Heading & Breadcrumbs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-slate-100">
        <div>
          <h1 className="text-xl lg:text-2xl font-bold tracking-tight text-slate-900">Role & Permissions</h1>
          <div className="flex items-center space-x-2 text-xs text-slate-400 mt-2">
            <Home size={14} className="text-slate-400 cursor-pointer hover:text-blue-600" onClick={() => navigate('/')} />
            <span>&gt;</span>
            <span className="hover:text-blue-600 cursor-pointer" onClick={() => setActiveTab('dashboard')}>Admin Management</span>
            <span>&gt;</span>
            <span className="text-slate-500 font-semibold">Role & Permissions</span>
          </div>
        </div>
      </div>

      {/* Main Panel Box */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-premium p-6">
        
        {/* Header elements */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-55 mb-6">
          <h3 className="text-sm font-bold text-slate-800">Roles</h3>
          
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition active:scale-95 shadow-md shadow-blue-500/10"
          >
            <Plus size={14} />
            <span>+ Add Role</span>
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
                    checked={selectedIds.length > 0 && selectedIds.length === roles.length}
                    onChange={handleSelectAll}
                    className="rounded text-blue-600 focus:ring-blue-500" 
                  />
                </th>
                <th className="p-3">Name</th>
                <th className="p-3">Permissions</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredRoles.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/50 transition bg-white">
                  <td className="p-3">
                    <input 
                      type="checkbox" 
                      checked={selectedIds.includes(item.id)}
                      onChange={(e) => handleSelectOne(item.id, e.target.checked)}
                      className="rounded text-blue-600 focus:ring-blue-500" 
                    />
                  </td>
                  <td className="p-3 font-semibold text-slate-800">{item.name}</td>
                  <td className="p-3">
                    <button 
                      onClick={() => alert(`Manage permissions for ${item.name}`)}
                      className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-blue-500 hover:bg-blue-600 text-white rounded text-[10px] font-bold transition shadow-sm active:scale-95"
                    >
                      <Edit size={10} />
                      <span>Manage</span>
                    </button>
                  </td>
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
              {filteredRoles.length === 0 && (
                <tr>
                  <td colSpan="4" className="p-4 text-center text-slate-400">No roles found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-6 text-xs text-slate-500 font-medium">
          <span>Showing 1 to {filteredRoles.length} of {roles.length} entries</span>
          <div className="flex items-center space-x-1.5">
            <button className="px-3 py-1 bg-slate-100 rounded text-slate-700 cursor-not-allowed">Previous</button>
            <button className="px-3 py-1 bg-blue-600 text-white rounded font-bold">1</button>
            <button className="px-3 py-1 bg-slate-100 rounded text-slate-700 cursor-not-allowed">Next</button>
          </div>
        </div>

      </div>

      <AddRoleModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSave={handleAddRole} 
      />
    </div>
  );
}
