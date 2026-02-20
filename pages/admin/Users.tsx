import React, { useState } from 'react';
import { Search, MoreHorizontal, UserPlus, Filter, ShieldCheck, ShieldAlert, Edit, Trash2, X, Save } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { User } from '../../types';

const Users: React.FC = () => {
  const { users, tiers, addUser, updateUser, deleteUser, getTierById } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Form State
  const [formData, setFormData] = useState<Partial<User>>({
    name: '',
    email: '',
    password: '',
    tierId: 'free',
    status: 'Active',
    role: 'user'
  });

  const handleOpenModal = (user?: User) => {
    if (user) {
      setEditingUser(user);
      // Don't populate password field for security/cleanliness, only set if changing
      setFormData({
        ...user,
        password: '' // Clear password field for edit mode
      });
    } else {
      setEditingUser(null);
      setFormData({
        name: '',
        email: '',
        password: '123', // Default for new users
        tierId: 'free',
        status: 'Active',
        role: 'user'
      });
    }
    setIsModalOpen(true);
  };

  const handleSave = () => {
    // Prepare data to save
    const dataToSave = { ...formData };
    
    // If editing and password field is empty, remove it so we don't overwrite with empty string
    if (editingUser && !dataToSave.password) {
        delete dataToSave.password;
    }

    if (editingUser) {
      updateUser(editingUser.id, dataToSave);
    } else {
      addUser({
        ...dataToSave,
        id: `u${Date.now()}`,
        joined: new Date().toISOString().split('T')[0]
      } as User);
    }
    setIsModalOpen(false);
  };

  const getTierColor = (tierId: string) => {
    const tier = getTierById(tierId);
    if (!tier) return 'bg-slate-100 text-slate-600';
    
    switch (tier.colorTheme) {
      case 'amber': return 'bg-amber-50 text-amber-700';
      case 'purple': return 'bg-purple-50 text-purple-700';
      case 'emerald': return 'bg-emerald-50 text-emerald-700';
      default: return 'bg-slate-100 text-slate-600';
    }
  };

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
           <h2 className="text-2xl font-bold text-slate-900">User Management</h2>
           <p className="text-slate-500">Manage registered users and assign subscription plans.</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 hover:bg-blue-700 transition-colors"
        >
          <UserPlus size={16} />
          Add User
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-slate-200 flex gap-4">
           <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search users..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
           </div>
           <button className="px-3 py-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 flex items-center gap-2 text-sm font-medium">
             <Filter size={16} />
             Filters
           </button>
        </div>

        {/* Table */}
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-50 text-slate-500 font-medium">
            <tr>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Subscription</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Role</th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredUsers.map((user) => {
              const tier = getTierById(user.tierId);
              return (
                <tr key={user.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold text-xs uppercase">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-medium text-slate-900">{user.name}</div>
                        <div className="text-slate-500 text-xs">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${getTierColor(user.tierId)}`}>
                      {tier?.name || 'Unknown'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                     <span className={`text-xs font-bold ${user.status === 'Active' ? 'text-emerald-600' : 'text-slate-400'}`}>
                       {user.status}
                     </span>
                  </td>
                  <td className="px-6 py-4 text-slate-600 capitalize">{user.role}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => handleOpenModal(user)} className="text-slate-400 hover:text-blue-600 p-1">
                          <Edit size={16} />
                      </button>
                      <button onClick={() => deleteUser(user.id)} className="text-slate-400 hover:text-red-600 p-1">
                          <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* User Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
           <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-slide-up">
              <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                 <h3 className="font-bold text-slate-900">{editingUser ? 'Edit User' : 'Add New User'}</h3>
                 <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600"><X size={20}/></button>
              </div>
              
              <div className="p-6 space-y-4">
                 <div>
                    <label className="text-xs font-bold text-slate-500 uppercase">Full Name</label>
                    <input 
                      className="w-full border border-slate-200 rounded-lg p-2 mt-1 text-sm focus:ring-2 focus:ring-blue-500/20 outline-none" 
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                    />
                 </div>
                 <div>
                    <label className="text-xs font-bold text-slate-500 uppercase">Email</label>
                    <input 
                      className="w-full border border-slate-200 rounded-lg p-2 mt-1 text-sm focus:ring-2 focus:ring-blue-500/20 outline-none" 
                      value={formData.email}
                      onChange={e => setFormData({...formData, email: e.target.value})}
                    />
                 </div>
                 <div>
                    <label className="text-xs font-bold text-slate-500 uppercase">
                        {editingUser ? 'Change Password (Leave blank to keep)' : 'Password'}
                    </label>
                    <input 
                      type="text"
                      placeholder={editingUser ? "New password..." : "Set password"}
                      className="w-full border border-slate-200 rounded-lg p-2 mt-1 text-sm focus:ring-2 focus:ring-blue-500/20 outline-none placeholder-slate-300" 
                      value={formData.password}
                      onChange={e => setFormData({...formData, password: e.target.value})}
                    />
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="text-xs font-bold text-slate-500 uppercase">Subscription Plan</label>
                        <select 
                          className="w-full border border-slate-200 rounded-lg p-2 mt-1 text-sm bg-white"
                          value={formData.tierId}
                          onChange={e => setFormData({...formData, tierId: e.target.value})}
                        >
                           {tiers.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="text-xs font-bold text-slate-500 uppercase">Status</label>
                        <select 
                          className="w-full border border-slate-200 rounded-lg p-2 mt-1 text-sm bg-white"
                          value={formData.status}
                          onChange={e => setFormData({...formData, status: e.target.value as any})}
                        >
                           <option value="Active">Active</option>
                           <option value="Inactive">Inactive</option>
                        </select>
                    </div>
                 </div>
                 <div>
                    <label className="text-xs font-bold text-slate-500 uppercase">Role</label>
                    <select 
                        className="w-full border border-slate-200 rounded-lg p-2 mt-1 text-sm bg-white"
                        value={formData.role}
                        onChange={e => setFormData({...formData, role: e.target.value as any})}
                    >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                 </div>
              </div>
              
              <div className="p-4 border-t border-slate-100 flex justify-end gap-2 bg-slate-50">
                 <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-slate-500 font-bold text-sm hover:text-slate-700">Cancel</button>
                 <button onClick={handleSave} className="px-4 py-2 bg-blue-600 text-white rounded-lg font-bold text-sm hover:bg-blue-700 flex items-center gap-2">
                    <Save size={16} />
                    Save User
                 </button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default Users;