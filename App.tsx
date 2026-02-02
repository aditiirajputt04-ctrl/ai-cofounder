
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Hero from './components/Hero';
import IdeaForm from './components/IdeaForm';
import LoadingScreen from './components/LoadingScreen';
import ResultsDashboard from './components/ResultsDashboard';
import AuthPage from './components/AuthPage';
import SplashScreen from './components/SplashScreen';
import WelcomePage from './components/WelcomePage';
import UserProfile from './components/UserProfile';
import AccountSetupPage from './components/AccountSetupPage';
import { generateStartupPlan, getDemoPlan } from './services/geminiService';
import { AppState, StartupPlan, Theme } from './types';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>('SPLASH');
  const [plan, setPlan] = useState<StartupPlan | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [theme, setTheme] = useState<Theme>('light');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const [userName, setUserName] = useState('');
  const [userRole, setUserRole] = useState('Aspiring Entrepreneur');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme;
    if (savedTheme) setTheme(savedTheme);

    const savedName = localStorage.getItem('user_name');
    const savedRole = localStorage.getItem('user_role');
    if (savedName) setUserName(savedName);
    if (savedRole) setUserRole(savedRole);

    const session = localStorage.getItem('founder_session');
    const persistentSession = localStorage.getItem('founder_session_persistent');
    if (session === 'active' || persistentSession === 'active') {
      setIsLoggedIn(true);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const handleStartProcess = (idea: string, name: string, role: string) => {
    setUserName(name);
    setUserRole(role);
    setState('LOADING');
    setError(null);
    
    generateStartupPlan(idea, name, role)
      .then((generatedPlan) => {
        setPlan(generatedPlan);
        setState('RESULTS');
      })
      .catch((err) => {
        console.error("AI Error:", err);
        setError("Network Congestion. Falling back to Demo Mode.");
        setPlan(getDemoPlan());
        setTimeout(() => setState('RESULTS'), 1500);
      });
  };

  const handleAuthSuccess = (remember: boolean) => {
    setIsLoggedIn(true);
    localStorage.setItem('founder_session', 'active');
    if (remember) localStorage.setItem('founder_session_persistent', 'active');
    
    const savedName = localStorage.getItem('user_name');
    setState(!savedName ? 'ONBOARDING' : 'DASHBOARD');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('founder_session');
    localStorage.removeItem('founder_session_persistent');
    setState('WELCOME');
  };

  const navigate = (s: AppState) => {
    if (!isLoggedIn && (s === 'DASHBOARD' || s === 'CREATE' || s === 'PROFILE')) {
      setState('LOGIN');
    } else {
      setState(s);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderContent = () => {
    if (state === 'SPLASH') return <SplashScreen onComplete={() => setState('WELCOME')} />;
    if (state === 'WELCOME') return <WelcomePage onContinue={() => navigate(isLoggedIn ? 'DASHBOARD' : 'LOGIN')} />;
    if (state === 'LOGIN') return <AuthPage type="LOGIN" onSwitch={() => setState('REGISTER')} onSuccess={handleAuthSuccess} onBack={() => setState('WELCOME')} />;
    if (state === 'REGISTER') return <AuthPage type="REGISTER" onSwitch={() => setState('LOGIN')} onSuccess={handleAuthSuccess} onBack={() => setState('WELCOME')} />;
    if (state === 'ONBOARDING') return <AccountSetupPage onComplete={(n, r) => { setUserName(n); setUserRole(r); setState('DASHBOARD'); }} />;

    return (
      <Layout 
        theme={theme} 
        onToggleTheme={toggleTheme} 
        isLoggedIn={isLoggedIn}
        userName={userName}
        onNavigate={navigate}
        hideNav={state === 'LOADING'}
      >
        <div className="animate-fade-in min-h-[calc(100vh-64px)]">
          {state === 'DASHBOARD' && (
            <Hero 
              onStart={() => setState('CREATE')} 
              onShowDemo={() => { setPlan(getDemoPlan()); setState('RESULTS'); }}
              userName={userName}
              userRole={userRole}
              isLoggedIn={isLoggedIn}
            />
          )}
          
          {state === 'CREATE' && (
            <IdeaForm 
              onSubmit={handleStartProcess} 
              isLoading={false} 
              initialName={userName}
              initialRole={userRole}
              onBack={() => setState('DASHBOARD')}
            />
          )}

          {state === 'LOADING' && <LoadingScreen />}

          {state === 'RESULTS' && plan && (
            <ResultsDashboard plan={plan} onReset={() => setState('DASHBOARD')} />
          )}

          {state === 'PROFILE' && (
            <UserProfile 
              onBack={() => setState('DASHBOARD')} 
              theme={theme}
              onToggleTheme={toggleTheme}
              onUserUpdate={(n, r) => { setUserName(n); setUserRole(r); }}
              initialName={userName}
              initialRole={userRole}
              onLogout={handleLogout}
            />
          )}
        </div>

        {error && (
          <div className="fixed bottom-8 right-8 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 px-6 py-4 rounded-2xl shadow-2xl z-[100] border border-slate-700 dark:border-slate-200 animate-bounce">
            <p className="font-bold flex items-center gap-2">⚠️ {error}</p>
          </div>
        )}
      </Layout>
    );
  };

  return (
    <div className={theme === 'dark' ? 'dark' : ''}>
      {renderContent()}
    </div>
  );
};

export default App;
