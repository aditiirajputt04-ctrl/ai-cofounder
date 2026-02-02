
import React, { useState } from 'react';

interface AccountSetupPageProps {
  onComplete: (name: string, role: string) => void;
  initialName?: string;
  initialRole?: string;
}

const AccountSetupPage: React.FC<AccountSetupPageProps> = ({ onComplete, initialName, initialRole }) => {
  const [name, setName] = useState(initialName || '');
  const [role, setRole] = useState(initialRole || 'Aspiring Entrepreneur');
  const [profilePic, setProfilePic] = useState(localStorage.getItem('user_avatar') || '');

  const roles = [
    "Aspiring Entrepreneur",
    "Student",
    "Serial Founder",
    "Industry Expert",
    "Researcher",
    "Side-Hustler"
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setProfilePic(base64String);
        localStorage.setItem('user_avatar', base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onComplete(name, role);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 px-4 py-12 transition-colors duration-500">
      <div className="max-w-xl w-full bg-white dark:bg-slate-900 rounded-[3rem] p-10 md:p-16 shadow-2xl border border-slate-200 dark:border-slate-800 animate-fade-in">
        <div className="text-center mb-10">
          <div className="inline-block px-4 py-1.5 bg-violet-50 dark:bg-violet-900/30 text-violet-600 dark:text-cyan-400 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-4 border border-violet-100 dark:border-violet-800">
            Step 2: Profile Creation
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">Complete Your Profile</h1>
          <p className="text-slate-600 dark:text-slate-400 font-bold leading-relaxed">Tell us who you are so the AI can tailor your startup strategies perfectly.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="flex flex-col items-center mb-8">
            <div className="relative group">
              <div className="w-24 h-24 rounded-[2rem] overflow-hidden bg-slate-100 dark:bg-slate-800 border-4 border-white dark:border-slate-800 shadow-xl flex items-center justify-center group-hover:scale-105 transition-all">
                {profilePic ? (
                  <img src={profilePic} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-3xl font-black text-slate-300 dark:text-slate-700">{name ? name.charAt(0).toUpperCase() : '?'}</span>
                )}
              </div>
              <label className="absolute inset-0 flex items-center justify-center bg-violet-600/80 rounded-[2rem] opacity-0 group-hover:opacity-100 transition-all cursor-pointer backdrop-blur-sm">
                <span className="text-white text-[10px] font-black uppercase tracking-widest">Upload</span>
                <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
              </label>
            </div>
            <p className="mt-3 text-[10px] font-black uppercase tracking-widest text-slate-400">Profile Picture</p>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Full Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="How should we address you?"
                className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-4 focus:ring-violet-100 dark:focus:ring-violet-900/30 outline-none font-bold text-slate-900 dark:text-white transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Identity / Role</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-4 focus:ring-violet-100 dark:focus:ring-violet-900/30 outline-none font-bold text-slate-900 dark:text-white transition-all appearance-none cursor-pointer"
              >
                {roles.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={!name.trim()}
            className="w-full py-5 bg-violet-600 text-white rounded-2xl font-black text-lg hover:bg-violet-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-2xl shadow-violet-500/20 active:scale-95"
          >
            Enter My Workspace →
          </button>
        </form>
      </div>
    </div>
  );
};

export default AccountSetupPage;
