
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useProgress } from '../context/ProgressContext';
import { useData } from '../context/DataContext';
import { MORE_LINKS } from '../constants';
import { ResourceItem } from '../types';
import { 
  Trophy, Building2, BookOpen, Scale, Lock, Compass, ScrollText, Landmark, 
  Gavel, Briefcase, Handshake, FileSignature, Globe, Book, CheckCircle2, 
  Crown, LayoutDashboard, FileQuestion
} from 'lucide-react';

interface LearnProps {
  onOpenResource: (res: ResourceItem) => void;
}

// --- UPGRADE MODAL ---
const UpgradeModal: React.FC<{ onClose: () => void; feature: string }> = ({ onClose, feature }) => {
  const navigate = useNavigate();
  const { upgradeToPremium } = useAuth();
  
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" onClick={onClose} />
      <div className="relative bg-white w-full max-w-sm rounded-3xl p-6 shadow-2xl animate-slide-up overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-br from-indigo-500 to-blue-600 opacity-10"></div>
        <div className="relative z-10 flex flex-col items-center text-center">
          <div 
            onClick={() => { upgradeToPremium(); onClose(); }}
            className="w-16 h-16 bg-gradient-to-tr from-indigo-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/30 mb-5 cursor-pointer active:scale-90 hover:scale-105 transition-transform"
            title="Tap to Unlock"
          >
              <Crown className="w-8 h-8 text-white" />
          </div>
          <h2 className="font-serif font-bold text-2xl text-primary mb-2">Unlock {feature}</h2>
          <p className="text-secondary text-sm mb-6 max-w-[240px]">
            Your current plan does not include access to this module.
          </p>
          <button 
            onClick={() => navigate('/upgrade')} 
            className="w-full py-3.5 bg-primary text-white rounded-xl font-bold text-sm shadow-xl shadow-blue-900/20 active:scale-[0.98] transition-transform flex items-center justify-center gap-2"
          >
            <Crown className="w-4 h-4 text-amber-400" />
            <span>View Upgrade Options</span>
          </button>
          <button onClick={onClose} className="mt-4 text-xs font-bold text-slate-400 uppercase tracking-wider hover:text-slate-600">
            Maybe Later
          </button>
        </div>
      </div>
    </div>
  );
};

const Learn: React.FC<LearnProps> = ({ onOpenResource }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { isTopicCompleted } = useProgress();
  const { topics, settings, getTierById } = useData();
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [upgradeFeature, setUpgradeFeature] = useState('Premium Features');

  const userTier = user ? getTierById(user.tierId) : null;

  const handleOpenJudiciary = () => {
    const judiciaryLink = MORE_LINKS.find(l => l.category === 'Judiciary');
    if (judiciaryLink) {
      onOpenResource({
        id: judiciaryLink.id,
        title: judiciaryLink.title,
        url: judiciaryLink.url,
        type: 'webview',
        previewText: "Explore the Malaysian Judiciary Virtual Tour."
      });
    }
  };

  const handleTopicClick = (topicId: string, index: number) => {
    // Dynamic Tier Logic
    const limit = userTier?.moduleLimit ?? 3;
    const isLocked = limit !== -1 && index >= limit;

    if (isLocked) {
      setUpgradeFeature(`Module ${index + 1}`);
      setShowUpgrade(true);
      return;
    }
    navigate(`/topic/${topicId}`);
  };

  const getTopicIcon = (index: number) => {
    const i = index % 10;
    switch (i) {
      case 0: return <Compass className="w-6 h-6" />;
      case 1: return <BookOpen className="w-6 h-6" />;
      case 2: return <ScrollText className="w-6 h-6" />;
      case 3: return <Landmark className="w-6 h-6" />;
      case 4: return <Gavel className="w-6 h-6" />;
      case 5: return <Scale className="w-6 h-6" />;
      case 6: return <Briefcase className="w-6 h-6" />;
      case 7: return <Handshake className="w-6 h-6" />;
      case 8: return <FileSignature className="w-6 h-6" />;
      case 9: return <Globe className="w-6 h-6" />;
      default: return <Book className="w-6 h-6" />;
    }
  };

  return (
    <>
    {showUpgrade && (
      <UpgradeModal onClose={() => setShowUpgrade(false)} feature={upgradeFeature} />
    )}
    
    <div className="pb-32 bg-background min-h-screen">
      {/* HERO HEADER */}
      <div className="relative bg-[#1E3A8A] pt-[calc(3rem+env(safe-area-inset-top))] pb-16 px-6 overflow-hidden rounded-b-[2.5rem] shadow-lg shadow-blue-900/20">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent/10 rounded-full blur-2xl -ml-12 -mb-12 pointer-events-none"></div>
        <div className="relative z-10">
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full border border-white/10 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse"></span>
            <span className="text-[10px] font-bold tracking-widest text-blue-100 uppercase">Course Companion</span>
          </div>
          <h1 className="font-serif font-bold text-5xl text-white leading-none tracking-tight mb-3">
            {settings.appName}
          </h1>
          <p className="text-blue-100/80 font-medium text-sm max-w-[240px] leading-relaxed">
            The essential guide to the <span className="text-white font-bold border-b border-white/20">Malaysian Legal System</span>.
          </p>
        </div>
      </div>

      {/* QUICK ACTIONS */}
      <div className="px-6 -mt-8 relative z-20 grid grid-cols-2 gap-4">
        <button onClick={() => navigate('/practice')} className="bg-surface p-4 rounded-xl shadow-lg border border-slate-100 flex items-center gap-3 hover:border-amber-200 transition-colors group">
          <div className="w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center text-amber-600 group-hover:scale-110 transition-transform">
            <FileQuestion className="w-5 h-5" />
          </div>
          <div className="text-left">
             <span className="block text-[10px] font-bold text-secondary uppercase tracking-wider">Practice</span>
             <span className="block font-bold text-primary text-xs">Question Bank</span>
          </div>
        </button>
        <button onClick={handleOpenJudiciary} className="bg-surface p-4 rounded-xl shadow-lg border border-slate-100 flex items-center gap-3 hover:border-blue-200 transition-colors group">
          <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
            <Building2 className="w-5 h-5" />
          </div>
          <div className="text-left">
             <span className="block text-[10px] font-bold text-secondary uppercase tracking-wider">Explore</span>
             <span className="block font-bold text-primary text-xs">Virtual Court</span>
          </div>
        </button>
      </div>

      {/* CURRICULUM LIST */}
      <div className="px-6 pt-8">
        <div className="flex items-end justify-between mb-5 px-1">
          <h2 className="font-serif font-bold text-xl text-primary">Curriculum</h2>
          <span className="text-[10px] font-bold text-secondary bg-slate-100 px-2 py-1 rounded-full">{topics.length} Modules</span>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {topics.map((topic, index) => {
            const limit = userTier?.moduleLimit ?? 3;
            const isLocked = limit !== -1 && index >= limit;
            const isCompleted = isTopicCompleted(topic.id);

            return (
              <div 
                key={topic.id}
                onClick={() => handleTopicClick(topic.id, index)}
                className={`
                  relative group flex flex-col items-center text-center bg-surface border rounded-2xl p-3 
                  transition-all duration-300 active:scale-[0.96] cursor-pointer h-32
                  ${isLocked 
                    ? 'border-slate-100 grayscale opacity-80' 
                    : isCompleted ? 'border-emerald-200 bg-emerald-50/30' : 'border-slate-100 hover:border-brand/30 hover:shadow-soft'
                  }
                `}
              >
                {isCompleted && !isLocked && (
                  <div className="absolute top-2 right-2 text-emerald-500 z-10 bg-white rounded-full">
                     <CheckCircle2 className="w-4 h-4 fill-emerald-100" />
                  </div>
                )}

                <div className={`
                  w-10 h-10 rounded-xl flex items-center justify-center mb-2 transition-colors duration-300 relative shrink-0
                  ${isLocked 
                    ? 'bg-slate-100 text-slate-400' 
                    : isCompleted 
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-blue-50 text-brand group-hover:bg-brand group-hover:text-white'
                  }
                `}>
                   {getTopicIcon(index)}
                   {isLocked && (
                      <div className="absolute -top-1 -right-1 bg-slate-500 text-white rounded-full p-1 border-2 border-white shadow-sm">
                        <Lock className="w-3 h-3" />
                      </div>
                   )}
                </div>

                <div className="flex-1 flex items-center justify-center w-full px-1">
                  <h3 className={`text-[10px] font-bold leading-3 line-clamp-2 ${isLocked ? 'text-slate-400' : 'text-primary'}`}>
                    {topic.title}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center opacity-60 pb-6 flex flex-col items-center gap-4">
           <div className="flex flex-col items-center opacity-60">
             <BookOpen className="w-5 h-5 text-slate-900 mb-2" />
             <p className="text-[10px] font-bold tracking-widest text-slate-900 uppercase">{settings.organization}</p>
           </div>
           {user?.role === 'admin' && (
             <button onClick={() => navigate('/admin')} className="flex items-center gap-2 px-4 py-2 bg-slate-200 rounded-full text-xs font-bold text-slate-600 hover:bg-slate-300 transition-colors">
               <LayoutDashboard className="w-3.5 h-3.5" />
               Admin Panel
             </button>
           )}
        </div>
      </div>
    </div>
    </>
  );
};

export default Learn;
