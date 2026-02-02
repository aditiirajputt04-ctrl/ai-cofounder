
import React, { useState, useEffect } from 'react';
import { Theme, StartupPlan } from '../types';

interface UserProfileProps {
  onBack: () => void;
  theme: Theme;
  onToggleTheme: () => void;
  onOpenProject?: (plan: StartupPlan) => void;
  onUserUpdate: (name: string, role: string) => void;
  initialName?: string;
  initialRole?: string;
  onLogout: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ 
  onBack, theme, onToggleTheme, onOpenProject, onUserUpdate, initialName, initialRole, onLogout 
}) => {
  const [activeTab, setActiveTab] = useState<'BLUEPRINTS' | 'ACCOUNT' | 'USAGE'>('BLUEPRINTS');
  const [name, setName] = useState(initialName || 'Founder Alpha');
  const [role, setRole] = useState(initialRole || 'Aspiring Entrepreneur');
  const [bio, setBio] = useState(localStorage.getItem('user_bio') || 'Aspiring entrepreneur building the future.');
  const [profilePic, setProfilePic] = useState(localStorage.getItem('user_avatar') || '');
  const [isSaved, setIsSaved] = useState(false);

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

  const handleSave = () => {
    localStorage.setItem('user_name', name);
    localStorage.setItem('user_role', role);
    localStorage.setItem('user_bio', bio);
    onUserUpdate(name, role);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const stats = [
    { label: 'Blueprints', value: '12', icon: '📄' },
    { label: 'AI Credits', value: '450', icon: '⚡' },
    { label: 'Success Rate', value: '94%', icon: '📈' },
  ];

  const pastProjects = [
    { title: "EcoDelivery Pro", date: "2 days ago", pitch: "Sustainable logistics for local farmers.", category: "Logistics" },
    { title: "FitSlack", date: "1 week ago", pitch: "Fitness integration for remote slack teams.", category: "Health" },
    { title: "QuantumCode", date: "3 weeks ago", pitch: "AI-powered debugger for quantum algorithms.", category: "DevTools" }
  ];

  return (
    <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="flex items-center gap-6">
          <div className="relative group">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-[2.5rem] overflow-hidden border-4 border-white dark:border-slate-800 shadow-2xl bg-slate-200 dark:bg-slate-800 flex items-center justify-center transition-transform group-hover:scale-105">
              {profilePic ? (
                <img src={profilePic} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <span className="text-4xl font-black text-slate-400">{name.charAt(0)}</span>
              )}
            </div>
            <label className="absolute inset-0 flex items-center justify-center bg-violet-600/80 rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-all cursor-pointer backdrop-blur-sm">
              <span className="text-white text-xs font-black uppercase tracking-widest">Update</span>
              <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
            </label>
          </div>
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tighter uppercase italic">
                {name.split(' ')[0]}<span className="text-violet-600 dark:text-cyan-400">{name.split(' ')[1] || ''}</span>
              </h1>
              <span className="px-3 py-1 bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-cyan-400 text-[10px] font-black uppercase tracking-widest rounded-full border border-violet-200 dark:border-violet-800">{role}</span>
            </div>
            <p className="text-slate-600 dark:text-slate-400 font-bold max-w-md line-clamp-2">{bio}</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={onBack}
            className="px-6 py-3 bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-2xl font-black text-xs uppercase tracking-widest hover:border-violet-400 dark:hover:border-cyan-500 transition-all shadow-sm flex items-center gap-2"
          >
            <span>←</span> Back to Workspace
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border-2 border-slate-50 dark:border-slate-800 shadow-sm flex items-center gap-6 group hover:border-violet-300 dark:hover:border-cyan-700 transition-all">
            <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
              {stat.icon}
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-500 dark:text-slate-500 uppercase tracking-widest mb-1">{stat.label}</p>
              <p className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-8 border-b-2 border-slate-100 dark:border-slate-800 mb-8 overflow-x-auto scrollbar-hide">
        {[
          { id: 'BLUEPRINTS', label: 'My Blueprints' },
          { id: 'ACCOUNT', label: 'Account Settings' },
          { id: 'USAGE', label: 'Usage & Credits' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`pb-4 text-[11px] font-black uppercase tracking-[0.2em] whitespace-nowrap transition-all relative ${
              activeTab === tab.id ? 'text-violet-600 dark:text-cyan-400' : 'text-slate-500 hover:text-slate-950 dark:hover:text-slate-200'
            }`}
          >
            {tab.label}
            {activeTab === tab.id && <div className="absolute bottom-0 left-0 right-0 h-1 bg-violet-600 dark:bg-cyan-500 rounded-full animate-fade-in"></div>}
          </button>
        ))}
      </div>

      <div className="min-h-[400px]">
        {activeTab === 'BLUEPRINTS' && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in">
            {pastProjects.map((project, i) => (
              <div key={i} className="group relative bg-white dark:bg-slate-900 p-10 rounded-[3.5rem] border-2 border-slate-50 dark:border-slate-800 shadow-sm hover:shadow-2xl hover:border-violet-200 dark:hover:border-cyan-900/50 transition-all duration-500 overflow-hidden">
                {/* Visual Category Badge */}
                <div className="flex justify-between items-start mb-6">
                  <span className="px-4 py-1.5 bg-slate-50 dark:bg-slate-800 rounded-xl text-[10px] font-black uppercase text-slate-600 dark:text-slate-500 tracking-[0.2em] border border-slate-100 dark:border-slate-700">
                    {project.category}
                  </span>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{project.date}</span>
                </div>

                <h3 className="text-2xl font-black text-slate-950 dark:text-white mb-3 tracking-tighter group-hover:text-violet-700 dark:group-hover:text-cyan-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-slate-700 dark:text-slate-400 font-bold mb-8 line-clamp-2 italic leading-relaxed">
                  "{project.pitch}"
                </p>

                {/* Static Open Button */}
                <button className="w-full py-4 bg-slate-950 dark:bg-slate-800 text-white rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] hover:bg-violet-700 dark:hover:bg-cyan-600 transition-all shadow-lg active:scale-95">
                  Open Strategy
                </button>

                {/* Hover Action Overlay */}
                <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-white via-white/95 to-transparent dark:from-slate-900 dark:via-slate-900/95 dark:to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-500 flex gap-3">
                  <button className="flex-grow py-3 px-4 bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-violet-600 hover:text-white transition-all flex items-center justify-center gap-2 border border-violet-200 dark:border-violet-800">
                    <span>📋</span> Duplicate
                  </button>
                  <button className="py-3 px-6 bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-rose-600 hover:text-white transition-all border border-rose-100 dark:border-rose-900/30">
                    🗑️ Delete
                  </button>
                </div>
              </div>
            ))}

            {/* Empty State Card */}
            <div 
              onClick={() => onBack()} // Should probably navigate to CREATE
              className="flex flex-col items-center justify-center p-10 rounded-[3.5rem] border-2 border-dashed border-slate-200 dark:border-slate-800 hover:border-violet-400 dark:hover:border-cyan-600 cursor-pointer transition-all group"
            >
              <div className="w-16 h-16 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <span className="text-4xl text-slate-300 dark:text-slate-600 font-black">+</span>
              </div>
              <span className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-500">New Strategy</span>
            </div>
          </div>
        )}

        {activeTab === 'ACCOUNT' && (
          <div className="max-w-2xl animate-fade-in space-y-8">
            <div className="bg-white dark:bg-slate-900 p-12 rounded-[3.5rem] border-2 border-slate-50 dark:border-slate-800 shadow-sm">
              <h3 className="text-[11px] font-black text-slate-500 dark:text-slate-500 uppercase tracking-[0.4em] mb-10">Identity Configuration</h3>
              <div className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 ml-2">Display Name</label>
                    <input 
                      type="text" 
                      value={name} 
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-800 rounded-2xl font-bold text-slate-950 dark:text-white focus:border-violet-500 dark:focus:border-cyan-500 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 ml-2">Founder Role</label>
                    <select 
                      value={role} 
                      onChange={(e) => setRole(e.target.value)}
                      className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-800 rounded-2xl font-bold text-slate-950 dark:text-white focus:border-violet-500 dark:focus:border-cyan-500 outline-none transition-all cursor-pointer"
                    >
                      {roles.map(r => <option key={r} value={r}>{r}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 ml-2">Strategic Bio</label>
                  <textarea 
                    rows={4}
                    value={bio} 
                    onChange={(e) => setBio(e.target.value)}
                    className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-800 rounded-2xl font-bold text-slate-950 dark:text-white focus:border-violet-500 dark:focus:border-cyan-500 outline-none transition-all resize-none"
                    placeholder="Briefly describe your focus area..."
                  />
                </div>
                <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-6">
                  <button 
                    onClick={handleSave}
                    className="w-full sm:w-auto px-12 py-5 bg-violet-600 text-white rounded-2xl font-black text-xs uppercase tracking-[0.3em] hover:bg-violet-700 shadow-xl shadow-violet-500/20 active:scale-95 transition-all"
                  >
                    {isSaved ? "Saved! ✓" : "Update Profile"}
                  </button>
                  <div className="flex items-center gap-6 bg-slate-50 dark:bg-slate-800 p-2 pl-6 rounded-[1.5rem] border border-slate-100 dark:border-slate-700">
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Mode</span>
                    <button 
                      onClick={onToggleTheme}
                      className="p-3 rounded-xl bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-400 hover:shadow-md transition-all border border-slate-200 dark:border-slate-700"
                    >
                      {theme === 'light' ? '🌙' : '☀️'}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-rose-50 dark:bg-rose-950/10 p-10 rounded-[3.5rem] border-2 border-rose-100 dark:border-rose-900/20">
               <h4 className="text-[11px] font-black text-rose-700 dark:text-rose-400 uppercase tracking-[0.4em] mb-4">Termination</h4>
               <p className="text-sm font-bold text-rose-800 dark:text-rose-300 mb-8 opacity-70">Current founder session will be purged. All unsaved strategy data will be lost.</p>
               <button 
                onClick={onLogout}
                className="px-10 py-4 bg-rose-600 text-white rounded-2xl font-black text-xs uppercase tracking-[0.3em] hover:bg-rose-700 transition-all active:scale-95 shadow-lg shadow-rose-500/20"
               >
                  Secure Sign Out
               </button>
            </div>
          </div>
        )}

        {activeTab === 'USAGE' && (
          <div className="grid md:grid-cols-2 gap-8 animate-fade-in">
             <div className="bg-gradient-to-br from-violet-700 to-indigo-900 p-12 rounded-[4.5rem] text-white shadow-3xl relative overflow-hidden group border-2 border-white/10">
                <div className="absolute -top-12 -right-12 w-64 h-64 bg-white/10 rounded-full blur-[80px] group-hover:scale-150 transition-transform duration-1000"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-cyan-400/10 rounded-full blur-[60px]"></div>
                
                <h3 className="text-[11px] font-black uppercase tracking-[0.5em] mb-12 text-violet-200">Subscription Status</h3>
                <p className="text-5xl font-black mb-4 tracking-tighter">Pro Founder</p>
                <p className="text-xl font-bold text-violet-100 mb-14 leading-relaxed italic opacity-80">Unlimited strategic analysis & priority pipeline access.</p>
                <button className="w-full py-5 bg-white text-slate-950 rounded-[2rem] font-black text-sm uppercase tracking-[0.3em] hover:bg-cyan-50 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl">
                  Manage Tier
                </button>
             </div>

             <div className="bg-white dark:bg-slate-900 p-12 rounded-[4.5rem] border-2 border-slate-50 dark:border-slate-800 shadow-sm flex flex-col justify-between">
                <div>
                   <h3 className="text-[11px] font-black uppercase tracking-[0.5em] mb-12 text-slate-500">Resource Pool</h3>
                   <div className="space-y-10">
                      <div>
                        <div className="flex justify-between mb-3 px-2">
                           <span className="text-[11px] font-black uppercase tracking-widest text-slate-900 dark:text-slate-300">Strategy Credits</span>
                           <span className="text-[11px] font-black text-violet-600 dark:text-cyan-400">450 / 500</span>
                        </div>
                        <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                           <div className="h-full bg-gradient-to-r from-violet-600 to-cyan-500 w-[90%]"></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-3 px-2">
                           <span className="text-[11px] font-black uppercase tracking-widest text-slate-900 dark:text-slate-300">Active Storage</span>
                           <span className="text-[11px] font-black text-violet-600 dark:text-cyan-400">12 / 100</span>
                        </div>
                        <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                           <div className="h-full bg-gradient-to-r from-violet-600 to-cyan-500 w-[12%]"></div>
                        </div>
                      </div>
                   </div>
                </div>
                <p className="mt-12 text-[11px] font-black uppercase tracking-[0.4em] text-center text-slate-400">Next refresh in 14 days</p>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
