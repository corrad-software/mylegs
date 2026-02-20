
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ScreenHeader } from '../components/Shared';
import { PAST_EXAMS, QUESTION_BANKS } from '../constants';
import { ResourceItem, ExamResource } from '../types';
import { useAuth } from '../context/AuthContext';
import { 
  Lock, Crown, FileText, ChevronRight, BookOpen, 
  HelpCircle, CalendarDays, CheckCircle2 
} from 'lucide-react';

interface PracticeProps {
  onOpenResource: (res: ResourceItem) => void;
}

const Practice: React.FC<PracticeProps> = ({ onOpenResource }) => {
  const navigate = useNavigate();
  const { user, upgradeToPremium } = useAuth();
  const [activeTab, setActiveTab] = useState<'past-year' | 'topical'>('past-year');

  const isFree = user?.tierId === 'free';

  const handleOpenPaper = (exam: ExamResource) => {
    onOpenResource({
      id: exam.id,
      title: exam.title,
      url: exam.url,
      type: 'webview',
      previewText: `Opening ${exam.category}...`
    });
  };

  // --- LOCKED VIEW (Free User) ---
  if (isFree) {
    return (
      <div className="pb-32 bg-background min-h-screen">
        <ScreenHeader 
          title="Question Bank" 
          subtitle="Exam Prep & Resources" 
          onBack={() => navigate('/')}
          big
        />
        
        <div className="px-6 mt-6">
          {/* Upsell Card */}
          <div className="bg-gradient-to-br from-slate-900 to-blue-900 rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl">
            {/* Background Decorations */}
            <div className="absolute top-0 right-0 p-12 opacity-10 transform rotate-12">
               <Lock className="w-32 h-32 text-white" />
            </div>
            
            <div className="relative z-10 flex flex-col items-center text-center">
              <div 
                onClick={upgradeToPremium}
                className="w-16 h-16 bg-gradient-to-tr from-amber-400 to-amber-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-amber-500/30 cursor-pointer active:scale-90 hover:scale-105 transition-transform"
                title="Tap to Unlock (Dev Bypass)"
              >
                 <Crown className="w-8 h-8 text-white" />
              </div>

              <h2 className="font-serif font-bold text-3xl mb-3">Premium Access</h2>
              <p className="text-blue-200 text-sm mb-8 leading-relaxed max-w-[260px]">
                Unlock the complete archive of past year exams, model answers, and topical question banks.
              </p>

              <div className="w-full space-y-3 mb-8 text-left bg-white/10 rounded-xl p-4 border border-white/5">
                <div className="flex items-center gap-3">
                   <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0" />
                   <span className="text-sm font-medium">Past Year Exam Papers</span>
                </div>
                <div className="flex items-center gap-3">
                   <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0" />
                   <span className="text-sm font-medium">Model Answers & Marking Schemes</span>
                </div>
                <div className="flex items-center gap-3">
                   <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0" />
                   <span className="text-sm font-medium">Topical Question Sets</span>
                </div>
              </div>

              <button 
                onClick={() => navigate('/upgrade')}
                className="w-full py-4 bg-white text-blue-900 rounded-xl font-bold text-sm hover:bg-blue-50 transition-colors shadow-lg active:scale-[0.98] flex items-center justify-center gap-2"
              >
                <span>Upgrade to Unlock</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Blurred Preview */}
          <div className="mt-8 opacity-50 pointer-events-none select-none filter blur-[2px]">
             <h3 className="font-bold text-lg text-slate-800 mb-4">Preview Content</h3>
             <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-white p-4 rounded-xl border border-slate-200 flex items-center justify-between">
                     <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-slate-100 rounded-lg"></div>
                        <div className="space-y-2">
                           <div className="h-4 w-32 bg-slate-200 rounded"></div>
                           <div className="h-3 w-20 bg-slate-100 rounded"></div>
                        </div>
                     </div>
                     <div className="h-8 w-8 bg-slate-100 rounded-full"></div>
                  </div>
                ))}
             </div>
          </div>
        </div>
      </div>
    );
  }

  // --- UNLOCKED VIEW (Paid User) ---
  return (
    <div className="pb-32 bg-background min-h-screen">
      <ScreenHeader 
        title="Question Bank" 
        subtitle="Exam Prep & Resources" 
        onBack={() => navigate('/')}
        big
      />
      
      <div className="px-6 mt-6">
        
        {/* Tab Switcher */}
        <div className="flex bg-slate-200/50 p-1 rounded-xl mb-6">
           <button 
             onClick={() => setActiveTab('past-year')}
             className={`flex-1 py-2.5 text-xs font-bold uppercase tracking-wide rounded-lg transition-all ${
               activeTab === 'past-year' 
               ? 'bg-white text-blue-900 shadow-sm' 
               : 'text-slate-500 hover:text-slate-700'
             }`}
           >
             Past Years
           </button>
           <button 
             onClick={() => setActiveTab('topical')}
             className={`flex-1 py-2.5 text-xs font-bold uppercase tracking-wide rounded-lg transition-all ${
               activeTab === 'topical' 
               ? 'bg-white text-blue-900 shadow-sm' 
               : 'text-slate-500 hover:text-slate-700'
             }`}
           >
             Topical Sets
           </button>
        </div>

        {/* Content List */}
        <div className="space-y-4 animate-fade-in">
           {activeTab === 'past-year' ? (
              // PAST YEAR EXAMS LIST
              PAST_EXAMS.map((paper) => (
                <div 
                  key={paper.id} 
                  onClick={() => handleOpenPaper(paper)}
                  className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:border-blue-300 hover:shadow-md transition-all cursor-pointer group active:scale-[0.99]"
                >
                   <div className="flex justify-between items-start">
                      <div className="flex items-start gap-4">
                         <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center shrink-0 border border-blue-100 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                            <CalendarDays className="w-6 h-6" />
                         </div>
                         <div>
                            <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-500 mb-2">
                               {paper.year} • {paper.semester}
                            </span>
                            <h3 className="font-bold text-slate-900 leading-tight mb-1">
                               {paper.title}
                            </h3>
                            <p className="text-xs text-slate-500 font-medium">Official Exam Paper</p>
                         </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-blue-500 transition-colors" />
                   </div>
                </div>
              ))
           ) : (
              // TOPICAL QUESTIONS LIST
              QUESTION_BANKS.map((item) => (
                 <div 
                  key={item.id} 
                  onClick={() => handleOpenPaper(item)}
                  className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:border-amber-300 hover:shadow-md transition-all cursor-pointer group active:scale-[0.99]"
                >
                   <div className="flex justify-between items-start">
                      <div className="flex items-start gap-4">
                         <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border transition-colors ${
                           item.category === 'Answer Key' 
                             ? 'bg-emerald-50 text-emerald-600 border-emerald-100 group-hover:bg-emerald-600 group-hover:text-white' 
                             : 'bg-amber-50 text-amber-600 border-amber-100 group-hover:bg-amber-600 group-hover:text-white'
                         }`}>
                            {item.category === 'Answer Key' ? <CheckCircle2 className="w-6 h-6" /> : <HelpCircle className="w-6 h-6" />}
                         </div>
                         <div>
                            <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider mb-2 ${
                               item.category === 'Answer Key' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                            }`}>
                               {item.category}
                            </span>
                            <h3 className="font-bold text-slate-900 leading-tight mb-1">
                               {item.title}
                            </h3>
                            <p className="text-xs text-slate-500 font-medium">Revision Material</p>
                         </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-amber-500 transition-colors" />
                   </div>
                </div>
              ))
           )}
        </div>

      </div>
    </div>
  );
};

export default Practice;
