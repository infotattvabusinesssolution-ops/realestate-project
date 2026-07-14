import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import LoginSelection from '../pages/LoginSelection';
import AdminLogin from '../pages/AdminLogin';
import VendorLogin from '../pages/VendorLogin';
import AgentLogin from '../pages/AgentLogin';
import CustomerLogin from '../pages/CustomerLogin';
import AdminDashboard from '../pages/AdminDashboard';
import VendorDashboard from '../pages/VendorDashboard';
import AgentDashboard from '../pages/AgentDashboard';
import CustomerDashboard from '../pages/CustomerDashboard';
import StripeCheckout from '../pages/StripeCheckout';
import ResetPassword from '../pages/ResetPassword';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginSelection />} />
      <Route path="/login/admin" element={<AdminLogin />} />
      <Route path="/login/vendor" element={<VendorLogin />} />
      <Route path="/login/agent" element={<AgentLogin />} />
      <Route path="/login/customer" element={<CustomerLogin />} />
      <Route path="/dashboard/admin" element={<AdminDashboard />} />
      <Route path="/dashboard/vendor" element={<VendorDashboard />} />
      <Route path="/dashboard/agent" element={<AgentDashboard />} />
      <Route path="/dashboard/customer" element={<CustomerDashboard />} />
      <Route path="/stripe-checkout" element={<StripeCheckout />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
      <Route path="*" element={
        <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 text-slate-800">
          <h1 className="text-6xl font-extrabold text-blue-600 mb-4">404</h1>
          <p className="text-xl mb-6">Page Not Found</p>
          <a href="/" className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition">
            Go Back Home
          </a>
        </div>
      } />
    </Routes>
  );
}
