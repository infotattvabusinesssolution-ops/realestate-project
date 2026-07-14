import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, Loader2 } from 'lucide-react';
import { getAdminOnlineGatewaysAPI, updateAdminOnlineGatewaysAPI } from '../../api/api';

export default function OnlineGatewaysTab({ setActiveTab }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Paypal Settings
  const [paypalStatus, setPaypalStatus] = useState('Active');
  const [paypalTestMode, setPaypalTestMode] = useState('Active');
  const [paypalClientId, setPaypalClientId] = useState('');
  const [paypalClientSecret, setPaypalClientSecret] = useState('');

  // Instamojo Settings
  const [instaStatus, setInstaStatus] = useState('Active');
  const [instaTestMode, setInstaTestMode] = useState('Active');
  const [instaApiKey, setInstaApiKey] = useState('');
  const [instaAuthToken, setInstaAuthToken] = useState('');

  // Paytm Settings
  const [paytmStatus, setPaytmStatus] = useState('Active');
  const [paytmEnv, setPaytmEnv] = useState('Local');
  const [paytmMerchantKey, setPaytmMerchantKey] = useState('');
  const [paytmMerchantMid, setPaytmMerchantMid] = useState('');
  const [paytmWebsite, setPaytmWebsite] = useState('');
  const [paytmIndustry, setPaytmIndustry] = useState('');

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await getAdminOnlineGatewaysAPI();
        const data = res.data;
        setPaypalStatus(data.paypalStatus || 'Active');
        setPaypalTestMode(data.paypalTestMode || 'Active');
        setPaypalClientId(data.paypalClientId || '');
        setPaypalClientSecret(data.paypalClientSecret || '');

        setInstaStatus(data.instaStatus || 'Active');
        setInstaTestMode(data.instaTestMode || 'Active');
        setInstaApiKey(data.instaApiKey || '');
        setInstaAuthToken(data.instaAuthToken || '');

        setPaytmStatus(data.paytmStatus || 'Active');
        setPaytmEnv(data.paytmEnv || 'Local');
        setPaytmMerchantKey(data.paytmMerchantKey || '');
        setPaytmMerchantMid(data.paytmMerchantMid || '');
        setPaytmWebsite(data.paytmWebsite || '');
        setPaytmIndustry(data.paytmIndustry || '');
      } catch (err) {
        console.error('Error fetching online gateway settings:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleUpdate = async (gateway) => {
    setSaving(true);
    try {
      const payload = {
        paypalStatus,
        paypalTestMode,
        paypalClientId,
        paypalClientSecret,
        instaStatus,
        instaTestMode,
        instaApiKey,
        instaAuthToken,
        paytmStatus,
        paytmEnv,
        paytmMerchantKey,
        paytmMerchantMid,
        paytmWebsite,
        paytmIndustry,
      };
      await updateAdminOnlineGatewaysAPI(payload);
      alert(`${gateway} Gateway settings updated successfully!`);
    } catch (err) {
      alert(`Failed to update ${gateway} settings: ` + (err.response?.data?.message || err.message));
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-20 bg-white rounded-2xl border border-slate-100 shadow-premium">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Heading & Breadcrumbs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-slate-100">
        <div>
          <h1 className="text-xl lg:text-2xl font-bold tracking-tight text-slate-900">Online Gateways</h1>
          <div className="flex items-center space-x-2 text-xs text-slate-400 mt-2">
            <Home size={14} className="text-slate-400 cursor-pointer hover:text-blue-600" onClick={() => navigate('/')} />
            <span>&gt;</span>
            <span className="hover:text-blue-600 cursor-pointer" onClick={() => setActiveTab('dashboard')}>Payment Gateways</span>
            <span>&gt;</span>
            <span className="text-slate-500 font-semibold">Online Gateways</span>
          </div>
        </div>
      </div>

      {/* Grid of 3 Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        {/* Card 1: Paypal */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-premium p-6 space-y-6">
          <h3 className="text-sm font-bold text-slate-800 pb-3 border-b border-slate-50">Paypal</h3>
          
          <div className="space-y-4 text-xs font-bold text-slate-700">
            {/* Status */}
            <div className="flex flex-col space-y-1.5">
              <label>Paypal Status</label>
              <div className="flex border border-slate-200 rounded-xl overflow-hidden bg-slate-50/50">
                <button
                  onClick={() => setPaypalStatus('Active')}
                  className={`flex-1 py-2 text-xs font-bold transition ${
                    paypalStatus === 'Active' ? 'bg-blue-600 text-white shadow-sm' : 'bg-white text-slate-500 hover:bg-slate-50'
                  }`}
                >
                  Active
                </button>
                <button
                  onClick={() => setPaypalStatus('Deactive')}
                  className={`flex-1 py-2 text-xs font-bold transition ${
                    paypalStatus === 'Deactive' ? 'bg-blue-600 text-white shadow-sm' : 'bg-white text-slate-500 hover:bg-slate-50'
                  }`}
                >
                  Deactive
                </button>
              </div>
            </div>

            {/* Test Mode */}
            <div className="flex flex-col space-y-1.5">
              <label>Paypal Test Mode</label>
              <div className="flex border border-slate-200 rounded-xl overflow-hidden bg-slate-50/50">
                <button
                  onClick={() => setPaypalTestMode('Active')}
                  className={`flex-1 py-2 text-xs font-bold transition ${
                    paypalTestMode === 'Active' ? 'bg-blue-600 text-white shadow-sm' : 'bg-white text-slate-500 hover:bg-slate-50'
                  }`}
                >
                  Active
                </button>
                <button
                  onClick={() => setPaypalTestMode('Deactive')}
                  className={`flex-1 py-2 text-xs font-bold transition ${
                    paypalTestMode === 'Deactive' ? 'bg-blue-600 text-white shadow-sm' : 'bg-white text-slate-500 hover:bg-slate-50'
                  }`}
                >
                  Deactive
                </button>
              </div>
            </div>

            {/* Client ID */}
            <div className="flex flex-col space-y-1.5">
              <label>Paypal Client ID</label>
              <input
                type="text"
                value={paypalClientId}
                onChange={(e) => setPaypalClientId(e.target.value)}
                className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none"
              />
            </div>

            {/* Client Secret */}
            <div className="flex flex-col space-y-1.5">
              <label>Paypal Client Secret</label>
              <input
                type="text"
                value={paypalClientSecret}
                onChange={(e) => setPaypalClientSecret(e.target.value)}
                className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none"
              />
            </div>

            {/* Update Button */}
            <div className="flex justify-center pt-2">
              <button
                onClick={() => handleUpdate('Paypal')}
                disabled={saving}
                className="px-6 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold transition active:scale-95 shadow-md shadow-emerald-500/10 disabled:opacity-50"
              >
                Update
              </button>
            </div>
          </div>
        </div>

        {/* Card 2: Instamojo */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-premium p-6 space-y-6">
          <h3 className="text-sm font-bold text-slate-800 pb-3 border-b border-slate-50">Instamojo</h3>
          
          <div className="space-y-4 text-xs font-bold text-slate-700">
            {/* Status */}
            <div className="flex flex-col space-y-1.5">
              <label>Instamojo Status</label>
              <div className="flex border border-slate-200 rounded-xl overflow-hidden bg-slate-50/50">
                <button
                  onClick={() => setInstaStatus('Active')}
                  className={`flex-1 py-2 text-xs font-bold transition ${
                    instaStatus === 'Active' ? 'bg-blue-600 text-white shadow-sm' : 'bg-white text-slate-500 hover:bg-slate-50'
                  }`}
                >
                  Active
                </button>
                <button
                  onClick={() => setInstaStatus('Deactive')}
                  className={`flex-1 py-2 text-xs font-bold transition ${
                    instaStatus === 'Deactive' ? 'bg-blue-600 text-white shadow-sm' : 'bg-white text-slate-500 hover:bg-slate-50'
                  }`}
                >
                  Deactive
                </button>
              </div>
            </div>

            {/* Test Mode */}
            <div className="flex flex-col space-y-1.5">
              <label>Instamojo Test Mode</label>
              <div className="flex border border-slate-200 rounded-xl overflow-hidden bg-slate-50/50">
                <button
                  onClick={() => setInstaTestMode('Active')}
                  className={`flex-1 py-2 text-xs font-bold transition ${
                    instaTestMode === 'Active' ? 'bg-blue-600 text-white shadow-sm' : 'bg-white text-slate-500 hover:bg-slate-50'
                  }`}
                >
                  Active
                </button>
                <button
                  onClick={() => setInstaTestMode('Deactive')}
                  className={`flex-1 py-2 text-xs font-bold transition ${
                    instaTestMode === 'Deactive' ? 'bg-blue-600 text-white shadow-sm' : 'bg-white text-slate-500 hover:bg-slate-50'
                  }`}
                >
                  Deactive
                </button>
              </div>
            </div>

            {/* API Key */}
            <div className="flex flex-col space-y-1.5">
              <label>Instamojo API Key</label>
              <input
                type="text"
                value={instaApiKey}
                onChange={(e) => setInstaApiKey(e.target.value)}
                className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none"
              />
            </div>

            {/* Auth Token */}
            <div className="flex flex-col space-y-1.5">
              <label>Instamojo Auth Token</label>
              <input
                type="text"
                value={instaAuthToken}
                onChange={(e) => setInstaAuthToken(e.target.value)}
                className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none"
              />
            </div>

            {/* Update Button */}
            <div className="flex justify-center pt-2">
              <button
                onClick={() => handleUpdate('Instamojo')}
                disabled={saving}
                className="px-6 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold transition active:scale-95 shadow-md shadow-emerald-500/10 disabled:opacity-50"
              >
                Update
              </button>
            </div>
          </div>
        </div>

        {/* Card 3: Paytm */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-premium p-6 space-y-6">
          <h3 className="text-sm font-bold text-slate-800 pb-3 border-b border-slate-50">Paytm</h3>
          
          <div className="space-y-4 text-xs font-bold text-slate-700">
            {/* Status */}
            <div className="flex flex-col space-y-1.5">
              <label>Paytm Status</label>
              <div className="flex border border-slate-200 rounded-xl overflow-hidden bg-slate-50/50">
                <button
                  onClick={() => setPaytmStatus('Active')}
                  className={`flex-1 py-2 text-xs font-bold transition ${
                    paytmStatus === 'Active' ? 'bg-blue-600 text-white shadow-sm' : 'bg-white text-slate-500 hover:bg-slate-50'
                  }`}
                >
                  Active
                </button>
                <button
                  onClick={() => setPaytmStatus('Deactive')}
                  className={`flex-1 py-2 text-xs font-bold transition ${
                    paytmStatus === 'Deactive' ? 'bg-blue-600 text-white shadow-sm' : 'bg-white text-slate-500 hover:bg-slate-50'
                  }`}
                >
                  Deactive
                </button>
              </div>
            </div>

            {/* Environment */}
            <div className="flex flex-col space-y-1.5">
              <label>Paytm Environment</label>
              <div className="flex border border-slate-200 rounded-xl overflow-hidden bg-slate-50/50">
                <button
                  onClick={() => setPaytmEnv('Local')}
                  className={`flex-1 py-2 text-xs font-bold transition ${
                    paytmEnv === 'Local' ? 'bg-blue-600 text-white shadow-sm' : 'bg-white text-slate-500 hover:bg-slate-50'
                  }`}
                >
                  Local
                </button>
                <button
                  onClick={() => setPaytmEnv('Production')}
                  className={`flex-1 py-2 text-xs font-bold transition ${
                    paytmEnv === 'Production' ? 'bg-blue-600 text-white shadow-sm' : 'bg-white text-slate-500 hover:bg-slate-50'
                  }`}
                >
                  Production
                </button>
              </div>
            </div>

            {/* Merchant Key */}
            <div className="flex flex-col space-y-1.5">
              <label>Paytm Merchant Key</label>
              <input
                type="text"
                value={paytmMerchantKey}
                onChange={(e) => setPaytmMerchantKey(e.target.value)}
                className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none"
              />
            </div>

            {/* Merchant MID */}
            <div className="flex flex-col space-y-1.5">
              <label>Paytm Merchant MID</label>
              <input
                type="text"
                value={paytmMerchantMid}
                onChange={(e) => setPaytmMerchantMid(e.target.value)}
                className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none"
              />
            </div>

            {/* Merchant Website */}
            <div className="flex flex-col space-y-1.5">
              <label>Paytm Merchant Website</label>
              <input
                type="text"
                value={paytmWebsite}
                onChange={(e) => setPaytmWebsite(e.target.value)}
                className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none"
              />
            </div>

            {/* Industry Type */}
            <div className="flex flex-col space-y-1.5">
              <label>Industry Type</label>
              <input
                type="text"
                value={paytmIndustry}
                onChange={(e) => setPaytmIndustry(e.target.value)}
                className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none"
              />
            </div>

            {/* Update Button */}
            <div className="flex justify-center pt-2">
              <button
                onClick={() => handleUpdate('Paytm')}
                disabled={saving}
                className="px-6 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold transition active:scale-95 shadow-md shadow-emerald-500/10 disabled:opacity-50"
              >
                Update
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
