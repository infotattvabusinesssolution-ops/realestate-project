import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, Plus, ChevronDown, Trash2, Building2 } from 'lucide-react';
import AddVendorPropertyModal from '../modal/vendor/AddVendorPropertyModal';

const initialProperties = [
  { id: 1, name: 'Serene Meadow Villa', price: '$850,000', views: 24, leads: 5, tag: 'Villa', type: 'Buy', status: 'Active' },
  { id: 2, name: 'Aura Heights Apartment', price: '$3,200/mo', views: 56, leads: 12, tag: 'Apartment', type: 'Rent', status: 'Active' },
  { id: 3, name: 'Oakridge Executive Penthouse', price: '$1,400,000', views: 8, leads: 2, tag: 'Penthouse', type: 'Buy', status: 'Pending Approval' }
];



export function VendorPropertyAddTab({ setActiveTab, onSave }) {
  const [selectedType, setSelectedType] = useState('none'); // 'none', 'commercial', 'residential'
  
  // Form fields state
  const [videoUrl, setVideoUrl] = useState('');
  const [purpose, setPurpose] = useState('');
  const [category, setCategory] = useState('');
  const [country, setCountry] = useState('');
  const [stateName, setStateName] = useState('');
  const [cityName, setCityName] = useState('');
  const [amenities, setAmenities] = useState('');
  const [price, setPrice] = useState('');
  const [beds, setBeds] = useState('');
  const [baths, setBaths] = useState('');
  const [area, setArea] = useState('');
  const [status, setStatus] = useState('Active');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [agent, setAgent] = useState('');

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
    if (!title || !price) {
      alert('Please fill out the Property Title and Price.');
      return;
    }
    onSave({
      name: title,
      price: price.startsWith('$') ? price : `$${price}`,
      tag: category || (selectedType === 'commercial' ? 'Commercial' : 'Villa'),
      type: purpose || 'Buy'
    });
    // Reset
    setSelectedType('none');
    setVideoUrl('');
    setPurpose('');
    setCategory('');
    setCountry('');
    setStateName('');
    setCityName('');
    setAmenities('');
    setPrice('');
    setBeds('');
    setBaths('');
    setArea('');
    setStatus('Active');
    setLatitude('');
    setLongitude('');
    setAgent('');
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

  // STEP 1: CHOOSE PROPERTY TYPE
  if (selectedType === 'none') {
    return (
      <div className="space-y-6 animate-in fade-in duration-300">
        {/* Header Breadcrumb */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
          <h2 className="text-lg font-bold text-slate-800">Choose Property Type</h2>
          <div className="flex items-center space-x-2 text-[10px] font-bold text-slate-400">
            <Home size={12} className="text-slate-350" />
            <span>&gt;</span>
            <span>Property Management</span>
            <span>&gt;</span>
            <span className="text-slate-600">Property Type</span>
          </div>
        </div>

        {/* Outer Box */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-premium p-8">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-6">Choose Property Type</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Commercial Card */}
            <div 
              onClick={() => setSelectedType('commercial')}
              className="border border-slate-100 rounded-3xl p-8 flex flex-col items-center justify-center space-y-4 hover:border-blue-500 hover:shadow-lg transition-all duration-300 cursor-pointer text-center group"
            >
              <div className="w-16 h-16 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:scale-110 transition-transform duration-300">
                <Building2 size={32} />
              </div>
              <div>
                <h4 className="font-extrabold text-slate-800 text-sm tracking-wide uppercase">COMMERCIAL</h4>
                <p className="text-[10px] text-slate-400 font-bold mt-1">Total: 2 Properties</p>
              </div>
            </div>

            {/* Residential Card */}
            <div 
              onClick={() => setSelectedType('residential')}
              className="border border-slate-100 rounded-3xl p-8 flex flex-col items-center justify-center space-y-4 hover:border-blue-500 hover:shadow-lg transition-all duration-300 cursor-pointer text-center group"
            >
              <div className="w-16 h-16 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-lg shadow-amber-500/20 group-hover:scale-110 transition-transform duration-300">
                <Home size={32} />
              </div>
              <div>
                <h4 className="font-extrabold text-slate-800 text-sm tracking-wide uppercase">RESIDENTIAL</h4>
                <p className="text-[10px] text-slate-400 font-bold mt-1">Total: 1 Properties</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // STEP 2: MERGED SINGLE PAGE PROPERTY CREATION FORM
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
        <h2 className="text-lg font-bold text-slate-800">Add Property</h2>
        <div className="flex items-center space-x-2 text-[10px] font-bold text-slate-400">
          <Home size={12} className="text-slate-350" />
          <span>&gt;</span>
          <span>Property Management</span>
          <span>&gt;</span>
          <span className="text-slate-600">
            Add Property ({selectedType === 'commercial' ? 'Commercial' : 'Residential'})
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 pb-12">
        
        {/* Main form fields box */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-premium p-6 space-y-6">
          <h3 className="text-xs font-bold text-slate-800 border-b border-slate-50 pb-3">Add Property</h3>
          
          {/* Uploader notice banner */}
          <div className="bg-orange-50/50 border border-orange-100 rounded-xl p-3 text-[10px] font-bold text-orange-600">
            You can upload maximum 99 gallery images under one property
          </div>

          {/* Gallery Images Drop Box */}
          <div className="space-y-2">
            <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block">Gallery Images**</label>
            <div className="border border-dashed border-slate-200 rounded-2xl py-12 flex flex-col items-center justify-center bg-slate-50/30 hover:bg-slate-50 hover:border-blue-400 transition cursor-pointer text-center">
              <span className="text-xs font-semibold text-slate-450">Drop files here to upload</span>
            </div>
          </div>

          {/* Three Image Card Selectors */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* 1. Thumbnail Image */}
            <div className="border border-slate-100 rounded-2xl p-6 flex flex-col items-center justify-center space-y-4 bg-white text-center">
              <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">Thumbnail Image*</label>
              <div className="w-28 h-28 border border-dashed border-slate-200 bg-slate-50 rounded-xl flex flex-col items-center justify-center text-slate-300 text-center">
                <span className="text-[9px] font-bold text-slate-400 leading-none mb-1">NO IMAGE</span>
                <span className="text-[9px] font-bold text-slate-400 leading-none">FOUND</span>
              </div>
              <button type="button" className="px-4 py-1.5 bg-blue-600 text-white rounded font-bold text-[10px] hover:bg-blue-700 transition">Choose Image</button>
            </div>

            {/* 2. Floor Planning Image */}
            <div className="border border-slate-100 rounded-2xl p-6 flex flex-col items-center justify-center space-y-4 bg-white text-center">
              <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">Floor Planning Image</label>
              <div className="w-28 h-28 border border-dashed border-slate-200 bg-slate-50 rounded-xl flex flex-col items-center justify-center text-slate-300 text-center">
                <span className="text-[9px] font-bold text-slate-400 leading-none mb-1">NO IMAGE</span>
                <span className="text-[9px] font-bold text-slate-400 leading-none">FOUND</span>
              </div>
              <button type="button" className="px-4 py-1.5 bg-blue-600 text-white rounded font-bold text-[10px] hover:bg-blue-700 transition">Choose Image</button>
            </div>

            {/* 3. Video Image */}
            <div className="border border-slate-100 rounded-2xl p-6 flex flex-col items-center justify-center space-y-4 bg-white text-center">
              <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">Video Image</label>
              <div className="w-28 h-28 border border-dashed border-slate-200 bg-slate-50 rounded-xl flex flex-col items-center justify-center text-slate-300 text-center">
                <span className="text-[9px] font-bold text-slate-400 leading-none mb-1">NO IMAGE</span>
                <span className="text-[9px] font-bold text-slate-400 leading-none">FOUND</span>
              </div>
              <button type="button" className="px-4 py-1.5 bg-blue-600 text-white rounded font-bold text-[10px] hover:bg-blue-700 transition">Choose Image</button>
            </div>

          </div>

          {/* Form details input grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-xs font-bold text-slate-700">
            
            <div className="flex flex-col space-y-1.5">
              <label>Video Url</label>
              <input type="text" value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} placeholder="Enter Video url" className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none" />
            </div>

            <div className="flex flex-col space-y-1.5">
              <label>Purpose*</label>
              <select value={purpose} onChange={(e) => setPurpose(e.target.value)} className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none w-full">
                <option value="">Select a Purpose</option>
                <option value="For Sell">For Sell</option>
                <option value="For Rent">For Rent</option>
              </select>
            </div>

            <div className="flex flex-col space-y-1.5">
              <label>Category*</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)} className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none w-full">
                <option value="">Select a Category</option>
                {selectedType === 'commercial' ? (
                  <>
                    <option value="Office">Office</option>
                    <option value="Retail">Retail</option>
                    <option value="Industrial">Industrial</option>
                  </>
                ) : (
                  <>
                    <option value="Villa">Villa</option>
                    <option value="Apartment">Apartment</option>
                    <option value="Penthouse">Penthouse</option>
                  </>
                )}
              </select>
            </div>

            <div className="flex flex-col space-y-1.5">
              <label>Country*</label>
              <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} placeholder="Select Country" className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none" />
            </div>

            <div className="flex flex-col space-y-1.5">
              <label>State*</label>
              <input type="text" value={stateName} onChange={(e) => setStateName(e.target.value)} placeholder="Select State" className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none" />
            </div>

            <div className="flex flex-col space-y-1.5">
              <label>City*</label>
              <input type="text" value={cityName} onChange={(e) => setCityName(e.target.value)} placeholder="Select City" className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none" />
            </div>

            <div className="flex flex-col space-y-1.5">
              <label>Amenities*</label>
              <input type="text" value={amenities} onChange={(e) => setAmenities(e.target.value)} placeholder="Select Amenities" className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none" />
            </div>

            <div className="flex flex-col space-y-1.5">
              <label>Price (NGN)*</label>
              <div>
                <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Enter Current Price" className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none w-full" />
                <p className="text-[9px] text-orange-400 font-bold mt-1 leading-none">If you leave it blank, price will be negotiable.</p>
              </div>
            </div>

            {/* Beds and Baths (ONLY if Residential) */}
            {selectedType === 'residential' && (
              <>
                <div className="flex flex-col space-y-1.5">
                  <label>Beds*</label>
                  <input type="text" value={beds} onChange={(e) => setBeds(e.target.value)} placeholder="Enter number of bed" className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none" />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <label>Baths*</label>
                  <input type="text" value={baths} onChange={(e) => setBaths(e.target.value)} placeholder="Enter number of bath" className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none" />
                </div>
              </>
            )}

            <div className="flex flex-col space-y-1.5">
              <label>Area (sqft)*</label>
              <input type="text" value={area} onChange={(e) => setArea(e.target.value)} placeholder="Enter area (sqft)" className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none" />
            </div>

            <div className="flex flex-col space-y-1.5">
              <label>Status*</label>
              <select value={status} onChange={(e) => setStatus(e.target.value)} className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none w-full">
                <option value="Active">Active</option>
                <option value="Deactive">Deactive</option>
              </select>
            </div>

            <div className="flex flex-col space-y-1.5">
              <label>Latitude*</label>
              <input type="text" value={latitude} onChange={(e) => setLatitude(e.target.value)} placeholder="Enter Latitude" className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none" />
            </div>

            <div className="flex flex-col space-y-1.5">
              <label>Longitude*</label>
              <input type="text" value={longitude} onChange={(e) => setLongitude(e.target.value)} placeholder="Enter Longitude" className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none" />
            </div>

            <div className="flex flex-col space-y-1.5">
              <label>Agent</label>
              <div>
                <select value={agent} onChange={(e) => setAgent(e.target.value)} className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none w-full">
                  <option value="">Select Agent</option>
                  <option value="Alice Smith">Alice Smith</option>
                  <option value="Bob Johnson">Bob Johnson</option>
                </select>
                <p className="text-[9px] text-orange-400 font-bold mt-1 leading-none">If you do not select any agent, then this property will be listed under you</p>
              </div>
            </div>

          </div>

        </div>

        {/* ENGLISH LANGUAGE CARD */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-premium overflow-hidden">
          {/* Header Bar */}
          <div className="bg-[#6366f1] text-white px-6 py-3 text-xs font-extrabold tracking-wide uppercase">
            English Language (Default)
          </div>
          
          {/* Fields */}
          <div className="p-6 space-y-4 text-xs font-bold text-slate-700">
            <div className="flex flex-col space-y-1.5">
              <label>Title*</label>
              <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter Title" className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none" />
            </div>

            <div className="flex flex-col space-y-1.5">
              <label>Address*</label>
              <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Enter Address" className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none" />
            </div>

            <div className="flex flex-col space-y-1.5">
              <label>Description*</label>
              <div className="border border-slate-200 rounded-xl overflow-hidden">
                {/* Rich text mock bar */}
                <div className="bg-slate-50 border-b border-slate-200 p-2 flex flex-wrap gap-2 text-[10px] text-slate-500 font-bold select-none">
                  <span className="px-2 py-0.5 hover:bg-slate-200 rounded cursor-pointer">File</span>
                  <span className="px-2 py-0.5 hover:bg-slate-200 rounded cursor-pointer">Edit</span>
                  <span className="px-2 py-0.5 hover:bg-slate-200 rounded cursor-pointer">View</span>
                  <span className="px-2 py-0.5 hover:bg-slate-200 rounded cursor-pointer">Insert</span>
                  <span className="px-2 py-0.5 hover:bg-slate-200 rounded cursor-pointer">Format</span>
                  <span className="px-2 py-0.5 hover:bg-slate-200 rounded cursor-pointer">Tools</span>
                  <span className="px-2 py-0.5 hover:bg-slate-200 rounded cursor-pointer">Table</span>
                </div>
                <textarea 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows="6"
                  placeholder="Enter detailed property description..."
                  className="w-full p-4 text-xs font-medium text-slate-800 focus:outline-none"
                />
              </div>
            </div>

            <div className="flex flex-col space-y-1.5">
              <label>Meta Keywords*</label>
              <input type="text" value={metaKeywords} onChange={(e) => setMetaKeywords(e.target.value)} placeholder="Enter Meta Keywords" className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none" />
            </div>

            <div className="flex flex-col space-y-1.5">
              <label>Meta Description*</label>
              <textarea value={metaDesc} onChange={(e) => setMetaDesc(e.target.value)} placeholder="Enter Meta description" rows="3" className="bg-white border border-slate-200 rounded-xl p-3 text-xs font-medium text-slate-800 focus:outline-none" />
            </div>

            <div className="flex items-center space-x-2 pt-2">
              <input 
                type="checkbox" 
                id="arabicCheckbox"
                checked={translateArabic}
                onChange={(e) => setTranslateArabic(e.target.checked)}
                className="w-4 h-4 text-blue-600 border-slate-200 rounded focus:ring-blue-500" 
              />
              <label htmlFor="arabicCheckbox" className="font-bold text-xs text-slate-650 cursor-pointer select-none">
                Translate in Arabic language
              </label>
            </div>
          </div>
        </div>

        {/* ARABIC LANGUAGE CARD */}
        {translateArabic && (
          <div className="bg-white rounded-2xl border border-slate-100 shadow-premium overflow-hidden animate-in slide-in-from-top-3 duration-250">
            {/* Header Bar */}
            <div className="bg-[#6366f1] text-white px-6 py-3 text-xs font-extrabold tracking-wide uppercase">
              Arabic Language
            </div>
            
            {/* Fields */}
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
          
          <div className="bg-orange-50/50 border border-orange-100 rounded-xl p-3 text-[10px] font-bold text-orange-600">
            You can add maximum 20 additional features under one property
          </div>

          {/* Table list of features */}
          <div className="space-y-4">
            <div className="grid grid-cols-12 gap-4 text-[10px] font-extrabold text-slate-500 uppercase tracking-wider border-b border-slate-100 pb-2">
              <div className="col-span-5">Label</div>
              <div className="col-span-5">Value</div>
              <div className="col-span-2 text-right">Actions</div>
            </div>

            {features.map((row) => (
              <div key={row.id} className="grid grid-cols-12 gap-4 items-center border-b border-slate-50 pb-4 last:border-0">
                {/* Inputs for English / Arabic labels and values */}
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

                {/* Actions (+/- buttons) */}
                <div className="col-span-2 flex items-center justify-end space-x-1.5">
                  <button 
                    type="button" 
                    onClick={addFeatureRow}
                    className="w-7 h-7 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg flex items-center justify-center transition active:scale-90"
                    title="Add new feature row"
                  >
                    <Plus size={14} />
                  </button>
                  <button 
                    type="button" 
                    onClick={() => removeFeatureRow(row.id)}
                    className="w-7 h-7 bg-red-500 hover:bg-red-600 text-white rounded-lg flex items-center justify-center transition active:scale-90"
                    title="Delete row"
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
            className="px-8 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-bold text-xs transition active:scale-95 shadow-md shadow-emerald-500/10"
          >
            Save
          </button>
        </div>

      </form>
    </div>
  );
}

export function VendorPropertyListTab({ setActiveTab, properties, onDelete, onAddClick }) {
  const [search, setSearch] = useState('');
  const [selectedLang, setSelectedLang] = useState('English');

  // Map API property data to table rows
  const rows = (properties || []).map(p => ({
    id: p.id || p._id,
    title: p.title || p.name,
    postBy: 'Vendor',
    type: p.propertyType || (p.tag === 'Villa' || p.tag === 'Apartment' || p.tag === 'Penthouse' ? 'residential' : 'commercial'),
    city: p.city || '—',
    approval: p.status || 'Pending',
    featured: p.isFeatured ? 'Yes' : 'No',
    status: p.isActive !== false ? 'Active' : 'Inactive',
  }));

  const filteredRows = rows.filter(row => 
    row.title.toLowerCase().includes(search.toLowerCase())
  );

  const getApprovalColor = (approval) => {
    switch (approval) {
      case 'Approved': return 'bg-emerald-500';
      case 'Pending': return 'bg-amber-500';
      case 'Rejected': return 'bg-red-500';
      default: return 'bg-slate-400';
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header & Breadcrumbs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
        <h2 className="text-lg font-bold text-slate-800">Properties</h2>
        <div className="flex items-center space-x-2 text-[10px] font-bold text-slate-400">
          <Home size={12} className="text-slate-350" />
          <span>&gt;</span>
          <span>Property Management</span>
          <span>&gt;</span>
          <span className="text-slate-600">Properties</span>
        </div>
      </div>

      {/* Main Table Box */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-premium p-6">
        
        {/* Filters and Add button */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center space-x-3 w-full sm:w-auto">
            <span className="text-xs font-bold text-slate-500">Properties</span>
            
            {/* Search filter input */}
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Title"
              className="bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-medium text-slate-800 focus:outline-none w-48"
            />

            {/* Language filter select */}
            <select
              value={selectedLang}
              onChange={(e) => setSelectedLang(e.target.value)}
              className="bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-medium text-slate-800 focus:outline-none w-28"
            >
              <option value="English">English</option>
              <option value="Arabic">Arabic</option>
            </select>
          </div>

          {/* Add Property Button */}
          <button 
            onClick={onAddClick}
            className="flex items-center space-x-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition active:scale-95 shadow-md shadow-blue-500/10 self-end sm:self-auto"
          >
            <Plus size={14} />
            <span>Add Property</span>
          </button>
        </div>

        {/* Table layout */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 font-bold bg-slate-50/50">
                <th className="p-3 w-8">
                  <input type="checkbox" className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 w-3.5 h-3.5" />
                </th>
                <th className="p-3">Title</th>
                <th className="p-3">Post by</th>
                <th className="p-3">Type</th>
                <th className="p-3">City</th>
                <th className="p-3">Approval Status</th>
                <th className="p-3">Featured</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredRows.map((row) => (
                <tr key={row.id} className="hover:bg-slate-50/50 transition bg-white">
                  <td className="p-3">
                    <input type="checkbox" className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 w-3.5 h-3.5" />
                  </td>
                  <td className="p-3 font-medium text-blue-600 hover:underline cursor-pointer">{row.title}</td>
                  <td className="p-3">
                    <span className="px-2.5 py-0.5 bg-emerald-500 text-white rounded-full text-[9px] font-bold uppercase">
                      {row.postBy}
                    </span>
                  </td>
                  <td className="p-3 text-slate-500 font-semibold">{row.type}</td>
                  <td className="p-3 text-slate-500 font-semibold">{row.city}</td>
                  <td className="p-3">
                    <span className={`px-2.5 py-0.5 ${getApprovalColor(row.approval)} text-white rounded-full text-[9px] font-bold uppercase`}>
                      {row.approval}
                    </span>
                  </td>
                  <td className="p-3">
                    <div className="flex items-center space-x-1">
                      <select 
                        defaultValue={row.featured}
                        className={`text-[10px] font-bold rounded-md px-1.5 py-1 text-white border-0 focus:outline-none ${
                          row.featured === 'Yes' ? 'bg-emerald-500' : 'bg-red-500'
                        }`}
                      >
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </select>
                      {row.featured === 'Yes' && (
                        <button type="button" className="px-2 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-[10px] font-bold">
                          Edit
                        </button>
                      )}
                    </div>
                  </td>
                  <td className="p-3">
                    <select 
                      defaultValue={row.status}
                      className="text-[10px] font-bold rounded-md px-1.5 py-1 bg-emerald-500 text-white border-0 focus:outline-none"
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </td>
                  <td className="p-3 text-right">
                    <div className="flex items-center justify-end space-x-1.5">
                      <button type="button" className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded text-[10px] font-bold flex items-center space-x-1">
                        <span>Select</span>
                        <ChevronDown size={8} />
                      </button>
                      <button 
                        type="button" 
                        onClick={() => onDelete(row.id)}
                        className="p-1.5 bg-red-50 text-red-500 hover:bg-red-100 rounded-lg transition"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredRows.length === 0 && (
                <tr>
                  <td colSpan="9" className="p-4 text-center text-slate-400">No properties found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer pagination */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-6 text-xs text-slate-500 font-medium">
          <span>Showing 1 to {filteredRows.length} of {rows.length} entries</span>
          <div className="flex items-center space-x-1.5">
            <button className="px-3 py-1 bg-slate-100 rounded text-slate-700 cursor-not-allowed">Previous</button>
            <button className="px-3 py-1 bg-blue-600 text-white rounded font-bold">1</button>
            <button className="px-3 py-1 bg-slate-100 rounded text-slate-700 cursor-not-allowed">Next</button>
          </div>
        </div>

      </div>
    </div>
  );
}
