import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Search, MapPin, DollarSign, BedDouble, Bath, Maximize,
  ArrowRight, Heart, Award, Building, Users2, ShieldCheck, Mail,
  Shield, HardHat, Briefcase, Users
} from 'lucide-react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import { mockProperties, mockProjects, mockAgents, mockTestimonials } from '../data/mockData';

export default function Home() {
  const navigate = useNavigate();
  const [searchTab, setSearchTab] = useState('Buy');
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState([1, 3, 6]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleMouseMove = (e) => {
    const { clientX, clientY, currentTarget } = e;
    const { width, height, left, top } = currentTarget.getBoundingClientRect();
    const x = (clientX - left - width / 2) / 35;
    const y = (clientY - top - height / 2) / 35;
    setMousePosition({ x, y });
  };

  const toggleFavorite = (id) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(favId => favId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const line1 = "Estacy Real Estate /";
  const line2 = "Property Listing Portal";

  const sentence1 = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.04,
        delayChildren: 0.3,
      }
    }
  };

  const sentence2 = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.04,
        delayChildren: 1.2,
      }
    }
  };

  const letter = {
    hidden: { opacity: 0, y: 5 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.18, ease: "easeOut" }
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      <Navbar />

      {/* Showcase Dark Hero Section with 3D Parallax Mouse Tracking */}
      <section
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setMousePosition({ x: 0, y: 0 })}
        className="relative pt-36 pb-20 lg:pt-48 lg:pb-36 bg-slate-950 text-white overflow-hidden"
      >
        {/* Animated Perspective 3D Scrolling Grid Backdrop */}
        <motion.div
          style={{ x: mousePosition.x * 0.4, y: mousePosition.y * 0.4 }}
          className="absolute inset-0 grid-3d z-0 pointer-events-none"
        />

        {/* Spotlight & Radial Glows with Parallax & Float Animations */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.12)_0%,transparent_60%)] pointer-events-none" />

        <motion.div
          style={{ x: -mousePosition.x * 0.6, y: -mousePosition.y * 0.6 }}
          className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-blue-500/10 blur-[140px] pointer-events-none blob-float-1"
        />
        <motion.div
          style={{ x: mousePosition.x * 0.5, y: -mousePosition.y * 0.5 }}
          className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-purple-500/10 blur-[140px] pointer-events-none blob-float-2"
        />

        {/* Decorative Stars / Dots */}
        <div className="absolute top-24 left-[15%] w-1.5 h-1.5 rounded-full bg-white/20 animate-pulse"></div>
        <div className="absolute top-36 right-[20%] w-2 h-2 rounded-full bg-white/30 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-24 right-[15%] w-1 h-1 rounded-full bg-white/40"></div>

        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center relative z-10">

          {/* Header Typography (Smooth Slide-up on Load) */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-center space-y-6 max-w-4xl mx-auto"
          >


            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight leading-[1.2] text-white py-2 overflow-visible">
              <motion.span variants={sentence1} initial="hidden" animate="visible" className="inline-block pb-3 pt-1 overflow-visible">
                {line1.split("").map((char, index) => (
                  <motion.span key={`char1-${index}`} variants={letter} className="inline-block whitespace-pre overflow-visible">
                    {char}
                  </motion.span>
                ))}
              </motion.span>
              <br />
              <motion.span variants={sentence2} initial="hidden" animate="visible" className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 pb-4 pt-1 overflow-visible">
                {line2.split("").map((char, index) => (
                  <motion.span key={`char2-${index}`} variants={letter} className="inline-block whitespace-pre overflow-visible">
                    {char}
                  </motion.span>
                ))}
              </motion.span>
            </h1>

            <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed font-medium">
              A comprehensive digital marketplace connecting builders, advisory agents, and home seekers. Explore our role-specific portals with custom dashboards and interactive charting tools.
            </p>

            <div className="flex flex-wrap justify-center items-center gap-4 pt-2 lg:hidden">
              <button
                onClick={() => navigate('/login')}
                className="px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-lg shadow-blue-500/20 transition active:scale-95 flex items-center space-x-2"
              >
                <span>Access Portal Logins</span>
                <ArrowRight size={14} />
              </button>
              <a
                href="#properties"
                className="px-6 py-3.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-bold transition active:scale-95 text-white"
              >
                Browse Listings
              </a>
            </div>
          </motion.div>

          {/* Floating Showcase Mockups Grid (Desktop View - Smooth Slide-up on Load) */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-6xl mx-auto mt-6 relative h-[520px] hidden lg:block"
          >
            {/* Centered CTA Buttons in the middle gap (Desktop only) */}
            <div className="absolute left-1/2 top-24 -translate-x-1/2 z-30 flex items-center gap-4 w-max">
              <button
                onClick={() => navigate('/login')}
                className="px-7 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-lg shadow-blue-500/20 transition active:scale-95 flex items-center space-x-2"
              >
                <span>Access Portal Logins</span>
                <ArrowRight size={14} />
              </button>
              <a
                href="#properties"
                className="px-7 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-bold transition active:scale-95 text-white"
              >
                Browse Listings
              </a>
            </div>

            {/* 1. Super Admin Dashboard Preview (Left Tilted) */}
            <motion.div
              animate={{ y: [0, -32, 0] }}
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
              onClick={() => navigate('/login/admin')}
              className="absolute left-0 top-12 w-[330px] h-[230px] bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl hover:shadow-admin/20 hover:-translate-y-2 hover:scale-[1.03] hover:rotate-0 rotate-[-4deg] transition-all duration-300 cursor-pointer overflow-hidden flex flex-col justify-between group"
            >
              {/* Window Header */}
              <div className="bg-slate-950 px-4 py-2.5 border-b border-slate-800 flex items-center justify-between">
                <div className="flex space-x-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/80"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500/80"></span>
                </div>
                <span className="text-[10px] text-slate-500 font-bold tracking-wider uppercase flex items-center space-x-1">
                  <Shield size={10} className="text-blue-500" />
                  <span>Admin Workspace</span>
                </span>
                <span className="w-8"></span>
              </div>

              {/* Window Content */}
              <div className="p-4 flex-1 flex space-x-3 text-[10px]">
                {/* Mini Sidebar */}
                <div className="w-1/4 border-r border-slate-800 pr-2 space-y-2">
                  <div className="h-5 bg-blue-600 rounded-md"></div>
                  <div className="h-3.5 bg-slate-800 rounded-md"></div>
                  <div className="h-3.5 bg-slate-800 rounded-md"></div>
                  <div className="h-3.5 bg-slate-800 rounded-md"></div>
                </div>
                {/* Main Body */}
                <div className="flex-1 space-y-3">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-slate-800/50 p-2 rounded-lg border border-slate-800">
                      <p className="text-slate-550 text-[8px]">Active Users</p>
                      <p className="font-extrabold text-white text-xs mt-0.5">1.4K</p>
                    </div>
                    <div className="bg-slate-800/50 p-2 rounded-lg border border-slate-800">
                      <p className="text-slate-555 text-[8px]">Revenue</p>
                      <p className="font-extrabold text-blue-400 text-xs mt-0.5">$48K</p>
                    </div>
                  </div>
                  {/* Fake Chart bars */}
                  <div className="space-y-1.5 bg-slate-800/20 p-2 rounded-lg border border-slate-800/50">
                    <p className="text-slate-400 text-[7px] font-bold uppercase">Revenue Growth</p>
                    <div className="flex items-end justify-between h-12 pt-2">
                      <div className="w-4 bg-slate-800 h-4 rounded-sm"></div>
                      <div className="w-4 bg-slate-750 h-6 rounded-sm"></div>
                      <div className="w-4 bg-slate-700 h-8 rounded-sm"></div>
                      <div className="w-4 bg-blue-600/70 h-10 rounded-sm"></div>
                      <div className="w-4 bg-blue-600 h-12 rounded-sm"></div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* 2. Certified Agent Dashboard Preview (Right Tilted) */}
            <motion.div
              animate={{ y: [0, -38, 0] }}
              transition={{ duration: 13.5, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
              onClick={() => navigate('/login/agent')}
              className="absolute right-0 top-12 w-[330px] h-[230px] bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl hover:shadow-agent/20 hover:-translate-y-2 hover:scale-[1.03] hover:rotate-0 rotate-[4deg] transition-all duration-300 cursor-pointer overflow-hidden flex flex-col justify-between group"
            >
              {/* Window Header */}
              <div className="bg-slate-950 px-4 py-2.5 border-b border-slate-800 flex items-center justify-between">
                <div className="flex space-x-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/80"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500/80"></span>
                </div>
                <span className="text-[10px] text-slate-500 font-bold tracking-wider uppercase flex items-center space-x-1">
                  <Briefcase size={10} className="text-emerald-500" />
                  <span>Agent Workspace</span>
                </span>
                <span className="w-8"></span>
              </div>

              {/* Window Content */}
              <div className="p-4 flex-1 flex space-x-3 text-[10px]">
                {/* Mini Sidebar */}
                <div className="w-1/4 border-r border-slate-800 pr-2 space-y-2">
                  <div className="h-5 bg-emerald-600 rounded-md"></div>
                  <div className="h-3.5 bg-slate-800 rounded-md"></div>
                  <div className="h-3.5 bg-slate-800 rounded-md"></div>
                  <div className="h-3.5 bg-slate-800 rounded-md"></div>
                </div>
                {/* Main Body */}
                <div className="flex-1 space-y-3">
                  <div className="bg-slate-800/30 p-2 rounded-lg border border-slate-800 space-y-2">
                    <p className="text-slate-400 text-[8px] font-bold">UPCOMING SHOWINGS</p>
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-[8px] border-b border-slate-800 pb-1">
                        <span className="text-white font-bold">David Smith</span>
                        <span className="bg-emerald-500/10 text-emerald-400 px-1 rounded">2:30 PM</span>
                      </div>
                      <div className="flex items-center justify-between text-[8px]">
                        <span className="text-slate-400">Alice Cooper</span>
                        <span className="bg-slate-800 px-1 rounded text-slate-500">Tomw 10AM</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-slate-800/50 p-2.5 rounded-lg border border-slate-800 flex justify-between items-center">
                    <div>
                      <p className="text-slate-500 text-[8px]">Active Clients</p>
                      <p className="font-extrabold text-white text-xs mt-0.5">18 Active</p>
                    </div>
                    <span className="text-[9px] bg-emerald-500/10 text-emerald-400 font-bold px-2 py-0.5 rounded-full">4 Appts</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* 3. Customer Property Hub Preview (Center Bottom) */}
            <motion.div
              animate={{ y: [0, -45, 0] }}
              transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
              onClick={() => navigate('/login/customer')}
              className="absolute left-1/2 bottom-0 -translate-x-1/2 w-[520px] h-[310px] bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl hover:shadow-customer/20 hover:-translate-y-2 hover:scale-[1.02] transition-all duration-300 cursor-pointer overflow-hidden flex flex-col justify-between group"
            >
              {/* Window Header */}
              <div className="bg-slate-950 px-5 py-3 border-b border-slate-800 flex items-center justify-between">
                <div className="flex space-x-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/80"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500/80"></span>
                </div>
                <span className="text-[10px] text-slate-400 font-bold tracking-wider uppercase flex items-center space-x-1">
                  <Users size={11} className="text-purple-500" />
                  <span>Customer Workspace</span>
                </span>
                <span className="w-8"></span>
              </div>

              {/* Window Content */}
              <div className="p-4 flex-1 flex space-x-4 text-[10px]">
                {/* Search Bar / Filters */}
                <div className="w-2/5 space-y-3 border-r border-slate-800 pr-4">
                  <div className="space-y-1">
                    <p className="text-slate-500 text-[8px] font-bold uppercase">Search listing</p>
                    <div className="bg-slate-950 px-2 py-1.5 rounded-md border border-slate-800 text-[9px] text-slate-400 flex items-center space-x-1">
                      <Search size={10} />
                      <span>Beverly Hills, CA</span>
                    </div>
                  </div>
                  <div className="space-y-1.5 pt-1">
                    <p className="text-slate-500 text-[8px] font-bold uppercase">Beds Count</p>
                    <div className="bg-slate-950 p-2 rounded-md border border-slate-800 text-[9px] text-white">
                      4 Bedrooms
                    </div>
                  </div>
                  <div className="bg-purple-900/10 p-2.5 rounded-xl border border-purple-500/15 flex justify-between items-center mt-4">
                    <div>
                      <p className="text-purple-400 text-[8px] font-bold">Saved Wishlist</p>
                      <p className="text-white font-extrabold mt-0.5 text-xs">3 listings</p>
                    </div>
                    <Heart size={14} className="text-purple-400 fill-purple-400" />
                  </div>
                </div>

                {/* Listing card mockup */}
                <div className="flex-1 space-y-3">
                  <div className="relative aspect-[16/10] rounded-xl overflow-hidden border border-slate-800 bg-slate-950">
                    <img
                      src="https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=500&q=80"
                      alt="Meadow Villa"
                      className="w-full h-full object-cover opacity-60"
                    />
                    <span className="absolute top-2 left-2 bg-purple-600 text-white font-bold text-[8px] px-1.5 py-0.5 rounded">
                      98% MATCH
                    </span>
                    <div className="absolute bottom-2 left-2 right-2 flex justify-between items-end">
                      <div>
                        <p className="font-extrabold text-[10px] text-white">Serene Meadow Villa</p>
                        <p className="text-[8px] text-slate-400">Beverly Hills, CA</p>
                      </div>
                      <p className="text-purple-400 font-extrabold text-[10px]">$1,250,000</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

          </motion.div>

          {/* Mobile Previews List (Responsive Fallback) */}
          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 px-4 lg:hidden">
            {/* Mobile Admin */}
            <div
              onClick={() => navigate('/login/admin')}
              className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex items-center space-x-4 cursor-pointer hover:bg-slate-850 transition"
            >
              <div className="p-3 bg-blue-500/10 text-blue-400 rounded-xl">
                <Shield size={20} />
              </div>
              <div>
                <h4 className="font-bold text-sm text-white">Super Admin Portal</h4>
                <p className="text-xs text-slate-500">Configure parameters & logs</p>
              </div>
            </div>
            {/* Mobile Agent */}
            <div
              onClick={() => navigate('/login/agent')}
              className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex items-center space-x-4 cursor-pointer hover:bg-slate-850 transition"
            >
              <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl">
                <Briefcase size={20} />
              </div>
              <div>
                <h4 className="font-bold text-sm text-white">Advisor Agent Portal</h4>
                <p className="text-xs text-slate-500">Manage client tours & tasks</p>
              </div>
            </div>
            {/* Mobile Customer */}
            <div
              onClick={() => navigate('/login/customer')}
              className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex items-center space-x-4 cursor-pointer hover:bg-slate-850 transition"
            >
              <div className="p-3 bg-purple-500/10 text-purple-400 rounded-xl">
                <Users size={20} />
              </div>
              <div>
                <h4 className="font-bold text-sm text-white">Customer Search Hub</h4>
                <p className="text-xs text-slate-500">Search houses & wishlists</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Stats Counter Section */}
      <section className="py-12 bg-slate-900 text-white relative z-10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-slate-800">
          <div className="py-4 md:py-0">
            <h3 className="text-4xl font-extrabold text-blue-400 mb-1">$1.4B+</h3>
            <p className="text-slate-400 text-sm font-medium">Assets Transacted</p>
          </div>
          <div className="py-4 md:py-0">
            <h3 className="text-4xl font-extrabold text-blue-400 mb-1">1,500+</h3>
            <p className="text-slate-400 text-sm font-medium">Completed Mega Projects</p>
          </div>
          <div className="py-4 md:py-0">
            <h3 className="text-4xl font-extrabold text-blue-400 mb-1">140+</h3>
            <p className="text-slate-400 text-sm font-medium">Certified Advisory Agents</p>
          </div>
        </div>
      </section>

      {/* Featured Properties Section */}
      <section id="properties" className="py-24 max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div className="space-y-4">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">Recommended Listing</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">Featured Properties</h2>
          </div>
          <button
            onClick={() => navigate('/login')}
            className="mt-4 md:mt-0 flex items-center space-x-2 text-sm font-bold text-blue-600 hover:text-blue-700 transition"
          >
            <span>Explore all properties</span>
            <ArrowRight size={16} />
          </button>
        </div>

        {/* Properties Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {mockProperties.map((property) => (
            <motion.div
              key={property.id}
              variants={itemVariants}
              className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-premium hover:shadow-premium-hover transition-all duration-300 group flex flex-col justify-between"
            >
              {/* Image Banner */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={property.image}
                  alt={property.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Float badges */}
                <div className="absolute top-4 left-4 flex space-x-2">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-bold tracking-wide uppercase text-slate-900 border border-white/20">
                    {property.tag}
                  </span>
                </div>

                <button
                  onClick={() => toggleFavorite(property.id)}
                  className={`absolute top-4 right-4 p-2 rounded-xl transition ${favorites.includes(property.id)
                    ? 'bg-red-50 text-red-500 hover:bg-red-100'
                    : 'bg-white/80 text-slate-600 hover:bg-white hover:text-red-500'
                    }`}
                >
                  <Heart size={16} fill={favorites.includes(property.id) ? 'currentColor' : 'none'} fillOpacity={favorites.includes(property.id) ? 1 : 0} />
                </button>
              </div>

              {/* Card Content */}
              <div className="p-6 space-y-4">
                <div className="space-y-1">
                  <span className="text-xs font-bold text-slate-400">{property.type === 'Buy' ? 'FOR SALE' : 'FOR RENT'}</span>
                  <h3 className="text-lg font-bold text-slate-900 hover:text-blue-600 transition truncate">{property.name}</h3>
                  <p className="text-xs text-slate-400 flex items-center space-x-1">
                    <MapPin size={12} className="flex-shrink-0" />
                    <span className="truncate">{property.address}</span>
                  </p>
                </div>

                {/* Specs */}
                <div className="flex items-center justify-between text-xs font-semibold text-slate-500 py-3 border-y border-slate-100">
                  <span className="flex items-center space-x-1">
                    <BedDouble size={14} className="text-slate-400" />
                    <span>{property.beds} Beds</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Bath size={14} className="text-slate-400" />
                    <span>{property.baths} Baths</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Maximize size={14} className="text-slate-400" />
                    <span>{property.area}</span>
                  </span>
                </div>

                {/* Pricing & CTA */}
                <div className="flex items-center justify-between pt-1">
                  <span className="text-xl font-extrabold text-blue-600">{property.price}</span>
                  <button
                    onClick={() => navigate('/login')}
                    className="p-2.5 bg-slate-50 group-hover:bg-blue-600 text-slate-600 group-hover:text-white rounded-xl transition-all active:scale-95"
                  >
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Mega Projects Section */}
      <section id="projects" className="py-24 bg-slate-100/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
            <div className="space-y-4">
              <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">Constructing Future</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">Mega Builder Projects</h2>
            </div>
            <button
              onClick={() => navigate('/login')}
              className="mt-4 md:mt-0 flex items-center space-x-2 text-sm font-bold text-blue-600 hover:text-blue-700 transition"
            >
              <span>View all projects</span>
              <ArrowRight size={16} />
            </button>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {mockProjects.map((project) => (
              <div
                key={project.id}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200/50 shadow-premium flex flex-col justify-between"
              >
                <div className="aspect-[16/10] overflow-hidden relative">
                  <img src={project.image} alt={project.name} className="w-full h-full object-cover" />
                  <span className={`absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-bold text-white uppercase tracking-wider ${project.status === 'Under Construction'
                    ? 'bg-amber-500'
                    : project.status === 'Pre-launching'
                      ? 'bg-blue-500'
                      : 'bg-emerald-500'
                    }`}>
                    {project.status}
                  </span>
                </div>
                <div className="p-6 space-y-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase">{project.builder}</span>
                    <h3 className="text-lg font-bold text-slate-900">{project.name}</h3>
                    <p className="text-xs text-slate-500 flex items-center space-x-1">
                      <MapPin size={12} className="flex-shrink-0" />
                      <span>{project.location}</span>
                    </p>
                  </div>
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-500">{project.units}</span>
                    <button
                      onClick={() => navigate('/login')}
                      className="text-xs font-bold text-blue-600 hover:underline"
                    >
                      Inquire Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Rated Agents Section */}
      <section id="agents" className="py-24 max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div className="space-y-4">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">Industry Specialists</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">Our Dedicated Experts</h2>
          </div>
          <button
            onClick={() => navigate('/login')}
            className="mt-4 md:mt-0 flex items-center space-x-2 text-sm font-bold text-blue-600 hover:text-blue-700 transition"
          >
            <span>Meet full agency team</span>
            <ArrowRight size={16} />
          </button>
        </div>

        {/* Agents Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {mockAgents.map((agent) => (
            <div
              key={agent.id}
              className="bg-white rounded-3xl p-6 border border-slate-100 shadow-premium flex flex-col items-center text-center space-y-4 hover:shadow-premium-hover transition-all duration-300"
            >
              <img
                src={agent.avatar}
                alt={agent.name}
                className="w-20 h-20 rounded-2xl object-cover ring-4 ring-blue-50"
              />
              <div className="space-y-1">
                <h4 className="font-extrabold text-slate-900">{agent.name}</h4>
                <p className="text-xs text-blue-600 font-semibold">{agent.role === 'Admin' ? 'Super Admin' : agent.role}</p>
                <p className="text-xs text-slate-400">{agent.specialization}</p>
              </div>
              <div className="grid grid-cols-2 gap-4 w-full pt-4 border-t border-slate-100 text-xs font-bold text-slate-500">
                <div className="text-center">
                  <p className="text-slate-400 font-semibold text-[10px]">EXPERIENCE</p>
                  <p className="text-slate-800">{agent.experience}</p>
                </div>
                <div className="text-center">
                  <p className="text-slate-400 font-semibold text-[10px]">CITY</p>
                  <p className="text-slate-800">{agent.city}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 bg-slate-900 text-white overflow-hidden relative">
        <div className="absolute top-[-30%] right-[-10%] w-[600px] h-[600px] rounded-full bg-blue-500/5 blur-[150px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center space-y-4 mb-16 max-w-xl mx-auto">
            <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">Client Testimonials</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">What Our Clients Say</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {mockTestimonials.map((t) => (
              <div key={t.id} className="p-8 bg-slate-800/50 backdrop-blur-md border border-slate-700/50 rounded-[2rem] flex flex-col justify-between space-y-6">
                <p className="text-slate-300 italic leading-relaxed text-sm">
                  "{t.text}"
                </p>
                <div className="flex items-center space-x-4">
                  <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-xl object-cover" />
                  <div>
                    <h5 className="font-bold text-sm">{t.name}</h5>
                    <p className="text-xs text-blue-400 font-medium">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA / Newsletter */}
      <section className="py-24 max-w-5xl mx-auto px-6">
        <div className="p-12 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-[2.5rem] shadow-xl text-center space-y-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/5 opacity-10"></div>
          <div className="space-y-4 max-w-xl mx-auto relative z-10">
            <h2 className="text-3xl font-extrabold tracking-tight leading-tight">Be The First To Discover New Deals</h2>
            <p className="text-white/80 text-sm leading-relaxed">
              Unlock access to premium pre-launch properties, custom builder incentives, and off-market real estate assets.
            </p>
          </div>

          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto relative z-10" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-white/60 pl-5 pr-4 py-3.5 text-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-white transition"
            />
            <button className="px-6 py-3.5 bg-white text-blue-600 hover:bg-slate-50 font-bold text-sm rounded-xl transition active:scale-95 shadow-md shadow-blue-800/10">
              Get Started
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
}
