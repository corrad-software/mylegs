import React from 'react';
import { Upload, File, Trash2, Save } from 'lucide-react';

const Chatbot: React.FC = () => {
  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex justify-between items-start">
        <div>
           <h2 className="text-2xl font-bold text-slate-900">AI Knowledge Base</h2>
           <p className="text-slate-500">Manage context and system instructions for the AI Tutor.</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 hover:bg-blue-700 transition-colors">
            <Save size={16} />
            Update Model
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* System Instruction */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex flex-col h-full">
           <h3 className="font-bold text-slate-900 mb-4">System Instruction</h3>
           <p className="text-xs text-slate-500 mb-2">Define the AI persona and constraints.</p>
           <textarea 
             className="flex-1 w-full bg-slate-50 border border-slate-200 rounded-lg p-4 text-sm font-mono text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
             defaultValue={`You are the official AI Tutor for "MyLegS" (Malaysian Legal System App).
YOUR MANDATE: Provide accurate, academic assistance strictly related to the Malaysian Legal System course.

STRICT SCOPE BOUNDARIES:
1. ONLY answer questions about Malaysian Statutes, Case Law, and Court Hierarchy.
2. IMMEDIATELY REJECT any topic outside this scope.
3. DO NOT answer questions about specific real-world legal cases.`}
           />
        </div>

        {/* Knowledge Files */}
        <div className="space-y-6">
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                <h3 className="font-bold text-slate-900 mb-4">Reference Documents (RAG)</h3>
                
                <div className="space-y-3 mb-6">
                    {[
                        { name: 'Federal_Constitution_Full.pdf', size: '2.4 MB' },
                        { name: 'Contracts_Act_1950.pdf', size: '1.1 MB' },
                        { name: 'Unisza_Course_Outline_2024.pdf', size: '0.5 MB' }
                    ].map((file, i) => (
                        <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100">
                             <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-red-100 text-red-600 rounded flex items-center justify-center">
                                    <File size={16} />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-slate-800">{file.name}</p>
                                    <p className="text-xs text-slate-400">{file.size}</p>
                                </div>
                             </div>
                             <button className="text-slate-400 hover:text-red-500 p-2"><Trash2 size={16}/></button>
                        </div>
                    ))}
                </div>

                <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 flex flex-col items-center justify-center text-slate-400 hover:border-blue-400 hover:bg-blue-50/50 transition-colors cursor-pointer">
                    <Upload size={32} className="mb-2" />
                    <span className="font-bold text-sm text-slate-600">Click to upload PDF</span>
                    <span className="text-xs mt-1">Max 10MB per file</span>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;