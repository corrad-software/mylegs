import React, { useMemo, useState } from 'react';
import { ArrowUpRight, X, FileText, Scroll, Gamepad2, GraduationCap, Link2, Eye } from 'lucide-react';
import { ResourceItem } from '../types';

interface ResourcePreviewProps {
  resource: ResourceItem;
  onOpen: () => void;
  onCancel: () => void;
}

export const ResourcePreview: React.FC<ResourcePreviewProps> = ({ resource, onOpen, onCancel }) => {
  const [loaded, setLoaded] = useState(false);

  // Determine badge type and color based on title/context
  const typeInfo = useMemo(() => {
    const t = resource.title.toLowerCase();
    if (t.includes('note')) return { label: 'Course Notes', color: 'bg-blue-100 text-blue-700', icon: <FileText className="w-3.5 h-3.5 mr-1.5" /> };
    if (t.includes('act') || t.includes('constitution') || t.includes('code')) return { label: 'Statute', color: 'bg-emerald-100 text-emerald-700', icon: <Scroll className="w-3.5 h-3.5 mr-1.5" /> };
    if (t.includes('quiz')) return { label: 'Assessment', color: 'bg-orange-100 text-orange-700', icon: <GraduationCap className="w-3.5 h-3.5 mr-1.5" /> };
    if (t.includes('game')) return { label: 'Interactive', color: 'bg-purple-100 text-purple-700', icon: <Gamepad2 className="w-3.5 h-3.5 mr-1.5" /> };
    if (t.includes('provider') || t.includes('law')) return { label: 'Database', color: 'bg-indigo-100 text-indigo-700', icon: <Link2 className="w-3.5 h-3.5 mr-1.5" /> };
    return { label: 'Web Resource', color: 'bg-stone-100 text-stone-700', icon: <Link2 className="w-3.5 h-3.5 mr-1.5" /> };
  }, [resource.title]);

  const previewUrl = useMemo(() => {
    if (!resource.url) return null;
    let url = resource.url;
    // Helper to ensure Google Drive links are in preview mode for embedding
    if (url.includes('drive.google.com') && url.includes('/view')) {
      url = url.replace('/view', '/preview');
    }
    return url;
  }, [resource.url]);

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center p-0 sm:p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-[#0F172A]/70 backdrop-blur-[2px] animate-fade-in" 
        onClick={onCancel}
      ></div>
      
      {/* Modal Content */}
      <div className="bg-white w-full max-w-md rounded-t-[2rem] sm:rounded-[2rem] shadow-2xl overflow-hidden relative z-10 animate-slide-up flex flex-col max-h-[90vh]">
        
        {/* Header Section */}
        <div className="p-6 pb-2 relative shrink-0">
             {/* Drag Handle (Visual) */}
             <div className="w-12 h-1.5 bg-stone-200 rounded-full mx-auto absolute top-3 left-1/2 -translate-x-1/2 sm:hidden"></div>

             <button onClick={onCancel} className="absolute top-5 right-5 p-2 text-stone-400 hover:text-stone-900 transition-colors bg-stone-50 rounded-full z-20">
              <X className="w-5 h-5" />
            </button>

             <div className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide mb-4 ${typeInfo.color}`}>
                {typeInfo.icon}
                {typeInfo.label}
              </div>

              <h2 className="font-serif font-bold text-2xl text-primary leading-tight mb-2 pr-8">
                {resource.title}
              </h2>
              
              <p className="text-secondary text-sm font-medium">
                {resource.previewText || "Confirm to open content."}
              </p>
        </div>

        {/* Preview Box */}
        {previewUrl && (
            <div className="px-6 py-4 flex-1 min-h-[250px] overflow-hidden">
                <div className="relative w-full h-full rounded-2xl border border-stone-200 bg-stone-100 overflow-hidden group shadow-inner">
                    {/* Browser Bar */}
                    <div className="absolute top-0 left-0 right-0 h-7 bg-white border-b border-stone-100 flex items-center px-3 space-x-1.5 z-10">
                        <div className="w-2 h-2 rounded-full bg-stone-300"></div>
                        <div className="w-2 h-2 rounded-full bg-stone-300"></div>
                    </div>

                    {!loaded && (
                         <div className="absolute inset-0 flex items-center justify-center pt-6">
                            <div className="w-6 h-6 border-2 border-stone-200 border-t-blue-500 rounded-full animate-spin"></div>
                         </div>
                    )}

                    <iframe 
                        src={previewUrl} 
                        className={`w-full h-full pt-7 border-0 transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
                        title="Content Preview"
                        scrolling="no"
                        onLoad={() => setLoaded(true)}
                        // Sandbox allows scripts/forms but restricted enough to be safe-ish for preview
                        sandbox="allow-scripts allow-same-origin allow-forms"
                    />
                    
                    {/* Interaction Blocker Overlay - captures clicks so they don't interact with iframe */}
                    <div className="absolute inset-0 pt-7 z-20 cursor-default bg-transparent"></div>
                    
                    {/* Bottom Fade Gradient & Badge */}
                    <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none z-30 flex items-end justify-center pb-4">
                         <div className="flex items-center space-x-2 bg-white/90 backdrop-blur px-3 py-1.5 rounded-full border border-stone-100 shadow-sm">
                             <Eye className="w-3 h-3 text-stone-400" />
                             <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider">Sneak Peek</span>
                         </div>
                    </div>
                </div>
            </div>
        )}

        {/* Footer Actions */}
        <div className="p-6 bg-white border-t border-stone-50 shrink-0 pb-safe">
            <button 
                onClick={onOpen}
                className="w-full bg-primary text-white font-bold text-base py-4 rounded-xl flex items-center justify-center space-x-2 shadow-lg shadow-blue-900/10 hover:shadow-xl hover:scale-[1.01] active:scale-[0.98] transition-all duration-300"
            >
                <span>Open Full Content</span>
                <ArrowUpRight className="w-5 h-5" />
            </button>
        </div>

      </div>
    </div>
  );
};