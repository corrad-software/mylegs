import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, Users, BookOpen, Gamepad2, CreditCard, 
  Bot, Link, Settings, LogOut, Search 
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const AdminLayout: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navItems = [
    { icon: <LayoutDashboard size={20} />, label: 'Dashboard', path: '/admin' },
    { icon: <Users size={20} />, label: 'User Management', path: '/admin/users' },
    { icon: <BookOpen size={20} />, label: 'Content', path: '/admin/content' },
    { icon: <Gamepad2 size={20} />, label: 'Games & Quizzes', path: '/admin/activities' },
    { icon: <CreditCard size={20} />, label: 'Subscription', path: '/admin/subscription' },
    { icon: <Bot size={20} />, label: 'AI Knowledge', path: '/admin/chatbot' },
    { icon: <Link size={20} />, label: 'Pages', path: '/admin/pages' },
    { icon: <Settings size={20} />, label: 'Settings', path: '/admin/settings' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-900">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col fixed inset-y-0 left-0 z-50">
        <div className="p-6 border-b border-slate-800 flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-serif font-bold italic">M</div>
          <div>
             <h1 className="font-serif font-bold text-lg leading-none">MyLegS</h1>
             <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Admin Panel</p>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/admin'}
              className={({ isActive }) => `
                flex items-center gap-3 px-3 py-3 rounded-lg transition-all text-sm font-medium
                ${isActive 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50' 
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }
              `}
            >
              {item.icon}
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <div className="flex items-center gap-3 px-3 py-2 mb-2">
            <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold">
               {user?.name.charAt(0) || 'A'}
            </div>
            <div className="overflow-hidden">
               <p className="text-sm font-bold truncate">{user?.name || 'Admin'}</p>
               <p className="text-xs text-slate-500 truncate">{user?.email || 'admin@mylegs.app'}</p>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 text-red-400 hover:bg-slate-800 rounded-lg transition-colors text-sm font-medium"
          >
            <LogOut size={16} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 min-w-0">
         {/* Top Header */}
         <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-8 sticky top-0 z-40">
            <div className="flex items-center text-slate-400 gap-2">
               <Search size={18} />
               <input 
                  type="text" 
                  placeholder="Search anything..." 
                  className="bg-transparent border-none focus:outline-none text-sm w-64 text-slate-700 placeholder-slate-400" 
               />
            </div>
            <div className="flex items-center gap-4">
               <button onClick={() => navigate('/')} className="text-sm font-bold text-blue-600 hover:underline">
                  View Mobile Site
               </button>
            </div>
         </header>

         <div className="p-8">
            <Outlet />
         </div>
      </main>
    </div>
  );
};

export default AdminLayout;