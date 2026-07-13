import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { CreditCard, Lock, ArrowLeft, CheckCircle, Shield } from 'lucide-react';

export default function StripeCheckout() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const sessionId = searchParams.get('session_id') || '';
  const packageId = searchParams.get('package_id') || '';
  const planName = searchParams.get('plan_name') || 'Platinum Subscription';
  const price = searchParams.get('price') || '$150.00';
  const term = searchParams.get('term') || 'Lifetime';

  // State
  const [email, setEmail] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [name, setName] = useState('');
  const [paying, setPaying] = useState(false);
  const [success, setSuccess] = useState(false);

  // Format Card Number (adds space every 4 digits)
  const handleCardNumberChange = (e) => {
    let value = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    let matches = value.match(/\d{4,16}/g);
    let match = (matches && matches[0]) || '';
    let parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length > 0) {
      setCardNumber(parts.join(' '));
    } else {
      setCardNumber(value);
    }
  };

  // Format Expiry date (adds slash MM/YY)
  const handleExpiryChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 2) {
      setExpiry(`${value.slice(0, 2)}/${value.slice(2, 4)}`);
    } else {
      setExpiry(value);
    }
  };

  const handlePay = (e) => {
    e.preventDefault();
    if (!email || !cardNumber || !expiry || !cvc || !name) {
      alert('Please fill out all payment details.');
      return;
    }

    setPaying(true);

    // Simulate payment processing
    setTimeout(() => {
      setPaying(false);
      setSuccess(true);

      // Redirect back to dashboard after 2.5 seconds
      setTimeout(() => {
        navigate(`/dashboard/vendor?session_id=${sessionId}&purchase_success=true&package_id=${packageId}`);
      }, 2500);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col md:flex-row font-sans selection:bg-blue-500 selection:text-white">
      
      {/* SUCCESS OVERLAY */}
      {success && (
        <div className="fixed inset-0 bg-slate-950/95 z-50 flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-300">
          <div className="w-20 h-20 bg-emerald-500 text-white rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/20 mb-6 scale-up animate-bounce">
            <CheckCircle size={44} />
          </div>
          <h1 className="text-2xl font-black tracking-tight text-white mb-2">Payment Successful!</h1>
          <p className="text-slate-400 text-sm max-w-sm leading-relaxed mb-6">
            Thank you for your purchase. We are finalising your subscription for {planName}. Redirecting to your dashboard...
          </p>
          <div className="w-12 h-1 bg-blue-500 rounded-full animate-pulse"></div>
        </div>
      )}

      {/* LEFT COLUMN: Summary */}
      <div className="w-full md:w-[45%] bg-slate-950 p-8 md:p-16 flex flex-col justify-between border-b md:border-b-0 md:border-r border-slate-800">
        <button 
          onClick={() => navigate('/dashboard/vendor')}
          className="flex items-center space-x-2 text-slate-400 hover:text-white text-xs font-bold transition self-start"
        >
          <ArrowLeft size={14} />
          <span>Back to Dashboard</span>
        </button>

        <div className="my-12 space-y-6">
          <div>
            <span className="text-[10px] bg-slate-800 text-slate-300 px-2.5 py-0.5 rounded font-bold uppercase tracking-wider">
              Estaty Subscriptions
            </span>
            <h2 className="text-slate-400 font-extrabold text-xs uppercase tracking-widest mt-4">Subscribe to</h2>
            <h1 className="text-3xl font-black tracking-tight text-white mt-1">{planName}</h1>
          </div>

          <div className="flex items-baseline space-x-2">
            <span className="text-4xl font-black text-white">{price}</span>
            <span className="text-slate-500 text-xs font-bold">/{term.toLowerCase()}</span>
          </div>

          {/* Secure statement */}
          <div className="flex items-start space-x-2.5 bg-slate-900/60 p-4 rounded-xl border border-slate-800 text-[11px] text-slate-400 font-semibold leading-relaxed">
            <Shield size={18} className="text-blue-500 shrink-0 mt-0.5" />
            <span>
              Your card details are fully encrypted. This payment is simulated in test mode for evaluation purposes.
            </span>
          </div>
        </div>

        <div className="text-[10px] text-slate-600 font-bold tracking-wide uppercase">
          Powered by Stripe
        </div>
      </div>

      {/* RIGHT COLUMN: Card Details Form */}
      <div className="flex-1 bg-slate-900 p-8 md:p-16 flex flex-col justify-center max-w-2xl mx-auto">
        <form onSubmit={handlePay} className="space-y-6 text-xs font-bold text-slate-400">
          
          <h2 className="text-base font-black text-white tracking-tight border-b border-slate-800 pb-3 mb-2 flex items-center gap-2">
            <CreditCard size={18} className="text-blue-500" />
            <span>Pay with card</span>
          </h2>

          <div className="flex flex-col space-y-1.5">
            <label htmlFor="email" className="text-slate-400 uppercase tracking-wider text-[9px]">Email address</label>
            <input 
              id="email"
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-blue-500 transition font-medium"
            />
          </div>

          <div className="flex flex-col space-y-1.5">
            <label className="text-slate-400 uppercase tracking-wider text-[9px]">Card information</label>
            
            <div className="bg-slate-950 border border-slate-800 rounded-xl divide-y divide-slate-850 overflow-hidden">
              {/* Card Number Input */}
              <div className="relative">
                <input 
                  type="text" 
                  required
                  value={cardNumber}
                  onChange={handleCardNumberChange}
                  maxLength="19"
                  placeholder="4242 4242 4242 4242"
                  className="w-full bg-transparent border-0 px-4 py-3.5 text-slate-100 placeholder-slate-600 focus:outline-none transition font-medium"
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600">
                  <CreditCard size={18} />
                </div>
              </div>

              {/* Expire / CVC group */}
              <div className="flex divide-x divide-slate-850">
                <input 
                  type="text" 
                  required
                  value={expiry}
                  onChange={handleExpiryChange}
                  maxLength="5"
                  placeholder="MM/YY"
                  className="w-1/2 bg-transparent border-0 px-4 py-3.5 text-slate-100 placeholder-slate-600 focus:outline-none transition font-medium text-center"
                />
                <input 
                  type="password" 
                  required
                  value={cvc}
                  onChange={(e) => setCvc(e.target.value.replace(/[^0-9]/g, ''))}
                  maxLength="4"
                  placeholder="CVC"
                  className="w-1/2 bg-transparent border-0 px-4 py-3.5 text-slate-100 placeholder-slate-600 focus:outline-none transition font-medium text-center"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col space-y-1.5">
            <label htmlFor="cardname" className="text-slate-400 uppercase tracking-wider text-[9px]">Name on card</label>
            <input 
              id="cardname"
              type="text" 
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Jane Doe"
              className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-blue-500 transition font-medium"
            />
          </div>

          <div className="flex flex-col space-y-1.5">
            <label className="text-slate-400 uppercase tracking-wider text-[9px]">Country or region</label>
            <select className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:border-blue-500 transition font-medium">
              <option value="US">United States</option>
              <option value="GB">United Kingdom</option>
              <option value="NG">Nigeria</option>
              <option value="AE">United Arab Emirates</option>
              <option value="IN">India</option>
            </select>
          </div>

          {/* Pay Button */}
          <button 
            type="submit"
            disabled={paying}
            className="w-full py-4 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-xl text-xs font-bold transition shadow-lg shadow-blue-500/10 hover:shadow-blue-500/20 active:scale-[0.98] flex items-center justify-center space-x-2 mt-4"
          >
            {paying ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              <>
                <Lock size={12} />
                <span>Pay {price}</span>
              </>
            )}
          </button>

          <p className="text-[10px] text-slate-500 text-center font-semibold leading-relaxed mt-4">
            By subscribing, you agree to Estaty's Terms of Use and Privacy Policy.
          </p>

        </form>
      </div>

    </div>
  );
}
