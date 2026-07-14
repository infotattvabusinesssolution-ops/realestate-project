import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Building2, Lock, Eye, EyeOff, ShieldAlert, ArrowLeft, CheckCircle } from 'lucide-react';
import { resetPasswordAPI } from '../api/api';
import { useToast } from '../context/ToastContext';

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const toast = useToast();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!password) {
      setError('New password is required.');
      toast.error('New password is required.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      toast.error('Password must be at least 6 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      toast.error('Passwords do not match.');
      return;
    }

    setIsLoading(true);

    try {
      const res = await resetPasswordAPI(token, password);
      setIsLoading(false);
      setIsSuccess(true);
      toast.success(res.data?.message || 'Password reset successfully!');
      
      // Delay redirection slightly so they can read the success message
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (err) {
      setIsLoading(false);
      const errMsg = err.response?.data?.message || err || 'Failed to reset password. The link may have expired.';
      setError(errMsg);
      toast.error(errMsg);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-orange-500 selection:text-white">
      {/* Navbar Header */}
      <header className="bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between sticky top-0 z-50 shadow-xs">
        <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate('/')}>
          <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center text-white shadow-md shadow-orange-500/20">
            <Building2 size={18} />
          </div>
          <span className="text-xl font-black tracking-tight text-orange-500 font-sans">
            Estaty
          </span>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex-1 flex items-center justify-center py-16 px-6">
        <div className="bg-white border border-slate-100 rounded-2xl max-w-md w-full p-8 shadow-premium space-y-6">
          
          <h2 className="text-base font-extrabold text-slate-800 uppercase tracking-wider text-left pb-3 border-b border-slate-100">
            Reset Password
          </h2>

          {isSuccess ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center text-green-500 mx-auto border border-green-150 animate-bounce">
                <CheckCircle size={32} />
              </div>
              <h3 className="text-lg font-bold text-slate-800">Password Reset Completed</h3>
              <p className="text-xs text-slate-500 leading-relaxed max-w-xs mx-auto font-semibold">
                Your password has been successfully updated. You are now being redirected back to the login page...
              </p>
              <div className="pt-4">
                <Link
                  to="/login"
                  className="px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-xs font-bold transition shadow-md shadow-orange-500/10 inline-block"
                >
                  Go to Login Now
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs font-bold text-slate-700">
              {error && (
                <div className="flex items-center space-x-3 p-3 bg-red-50 text-red-700 rounded-xl border border-red-100 text-sm">
                  <ShieldAlert size={16} className="flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <p className="text-xs text-slate-500 font-semibold leading-relaxed">
                Please enter a secure password containing at least 6 characters.
              </p>

              {/* Password field */}
              <div className="flex flex-col space-y-1.5 relative">
                <label className="text-slate-700">New Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                    <Lock size={16} />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-white border border-slate-200 rounded-xl pl-11 pr-11 py-3 text-xs font-medium text-slate-850 focus:outline-none focus:ring-1 focus:ring-orange-500/50"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-650 transition-colors"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* Confirm Password field */}
              <div className="flex flex-col space-y-1.5 relative">
                <label className="text-slate-700">Confirm New Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                    <Lock size={16} />
                  </div>
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-white border border-slate-200 rounded-xl pl-11 pr-11 py-3 text-xs font-medium text-slate-850 focus:outline-none focus:ring-1 focus:ring-orange-500/50"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-650 transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 bg-[#f97316] hover:bg-orange-600 text-white rounded-xl font-bold text-xs transition active:scale-95 shadow-md shadow-orange-500/10 mt-6 flex items-center justify-center"
              >
                {isLoading ? 'Resetting Password...' : 'Reset Password'}
              </button>

              <div className="text-center pt-3 border-t border-slate-100">
                <Link
                  to="/login"
                  className="text-slate-500 hover:text-slate-800 text-xs font-semibold inline-flex items-center space-x-1"
                >
                  <ArrowLeft size={12} />
                  <span>Back to Login</span>
                </Link>
              </div>
            </form>
          )}

        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-100 py-8 text-center text-slate-400 text-[11px] font-semibold">
        Copyright © 2026. All Rights Reserved.
      </footer>
    </div>
  );
}
