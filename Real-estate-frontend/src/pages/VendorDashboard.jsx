import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users, Building2, HardHat, FileText, DollarSign, Award, CreditCard,
  ChevronDown, ChevronRight, Moon, Sun, Bell, LogOut, Key, UserCheck, Play,
  MessageSquare, LifeBuoy, Home, ShieldCheck, Search, Menu, Globe
} from 'lucide-react';
import VendorDashboardTab from '../components/vendor/VendorDashboardTab';
import {
  VendorPropertyListTab, VendorPropertyAddTab
} from '../components/vendor/VendorPropertyTabs';
import {
  VendorProjectListTab, VendorProjectAddTab
} from '../components/vendor/VendorProjectTabs';
import { VendorAgentsTab } from '../components/vendor/VendorAgentsTab';
import { VendorSupportTicketsTab, VendorSupportTicketsAddTab } from '../components/vendor/VendorSupportTicketsTabs';
import { VendorBuyPlanTab } from '../components/vendor/VendorBuyPlanTab';
import { VendorPaymentLogsTab } from '../components/vendor/VendorPaymentLogsTab';
import { VendorEditProfileTab } from '../components/vendor/VendorEditProfileTab';
import { VendorChangePasswordTab } from '../components/vendor/VendorChangePasswordTab';
import VendorPropertyMessagesTab from '../components/vendor/VendorPropertyMessagesTab';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../api/axiosInstance';

export default function VendorDashboard() {
  const navigate = useNavigate();
  const { user, token, loading, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [profileExpanded, setProfileExpanded] = useState(false);
  const [menuSearch, setMenuSearch] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  // Expanded states for submenus
  const [propertiesExpanded, setPropertiesExpanded] = useState(false);
  const [projectsExpanded, setProjectsExpanded] = useState(false);
  const [ticketsExpanded, setTicketsExpanded] = useState(false);

  // Dynamic lists
  const [propertiesList, setPropertiesList] = useState([]);
  const [projectsList, setProjectsList] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);

  // Auth check redirect
  useEffect(() => {
    if (!loading && (!token || (user && user.role !== 'vendor'))) {
      navigate('/login/vendor');
    }
  }, [token, loading, user, navigate]);

  // Fetch properties and projects
  const fetchVendorData = async () => {
    if (!token) return;
    try {
      setDataLoading(true);
      const resProps = await axiosInstance.get('/vendor/properties');
      const normalizedProps = resProps.data.map(p => ({
        ...p,
        id: p._id,
        views: p.views || 0,
        leads: p.leadsCount || 0
      }));
      setPropertiesList(normalizedProps);

      const resProj = await axiosInstance.get('/vendor/projects');
      const normalizedProj = resProj.data.map(p => ({
        ...p,
        id: p._id
      }));
      setProjectsList(normalizedProj);
      setDataLoading(false);
    } catch (err) {
      console.error('Error fetching vendor data:', err);
      setDataLoading(false);
    }
  };

  useEffect(() => {
    fetchVendorData();
  }, [token]);

  const handleAddProperty = async (prop) => {
    try {
      const res = await axiosInstance.post('/vendor/properties', prop);
      const newProp = {
        ...res.data,
        id: res.data._id,
        views: 0,
        leads: 0
      };
      setPropertiesList([...propertiesList, newProp]);
      setActiveTab('properties-list');
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to add property');
    }
  };

  const handleDeleteProperty = async (id) => {
    // For demo/simplicity, filter local state. If backend endpoint exists, call it.
    setPropertiesList(propertiesList.filter(p => p.id !== id));
  };

  const handleAddProject = async (proj) => {
    try {
      const res = await axiosInstance.post('/vendor/projects', proj);
      const newProj = {
        ...res.data,
        id: res.data._id
      };
      setProjectsList([...projectsList, newProj]);
      setActiveTab('projects-list');
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to add project');
    }
  };

  const handleDeleteProject = async (id) => {
    setProjectsList(projectsList.filter(p => p.id !== id));
  };

  // Vendor Menus Configuration
  const sidebarMenus = [
    { id: 'dashboard', name: 'Dashboard', icon: Home },
    {
      id: 'properties',
      name: 'Property Management',
      icon: Building2,
      hasCaret: true,
      hasSubmenu: true,
      submenus: [
        { id: 'properties-add', name: 'Add Property' },
        { id: 'properties-list', name: 'Manage Properties' }
      ]
    },
    { id: 'messages', name: 'Property Messages', icon: MessageSquare },
    {
      id: 'projects',
      name: 'Project Management',
      icon: HardHat,
      hasCaret: true,
      hasSubmenu: true,
      submenus: [
        { id: 'projects-add', name: 'Add Project' },
        { id: 'projects-list', name: 'Manage Projects' }
      ]
    },
    { id: 'agents', name: 'Agents', icon: Users },
    {
      id: 'tickets',
      name: 'Support Tickets',
      icon: LifeBuoy,
      hasCaret: true,
      hasSubmenu: true,
      submenus: [
        { id: 'tickets-list', name: 'All Tickets' },
        { id: 'tickets-add', name: 'Add a Ticket' }
      ]
    },
    { id: 'buy-plan', name: 'Buy Plan', icon: CreditCard },
    { id: 'payment-logs', name: 'Payment Logs', icon: FileText },
    { id: 'edit-profile', name: 'Edit Profile', icon: UserCheck },
    { id: 'change-password', name: 'Change Password', icon: Key }
  ];

  // Filter menu options based on search input
  const filteredMenus = sidebarMenus.filter(item =>
    item.name.toLowerCase().includes(menuSearch.toLowerCase())
  );

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-orange-500"></div>
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
            <span className="text-[10px] bg-slate-100 text-slate-650 px-2 py-0.5 rounded font-bold uppercase tracking-wider">
              Vendor Portal
            </span>
          </div>
        </div>

        {/* Top Right Controls */}
        <div className="flex items-center space-x-4">
          {/* Language Globe Icon */}
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

          {/* User Avatar Circle */}
          <div className="relative">
            <img
              src={user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'}
              alt={user?.name || 'Vendor'}
              className="w-8 h-8 rounded-full object-cover ring-2 ring-slate-100 cursor-pointer"
              onClick={() => setProfileExpanded(!profileExpanded)}
            />
          </div>
        </div>
      </header>

      {/* Main Container below Top Bar */}
      <div className="flex-1 flex relative">

        {/* Floating Menu button when sidebar is closed */}
        {!sidebarOpen && (
          <button
            onClick={() => setSidebarOpen(true)}
            className="absolute top-4 left-4 z-50 p-2.5 bg-white text-slate-600 hover:text-slate-900 rounded-xl border border-slate-150 shadow-md hover:shadow-lg transition active:scale-95 animate-in fade-in zoom-in duration-200"
          >
            <Menu size={16} />
          </button>
        )}

        {/* 2. Custom Left Sidebar */}
        <aside className={`bg-white border-r border-slate-100 flex flex-col transition-all duration-300 shadow-sm shrink-0 sticky top-16 h-[calc(100vh-64px)] z-40 overflow-y-auto ${sidebarOpen ? 'w-64' : 'w-0 -translate-x-full overflow-hidden'
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
                  src={user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'}
                  alt={user?.name || 'Vendor'}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-slate-100"
                />
                <div>
                  <h4 className="font-extrabold text-sm text-slate-900 leading-none">{user?.name || 'Vendor'}</h4>
                  <span className="text-[10px] text-slate-400 font-semibold tracking-wider block mt-1">Vendor</span>
                </div>
              </div>
              <ChevronDown size={14} className={`text-slate-400 transition-transform duration-200 ${profileExpanded ? 'rotate-180' : ''}`} />
            </div>

            {/* Profile Dropdown Expandable Options */}
            {profileExpanded && (
              <div className="mt-3 px-2 py-2 bg-slate-50 rounded-xl space-y-1 text-xs font-bold text-slate-600 animate-in slide-in-from-top-2 duration-200">
                <button
                  onClick={() => setActiveTab('edit-profile')}
                  className="w-full flex items-center space-x-2.5 px-3 py-2 rounded-lg hover:bg-white hover:text-slate-900 transition text-left"
                >
                  <UserCheck size={14} className="text-slate-400" />
                  <span>Edit Profile</span>
                </button>
                <button
                  onClick={() => setActiveTab('change-password')}
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
                  className="w-full flex items-center space-x-2.5 px-3 py-2 rounded-lg hover:bg-white hover:text-red-600 transition text-left text-red-500"
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
            </div>
          </div>

          {/* Menu Items List */}
          <nav className="p-4 space-y-1 flex-1">
            {filteredMenus.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id ||
                (item.id === 'properties' && (activeTab === 'properties-add' || activeTab === 'properties-list')) ||
                (item.id === 'projects' && (activeTab === 'projects-add' || activeTab === 'projects-list')) ||
                (item.id === 'tickets' && (activeTab === 'tickets-list' || activeTab === 'tickets-add'));

              if (item.hasSubmenu) {
                let isExpanded = false;
                let toggleExpand = () => { };
                if (item.id === 'properties') {
                  isExpanded = propertiesExpanded;
                  toggleExpand = () => setPropertiesExpanded(!propertiesExpanded);
                } else if (item.id === 'projects') {
                  isExpanded = projectsExpanded;
                  toggleExpand = () => setProjectsExpanded(!projectsExpanded);
                } else if (item.id === 'tickets') {
                  isExpanded = ticketsExpanded;
                  toggleExpand = () => setTicketsExpanded(!ticketsExpanded);
                }
                return (
                  <div key={item.id} className="space-y-1">
                    <button
                      onClick={toggleExpand}
                      className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 active:scale-95 ${isActive && !isExpanded
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
                              onClick={() => setActiveTab(sub.id)}
                              className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg text-[11px] font-bold text-left transition ${isSubActive
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
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 active:scale-95 ${isActive
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-500/10'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon size={16} className={isActive ? 'text-white' : 'text-slate-400'} />
                    <span>{item.name}</span>
                  </div>
                </button>
              );
            })}

            {filteredMenus.length === 0 && (
              <p className="text-center text-xs text-slate-400 py-6">No menus found.</p>
            )}

            {/* Logout Option at the bottom */}
            <button
              onClick={() => {
                logout();
                navigate('/');
              }}
              className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-bold text-red-500 hover:bg-red-50 transition active:scale-95 mt-4"
            >
              <div className="flex items-center space-x-3">
                <LogOut size={16} className="text-red-400" />
                <span>Logout</span>
              </div>
            </button>

          </nav>
        </aside>

        {/* 3. Main Content Panel Area */}
        <main className={`flex-1 overflow-y-auto max-h-[calc(100vh-64px)] transition-all duration-300 ${sidebarOpen
            ? 'p-6 lg:p-10'
            : 'pt-6 pb-6 pr-6 pl-16 lg:pt-10 lg:pb-10 lg:pr-10 lg:pl-24'
          } space-y-8`}>

          {/* TAB 1: DASHBOARD */}
          {activeTab === 'dashboard' && (
            <VendorDashboardTab setActiveTab={setActiveTab} />
          )}

          {/* PROPERTY MANAGEMENT TABS */}
          {activeTab === 'properties-add' && (
            <VendorPropertyAddTab setActiveTab={setActiveTab} onSave={handleAddProperty} />
          )}
          {activeTab === 'properties-list' && (
            <VendorPropertyListTab
              setActiveTab={setActiveTab}
              properties={propertiesList}
              onDelete={handleDeleteProperty}
              onAddClick={() => setActiveTab('properties-add')}
            />
          )}

          {/* PROPERTY MESSAGES */}
          {activeTab === 'messages' && (
            <VendorPropertyMessagesTab />
          )}


          {activeTab === 'projects-add' && (
            <VendorProjectAddTab setActiveTab={setActiveTab} onSave={handleAddProject} />
          )}
          {activeTab === 'projects-list' && (
            <VendorProjectListTab
              setActiveTab={setActiveTab}
              projects={projectsList}
              onDelete={handleDeleteProject}
              onAddClick={() => setActiveTab('projects-add')}
            />
          )}

          {/* AGENTS */}
          {activeTab === 'agents' && (
            <VendorAgentsTab />
          )}

          {/* SUPPORT TICKETS TABS */}
          {activeTab === 'tickets-list' && (
            <VendorSupportTicketsTab />
          )}
          {activeTab === 'tickets-add' && (
            <VendorSupportTicketsAddTab setActiveTab={setActiveTab} />
          )}

          {/* BUY PLAN */}
          {activeTab === 'buy-plan' && (
            <VendorBuyPlanTab />
          )}

          {/* PAYMENT LOGS */}
          {activeTab === 'payment-logs' && (
            <VendorPaymentLogsTab />
          )}

          {/* EDIT PROFILE */}
          {activeTab === 'edit-profile' && (
            <VendorEditProfileTab />
          )}

          {/* CHANGE PASSWORD */}
          {activeTab === 'change-password' && (
            <VendorChangePasswordTab />
          )}

        </main>
      </div>
    </div>
  );
}
