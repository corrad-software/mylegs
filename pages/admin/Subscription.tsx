
import React, { useState } from 'react';
import { Check, Info, Save, Plus, Trash2, Edit2 } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { SubscriptionTier } from '../../types';

const Subscription: React.FC = () => {
  const { tiers, updateTier, addTier, deleteTier } = useData();
  const [editingId, setEditingId] = useState<string | null>(null);
  
  // Handlers would be expanded for full form editing, keeping inline simple for now
  
  const handleAddTier = () => {
    const newId = `tier-${Date.now()}`;
    addTier({
      id: newId,
      name: 'New Tier',
      price: 0,
      description: 'Description here',
      moduleLimit: 1,
      features: ['Feature 1'],
      colorTheme: 'slate'
    });
    setEditingId(newId);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
         <div>
            <h2 className="text-2xl font-bold text-slate-900">Subscription Plans</h2>
            <p className="text-slate-500">Configure pricing tiers and feature access limits.</p>
         </div>
         <button onClick={handleAddTier} className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 hover:bg-blue-700">
            <Plus size={16} /> Add Plan
         </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tiers.map(tier => (
          <div key={tier.id} className={`bg-white rounded-xl border shadow-sm p-6 relative flex flex-col ${editingId === tier.id ? 'border-blue-500 ring-2 ring-blue-500/20' : 'border-slate-200'}`}>
             
             {/* Header */}
             <div className="flex justify-between items-start mb-4">
                {editingId === tier.id ? (
                  <input 
                    className="font-bold text-lg border-b border-slate-300 focus:outline-none w-full mr-2"
                    value={tier.name}
                    onChange={(e) => updateTier(tier.id, { name: e.target.value })}
                  />
                ) : (
                  <div>
                    <h3 className="font-bold text-lg text-slate-900">{tier.name}</h3>
                    <p className="text-xs text-slate-500">{tier.description}</p>
                  </div>
                )}
                
                <div className="flex gap-1">
                   {editingId === tier.id ? (
                     <button onClick={() => setEditingId(null)} className="p-1.5 bg-emerald-100 text-emerald-700 rounded"><Save size={14}/></button>
                   ) : (
                     <button onClick={() => setEditingId(tier.id)} className="p-1.5 bg-slate-100 text-slate-600 rounded hover:bg-slate-200"><Edit2 size={14}/></button>
                   )}
                   {!tier.isDefault && (
                     <button onClick={() => deleteTier(tier.id)} className="p-1.5 bg-red-100 text-red-700 rounded hover:bg-red-200"><Trash2 size={14}/></button>
                   )}
                </div>
             </div>

             {/* Pricing */}
             <div className="mb-6">
               {editingId === tier.id ? (
                 <div className="flex items-center gap-2">
                   <span className="text-sm font-bold">RM</span>
                   <input 
                     type="number" 
                     className="border rounded p-1 w-20"
                     value={tier.price}
                     onChange={(e) => updateTier(tier.id, { price: parseFloat(e.target.value) })}
                   />
                 </div>
               ) : (
                 <div className="text-2xl font-bold text-slate-900">
                   {tier.price === 0 ? 'Free' : `RM ${tier.price.toFixed(2)}`}
                 </div>
               )}
             </div>

             {/* Limits */}
             <div className="space-y-3 mb-6 flex-1">
                <div className="flex justify-between items-center text-sm border-b border-slate-50 pb-2">
                   <span className="text-slate-500">Module Limit</span>
                   {editingId === tier.id ? (
                      <select 
                        className="border rounded p-1 text-xs"
                        value={tier.moduleLimit}
                        onChange={(e) => updateTier(tier.id, { moduleLimit: parseInt(e.target.value) })}
                      >
                         <option value={1}>1 Module</option>
                         <option value={3}>3 Modules</option>
                         <option value={5}>5 Modules</option>
                         <option value={-1}>Unlimited</option>
                      </select>
                   ) : (
                      <span className="font-bold">{tier.moduleLimit === -1 ? 'Unlimited' : `${tier.moduleLimit} Modules`}</span>
                   )}
                </div>
                
                {/* Feature List ( Simplified for demo, ideally a dynamic list editor) */}
                <div className="space-y-2">
                   {tier.features.map((f, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-600">
                         <Check size={12} className="text-emerald-500 mt-0.5" />
                         <span>{f}</span>
                      </div>
                   ))}
                </div>
             </div>
             
             {/* Color Theme Selector */}
             {editingId === tier.id && (
               <div className="flex gap-2 mt-4 pt-4 border-t border-slate-100">
                  {['slate', 'amber', 'emerald', 'purple'].map(c => (
                     <button 
                       key={c}
                       onClick={() => updateTier(tier.id, { colorTheme: c as any })}
                       className={`w-6 h-6 rounded-full border-2 ${tier.colorTheme === c ? 'border-black' : 'border-transparent'}`}
                       style={{ backgroundColor: c === 'slate' ? '#64748b' : c === 'amber' ? '#f59e0b' : c === 'emerald' ? '#10b981' : '#a855f7' }}
                     />
                  ))}
               </div>
             )}

          </div>
        ))}
      </div>
    </div>
  );
};

export default Subscription;
