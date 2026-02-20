
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ScreenHeader } from '../components/Shared';
import { MORE_LINKS } from '../constants';
import { ResourceItem } from '../types';
import { Building2, GraduationCap, Search, Info, ArrowLeft, Download, X, Smartphone, Sparkles, ChevronRight, LayoutGrid, Zap, Scale, List } from 'lucide-react';
import AIChat from './AIChat';
import EJudgement from './EJudgement';
import Features from './Features';

interface MoreProps {
  onOpenResource: (res: ResourceItem) => void;
}

// --- INSTALL MODAL (Standardized Typography) ---
const InstallModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<'ios' | 'android'>('ios');
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
    if (/android/i.test(userAgent)) setActiveTab('android');

    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') setDeferredPrompt(null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" onClick={onClose} />
      
      <div className="relative bg-white w-full max-w-md rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl animate-slide-up max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-serif font-bold text-2xl text-primary">Install App</h2>
          <button onClick={onClose} className="p-2 bg-slate-50 rounded-full text-secondary hover:text-primary transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex p-1 bg-slate-100 rounded-xl mb-6">
          {(['ios', 'android'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2.5 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${
                activeTab === tab ? 'bg-white text-primary shadow-sm ring-1 ring-black/5' : 'text-slate-400'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === 'ios' && (
          <div className="space-y-4">
             <div className="border border-slate-100 rounded-2xl p-5 bg-slate-50/50">
                <ol className="list-decimal list-inside space-y-3 text-sm text-secondary font-medium">
                  <li>Tap the <span className="font-bold text-blue-600">Share</span> button in Safari.</li>
                  <li>Scroll down and select <span className="font-bold text-primary">Add to Home Screen</span>.</li>
                  <li>Confirm by tapping <span className="font-bold text-primary">Add</span>.</li>
                </ol>
             </div>
             <div className="rounded-2xl overflow-hidden border border-slate-100 shadow-sm">
                <img src="https://images.macrumors.com/article-new/2025/08/ios-add-to-home-screen2.jpg" alt="Guide" className="w-full h-auto" />
             </div>
          </div>
        )}

        {activeTab === 'android' && (
          <div className="space-y-4">
             {deferredPrompt ? (
                <button 
                  onClick={handleInstallClick}
                  className="w-full py-4 bg-primary text-white rounded-2xl font-bold flex items-center justify-center gap-2 active:scale-[0.98] transition-transform shadow-lg shadow-blue-900/20"
                >
                  <Download className="w-5 h-5" />
                  Install Now
                </button>
             ) : (
               <div className="border border-slate-100 rounded-2xl p-5 bg-slate-50/50">
                  <p className="text-sm text-secondary mb-3 font-medium">If the install button doesn't appear:</p>
                  <ol className="list-decimal list-inside space-y-2 text-sm text-primary font-medium">
                    <li>Tap the browser menu (Three Dots).</li>
                    <li>Select <span className="font-bold">Install App</span> or <span className="font-bold">Add to Home Screen</span>.</li>
                  </ol>
               </div>
             )}
          </div>
        )}
      </div>
    </div>
  );
};

// --- ABOUT PAGE (Standardized) ---
export const AboutPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-white min-h-screen pb-safe">
      <div className="sticky top-0 z-20 bg-white/90 backdrop-blur-md px-6 py-4 border-b border-slate-100 flex items-center">
        <button onClick={() => navigate('/more')} className="flex items-center text-secondary hover:text-primary transition-colors">
          <ArrowLeft className="w-5 h-5 mr-2" />
          <span className="font-bold text-sm uppercase tracking-wide">Back</span>
        </button>
      </div>
      
      <div className="max-w-xl mx-auto px-6 py-12">
        <div className="mb-12">
          <h1 className="font-serif text-5xl text-primary mb-2">MyLegS</h1>
          <div className="h-1 w-12 bg-accent mb-4"></div>
          <p className="text-secondary font-medium">Malaysian Legal System Companion</p>
        </div>

        <div className="space-y-8">
          <section>
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">The Mission</h3>
            <p className="text-lg leading-relaxed text-slate-800">
              To empower students with a centralized, curated companion for navigating the complexities of the Malaysian Legal System. 
            </p>
          </section>

          <section>
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Curriculum</h3>
            <p className="text-slate-600 leading-relaxed text-sm">
              Covering the hierarchy of courts, legislative processes, separation of powers, and key statutes. 
              Designed specifically for the foundational law course at Universiti Sultan Zainal Abidin.
            </p>
          </section>
        </div>

        <div className="mt-16 pt-8 border-t border-slate-100 flex flex-col items-center text-center">
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/d/d1/Logo_UniSZA.png" 
            alt="UniSZA" 
            className="h-12 w-auto grayscale opacity-50 mb-4 hover:grayscale-0 hover:opacity-100 transition-all"
          />
          <p className="text-[10px] font-bold text-primary uppercase tracking-widest">Faculty of Law & International Relations</p>
          <p className="text-[10px] text-slate-400 mt-1">Universiti Sultan Zainal Abidin</p>
          <p className="text-[10px] text-slate-300 mt-6">v1.0.0</p>
        </div>
      </div>
    </div>
  );
};

// --- MORE HOME (Refined Bento Grid) ---
const MoreHome: React.FC<MoreProps> = ({ onOpenResource }) => {
  const navigate = useNavigate();
  const [showInstall, setShowInstall] = useState(false);

  const uniszaLink = MORE_LINKS.find(l => l.category === 'UniSZA');
  const judiciaryLink = MORE_LINKS.find(l => l.category === 'Judiciary');
  const researchLink = MORE_LINKS.find(l => l.category === 'Research');

  return (
    <>
      {showInstall && <InstallModal onClose={() => setShowInstall(false)} />}
      <div className="pb-32 min-h-screen bg-background">
        
        {/* HERO HEADER FOR TOOLS PAGE */}
        <div className="relative bg-slate-900 pt-[calc(3rem+env(safe-area-inset-top))] pb-12 px-6 overflow-hidden rounded-b-3xl shadow-lg shadow-slate-900/20">
           <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
           <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500/10 rounded-full blur-2xl -ml-12 -mb-12 pointer-events-none"></div>
           
           <div className="absolute top-1/2 right-8 opacity-10 pointer-events-none transform -translate-y-1/2 rotate-6">
             <LayoutGrid className="w-32 h-32 text-white" />
           </div>

           <div className="relative z-10">
              <h1 className="font-serif font-bold text-4xl text-white mb-2">Tools &<br/>Resources</h1>
              <p className="text-slate-400 font-medium text-sm">Everything else you need.</p>
           </div>
        </div>
        
        <div className="px-5 -mt-8 relative z-20 space-y-5">
          
          {/* 1. PRIMARY: UNISZA */}
          {uniszaLink && (
          <div 
            onClick={() => onOpenResource({
                id: uniszaLink.id,
                title: uniszaLink.title,
                url: uniszaLink.url,
                type: 'webview',
                previewText: "Access UniSZA e-Learning Portal"
            })}
            className="group bg-[#1E3A8A] rounded-2xl p-6 relative overflow-hidden cursor-pointer shadow-soft hover:shadow-xl hover:scale-[1.01] transition-all duration-300"
          >
            <div className="relative z-10 flex justify-between items-start">
              <div>
                <div className="inline-block px-2 py-1 bg-white/10 rounded text-[10px] font-bold text-amber-400 uppercase tracking-wide mb-3 border border-white/5">
                  Student Portal
                </div>
                <h3 className="font-serif text-2xl text-white mb-1">UniSZA e-Learning</h3>
                <p className="text-blue-200 text-xs font-medium">Direct access to course modules.</p>
              </div>
              <div className="bg-white/10 p-3 rounded-xl text-white group-hover:bg-white group-hover:text-blue-900 transition-colors">
                <GraduationCap className="w-6 h-6" />
              </div>
            </div>
          </div>
          )}

          {/* 2. AI ASSISTANT CARD */}
          <div 
            onClick={() => navigate('/more/ai')}
            className="bg-white border border-slate-200 rounded-2xl p-5 flex items-center justify-between cursor-pointer hover:border-blue-400 hover:shadow-md transition-all group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/30 group-hover:scale-105 transition-transform">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-primary text-sm">AI Tutor</h3>
                <p className="text-xs text-secondary mt-0.5">Ask questions about Malaysian Law</p>
              </div>
            </div>
            <div className="w-8 h-8 rounded-full border border-slate-100 flex items-center justify-center text-slate-300 group-hover:text-blue-600 group-hover:border-blue-100 transition-all">
                <Zap className="w-4 h-4 fill-current" />
            </div>
          </div>

          {/* 3. TOOLS GRID */}
          <div className="grid grid-cols-2 gap-4">
              {judiciaryLink && (
                <div 
                  onClick={() => onOpenResource({
                    id: judiciaryLink.id, title: judiciaryLink.title, url: judiciaryLink.url, type: 'webview', previewText: "Virtual Court Tour"
                  })}
                  className="bg-white border border-slate-200 rounded-2xl p-5 cursor-pointer hover:border-slate-300 transition-all group flex flex-col justify-between h-36"
                >
                    <div className="w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center text-slate-500 group-hover:text-primary transition-colors">
                        <Building2 className="w-5 h-5" />
                    </div>
                    <div>
                        <h4 className="font-bold text-primary text-sm mb-1">Judiciary</h4>
                        <p className="text-[10px] text-secondary font-bold uppercase tracking-wider">Virtual Tour</p>
                    </div>
                </div>
              )}
              {researchLink && (
                <div 
                  onClick={() => onOpenResource({
                    id: researchLink.id, title: researchLink.title, url: researchLink.url, type: 'webview', previewText: "Academic Research"
                  })}
                  className="bg-white border border-slate-200 rounded-2xl p-5 cursor-pointer hover:border-slate-300 transition-all group flex flex-col justify-between h-36"
                >
                    <div className="w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center text-slate-500 group-hover:text-primary transition-colors">
                        <Search className="w-5 h-5" />
                    </div>
                    <div>
                        <h4 className="font-bold text-primary text-sm mb-1">Scholar</h4>
                        <p className="text-[10px] text-secondary font-bold uppercase tracking-wider">Research</p>
                    </div>
                </div>
              )}
          </div>

          {/* 4. SETTINGS LIST */}
          <div className="bg-white border border-slate-200 rounded-2xl divide-y divide-slate-100">
              <div 
                onClick={() => navigate('/more/about')}
                className="flex items-center justify-between p-4 cursor-pointer hover:bg-slate-50 transition-colors first:rounded-t-2xl"
              >
                <div className="flex items-center gap-3">
                  <Info className="w-5 h-5 text-slate-400" />
                  <span className="text-sm font-medium text-primary">About MyLegS</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-300" />
              </div>

              {/* eJudgement LINK */}
              <div 
                onClick={() => navigate('/more/ejudgement')}
                className="flex items-center justify-between p-4 cursor-pointer hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Scale className="w-5 h-5 text-slate-400" />
                  <span className="text-sm font-medium text-primary">eJudgement</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-300" />
              </div>

              {/* FEATURES LIST LINK */}
              <div 
                onClick={() => navigate('/more/features')}
                className="flex items-center justify-between p-4 cursor-pointer hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <List className="w-5 h-5 text-slate-400" />
                  <span className="text-sm font-medium text-primary">App Features</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-300" />
              </div>

              <div 
                onClick={() => setShowInstall(true)}
                className="flex items-center justify-between p-4 cursor-pointer hover:bg-slate-50 transition-colors last:rounded-b-2xl"
              >
                <div className="flex items-center gap-3">
                  <Smartphone className="w-5 h-5 text-slate-400" />
                  <span className="text-sm font-medium text-primary">Install App</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-300" />
              </div>
          </div>

        </div>
      </div>
    </>
  );
};

const More: React.FC<MoreProps> = (props) => {
  const location = useLocation();
  if (location.pathname === '/more/about') return <AboutPage />;
  if (location.pathname === '/more/ai') return <AIChat />;
  if (location.pathname === '/more/ejudgement') return <EJudgement />;
  if (location.pathname === '/more/features') return <Features />;
  return <MoreHome {...props} />;
};

export default More;
