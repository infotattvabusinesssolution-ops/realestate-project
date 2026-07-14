import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Globe, ChevronDown, Building2, ShieldAlert } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export default function CustomerLogin() {
  const navigate = useNavigate();
  const { login, register } = useAuth();
  const toast = useToast();
  
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const validateEmail = (emailVal) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Local form validations
    if (isLogin) {
      if (!email.trim()) {
        setError('Email Address is required.');
        toast.error('Email Address is required.');
        return;
      }
      if (!validateEmail(email.trim())) {
        setError('Please enter a valid email address.');
        toast.error('Please enter a valid email address.');
        return;
      }
      if (!password) {
        setError('Password is required.');
        toast.error('Password is required.');
        return;
      }
      if (password.length < 6) {
        setError('Password must be at least 6 characters.');
        toast.error('Password must be at least 6 characters.');
        return;
      }
    } else {
      if (!name.trim()) {
        setError('Full Name is required.');
        toast.error('Full Name is required.');
        return;
      }
      if (!email.trim()) {
        setError('Email Address is required.');
        toast.error('Email Address is required.');
        return;
      }
      if (!validateEmail(email.trim())) {
        setError('Please enter a valid email address.');
        toast.error('Please enter a valid email address.');
        return;
      }
      if (!password) {
        setError('Password is required.');
        toast.error('Password is required.');
        return;
      }
      if (password.length < 6) {
        setError('Password must be at least 6 characters.');
        toast.error('Password must be at least 6 characters.');
        return;
      }
      if (phone.trim() && !/^\+?[0-9\s-]{7,15}$/.test(phone.trim())) {
        setError('Please enter a valid phone number (7-15 digits).');
        toast.error('Please enter a valid phone number (7-15 digits).');
        return;
      }
    }

    setIsLoading(true);

    try {
      if (isLogin) {
        // Customer login
        const loggedUser = await login(email.trim(), password);
        if (loggedUser.role !== 'customer') {
          const errMsg = `Access denied. You are registered as a '${loggedUser.role}'.`;
          setError(errMsg);
          toast.error(errMsg);
          setIsLoading(false);
          return;
        }
        setIsLoading(false);
        toast.success('Logged in successfully!');
        navigate('/dashboard/customer');
      } else {
        // Customer signup
        await register(name.trim(), email.trim(), password, 'customer', phone.trim(), city.trim());
        setIsLoading(false);
        toast.success('Registered successfully!');
        navigate('/dashboard/customer');
      }
    } catch (err) {
      setIsLoading(false);
      const errMsg = err.response?.data?.message || err || 'Authentication failed. Please verify fields.';
      setError(errMsg);
      toast.error(errMsg);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-orange-500 selection:text-white">
      
      {/* 1. Top Navbar Header */}
      <header className="bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between sticky top-0 z-50 shadow-xs">
        <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate('/')}>
          <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center text-white shadow-md shadow-orange-500/20">
            <Building2 size={18} />
          </div>
          <span className="text-xl font-black tracking-tight text-orange-500 font-sans">
            Estaty
          </span>
        </div>

        {/* Center Links */}
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
          <div className="flex items-center space-x-1.5 text-xs font-bold text-slate-600 cursor-pointer hover:text-slate-900 transition">
            <Globe size={14} className="text-slate-400" />
            <span>English</span>
          </div>

          <div className="flex items-center space-x-2">
            <button 
              onClick={() => navigate('/login/customer')} 
              className="px-4 py-1.5 border border-orange-500 text-orange-500 rounded-lg text-xs font-bold transition hover:bg-orange-50 shadow-xs"
            >
              Customer
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

      {/* 2. Banner Header */}
      <div className="relative h-64 bg-slate-900 overflow-hidden flex flex-col items-center justify-center text-white">
        <img 
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80" 
          alt="Banner" 
          className="absolute inset-0 w-full h-full object-cover opacity-50" 
        />
        <div className="relative z-10 text-center space-y-3">
          <h1 className="text-3xl lg:text-4xl font-extrabold tracking-wide font-sans drop-shadow-md">Login</h1>
          <p className="text-xs font-bold text-slate-350 tracking-wider">
            <span className="hover:text-white cursor-pointer" onClick={() => navigate('/')}>Home</span> &gt;&gt; <span className="text-orange-500 font-extrabold">Login</span>
          </p>
        </div>
      </div>

      {/* 3. Main Login Card Section */}
      <div className="flex-1 flex items-center justify-center py-16 px-6">
        <div className="bg-white border border-slate-100 rounded-2xl max-w-md w-full p-8 shadow-premium space-y-6">
          <h2 className="text-base font-extrabold text-slate-800 uppercase tracking-wider text-left pb-3 border-b border-slate-100">
            {isLogin ? 'Login' : 'Sign Up'}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs font-bold text-slate-700">
            {error && (
              <div className="flex items-center space-x-3 p-3 bg-red-50 text-red-700 rounded-xl border border-red-100 text-sm">
                <ShieldAlert size={16} className="flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {!isLogin && (
              <div className="flex flex-col space-y-1.5">
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full Name*"
                  className="bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs font-medium text-slate-850 focus:outline-none focus:ring-1 focus:ring-orange-500/50"
                />
              </div>
            )}

            <div className="flex flex-col space-y-1.5">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address*"
                className="bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs font-medium text-slate-850 focus:outline-none focus:ring-1 focus:ring-orange-500/50"
              />
            </div>

            <div className="flex flex-col space-y-1.5">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••"
                className="bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs font-medium text-slate-850 focus:outline-none focus:ring-1 focus:ring-orange-500/50"
              />
            </div>

            {!isLogin && (
              <>
                <div className="flex flex-col space-y-1.5">
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Phone Number"
                    className="bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs font-medium text-slate-850 focus:outline-none focus:ring-1 focus:ring-orange-500/50"
                  />
                </div>

                <div className="flex flex-col space-y-1.5">
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="City"
                    className="bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs font-medium text-slate-850 focus:outline-none focus:ring-1 focus:ring-orange-500/50"
                  />
                </div>
              </>
            )}

            {/* Links Row */}
            <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 pt-2">
              <a href="#" className="text-orange-500 hover:underline">Forgot password?</a>
              <span>
                {isLogin ? (
                  <>
                    don't have an account?{' '}
                    <span 
                      onClick={() => setIsLogin(false)} 
                      className="text-orange-500 hover:underline cursor-pointer font-extrabold"
                    >
                      Click here
                    </span>{' '}
                    to signup
                  </>
                ) : (
                  <>
                    already have an account?{' '}
                    <span 
                      onClick={() => setIsLogin(true)} 
                      className="text-orange-500 hover:underline cursor-pointer font-extrabold"
                    >
                      Click here
                    </span>{' '}
                    to login
                  </>
                )}
              </span>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-[#f97316] hover:bg-orange-600 text-white rounded-xl font-bold text-xs transition active:scale-95 shadow-md shadow-orange-500/10 mt-4 flex items-center justify-center"
            >
              {isLoading ? 'Processing...' : isLogin ? 'Login' : 'Sign Up'}
            </button>

          </form>
        </div>
      </div>

      {/* 4. Beautiful Footer */}
      <footer className="bg-white border-t border-slate-100 pt-16 pb-8">
        <div className="max-w-7xl w-full mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 text-xs font-bold text-slate-500">
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
            <div className="flex space-x-3 text-slate-400 pt-2 font-black text-sm">
              <span className="cursor-pointer hover:text-orange-500">FB</span>
              <span className="cursor-pointer hover:text-orange-500">TW</span>
              <span className="cursor-pointer hover:text-orange-500">IG</span>
              <span className="cursor-pointer hover:text-orange-500">YT</span>
            </div>
          </div>

          <div className="space-y-4 md:pl-12">
            <h4 className="text-sm font-extrabold text-slate-800 uppercase tracking-wider">Useful Links</h4>
            <ul className="space-y-2.5 font-semibold text-slate-450">
              <li className="hover:text-orange-500 cursor-pointer">About Us</li>
              <li className="hover:text-orange-500 cursor-pointer">Contact</li>
              <li className="hover:text-orange-500 cursor-pointer">Vendors</li>
              <li className="hover:text-orange-500 cursor-pointer">FAQ</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-extrabold text-slate-800 uppercase tracking-wider">Contact Us</h4>
            <ul className="space-y-3 font-semibold text-slate-450">
              <li>📍 15th Street 47 W, New York, USA</li>
              <li>📞 +880155879521</li>
              <li>✉️ estaty@gmail.com</li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-slate-100 text-center text-slate-400 text-[11px] font-semibold">
          Copyright © 2026. All Rights Reserved.
        </div>
      </footer>

    </div>
  );
}
