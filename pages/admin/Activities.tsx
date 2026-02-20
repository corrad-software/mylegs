import React from 'react';
import { Gamepad2, Trophy, ExternalLink, Edit2, Trash2 } from 'lucide-react';
import { TOPICS } from '../../constants';

const Activities: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
           <h2 className="text-2xl font-bold text-slate-900">Games & Quizzes</h2>
           <p className="text-slate-500">Manage interactive content links.</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-50 text-slate-500 font-medium">
            <tr>
              <th className="px-6 py-3">Module</th>
              <th className="px-6 py-3">Quiz URL</th>
              <th className="px-6 py-3">Game URL</th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {TOPICS.map((topic) => (
              <tr key={topic.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 font-medium text-slate-900">
                  <div className="flex items-center gap-2">
                    <span className="bg-slate-100 text-slate-500 text-xs px-2 py-0.5 rounded font-bold">#{topic.number}</span>
                    <span className="truncate max-w-[200px]">{topic.title}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 group cursor-pointer">
                    <Trophy size={14} className="text-amber-500" />
                    <span className="text-slate-500 truncate max-w-[150px]">{topic.quizUrl}</span>
                    <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 text-blue-500" />
                  </div>
                </td>
                <td className="px-6 py-4">
                   <div className="flex items-center gap-2 group cursor-pointer">
                    <Gamepad2 size={14} className="text-purple-500" />
                    <span className="text-slate-500 truncate max-w-[150px]">{topic.gameUrl}</span>
                    <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 text-blue-500" />
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                   <div className="flex items-center justify-end gap-2">
                     <button className="p-2 hover:bg-slate-100 rounded text-slate-400 hover:text-blue-600"><Edit2 size={14}/></button>
                     <button className="p-2 hover:bg-slate-100 rounded text-slate-400 hover:text-red-500"><Trash2 size={14}/></button>
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

export default Activities;