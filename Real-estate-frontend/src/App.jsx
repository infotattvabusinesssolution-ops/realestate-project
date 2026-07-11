import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { AuthProvider } from './context/AuthContext';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="min-h-screen bg-slate-50 text-slate-800 selection:bg-blue-500 selection:text-white">
          <AppRoutes />
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}
