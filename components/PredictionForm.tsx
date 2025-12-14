import React, { useState } from 'react';
import { CustomerProfile } from '../types';
import { Send, RotateCcw, Check, Sparkles } from 'lucide-react';

interface PredictionFormProps {
  onPredict: (data: CustomerProfile) => void;
  isLoading: boolean;
}

const initialProfile: CustomerProfile = {
  gender: 'Female',
  seniorCitizen: false,
  partner: false,
  dependents: false,
  tenure: 1,
  phoneService: true,
  multipleLines: 'No',
  internetService: 'Fiber optic',
  onlineSecurity: false,
  onlineBackup: false,
  deviceProtection: false,
  techSupport: false,
  streamingTV: false,
  streamingMovies: false,
  contract: 'Month-to-month',
  paperlessBilling: true,
  paymentMethod: 'Electronic check',
  monthlyCharges: 70.0,
  totalCharges: 70.0,
};

export const PredictionForm: React.FC<PredictionFormProps> = ({ onPredict, isLoading }) => {
  const [profile, setProfile] = useState<CustomerProfile>(initialProfile);

  const handleChange = (field: keyof CustomerProfile, value: any) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onPredict(profile);
  };

  const loadPreset = (type: 'high' | 'low') => {
      if (type === 'high') {
          setProfile({
              ...initialProfile,
              tenure: 2,
              contract: 'Month-to-month',
              internetService: 'Fiber optic',
              paymentMethod: 'Electronic check',
              techSupport: false,
              onlineSecurity: false,
              monthlyCharges: 95.50
          });
      } else {
           setProfile({
              ...initialProfile,
              tenure: 48,
              contract: 'Two year',
              internetService: 'DSL',
              paymentMethod: 'Credit card (automatic)',
              techSupport: true,
              onlineSecurity: true,
              monthlyCharges: 65.0,
              partner: true,
              dependents: true
          });
      }
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-100 bg-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
                 <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-indigo-500" />
                    Customer Profiler
                </h2>
                <p className="text-sm text-slate-500 mt-1">Enter details to simulate prediction.</p>
            </div>
            <div className="flex gap-2">
                <button type="button" onClick={() => loadPreset('low')} className="text-xs px-3 py-1.5 rounded-full bg-green-100 text-green-700 font-medium hover:bg-green-200 transition">
                    Load Low Risk
                </button>
                <button type="button" onClick={() => loadPreset('high')} className="text-xs px-3 py-1.5 rounded-full bg-rose-100 text-rose-700 font-medium hover:bg-rose-200 transition">
                    Load High Risk
                </button>
            </div>
        </div>
      
      <form onSubmit={handleSubmit} className="p-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Section 1: Demographics */}
        <div className="space-y-6">
          <h3 className="font-semibold text-slate-900 border-b pb-2">Demographics</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Gender</label>
              <select 
                className="w-full rounded-lg border-slate-200 text-slate-700 focus:ring-indigo-500 focus:border-indigo-500"
                value={profile.gender}
                onChange={(e) => handleChange('gender', e.target.value)}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Senior Citizen</label>
                 <div className="flex items-center h-10">
                    <button
                        type="button"
                        onClick={() => handleChange('seniorCitizen', !profile.seniorCitizen)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${profile.seniorCitizen ? 'bg-indigo-600' : 'bg-slate-200'}`}
                    >
                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${profile.seniorCitizen ? 'translate-x-6' : 'translate-x-1'}`} />
                    </button>
                    <span className="ml-3 text-sm text-slate-600">{profile.seniorCitizen ? 'Yes' : 'No'}</span>
                 </div>
            </div>
          </div>

           <div className="space-y-3">
             <label className="flex items-center gap-3 p-3 border rounded-lg hover:bg-slate-50 cursor-pointer transition-colors">
                 <input type="checkbox" className="rounded text-indigo-600 w-4 h-4" checked={profile.partner} onChange={(e) => handleChange('partner', e.target.checked)} />
                 <span className="text-sm font-medium text-slate-700">Has Partner</span>
             </label>
             <label className="flex items-center gap-3 p-3 border rounded-lg hover:bg-slate-50 cursor-pointer transition-colors">
                 <input type="checkbox" className="rounded text-indigo-600 w-4 h-4" checked={profile.dependents} onChange={(e) => handleChange('dependents', e.target.checked)} />
                 <span className="text-sm font-medium text-slate-700">Has Dependents</span>
             </label>
           </div>
           
           <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Tenure (Months)</label>
              <input 
                type="number" 
                min="0"
                max="72"
                className="w-full rounded-lg border-slate-200 focus:ring-indigo-500 focus:border-indigo-500"
                value={profile.tenure}
                onChange={(e) => handleChange('tenure', parseInt(e.target.value))}
              />
               <input 
                type="range" 
                min="0" max="72" 
                value={profile.tenure} 
                onChange={(e) => handleChange('tenure', parseInt(e.target.value))}
                className="w-full mt-2 accent-indigo-600"
               />
           </div>
        </div>

        {/* Section 2: Services */}
        <div className="space-y-6">
          <h3 className="font-semibold text-slate-900 border-b pb-2">Services</h3>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Internet Service</label>
            <select 
              className="w-full rounded-lg border-slate-200 text-slate-700 focus:ring-indigo-500 focus:border-indigo-500"
              value={profile.internetService}
              onChange={(e) => handleChange('internetService', e.target.value)}
            >
              <option value="No">No Internet</option>
              <option value="DSL">DSL</option>
              <option value="Fiber optic">Fiber Optic</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {[
                { key: 'onlineSecurity', label: 'Security' },
                { key: 'onlineBackup', label: 'Backup' },
                { key: 'deviceProtection', label: 'Protection' },
                { key: 'techSupport', label: 'Support' },
                { key: 'streamingTV', label: 'TV' },
                { key: 'streamingMovies', label: 'Movies' }
            ].map((item) => (
                <label key={item.key} className={`flex items-center justify-center p-3 border rounded-lg cursor-pointer transition-all text-sm font-medium ${profile[item.key as keyof CustomerProfile] ? 'bg-indigo-50 border-indigo-200 text-indigo-700' : 'hover:bg-slate-50 text-slate-600'}`}>
                    <input 
                        type="checkbox" 
                        className="hidden" 
                        checked={profile[item.key as keyof CustomerProfile] as boolean} 
                        onChange={(e) => handleChange(item.key as keyof CustomerProfile, e.target.checked)} 
                    />
                    {profile[item.key as keyof CustomerProfile] && <Check className="w-3 h-3 mr-1.5" />}
                    {item.label}
                </label>
            ))}
          </div>

           <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Phone Service</label>
              <select 
                className="w-full rounded-lg border-slate-200 text-slate-700 focus:ring-indigo-500 focus:border-indigo-500"
                value={profile.multipleLines}
                onChange={(e) => handleChange('multipleLines', e.target.value)}
              >
                 <option value="No phone service">No Service</option>
                 <option value="No">Single Line</option>
                 <option value="Yes">Multiple Lines</option>
              </select>
            </div>
        </div>

        {/* Section 3: Account */}
        <div className="space-y-6">
          <h3 className="font-semibold text-slate-900 border-b pb-2">Account Info</h3>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Contract</label>
            <select 
              className="w-full rounded-lg border-slate-200 text-slate-700 focus:ring-indigo-500 focus:border-indigo-500"
              value={profile.contract}
              onChange={(e) => handleChange('contract', e.target.value)}
            >
              <option value="Month-to-month">Month-to-month</option>
              <option value="One year">One year</option>
              <option value="Two year">Two year</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Payment Method</label>
            <select 
              className="w-full rounded-lg border-slate-200 text-slate-700 focus:ring-indigo-500 focus:border-indigo-500"
              value={profile.paymentMethod}
              onChange={(e) => handleChange('paymentMethod', e.target.value)}
            >
              <option value="Electronic check">Electronic check</option>
              <option value="Mailed check">Mailed check</option>
              <option value="Bank transfer (automatic)">Bank transfer (Auto)</option>
              <option value="Credit card (automatic)">Credit card (Auto)</option>
            </select>
          </div>

          <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Monthly Charges ($)</label>
              <div className="relative">
                 <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">$</span>
                 <input 
                    type="number" 
                    className="w-full pl-7 rounded-lg border-slate-200 focus:ring-indigo-500 focus:border-indigo-500"
                    value={profile.monthlyCharges}
                    onChange={(e) => handleChange('monthlyCharges', parseFloat(e.target.value))}
                  />
              </div>
          </div>
          
           <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Paperless Billing</label>
              <div className="flex gap-4">
                  <label className="flex items-center">
                      <input type="radio" name="paperless" className="text-indigo-600 focus:ring-indigo-500" checked={profile.paperlessBilling} onChange={() => handleChange('paperlessBilling', true)} />
                      <span className="ml-2 text-sm text-slate-700">Yes</span>
                  </label>
                  <label className="flex items-center">
                      <input type="radio" name="paperless" className="text-indigo-600 focus:ring-indigo-500" checked={!profile.paperlessBilling} onChange={() => handleChange('paperlessBilling', false)} />
                      <span className="ml-2 text-sm text-slate-700">No</span>
                  </label>
              </div>
           </div>

           <div className="pt-4 mt-auto">
             <button
               type="submit"
               disabled={isLoading}
               className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-xl shadow-lg shadow-indigo-200 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
             >
               {isLoading ? (
                   <>
                    <RotateCcw className="w-5 h-5 animate-spin" />
                    Analyzing Model...
                   </>
               ) : (
                   <>
                    <Send className="w-5 h-5" />
                    Predict Churn Risk
                   </>
               )}
             </button>
           </div>
        </div>

      </form>
    </div>
  );
};
