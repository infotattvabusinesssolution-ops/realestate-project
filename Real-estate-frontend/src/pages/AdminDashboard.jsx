import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, Building2, HardHat, DollarSign, CheckCircle2, 
  Clock, ShieldAlert, Plus, Check, X, ArrowUpRight, Search, 
  Settings, ShieldCheck, LayoutDashboard, Sliders, Award, Mail, 
  ClipboardList, Package, Menu, FileText, Users2, Globe, 
  ChevronDown, ChevronRight, Moon, Sun, Bell, LogOut, Key, UserCheck, Play, MessageSquare, LifeBuoy, Home, CreditCard
} from 'lucide-react';
import { 
  ResponsiveContainer, LineChart, Line, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend 
} from 'recharts';
import { adminStats, mockProperties, mockAgents } from '../data/mockData';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../api/axiosInstance';
import PaymentLogTab from '../components/admin/PaymentLogTab';
import BlogPostsTab from '../components/admin/BlogPostsTab';
import BlogCategoriesTab from '../components/admin/BlogCategoriesTab';
import VendorsManagementTab from '../components/admin/VendorsManagementTab';
import UsersManagementTab from '../components/admin/UsersManagementTab';
import AddUserTab from '../components/admin/AddUserTab';
import SubscribersTab from '../components/admin/SubscribersTab';
import PropertySpecificationsTab from '../components/admin/PropertySpecificationsTab';
import PropertySpecsSettingsTab from '../components/admin/PropertySpecsSettingsTab';
import PropertySpecsCategoriesTab from '../components/admin/PropertySpecsCategoriesTab';
import PropertySpecsAmenitiesTab from '../components/admin/PropertySpecsAmenitiesTab';
import PropertySpecsCountriesTab from '../components/admin/PropertySpecsCountriesTab';
import PropertySpecsStatesTab from '../components/admin/PropertySpecsStatesTab';
import PropertySpecsCitiesTab from '../components/admin/PropertySpecsCitiesTab';
import PropertyManagementSettingsTab from '../components/admin/PropertyManagementSettingsTab';
import PropertyManagementAddTab from '../components/admin/PropertyManagementAddTab';
import PropertyManagementListTab from '../components/admin/PropertyManagementListTab';
import FeaturedPropertiesPricingTab from '../components/admin/FeaturedPropertiesPricingTab';
import FeaturedPropertiesRequestsTab from '../components/admin/FeaturedPropertiesRequestsTab';
import PropertyMessagesTab from '../components/admin/PropertyMessagesTab';
import ProjectManagementSettingsTab from '../components/admin/ProjectManagementSettingsTab';
import ProjectManagementAddTab from '../components/admin/ProjectManagementAddTab';
import ProjectManagementListTab from '../components/admin/ProjectManagementListTab';
import ProjectTypesTab from '../components/admin/ProjectTypesTab';
import AgentsTab from '../components/admin/AgentsTab';
import PackageManagementSettingsTab from '../components/admin/PackageManagementSettingsTab';
import PackageManagementListTab from '../components/admin/PackageManagementListTab';
import MenuBuilderTab from '../components/admin/MenuBuilderTab';
import VendorSettingsTab from '../components/admin/VendorSettingsTab';
import VendorListTab from '../components/admin/VendorListTab';
import VendorAddTab from '../components/admin/VendorAddTab';
import TicketsSettingsTab from '../components/admin/TicketsSettingsTab';
import TicketsListTab from '../components/admin/TicketsListTab';
import HomeHeroTab from '../components/admin/HomeHeroTab';
import HomeAboutTab from '../components/admin/HomeAboutTab';
import HomeWhyChooseTab from '../components/admin/HomeWhyChooseTab';
import HomeBrandTab from '../components/admin/HomeBrandTab';
import HomePropertySectionTab from '../components/admin/HomePropertySectionTab';
import HomeFeaturedPropertySectionTab from '../components/admin/HomeFeaturedPropertySectionTab';
import HomeCounterSectionTab from '../components/admin/HomeCounterSectionTab';
import HomeCitySectionTab from '../components/admin/HomeCitySectionTab';
import HomeTestimonialSectionTab from '../components/admin/HomeTestimonialSectionTab';
import HomeVendorSectionTab from '../components/admin/HomeVendorSectionTab';
import HomeSubscribeSectionTab from '../components/admin/HomeSubscribeSectionTab';
import HomeSectionShowHideTab from '../components/admin/HomeSectionShowHideTab';
import FooterLogoImageTab from '../components/admin/FooterLogoImageTab';
import FooterContentTab from '../components/admin/FooterContentTab';
import FooterQuickLinksTab from '../components/admin/FooterQuickLinksTab';
import CustomPagesTab from '../components/admin/CustomPagesTab';
import CustomPagesAddTab from '../components/admin/CustomPagesAddTab';
import BlogPostAddTab from '../components/admin/BlogPostAddTab';
import FAQManagementTab from '../components/admin/FAQManagementTab';
import AdvertisementsSettingsTab from '../components/admin/AdvertisementsSettingsTab';
import AdvertisementsAllTab from '../components/admin/AdvertisementsAllTab';
import AnnouncementPopupsTab from '../components/admin/AnnouncementPopupsTab';
import AnnouncementPopupAddTab from '../components/admin/AnnouncementPopupAddTab';
import OnlineGatewaysTab from '../components/admin/OnlineGatewaysTab';
import OfflineGatewaysTab from '../components/admin/OfflineGatewaysTab';
import AdminRolesTab from '../components/admin/AdminRolesTab';
import AdminListTab from '../components/admin/AdminListTab';
import LanguageManagementTab from '../components/admin/LanguageManagementTab';
import AdminEditProfileTab from '../components/admin/AdminEditProfileTab';
import AdminChangePasswordTab from '../components/admin/AdminChangePasswordTab';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { user, token, loading, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [profileExpanded, setProfileExpanded] = useState(false);
  const [menuSearch, setMenuSearch] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [properties, setProperties] = useState([]);
  const [globalProperties, setGlobalProperties] = useState([]);
  const [stats, setStats] = useState(null);
  
  const [blogExpanded, setBlogExpanded] = useState(false);
  const [usersExpanded, setUsersExpanded] = useState(false);
  const [specsExpanded, setSpecsExpanded] = useState(false);
  const [managementExpanded, setManagementExpanded] = useState(false);
  const [featuredExpanded, setFeaturedExpanded] = useState(false);
  const [projectsExpanded, setProjectsExpanded] = useState(false);
  const [packagesExpanded, setPackagesExpanded] = useState(false);
  const [vendorsExpanded, setVendorsExpanded] = useState(false);
  const [ticketsExpanded, setTicketsExpanded] = useState(false);
  const [homeExpanded, setHomeExpanded] = useState(false);
  const [footerExpanded, setFooterExpanded] = useState(false);
  const [advertisementsExpanded, setAdvertisementsExpanded] = useState(false);
  const [paymentGatewaysExpanded, setPaymentGatewaysExpanded] = useState(false);
  const [adminManagementExpanded, setAdminManagementExpanded] = useState(false);

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    if (window.innerWidth < 640) {
      setSidebarOpen(false);
    }
  };

  // Authentication check
  useEffect(() => {
    if (!loading && (!token || (user && user.role !== 'admin'))) {
      navigate('/login/admin');
    }
  }, [token, loading, user, navigate]);

  // Fetch admin stats & properties list
  const fetchAdminData = async () => {
    if (!token) return;
    try {
      const statsRes = await axiosInstance.get('/admin/stats');
      setStats(statsRes.data);
      setProperties(statsRes.data.recentProperties);

      const propsRes = await axiosInstance.get('/admin/properties');
      const normalizedProps = propsRes.data.map(p => ({
        ...p,
        id: p._id,
        views: p.views || 0,
        leads: p.leadsCount || 0
      }));
      setGlobalProperties(normalizedProps);
    } catch (err) {
      console.error('Failed to load admin stats:', err);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, [token]);

  const adminUser = {
    name: user?.name || 'Leonard Bourne',
    avatar: user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    email: user?.email || 'leonard@estacy.com'
  };

  const handleApprove = async (id) => {
    try {
      await axiosInstance.put(`/admin/properties/${id}/approve`);
      setProperties(properties.map(p => p.id === id ? { ...p, status: 'Approved' } : p));
      setGlobalProperties(globalProperties.map(p => p.id === id ? { ...p, status: 'Approved' } : p));
    } catch (err) {
      alert('Failed to approve property listing.');
    }
  };

  const handleReject = async (id) => {
    try {
      await axiosInstance.put(`/admin/properties/${id}/reject`);
      setProperties(properties.map(p => p.id === id ? { ...p, status: 'Rejected' } : p));
      setGlobalProperties(globalProperties.map(p => p.id === id ? { ...p, status: 'Rejected' } : p));
    } catch (err) {
      alert('Failed to reject property listing.');
    }
  };

  // Recharts Chart 1: Monthly Package Purchase (2026) - flat line at 0
  const packagePurchaseData = [
    { month: 'Jan', 'Monthly Package Purchase': 0 },
    { month: 'Feb', 'Monthly Package Purchase': 0 },
    { month: 'Mar', 'Monthly Package Purchase': 0 },
    { month: 'Apr', 'Monthly Package Purchase': 0 },
    { month: 'May', 'Monthly Package Purchase': 0 },
    { month: 'Jun', 'Monthly Package Purchase': 0 },
    { month: 'Jul', 'Monthly Package Purchase': 0 },
    { month: 'Aug', 'Monthly Package Purchase': 0 },
    { month: 'Sep', 'Monthly Package Purchase': 0 },
    { month: 'Oct', 'Monthly Package Purchase': 0 },
    { month: 'Nov', 'Monthly Package Purchase': 0 },
    { month: 'Dec', 'Monthly Package Purchase': 0 }
  ];

  // Recharts Chart 2: Month wise registered users (2026) - curve line peaking at Apr (4) and Jun (2)
  const registeredUsersData = [
    { month: 'Jan', 'Month wise registered users': 1.0 },
    { month: 'Feb', 'Month wise registered users': 0 },
    { month: 'Mar', 'Month wise registered users': 3.0 },
    { month: 'Apr', 'Month wise registered users': 4.0 },
    { month: 'May', 'Month wise registered users': 0 },
    { month: 'Jun', 'Month wise registered users': 2.0 },
    { month: 'Jul', 'Month wise registered users': 0 },
    { month: 'Aug', 'Month wise registered users': 0 },
    { month: 'Sep', 'Month wise registered users': 0 },
    { month: 'Oct', 'Month wise registered users': 0 },
    { month: 'Nov', 'Month wise registered users': 0 },
    { month: 'Dec', 'Month wise registered users': 0 }
  ];

  // Sidebar Menu Items config
  const sidebarMenus = [
    { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard },
    { 
      id: 'property-specifications', 
      name: 'Property Specifications', 
      icon: Sliders, 
      hasCaret: true,
      hasSubmenu: true,
      submenus: [
        { id: 'spec-settings', name: 'Settings' },
        { id: 'spec-categories', name: 'Categories' },
        { id: 'spec-amenities', name: 'Amenities' },
        { id: 'spec-countries', name: 'Countries' },
        { id: 'spec-states', name: 'States' },
        { id: 'spec-cities', name: 'Cities' }
      ]
    },
    { 
      id: 'property-management', 
      name: 'Property Management', 
      icon: Building2, 
      hasCaret: true,
      hasSubmenu: true,
      submenus: [
        { id: 'property-settings', name: 'Settings' },
        { id: 'property-add', name: 'Add Property' },
        { id: 'property-manage', name: 'Manage Properties' }
      ]
    },
    { 
      id: 'featured-properties', 
      name: 'Featured Properties', 
      icon: Award, 
      hasCaret: true,
      hasSubmenu: true,
      submenus: [
        { id: 'featured-pricing', name: 'Pricing' },
        { id: 'featured-all', name: 'All Request' },
        { id: 'featured-pending', name: 'Pending Request' },
        { id: 'featured-accepted', name: 'Accepted Request' },
        { id: 'featured-rejected', name: 'Rejected Request' }
      ]
    },
    { id: 'property-messages', name: 'Property Messages', icon: Mail },
    { 
      id: 'project-management', 
      name: 'Project Management', 
      icon: ClipboardList, 
      hasCaret: true,
      hasSubmenu: true,
      submenus: [
        { id: 'project-settings', name: 'Settings' },
        { id: 'project-add', name: 'Add Project' },
        { id: 'project-manage', name: 'Manage Projects' }
      ]
    },
    { id: 'agents', name: 'Agents', icon: Users2 },
    { 
      id: 'package-management', 
      name: 'Package Management', 
      icon: Package, 
      hasCaret: true,
      hasSubmenu: true,
      submenus: [
        { id: 'package-settings', name: 'Settings' },
        { id: 'package-list', name: 'Packages' }
      ]
    },
    { id: 'menu-builder', name: 'Menu Builder', icon: Menu },
    { id: 'payment-log', name: 'Payment Log', icon: FileText },
    { 
      id: 'users-management', 
      name: 'Users Management', 
      icon: Users, 
      hasCaret: true,
      hasSubmenu: true, 
      submenus: [
        { id: 'users-registered', name: 'Registered Users' },
        { id: 'users-add', name: 'Add User' },
        { id: 'users-subscribers', name: 'Subscribers' }
      ]
    },
    { 
      id: 'vendors-management', 
      name: 'Vendors Management', 
      icon: HardHat, 
      hasCaret: true,
      hasSubmenu: true,
      submenus: [
        { id: 'vendor-settings', name: 'Settings' },
        { id: 'vendor-list', name: 'Registered vendors' },
        { id: 'vendor-add', name: 'Add vendor' }
      ]
    },
    { 
      id: 'support-tickets', 
      name: 'Support Tickets', 
      icon: LifeBuoy, 
      hasCaret: true,
      hasSubmenu: true,
      submenus: [
        { id: 'tickets-settings', name: 'Setting' },
        { id: 'tickets-all', name: 'All Tickets' },
        { id: 'tickets-pending', name: 'Pending Tickets' },
        { id: 'tickets-open', name: 'Open Tickets' },
        { id: 'tickets-closed', name: 'Closed Tickets' }
      ]
    },
    { 
      id: 'home-page', 
      name: 'Home Page', 
      icon: Globe, 
      hasCaret: true,
      hasSubmenu: true,
      submenus: [
        { id: 'home-hero', name: 'Hero Section' },
        { id: 'home-about', name: 'About Section' },
        { id: 'home-why-choose', name: 'Why Choose Us Section' },
        { id: 'home-brand', name: 'Brand Section' },
        { id: 'home-property', name: 'Property Section' },
        { id: 'home-featured-property', name: 'Featured Property Section' },
        { id: 'home-counter', name: 'Counter Section' },
        { id: 'home-city', name: 'City Section' },
        { id: 'home-testimonial', name: 'Testimonial Section' },
        { id: 'home-vendor', name: 'Vendor Section' },
        { id: 'home-subscribe', name: 'Subscribe Section' },
        { id: 'home-show-hide', name: 'Section Show/Hide' }
      ]
    },
    { 
      id: 'footer-management', 
      name: 'Footer', 
      icon: Menu, 
      hasCaret: true,
      hasSubmenu: true,
      submenus: [
        { id: 'footer-logo', name: 'Logo & Image' },
        { id: 'footer-content', name: 'Content' },
        { id: 'footer-links', name: 'Quick Links' }
      ]
    },
    { id: 'custom-pages', name: 'Custom Pages', icon: FileText, hasCaret: true },
    { 
      id: 'blog-management', 
      name: 'Blog Management', 
      icon: Globe, 
      hasCaret: true,
      hasSubmenu: true, 
      submenus: [
        { id: 'blog-categories', name: 'Categories' },
        { id: 'blog-posts', name: 'Posts' }
      ]
    },
    { id: 'faq-management', name: 'FAQ Management', icon: ShieldAlert },
    { 
      id: 'advertisements', 
      name: 'Advertisements', 
      icon: Award, 
      hasCaret: true,
      hasSubmenu: true,
      submenus: [
        { id: 'advertisements-settings', name: 'Settings' },
        { id: 'advertisements-all', name: 'All Advertisements' }
      ]
    },
    { id: 'announcement-popups', name: 'Announcement Popups', icon: Bell },
    { 
      id: 'payment-gateways', 
      name: 'Payment Gateways', 
      icon: CreditCard, 
      hasCaret: true,
      hasSubmenu: true,
      submenus: [
        { id: 'online-gateways', name: 'Online Gateways' },
        { id: 'offline-gateways', name: 'Offline Gateways' }
      ]
    },
    { 
      id: 'admin-management', 
      name: 'Admin Management', 
      icon: ShieldCheck, 
      hasCaret: true,
      hasSubmenu: true,
      submenus: [
        { id: 'admin-roles', name: 'Role & Permissions' },
        { id: 'admin-list', name: 'Registered Admins' }
      ]
    },
    { id: 'language-management', name: 'Language Management', icon: Globe }
  ];

  // Filter menu options based on search input
  const filteredMenus = sidebarMenus.filter(item => 
    item.name.toLowerCase().includes(menuSearch.toLowerCase())
  );

  // Mock Payment Logs data (count: 6)
  const mockPaymentLogs = [
    { id: 1, txn: 'TXN-984311', user: 'Sarah Jenkins', package: 'Premium Gold Package', amount: '$499.00', date: 'Jul 6, 2026', status: 'Completed' },
    { id: 2, txn: 'TXN-984312', user: 'Oscar Eade', package: 'Builder Elite Package', amount: '$899.00', date: 'Jul 5, 2026', status: 'Completed' },
    { id: 3, txn: 'TXN-984313', user: 'David Tennant', package: 'Standard Project Bump', amount: '$99.00', date: 'Jul 2, 2026', status: 'Completed' },
    { id: 4, txn: 'TXN-984314', user: 'Clara Oswald', package: 'Agent Monthly Subscription', amount: '$149.00', date: 'Jun 28, 2026', status: 'Completed' },
    { id: 5, txn: 'TXN-984315', user: 'Arthur Dent', package: 'Featured Listing Gold', amount: '$249.00', date: 'Jun 24, 2026', status: 'Completed' },
    { id: 6, txn: 'TXN-984316', user: 'Leonard Bourne', package: 'Super Admin Portal License', amount: '$0.00', date: 'Jun 20, 2026', status: 'Free' }
  ];

  // Mock Property Specifications
  const mockSpecs = [
    { id: 1, category: 'Flooring', options: 'Marble, Hardwood, Ceramic Tiles' },
    { id: 2, category: 'Furnishing', options: 'Fully Furnished, Semi Furnished, Unfurnished' },
    { id: 3, category: 'Amenities', options: 'Swimming Pool, Gym, Gated Security, Parking, Elevator' }
  ];

  // Mock Messages
  const mockMessages = [
    { id: 1, sender: 'Clara Oswald', email: 'clara@tardis.org', subject: 'Inquiry on Serene Meadow Villa', date: 'Today, 10:14 AM', text: 'Hello, I would like to schedule an inspection of Meadow Villa.' },
    { id: 2, sender: 'David Tennant', email: 'david@doctor.com', subject: 'Aura Heights Booking options', date: 'Yesterday, 3:45 PM', text: 'What options do you have for 3-bedroom penthouses in Aura Heights?' }
  ];

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen flex flex-col font-sans ${darkMode ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-800'}`}>
      
      {/* 1. Full-Width Top Navigation Bar */}
      <header className="h-16 bg-white border-b border-slate-100 flex items-center justify-between px-6 sticky top-0 z-50 shadow-sm">
        <div className="flex items-center space-x-4">
          {/* Estaty Brand Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center text-white shadow-md shadow-orange-500/20">
              <Building2 size={18} />
            </div>
            <span className="text-xl font-extrabold tracking-tight text-slate-950">
              Estaty
            </span>
          </div>
        </div>

        {/* Top Right Controls */}
        <div className="flex items-center space-x-4">
          {/* Language Globe Icon (Purple styled badge) */}
          <button className="w-8 h-8 rounded-full bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition flex items-center justify-center">
            <Globe size={16} />
          </button>

          {/* Theme Toggle Button */}
          <button 
            onClick={() => setDarkMode(!darkMode)}
            className="w-8 h-8 rounded-full bg-slate-50 text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition flex items-center justify-center"
          >
            {darkMode ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          {/* Admin Avatar Circle */}
          <div className="relative">
            <img
              src={adminUser.avatar}
              alt={adminUser.name}
              className="w-8 h-8 rounded-full object-cover ring-2 ring-slate-100 cursor-pointer"
              onClick={() => setProfileExpanded(!profileExpanded)}
            />
          </div>

          {/* Mobile Sidebar Toggle Button (visible only on mobile) */}
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="sm:hidden w-8 h-8 rounded-full bg-slate-50 text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition flex items-center justify-center active:scale-95 border border-slate-100"
          >
            <Menu size={16} />
          </button>
        </div>
      </header>

      {/* Main Container below Top Bar */}
      <div className="flex-1 flex relative">
        
        {/* Floating Menu button when sidebar is closed */}
        {!sidebarOpen && (
          <button 
            onClick={() => setSidebarOpen(true)}
            className="hidden sm:block absolute top-4 left-4 z-50 p-2.5 bg-white text-slate-600 hover:text-slate-900 rounded-xl border border-slate-150 shadow-md hover:shadow-lg transition active:scale-95 animate-in fade-in zoom-in duration-200"
          >
            <Menu size={16} />
          </button>
        )}
        
        {/* 2. Custom Left Sidebar */}
        <aside className={`bg-white border-r border-slate-100 flex flex-col transition-all duration-300 shadow-sm shrink-0 sticky top-16 h-[calc(100vh-64px)] z-40 overflow-y-auto ${
          sidebarOpen ? 'w-64' : 'w-0 -translate-x-full overflow-hidden'
        }`}>
          
          {/* Sidebar Header with Toggle */}
          <div className="p-4 flex items-center justify-between border-b border-slate-100 shrink-0">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Menu</span>
            <button 
              onClick={() => setSidebarOpen(false)}
              className="p-1.5 text-slate-500 hover:text-slate-850 hover:bg-slate-100 rounded-lg transition active:scale-95"
            >
              <Menu size={16} />
            </button>
          </div>

          {/* User Profile Card */}
          <div className="p-4 border-b border-slate-100">
            <div 
              onClick={() => setProfileExpanded(!profileExpanded)}
              className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 transition cursor-pointer"
            >
              <div className="flex items-center space-x-3">
                <img 
                  src={adminUser.avatar} 
                  alt={adminUser.name} 
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-slate-100" 
                />
                <div>
                  <h4 className="font-extrabold text-sm text-slate-900 leading-none">{adminUser.name.split(' ')[0]}</h4>
                  <span className="text-[10px] text-slate-400 font-semibold tracking-wider block mt-1">Super Admin</span>
                </div>
              </div>
              <ChevronDown size={14} className={`text-slate-400 transition-transform duration-200 ${profileExpanded ? 'rotate-180' : ''}`} />
            </div>

            {/* Profile Dropdown Expandable Options */}
            {profileExpanded && (
              <div className="mt-3 px-2 py-2 bg-slate-50 rounded-xl space-y-1 text-xs font-bold text-slate-600 animate-in slide-in-from-top-2 duration-200">
                <button 
                  onClick={() => {
                    setActiveTab('admin-edit-profile');
                    setProfileExpanded(false);
                  }}
                  className="w-full flex items-center space-x-2.5 px-3 py-2 rounded-lg hover:bg-white hover:text-slate-900 transition text-left"
                >
                  <UserCheck size={14} className="text-slate-400" />
                  <span>Edit Profile</span>
                </button>
                <button 
                  onClick={() => {
                    setActiveTab('admin-change-password');
                    setProfileExpanded(false);
                  }}
                  className="w-full flex items-center space-x-2.5 px-3 py-2 rounded-lg hover:bg-white hover:text-slate-900 transition text-left"
                >
                  <Key size={14} className="text-slate-400" />
                  <span>Change Password</span>
                </button>
                <button 
                  onClick={() => {
                    logout();
                    navigate('/');
                  }}
                  className="w-full flex items-center space-x-2.5 px-3 py-2 rounded-lg hover:bg-white hover:text-red-650 transition text-left text-red-500"
                >
                  <LogOut size={14} className="text-red-400" />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>

          {/* Search Menu Input */}
          <div className="p-4 border-b border-slate-100">
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={menuSearch}
                onChange={(e) => setMenuSearch(e.target.value)}
                placeholder="Search Menu Here..."
                className="w-full bg-slate-50 border border-slate-100 hover:bg-slate-100/50 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-200 transition-all font-medium"
              />
              {menuSearch && (
                <button 
                  onClick={() => setMenuSearch('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X size={12} />
                </button>
              )}
            </div>
          </div>

          {/* Menu Items List */}
          <nav className="p-4 space-y-1 flex-1">
            {filteredMenus.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id || 
                (item.id === 'blog-management' && (activeTab === 'blog-posts' || activeTab === 'blog-categories')) ||
                (item.id === 'users-management' && (activeTab === 'users-registered' || activeTab === 'users-add' || activeTab === 'users-subscribers')) ||
                (item.id === 'property-specifications' && (activeTab === 'spec-settings' || activeTab === 'spec-categories' || activeTab === 'spec-amenities' || activeTab === 'spec-countries' || activeTab === 'spec-states' || activeTab === 'spec-cities')) ||
                (item.id === 'property-management' && (activeTab === 'property-settings' || activeTab === 'property-add' || activeTab === 'property-manage')) ||
                (item.id === 'featured-properties' && (activeTab === 'featured-pricing' || activeTab === 'featured-all' || activeTab === 'featured-pending' || activeTab === 'featured-accepted' || activeTab === 'featured-rejected')) ||
                (item.id === 'project-management' && (activeTab === 'project-settings' || activeTab === 'project-add' || activeTab === 'project-manage')) ||
                (item.id === 'package-management' && (activeTab === 'package-settings' || activeTab === 'package-list')) ||
                (item.id === 'vendors-management' && (activeTab === 'vendor-settings' || activeTab === 'vendor-list' || activeTab === 'vendor-add')) ||
                (item.id === 'support-tickets' && (activeTab === 'tickets-settings' || activeTab === 'tickets-all' || activeTab === 'tickets-pending' || activeTab === 'tickets-open' || activeTab === 'tickets-closed')) ||
                (item.id === 'footer-management' && (activeTab === 'footer-logo' || activeTab === 'footer-content' || activeTab === 'footer-links')) ||
                (item.id === 'advertisements' && (activeTab === 'advertisements-settings' || activeTab === 'advertisements-all')) ||
                (item.id === 'announcement-popups' && (activeTab === 'announcement-popups' || activeTab === 'announcement-popups-add')) ||
                (item.id === 'payment-gateways' && (activeTab === 'online-gateways' || activeTab === 'offline-gateways')) ||
                (item.id === 'admin-management' && (activeTab === 'admin-roles' || activeTab === 'admin-list')) ||
                (item.id === 'home-page' && (activeTab === 'home-hero' || activeTab === 'home-about' || activeTab === 'home-why-choose' || activeTab === 'home-brand' || activeTab === 'home-property' || activeTab === 'home-featured-property' || activeTab === 'home-counter' || activeTab === 'home-city' || activeTab === 'home-testimonial' || activeTab === 'home-vendor' || activeTab === 'home-subscribe' || activeTab === 'home-show-hide'));
              
              if (item.hasSubmenu) {
                let isExpanded = false;
                let toggleExpand = () => {};
                if (item.id === 'blog-management') {
                  isExpanded = blogExpanded;
                  toggleExpand = () => setBlogExpanded(!blogExpanded);
                } else if (item.id === 'users-management') {
                  isExpanded = usersExpanded;
                  toggleExpand = () => setUsersExpanded(!usersExpanded);
                } else if (item.id === 'property-specifications') {
                  isExpanded = specsExpanded;
                  toggleExpand = () => setSpecsExpanded(!specsExpanded);
                } else if (item.id === 'property-management') {
                  isExpanded = managementExpanded;
                  toggleExpand = () => setManagementExpanded(!managementExpanded);
                } else if (item.id === 'featured-properties') {
                  isExpanded = featuredExpanded;
                  toggleExpand = () => setFeaturedExpanded(!featuredExpanded);
                } else if (item.id === 'project-management') {
                  isExpanded = projectsExpanded;
                  toggleExpand = () => setProjectsExpanded(!projectsExpanded);
                } else if (item.id === 'package-management') {
                  isExpanded = packagesExpanded;
                  toggleExpand = () => setPackagesExpanded(!packagesExpanded);
                } else if (item.id === 'vendors-management') {
                  isExpanded = vendorsExpanded;
                  toggleExpand = () => setVendorsExpanded(!vendorsExpanded);
                } else if (item.id === 'support-tickets') {
                  isExpanded = ticketsExpanded;
                  toggleExpand = () => setTicketsExpanded(!ticketsExpanded);
                } else if (item.id === 'home-page') {
                  isExpanded = homeExpanded;
                  toggleExpand = () => setHomeExpanded(!homeExpanded);
                } else if (item.id === 'footer-management') {
                  isExpanded = footerExpanded;
                  toggleExpand = () => setFooterExpanded(!footerExpanded);
                } else if (item.id === 'advertisements') {
                  isExpanded = advertisementsExpanded;
                  toggleExpand = () => setAdvertisementsExpanded(!advertisementsExpanded);
                } else if (item.id === 'payment-gateways') {
                  isExpanded = paymentGatewaysExpanded;
                  toggleExpand = () => setPaymentGatewaysExpanded(!paymentGatewaysExpanded);
                } else if (item.id === 'admin-management') {
                  isExpanded = adminManagementExpanded;
                  toggleExpand = () => setAdminManagementExpanded(!adminManagementExpanded);
                }
                return (
                  <div key={item.id} className="space-y-1">
                    <button
                      onClick={toggleExpand}
                      className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 active:scale-95 ${
                        isActive && !isExpanded
                          ? 'bg-blue-600 text-white shadow-md shadow-blue-500/10' 
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <Icon size={16} className={isActive && !isExpanded ? 'text-white' : 'text-slate-400'} />
                        <span>{item.name}</span>
                      </div>
                      <ChevronDown size={12} className={`transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''} ${isActive && !isExpanded ? 'text-white' : 'text-slate-400'}`} />
                    </button>
                    
                    {isExpanded && (
                      <div className="pl-6 space-y-1 py-1 border-l border-slate-100 ml-4">
                        {item.submenus.map((sub) => {
                          const isSubActive = activeTab === sub.id;
                          return (
                            <button
                              key={sub.id}
                              onClick={() => handleTabClick(sub.id)}
                              className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg text-[11px] font-bold text-left transition ${
                                isSubActive 
                                  ? 'bg-blue-50 text-blue-600' 
                                  : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                              }`}
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-current opacity-60"></span>
                              <span>{sub.name}</span>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    if (item.id === 'home-page') {
                      navigate('/');
                    } else {
                      handleTabClick(item.id);
                    }
                  }}
                  className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 active:scale-95 ${
                    isActive 
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-500/10' 
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon size={16} className={isActive ? 'text-white' : 'text-slate-400'} />
                    <span>{item.name}</span>
                  </div>
                  {item.hasCaret && (
                    <ChevronRight size={12} className={isActive ? 'text-white' : 'text-slate-400'} />
                  )}
                </button>
              );
            })}

            {filteredMenus.length === 0 && (
              <p className="text-center text-xs text-slate-400 py-6">No menus found.</p>
            )}
          </nav>
        </aside>

        {/* 3. Main Content Panel Area */}
        <main className={`flex-1 overflow-y-auto max-h-[calc(100vh-64px)] transition-all duration-300 ${
          sidebarOpen 
            ? 'py-6 px-2 sm:px-6 lg:p-10' 
            : 'py-6 px-2 sm:pr-6 sm:pl-16 lg:pt-10 lg:pb-10 lg:pr-10 lg:pl-24'
        } space-y-8`}>
          
          {/* TAB 1: DASHBOARD VIEW (Matching the user's screenshot exactly!) */}
          {activeTab === 'dashboard' && (
            <div className="space-y-8 animate-in fade-in duration-300">
              
              {/* Header Title */}
              <div>
                <h1 className="text-xl lg:text-2xl font-bold text-slate-800 tracking-tight">
                  Welcome back, {adminUser.name}!
                </h1>
              </div>

              {/* Grid of 5 Solid-Colored Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                
                {/* Card 1: Payment Logs (Blue) */}
                <div 
                  onClick={() => setActiveTab('payment-log')}
                  className="bg-blue-600 text-white rounded-xl p-5 shadow-lg relative overflow-hidden group hover:scale-[1.02] transition-transform duration-300 cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <h4 className="text-xs font-semibold text-white/80 tracking-wide uppercase">Payment Logs</h4>
                      <p className="text-3xl font-extrabold">6</p>
                    </div>
                    <div className="p-3 bg-white/10 rounded-lg text-white">
                      <FileText size={24} />
                    </div>
                  </div>
                </div>

                {/* Card 2: Blog (Sky Blue) */}
                <div 
                  onClick={() => setActiveTab('blog-posts')}
                  className="bg-sky-400 text-white rounded-xl p-5 shadow-lg relative overflow-hidden group hover:scale-[1.02] transition-transform duration-300 cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <h4 className="text-xs font-semibold text-white/80 tracking-wide uppercase">Blog</h4>
                      <p className="text-3xl font-extrabold">7</p>
                    </div>
                    <div className="p-3 bg-white/10 rounded-lg text-white">
                      <Globe size={24} />
                    </div>
                  </div>
                </div>

                {/* Card 3: Vendors (Purple) */}
                <div 
                  onClick={() => setActiveTab('vendor-list')}
                  className="bg-purple-600 text-white rounded-xl p-5 shadow-lg relative overflow-hidden group hover:scale-[1.02] transition-transform duration-300 cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <h4 className="text-xs font-semibold text-white/80 tracking-wide uppercase">Vendors</h4>
                      <p className="text-3xl font-extrabold">{stats?.totalVendors !== undefined ? stats.totalVendors : 11}</p>
                    </div>
                    <div className="p-3 bg-white/10 rounded-lg text-white">
                      <Users2 size={24} />
                    </div>
                  </div>
                </div>

                {/* Card 4: Users (Pink) */}
                <div 
                  onClick={() => setActiveTab('users-registered')}
                  className="bg-pink-500 text-white rounded-xl p-5 shadow-lg relative overflow-hidden group hover:scale-[1.02] transition-transform duration-300 cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <h4 className="text-xs font-semibold text-white/80 tracking-wide uppercase">Users</h4>
                      <p className="text-3xl font-extrabold">{stats?.totalUsers !== undefined ? stats.totalUsers : 10}</p>
                    </div>
                    <div className="p-3 bg-white/10 rounded-lg text-white">
                      <Users size={24} />
                    </div>
                  </div>
                </div>

                {/* Card 5: Subscribers (Dark Navy) */}
                <div 
                  onClick={() => setActiveTab('users-subscribers')}
                  className="bg-slate-800 text-white rounded-xl p-5 shadow-lg relative overflow-hidden group hover:scale-[1.02] transition-transform duration-300 cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <h4 className="text-xs font-semibold text-white/80 tracking-wide uppercase">Subscribers</h4>
                      <p className="text-3xl font-extrabold">39</p>
                    </div>
                    <div className="p-3 bg-white/10 rounded-lg text-white">
                      <Bell size={24} />
                    </div>
                  </div>
                </div>

              </div>

              {/* side-by-side Line Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* Chart 1: Monthly Package Purchase (2026) */}
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-premium">
                  <h3 className="text-sm font-bold text-slate-800 mb-6">Monthly Package Purchase (2026)</h3>
                  <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={packagePurchaseData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                        <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} domain={[-1.0, 1.0]} ticks={[-1.0, -0.8, -0.6, -0.4, -0.2, 0, 0.2, 0.4, 0.6, 0.8, 1.0]} />
                        <Tooltip contentStyle={{ background: '#0f172a', borderRadius: '12px', border: 'none', color: '#fff', fontSize: '11px' }} />
                        <Legend iconType="rect" verticalAlign="bottom" align="center" wrapperStyle={{ fontSize: '11px', paddingTop: '15px' }} />
                        <Line type="linear" dataKey="Monthly Package Purchase" stroke="#2563eb" strokeWidth={2} dot={{ fill: '#2563eb', strokeWidth: 1.5, r: 3 }} activeDot={{ r: 5 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Chart 2: Month wise registered users (2026) */}
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-premium">
                  <h3 className="text-sm font-bold text-slate-800 mb-6">Month wise registered users (2026)</h3>
                  <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={registeredUsersData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                        <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} domain={[0, 4.0]} ticks={[0, 0.5, 1.0, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0]} />
                        <Tooltip contentStyle={{ background: '#0f172a', borderRadius: '12px', border: 'none', color: '#fff', fontSize: '11px' }} />
                        <Legend iconType="rect" verticalAlign="bottom" align="center" wrapperStyle={{ fontSize: '11px', paddingTop: '15px' }} />
                        <Line type="monotone" dataKey="Month wise registered users" stroke="#3b82f6" strokeWidth={2} dot={{ fill: '#3b82f6', strokeWidth: 1.5, r: 3 }} activeDot={{ r: 5 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* TAB: PROPERTY SPECIFICATIONS - Settings */}
          {activeTab === 'spec-settings' && (
            <PropertySpecsSettingsTab setActiveTab={setActiveTab} />
          )}

          {/* TAB: PROPERTY SPECIFICATIONS - Categories */}
          {activeTab === 'spec-categories' && (
            <PropertySpecsCategoriesTab setActiveTab={setActiveTab} />
          )}

          {/* TAB: PROPERTY SPECIFICATIONS - Amenities */}
          {activeTab === 'spec-amenities' && (
            <PropertySpecsAmenitiesTab setActiveTab={setActiveTab} />
          )}

          {/* TAB: PROPERTY SPECIFICATIONS - Countries */}
          {activeTab === 'spec-countries' && (
            <PropertySpecsCountriesTab setActiveTab={setActiveTab} />
          )}

          {/* TAB: PROPERTY SPECIFICATIONS - States */}
          {activeTab === 'spec-states' && (
            <PropertySpecsStatesTab setActiveTab={setActiveTab} />
          )}

          {/* TAB: PROPERTY SPECIFICATIONS - Cities */}
          {activeTab === 'spec-cities' && (
            <PropertySpecsCitiesTab setActiveTab={setActiveTab} />
          )}

          {/* TAB: PROPERTY MANAGEMENT - Settings */}
          {activeTab === 'property-settings' && (
            <PropertyManagementSettingsTab setActiveTab={setActiveTab} />
          )}

          {/* TAB: PROPERTY MANAGEMENT - Add Property Choice */}
          {activeTab === 'property-add' && (
            <PropertyManagementAddTab setActiveTab={setActiveTab} />
          )}

          {/* TAB: PROPERTY MANAGEMENT - Manage List */}
          {activeTab === 'property-manage' && (
            <PropertyManagementListTab setActiveTab={setActiveTab} />
          )}

          {/* TAB: FEATURED PROPERTIES - Pricing */}
          {activeTab === 'featured-pricing' && (
            <FeaturedPropertiesPricingTab setActiveTab={setActiveTab} />
          )}

          {/* TAB: FEATURED PROPERTIES - All Request */}
          {activeTab === 'featured-all' && (
            <FeaturedPropertiesRequestsTab setActiveTab={setActiveTab} filterType="all" />
          )}

          {/* TAB: FEATURED PROPERTIES - Pending Request */}
          {activeTab === 'featured-pending' && (
            <FeaturedPropertiesRequestsTab setActiveTab={setActiveTab} filterType="pending" />
          )}

          {/* TAB: FEATURED PROPERTIES - Accepted Request */}
          {activeTab === 'featured-accepted' && (
            <FeaturedPropertiesRequestsTab setActiveTab={setActiveTab} filterType="accepted" />
          )}

          {/* TAB: FEATURED PROPERTIES - Rejected Request */}
          {activeTab === 'featured-rejected' && (
            <FeaturedPropertiesRequestsTab setActiveTab={setActiveTab} filterType="rejected" />
          )}

          {/* TAB: PROPERTY MESSAGES */}
          {activeTab === 'property-messages' && (
            <PropertyMessagesTab setActiveTab={setActiveTab} />
          )}

          {/* TAB: PROJECT MANAGEMENT - Settings */}
          {activeTab === 'project-settings' && (
            <ProjectManagementSettingsTab setActiveTab={setActiveTab} />
          )}

          {/* TAB: PROJECT MANAGEMENT - Add Project Form */}
          {activeTab === 'project-add' && (
            <ProjectManagementAddTab setActiveTab={setActiveTab} />
          )}

          {/* TAB: PROJECT MANAGEMENT - Manage List */}
          {activeTab === 'project-manage' && (
            <ProjectManagementListTab setActiveTab={setActiveTab} />
          )}

          {/* TAB: PROJECT MANAGEMENT - Project Types Details */}
          {activeTab === 'project-types' && (
            <ProjectTypesTab setActiveTab={setActiveTab} />
          )}

          {/* TAB: AGENTS */}
          {activeTab === 'agents' && (
            <AgentsTab setActiveTab={setActiveTab} />
          )}

          {/* TAB: PACKAGE MANAGEMENT - Settings */}
          {activeTab === 'package-settings' && (
            <PackageManagementSettingsTab setActiveTab={setActiveTab} />
          )}

          {/* TAB: PACKAGE MANAGEMENT - Packages List */}
          {activeTab === 'package-list' && (
            <PackageManagementListTab setActiveTab={setActiveTab} />
          )}

          {/* TAB: MENU BUILDER */}
          {activeTab === 'menu-builder' && (
            <MenuBuilderTab setActiveTab={setActiveTab} />
          )}

          {/* TAB: PAYMENT LOG */}
          {activeTab === 'payment-log' && (
            <PaymentLogTab setActiveTab={setActiveTab} />
          )}

          {/* TAB: USERS MANAGEMENT - Registered Users */}
          {activeTab === 'users-registered' && (
            <UsersManagementTab setActiveTab={setActiveTab} />
          )}

          {/* TAB: USERS MANAGEMENT - Add User Form */}
          {activeTab === 'users-add' && (
            <AddUserTab setActiveTab={setActiveTab} />
          )}

          {/* TAB: SUBSCRIBERS */}
          {activeTab === 'users-subscribers' && (
            <SubscribersTab setActiveTab={setActiveTab} />
          )}

          {/* TAB: VENDORS MANAGEMENT - Settings */}
          {activeTab === 'vendor-settings' && (
            <VendorSettingsTab setActiveTab={setActiveTab} />
          )}

          {/* TAB: VENDORS MANAGEMENT - Registered List */}
          {activeTab === 'vendor-list' && (
            <VendorListTab setActiveTab={setActiveTab} />
          )}

          {/* TAB: VENDORS MANAGEMENT - Add Vendor Form */}
          {activeTab === 'vendor-add' && (
            <VendorAddTab setActiveTab={setActiveTab} />
          )}

          {/* TAB: SUPPORT TICKETS - Settings */}
          {activeTab === 'tickets-settings' && (
            <TicketsSettingsTab setActiveTab={setActiveTab} />
          )}

          {/* TAB: SUPPORT TICKETS - Lists */}
          {activeTab === 'tickets-all' && (
            <TicketsListTab setActiveTab={setActiveTab} filterType="all" />
          )}
          {activeTab === 'tickets-pending' && (
            <TicketsListTab setActiveTab={setActiveTab} filterType="pending" />
          )}
          {activeTab === 'tickets-open' && (
            <TicketsListTab setActiveTab={setActiveTab} filterType="open" />
          )}
          {activeTab === 'tickets-closed' && (
            <TicketsListTab setActiveTab={setActiveTab} filterType="closed" />
          )}

          {/* TAB: HOME PAGE - Hero Section */}
          {activeTab === 'home-hero' && (
            <HomeHeroTab setActiveTab={setActiveTab} />
          )}

          {/* TAB: HOME PAGE - About Section */}
          {activeTab === 'home-about' && (
            <HomeAboutTab setActiveTab={setActiveTab} />
          )}

          {/* TAB: HOME PAGE - Why Choose Us Section */}
          {activeTab === 'home-why-choose' && (
            <HomeWhyChooseTab setActiveTab={setActiveTab} />
          )}

          {/* TAB: HOME PAGE - Brand Section */}
          {activeTab === 'home-brand' && (
            <HomeBrandTab setActiveTab={setActiveTab} />
          )}

          {/* TAB: HOME PAGE - Property Section */}
          {activeTab === 'home-property' && (
            <HomePropertySectionTab setActiveTab={setActiveTab} />
          )}

          {/* TAB: HOME PAGE - Featured Property Section */}
          {activeTab === 'home-featured-property' && (
            <HomeFeaturedPropertySectionTab setActiveTab={setActiveTab} />
          )}

          {/* TAB: HOME PAGE - Counter Section */}
          {activeTab === 'home-counter' && (
            <HomeCounterSectionTab setActiveTab={setActiveTab} />
          )}

          {/* TAB: HOME PAGE - City Section */}
          {activeTab === 'home-city' && (
            <HomeCitySectionTab setActiveTab={setActiveTab} />
          )}

          {/* TAB: HOME PAGE - Testimonial Section */}
          {activeTab === 'home-testimonial' && (
            <HomeTestimonialSectionTab setActiveTab={setActiveTab} />
          )}

          {/* TAB: HOME PAGE - Vendor Section */}
          {activeTab === 'home-vendor' && (
            <HomeVendorSectionTab setActiveTab={setActiveTab} />
          )}

          {/* TAB: HOME PAGE - Subscribe Section */}
          {activeTab === 'home-subscribe' && (
            <HomeSubscribeSectionTab setActiveTab={setActiveTab} />
          )}

          {/* TAB: HOME PAGE - Section Show/Hide */}
          {activeTab === 'home-show-hide' && (
            <HomeSectionShowHideTab setActiveTab={setActiveTab} />
          )}

          {/* TAB: BLOG CATEGORIES */}
          {activeTab === 'blog-categories' && (
            <BlogCategoriesTab />
          )}

          {/* TAB: BLOG POSTS */}
          {activeTab === 'blog-posts' && (
            <BlogPostsTab setBlogExpanded={setBlogExpanded} setActiveTab={setActiveTab} />
          )}

          {/* TAB: BLOG POSTS - Add Form */}
          {activeTab === 'blog-posts-add' && (
            <BlogPostAddTab setActiveTab={setActiveTab} />
          )}

          {/* TAB: FOOTER - Logo & Image */}
          {activeTab === 'footer-logo' && (
            <FooterLogoImageTab setActiveTab={setActiveTab} />
          )}

          {/* TAB: FOOTER - Content */}
          {activeTab === 'footer-content' && (
            <FooterContentTab setActiveTab={setActiveTab} />
          )}

          {/* TAB: FOOTER - Quick Links */}
          {activeTab === 'footer-links' && (
            <FooterQuickLinksTab setActiveTab={setActiveTab} />
          )}

          {/* TAB: CUSTOM PAGES - List */}
          {activeTab === 'custom-pages' && (
            <CustomPagesTab setActiveTab={setActiveTab} />
          )}

          {/* TAB: CUSTOM PAGES - Add Form */}
          {activeTab === 'custom-pages-add' && (
            <CustomPagesAddTab setActiveTab={setActiveTab} />
          )}

          {/* TAB: FAQ MANAGEMENT */}
          {activeTab === 'faq-management' && (
            <FAQManagementTab setActiveTab={setActiveTab} />
          )}

          {/* TAB: ADVERTISEMENTS - Settings */}
          {activeTab === 'advertisements-settings' && (
            <AdvertisementsSettingsTab setActiveTab={setActiveTab} />
          )}

          {/* TAB: ADVERTISEMENTS - All */}
          {activeTab === 'advertisements-all' && (
            <AdvertisementsAllTab setActiveTab={setActiveTab} />
          )}

          {/* TAB: ANNOUNCEMENT POPUPS - List */}
          {activeTab === 'announcement-popups' && (
            <AnnouncementPopupsTab setActiveTab={setActiveTab} />
          )}

          {/* TAB: ANNOUNCEMENT POPUPS - Add Form */}
          {activeTab === 'announcement-popups-add' && (
            <AnnouncementPopupAddTab setActiveTab={setActiveTab} />
          )}

          {/* TAB: PAYMENT GATEWAYS - Online */}
          {activeTab === 'online-gateways' && (
            <OnlineGatewaysTab setActiveTab={setActiveTab} />
          )}

          {/* TAB: PAYMENT GATEWAYS - Offline */}
          {activeTab === 'offline-gateways' && (
            <OfflineGatewaysTab setActiveTab={setActiveTab} />
          )}

          {/* TAB: ADMIN MANAGEMENT - Roles */}
          {activeTab === 'admin-roles' && (
            <AdminRolesTab setActiveTab={setActiveTab} />
          )}

          {/* TAB: ADMIN MANAGEMENT - List */}
          {activeTab === 'admin-list' && (
            <AdminListTab setActiveTab={setActiveTab} />
          )}

          {/* TAB: LANGUAGE MANAGEMENT */}
          {activeTab === 'language-management' && (
            <LanguageManagementTab setActiveTab={setActiveTab} />
          )}

          {/* TAB: ADMIN PROFILE EDIT */}
          {activeTab === 'admin-edit-profile' && (
            <AdminEditProfileTab setActiveTab={setActiveTab} />
          )}

          {/* TAB: ADMIN CHANGE PASSWORD */}
          {activeTab === 'admin-change-password' && (
            <AdminChangePasswordTab setActiveTab={setActiveTab} />
          )}


        </main>
      </div>

    </div>
  );
}
