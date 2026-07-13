import React, { useState, useEffect } from 'react';
import axiosInstance from '../../api/axiosInstance';

export function VendorBuyPlanTab() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [purchasingId, setPurchasingId] = useState(null);
  
  // Dynamic current package state
  const [currentPackage, setCurrentPackage] = useState({
    name: 'Platinum',
    status: 'Active',
    term: 'Lifetime',
  });

  const fetchData = async () => {
    try {
      setLoading(true);
      const [pkgRes, logsRes] = await Promise.all([
        axiosInstance.get('/packages'),
        axiosInstance.get('/vendor/payment-logs'),
      ]);
      
      setPackages(pkgRes.data);

      // Find the latest successful package payment log
      const successfulPurchase = (logsRes.data || []).find(log => log.status === 'Success');
      if (successfulPurchase && successfulPurchase.package) {
        setCurrentPackage({
          name: successfulPurchase.package.title || 'Standard',
          status: 'Active',
          term: successfulPurchase.package.term || 'Monthly',
        });
      }
    } catch (err) {
      console.error('Failed to load data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Purchase handler
  const handleBuyPlan = async (planId, planName) => {
    try {
      setPurchasingId(planId);
      const res = await axiosInstance.post('/vendor/create-checkout-session', {
        packageId: planId,
      });
      // Redirect to simulated Stripe Checkout page
      window.location.href = res.data.url;
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to initialize payment checkout session');
      setPurchasingId(null);
    }
  };

  // Transform package data into display-friendly plans
  const plans = packages.map(pkg => ({
    _id: pkg._id,
    name: pkg.title,
    price: pkg.price.startsWith('$') ? pkg.price : `$${pkg.price}`,
    period: `/${pkg.term.toLowerCase()}`,
    features: [
      `Agents: ${pkg.agents}`,
      `Properties: ${pkg.properties}`,
      `Gallery Images (per property): ${pkg.galleryPerProp}`,
      `Additional Feature (per property): ${pkg.featuresPerProp}`,
      `Projects: ${pkg.projects}`,
      `Project Types (per project): ${pkg.typesPerProj}`,
      `Gallery Images (per project): ${pkg.galleryPerProj}`,
      `Additional Feature (per project): ${pkg.featuresPerProj}`,
    ],
  }));

  if (loading) {
    return (
      <div className="space-y-6 animate-in fade-in duration-300">
        <div className="h-16 w-full bg-slate-100 rounded-xl animate-pulse"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-80 bg-slate-100 rounded-2xl animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Status Bar */}
      <div className="bg-white rounded-xl border border-slate-200 px-6 py-4 flex items-center shadow-sm">
        <span className="text-xs font-bold text-slate-700">
          Current Package: <span className="text-indigo-650 font-black">{currentPackage.name}</span> 
          <span className="ml-1.5 px-2 py-0.5 bg-indigo-500 text-white rounded-md text-[9px] font-extrabold uppercase">Active</span> 
          <span className="ml-1 text-slate-400 font-medium">(Expire Date: {currentPackage.term === 'Lifetime' ? 'Lifetime' : 'Recurring'})</span>
        </span>
      </div>

      {plans.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-premium p-12 text-center">
          <p className="text-slate-400 font-bold text-sm uppercase tracking-wider">No packages available</p>
        </div>
      ) : (
        /* Subscription Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan, idx) => (
            <div key={plan._id || idx} className="bg-white rounded-2xl border border-slate-100 shadow-md overflow-hidden flex flex-col justify-between hover:shadow-lg transition duration-300">
              <div>
                {/* Header stripe card */}
                <div className="bg-blue-600 h-28 p-5 relative text-white">
                  <span className="text-xs font-extrabold tracking-wider uppercase block">{plan.name}</span>
                  
                  {/* Diagonal slice lines preview style */}
                  <div className="absolute right-0 bottom-0 top-0 left-1/3 bg-white/5 origin-top-left -rotate-12 translate-y-2 pointer-events-none"></div>
                </div>

                {/* Price badge container */}
                <div className="text-center relative -mt-8 z-10">
                  <div className="bg-white border-2 border-blue-50 rounded-xl px-5 py-2.5 shadow-md inline-block text-center min-w-[100px]">
                    <span className="text-base font-black text-slate-900 block leading-none">{plan.price}</span>
                    <span className="text-[9px] font-bold text-slate-450 uppercase tracking-wide block mt-1">{plan.period.replace('/', '')}</span>
                  </div>
                </div>

                {/* Features List */}
                <div className="p-6 space-y-2 pt-6">
                  {plan.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-start space-x-2 text-[10px] text-slate-500 font-bold">
                      <span className="w-3.5 h-3.5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[8px] shrink-0 mt-0.5">✔</span>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Buy button */}
              <div className="p-6 pt-0 shrink-0">
                <button 
                  onClick={() => handleBuyPlan(plan._id, plan.name)}
                  disabled={purchasingId !== null}
                  className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition active:scale-95 shadow-md shadow-blue-500/10 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {purchasingId === plan._id ? 'Processing...' : 'Buy Now'}
                </button>
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
}
