import React from 'react';
import { Search, ChevronRight, ArrowLeft } from 'lucide-react';

// For internal pages (Drill-down views)
export const ScreenHeader: React.FC<{ 
  title: string; 
  subtitle?: string; 
  rightElement?: React.ReactNode;
  onBack?: () => void;
  big?: boolean;
}> = ({ title, subtitle, rightElement, onBack, big }) => (
  <div className={`
    sticky top-0 z-20 px-6 border-b transition-all duration-300 glass-nav
    ${big 
      ? 'pt-[calc(1rem+env(safe-area-inset-top))] pb-4 border-slate-200/50' 
      : 'pt-[calc(0.75rem+env(safe-area-inset-top))] pb-3 border-slate-200/80'
    }
  `}>
    <div className="flex justify-between items-start relative">
      <div className="flex-1 pr-4">
        {onBack && (
          <button 
            onClick={onBack} 
            className="group inline-flex items-center text-secondary hover:text-primary py-1 pr-4 -ml-1 mb-1 transition-colors active:opacity-70"
            aria-label="Go back"
          >
            <ArrowLeft className="w-4 h-4 mr-1.5 transition-transform group-hover:-translate-x-1" />
            <span className="text-sm font-medium">Back</span>
          </button>
        )}
        <h1 className={`${big ? 'text-2xl' : 'text-xl'} font-serif font-bold text-primary leading-tight tracking-tight`}>
          {title}
        </h1>
        {subtitle && (
          <p className="text-secondary text-xs mt-1 font-medium leading-relaxed truncate">
            {subtitle}
          </p>
        )}
      </div>
      {rightElement && <div className="mt-1">{rightElement}</div>}
    </div>
  </div>
);

export const SectionHeader: React.FC<{ title: string }> = ({ title }) => (
  <div className="flex items-center space-x-3 mb-4 mt-8 px-1">
    <h2 className="text-[10px] font-bold text-accent uppercase tracking-widest whitespace-nowrap">
      {title}
    </h2>
    <div className="h-px bg-slate-200 flex-1 opacity-70"></div>
  </div>
);

export const Card: React.FC<{ 
  children: React.ReactNode; 
  onClick?: () => void; 
  className?: string 
}> = ({ children, onClick, className = '' }) => (
  <div 
    onClick={onClick}
    className={`
      bg-surface rounded-2xl p-5 
      ${onClick ? 'cursor-pointer hover:shadow-soft hover:-translate-y-0.5 active:translate-y-0 active:shadow-none' : ''} 
      border border-slate-100 shadow-sm
      transition-all duration-300 ease-out
      ${className}
    `}
  >
    {children}
  </div>
);

export const SearchInput: React.FC<{
  placeholder: string;
  value: string;
  onChange: (val: string) => void;
}> = ({ placeholder, value, onChange }) => (
  <div className="relative mb-6">
    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
      <Search className="h-4 w-4 text-slate-400" />
    </div>
    <input
      type="text"
      className="block w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-primary placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand/10 focus:border-brand/50 transition-all text-sm font-medium shadow-sm"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);
