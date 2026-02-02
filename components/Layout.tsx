
import React from 'react';
import { Theme, AppState } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  theme: Theme;
  onToggleTheme: () => void;
  onNavigate: (state: AppState) => void;
  isLoggedIn: boolean;
  userName?: string;
  hideNav?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, theme, onToggleTheme, onNavigate, isLoggedIn, userName: propUserName, hideNav }) => {
  if (hideNav) return <div className={theme === 'dark' ? 'dark bg-slate-950 min-h-screen' : 'bg-slate-50 min-h-screen'}>{children}</div>;

  const userName = propUserName || localStorage.getItem('user_name') || 'Founder';
  const userAvatar = localStorage.getItem('user_avatar');

  return (
    <div className={`flex flex-col min-h-screen ${theme === 'dark' ? 'dark bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'} transition-colors duration-300 font-plus-jakarta`}>
      <header className="border-b-2 border-slate-200/50 dark:border-violet-500/10 bg-white/70 dark:bg-slate-900/70 backdrop-blur-2xl sticky top-0 z-50 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div 
            className="flex items-center gap-3 cursor-pointer group" 
            onClick={() => onNavigate(isLoggedIn ? 'DASHBOARD' : 'WELCOME')}
          >
            <div className="w-10 h-10 bg-gradient-to-tr from-violet-600 to-cyan-500 rounded-xl flex items-center justify-center group-hover:rotate-[15deg] transition-all shadow-lg shadow-violet-500/30">
              <span className="text-white font-black text-xl">SG</span>
            </div>
            <span className="font-black text-2xl tracking-tighter text-slate-950 dark:text-white uppercase italic">StartUp<span className="text-violet-700 dark:text-cyan-400">Genie</span></span>
          </div>
          
          <nav className="hidden md:flex gap-10 text-sm font-black text-slate-900 dark:text-slate-400">
            <button onClick={() => onNavigate(isLoggedIn ? 'DASHBOARD' : 'WELCOME')} className="hover:text-violet-600 dark:hover:text-cyan-400 transition-colors text-[11px] uppercase tracking-[0.2em] relative group">
              Workspace
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-violet-600 transition-all group-hover:w-full"></span>
            </button>
            <button onClick={() => onNavigate('CREATE')} className="hover:text-violet-600 dark:hover:text-cyan-400 transition-colors text-[11px] uppercase tracking-[0.2em] relative group">
              New Strategy
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-violet-600 transition-all group-hover:w-full"></span>
            </button>
          </nav>

          <div className="flex items-center gap-4">
            <button 
              onClick={onToggleTheme}
              className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all border border-slate-200 dark:border-slate-700"
            >
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
            
            {isLoggedIn ? (
              <button 
                onClick={() => onNavigate('PROFILE')}
                className="flex items-center gap-3 p-1 pl-4 bg-white dark:bg-slate-800 hover:border-violet-400 dark:hover:border-cyan-500 rounded-2xl transition-all border-2 border-slate-200 dark:border-slate-700 group"
              >
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-950 dark:text-slate-300 hidden sm:block group-hover:text-violet-600">{userName.split(' ')[0]}</span>
                <div className="w-10 h-10 rounded-[0.75rem] bg-gradient-to-br from-violet-600 to-cyan-500 overflow-hidden flex items-center justify-center shadow-md">
                  {userAvatar ? (
                    <img src={userAvatar} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-white font-black text-sm">{userName.charAt(0)}</span>
                  )}
                </div>
              </button>
            ) : (
              <button 
                onClick={() => onNavigate('LOGIN')}
                className="bg-violet-600 text-white px-7 py-3 rounded-xl text-sm font-black hover:bg-violet-700 hover:shadow-violet-500/40 transition-all shadow-xl shadow-violet-500/20"
              >
                Launch App
              </button>
            )}
          </div>
        </div>
      </header>
      
      <main className="flex-grow relative">
        {children}
      </main>
    </div>
  );
};

export default Layout;
