import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Shield, HardHat, Briefcase, Users, ArrowLeft, ArrowRight, Home } from 'lucide-react';
import { motion } from 'framer-motion';

export default function LoginSelection() {
  const navigate = useNavigate();

  const roles = [
    {
      id: 'admin',
      title: 'Super Admin Portal',
      desc: 'System oversight, user registrations, vendor evaluations, and overall platform administration.',
      icon: Shield,
      path: '/login/admin',
      themeColor: 'bg-admin text-admin border-admin/20 hover:border-admin/50',
      badge: 'Blue Theme',
      shadowColor: 'hover:shadow-blue-500/10'
    },
    {
      id: 'vendor',
      title: 'Builder / Vendor Portal',
      desc: 'Publish properties, configure mega projects, track listing approval requests, and view customer interest metrics.',
      icon: HardHat,
      path: '/login/vendor',
      themeColor: 'bg-vendor text-vendor border-vendor/20 hover:border-vendor/50',
      badge: 'Orange Theme',
      shadowColor: 'hover:shadow-orange-500/10'
    },
    {
      id: 'agent',
      title: 'Certified Agent Portal',
      desc: 'Direct listing management, schedule property showings, correspond with buyers, and handle sales paperwork.',
      icon: Briefcase,
      path: '/login/agent',
      themeColor: 'bg-agent text-agent border-agent/20 hover:border-agent/50',
      badge: 'Green Theme',
      shadowColor: 'hover:shadow-green-500/10'
    },
    {
      id: 'customer',
      title: 'Customer Portal',
      desc: 'Browse property catalogs, filter by beds/baths, manage wishlists, and direct message agents.',
      icon: Users,
      path: '/login/customer',
      themeColor: 'bg-customer text-customer border-customer/20 hover:border-customer/50',
      badge: 'Purple Theme',
      shadowColor: 'hover:shadow-purple-500/10'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100/50 flex flex-col justify-between py-12 relative overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-blue-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-purple-500/5 blur-[120px] pointer-events-none" />

      {/* Header */}
      <header className="max-w-7xl mx-auto px-6 w-full flex items-center justify-between z-10">
        <Link to="/" className="flex items-center space-x-2.5 group">
          <div className="p-2 bg-slate-900 text-white rounded-lg group-hover:bg-blue-600 transition-colors">
            <Home size={18} />
          </div>
          <span className="text-lg font-bold tracking-tight text-slate-900">
            Estacy<span className="text-blue-600">.</span>
          </span>
        </Link>
        <Link 
          to="/" 
          className="flex items-center space-x-2 text-slate-500 hover:text-slate-900 text-sm font-semibold transition"
        >
          <ArrowLeft size={16} />
          <span>Back to Landing Page</span>
        </Link>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-6 w-full py-12 z-10 flex-1 flex flex-col justify-center">
        <div className="text-center space-y-4 mb-16 max-w-2xl mx-auto">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">Portal Access Hub</span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-none">
            Choose Your Entry Portal
          </h1>
          <p className="text-slate-500 text-sm leading-relaxed">
            Please select your respective workspace to configure properties, query buyer leads, arrange appointments, or browse listing catalogs.
          </p>
        </div>

        {/* Selection Cards Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {roles.map((role) => {
            const Icon = role.icon;
            return (
              <motion.div
                key={role.id}
                variants={itemVariants}
                onClick={() => navigate(role.path)}
                className={`bg-white rounded-3xl p-8 border border-slate-100 shadow-premium hover:shadow-premium-hover ${role.shadowColor} cursor-pointer transition-all duration-300 group flex flex-col justify-between h-[340px] hover:-translate-y-1.5`}
              >
                <div className="space-y-6">
                  {/* Icon Panel */}
                  <div className={`p-4 rounded-2xl w-fit ${role.themeColor.split(' ')[0]} ${role.themeColor.split(' ')[1]} bg-opacity-10`}>
                    <Icon size={26} />
                  </div>

                  {/* Copy */}
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-extrabold text-slate-900 group-hover:text-slate-950 transition">
                        {role.title}
                      </h3>
                    </div>
                    <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">{role.badge}</p>
                    <p className="text-xs text-slate-500 leading-relaxed font-medium">
                      {role.desc}
                    </p>
                  </div>
                </div>

                {/* Arrow indicator */}
                <div className="flex items-center justify-between text-xs font-bold pt-4 border-t border-slate-50 text-slate-500 group-hover:text-slate-900 transition-colors">
                  <span>Open workspace</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform" />
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-6 w-full text-center text-xs text-slate-400 z-10 pt-6 border-t border-slate-200/50">
        <p>&copy; 2026 Estacy Portal Infrastructure. Secured with 256-bit SSL.</p>
      </footer>
    </div>
  );
}
