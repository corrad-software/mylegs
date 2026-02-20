
import React from 'react';
import { ArrowRight, Scale, Lock } from 'lucide-react';

export const Landing: React.FC<{ onContinue: () => void; onAdminLogin: () => void }> = ({ onContinue, onAdminLogin }) => {
  return (
    <div className="absolute inset-0 z-10 flex flex-col">
      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col justify-end px-6 pb-[calc(2rem+env(safe-area-inset-bottom))] pt-safe">
        <div className="mb-auto pt-8 opacity-0 animate-fade-in" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
           <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
              <span className="text-[10px] font-bold tracking-widest text-white uppercase">Course Companion</span>
           </div>
        </div>

        <div className="mb-4 animate-slide-up">
          <div className="w-16 h-16 bg-[#1E3A8A] rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-900/50 ring-1 ring-white/20">
             <Scale className="w-8 h-8 text-white" />
          </div>
          <h1 className="font-serif font-bold text-5xl text-white leading-[1.1] mb-5 tracking-tight">
            Master the <br/>
            <span className="text-blue-400">Malaysian</span> <br/>
            Legal System.
          </h1>
          <p className="text-slate-300 text-lg font-medium leading-relaxed max-w-xs mb-10">
            Your essential pocket guide to statutes, case law, and the hierarchy of courts.
          </p>

          <button 
            onClick={onContinue}
            className="w-full bg-white text-slate-900 font-bold text-lg py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-slate-50 transition-colors active:scale-[0.98] shadow-xl shadow-black/20"
          >
            <span>Get Started</span>
            <ArrowRight className="w-5 h-5" />
          </button>
          
          <div className="mt-8 flex flex-col items-center justify-center space-y-4 opacity-50">
            <div className="flex items-center space-x-2">
               <span className="h-px w-8 bg-slate-500"></span>
               <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">Universiti Sultan Zainal Abidin</p>
               <span className="h-px w-8 bg-slate-500"></span>
            </div>

             {/* Admin Button */}
             <button 
               onClick={onAdminLogin}
               className="text-[10px] font-bold text-slate-500 hover:text-white flex items-center gap-1 transition-colors uppercase tracking-wider"
             >
               <Lock className="w-3 h-3" />
               Admin Access
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};
