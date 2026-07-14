import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, Image as ImageIcon, Loader2, Upload, FileText, X } from 'lucide-react';
import { getAdminUsersAPI, createAdminProjectAPI } from '../../api/api';

export default function ProjectManagementAddTab({ setActiveTab }) {
  const navigate = useNavigate();
  const [features, setFeatures] = useState([{ label: '', value: '' }]);
  const [vendors, setVendors] = useState([]);
  const [saving, setSaving] = useState(false);

  // Form inputs
  const [form, setForm] = useState({
    title: '', address: '', description: '', minPrice: '', maxPrice: '',
    featured: 'No', status: 'Under Construction', latitude: '', longitude: '',
    vendor: '',
  });

  // File Upload States
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [galleryFiles, setGalleryFiles] = useState([]);
  const [floorPlanFiles, setFloorPlanFiles] = useState([]);
  const [documentFiles, setDocumentFiles] = useState([]);

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const res = await getAdminUsersAPI();
        const vendorList = (res.data || []).filter(u => u.role === 'vendor');
        setVendors(vendorList);
      } catch (err) {
        console.error('Error fetching vendors:', err);
      }
    };
    fetchVendors();
  }, []);

  const addFeature = () => {
    setFeatures([...features, { label: '', value: '' }]);
  };

  const removeFeature = (index) => {
    setFeatures(features.filter((_, i) => i !== index));
  };

  const handleFeatureChange = (index, field, value) => {
    const updated = [...features];
    updated[index][field] = value;
    setFeatures(updated);
  };

  // Handlers for file selection
  const handleFeatureImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const handleGalleryChange = (e) => {
    const files = Array.from(e.target.files);
    setGalleryFiles(prev => [...prev, ...files]);
  };

  const handleFloorPlansChange = (e) => {
    const files = Array.from(e.target.files);
    setFloorPlanFiles(prev => [...prev, ...files]);
  };

  const handleDocumentsChange = (e) => {
    const files = Array.from(e.target.files);
    setDocumentFiles(prev => [...prev, ...files]);
  };

  // Remove file helpers
  const removeGalleryFile = (index) => {
    setGalleryFiles(prev => prev.filter((_, i) => i !== index));
  };

  const removeFloorPlanFile = (index) => {
    setFloorPlanFiles(prev => prev.filter((_, i) => i !== index));
  };

  const removeDocumentFile = (index) => {
    setDocumentFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);

    const formData = new FormData();
    formData.append('name', form.title);
    formData.append('location', form.address);
    formData.append('units', '0 Units');
    formData.append('status', form.status);
    formData.append('description', form.description);
    formData.append('minPrice', form.minPrice);
    formData.append('maxPrice', form.maxPrice);
    formData.append('latitude', form.latitude);
    formData.append('longitude', form.longitude);
    formData.append('isFeatured', form.featured === 'Yes' ? 'true' : 'false');
    if (form.vendor) {
      formData.append('builder', form.vendor);
    }

    // Append feature image if selected
    if (imageFile) {
      formData.append('image', imageFile);
    }

    // Append multiple gallery images
    galleryFiles.forEach(file => {
      formData.append('gallery', file);
    });

    // Append multiple floor plans
    floorPlanFiles.forEach(file => {
      formData.append('floorPlans', file);
    });

    // Append multiple documents
    documentFiles.forEach(file => {
      formData.append('documents', file);
    });

    // Filter and append features
    const activeFeatures = features.filter(f => f.label || f.value);
    formData.append('features', JSON.stringify(activeFeatures));

    try {
      await createAdminProjectAPI(formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Project created successfully with media uploads!');
      setActiveTab('project-manage');
    } catch (err) {
      alert('Failed to create project: ' + (err.response?.data?.message || err.message));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Heading & Breadcrumbs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-slate-100">
        <div>
          <h1 className="text-xl lg:text-2xl font-bold tracking-tight text-slate-900">Add Project</h1>
          <div className="flex items-center space-x-2 text-xs text-slate-400 mt-2">
            <Home size={14} className="text-slate-400 cursor-pointer hover:text-blue-600" onClick={() => navigate('/')} />
            <span>&gt;</span>
            <span className="hover:text-blue-600 cursor-pointer" onClick={() => setActiveTab('dashboard')}>Project Management</span>
            <span>&gt;</span>
            <span className="text-slate-500 font-semibold">Add Project</span>
          </div>
        </div>
      </div>

      {/* Main Panel Box */}
      <form onSubmit={handleSave} className="bg-white rounded-2xl border border-slate-100 shadow-premium p-6 space-y-8">
        <h3 className="text-sm font-bold text-slate-800">Add Project</h3>

        {/* Multipart File Upload Areas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Gallery Images Drop Zone */}
          <div className="flex flex-col space-y-2 border border-slate-100 p-4 rounded-2xl bg-slate-50/20">
            <label className="text-xs font-bold text-slate-700">Gallery Images</label>
            <label className="border-2 border-dashed border-slate-200 rounded-2xl p-6 flex flex-col items-center justify-center text-center bg-white hover:bg-slate-50 transition cursor-pointer">
              <Upload size={20} className="text-slate-400 mb-2" />
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Upload Gallery</span>
              <input type="file" multiple accept="image/*" className="hidden" onChange={handleGalleryChange} />
            </label>
            {galleryFiles.length > 0 && (
              <div className="mt-3 space-y-1.5 max-h-36 overflow-y-auto pr-1">
                {galleryFiles.map((file, i) => (
                  <div key={i} className="flex items-center justify-between bg-white border border-slate-150 p-2 rounded-xl text-[10px] text-slate-700">
                    <span className="truncate max-w-[150px] font-medium">{file.name}</span>
                    <button type="button" onClick={() => removeGalleryFile(i)} className="text-red-500 hover:text-red-700 transition">
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Floor Plans Drop Zone */}
          <div className="flex flex-col space-y-2 border border-slate-100 p-4 rounded-2xl bg-slate-50/20">
            <label className="text-xs font-bold text-slate-700">Floor Plans</label>
            <label className="border-2 border-dashed border-slate-200 rounded-2xl p-6 flex flex-col items-center justify-center text-center bg-white hover:bg-slate-50 transition cursor-pointer">
              <Upload size={20} className="text-slate-400 mb-2" />
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Upload Floor Plans</span>
              <input type="file" multiple accept="image/*" className="hidden" onChange={handleFloorPlansChange} />
            </label>
            {floorPlanFiles.length > 0 && (
              <div className="mt-3 space-y-1.5 max-h-36 overflow-y-auto pr-1">
                {floorPlanFiles.map((file, i) => (
                  <div key={i} className="flex items-center justify-between bg-white border border-slate-150 p-2 rounded-xl text-[10px] text-slate-700">
                    <span className="truncate max-w-[150px] font-medium">{file.name}</span>
                    <button type="button" onClick={() => removeFloorPlanFile(i)} className="text-red-500 hover:text-red-700 transition">
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Documents Drop Zone */}
          <div className="flex flex-col space-y-2 border border-slate-100 p-4 rounded-2xl bg-slate-50/20">
            <label className="text-xs font-bold text-slate-700">Project Documents (PDF / Docs)</label>
            <label className="border-2 border-dashed border-slate-200 rounded-2xl p-6 flex flex-col items-center justify-center text-center bg-white hover:bg-slate-50 transition cursor-pointer">
              <FileText size={20} className="text-slate-400 mb-2" />
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Upload Documents</span>
              <input type="file" multiple accept=".pdf,.doc,.docx,.xls,.xlsx,.txt" className="hidden" onChange={handleDocumentsChange} />
            </label>
            {documentFiles.length > 0 && (
              <div className="mt-3 space-y-1.5 max-h-36 overflow-y-auto pr-1">
                {documentFiles.map((file, i) => (
                  <div key={i} className="flex items-center justify-between bg-white border border-slate-150 p-2 rounded-xl text-[10px] text-slate-700">
                    <span className="truncate max-w-[150px] font-medium">{file.name}</span>
                    <button type="button" onClick={() => removeDocumentFile(i)} className="text-red-500 hover:text-red-700 transition">
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Feature Image & Dropdowns */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-start">
          <div className="flex flex-col space-y-2 col-span-1">
            <label className="text-xs font-bold text-slate-700">Feature Image*</label>
            <div className="border border-slate-200 rounded-2xl p-6 flex flex-col items-center justify-center text-center aspect-square bg-slate-50/30 overflow-hidden">
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" className="w-full h-full object-cover rounded-xl" />
              ) : (
                <>
                  <ImageIcon size={28} className="text-slate-300 mb-2" />
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">No Image Found</span>
                </>
              )}
            </div>
            <label className="px-4 py-2 bg-blue-600 text-white font-bold text-xs rounded-xl hover:bg-blue-700 transition cursor-pointer text-center">
              Choose Image
              <input type="file" accept="image/*" className="hidden" onChange={handleFeatureImageChange} />
            </label>
          </div>

          <div className="col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex flex-col space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Min Price *</label>
              <input type="text" placeholder="Enter Minimum Price" value={form.minPrice}
                onChange={(e) => setForm(prev => ({ ...prev, minPrice: e.target.value }))}
                className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200" required />
            </div>

            <div className="flex flex-col space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Max Price</label>
              <input type="text" placeholder="Enter Maximum Price" value={form.maxPrice}
                onChange={(e) => setForm(prev => ({ ...prev, maxPrice: e.target.value }))}
                className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200" />
            </div>

            <div className="flex flex-col space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Featured *</label>
              <select value={form.featured} onChange={(e) => setForm(prev => ({ ...prev, featured: e.target.value }))}
                className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-700 focus:outline-none">
                <option value="No">No</option>
                <option value="Yes">Yes</option>
              </select>
            </div>

            <div className="flex flex-col space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Status *</label>
              <select value={form.status} onChange={(e) => setForm(prev => ({ ...prev, status: e.target.value }))}
                className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-700 focus:outline-none">
                <option value="Under Construction">Under Construction</option>
                <option value="Pre-launching">Pre-launching</option>
                <option value="Complete">Complete</option>
              </select>
            </div>

            <div className="flex flex-col space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Latitude</label>
              <input type="text" placeholder="Enter Latitude" value={form.latitude}
                onChange={(e) => setForm(prev => ({ ...prev, latitude: e.target.value }))}
                className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none" />
            </div>

            <div className="flex flex-col space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Longitude</label>
              <input type="text" placeholder="Enter Longitude" value={form.longitude}
                onChange={(e) => setForm(prev => ({ ...prev, longitude: e.target.value }))}
                className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none" />
            </div>

            <div className="flex flex-col space-y-1.5 sm:col-span-2">
              <label className="text-xs font-bold text-slate-700">Vendor</label>
              <select value={form.vendor} onChange={(e) => setForm(prev => ({ ...prev, vendor: e.target.value }))}
                className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-700 focus:outline-none">
                <option value="">Please Select</option>
                {vendors.map(v => (
                  <option key={v._id} value={v._id}>{v.name}</option>
                ))}
              </select>
              <span className="text-[10px] text-amber-600 font-medium">If you do not select any vendor, then this project will be listed under you</span>
            </div>
          </div>
        </div>

        {/* English Language Section */}
        <div className="border border-slate-100 rounded-2xl overflow-hidden shadow-sm">
          <div className="bg-slate-800 text-white text-xs font-bold px-4 py-3">
            English Language (Default)
          </div>
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Title *</label>
                <input type="text" placeholder="Enter Title" value={form.title}
                  onChange={(e) => setForm(prev => ({ ...prev, title: e.target.value }))}
                  className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none" required />
              </div>
              <div className="flex flex-col space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Address *</label>
                <input type="text" placeholder="Enter Address" value={form.address}
                  onChange={(e) => setForm(prev => ({ ...prev, address: e.target.value }))}
                  className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none" required />
              </div>
            </div>

            <div className="flex flex-col space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Description *</label>
              <div className="border border-slate-200 rounded-xl overflow-hidden bg-slate-50/30">
                <div className="bg-slate-100/80 px-4 py-2 border-b border-slate-200 flex flex-wrap gap-x-4 gap-y-1.5 text-[10px] font-bold text-slate-600 select-none">
                  <span>File</span><span>Edit</span><span>View</span><span>Insert</span><span>Format</span><span>Tools</span><span>Table</span>
                </div>
                <textarea rows={6} value={form.description}
                  onChange={(e) => setForm(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full bg-white px-4 py-3 text-xs text-slate-800 focus:outline-none border-0 resize-none" placeholder="Enter description here..." required></textarea>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Features Section */}
        <div className="space-y-4">
          <h4 className="text-xs font-bold text-slate-800 border-b border-slate-100 pb-2">Additional Features (Optional)</h4>
          <div className="space-y-3">
            {features.map((feature, index) => (
              <div key={index} className="flex flex-wrap sm:flex-nowrap items-center gap-4">
                <div className="flex-1 min-w-[200px] flex flex-col space-y-1">
                  <input
                    type="text"
                    placeholder="Label (English)"
                    value={feature.label}
                    onChange={(e) => handleFeatureChange(index, 'label', e.target.value)}
                    className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 placeholder-slate-450 focus:outline-none"
                  />
                </div>
                <div className="flex-1 min-w-[200px] flex flex-col space-y-1">
                  <input
                    type="text"
                    placeholder="Value (English)"
                    value={feature.value}
                    onChange={(e) => handleFeatureChange(index, 'value', e.target.value)}
                    className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 placeholder-slate-450 focus:outline-none"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <button type="button" onClick={addFeature}
                    className="w-8 h-8 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center transition active:scale-95 shadow-sm font-bold text-lg">
                    +
                  </button>
                  {features.length > 1 && (
                    <button type="button" onClick={() => removeFeature(index)}
                      className="w-8 h-8 rounded-lg bg-red-500 hover:bg-red-650 text-white flex items-center justify-center transition active:scale-95 shadow-sm font-bold text-lg">
                      -
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <div className="flex justify-center pt-4">
          <button type="submit" disabled={saving}
            className="px-8 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold transition active:scale-95 shadow-md shadow-emerald-500/10 disabled:opacity-50 flex items-center space-x-2">
            {saving && <Loader2 size={14} className="animate-spin" />}
            <span>{saving ? 'Saving...' : 'Save'}</span>
          </button>
        </div>

      </form>
    </div>
  );
}
