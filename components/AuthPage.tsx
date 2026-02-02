
import React, { useState } from 'react';

interface AuthPageProps {
  type: 'LOGIN' | 'REGISTER';
  onSwitch: () => void;
  onSuccess: (remember: boolean) => void;
  onBack: () => void;
}

const AuthPage: React.FC<AuthPageProps> = ({ type, onSwitch, onSuccess, onBack }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuthenticating(true);
    // Simulate API delay
    setTimeout(() => {
      localStorage.setItem('auth_token', 'mock_jwt_token_' + Math.random().toString(36).substr(2));
      onSuccess(rememberMe);
      setIsAuthenticating(false);
    }, 1000);
  };

  const handleSocialLogin = (provider: string) => {
    setIsAuthenticating(true);
    // Simulate OAuth Redirect/Popup flow
    console.log(`Initiating ${provider} OAuth flow...`);
    setTimeout(() => {
      localStorage.setItem('auth_token', `mock_${provider}_token_` + Math.random().toString(36).substr(2));
      onSuccess(true); // Social logins usually imply persistence
      setIsAuthenticating(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-[#020617] py-8 px-4 sm:px-6 lg:px-8 animate-fade-in transition-colors overflow-hidden relative">
      {/* Background Decor */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-violet-600/5 dark:bg-violet-600/10 blur-[120px] rounded-full opacity-60"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-cyan-500/5 dark:bg-cyan-500/10 blur-[120px] rounded-full opacity-60"></div>
      </div>

      <div className="max-w-lg w-full space-y-10 bg-white/70 dark:bg-slate-900/40 backdrop-blur-2xl p-8 sm:p-12 md:p-14 rounded-[3rem] shadow-2xl border border-slate-200 dark:border-white/10 relative z-10 transition-all duration-300">
        {/* Return Button */}
        <div className="flex justify-start -mt-4 -ml-2 mb-2">
          <button 
            onClick={onBack}
            className="text-slate-500 hover:text-violet-600 dark:hover:text-cyan-400 transition-colors text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2 group"
          >
            <span className="group-hover:-translate-x-1 transition-transform">←</span> Return
          </button>
        </div>

        <div className="text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-violet-600 to-cyan-500 rounded-[1.75rem] flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-violet-500/30 ring-4 ring-slate-100 dark:ring-white/5">
            <span className="text-white font-black text-3xl">SG</span>
          </div>
          <h2 className="text-4xl font-black text-slate-950 dark:text-white tracking-tighter uppercase italic">
            {type === 'LOGIN' ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="mt-4 text-sm font-bold text-slate-600 dark:text-slate-400 max-w-[280px] mx-auto leading-relaxed">
            {type === 'LOGIN' 
              ? 'Access the intelligence suite to refine your roadmap.' 
              : 'Join a network of high-performance startup founders.'}
          </p>
        </div>

        <div className="space-y-4">
          <button
            onClick={() => handleSocialLogin('Google')}
            disabled={isAuthenticating}
            className="w-full flex items-center justify-center gap-4 py-4 px-6 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-sm font-black uppercase tracking-widest text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-750 transition-all shadow-sm active:scale-[0.98] disabled:opacity-50"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            Google
          </button>
          <button
            onClick={() => handleSocialLogin('GitHub')}
            disabled={isAuthenticating}
            className="w-full flex items-center justify-center gap-4 py-4 px-6 bg-[#24292F] text-white rounded-2xl text-sm font-black uppercase tracking-widest hover:bg-[#2b3137] transition-all shadow-md active:scale-[0.98] disabled:opacity-50"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            GitHub
          </button>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200 dark:border-slate-800"></div>
          </div>
          <div className="relative flex justify-center text-[10px] font-black uppercase tracking-[0.4em]">
            <span className="px-6 bg-white dark:bg-slate-900 text-slate-400">Or use email</span>
          </div>
        </div>

        <form className="mt-8 space-y-8" onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div>
              <label htmlFor="email-address" className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-4 ml-2">
                Work Email
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none relative block w-full px-6 py-5 border border-slate-200 dark:border-white/10 bg-white/50 dark:bg-white/5 placeholder-slate-400 dark:placeholder-slate-600 text-slate-950 dark:text-white rounded-[1.5rem] focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-500/50 transition-all font-bold text-lg"
                placeholder="founder@vision.com"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-4 ml-2">
                Security Key
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none relative block w-full px-6 py-5 border border-slate-200 dark:border-white/10 bg-white/50 dark:bg-white/5 placeholder-slate-400 dark:placeholder-slate-600 text-slate-950 dark:text-white rounded-[1.5rem] focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-500/50 transition-all font-bold text-lg"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div className="flex items-center justify-between px-2">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-5 w-5 text-violet-600 focus:ring-violet-500 border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 rounded-lg transition-all cursor-pointer"
              />
              <label htmlFor="remember-me" className="ml-3 block text-xs font-black uppercase tracking-widest text-slate-500 cursor-pointer hover:text-slate-800 dark:hover:text-slate-300 transition-colors">
                Stay Active
              </label>
            </div>

            <div className="text-xs">
              <a href="#" className="font-black text-violet-700 dark:text-violet-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors uppercase tracking-[0.2em]">
                Forgot?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isAuthenticating}
              className="group relative w-full flex justify-center py-6 px-4 border border-transparent text-sm font-black uppercase tracking-[0.3em] rounded-[1.5rem] text-white bg-violet-600 hover:bg-violet-700 hover:shadow-2xl hover:shadow-violet-500/40 transition-all shadow-xl shadow-violet-500/20 active:scale-[0.98] disabled:opacity-50"
            >
              {isAuthenticating ? (
                <span className="flex items-center gap-3">
                  <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                type === 'LOGIN' ? 'Sign In' : 'Activate Account'
              )}
            </button>
          </div>
        </form>

        <div className="text-center mt-12 pt-8 border-t border-slate-100 dark:border-white/5">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
            {type === 'LOGIN' ? "New to StartUpGenie?" : "Already a member?"}{' '}
            <button
              onClick={onSwitch}
              className="ml-2 font-black text-violet-700 dark:text-cyan-400 hover:text-violet-900 dark:hover:text-white transition-colors uppercase tracking-[0.2em] border-b-2 border-violet-400/20 dark:border-cyan-400/20 hover:border-violet-700 dark:hover:border-white"
            >
              {type === 'LOGIN' ? 'Create Hub' : 'Enter Workspace'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
