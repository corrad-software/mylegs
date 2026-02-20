import React, { useState } from 'react';
import { RefreshCw, Globe, AlertCircle, Loader2, ArrowLeft } from 'lucide-react';

interface WebViewerProps {
  url: string;
  title: string;
  onClose: () => void;
}

export const WebViewer: React.FC<WebViewerProps> = ({ url, title, onClose }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleRefresh = () => {
    setIsLoading(true);
    setHasError(false);
    setRefreshKey(prev => prev + 1);
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-center pointer-events-none">
      <div className="bg-white w-full max-w-md h-full flex flex-col shadow-2xl animate-slide-up relative pointer-events-auto border-x border-slate-100">
        {/* Top Bar */}
        <div className="bg-white/95 backdrop-blur-sm border-b border-stone-100 px-4 py-4 flex items-center justify-between z-10 shrink-0">
          <button onClick={onClose} className="p-2 -ml-2 text-stone-500 hover:text-stone-900 rounded-full hover:bg-stone-50 transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex-1 text-center mx-4 overflow-hidden">
            <h3 className="text-sm font-bold text-primary truncate">{title}</h3>
            <p className="text-[10px] text-stone-400 truncate">{new URL(url).hostname}</p>
          </div>
          <div className="flex space-x-1">
            <button onClick={handleRefresh} className="p-2 text-stone-400 hover:text-stone-900 rounded-full hover:bg-stone-50 transition-colors">
              <RefreshCw className="w-5 h-5" />
            </button>
            <a 
              href={url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="p-2 text-stone-400 hover:text-stone-900 rounded-full hover:bg-stone-50 transition-colors"
            >
              <Globe className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 relative bg-stone-50 overflow-hidden">
          {isLoading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-white z-10">
              <Loader2 className="w-8 h-8 text-primary animate-spin mb-2" />
              <p className="text-xs font-bold uppercase tracking-widest text-stone-400">Loading Content</p>
            </div>
          )}

          {hasError ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-white">
              <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mb-4">
                <AlertCircle className="w-8 h-8 text-red-400" />
              </div>
              <h3 className="font-serif font-bold text-2xl text-primary mb-2">Connection Error</h3>
              <p className="text-secondary text-sm mb-8 max-w-xs mx-auto leading-relaxed">
                We couldn't load the content. Please check your internet connection.
              </p>
              <button 
                onClick={handleRefresh}
                className="bg-primary text-white px-8 py-3 rounded-full font-bold text-sm shadow-lg shadow-stone-200 active:scale-95 transition-transform"
              >
                Try Again
              </button>
            </div>
          ) : (
            <iframe 
              key={refreshKey}
              src={url}
              className="w-full h-full border-0"
              onLoad={handleLoad}
              onError={handleError}
              title={title}
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
            />
          )}
        </div>
      </div>
    </div>
  );
};