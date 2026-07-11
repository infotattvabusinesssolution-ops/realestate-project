import React from 'react';

export function VendorBuyPlanTab() {
  const plans = [
    {
      name: 'Startup',
      price: '$9.99',
      period: '/monthly',
      features: [
        'Agents: 0',
        'Properties: 10',
        'Gallery Images (per property): 3',
        'Additional Feature (per property): 4',
        'Projects: 10',
        'Project Types (per project): 3',
        'Gallery Images (per project): 3',
        'Additional Feature (per project): 4'
      ]
    },
    {
      name: 'Growth',
      price: '$15.99',
      period: '/monthly',
      features: [
        'Agents: 3',
        'Properties: 15',
        'Gallery Images (per property): 4',
        'Additional Feature (per property): 5',
        'Projects: 15',
        'Project Types (per project): 3',
        'Gallery Images (per project): 4',
        'Additional Feature (per project): 5'
      ]
    },
    {
      name: 'Maturity',
      price: '$29.99',
      period: '/monthly',
      features: [
        'Agents: 5',
        'Properties: 20',
        'Gallery Images (per property): 10',
        'Additional Feature (per property): 12',
        'Projects: 20',
        'Project Types (per project): 5',
        'Gallery Images (per project): 10',
        'Additional Feature (per project): 12'
      ]
    },
    {
      name: 'Startup',
      price: '$99.99',
      period: '/yearly',
      features: [
        'Agents: 0',
        'Properties: 10',
        'Gallery Images (per property): 3',
        'Additional Feature (per property): 4',
        'Projects: 10',
        'Project Types (per project): 3',
        'Gallery Images (per project): 3',
        'Additional Feature (per project): 4'
      ]
    },
    {
      name: 'Growth',
      price: '$169.99',
      period: '/yearly',
      features: [
        'Agents: 3',
        'Properties: 15',
        'Gallery Images (per property): 4',
        'Additional Feature (per property): 5',
        'Projects: 15',
        'Project Types (per project): 3',
        'Gallery Images (per project): 4',
        'Additional Feature (per project): 5'
      ]
    },
    {
      name: 'Maturity',
      price: '$299.99',
      period: '/yearly',
      features: [
        'Agents: 5',
        'Properties: 20',
        'Gallery Images (per property): 10',
        'Additional Feature (per property): 12',
        'Projects: 20',
        'Project Types (per project): 5',
        'Gallery Images (per project): 10',
        'Additional Feature (per project): 12'
      ]
    },
    {
      name: 'Free',
      price: 'Free',
      period: '/lifetime',
      features: [
        'Agents: 0',
        'Properties: 1',
        'Gallery Images (per property): 3',
        'Additional Feature (per property): 2',
        'Projects: 1',
        'Project Types (per project): 3',
        'Gallery Images (per project): 3',
        'Additional Feature (per project): 2'
      ]
    },
    {
      name: 'Golden',
      price: '$199.99',
      period: '/lifetime',
      features: [
        'Agents: 10',
        'Properties: 50',
        'Gallery Images (per property): 10',
        'Additional Feature (per property): 12',
        'Projects: 50',
        'Project Types (per project): 12',
        'Gallery Images (per project): 10',
        'Additional Feature (per project): 12'
      ]
    }
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Status Bar */}
      <div className="bg-white rounded-xl border border-slate-200 px-6 py-4 flex items-center shadow-sm">
        <span className="text-xs font-bold text-slate-700">
          Current Package: <span className="text-indigo-600">Platinum</span> 
          <span className="ml-1.5 px-2 py-0.5 bg-indigo-500 text-white rounded-md text-[9px] font-extrabold uppercase">Active</span> 
          <span className="ml-1 text-slate-400 font-medium">(Expire Date: Lifetime)</span>
        </span>
      </div>

      {/* Subscription Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {plans.map((plan, idx) => (
          <div key={idx} className="bg-white rounded-2xl border border-slate-100 shadow-md overflow-hidden flex flex-col justify-between hover:shadow-lg transition duration-300">
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
                onClick={() => alert(`Purchasing ${plan.name} plan...`)}
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition active:scale-95 shadow-md shadow-blue-500/10"
              >
                Buy Now
              </button>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
