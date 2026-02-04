
import React, { useState, useEffect } from 'react';
import { supabase } from '../services/supabaseClient';

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
  const [error, setError] = useState<string | null>(null);
  const [showConfirmationNote, setShowConfirmationNote] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuthenticating(true);
    setError(null);
    setShowConfirmationNote(false);

    try {
      if (type === 'LOGIN') {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        
        if (signInError) {
          if (signInError.message.includes("Email not confirmed")) {
            setShowConfirmationNote(true);
            throw new Error("Your email has not been confirmed yet. Please check your inbox for a verification link.");
          }
          throw signInError;
        }
      } else {
        const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: email.split('@')[0],
              role: 'Aspiring Entrepreneur',
            },
            emailRedirectTo: window.location.origin,
          }
        });
        
        if (signUpError) throw signUpError;
        
        // Handle the case where email confirmation is required
        if (signUpData?.user && !signUpData?.session) {
           setError("CHECK_EMAIL");
           setIsAuthenticating(false);
           return;
        }
      }
      onSuccess(rememberMe);
    } catch (err: any) {
      console.error("Auth Error:", err);
      let msg = err.message || "Authentication failed.";
      const lowerMsg = msg.toLowerCase();

      if (lowerMsg.includes("invalid login credentials")) {
        setError("INVALID_CREDENTIALS");
      } else if (lowerMsg.includes("already registered")) {
        setError("ACCOUNT_EXISTS");
      } else {
        setError(msg);
      }
    } finally {
      setIsAuthenticating(false);
    }
  };

  const handleSocialLogin = async (provider: 'google' | 'github') => {
    setIsAuthenticating(true);
    setError(null);
    try {
      const { error: socialError } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: window.location.origin
        }
      });
      if (socialError) throw socialError;
    } catch (err: any) {
      setError(`Social Auth Failed: ${err.message}. (Ensure ${provider} is enabled in Supabase Dashboard)`);
      setIsAuthenticating(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-[#020617] py-8 px-4 sm:px-6 lg:px-8 animate-fade-in transition-colors overflow-hidden relative">
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-violet-600/5 dark:bg-violet-600/10 blur-[120px] rounded-full opacity-60"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-cyan-500/5 dark:bg-cyan-500/10 blur-[120px] rounded-full opacity-60"></div>
      </div>

      <div className="max-w-lg w-full space-y-10 bg-white/70 dark:bg-slate-900/40 backdrop-blur-2xl p-8 sm:p-12 md:p-14 rounded-[3rem] shadow-2xl border border-slate-200 dark:border-white/10 relative z-10 transition-all duration-300">
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
          
          {error === "INVALID_CREDENTIALS" && (
            <div className="mt-6 p-6 bg-amber-50 dark:bg-amber-950/30 border-2 border-amber-200 dark:border-amber-900/50 rounded-3xl text-left shadow-lg animate-fade-in">
              <p className="text-sm font-black text-amber-900 dark:text-amber-200 mb-1">Login Error</p>
              <p className="text-xs font-bold text-amber-800 dark:text-amber-400 leading-relaxed mb-4">
                The credentials you entered are incorrect. If you haven't registered yet, please create an account.
              </p>
              <button 
                onClick={onSwitch}
                className="text-[10px] font-black uppercase tracking-widest text-violet-700 dark:text-cyan-400 hover:underline"
              >
                No account? Register here →
              </button>
            </div>
          )}

          {error === "CHECK_EMAIL" && (
            <div className="mt-6 p-6 bg-violet-50 dark:bg-violet-950/30 border-2 border-violet-200 dark:border-violet-900/50 rounded-3xl text-left shadow-lg">
              <p className="text-sm font-black text-violet-900 dark:text-violet-200 mb-1">Verify Your Email</p>
              <p className="text-xs font-bold text-violet-800 dark:text-violet-400 leading-relaxed">
                We've sent a confirmation link to <strong>{email}</strong>. Please check your inbox and click the link to activate your workspace.
              </p>
            </div>
          )}

          {error === "ACCOUNT_EXISTS" && (
            <div className="mt-6 p-6 bg-emerald-50 dark:bg-emerald-950/30 border-2 border-emerald-200 dark:border-emerald-900/50 rounded-3xl text-left shadow-lg">
              <p className="text-sm font-black text-emerald-900 dark:text-emerald-200 mb-1">Account Found</p>
              <p className="text-xs font-bold text-emerald-800 dark:text-emerald-400 leading-relaxed mb-4">
                This email is already registered. Please sign in instead.
              </p>
              <button 
                onClick={onSwitch}
                className="w-full py-3 bg-emerald-600 text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-emerald-700 transition-all shadow-md"
              >
                Switch to Login →
              </button>
            </div>
          )}

          {error && !["INVALID_CREDENTIALS", "CHECK_EMAIL", "ACCOUNT_EXISTS"].includes(error) && (
            <div className="mt-6 p-5 bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50 rounded-2xl text-xs font-bold text-rose-600 dark:text-rose-400 leading-relaxed shadow-sm flex items-start gap-3 text-left">
              <span className="mt-0.5">⚠️</span>
              <span>{error}</span>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <button
            onClick={() => handleSocialLogin('google')}
            disabled={isAuthenticating}
            className="w-full flex items-center justify-center gap-4 py-4 px-6 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-sm font-black uppercase tracking-widest text-slate-700 dark:text-slate-200 hover:bg-slate-50 transition-all shadow-sm active:scale-[0.98] disabled:opacity-50"
          >
            <span className="text-lg">G</span> Google
          </button>
          <button
            onClick={() => handleSocialLogin('github')}
            disabled={isAuthenticating}
            className="w-full flex items-center justify-center gap-4 py-4 px-6 bg-[#24292F] text-white rounded-2xl text-sm font-black uppercase tracking-widest hover:bg-[#2b3137] transition-all shadow-md active:scale-[0.98] disabled:opacity-50"
          >
            <span className="text-lg">G</span> GitHub
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
              <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-4 ml-2">
                Work Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none relative block w-full px-6 py-5 border border-slate-200 dark:border-white/10 bg-white/50 dark:bg-white/5 placeholder-slate-400 dark:placeholder-slate-600 text-slate-950 dark:text-white rounded-[1.5rem] focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-500/50 transition-all font-bold text-lg"
                placeholder="founder@vision.com"
              />
            </div>
            <div>
              <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-4 ml-2">
                Security Key
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none relative block w-full px-6 py-5 border border-slate-200 dark:border-white/10 bg-white/50 dark:bg-white/5 placeholder-slate-400 dark:placeholder-slate-600 text-slate-950 dark:text-white rounded-[1.5rem] focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-500/50 transition-all font-bold text-lg"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isAuthenticating}
            className="group relative w-full flex justify-center py-6 px-4 border border-transparent text-sm font-black uppercase tracking-[0.3em] rounded-[1.5rem] text-white bg-violet-600 hover:bg-violet-700 hover:shadow-2xl hover:shadow-violet-500/40 transition-all shadow-xl shadow-violet-500/20 active:scale-[0.98] disabled:opacity-50"
          >
            {isAuthenticating ? "Processing..." : (type === 'LOGIN' ? 'Sign In' : 'Activate Account')}
          </button>
        </form>

        <div className="text-center mt-8 pt-6 border-t border-slate-100 dark:border-white/5">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
            {type === 'LOGIN' ? "New to StartUpGenie?" : "Already a member?"}{' '}
            <button
              onClick={onSwitch}
              className="ml-2 font-black text-violet-700 dark:text-cyan-400 hover:text-violet-900 dark:hover:text-white transition-colors uppercase tracking-[0.2em] border-b-2 border-violet-400/20"
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
