import React, { useState } from 'react';
import { Plus, FileText, ScrollText, MoreVertical, Folder, Trash2, Edit2, X, Save } from 'lucide-react';
import { useData } from '../../context/DataContext';

const Content: React.FC = () => {
  const { topics, addTopic, deleteTopic, updateTopic } = useData();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<{ title: string; number: number } | null>(null);

  const handleAddNew = () => {
    const newNumber = topics.length + 1;
    addTopic({
      id: `t${Date.now()}`,
      number: newNumber,
      title: 'New Module',
      notesUrl: '',
      quizUrl: '',
      gameUrl: '',
      relatedStatuteIds: [],
      relatedCaseSummaryIds: []
    });
  };

  const startEdit = (topic: any) => {
    setEditingId(topic.id);
    setForm({ title: topic.title, number: topic.number });
  };

  const saveEdit = (id: string) => {
    if (form) {
      updateTopic(id, form);
      setEditingId(null);
      setForm(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
           <h2 className="text-2xl font-bold text-slate-900">Content Management</h2>
           <p className="text-slate-500">Manage modules, notes, and slides.</p>
        </div>
        <button 
          onClick={handleAddNew}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 hover:bg-blue-700 transition-colors"
        >
          <Plus size={16} />
          Add Topic
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {topics.map((topic) => (
          <div key={topic.id} className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow relative group">
            <div className="p-5 border-b border-slate-100 flex justify-between items-start">
               <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center">
                    <Folder size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">Module {topic.number}</h3>
                    <p className="text-xs text-slate-500">ID: {topic.id}</p>
                  </div>
               </div>
               
               <div className="flex gap-1">
                 {editingId === topic.id ? (
                   <button onClick={() => saveEdit(topic.id)} className="p-1.5 text-emerald-600 bg-emerald-50 rounded"><Save size={16}/></button>
                 ) : (
                   <button onClick={() => startEdit(topic)} className="p-1.5 text-slate-400 hover:text-blue-600"><Edit2 size={16}/></button>
                 )}
                 <button onClick={() => deleteTopic(topic.id)} className="p-1.5 text-slate-400 hover:text-red-600"><Trash2 size={16}/></button>
               </div>
            </div>
            
            <div className="p-5">
               {editingId === topic.id ? (
                 <div className="space-y-2 mb-4">
                    <label className="text-xs font-bold text-slate-400">Title</label>
                    <input 
                      value={form?.title} 
                      onChange={e => setForm(prev => prev ? ({...prev, title: e.target.value}) : null)}
                      className="w-full text-sm border p-1 rounded"
                    />
                 </div>
               ) : (
                 <h4 className="font-bold text-slate-800 mb-3 h-10 line-clamp-2">{topic.title}</h4>
               )}
               
               <div className="space-y-2">
                 <div className="flex items-center gap-2 text-sm text-slate-600 p-2 bg-slate-50 rounded border border-slate-100">
                    <FileText size={14} className="text-blue-400" />
                    <span className="truncate flex-1">Lecture Notes</span>
                    {topic.notesUrl ? <span className="text-[10px] text-emerald-600 font-bold">Linked</span> : <span className="text-[10px] text-slate-400">Empty</span>}
                 </div>
                 <div className="flex items-center gap-2 text-sm text-slate-600 p-2 bg-slate-50 rounded border border-slate-100">
                    <ScrollText size={14} className="text-emerald-400" />
                    <span className="truncate flex-1">Statutes List</span>
                    <span className="text-[10px] bg-white border border-slate-200 px-1.5 rounded text-slate-400">{topic.relatedStatuteIds.length}</span>
                 </div>
               </div>
            </div>
            
            <div className="p-3 bg-slate-50 border-t border-slate-100 rounded-b-xl flex justify-between text-xs font-medium text-slate-500">
               <span>Editable via Admin</span>
               <button className="text-blue-600 hover:underline">Details</button>
            </div>
          </div>
        ))}
        
        {/* Add New Card */}
        <div 
          onClick={handleAddNew}
          className="border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center p-8 text-slate-400 hover:border-blue-400 hover:text-blue-500 hover:bg-blue-50/50 transition-all cursor-pointer"
        >
           <Plus size={32} className="mb-2" />
           <span className="font-bold text-sm">Add New Module</span>
        </div>
      </div>
    </div>
  );
};

export default Content;