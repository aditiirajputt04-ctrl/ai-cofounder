import { useState, useEffect, useCallback, lazy, Suspense } from 'react';
import Layout from './components/Layout';
import Hero from './components/Hero';
import LoadingScreen from './components/LoadingScreen';
import SplashScreen from './components/SplashScreen';
import WelcomePage from './components/WelcomePage';
import { generateStartupPlan, getDemoPlan } from './services/geminiService';
import { supabase } from './services/supabaseClient';
import { AppState, StartupPlan, Theme } from './types';

// Lazy loaded components for better initial bundle size
const IdeaForm = lazy(() => import('./components/IdeaForm'));
const ResultsDashboard = lazy(() => import('./components/ResultsDashboard'));
const UserProfile = lazy(() => import('./components/UserProfile'));
const AuthPage = lazy(() => import('./components/AuthPage'));
const AccountSetupPage = lazy(() => import('./components/AccountSetupPage'));

const App = () => {
  const [state, setState] = useState<AppState>('SPLASH');
  const [plan, setPlan] = useState<StartupPlan | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [theme, setTheme] = useState<Theme>('light');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const [userName, setUserName] = useState('');
  const [userRole, setUserRole] = useState('Aspiring Entrepreneur');

  const fetchProfile = useCallback(async (userId: string) => {
    try {
      const { data, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (profileError) {
        setState('ONBOARDING');
        return;
      }

      if (data) {
        setUserName(data.full_name || '');
        setUserRole(data.role || 'Aspiring Entrepreneur');
        localStorage.setItem('user_name', data.full_name || '');
        localStorage.setItem('user_role', data.role || 'Aspiring Entrepreneur');
        if (data.avatar_url) {
          localStorage.setItem('user_avatar', data.avatar_url);
        }
        
        setState((prev) => 
          ['LOGIN', 'REGISTER', 'SPLASH', 'WELCOME'].includes(prev) ? 'DASHBOARD' : prev
        );
      }
    } catch (err) {
      console.error("Critical Profile Error:", err);
      setState('ONBOARDING');
    }
  }, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme;
    if (savedTheme) setTheme(savedTheme);

    const initSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setIsLoggedIn(true);
        await fetchProfile(session.user.id);
      } else if (state === 'SPLASH') {
        setTimeout(() => setState(s => s === 'SPLASH' ? 'WELCOME' : s), 800);
      }
    };
    initSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session) {
        setIsLoggedIn(true);
        if (event === 'SIGNED_IN' || event === 'INITIAL_SESSION') {
          await fetchProfile(session.user.id);
        }
      } else {
        setIsLoggedIn(false);
        setUserName('');
        setUserRole('Aspiring Entrepreneur');
        if (event === 'SIGNED_OUT') setState('WELCOME');
      }
    });

    return () => subscription.unsubscribe();
  }, [fetchProfile]);

  const handleAuthSuccess = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
      setIsLoggedIn(true);
      await fetchProfile(session.user.id);
    } else {
      setState('DASHBOARD');
    }
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const handleStartProcess = async (idea: string, name: string, role: string) => {
    setState('LOADING');
    setError(null);
    
    try {
      const generatedPlan = await generateStartupPlan(idea, name, role);
      setPlan(generatedPlan);
      
      // Removed Supabase insertion function as per user request
      
      setState('RESULTS');
    } catch (err: any) {
      console.error("AI Error:", err);
      const msg = err.message || "Failed to generate strategy blueprint.";
      setError(msg);
      
      // Fallback to demo plan to prevent a broken experience
      setPlan(getDemoPlan());
      setTimeout(() => setState('RESULTS'), 3000);
    }
  };

  const handleLogout = async () => {
    localStorage.clear();
    await supabase.auth.signOut();
  };

  const navigate = (s: AppState) => {
    if (!isLoggedIn && ['DASHBOARD', 'CREATE', 'PROFILE'].includes(s)) {
      setState('LOGIN');
    } else {
      setState(s);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderContent = () => {
    if (state === 'SPLASH') return <SplashScreen onComplete={() => {}} />;
    if (state === 'WELCOME') return <WelcomePage onContinue={() => navigate('LOGIN')} />;
    
    return (
      <Suspense fallback={<LoadingScreen />}>
        {state === 'LOGIN' && <AuthPage type="LOGIN" onSwitch={() => setState('REGISTER')} onSuccess={handleAuthSuccess} onBack={() => setState('WELCOME')} />}
        {state === 'REGISTER' && <AuthPage type="REGISTER" onSwitch={() => setState('LOGIN')} onSuccess={handleAuthSuccess} onBack={() => setState('WELCOME')} />}
        
        {state === 'ONBOARDING' && (
          <AccountSetupPage 
            onComplete={async (n, r) => { 
              const { data: { session } } = await supabase.auth.getSession();
              if (session) {
                const avatarUrl = localStorage.getItem('user_avatar') || '';
                await supabase.from('profiles').upsert({
                  id: session.user.id,
                  full_name: n,
                  role: r,
                  avatar_url: avatarUrl,
                  updated_at: new Date()
                });
              }
              setUserName(n); 
              setUserRole(r); 
              setState('DASHBOARD'); 
            }} 
          />
        )}

        {['DASHBOARD', 'CREATE', 'RESULTS', 'PROFILE', 'LOADING'].includes(state) && (
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
                  onStart={() => navigate('CREATE')} 
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
                  onOpenProject={(savedPlan) => { setPlan(savedPlan); setState('RESULTS'); }}
                  onUserUpdate={async (n, r) => { 
                    setUserName(n); 
                    setUserRole(r); 
                  }}
                  initialName={userName}
                  initialRole={userRole}
                  onLogout={handleLogout}
                />
              )}
            </div>
          </Layout>
        )}

        {error && (
          <div className="fixed bottom-8 right-8 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-6 py-4 rounded-2xl shadow-2xl z-[100] border border-slate-700 dark:border-slate-200 animate-bounce flex items-center gap-3 max-w-xs">
            <span className="text-xl">⚠️</span>
            <p className="font-bold text-xs tracking-tight">{error}</p>
            <button onClick={() => setError(null)} className="ml-2 text-xs opacity-50 hover:opacity-100">✕</button>
          </div>
        )}
      </Suspense>
    );
  };

  return (
    <div className={theme === 'dark' ? 'dark' : ''}>
      {renderContent()}
    </div>
  );
};

export default App;