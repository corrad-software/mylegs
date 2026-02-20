import React, { useState } from 'react';
import { Link2, Plus, Edit2, Trash2, ExternalLink } from 'lucide-react';
import { useData } from '../../context/DataContext';

const Pages: React.FC = () => {
  const { links, deleteLink, addLink } = useData();
  const [showAdd, setShowAdd] = useState(false);
  const [newLink, setNewLink] = useState({ title: '', category: 'UniSZA', url: '' });

  const handleAdd = () => {
    if (newLink.title && newLink.url) {
      addLink({
        id: `m${Date.now()}`,
        title: newLink.title,
        category: newLink.category as any,
        url: newLink.url
      });
      setShowAdd(false);
      setNewLink({ title: '', category: 'UniSZA', url: '' });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
           <h2 className="text-2xl font-bold text-slate-900">Pages & Resources</h2>
           <p className="text-slate-500">Manage external links appearing in 'More' tab.</p>
        </div>
        <button 
          onClick={() => setShowAdd(!showAdd)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 hover:bg-blue-700 transition-colors"
        >
          <Plus size={16} />
          Add Resource
        </button>
      </div>

      {showAdd && (
        <div className="bg-slate-50 border border-blue-200 rounded-xl p-4 flex gap-4 items-end animate-slide-up">
           <div className="flex-1">
             <label className="text-xs font-bold text-slate-500 block mb-1">Title</label>
             <input className="w-full border p-2 rounded text-sm" placeholder="e.g. Student Portal" value={newLink.title} onChange={e => setNewLink({...newLink, title: e.target.value})} />
           </div>
           <div className="w-40">
             <label className="text-xs font-bold text-slate-500 block mb-1">Category</label>
             <select className="w-full border p-2 rounded text-sm" value={newLink.category} onChange={e => setNewLink({...newLink, category: e.target.value})}>
               <option value="UniSZA">UniSZA</option>
               <option value="Judiciary">Judiciary</option>
               <option value="Research">Research</option>
             </select>
           </div>
           <div className="flex-1">
             <label className="text-xs font-bold text-slate-500 block mb-1">URL</label>
             <input className="w-full border p-2 rounded text-sm" placeholder="https://..." value={newLink.url} onChange={e => setNewLink({...newLink, url: e.target.value})} />
           </div>
           <button onClick={handleAdd} className="bg-emerald-500 text-white px-4 py-2 rounded text-sm font-bold">Save</button>
        </div>
      )}

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-50 text-slate-500 font-medium">
            <tr>
              <th className="px-6 py-3">Title</th>
              <th className="px-6 py-3">Category</th>
              <th className="px-6 py-3">URL</th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {links.map((link) => (
              <tr key={link.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 font-medium text-slate-900">{link.title}</td>
                <td className="px-6 py-4">
                  <span className="inline-block px-2 py-1 bg-slate-100 rounded text-xs font-bold text-slate-600">
                    {link.category}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-blue-600 group">
                    <Link2 size={14} />
                    <a href={link.url} target="_blank" rel="noreferrer" className="truncate max-w-[200px] hover:underline">
                        {link.url}
                    </a>
                    <ExternalLink size={10} className="opacity-0 group-hover:opacity-100" />
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                   <div className="flex items-center justify-end gap-2">
                     <button className="p-2 hover:bg-slate-100 rounded text-slate-400 hover:text-blue-600"><Edit2 size={14}/></button>
                     <button onClick={() => deleteLink(link.id)} className="p-2 hover:bg-slate-100 rounded text-slate-400 hover:text-red-500"><Trash2 size={14}/></button>
                   </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Pages;