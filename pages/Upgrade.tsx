
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { ArrowLeft, Crown, Check, Smartphone, CheckCircle2 } from 'lucide-react';
import { SubscriptionTier } from '../types';

const Upgrade: React.FC = () => {
  const navigate = useNavigate();
  const { upgradeToPremium } = useAuth(); // Ideally rename this to updateTier, but we'll mock it
  const { tiers, updateUser, users } = useData();
  const { user } = useAuth();
  
  const [selectedTier, setSelectedTier] = useState<SubscriptionTier | null>(null);

  const handleSelectTier = (tier: SubscriptionTier) => {
    setSelectedTier(tier);
    // In a real app, this triggers payment flow
    // For now, we instantly upgrade
    if (user) {
        updateUser(user.id, { tierId: tier.id });
        // Refresh auth user (in a real app, auth context would listen to db changes or re-fetch)
        // Here we can assume the UI updates or we need to force reload, 
        // but since AuthContext reads from DataContext on login, we might need a refresh method.
        // For simplicity, we navigate back which triggers re-render of components using hooks.
        alert(`Switched to ${tier.name}!`);
        navigate('/profile');
    }
  };

  const paidTiers = tiers.filter(t => t.price > 0);

  return (
    <div className="min-h-screen bg-slate-50 pb-safe">
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md px-6 py-4 flex items-center border-b border-slate-100">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-full hover:bg-slate-100 transition-colors">
          <ArrowLeft className="w-6 h-6 text-primary" />
        </button>
        <span className="font-bold text-sm uppercase tracking-wider ml-2 text-primary">Plans & Pricing</span>
      </div>

      <div className="p-6">
        <div className="bg-gradient-to-br from-amber-400 via-orange-400 to-amber-500 rounded-3xl p-6 text-white shadow-xl shadow-orange-500/20 mb-8 relative overflow-hidden">
           <div className="absolute top-0 right-0 p-8 opacity-20 transform rotate-12">
              <Crown className="w-32 h-32" />
           </div>
           <div className="relative z-10 text-center py-6">
              <h1 className="font-serif font-bold text-3xl mb-2">Unlock Your Potential</h1>
              <p className="text-white/90 text-sm font-medium">Choose a plan that fits your study needs.</p>
           </div>
        </div>

        <div className="space-y-4">
           {paidTiers.map(tier => {
             const isCurrent = user?.tierId === tier.id;
             let colorClass = 'border-slate-200';
             if(tier.colorTheme === 'amber') colorClass = 'border-amber-200 bg-amber-50/50';
             if(tier.colorTheme === 'purple') colorClass = 'border-purple-200 bg-purple-50/50';
             if(tier.colorTheme === 'emerald') colorClass = 'border-emerald-200 bg-emerald-50/50';

             return (
               <div key={tier.id} className={`bg-white rounded-2xl border-2 p-5 relative ${colorClass} ${isCurrent ? 'ring-2 ring-blue-500' : ''}`}>
                  {isCurrent && <div className="absolute top-0 right-0 bg-blue-500 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl rounded-tr-lg">CURRENT</div>}
                  
                  <div className="flex justify-between items-start mb-4">
                     <div>
                        <h3 className="font-bold text-xl text-slate-900">{tier.name}</h3>
                        <p className="text-xs text-slate-500 font-medium">{tier.description}</p>
                     </div>
                     <div className="text-right">
                        <span className="text-2xl font-bold text-slate-900">RM {tier.price.toFixed(2)}</span>
                     </div>
                  </div>

                  <div className="space-y-2 mb-6">
                     {tier.features.map((feat, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm text-slate-700">
                           <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                           <span>{feat}</span>
                        </div>
                     ))}
                  </div>

                  <button 
                    onClick={() => handleSelectTier(tier)}
                    disabled={isCurrent}
                    className={`w-full py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all active:scale-[0.98] ${
                        isCurrent 
                        ? 'bg-slate-100 text-slate-400 cursor-default' 
                        : 'bg-slate-900 text-white shadow-lg hover:bg-slate-800'
                    }`}
                  >
                     {isCurrent ? 'Current Plan' : 'Select Plan'}
                  </button>
               </div>
             )
           })}
        </div>
      </div>
    </div>
  );
};

export default Upgrade;
