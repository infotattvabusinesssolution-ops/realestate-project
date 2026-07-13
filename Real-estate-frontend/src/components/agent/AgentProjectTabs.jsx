import React, { useState } from 'react';
import { Home, Plus, ChevronDown, Trash2 } from 'lucide-react';

export function AgentProjectAddTab({ setActiveTab, onSave }) {
  // Form fields state
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [status, setStatus] = useState('Complete');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  // Language fields state
  const [title, setTitle] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [metaKeywords, setMetaKeywords] = useState('');
  const [metaDesc, setMetaDesc] = useState('');

  const [translateArabic, setTranslateArabic] = useState(false);
  const [titleAr, setTitleAr] = useState('');
  const [addressAr, setAddressAr] = useState('');
  const [descriptionAr, setDescriptionAr] = useState('');

  // Additional features state
  const [features, setFeatures] = useState([
    { id: Date.now(), labelEn: 'Label (English)', valueEn: 'Value (English)', labelAr: 'Label (Arabic)', valueAr: 'Value (Arabic)' }
  ]);

  const addFeatureRow = () => {
    if (features.length >= 20) return;
    setFeatures([...features, { id: Date.now(), labelEn: '', valueEn: '', labelAr: '', valueAr: '' }]);
  };

  const removeFeatureRow = (id) => {
    if (features.length <= 1) return;
    setFeatures(features.filter(f => f.id !== id));
  };

  const handleFeatureChange = (id, field, val) => {
    setFeatures(features.map(f => {
      if (f.id === id) {
        return { ...f, [field]: val };
      }
      return f;
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !minPrice) {
      alert('Please fill out the Project Title and Minimum Price.');
      return;
    }
    
    onSave({
      name: title,
      minPrice: minPrice,
      maxPrice: maxPrice,
      status: status,
      address: address || '',
      description: description || '',
      metaKeywords: metaKeywords || '',
      metaDesc: metaDesc || '',
      titleAr: titleAr || '',
      addressAr: addressAr || '',
      descriptionAr: descriptionAr || '',
      latitude: latitude || '',
      longitude: longitude || '',
      features: features.map(f => ({
        labelEn: f.labelEn,
        valueEn: f.valueEn,
        labelAr: f.labelAr,
        valueAr: f.valueAr
      })).filter(f => f.labelEn || f.valueEn)
    });

    // Reset
    setMinPrice('');
    setMaxPrice('');
    setStatus('Complete');
    setLatitude('');
    setLongitude('');
    setTitle('');
    setAddress('');
    setDescription('');
    setMetaKeywords('');
    setMetaDesc('');
    setTranslateArabic(false);
    setTitleAr('');
    setAddressAr('');
    setDescriptionAr('');
    setFeatures([{ id: Date.now(), labelEn: 'Label (English)', valueEn: 'Value (English)', labelAr: 'Label (Arabic)', valueAr: 'Value (Arabic)' }]);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 font-sans">
      
      {/* Header Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
        <h2 className="text-lg font-bold text-slate-800">Add Project</h2>
        <div className="flex items-center space-x-2 text-[10px] font-bold text-slate-400">
          <Home size={12} className="text-slate-350" />
          <span>&gt;</span>
          <span>Project Management</span>
          <span>&gt;</span>
          <span className="text-slate-600">Add Project</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 pb-12">
        
        {/* Main form fields box */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-premium p-6 space-y-6">
          <h3 className="text-xs font-bold text-slate-800 border-b border-slate-50 pb-3">Add Project</h3>
          
          <div className="bg-orange-50/50 border border-orange-100 rounded-xl p-3 text-[10px] font-bold text-orange-600">
            You can upload maximum 99 gallery images under one project
          </div>

          {/* Form details input grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-xs font-bold text-slate-700">
            
            <div className="flex flex-col space-y-1.5">
              <label>Min Price (NGN)*</label>
              <input type="text" required value={minPrice} onChange={(e) => setMinPrice(e.target.value)} placeholder="Enter Minimum Price" className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none" />
            </div>

            <div className="flex flex-col space-y-1.5">
              <label>Max Price (NGN)</label>
              <input type="text" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} placeholder="Enter Maximum Price" className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none" />
            </div>

            <div className="flex flex-col space-y-1.5">
              <label>Status*</label>
              <select value={status} onChange={(e) => setStatus(e.target.value)} className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none w-full">
                <option value="Complete">Complete</option>
                <option value="Ongoing">Ongoing</option>
              </select>
            </div>

            <div className="flex flex-col space-y-1.5">
              <label>Latitude</label>
              <input type="text" value={latitude} onChange={(e) => setLatitude(e.target.value)} placeholder="Enter Latitude" className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none" />
            </div>

            <div className="flex flex-col space-y-1.5">
              <label>Longitude</label>
              <input type="text" value={longitude} onChange={(e) => setLongitude(e.target.value)} placeholder="Enter Longitude" className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none" />
            </div>
          </div>

        </div>

        {/* ENGLISH LANGUAGE CARD */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-premium overflow-hidden">
          <div className="bg-[#16a34a] text-white px-6 py-3 text-xs font-extrabold tracking-wide uppercase">
            English Language (Default)
          </div>
          
          <div className="p-6 space-y-4 text-xs font-bold text-slate-700">
            <div className="flex flex-col space-y-1.5">
              <label>Title*</label>
              <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter Title" className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none" />
            </div>

            <div className="flex flex-col space-y-1.5">
              <label>Address*</label>
              <input type="text" required value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Enter Address" className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none" />
            </div>

            <div className="flex flex-col space-y-1.5">
              <label>Description*</label>
              <textarea 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                rows="6"
                placeholder="Enter detailed project description..."
                className="bg-white border border-slate-200 rounded-xl p-4 text-xs font-medium text-slate-800 focus:outline-none w-full"
              />
            </div>

            <div className="flex flex-col space-y-1.5">
              <label>Meta Keywords</label>
              <input type="text" value={metaKeywords} onChange={(e) => setMetaKeywords(e.target.value)} placeholder="Enter Meta Keywords" className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none" />
            </div>

            <div className="flex flex-col space-y-1.5">
              <label>Meta Description</label>
              <textarea value={metaDesc} onChange={(e) => setMetaDesc(e.target.value)} placeholder="Enter Meta description" rows="3" className="bg-white border border-slate-200 rounded-xl p-3 text-xs font-medium text-slate-800 focus:outline-none" />
            </div>

            <div className="flex items-center space-x-2 pt-2">
              <input 
                type="checkbox" 
                id="arabicCheckbox"
                checked={translateArabic}
                onChange={(e) => setTranslateArabic(e.target.checked)}
                className="w-4 h-4 text-green-600 border-slate-200 rounded focus:ring-green-500" 
              />
              <label htmlFor="arabicCheckbox" className="font-bold text-xs text-slate-655 cursor-pointer select-none">
                Translate in Arabic language
              </label>
            </div>
          </div>
        </div>

        {/* ARABIC LANGUAGE CARD */}
        {translateArabic && (
          <div className="bg-white rounded-2xl border border-slate-100 shadow-premium overflow-hidden animate-in slide-in-from-top-3 duration-250">
            <div className="bg-[#16a34a] text-white px-6 py-3 text-xs font-extrabold tracking-wide uppercase">
              Arabic Language
            </div>
            
            <div className="p-6 space-y-4 text-xs font-bold text-slate-700">
              <div className="flex flex-col space-y-1.5">
                <label>Title (Arabic)*</label>
                <input type="text" value={titleAr} onChange={(e) => setTitleAr(e.target.value)} placeholder="العنوان" className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none text-right" />
              </div>

              <div className="flex flex-col space-y-1.5">
                <label>Address (Arabic)*</label>
                <input type="text" value={addressAr} onChange={(e) => setAddressAr(e.target.value)} placeholder="العنوان بالتفصيل" className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none text-right" />
              </div>

              <div className="flex flex-col space-y-1.5">
                <label>Description (Arabic)*</label>
                <textarea value={descriptionAr} onChange={(e) => setDescriptionAr(e.target.value)} placeholder="الوصف" rows="5" className="bg-white border border-slate-200 rounded-xl p-3 text-xs font-medium text-slate-800 focus:outline-none text-right" />
              </div>
            </div>
          </div>
        )}

        {/* ADDITIONAL FEATURES SECTION */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-premium p-6 space-y-6">
          <h3 className="text-xs font-bold text-slate-800 border-b border-slate-50 pb-3">Additional Features (Optional)</h3>
          
          <div className="space-y-4">
            <div className="grid grid-cols-12 gap-4 text-[10px] font-extrabold text-slate-500 uppercase tracking-wider border-b border-slate-100 pb-2">
              <div className="col-span-5">Label</div>
              <div className="col-span-5">Value</div>
              <div className="col-span-2 text-right">Actions</div>
            </div>

            {features.map((row) => (
              <div key={row.id} className="grid grid-cols-12 gap-4 items-center border-b border-slate-50 pb-4 last:border-0">
                <div className="col-span-5 space-y-2">
                  <input
                    type="text"
                    value={row.labelEn}
                    onChange={(e) => handleFeatureChange(row.id, 'labelEn', e.target.value)}
                    placeholder="Label (English)"
                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none"
                  />
                  <input
                    type="text"
                    value={row.labelAr}
                    onChange={(e) => handleFeatureChange(row.id, 'labelAr', e.target.value)}
                    placeholder="Label (Arabic)"
                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none text-right"
                  />
                </div>

                <div className="col-span-5 space-y-2">
                  <input
                    type="text"
                    value={row.valueEn}
                    onChange={(e) => handleFeatureChange(row.id, 'valueEn', e.target.value)}
                    placeholder="Value (English)"
                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none"
                  />
                  <input
                    type="text"
                    value={row.valueAr}
                    onChange={(e) => handleFeatureChange(row.id, 'valueAr', e.target.value)}
                    placeholder="Value (Arabic)"
                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none text-right"
                  />
                </div>

                <div className="col-span-2 flex items-center justify-end space-x-1.5">
                  <button 
                    type="button" 
                    onClick={addFeatureRow}
                    className="w-7 h-7 bg-green-600 hover:bg-green-700 text-white rounded-lg flex items-center justify-center transition active:scale-90"
                  >
                    <Plus size={14} />
                  </button>
                  <button 
                    type="button" 
                    onClick={() => removeFeatureRow(row.id)}
                    className="w-7 h-7 bg-red-500 hover:bg-red-650 text-white rounded-lg flex items-center justify-center transition active:scale-90"
                  >
                    <span className="text-lg leading-none font-bold">-</span>
                  </button>
                </div>
              </div>
            ))}

          </div>
        </div>

        {/* Centered Save Button */}
        <div className="flex justify-center pt-6">
          <button 
            type="submit"
            className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-bold text-xs transition active:scale-95 shadow-md shadow-green-500/10"
          >
            Save
          </button>
        </div>

      </form>
    </div>
  );
}

export function AgentProjectListTab({ setActiveTab, projects, onDelete, onUpdate, onAddClick }) {
  const [search, setSearch] = useState('');
  const [selectedLang, setSelectedLang] = useState('English');

  const filteredMock = projects.filter(proj => 
    (proj.name || '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header & Breadcrumbs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
        <h2 className="text-lg font-bold text-slate-800">Project</h2>
        <div className="flex items-center space-x-2 text-[10px] font-bold text-slate-400">
          <Home size={12} className="text-slate-350" />
          <span>&gt;</span>
          <span>Project Management</span>
          <span>&gt;</span>
          <span className="text-slate-655">Projects</span>
        </div>
      </div>

      {/* Main Table Box */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-premium p-6">
        
        {/* Filters and Add button */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center space-x-3 w-full sm:w-auto">
            <span className="text-xs font-bold text-slate-500">Projects</span>
            
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Title"
              className="bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-medium text-slate-800 focus:outline-none w-48 font-medium"
            />

            <select
              value={selectedLang}
              onChange={(e) => setSelectedLang(e.target.value)}
              className="bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-medium text-slate-800 focus:outline-none w-28"
            >
              <option value="English">English</option>
              <option value="Arabic">Arabic</option>
            </select>
          </div>

          {/* Add Project Button */}
          <button 
            onClick={onAddClick}
            className="flex items-center space-x-1.5 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl text-xs font-bold transition active:scale-95 shadow-md shadow-green-500/10 self-end sm:self-auto"
          >
            <Plus size={14} />
            <span>Add Project</span>
          </button>
        </div>

        {/* Projects Table layout */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 font-bold bg-slate-50/50">
                <th className="p-3 w-8">
                  <input type="checkbox" className="rounded border-slate-300 text-green-600 focus:ring-green-500 w-3.5 h-3.5" />
                </th>
                <th className="p-3">Title</th>
                <th className="p-3">Post by</th>
                <th className="p-3">Approval Status</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredMock.map((row) => (
                <tr key={row.id} className="hover:bg-slate-50/50 transition bg-white">
                  <td className="p-3">
                    <input type="checkbox" className="rounded border-slate-300 text-green-600 focus:ring-green-500 w-3.5 h-3.5" />
                  </td>
                  <td className="p-3 font-medium text-green-600 hover:underline cursor-pointer">
                    {selectedLang === 'Arabic' && row.titleAr ? row.titleAr : row.name}
                  </td>
                  <td className="p-3">
                    <span className="px-2.5 py-0.5 bg-green-600 text-white rounded-full text-[9px] font-bold uppercase">
                      Agent
                    </span>
                  </td>
                  <td className="p-3">
                    <span className="px-2.5 py-0.5 bg-green-600 text-white rounded-full text-[9px] font-bold uppercase">
                      {row.approvalStatus || 'Approved'}
                    </span>
                  </td>
                  <td className="p-3">
                    <select 
                      value={row.status || 'Complete'}
                      onChange={(e) => onUpdate(row.id, { status: e.target.value })}
                      className="text-[10px] font-bold rounded-md px-1.5 py-1 bg-green-600 text-white border-0 focus:outline-none"
                    >
                      <option value="Complete">Complete</option>
                      <option value="Ongoing">Ongoing</option>
                    </select>
                  </td>
                  <td className="p-3 text-right">
                    <div className="flex items-center justify-end space-x-1.5">
                      <button 
                        type="button" 
                        onClick={() => onDelete(row.id)}
                        className="p-1.5 bg-red-50 text-red-500 hover:bg-red-100 rounded-lg transition active:scale-90"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredMock.length === 0 && (
                <tr>
                  <td colSpan="6" className="p-4 text-center text-slate-400">No projects found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer pagination */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-6 text-xs text-slate-500 font-medium">
          <span>Showing 1 to {filteredMock.length} of {projects.length} entries</span>
          <div className="flex items-center space-x-1.5">
            <button className="px-3 py-1 bg-slate-100 rounded text-slate-700 cursor-not-allowed">Previous</button>
            <button className="px-3 py-1 bg-green-600 text-white rounded font-bold">1</button>
            <button className="px-3 py-1 bg-slate-100 rounded text-slate-700 cursor-not-allowed">Next</button>
          </div>
        </div>

      </div>
    </div>
  );
}
