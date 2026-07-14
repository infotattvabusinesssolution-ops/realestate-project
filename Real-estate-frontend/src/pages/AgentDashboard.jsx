import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users, Building2, HardHat, FileText, Eye, Sparkles,
  ChevronDown, ChevronRight, Moon, Sun, LogOut, Key, UserCheck,
  MessageSquare, Home, Search, Menu
} from 'lucide-react';
import AgentDashboardTab from '../components/agent/AgentDashboardTab';
import { AgentPropertyListTab, AgentPropertyAddTab } from '../components/agent/AgentPropertyTabs';
import { AgentProjectListTab, AgentProjectAddTab } from '../components/agent/AgentProjectTabs';
import AgentPropertyMessagesTab from '../components/agent/AgentPropertyMessagesTab';
import AgentEditProfileTab from '../components/agent/AgentEditProfileTab';
import AgentChangePasswordTab from '../components/agent/AgentChangePasswordTab';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { 
  getAgentStatsAPI, 
  getAgentChartDataAPI, 
  getAgentPropertiesAPI, 
  createAgentPropertyAPI, 
  updateAgentPropertyAPI, 
  deleteAgentPropertyAPI, 
  getAgentProjectsAPI, 
  createAgentProjectAPI, 
  updateAgentProjectAPI, 
  deleteAgentProjectAPI 
} from '../api/api';

export default function AgentDashboard() {
  const navigate = useNavigate();
  const { user, token, loading, logout } = useAuth();
  const toast = useToast();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [profileExpanded, setProfileExpanded] = useState(false);
  const [menuSearch, setMenuSearch] = useState('');
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true';
  });

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    return () => {
      document.documentElement.classList.remove('dark');
    };
  }, [darkMode]);

  // Dynamic stats & charts state
  const [stats, setStats] = useState({
    assignedProperties: 0,
    assignedProjects: 0,
    newLeads: 0,
    appointments: 0,
    messages: 0,
  });
  const [chartData, setChartData] = useState([]);

  // Expanded states for submenus
  const [propertiesExpanded, setPropertiesExpanded] = useState(false);
  const [projectsExpanded, setProjectsExpanded] = useState(false);

  // Dynamic lists
  const [propertiesList, setPropertiesList] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    if (window.innerWidth < 640) {
      setSidebarOpen(false);
    }
  };

  // Redirect if not authenticated as agent
  useEffect(() => {
    if (!loading && (!token || (user && user.role !== 'agent'))) {
      navigate('/login/agent');
    }
  }, [token, loading, user, navigate]);

  // Fetch properties and projects assigned to this agent
  const fetchAgentData = async () => {
    if (!token) return;
    try {
      setDataLoading(true);
      const resProps = await getAgentPropertiesAPI();

      const normalizedProps = resProps.data.map(p => ({
        ...p,
        id: p._id,
        status: p.status === 'Approved' ? 'Active' : p.status
      }));
      setPropertiesList(normalizedProps);
      setDataLoading(false);
    } catch (err) {
      console.error('Error fetching agent data:', err);
      setDataLoading(false);
    }
  };

  useEffect(() => {
    fetchAgentData();
  }, [token]);

  const agentUser = {
    name: user?.name || 'Agent',
    avatar: user?.avatar || 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    email: user?.email || 'agent@estacy.com'
  };

  const handleAddProperty = async (prop) => {
    try {
      const res = await createAgentPropertyAPI(prop);
      const newProp = {
        ...res.data,
        id: res.data._id,
        status: 'Active'
      };
      setPropertiesList([...propertiesList, newProp]);
      toast.success('Property added successfully!');
      setActiveTab('properties-list');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to add property');
    }
  };

  const handleDeleteProperty = async (id) => {
    try {
      await deleteAgentPropertyAPI(id);
      setPropertiesList(propertiesList.filter(p => p.id !== id));
      toast.success('Property deleted successfully!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to delete property');
    }
  };

  const handleUpdateProperty = async (id, updatedFields) => {
    try {
      const res = await updateAgentPropertyAPI(id, updatedFields);
      setPropertiesList(propertiesList.map(p => p.id === id ? { ...p, ...res.data, id: res.data._id } : p));
      toast.success('Property updated successfully!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update property');
    }
  };


  // Agent Menus Configuration
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
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center text-white shadow-md shadow-orange-500/20">
              <Building2 size={18} />
            </div>
            <span className="text-xl font-extrabold tracking-tight text-slate-950">
              Estaty
            </span>
          </div>
        </div>

        {/* Top Right Controls matching screenshot */}
        <div className="flex items-center space-x-4">
          {/* Blue eye badge */}
          <button className="w-8 h-8 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition flex items-center justify-center shadow-md shadow-blue-500/20">
            <Eye size={16} />
          </button>

          {/* Purple setting/sparkle badge */}
          <button className="w-8 h-8 rounded-full bg-purple-600 text-white hover:bg-purple-750 transition flex items-center justify-center shadow-md shadow-purple-500/20">
            <Sparkles size={16} />
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
              src={agentUser.avatar}
              alt={agentUser.name}
              className="w-8 h-8 rounded-full object-cover ring-2 ring-slate-100 cursor-pointer"
              onClick={() => {
                setProfileExpanded(!profileExpanded);
                // If on mobile and opening, ensure sidebar is open
                if (!profileExpanded && window.innerWidth < 640) {
                  setSidebarOpen(true);
                }
              }}
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
            className="hidden sm:block absolute top-4 left-4 z-50 p-2.5 bg-white text-slate-655 hover:text-slate-900 rounded-xl border border-slate-150 shadow-md hover:shadow-lg transition active:scale-95 animate-in fade-in zoom-in duration-200"
          >
            <Menu size={16} />
          </button>
        )}

        {/* 2. Custom Left Sidebar */}
        <aside className={`bg-white border-r border-slate-100 flex flex-col transition-all duration-300 shadow-xl sm:shadow-sm shrink-0 absolute sm:sticky left-0 top-0 sm:top-16 h-[calc(100vh-64px)] z-40 overflow-y-auto ${
          sidebarOpen ? 'w-64 translate-x-0' : 'w-0 -translate-x-full overflow-hidden sm:w-0'
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
                  src={agentUser.avatar}
                  alt={agentUser.name}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-slate-100"
                />
                <div>
                  <h4 className="font-extrabold text-sm text-slate-900 leading-none">{agentUser.name}</h4>
                  <span className="text-[10px] text-slate-400 font-semibold tracking-wider block mt-1">Agent</span>
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
                className="w-full bg-slate-50 border border-slate-100 hover:bg-slate-100/50 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-205 transition-all font-medium"
              />
            </div>
          </div>

          {/* Menu Items List */}
          <nav className="p-4 space-y-1 flex-1">
            {filteredMenus.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id ||
                (item.id === 'properties' && (activeTab === 'properties-add' || activeTab === 'properties-list')) ||
                (item.id === 'projects' && (activeTab === 'projects-add' || activeTab === 'projects-list'));

              if (item.hasSubmenu) {
                let isExpanded = false;
                let toggleExpand = () => { };
                if (item.id === 'properties') {
                  isExpanded = propertiesExpanded;
                  toggleExpand = () => setPropertiesExpanded(!propertiesExpanded);
                } else if (item.id === 'projects') {
                  isExpanded = projectsExpanded;
                  toggleExpand = () => setProjectsExpanded(!projectsExpanded);
                }
                return (
                  <div key={item.id} className="space-y-1">
                    <button
                      onClick={toggleExpand}
                      className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 active:scale-95 ${isActive && !isExpanded
                        ? 'bg-blue-650 text-white shadow-md shadow-blue-500/10'
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
                  onClick={() => handleTabClick(item.id)}
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

            {/* Logout Option */}
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
          ? 'py-6 px-2 sm:px-6 lg:p-10'
          : 'py-6 px-2 sm:pr-6 sm:pl-16 lg:pt-10 lg:pb-10 lg:pr-10 lg:pl-24'
          } space-y-8`}>

          {/* TAB 1: DASHBOARD */}
          {activeTab === 'dashboard' && (
            <AgentDashboardTab
              setActiveTab={handleTabClick}
            />
          )}

          {/* PROPERTY MANAGEMENT TABS */}
          {activeTab === 'properties-add' && (
            <AgentPropertyAddTab setActiveTab={setActiveTab} onSave={handleAddProperty} />
          )}
          {activeTab === 'properties-list' && (
            <AgentPropertyListTab
              setActiveTab={setActiveTab}
              properties={propertiesList}
              onDelete={handleDeleteProperty}
              onUpdate={handleUpdateProperty}
              onAddClick={() => setActiveTab('properties-add')}
            />
          )}

          {/* PROPERTY MESSAGES */}
          {activeTab === 'messages' && (
            <AgentPropertyMessagesTab />
          )}

          {/* PROJECT MANAGEMENT TABS */}
          {activeTab === 'projects-add' && (
            <AgentProjectAddTab setActiveTab={setActiveTab} />
          )}

          {activeTab === 'projects-list' && (
            <AgentProjectListTab 
              setActiveTab={handleTabClick} 
              onAddClick={() => setActiveTab('projects-add')}
            />
          )}

          {/* EDIT PROFILE */}
          {activeTab === 'edit-profile' && (
            <AgentEditProfileTab />
          )}

          {/* CHANGE PASSWORD */}
          {activeTab === 'change-password' && (
            <AgentChangePasswordTab />
          )}

        </main>
      </div>
    </div>
  );
}
