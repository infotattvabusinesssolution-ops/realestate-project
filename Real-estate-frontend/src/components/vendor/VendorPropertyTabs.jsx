import React, { useState, useEffect, useRef } from 'react';
import { Home, Plus, ChevronDown, Trash2, Building2, Camera, Image } from 'lucide-react';
import axiosInstance from '../../api/axiosInstance';

export function VendorPropertyAddTab({ setActiveTab, onSave, properties }) {
  const [selectedType, setSelectedType] = useState('none'); // 'none', 'commercial', 'residential'
  const [submitting, setSubmitting] = useState(false);

  // --- Dropdown data from API ---
  const [categories, setCategories] = useState([]);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [amenitiesList, setAmenitiesList] = useState([]);
  const [agentsList, setAgentsList] = useState([]);
  const [loadingDropdowns, setLoadingDropdowns] = useState(true);

  // File upload refs & states
  const thumbnailInputRef = useRef(null);
  const floorPlanInputRef = useRef(null);
  const videoImageInputRef = useRef(null);
  const galleryInputRef = useRef(null);

  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [floorPlanUrl, setFloorPlanUrl] = useState('');
  const [videoImageUrl, setVideoImageUrl] = useState('');
  const [galleryUrls, setGalleryUrls] = useState([]);

  const [uploadingThumbnail, setUploadingThumbnail] = useState(false);
  const [uploadingFloorPlan, setUploadingFloorPlan] = useState(false);
  const [uploadingVideoImage, setUploadingVideoImage] = useState(false);
  const [uploadingGallery, setUploadingGallery] = useState(false);

  // Form fields state
  const [videoUrl, setVideoUrl] = useState('');
  const [purpose, setPurpose] = useState('');
  const [category, setCategory] = useState('');
  const [country, setCountry] = useState('');
  const [stateName, setStateName] = useState('');
  const [cityName, setCityName] = useState('');
  const [amenities, setAmenities] = useState([]);
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
    { id: Date.now(), labelEn: '', valueEn: '', labelAr: '', valueAr: '' }
  ]);

  // Fetch dropdown data from specs API (public endpoints)
  useEffect(() => {
    const fetchDropdowns = async () => {
      try {
        setLoadingDropdowns(true);
        const [catRes, countryRes, stateRes, cityRes, amenityRes, agentRes] = await Promise.all([
          axiosInstance.get('/specs/categories'),
          axiosInstance.get('/specs/countries'),
          axiosInstance.get('/specs/states'),
          axiosInstance.get('/specs/cities'),
          axiosInstance.get('/specs/amenities'),
          axiosInstance.get('/vendor/agents'),
        ]);
        setCategories(catRes.data);
        setCountries(countryRes.data);
        setStates(stateRes.data);
        setCities(cityRes.data);
        setAmenitiesList(amenityRes.data);
        setAgentsList(agentRes.data);
      } catch (err) {
        console.error('Failed to load dropdown data:', err);
      } finally {
        setLoadingDropdowns(false);
      }
    };
    fetchDropdowns();
  }, []);

  // Filter categories based on selected property type
  const filteredCategories = categories.filter(c => {
    if (selectedType === 'commercial') return c.type === 'Commercial';
    if (selectedType === 'residential') return c.type === 'Residential';
    return true;
  });

  // Filter states based on selected country
  const filteredStates = states.filter(s =>
    !country || (s.country && (s.country._id === country || s.country.name === country))
  );

  // Filter cities based on selected state
  const filteredCities = cities.filter(c =>
    !stateName || (c.state && (c.state._id === stateName || c.state.name === stateName))
  );

  // Compute real counts from properties prop
  const commercialCount = (properties || []).filter(p => p.propertyType === 'Commercial').length;
  const residentialCount = (properties || []).filter(p => p.propertyType === 'Residential' || !p.propertyType).length;

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

  const handleAmenityToggle = (amenityId) => {
    setAmenities(prev =>
      prev.includes(amenityId)
        ? prev.filter(id => id !== amenityId)
        : [...prev, amenityId]
    );
  };

  // File Upload Helper
  const handleUploadFile = async (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      if (type === 'thumbnail') setUploadingThumbnail(true);
      else if (type === 'floorPlan') setUploadingFloorPlan(true);
      else if (type === 'videoImage') setUploadingVideoImage(true);

      const res = await axiosInstance.post('/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (type === 'thumbnail') setThumbnailUrl(res.data.url);
      else if (type === 'floorPlan') setFloorPlanUrl(res.data.url);
      else if (type === 'videoImage') setVideoImageUrl(res.data.url);

      alert('Image uploaded successfully!');
    } catch (err) {
      alert(err.response?.data?.message || 'Image upload failed');
    } finally {
      if (type === 'thumbnail') setUploadingThumbnail(false);
      else if (type === 'floorPlan') setUploadingFloorPlan(false);
      else if (type === 'videoImage') setUploadingVideoImage(false);
    }
  };

  // Gallery multi uploader
  const handleUploadGallery = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    try {
      setUploadingGallery(true);
      const urls = [];
      for (const file of files) {
        const formData = new FormData();
        formData.append('file', file);
        const res = await axiosInstance.post('/upload', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        urls.push(res.data.url);
      }
      setGalleryUrls([...galleryUrls, ...urls]);
      alert('Gallery images uploaded successfully!');
    } catch (err) {
      alert(err.response?.data?.message || 'Gallery upload failed');
    } finally {
      setUploadingGallery(false);
    }
  };

  const handleRemoveGalleryImage = (index) => {
    setGalleryUrls(galleryUrls.filter((_, i) => i !== index));
  };

  const resetForm = () => {
    setSelectedType('none');
    setVideoUrl('');
    setPurpose('');
    setCategory('');
    setCountry('');
    setStateName('');
    setCityName('');
    setAmenities([]);
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
    setThumbnailUrl('');
    setFloorPlanUrl('');
    setVideoImageUrl('');
    setGalleryUrls([]);
    setFeatures([{ id: Date.now(), labelEn: '', valueEn: '', labelAr: '', valueAr: '' }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !price) {
      alert('Please fill out the Property Title and Price.');
      return;
    }

    // Find selected category name for the tag
    const selectedCat = categories.find(c => c._id === category);
    // Find selected country/state/city names
    const selectedCountry = countries.find(c => c._id === country);
    const selectedState = states.find(s => s._id === stateName);
    const selectedCity = cities.find(c => c._id === cityName);

    const payload = {
      name: title,
      price: price.startsWith('$') ? price : `$${price}`,
      type: purpose || 'For Sell',
      propertyType: selectedType === 'commercial' ? 'Commercial' : 'Residential',
      tag: selectedCat ? selectedCat.name : (selectedType === 'commercial' ? 'Commercial' : 'Villa'),
      address: address || '',
      description: description || '',
      city: selectedCity ? selectedCity.name : '',
      country: selectedCountry ? selectedCountry.name : '',
      state: selectedState ? selectedState.name : '',
      beds: beds || 0,
      baths: baths || 0,
      area: area || '',
      videoUrl: videoUrl || '',
      latitude: latitude || '',
      longitude: longitude || '',
      metaKeywords: metaKeywords || '',
      metaDesc: metaDesc || '',
      titleAr: titleAr || '',
      addressAr: addressAr || '',
      descriptionAr: descriptionAr || '',
      image: thumbnailUrl || undefined,
      floorPlanImage: floorPlanUrl || undefined,
      videoImage: videoImageUrl || undefined,
      galleryImages: galleryUrls
    };

    // Optional references
    if (agent) payload.assignedAgent = agent;
    if (category) payload.category = category;
    if (amenities.length > 0) payload.amenities = amenities;
    
    // Features
    const validFeatures = features.filter(f => f.labelEn || f.valueEn);
    if (validFeatures.length > 0) {
      payload.features = validFeatures.map(f => ({
        labelEn: f.labelEn,
        valueEn: f.valueEn,
        labelAr: f.labelAr,
        valueAr: f.valueAr,
      }));
    }

    try {
      setSubmitting(true);
      await onSave(payload);
      resetForm();
    } catch (err) {
      // Error already handled in parent onSave
    } finally {
      setSubmitting(false);
    }
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
            <span className="text-slate-655">Property Type</span>
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
                <p className="text-[10px] text-slate-400 font-bold mt-1">Total: {commercialCount} Properties</p>
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
                <p className="text-[10px] text-slate-400 font-bold mt-1">Total: {residentialCount} Properties</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // STEP 2: MERGED SINGLE PAGE PROPERTY CREATION FORM
  return (
    <div className="space-y-6 animate-in fade-in duration-300 font-sans">
      
      {/* Header Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
        <h2 className="text-lg font-bold text-slate-800">Add Property</h2>
        <div className="flex items-center space-x-2 text-[10px] font-bold text-slate-400">
          <Home size={12} className="text-slate-350" />
          <span>&gt;</span>
          <span>Property Management</span>
          <span>&gt;</span>
          <span className="text-slate-655">
            Add Property ({selectedType === 'commercial' ? 'Commercial' : 'Residential'})
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 pb-12">
        
        {/* Main form fields box */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-premium p-6 space-y-6">
          <h3 className="text-xs font-bold text-slate-800 border-b border-slate-50 pb-3">Add Property</h3>
          
          <div className="bg-orange-50/50 border border-orange-100 rounded-xl p-3 text-[10px] font-bold text-orange-600">
            You can upload maximum 99 gallery images under one property
          </div>

          {/* Gallery Images Drop Box */}
          <div className="space-y-3">
            <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block">Gallery Images</label>
            <input 
              type="file" 
              multiple 
              ref={galleryInputRef} 
              onChange={handleUploadGallery}
              accept="image/*"
              className="hidden" 
            />
            <div 
              onClick={() => galleryInputRef.current.click()}
              className="border border-dashed border-slate-200 rounded-2xl py-10 flex flex-col items-center justify-center bg-slate-50/30 hover:bg-slate-50 hover:border-blue-400 transition cursor-pointer text-center"
            >
              <Image size={24} className="text-slate-400 mb-2" />
              <span className="text-xs font-bold text-slate-600">
                {uploadingGallery ? 'Uploading Gallery Images...' : 'Click to Upload Gallery Images'}
              </span>
            </div>

            {/* Gallery Images Preview */}
            {galleryUrls.length > 0 && (
              <div className="flex flex-wrap gap-4 pt-3">
                {galleryUrls.map((url, idx) => (
                  <div key={idx} className="relative w-20 h-20 group rounded-xl overflow-hidden border border-slate-150 shadow-sm shrink-0">
                    <img src={url} alt="Gallery" className="w-20 h-20 object-cover" />
                    <button 
                      type="button"
                      onClick={() => handleRemoveGalleryImage(idx)}
                      className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-[9px] font-black tracking-wide transition-opacity duration-205"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Three Image Card Selectors */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Thumbnail Image */}
            <div className="border border-slate-100 rounded-2xl p-6 flex flex-col items-center justify-center space-y-4 bg-white text-center">
              <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">Thumbnail Image*</label>
              <div className="w-28 h-28 border border-dashed border-slate-200 bg-slate-50 rounded-xl overflow-hidden flex flex-col items-center justify-center text-slate-350 text-center relative shrink-0">
                {thumbnailUrl ? (
                  <img src={thumbnailUrl} alt="Thumbnail" className="w-full h-full object-cover" />
                ) : (
                  <>
                    <span className="text-[9px] font-bold text-slate-400 leading-none mb-1">NO IMAGE</span>
                    <span className="text-[9px] font-bold text-slate-400 leading-none">FOUND</span>
                  </>
                )}
                {uploadingThumbnail && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-[9px] font-bold">
                    Uploading...
                  </div>
                )}
              </div>
              <input type="file" ref={thumbnailInputRef} onChange={(e) => handleUploadFile(e, 'thumbnail')} accept="image/*" className="hidden" />
              <button 
                type="button" 
                disabled={uploadingThumbnail}
                onClick={() => thumbnailInputRef.current.click()}
                className="px-4 py-1.5 bg-[#16a34a] hover:bg-green-700 text-white rounded font-bold text-[10px] transition active:scale-95 disabled:opacity-50"
              >
                Choose Image
              </button>
            </div>

            {/* Floor Planning Image */}
            <div className="border border-slate-100 rounded-2xl p-6 flex flex-col items-center justify-center space-y-4 bg-white text-center">
              <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">Floor Planning Image</label>
              <div className="w-28 h-28 border border-dashed border-slate-200 bg-slate-50 rounded-xl overflow-hidden flex flex-col items-center justify-center text-slate-350 text-center relative shrink-0">
                {floorPlanUrl ? (
                  <img src={floorPlanUrl} alt="Floor Plan" className="w-full h-full object-cover" />
                ) : (
                  <>
                    <span className="text-[9px] font-bold text-slate-400 leading-none mb-1">NO IMAGE</span>
                    <span className="text-[9px] font-bold text-slate-400 leading-none">FOUND</span>
                  </>
                )}
                {uploadingFloorPlan && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-[9px] font-bold">
                    Uploading...
                  </div>
                )}
              </div>
              <input type="file" ref={floorPlanInputRef} onChange={(e) => handleUploadFile(e, 'floorPlan')} accept="image/*" className="hidden" />
              <button 
                type="button" 
                disabled={uploadingFloorPlan}
                onClick={() => floorPlanInputRef.current.click()}
                className="px-4 py-1.5 bg-[#16a34a] hover:bg-green-700 text-white rounded font-bold text-[10px] transition active:scale-95 disabled:opacity-50"
              >
                Choose Image
              </button>
            </div>

            {/* Video Image */}
            <div className="border border-slate-100 rounded-2xl p-6 flex flex-col items-center justify-center space-y-4 bg-white text-center">
              <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">Video Image</label>
              <div className="w-28 h-28 border border-dashed border-slate-200 bg-slate-50 rounded-xl overflow-hidden flex flex-col items-center justify-center text-slate-350 text-center relative shrink-0">
                {videoImageUrl ? (
                  <img src={videoImageUrl} alt="Video thumb" className="w-full h-full object-cover" />
                ) : (
                  <>
                    <span className="text-[9px] font-bold text-slate-400 leading-none mb-1">NO IMAGE</span>
                    <span className="text-[9px] font-bold text-slate-400 leading-none">FOUND</span>
                  </>
                )}
                {uploadingVideoImage && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-[9px] font-bold">
                    Uploading...
                  </div>
                )}
              </div>
              <input type="file" ref={videoImageInputRef} onChange={(e) => handleUploadFile(e, 'videoImage')} accept="image/*" className="hidden" />
              <button 
                type="button" 
                disabled={uploadingVideoImage}
                onClick={() => videoImageInputRef.current.click()}
                className="px-4 py-1.5 bg-[#16a34a] hover:bg-green-700 text-white rounded font-bold text-[10px] transition active:scale-95 disabled:opacity-50"
              >
                Choose Image
              </button>
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
                {filteredCategories.map(cat => (
                  <option key={cat._id} value={cat._id}>{cat.name}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-col space-y-1.5">
              <label>Country*</label>
              <select value={country} onChange={(e) => setCountry(e.target.value)} className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none w-full">
                <option value="">Select Country</option>
                {countries.map(c => (
                  <option key={c._id} value={c.name}>{c.name}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-col space-y-1.5">
              <label>State*</label>
              <select value={stateName} onChange={(e) => setStateName(e.target.value)} className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none w-full">
                <option value="">Select State</option>
                {filteredStates.map(s => (
                  <option key={s._id} value={s.name}>{s.name}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-col space-y-1.5">
              <label>City*</label>
              <select value={cityName} onChange={(e) => setCityName(e.target.value)} className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none w-full">
                <option value="">Select City</option>
                {filteredCities.map(c => (
                  <option key={c._id} value={c.name}>{c.name}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-col space-y-1.5">
              <label>Price*</label>
              <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Enter Price (e.g. 5000)" className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none" />
            </div>

            {selectedType === 'residential' && (
              <>
                <div className="flex flex-col space-y-1.5">
                  <label>Beds</label>
                  <input type="text" value={beds} onChange={(e) => setBeds(e.target.value)} placeholder="Enter Beds" className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none" />
                </div>

                <div className="flex flex-col space-y-1.5">
                  <label>Baths</label>
                  <input type="text" value={baths} onChange={(e) => setBaths(e.target.value)} placeholder="Enter Baths" className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none" />
                </div>
              </>
            )}

            <div className="flex flex-col space-y-1.5">
              <label>Area (sqft)*</label>
              <input type="text" value={area} onChange={(e) => setArea(e.target.value)} placeholder="Enter Area" className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none" />
            </div>

            <div className="flex flex-col space-y-1.5">
              <label>Status*</label>
              <select value={status} onChange={(e) => setStatus(e.target.value)} className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none w-full">
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
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

            <div className="flex flex-col space-y-1.5">
              <label>Agent</label>
              <select value={agent} onChange={(e) => setAgent(e.target.value)} className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none w-full">
                <option value="">Select Agent</option>
                {agentsList.map(a => (
                  <option key={a._id} value={a._id}>{a.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Amenities checklist */}
          <div className="space-y-2.5 pt-2">
            <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block">Amenities*</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
              {amenitiesList.map(amenity => {
                const isSelected = amenities.includes(amenity._id);
                return (
                  <button
                    key={amenity._id}
                    type="button"
                    onClick={() => handleAmenityToggle(amenity._id)}
                    className={`px-3 py-2.5 border rounded-xl font-bold text-[10px] uppercase text-center transition active:scale-95 ${
                      isSelected 
                        ? 'bg-blue-600 border-blue-600 text-white shadow-sm' 
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {amenity.name}
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* ENGLISH LANGUAGE CARD */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-premium overflow-hidden">
          <div className="bg-indigo-650 text-white px-6 py-3 text-xs font-extrabold tracking-wide uppercase bg-indigo-600/90">
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
                placeholder="Enter detailed property description..."
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
                className="w-4 h-4 text-blue-600 border-slate-200 rounded focus:ring-blue-500" 
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
            <div className="bg-indigo-650 text-white px-6 py-3 text-xs font-extrabold tracking-wide uppercase bg-indigo-600/90">
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
                    className="w-7 h-7 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center justify-center transition active:scale-90"
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
            disabled={submitting}
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold text-xs transition active:scale-95 shadow-md shadow-blue-500/10"
          >
            {submitting ? 'Saving...' : 'Save'}
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
    type: p.propertyType || 'Residential',
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

  const handleStatusChange = async (id, newActiveState) => {
    try {
      await axiosInstance.put(`/vendor/properties/${id}`, { isActive: newActiveState === 'Active' });
    } catch (err) {
      console.error('Failed to update status:', err);
    }
  };

  const handleFeaturedChange = async (id, newFeaturedState) => {
    try {
      await axiosInstance.put(`/vendor/properties/${id}`, { isFeatured: newFeaturedState === 'Yes' });
    } catch (err) {
      console.error('Failed to update featured:', err);
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

          {/* Add Property Buttons */}
          <div className="flex items-center space-x-2 self-end sm:self-auto">
            <button 
              onClick={onAddClick}
              className="flex items-center space-x-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition active:scale-95 shadow-md shadow-blue-500/10"
            >
              <Plus size={14} />
              <span>Add Property</span>
            </button>
          </div>
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
                        onChange={(e) => handleFeaturedChange(row.id, e.target.value)}
                        className={`text-[10px] font-bold rounded-md px-1.5 py-1 text-white border-0 focus:outline-none ${
                          row.featured === 'Yes' ? 'bg-emerald-500' : 'bg-red-500'
                        }`}
                      >
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </select>
                    </div>
                  </td>
                  <td className="p-3">
                    <select 
                      defaultValue={row.status}
                      onChange={(e) => handleStatusChange(row.id, e.target.value)}
                      className="text-[10px] font-bold rounded-md px-1.5 py-1 bg-emerald-500 text-white border-0 focus:outline-none"
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </td>
                  <td className="p-3 text-right">
                    <div className="flex items-center justify-end space-x-1.5">
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
