import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Home, Menu, X, ArrowRight } from 'lucide-react';

export default function Navbar() {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'py-4 glassmorphism shadow-premium' 
        : 'py-6 bg-transparent border-b border-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3 group">
          <div className="p-2.5 bg-blue-600 text-white rounded-xl shadow-md group-hover:bg-blue-700 transition-colors">
            <Home size={22} className="group-hover:rotate-6 transition-transform" />
          </div>
          <span className={`text-2xl font-extrabold tracking-tight transition-colors duration-300 ${
            isScrolled 
              ? 'bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700' 
              : 'text-white'
          }`}>
            Estacy<span className="text-blue-500">.</span>
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#properties" className={`text-sm font-semibold transition-colors duration-300 ${
            isScrolled ? 'text-slate-600 hover:text-blue-600' : 'text-slate-200 hover:text-white'
          }`}>
            Properties
          </a>
          <a href="#projects" className={`text-sm font-semibold transition-colors duration-300 ${
            isScrolled ? 'text-slate-600 hover:text-blue-600' : 'text-slate-200 hover:text-white'
          }`}>
            Projects
          </a>
          <a href="#agents" className={`text-sm font-semibold transition-colors duration-300 ${
            isScrolled ? 'text-slate-600 hover:text-blue-600' : 'text-slate-200 hover:text-white'
          }`}>
            Our Agents
          </a>
          <a href="#testimonials" className={`text-sm font-semibold transition-colors duration-300 ${
            isScrolled ? 'text-slate-600 hover:text-blue-600' : 'text-slate-200 hover:text-white'
          }`}>
            Reviews
          </a>
        </nav>

        {/* CTA Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <button 
            onClick={() => navigate('/login')}
            className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl text-sm font-bold shadow-md hover:shadow-lg transition-all duration-300 active:scale-95 group ${
              isScrolled
                ? 'bg-slate-900 text-white hover:bg-slate-800'
                : 'bg-white text-slate-950 hover:bg-slate-100'
            }`}
          >
            <span>Portal Login</span>
            <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className={`md:hidden p-2 transition-colors duration-300 ${
            isScrolled ? 'text-slate-600 hover:text-slate-900' : 'text-white hover:text-slate-200'
          }`}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 glassmorphism shadow-lg border-t border-slate-100 py-6 px-6 flex flex-col space-y-4 animate-in fade-in slide-in-from-top-5 duration-200">
          <a 
            href="#properties" 
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-base font-semibold text-slate-700 hover:text-blue-600 py-2 border-b border-slate-100"
          >
            Properties
          </a>
          <a 
            href="#projects" 
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-base font-semibold text-slate-700 hover:text-blue-600 py-2 border-b border-slate-100"
          >
            Projects
          </a>
          <a 
            href="#agents" 
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-base font-semibold text-slate-700 hover:text-blue-600 py-2 border-b border-slate-100"
          >
            Our Agents
          </a>
          <a 
            href="#testimonials" 
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-base font-semibold text-slate-700 hover:text-blue-600 py-2 border-b border-slate-100"
          >
            Reviews
          </a>
          <button 
            onClick={() => {
              setIsMobileMenuOpen(false);
              navigate('/login');
            }}
            className="w-full flex items-center justify-center space-x-2 px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-md transition-all active:scale-95"
          >
            <span>Portal Login</span>
            <ArrowRight size={16} />
          </button>
        </div>
      )}
    </header>
  );
}

