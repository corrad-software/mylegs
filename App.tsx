
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, NavLink, useLocation, useNavigate, matchPath, Navigate } from 'react-router-dom';
import { Book, Library as LibIcon, LayoutGrid, Sparkles, User as UserIcon, Lightbulb, Check, Copy } from 'lucide-react';

// Mobile Pages
import Learn from './pages/Learn';
import TopicDetail from './pages/TopicDetail';
import Library from './pages/Library';
import Practice from './pages/Practice';
import More from './pages/More';
import { Profile } from './pages/Profile';
import AIChat from './pages/AIChat';
import EJudgement from './pages/EJudgement';
import Features from './pages/Features'; // Added Import
import { Login } from './pages/Login';
import { Landing } from './pages/Landing';
import Upgrade from './pages/Upgrade';

// Admin Pages
import AdminLayout from './pages/admin/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import UsersPage from './pages/admin/Users';
import ContentPage from './pages/admin/Content';
import ActivitiesPage from './pages/admin/Activities';
import SubscriptionPage from './pages/admin/Subscription';
import ChatbotPage from './pages/admin/Chatbot';
import PagesPage from './pages/admin/Pages';
import SettingsPage from './pages/admin/Settings';

// Components
import { ResourcePreview } from './components/ResourcePreview';
import { WebViewer } from './components/WebViewer';
import { SplashScreen } from './components/SplashScreen';
import { ResourceItem } from './types';

// Context
import { AuthProvider, useAuth } from './context/AuthContext';
import { BinderProvider } from './context/BinderContext';
import { ProgressProvider } from './context/ProgressContext';
import { DataProvider } from './context/DataContext';

// --- CONTEXT-AWARE HINT BUTTON ---
const HintButton: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const location = useLocation();
  const [prompt, setPrompt] = useState('');

  useEffect(() => {
    const path = location.pathname;
    let specificPrompt = "";
    if (path === '/') specificPrompt = "Main Home";
    setPrompt(specificPrompt);
  }, [location]);

  const handleCopy = () => {
    navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="fixed top-4 right-4 z-[100] bg-white/10 backdrop-blur-md border border-white/20 p-2.5 rounded-full shadow-lg hover:bg-white/20 active:scale-90 transition-all group hidden"
      title="Copy Feature Prompt for this Page"
    >
      <div className="relative">
        {copied ? (
          <Check className="w-5 h-5 text-emerald-400" />
        ) : (
          <Lightbulb className="w-5 h-5 text-amber-300 group-hover:text-amber-200" />
        )}
      </div>
    </button>
  );
};

const Navigation: React.FC = () => {
  return (
    <>
      {/* Gradient Backdrop Layer - Subtle dark blur behind nav */}
      <div className="fixed bottom-0 left-0 right-0 z-30 h-[calc(6rem+env(safe-area-inset-bottom))] bg-gradient-to-t from-slate-900/10 to-transparent backdrop-blur-[2px] pointer-events-none" />
      
      {/* Navigation Bar - Fixed to Viewport */}
      <div className="fixed bottom-[calc(0.75rem+env(safe-area-inset-bottom))] left-0 right-0 z-40 px-4 animate-slide-up">
        <div className="max-w-[340px] mx-auto bg-[#1E3A8A] text-white rounded-full shadow-2xl shadow-blue-900/25 backdrop-blur-md border border-white/10 h-16 flex items-center justify-between px-6">
          <NavLink 
            to="/" 
            end
            className={({ isActive }) => `flex flex-col items-center justify-center transition-all duration-300 w-12 ${isActive ? 'text-white scale-110' : 'text-blue-200 hover:text-white'}`}
          >
            {({ isActive }) => (
              <div className="relative flex flex-col items-center">
                <Book className="w-5 h-5 mb-0.5" strokeWidth={isActive ? 2.5 : 2} />
                <span className="text-[9px] font-bold tracking-wide">{isActive ? 'Home' : ''}</span>
                {isActive && <span className="absolute -bottom-2 w-0.5 h-0.5 bg-accent rounded-full"></span>}
              </div>
            )}
          </NavLink>
          
          <NavLink 
            to="/library" 
            end
            className={({ isActive }) => `flex flex-col items-center justify-center transition-all duration-300 w-12 ${isActive ? 'text-white scale-110' : 'text-blue-200 hover:text-white'}`}
          >
            {({ isActive }) => (
              <div className="relative flex flex-col items-center">
                <LibIcon className="w-5 h-5 mb-0.5" strokeWidth={isActive ? 2.5 : 2} />
                <span className="text-[9px] font-bold tracking-wide">{isActive ? 'Library' : ''}</span>
                {isActive && <span className="absolute -bottom-2 w-0.5 h-0.5 bg-accent rounded-full"></span>}
              </div>
            )}
          </NavLink>

          <NavLink 
            to="/more" 
            end
            className={({ isActive }) => `flex flex-col items-center justify-center transition-all duration-300 w-12 ${isActive ? 'text-white scale-110' : 'text-blue-200 hover:text-white'}`}
          >
            {({ isActive }) => (
               <div className="relative flex flex-col items-center">
                <LayoutGrid className="w-5 h-5 mb-0.5" strokeWidth={isActive ? 2.5 : 2} />
                <span className="text-[9px] font-bold tracking-wide">{isActive ? 'Tools' : ''}</span>
                {isActive && <span className="absolute -bottom-2 w-0.5 h-0.5 bg-accent rounded-full"></span>}
              </div>
            )}
          </NavLink>

          <NavLink 
            to="/profile" 
            end
            className={({ isActive }) => `flex flex-col items-center justify-center transition-all duration-300 w-12 ${isActive ? 'text-white scale-110' : 'text-blue-200 hover:text-white'}`}
          >
            {({ isActive }) => (
               <div className="relative flex flex-col items-center">
                <UserIcon className="w-5 h-5 mb-0.5" strokeWidth={isActive ? 2.5 : 2} />
                <span className="text-[9px] font-bold tracking-wide">{isActive ? 'Me' : ''}</span>
                {isActive && <span className="absolute -bottom-2 w-0.5 h-0.5 bg-accent rounded-full"></span>}
              </div>
            )}
          </NavLink>
        </div>
      </div>
    </>
  );
};

const FloatingChatButton: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const hideChat = ['/more/ai', '/upgrade'].includes(location.pathname);
  if (hideChat) return null;

  return (
    <button
      onClick={() => navigate('/more/ai')}
      className="fixed bottom-[calc(6rem+env(safe-area-inset-bottom))] right-4 z-40 bg-white p-3.5 rounded-2xl shadow-lg shadow-blue-900/20 border border-slate-100 flex items-center justify-center text-brand active:scale-95 hover:scale-105 transition-all group animate-fade-in"
      aria-label="AI Tutor"
    >
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-500 to-indigo-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
      <Sparkles className="w-6 h-6 relative z-10 group-hover:text-white transition-colors" />
    </button>
  );
};

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const showNav = ['/', '/library', '/more', '/profile'].includes(location.pathname);

  return (
    <div className="max-w-md mx-auto min-h-screen relative shadow-2xl font-sans text-primary flex flex-col bg-background">
      <HintButton />
      <div className="flex-1 relative animate-app-enter">
         <div key={location.pathname} className="animate-tab-enter min-h-screen w-full">
            {children}
         </div>
      </div>
      <FloatingChatButton />
      {showNav && <Navigation />}
    </div>
  );
};

const MobileApp: React.FC = () => {
  const [selectedResource, setSelectedResource] = useState<ResourceItem | null>(null);
  const [showWebView, setShowWebView] = useState(false);

  const handleOpenResource = (resource: ResourceItem) => {
    setSelectedResource(resource);
  };

  const handleConfirmOpen = () => {
    if (selectedResource) {
      setShowWebView(true);
    }
  };

  const handleClose = () => {
    setSelectedResource(null);
    setShowWebView(false);
  };

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Learn onOpenResource={handleOpenResource} />} />
        <Route path="/topic/:id" element={<TopicDetail onOpenResource={handleOpenResource} />} />
        <Route path="/library/*" element={<Library onOpenResource={handleOpenResource} />} />
        <Route path="/practice" element={<Practice onOpenResource={handleOpenResource} />} />
        <Route path="/more/*" element={<More onOpenResource={handleOpenResource} />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/upgrade" element={<Upgrade />} />
      </Routes>

      {selectedResource && !showWebView && (
        <ResourcePreview 
          resource={selectedResource} 
          onOpen={handleConfirmOpen}
          onCancel={handleClose}
        />
      )}

      {selectedResource && showWebView && (
        <WebViewer 
          url={selectedResource.url || ''} 
          title={selectedResource.title} 
          onClose={handleClose} 
        />
      )}
    </Layout>
  );
};

const MainApp: React.FC = () => {
  const { user, loginAsAdmin, loginAsGuest } = useAuth();
  const [showSplash, setShowSplash] = useState(true);
  const [viewState, setViewState] = useState<'landing' | 'login'>('landing');

  if (!user) {
    return (
      <div className="max-w-md mx-auto bg-slate-900 min-h-screen relative shadow-2xl overflow-hidden font-sans text-primary">
        {showSplash && <SplashScreen onFinish={() => setShowSplash(false)} />}
        <div className="absolute inset-0 z-0">
           <img 
            src="https://www.unisza.edu.my/wp-content/uploads/2022/11/Philosophy%E2%80%8B-884x1024-1.png" 
            alt="Legal Background" 
            className={`w-full h-full object-cover transition-all duration-700 ease-in-out transform will-change-transform ${
              viewState === 'login' ? 'opacity-40 blur-xl scale-110' : 'opacity-50 blur-0 scale-100'
            }`}
          />
          <div className={`absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-slate-900/30 transition-opacity duration-700 ${
            viewState === 'landing' ? 'opacity-100' : 'opacity-0'
          }`} />
          <div className={`absolute inset-0 bg-slate-900/60 transition-opacity duration-700 ${
            viewState === 'login' ? 'opacity-100' : 'opacity-0'
          }`} />
        </div>
        {viewState === 'landing' ? (
          <Landing 
            onContinue={loginAsGuest} 
            onAdminLogin={loginAsAdmin}
          />
        ) : (
          <Login onBack={() => setViewState('landing')} />
        )}
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="content" element={<ContentPage />} />
          <Route path="activities" element={<ActivitiesPage />} />
          <Route path="subscription" element={<SubscriptionPage />} />
          <Route path="chatbot" element={<ChatbotPage />} />
          <Route path="pages" element={<PagesPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>

        {/* Mobile App Routes - Admin redirects to dashboard, others go to app */}
        <Route path="/*" element={user.role === 'admin' ? <Navigate to="/admin" replace /> : <MobileApp />} />
      </Routes>
    </Router>
  );
};

const App: React.FC = () => {
  return (
    <DataProvider>
      <AuthProvider>
        <BinderProvider>
          <ProgressProvider>
            <MainApp />
          </ProgressProvider>
        </BinderProvider>
      </AuthProvider>
    </DataProvider>
  );
};

export default App;
