import React, { useState } from 'react';
import { Home, Eye, Heart, Star, ChevronLeft, ChevronRight, Mail, Phone, Clock } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { createInquiryAPI } from '../../api/api';
import { useToast } from '../../context/ToastContext';

export default function CustomerPropertyDetailTab({ property, onBack }) {
  const { user } = useAuth();
  const toast = useToast();
  const propertyName = property?.name || 'Luxury Condo with Stunning City Views';
  
  // Local state for carousel images - build from property data
  const images = [];
  if (property?.image) {
    images.push(property.image);
  }
  if (property?.galleryImages && Array.isArray(property.galleryImages)) {
    images.push(...property.galleryImages);
  }
  if (images.length === 0) {
    images.push('https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80');
  }

  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const [messageText, setMessageText] = useState('');
  const [sending, setSending] = useState(false);

  const prevImage = () => {
    setCurrentImgIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setCurrentImgIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!messageText.trim()) return;

    try {
      setSending(true);
      await createInquiryAPI(property?._id || property?.id, messageText);
      toast.success('Message sent to advisor successfully!');
      setMessageText('');
    } catch (err) {
      console.error('Failed to send inquiry message:', err);
      toast.error(err.response?.data?.message || 'Failed to send inquiry message');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Back button */}
      <div>
        <button 
          onClick={onBack}
          className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-lg transition active:scale-95 shadow-xs"
        >
          &larr; Back to Dashboard
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Left Column (Main Property Details) */}
        <div className="flex-1 space-y-6">
          
          {/* Carousel */}
          <div className="bg-white rounded-2xl border border-slate-100 p-4 shadow-premium space-y-4">
            <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-slate-900">
              <img 
                src={images[currentImgIndex]} 
                alt="Property Carousel" 
                className="w-full h-full object-cover transition-all duration-300"
              />
              
              {/* Carousel controls */}
              <button 
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition active:scale-90"
              >
                <ChevronLeft size={18} />
              </button>
              <button 
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition active:scale-90"
              >
                <ChevronRight size={18} />
              </button>
            </div>

            {/* Carousel Thumbnails */}
            <div className="flex space-x-3">
              {images.map((img, idx) => (
                <div 
                  key={idx}
                  onClick={() => setCurrentImgIndex(idx)}
                  className={`w-20 aspect-[16/10] rounded-lg overflow-hidden cursor-pointer border-2 transition ${
                    currentImgIndex === idx ? 'border-orange-500 scale-95' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* Title, Price, and Agent summary */}
          <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-premium space-y-4">
            <div className="flex flex-wrap justify-between items-start gap-4">
              <div>
                <span className="text-[9px] px-2.5 py-0.5 bg-[#e6fcf5] text-[#0ca678] font-black rounded uppercase tracking-wider">
                  {property?.tag || property?.category?.name || 'Condo'}
                </span>
                <h2 className="text-xl font-extrabold text-slate-900 mt-2">{propertyName}</h2>
                <p className="text-xs text-slate-400 font-semibold mt-1">
                  📍 {property?.address || 'No address provided'}, {property?.city || ''}, {property?.state || ''}, {property?.country || ''}
                </p>
              </div>
              <div className="text-right">
                <span className="text-2xl font-black text-orange-500">{property?.price}</span>
              </div>
            </div>

            {/* Agent info summary */}
            <div className="pt-4 border-t border-slate-50 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <img 
                  src={property?.assignedAgent?.avatar || property?.vendor?.avatar || "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&q=80"} 
                  alt="Agent" 
                  className="w-10 h-10 rounded-full object-cover border border-slate-150"
                />
                <div>
                  <h4 className="font-extrabold text-xs text-slate-800">
                    {property?.assignedAgent?.name || property?.vendor?.name || 'Estaty Agent'}
                  </h4>
                  <p className="text-[10px] text-slate-400 font-semibold">
                    {property?.assignedAgent ? 'Listed by Agent' : 'Listed by Vendor'}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3 text-slate-400 text-xs">
                <span className="flex items-center space-x-1">
                  <Eye size={14} />
                  <span>{property?.views || 0} Views</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Heart size={14} className="text-red-500 fill-current" />
                  <span>{property?.leadsCount || 0} Inquiries</span>
                </span>
              </div>
            </div>
          </div>

          {/* Property Description */}
          <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-premium space-y-4">
            <h3 className="text-sm font-extrabold text-slate-800 border-b border-slate-50 pb-2 uppercase tracking-wider">Property Description</h3>
            <p className="text-xs text-slate-500 leading-relaxed font-semibold">
              {property?.description || 'No description provided.'}
            </p>
          </div>

          {/* Horizontal Banner Advertisement */}
          <div className="rounded-2xl overflow-hidden border border-slate-100 shadow-premium bg-gradient-to-r from-orange-400 to-amber-500 p-6 text-white flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[9px] bg-white/20 px-2 py-0.5 rounded uppercase font-bold tracking-wider">Sponsored</span>
              <h4 className="font-black text-sm uppercase">REAL ESTATE Loans For All</h4>
              <p className="text-[10px] opacity-90">Get custom home loans with lowest interest rates today!</p>
            </div>
            <button className="px-4 py-1.5 bg-white text-orange-600 rounded-lg text-[10px] font-black uppercase shadow hover:bg-orange-50 transition active:scale-95">Apply Now</button>
          </div>

          {/* Features */}
          <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-premium space-y-4">
            <h3 className="text-sm font-extrabold text-slate-800 border-b border-slate-50 pb-2 uppercase tracking-wider">Features</h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-xs text-slate-700 font-semibold">
              <div className="space-y-1">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Property Type</span>
                <span className="text-slate-800 font-extrabold">{property?.propertyType || 'Residential'}</span>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Purpose</span>
                <span className="text-slate-800 font-extrabold">{property?.type || 'Buy'}</span>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Beds</span>
                <span className="text-slate-800 font-extrabold">{property?.beds || 0}</span>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Baths</span>
                <span className="text-slate-800 font-extrabold">{property?.baths || 0}</span>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Area</span>
                <span className="text-slate-800 font-extrabold">{property?.area || 'N/A'}</span>
              </div>
              {property?.features && property.features.map((feat, idx) => (
                <div key={idx} className="space-y-1">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">{feat.labelEn}</span>
                  <span className="text-slate-800 font-extrabold">{feat.valueEn}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Amenities */}
          <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-premium space-y-4">
            <h3 className="text-sm font-extrabold text-slate-800 border-b border-slate-50 pb-2 uppercase tracking-wider">Amenities</h3>
            <div className="flex flex-wrap gap-4 text-xs font-bold text-slate-700">
              {property?.amenities && property.amenities.length > 0 ? (
                property.amenities.map((amenity, idx) => (
                  <span key={idx} className="px-3.5 py-1.5 bg-slate-50 rounded-xl border border-slate-150">
                    {amenity.name}
                  </span>
                ))
              ) : (
                <span className="text-slate-400 font-medium">No amenities listed</span>
              )}
            </div>
          </div>

          {/* Video */}
          {property?.videoUrl && (
            <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-premium space-y-4">
              <h3 className="text-sm font-extrabold text-slate-800 border-b border-slate-50 pb-2 uppercase tracking-wider">Video Tour</h3>
              <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-slate-900 group">
                <img 
                  src={property.videoImage || property.image || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"} 
                  alt="Video Preview" 
                  className="w-full h-full object-cover opacity-60 group-hover:scale-102 transition duration-500"
                />
                <a href={property.videoUrl} target="_blank" rel="noopener noreferrer" className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-orange-500 text-white flex items-center justify-center shadow-lg shadow-orange-500/30 group-hover:scale-115 transition duration-300">
                  <span className="text-lg">▶</span>
                </a>
              </div>
            </div>
          )}

          {/* Floor Planning */}
          {property?.floorPlanImage && (
            <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-premium space-y-4">
              <h3 className="text-sm font-extrabold text-slate-800 border-b border-slate-50 pb-2 uppercase tracking-wider">Floor Planning</h3>
              <div className="border border-slate-100 rounded-xl p-4 flex items-center justify-center bg-slate-50/20">
                <img 
                  src={property.floorPlanImage} 
                  alt="Floor Plan Sketch" 
                  className="max-h-96 object-contain"
                />
              </div>
            </div>
          )}

        </div>

        {/* Right Column (Agent Contact & Sidebars) */}
        <div className="w-full lg:w-1/3 space-y-8 shrink-0">
          
          {/* Contact Agent Form Card */}
          <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-premium space-y-6">
            <div className="flex items-center space-x-3">
              <img 
                src={property?.assignedAgent?.avatar || property?.vendor?.avatar || "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&q=80"} 
                alt="Agent" 
                className="w-10 h-10 rounded-full object-cover w-10 h-10"
              />
              <div>
                <h4 className="font-extrabold text-sm text-slate-900 font-sans">
                  {property?.assignedAgent?.name || property?.vendor?.name || 'Leonard Bourne'}
                </h4>
                <p className="text-[10px] text-slate-400 font-semibold leading-relaxed">
                  {property?.assignedAgent?.email || property?.vendor?.email || 'leonard@estacy.com'}
                </p>
              </div>
            </div>

            <form onSubmit={handleSendMessage} className="space-y-4 text-xs font-bold text-slate-655">
              <div className="flex flex-col space-y-1">
                <input 
                  type="text" 
                  required 
                  placeholder="Name*" 
                  defaultValue={user?.name || ''} 
                  className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-850 focus:outline-none focus:ring-1 focus:ring-orange-500/50" 
                />
              </div>
              <div className="flex flex-col space-y-1">
                <input 
                  type="email" 
                  required 
                  placeholder="Email Address*" 
                  defaultValue={user?.email || ''} 
                  className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-850 focus:outline-none focus:ring-1 focus:ring-orange-500/50" 
                />
              </div>
              <div className="flex flex-col space-y-1">
                <input 
                  type="text" 
                  required 
                  placeholder="Phone Number*" 
                  defaultValue={user?.phone || ''} 
                  className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-850 focus:outline-none focus:ring-1 focus:ring-orange-500/50" 
                />
              </div>
              <div className="flex flex-col space-y-1">
                <textarea 
                  required 
                  rows="4" 
                  value={messageText} 
                  onChange={(e) => setMessageText(e.target.value)} 
                  placeholder="Message*" 
                  className="bg-white border border-slate-200 rounded-xl p-3 text-xs font-medium text-slate-850 focus:outline-none focus:ring-1 focus:ring-orange-500/50 w-full" 
                />
              </div>
              <button 
                type="submit" 
                disabled={sending}
                className="w-full py-2.5 bg-[#f97316] hover:bg-orange-600 text-white rounded-xl font-bold text-xs transition active:scale-95 shadow-md shadow-orange-500/10 disabled:opacity-50"
              >
                {sending ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>

          {/* Related Property Sidebar */}
          <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-premium space-y-4">
            <h4 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider border-b border-slate-50 pb-2">Related Property</h4>
            
            <div className="flex space-x-3 items-center">
              <img 
                src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=150&q=80" 
                alt="Related" 
                className="w-16 h-16 rounded-xl object-cover border border-slate-100"
              />
              <div className="space-y-1 text-xs">
                <h5 className="font-extrabold text-slate-800 leading-tight">Elegant House in Town Neighborhood</h5>
                <span className="text-[9px] px-1.5 py-0.5 bg-orange-50 text-orange-600 rounded uppercase font-bold">Villa</span>
                <p className="font-bold text-orange-500 text-xs mt-1">$120,000.00</p>
              </div>
            </div>
          </div>

          {/* Vertical Ad Banner */}
          <div className="relative rounded-2xl overflow-hidden border border-slate-100 shadow-premium aspect-[3/4] bg-slate-950 flex flex-col justify-end p-6 text-white group">
            <img 
              src="https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=400&q=80" 
              alt="Ad Banner" 
              className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-103 transition duration-700"
            />
            <div className="relative z-10 space-y-3">
              <span className="px-2 py-0.5 bg-orange-500 text-white rounded text-[9px] font-bold uppercase tracking-wider">Premium Ad</span>
              <h4 className="text-xl font-black uppercase leading-tight">FOR DREAM HOUSE SALE</h4>
              <p className="text-[10px] opacity-80 font-semibold">Get 20% discount on down payments this week only!</p>
              <button className="w-full py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-[10px] font-black uppercase shadow transition active:scale-95">Contact Advisor</button>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
