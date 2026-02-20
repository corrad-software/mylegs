import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, ArrowRight, AlertCircle, Eye, EyeOff, ArrowLeft, LogIn } from 'lucide-react';

interface LoginProps {
  onBack: () => void;
}

export const Login: React.FC<LoginProps> = ({ onBack }) => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Small artificial delay to simulate network request
    setTimeout(() => {
      const success = login(email, pass);
      if (!success) {
        setError('Invalid email or password');
        setIsLoading(false);
      }
    }, 600);
  };

  return (
    <div className="absolute inset-0 z-50 flex flex-col animate-fade-in bg-slate-50">
      <div className="relative z-10 flex flex-col h-full px-6 pt-safe pb-[calc(2rem+env(safe-area-inset-bottom))]">
        
        {/* Navigation */}
        <div className="pt-4 mb-6">
          <button 
            onClick={onBack}
            className="p-2 -ml-2 text-slate-500 hover:text-slate-900 hover:bg-slate-200 rounded-full transition-all flex items-center gap-2"
          >
            <ArrowLeft className="w-6 h-6" />
            <span className="text-sm font-bold">Back</span>
          </button>
        </div>

        {/* Header */}
        <div className="mb-8 mt-4">
          <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-600/20 mb-6">
            <LogIn className="w-7 h-7 text-white" />
          </div>
          <h1 className="font-serif font-bold text-4xl text-slate-900 mb-3">Welcome Back</h1>
          <p className="text-slate-500 text-base font-medium">Sign in with your university or personal account to continue.</p>
        </div>

        {/* Card Form */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xl shadow-slate-200/50">
          <form onSubmit={handleSubmit} className="space-y-5">
            
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Email</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="student@example.com"
                  className="block w-full pl-11 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm font-medium"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Password</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                </div>
                <input
                  type={showPass ? "text" : "password"}
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                  placeholder="Enter your password"
                  className="block w-full pl-11 pr-12 py-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm font-medium"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPass ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl text-sm font-bold animate-slide-up">
                <AlertCircle className="w-5 h-5 shrink-0" />
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-900 text-white font-bold text-lg py-4 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-blue-900/20 hover:bg-blue-800 hover:scale-[1.01] active:scale-[0.98] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed mt-4"
            >
              {isLoading ? (
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>
        </div>

        <div className="mt-auto pt-6 text-center">
          <p className="text-sm text-slate-400 font-medium">
            Forgot your password? <button className="text-blue-600 font-bold hover:underline">Reset here</button>
          </p>
        </div>

      </div>
    </div>
  );
};