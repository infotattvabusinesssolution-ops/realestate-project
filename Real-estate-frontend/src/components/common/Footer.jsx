import React from 'react';
import { Home, Facebook, Twitter, Instagram, Linkedin, Send } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 pt-20 pb-10 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        {/* Brand Info */}
        <div className="space-y-6">
          <Link to="/" className="flex items-center space-x-3 text-white">
            <div className="p-2 bg-blue-600 rounded-lg text-white">
              <Home size={20} />
            </div>
            <span className="text-xl font-bold tracking-tight">
              Estacy<span className="text-blue-500">.</span>
            </span>
          </Link>
          <p className="text-sm text-slate-400 leading-relaxed">
            The next-generation marketplace connecting builders, agents, and buyers. Find, manage, and settle with complete transparency.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="p-2 bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors">
              <Facebook size={16} />
            </a>
            <a href="#" className="p-2 bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors">
              <Twitter size={16} />
            </a>
            <a href="#" className="p-2 bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors">
              <Instagram size={16} />
            </a>
            <a href="#" className="p-2 bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors">
              <Linkedin size={16} />
            </a>
          </div>
        </div>

        {/* Resources */}
        <div>
          <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-6">Quick Links</h4>
          <ul className="space-y-4 text-sm">
            <li>
              <a href="#properties" className="hover:text-white transition-colors">Featured Properties</a>
            </li>
            <li>
              <a href="#projects" className="hover:text-white transition-colors">Mega Projects</a>
            </li>
            <li>
              <a href="#agents" className="hover:text-white transition-colors">Top Rated Agents</a>
            </li>
            <li>
              <a href="#testimonials" className="hover:text-white transition-colors">Client Testimonials</a>
            </li>
          </ul>
        </div>

        {/* Portals */}
        <div>
          <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-6">Portal Logins</h4>
          <ul className="space-y-4 text-sm">
            <li>
              <Link to="/login/admin" className="hover:text-white transition-colors">Super Admin Portal</Link>
            </li>
            <li>
              <Link to="/login/vendor" className="hover:text-white transition-colors">Builder/Vendor Portal</Link>
            </li>
            <li>
              <Link to="/login/agent" className="hover:text-white transition-colors">Agent Portal</Link>
            </li>
            <li>
              <Link to="/login/customer" className="hover:text-white transition-colors">Customer Portal</Link>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-6">Stay Updated</h4>
          <p className="text-sm mb-4 leading-relaxed">
            Subscribe to our newsletter for exclusive builder deals and market listings.
          </p>
          <form className="relative" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="Email address"
              className="w-full bg-slate-800 text-white placeholder-slate-500 rounded-xl pl-4 pr-12 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all border border-slate-700" 
            />
            <button 
              type="submit"
              className="absolute right-1.5 top-1.5 p-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              <Send size={14} />
            </button>
          </form>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 space-y-4 md:space-y-0">
        <p>&copy; 2026 Estacy Inc. All rights reserved.</p>
        <div className="flex space-x-6">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-white transition-colors">Cookie Settings</a>
        </div>
      </div>
    </footer>
  );
}
