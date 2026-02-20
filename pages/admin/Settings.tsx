import React from 'react';
import { Save, Building, Mail, Globe, Lock } from 'lucide-react';
import { useData } from '../../context/DataContext';

const Settings: React.FC = () => {
  const { settings, updateSettings } = useData();

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
         <h2 className="text-2xl font-bold text-slate-900">General Settings</h2>
         <p className="text-slate-500">Manage business information and app configuration.</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
         <div className="p-6 space-y-6">
            
            <div className="space-y-4">
                <h3 className="font-bold text-slate-900 border-b border-slate-100 pb-2">Company Information</h3>
                
                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">App Name</label>
                    <div className="relative">
                        <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input 
                          type="text" 
                          value={settings.appName}
                          onChange={(e) => updateSettings({ appName: e.target.value })}
                          className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500" 
                        />
                    </div>
                </div>
                 <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Organization / University</label>
                    <div className="relative">
                         <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input 
                          type="text" 
                          value={settings.organization}
                          onChange={(e) => updateSettings({ organization: e.target.value })}
                          className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500" 
                        />
                    </div>
                </div>
                 <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Support Email</label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input 
                          type="email" 
                          value={settings.supportEmail}
                          onChange={(e) => updateSettings({ supportEmail: e.target.value })}
                          className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500" 
                        />
                    </div>
                </div>
            </div>

            <div className="space-y-4 pt-4">
                <h3 className="font-bold text-slate-900 border-b border-slate-100 pb-2">Admin Security</h3>
                <div className="flex items-center gap-4">
                    <button className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50 flex items-center gap-2">
                        <Lock size={14} />
                        Change Password
                    </button>
                    <button className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50">
                        Manage Admin Users
                    </button>
                </div>
            </div>

         </div>
         <div className="bg-slate-50 p-4 flex justify-end">
            <button className="bg-slate-900 text-white px-6 py-2 rounded-lg font-bold text-sm flex items-center gap-2 hover:bg-slate-800 transition-colors">
                <Save size={16} />
                Save Changes
            </button>
         </div>
      </div>
    </div>
  );
};

export default Settings;