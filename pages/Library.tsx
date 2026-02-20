import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ScreenHeader, SearchInput } from '../components/Shared';
import { 
  ArrowRight, 
  Book, 
  Scale, 
  Gavel, 
  ExternalLink, 
  ScrollText, 
  Star, 
  FolderPlus, 
  Trash2, 
  Crown,
  Lock,
  X
} from 'lucide-react';
import { STATUTES, CASE_LAW_PROVIDERS } from '../constants';
import { ResourceItem } from '../types';
import { useBinder, BookmarkItem } from '../context/BinderContext';

interface LibraryProps {
  onOpenResource: (res: ResourceItem) => void;
}

// --- UPGRADE MODAL COMPONENT ---
const BinderUpgradeModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" onClick={onClose} />
      <div className="relative bg-white w-full max-w-sm rounded-3xl p-6 shadow-2xl animate-slide-up overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-br from-amber-400 to-amber-600 opacity-10"></div>
        <div className="absolute top-[-20px] right-[-20px] w-24 h-24 bg-amber-400 rounded-full blur-2xl opacity-20"></div>

        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-gradient-to-tr from-amber-400 to-amber-500 rounded-full flex items-center justify-center shadow-lg shadow-amber-500/30 mb-5">
              <Lock className="w-8 h-8 text-white" />
          </div>
          
          <h2 className="font-serif font-bold text-2xl text-primary mb-2">Limit Reached</h2>
          <p className="text-secondary text-sm mb-6 max-w-[240px]">
            Free accounts can only save 3 items. Organize your entire legal library with Premium.
          </p>

          <div className="w-full bg-slate-50 border border-slate-100 rounded-xl p-4 mb-6">
              <ul className="text-left space-y-3">
                <li className="flex items-center text-xs font-bold text-primary">
                  <CheckIcon /> <span className="ml-2">Unlimited Bookmarks</span>
                </li>
                <li className="flex items-center text-xs font-bold text-primary">
                  <CheckIcon /> <span className="ml-2">Custom Folders (Assignments, Exam)</span>
                </li>
                <li className="flex items-center text-xs font-bold text-primary">
                  <CheckIcon /> <span className="ml-2">Sync across devices</span>
                </li>
              </ul>
          </div>

          <button 
            onClick={() => navigate('/upgrade')} 
            className="w-full py-3.5 bg-primary text-white rounded-xl font-bold text-sm shadow-xl shadow-blue-900/20 active:scale-[0.98] transition-transform flex items-center justify-center gap-2"
          >
            <Crown className="w-4 h-4 text-amber-400" />
            <span>Upgrade Now</span>
          </button>
          
          <button onClick={onClose} className="mt-4 text-xs font-bold text-slate-400 uppercase tracking-wider hover:text-slate-600">
            Maybe Later
          </button>
        </div>
      </div>
    </div>
  );
};

const CheckIcon = () => (
  <div className="w-4 h-4 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
    <CheckIconSvg />
  </div>
);
const CheckIconSvg = () => (
   <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 4L3.5 6.5L9 1" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
   </svg>
);

// --- 1. SMART BINDER VIEW ---
const SmartBinder: React.FC<{ onOpenResource: (res: ResourceItem) => void }> = ({ onOpenResource }) => {
  const navigate = useNavigate();
  const { bookmarks, folders, createFolder, toggleBookmark, deleteFolder } = useBinder();

  const handleCreateFolder = () => {
    // Simple prompt for now - could be a modal
    const name = prompt("Enter folder name (e.g., 'Constitutional Law'):");
    if (name) createFolder(name);
  };

  return (
    <div className="pb-32 bg-background min-h-screen">
      <ScreenHeader 
        title="My Binder" 
        subtitle="Saved Resources" 
        onBack={() => navigate('/library')} 
        big
      />

      <div className="px-6 mt-6">
        {/* Folders Section */}
        <div className="flex items-center justify-between mb-4">
           <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">Folders</h3>
           <button 
            onClick={handleCreateFolder}
            className="text-brand text-xs font-bold flex items-center hover:bg-blue-50 px-2 py-1 rounded transition-colors"
           >
             <FolderPlus className="w-3.5 h-3.5 mr-1" /> New
           </button>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-8">
           {/* Static 'All Items' Folder */}
           <div className="bg-brand text-white p-4 rounded-xl shadow-lg shadow-blue-900/20 flex flex-col justify-between h-28 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Star className="w-16 h-16" fill="currentColor" />
              </div>
              <Star className="w-5 h-5 fill-white" />
              <div>
                <span className="text-2xl font-serif font-bold">{bookmarks.length}</span>
                <p className="text-[10px] uppercase tracking-wider font-bold opacity-80">Saved Items</p>
              </div>
           </div>

           {/* User Folders */}
           {folders.map(folder => (
              <div key={folder.id} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between h-28 relative group">
                  <div className="flex justify-between items-start">
                    <FolderPlus className="w-5 h-5 text-amber-500" />
                    <button 
                      onClick={() => deleteFolder(folder.id)}
                      className="text-slate-300 hover:text-red-400 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div>
                    <span className="font-bold text-primary text-sm line-clamp-1">{folder.name}</span>
                    <p className="text-[10px] text-secondary font-bold uppercase tracking-wider mt-0.5">{folder.items.length} items</p>
                  </div>
              </div>
           ))}
        </div>

        {/* Saved Items List */}
        <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Recent Saves</h3>
        
        {bookmarks.length === 0 ? (
          <div className="text-center py-10 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50/50">
             <Star className="w-8 h-8 text-slate-300 mx-auto mb-3" />
             <p className="text-sm font-bold text-slate-500">Your binder is empty</p>
             <p className="text-xs text-slate-400 mt-1">Star items in the library to save them here.</p>
          </div>
        ) : (
          <div className="space-y-3">
             {bookmarks.map(item => (
                <div 
                  key={item.id}
                  onClick={() => onOpenResource({
                    id: item.id, title: item.title, url: item.url, type: 'webview', previewText: "View Saved Item"
                  })}
                  className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center justify-between group active:scale-[0.99] transition-transform cursor-pointer"
                >
                   <div className="flex items-center gap-3 overflow-hidden">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                        item.type === 'statute' ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-blue-600'
                      }`}>
                         {item.type === 'statute' ? <ScrollText className="w-5 h-5" /> : <Gavel className="w-5 h-5" />}
                      </div>
                      <div className="truncate">
                         <h4 className="font-bold text-primary text-sm truncate">{item.title}</h4>
                         <p className="text-[10px] text-secondary truncate">{new Date(item.dateAdded).toLocaleDateString()}</p>
                      </div>
                   </div>
                   <button 
                      onClick={(e) => { e.stopPropagation(); toggleBookmark(item); }}
                      className="p-2 text-amber-400 hover:text-slate-300 transition-colors"
                   >
                     <Star className="w-5 h-5 fill-current" />
                   </button>
                </div>
             ))}
          </div>
        )}

      </div>
    </div>
  );
};

// --- 2. LIBRARY HOME DASHBOARD ---
const LibraryHome: React.FC = () => {
  const navigate = useNavigate();
  const { bookmarks } = useBinder();
  
  return (
    <div className="pb-32 min-h-screen bg-background">
      <ScreenHeader title="Library" subtitle="Statutes & Case Law" big />
      
      <div className="px-6 mt-6 grid gap-5">
        
        {/* SMART BINDER CARD (NEW) */}
        <div 
          onClick={() => navigate('/library/binder')}
          className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-5 border border-amber-100/50 shadow-sm cursor-pointer flex items-center justify-between group active:scale-[0.99] transition-transform"
        >
           <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-amber-500">
                 <Star className="w-6 h-6 fill-amber-500" />
              </div>
              <div>
                 <h3 className="font-serif font-bold text-lg text-amber-900">My Smart Binder</h3>
                 <p className="text-amber-700/80 text-xs font-bold uppercase tracking-wide">
                   {bookmarks.length} Saved Items
                 </p>
              </div>
           </div>
           <div className="w-8 h-8 rounded-full bg-white/50 flex items-center justify-center text-amber-600 group-hover:bg-white transition-colors">
              <ArrowRight className="w-4 h-4" />
           </div>
        </div>

        {/* STATUTES CARD */}
        <div 
          onClick={() => navigate('/library/statutes')}
          className="group bg-surface rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-xl hover:border-brand/20 hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col justify-between h-40 overflow-hidden relative"
        >
          <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity transform rotate-12 pointer-events-none">
             <ScrollText className="w-32 h-32" />
          </div>

          <div className="relative z-10 flex justify-between items-start">
             <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-brand border border-blue-100 group-hover:bg-brand group-hover:text-white transition-all duration-300">
               <Book className="w-6 h-6" />
             </div>
             <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-blue-50 group-hover:text-brand transition-colors">
                <ArrowRight className="w-4 h-4" />
             </div>
          </div>
          
          <div className="relative z-10 mt-auto">
            <h2 className="font-serif font-bold text-2xl text-primary mb-1">Statutes</h2>
            <p className="text-secondary text-sm font-medium">Federal Constitution & Acts</p>
          </div>
        </div>

        {/* CASE LAW CARD */}
        <div 
          onClick={() => navigate('/library/caselaw')}
          className="group bg-primary rounded-2xl p-6 shadow-lg shadow-slate-900/10 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col justify-between h-40 overflow-hidden relative"
        >
           <div className="absolute top-0 right-0 p-8 opacity-[0.05] group-hover:opacity-[0.1] transition-opacity transform -rotate-6 pointer-events-none">
             <Scale className="w-32 h-32 text-white" />
          </div>

          <div className="relative z-10 flex justify-between items-start">
             <div className="w-12 h-12 bg-slate-800 rounded-2xl flex items-center justify-center text-white border border-slate-700 group-hover:bg-white group-hover:text-primary transition-all duration-300">
               <Gavel className="w-6 h-6" />
             </div>
             <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-slate-400 group-hover:bg-white group-hover:text-primary transition-colors">
                <ArrowRight className="w-4 h-4" />
             </div>
          </div>
          
          <div className="relative z-10 mt-auto">
            <h2 className="font-serif font-bold text-2xl text-white mb-1">Case Law</h2>
            <p className="text-slate-400 text-sm font-medium">Judgments & Databases</p>
          </div>
        </div>

      </div>
    </div>
  );
};

// --- 3. STATUTES LIST (With Bookmarks) ---
export const StatutesList: React.FC<{ onOpenResource: (res: ResourceItem) => void }> = ({ onOpenResource }) => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const { toggleBookmark, isBookmarked } = useBinder();
  
  const filtered = STATUTES.filter(s => s.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="pb-32 bg-background min-h-screen">
      <ScreenHeader 
        title="Statutes" 
        subtitle="Acts of Parliament"
        onBack={() => navigate('/library')}
        big
      />

      <div className="px-6 mt-6">
        <SearchInput placeholder="Filter statutes..." value={search} onChange={setSearch} />
        
        <div className="mt-4 space-y-2">
          {filtered.map((s, i) => {
            const saved = isBookmarked(s.id);
            return (
              <div 
                key={s.id} 
                onClick={() => onOpenResource({
                  id: s.id, title: s.title, url: s.url, type: 'webview', previewText: "Read Statute"
                })}
                className="group p-4 bg-surface rounded-2xl border border-slate-100 cursor-pointer hover:border-brand/30 transition-all flex items-center justify-between shadow-sm hover:shadow-soft active:scale-[0.99]"
              >
                <div className="flex items-center gap-4 flex-1 pr-2">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-xs font-bold text-slate-400 font-mono border border-slate-100 group-hover:bg-brand group-hover:text-white transition-colors shrink-0">
                    {(i + 1).toString().padStart(2, '0')}
                  </div>
                  <div>
                    <h3 className="font-bold text-primary text-sm leading-snug line-clamp-2">{s.title}</h3>
                    <span className="text-[10px] text-secondary font-medium mt-0.5 block group-hover:text-brand transition-colors">View Document</span>
                  </div>
                </div>
                
                {/* Bookmark Action */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleBookmark({ id: s.id, title: s.title, type: 'statute', url: s.url });
                  }}
                  className={`p-2 rounded-full transition-all active:scale-90 shrink-0 ${saved ? 'text-amber-400 bg-amber-50' : 'text-slate-300 hover:text-amber-400 hover:bg-amber-50'}`}
                >
                  <Star className={`w-5 h-5 ${saved ? 'fill-current' : ''}`} />
                </button>
              </div>
            );
          })}
          
          {filtered.length === 0 && (
            <div className="py-12 text-center text-secondary text-sm">No acts found.</div>
          )}
        </div>
      </div>
    </div>
  );
};

// --- 4. CASE LAW LIST (With Bookmarks) ---
export const CaseLawList: React.FC<{ onOpenResource: (res: ResourceItem) => void }> = ({ onOpenResource }) => {
  const navigate = useNavigate();
  const [imgError, setImgError] = useState<Record<string, boolean>>({});
  const { toggleBookmark, isBookmarked } = useBinder();

  return (
    <div className="pb-32 bg-background min-h-screen">
      <ScreenHeader 
        title="Case Law" 
        subtitle="External Databases"
        onBack={() => navigate('/library')}
        big
      />

      <div className="px-6 mt-6 grid grid-cols-2 gap-4">
        {CASE_LAW_PROVIDERS.map(p => {
          const saved = isBookmarked(p.id);
          return (
            <div 
              key={p.id}
              onClick={() => onOpenResource({
                id: p.id, title: p.name, url: p.url, type: 'webview', previewText: "Open Database"
              })}
              className="group bg-surface p-5 rounded-2xl border border-slate-200 shadow-sm hover:border-brand/30 hover:shadow-md transition-all cursor-pointer flex flex-col items-center text-center h-44 justify-between active:scale-[0.98] relative"
            >
                {/* Bookmark Top Right */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleBookmark({ id: p.id, title: p.name, type: 'caselaw', url: p.url });
                  }}
                  className={`absolute top-2 right-2 p-2 rounded-full transition-all ${saved ? 'text-amber-400' : 'text-slate-200 hover:text-amber-400'}`}
                >
                   <Star className={`w-4 h-4 ${saved ? 'fill-current' : ''}`} />
                </button>

                <div className="w-12 h-12 mt-2 rounded-xl bg-slate-50 flex items-center justify-center overflow-hidden border border-slate-100 group-hover:border-blue-100 transition-colors">
                  {p.logo && !imgError[p.id] ? (
                    <img src={p.logo} alt={p.name} className="w-8 h-8 object-contain opacity-80 group-hover:opacity-100" onError={() => setImgError(prev => ({ ...prev, [p.id]: true }))} />
                  ) : (
                    <Gavel className="w-6 h-6 text-slate-400" />
                  )}
                </div>
                
                <div className="w-full">
                  <h3 className="font-bold text-primary text-sm leading-tight mb-1.5">{p.name}</h3>
                  <div className="flex items-center justify-center gap-1.5 px-2 py-0.5 bg-slate-50 rounded-full text-[10px] text-secondary font-bold uppercase tracking-wider group-hover:bg-blue-50 group-hover:text-brand transition-colors mx-auto w-max">
                    <span>Access</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </div>
                </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const Library: React.FC<LibraryProps> = (props) => {
  const location = useLocation();
  const { showUpgradeModal, setShowUpgradeModal } = useBinder();

  // Render sub-pages
  let content;
  if (location.pathname === '/library/statutes') content = <StatutesList onOpenResource={props.onOpenResource} />;
  else if (location.pathname === '/library/caselaw') content = <CaseLawList onOpenResource={props.onOpenResource} />;
  else if (location.pathname === '/library/binder') content = <SmartBinder onOpenResource={props.onOpenResource} />;
  else content = <LibraryHome />;

  return (
    <>
      {showUpgradeModal && <BinderUpgradeModal onClose={() => setShowUpgradeModal(false)} />}
      {content}
    </>
  );
};

export default Library;