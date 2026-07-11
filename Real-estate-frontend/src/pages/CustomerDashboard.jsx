import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Globe, ChevronDown, Building2 } from 'lucide-react';
import CustomerDashboardTab from '../components/customer/CustomerDashboardTab';
import CustomerWishlistTab from '../components/customer/CustomerWishlistTab';
import { CustomerSupportTicketsTab, CustomerCreateTicketTab } from '../components/customer/CustomerSupportTicketsTab';
import CustomerChangePasswordTab from '../components/customer/CustomerChangePasswordTab';
import CustomerEditProfileTab from '../components/customer/CustomerEditProfileTab';
import CustomerPropertyDetailTab from '../components/customer/CustomerPropertyDetailTab';
import CustomerTicketDetailView from '../components/customer/CustomerTicketDetailView';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../api/axiosInstance';

export default function CustomerDashboard() {
  const navigate = useNavigate();
  const { user, token, loading, logout, updateProfile } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [wishlistLoading, setWishlistLoading] = useState(true);

  // Authentication redirection
  useEffect(() => {
    if (!loading && !token) {
      navigate('/login/customer');
    }
  }, [token, loading, navigate]);

  // Fetch Wishlist Items from DB
  const fetchWishlist = async () => {
    try {
      const res = await axiosInstance.get('/customer/wishlist');
      const normalized = res.data.map(item => ({
        ...item,
        id: item._id, // compatibility with frontend tables
      }));
      setWishlistItems(normalized);
      setWishlistLoading(false);
    } catch (err) {
      console.error('Failed to load wishlist:', err);
      setWishlistLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchWishlist();
    }
  }, [token]);

  const handleRemoveWishlist = async (id) => {
    try {
      await axiosInstance.delete(`/customer/wishlist/${id}`);
      setWishlistItems(wishlistItems.filter(item => item.id !== id));
    } catch (err) {
      console.error('Failed to remove item:', err);
    }
  };

  const handleUpdateUser = async (updatedUser) => {
    try {
      await updateProfile(updatedUser);
    } catch (err) {
      alert(err || 'Failed to update profile');
    }
  };

  // Render Loader if loading or user details not yet ready
  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  // Sidebar menus matching screenshot exactly
  const sidebarMenus = [
    { id: 'dashboard', name: 'Dashboard' },
    { id: 'wishlist', name: 'My Wishlists' },
    { id: 'tickets', name: 'Support Tickets' },
    { id: 'password', name: 'Change Password' },
    { id: 'profile', name: 'Edit Profile' },
    { id: 'logout', name: 'Logout' }
  ];

  // Dynamic titles and breadcrumbs for the banner based on active tab
  const getBannerDetails = () => {
    switch (activeTab) {
      case 'dashboard':
        return { title: 'Dashboard', breadcrumb: 'Dashboard' };
      case 'wishlist':
        return { title: 'Wishlist Page', breadcrumb: 'Wishlist' };
      case 'tickets':
        return { title: 'Support Tickets', breadcrumb: 'Support Tickets' };
      case 'password':
        return { title: 'Change Password', breadcrumb: 'Change Password' };
      case 'profile':
        return { title: 'Edit Profile', breadcrumb: 'Edit Profile' };
      default:
        return { title: 'Dashboard', breadcrumb: 'Dashboard' };
    }
  };

  const banner = getBannerDetails();

  const handleViewProperty = (prop) => {
    setSelectedProperty(prop);
    setActiveTab('property-detail');
  };

  const handleViewTicket = (ticket) => {
    setSelectedTicket(ticket);
    setActiveTab('ticket-detail');
  };

  const isFullWidthTab = activeTab === 'property-detail';
  const showBanner = activeTab !== 'property-detail' && activeTab !== 'ticket-detail' && activeTab !== 'tickets-add';

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-orange-500 selection:text-white">
      
      {/* 1. Top Navbar Header */}
      <header className="bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between sticky top-0 z-50 shadow-xs">
        {/* Brand logo */}
        <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate('/')}>
          <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center text-white shadow-md shadow-orange-500/20">
            <Building2 size={18} />
          </div>
          <span className="text-xl font-black tracking-tight text-orange-500 font-sans">
            Estaty
          </span>
        </div>

        {/* Center Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-6 text-xs font-bold text-slate-700">
          <button onClick={() => navigate('/')} className="hover:text-orange-500 flex items-center space-x-1 transition">
            <span>Home</span>
            <ChevronDown size={12} className="text-slate-400" />
          </button>
          <button className="hover:text-orange-500 transition">Properties</button>
          <button className="hover:text-orange-500 transition">Projects</button>
          <button className="hover:text-orange-500 transition">Pricing</button>
          <button className="hover:text-orange-500 flex items-center space-x-1 transition">
            <span>Pages</span>
            <ChevronDown size={12} className="text-slate-400" />
          </button>
          <button className="hover:text-orange-500 transition">Contact</button>
        </nav>

        {/* Right side actions */}
        <div className="flex items-center space-x-4">
          {/* English with globe icon */}
          <div className="flex items-center space-x-1.5 text-xs font-bold text-slate-600 cursor-pointer hover:text-slate-900 transition">
            <Globe size={14} className="text-slate-400" />
            <span>English</span>
          </div>

          {/* User selector */}
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => setActiveTab('profile')} 
              className="px-4 py-1.5 border border-orange-500 text-orange-500 rounded-lg text-xs font-bold transition hover:bg-orange-50 shadow-xs"
            >
              User
            </button>
            <button 
              onClick={() => navigate('/login/vendor')} 
              className="px-4 py-1.5 bg-[#1f3e3d] text-white rounded-lg text-xs font-bold transition hover:bg-[#1a3433] shadow-xs"
            >
              Vendor
            </button>
          </div>
        </div>
      </header>

      {/* 2. Top Wide Banner (Conditionally rendered) */}
      {showBanner && (
        <div className="relative h-64 bg-slate-900 overflow-hidden flex flex-col items-center justify-center text-white animate-in fade-in duration-200">
          <img 
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80" 
            alt="Banner" 
            className="absolute inset-0 w-full h-full object-cover opacity-50" 
          />
          <div className="relative z-10 text-center space-y-3">
            <h1 className="text-3xl lg:text-4xl font-extrabold tracking-wide font-sans drop-shadow-md">{banner.title}</h1>
            <p className="text-xs font-bold text-slate-350 tracking-wider">
              <span className="hover:text-white cursor-pointer" onClick={() => navigate('/')}>Home</span> &gt;&gt; <span className="text-orange-500 font-extrabold">{banner.breadcrumb}</span>
            </p>
          </div>
        </div>
      )}

      {/* 3. Main Content Container */}
      <div className="max-w-7xl w-full mx-auto px-6 py-12 flex flex-col lg:flex-row gap-8 flex-1">
        
        {isFullWidthTab ? (
          /* Full-Width layout for Property Detail view */
          <div className="flex-1">
            <CustomerPropertyDetailTab 
              property={selectedProperty}
              onBack={() => setActiveTab('dashboard')}
            />
          </div>
        ) : (
          /* Sidebar + Right Content Layout */
          <>
            {/* Left menu column */}
            <div className="w-full lg:w-1/4 shrink-0">
              <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-premium space-y-2">
                {sidebarMenus.map((item) => {
                  const isActive = item.id === activeTab || 
                    (item.id === 'tickets' && (activeTab === 'ticket-detail' || activeTab === 'tickets-add'));
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        if (item.id === 'logout') {
                          logout();
                          navigate('/');
                        } else {
                          setActiveTab(item.id);
                        }
                      }}
                      className={`w-full text-left px-4 py-3.5 rounded-xl text-xs font-bold border-b border-dashed border-slate-50 last:border-0 transition-all duration-200 active:scale-98 ${
                        isActive 
                          ? 'text-orange-500 bg-orange-50/20' 
                          : 'text-slate-655 hover:text-orange-500 hover:bg-slate-50'
                      }`}
                    >
                      {item.name}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right content column */}
            <div className="flex-1">
              {activeTab === 'dashboard' && (
                <CustomerDashboardTab 
                  user={user} 
                  wishlistItems={wishlistItems} 
                  onRemoveWishlist={handleRemoveWishlist}
                  onViewProperty={handleViewProperty}
                />
              )}

              {activeTab === 'wishlist' && (
                <CustomerWishlistTab 
                  wishlistItems={wishlistItems} 
                  onRemoveWishlist={handleRemoveWishlist} 
                  onViewProperty={handleViewProperty}
                />
              )}

              {activeTab === 'tickets' && (
                <CustomerSupportTicketsTab 
                  onViewTicket={handleViewTicket}
                  onCreateClick={() => setActiveTab('tickets-add')}
                />
              )}

              {activeTab === 'password' && (
                <CustomerChangePasswordTab />
              )}

              {activeTab === 'profile' && (
                <CustomerEditProfileTab 
                  user={user} 
                  onUpdateUser={handleUpdateUser} 
                />
              )}

              {activeTab === 'ticket-detail' && (
                <CustomerTicketDetailView 
                  ticket={selectedTicket}
                  onBack={() => setActiveTab('tickets')}
                />
              )}

              {activeTab === 'tickets-add' && (
                <CustomerCreateTicketTab 
                  onBack={() => setActiveTab('tickets')}
                  onSave={(newTicket) => {
                    setActiveTab('tickets');
                  }}
                />
              )}
            </div>
          </>
        )}

      </div>

      {/* 4. Beautiful Estaty Footer matching screenshots */}
      <footer className="bg-white border-t border-slate-100 pt-16 pb-8">
        <div className="max-w-7xl w-full mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 text-xs font-bold text-slate-500">
          
          {/* Estaty About */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center text-white shadow-md shadow-orange-500/20">
                <Building2 size={18} />
              </div>
              <span className="text-xl font-black tracking-tight text-orange-500 font-sans">
                Estaty
              </span>
            </div>
            <p className="leading-relaxed font-semibold text-slate-400">
              Estaty is a dynamic and forward-thinking real estate company dedicated to providing exceptional real estate services across residential, commercial, and investment properties.
            </p>
            {/* Social Icons Mock */}
            <div className="flex space-x-3 text-slate-400 pt-2 font-black text-sm">
              <span className="cursor-pointer hover:text-orange-500">FB</span>
              <span className="cursor-pointer hover:text-orange-500">TW</span>
              <span className="cursor-pointer hover:text-orange-500">IG</span>
              <span className="cursor-pointer hover:text-orange-500">YT</span>
            </div>
          </div>

          {/* Useful Links */}
          <div className="space-y-4 md:pl-12">
            <h4 className="text-sm font-extrabold text-slate-800 uppercase tracking-wider">Useful Links</h4>
            <ul className="space-y-2.5 font-semibold text-slate-450">
              <li className="hover:text-orange-500 cursor-pointer">About Us</li>
              <li className="hover:text-orange-500 cursor-pointer">Contact</li>
              <li className="hover:text-orange-500 cursor-pointer">Vendors</li>
              <li className="hover:text-orange-500 cursor-pointer">FAQ</li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-4">
            <h4 className="text-sm font-extrabold text-slate-800 uppercase tracking-wider">Contact Us</h4>
            <ul className="space-y-3 font-semibold text-slate-450">
              <li>📍 15th Street 47 W, New York, USA</li>
              <li>📞 +880155879521</li>
              <li>✉️ estaty@gmail.com</li>
            </ul>
          </div>

        </div>

        {/* Copyright */}
        <div className="mt-16 pt-8 border-t border-slate-100 text-center text-slate-400 text-[11px] font-semibold">
          Copyright © 2026. All Rights Reserved.
        </div>
      </footer>

    </div>
  );
}
