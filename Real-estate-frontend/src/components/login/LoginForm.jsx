import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Home, Mail, Lock, Eye, EyeOff, ArrowLeft, ShieldAlert } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function LoginForm({ role, themeClass, title, subtitle, bannerImage, bannerTitle, bannerDesc }) {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Theme-specific styles config
  const themeStyles = {
    admin: {
      btn: 'bg-admin hover:bg-admin-dark focus:ring-admin',
      text: 'text-admin',
      borderFocus: 'focus:border-admin focus:ring-admin',
      gradient: 'from-blue-600 to-indigo-800'
    },
    vendor: {
      btn: 'bg-vendor hover:bg-vendor-dark focus:ring-vendor',
      text: 'text-vendor',
      borderFocus: 'focus:border-vendor focus:ring-vendor',
      gradient: 'from-orange-500 to-amber-700'
    },
    agent: {
      btn: 'bg-agent hover:bg-agent-dark focus:ring-agent',
      text: 'text-agent',
      borderFocus: 'focus:border-agent focus:ring-agent',
      gradient: 'from-green-600 to-emerald-800'
    },
    customer: {
      btn: 'bg-customer hover:bg-customer-dark focus:ring-customer',
      text: 'text-customer',
      borderFocus: 'focus:border-customer focus:ring-customer',
      gradient: 'from-purple-600 to-indigo-900'
    }
  };

  const style = themeStyles[role] || themeStyles.admin;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    setIsLoading(true);

    try {
      const loggedUser = await login(email, password);
      // Validate role mapping
      if (loggedUser.role !== role) {
        setError(`Access denied. You are registered as a '${loggedUser.role}'.`);
        setIsLoading(false);
        return;
      }
      setIsLoading(false);
      navigate(`/dashboard/${role}`);
    } catch (err) {
      setIsLoading(false);
      setError(err || 'Invalid email or password.');
    }
  };

  // Populate mock credentials for testing ease
  const handleFillCredentials = () => {
    if (role === 'admin') {
      setEmail('leonard@estacy.com');
      setPassword('password123');
    } else if (role === 'vendor') {
      setEmail('oscar@estacy.com');
      setPassword('password123');
    } else if (role === 'agent') {
      setEmail('rendall@estacy.com');
      setPassword('password123');
    } else {
      setEmail('sarah.j@gmail.com');
      setPassword('password123');
    }
  };

  return (
    <div className="min-h-screen flex bg-slate-50">
      {/* Back Button */}
      <Link 
        to="/login" 
        className="absolute top-6 left-6 z-20 flex items-center space-x-2 text-slate-500 hover:text-slate-900 bg-white shadow-premium hover:shadow-premium-hover px-4 py-2.5 rounded-xl text-sm font-semibold transition-all active:scale-95 border border-slate-100"
      >
        <ArrowLeft size={16} />
        <span>Back to roles</span>
      </Link>

      {/* Left panel - Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 sm:px-16 lg:px-24 py-12 relative z-10">
        <div className="max-w-md w-full mx-auto space-y-8">
          <div className="space-y-3">
            <Link to="/" className="flex items-center space-x-2 group">
              <div className={`p-2 bg-slate-900 text-white rounded-lg`}>
                <Home size={18} />
              </div>
              <span className="text-lg font-bold tracking-tight text-slate-900">
                Estacy<span className={style.text}>.</span>
              </span>
            </Link>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">{title}</h1>
            <p className="text-slate-500">{subtitle}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="flex items-center space-x-3 p-4 bg-red-50 text-red-700 rounded-xl border border-red-100 text-sm animate-shake">
                <ShieldAlert size={18} className="flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@estacy.com"
                  className={`w-full bg-white text-slate-900 border border-slate-200 rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:ring-2 transition-all ${style.borderFocus}`}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-bold text-slate-700">Password</label>
                <a href="#" className={`text-xs font-semibold hover:underline ${style.text}`}>
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                  <Lock size={18} />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className={`w-full bg-white text-slate-900 border border-slate-200 rounded-xl pl-11 pr-11 py-3 text-sm focus:outline-none focus:ring-2 transition-all ${style.borderFocus}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full text-white font-bold py-3.5 px-4 rounded-xl text-sm transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-95 shadow-lg shadow-slate-200 flex items-center justify-center space-x-2 ${style.btn} ${
                isLoading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>Authenticating...</span>
                </>
              ) : (
                <span>Sign In</span>
              )}
            </button>
          </form>

          {/* Quick Mock Login */}
          <div className="pt-6 border-t border-slate-200/80">
            <button
              type="button"
              onClick={handleFillCredentials}
              className="w-full py-2.5 px-4 bg-slate-100 hover:bg-slate-200/80 text-slate-600 rounded-xl text-xs font-bold transition-all border border-dashed border-slate-300 flex items-center justify-center space-x-2"
            >
              <span>Auto-fill Mock Demo Credentials</span>
            </button>
          </div>
        </div>
      </div>

      {/* Right panel - Splash Image Banner */}
      <div className={`hidden lg:block lg:w-1/2 relative bg-gradient-to-br ${style.gradient} overflow-hidden`}>
        <div className="absolute inset-0 z-0">
          <img
            src={bannerImage}
            alt="Real estate visual"
            className="w-full h-full object-cover mix-blend-overlay opacity-30 scale-105 hover:scale-100 transition-transform duration-1000"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent z-1"></div>
        
        {/* Banner Copy */}
        <div className="absolute bottom-20 left-16 right-16 z-10 text-white space-y-4">
          <span className="px-3.5 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-semibold tracking-wider uppercase border border-white/20">
            {role === 'admin' ? 'Management' : role === 'vendor' ? 'Construct' : role === 'agent' ? 'Sales' : 'Invest'}
          </span>
          <h2 className="text-4xl font-extrabold tracking-tight leading-tight">{bannerTitle}</h2>
          <p className="text-white/80 leading-relaxed text-sm max-w-lg">{bannerDesc}</p>
        </div>
      </div>
    </div>
  );
}
