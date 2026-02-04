
import React, { useState, useEffect, useRef } from 'react';
import { Theme, StartupPlan } from '../types';
import { supabase } from '../services/supabaseClient';

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
  const [name, setName] = useState(initialName || 'Founder');
  const [role, setRole] = useState(initialRole || 'Aspiring Entrepreneur');
  const [bio, setBio] = useState('');
  const [profilePic, setProfilePic] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [blueprints, setBlueprints] = useState<any[]>([]);
  const [isLoadingBlueprints, setIsLoadingBlueprints] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    loadProfile();
  }, []);

  useEffect(() => {
    if (activeTab === 'BLUEPRINTS') {
      loadBlueprints();
    }
  }, [activeTab]);

  const loadProfile = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single();
      if (data) {
        setName(data.full_name || '');
        setRole(data.role || 'Aspiring Entrepreneur');
        setBio(data.bio || '');
        setProfilePic(data.avatar_url || '');
      }
    }
  };

  const loadBlueprints = async () => {
    setIsLoadingBlueprints(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data, error } = await supabase
        .from('blueprints')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      if (!error && data) setBlueprints(data);
    }
    setIsLoadingBlueprints(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert("Image size must be less than 2MB");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setProfilePic(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { error } = await supabase.from('profiles').upsert({
        id: user.id,
        full_name: name,
        role: role,
        bio: bio,
        avatar_url: profilePic,
        updated_at: new Date()
      });
      
      if (!error) {
        onUserUpdate(name, role);
        localStorage.setItem('user_avatar', profilePic);
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 3000);
      } else {
        console.error("Save error:", error);
      }
    }
    setIsSaving(false);
  };

  const handleDeleteBlueprint = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const { error } = await supabase.from('blueprints').delete().eq('id', id);
    if (!error) {
      setBlueprints(prev => prev.filter(b => b.id !== id));
    }
  };

  const stats = [
    { label: 'Blueprints', value: blueprints.length.toString(), icon: '📄' },
    { label: 'AI Credits', value: '450', icon: '⚡' },
    { label: 'Success Rate', value: '94%', icon: '📈' },
  ];

  const roleOptions = [
    "Aspiring Entrepreneur",
    "Serial Founder",
    "Side-Hustler",
    "Solopreneur",
    "Technical Architect",
    "Growth Lead",
    "Impact Founder",
    "Researcher",
    "Student"
  ];

  return (
    <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="flex items-center gap-6">
          <div className="relative group">
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="w-24 h-24 md:w-32 md:h-32 rounded-[2.5rem] overflow-hidden border-4 border-white dark:border-slate-800 shadow-2xl bg-slate-200 dark:bg-slate-800 flex items-center justify-center transition-transform group-hover:scale-105 cursor-pointer"
            >
              {profilePic ? (
                <img src={profilePic} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <span className="text-4xl font-black text-slate-400">{name.charAt(0)}</span>
              )}
              {/* Camera Icon Overlay */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity rounded-[2.5rem]">
                <span className="text-white text-2xl">📸</span>
              </div>
            </div>
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/*" 
              onChange={handleFileChange} 
            />
          </div>
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl md:text-4xl font-black text-slate-950 dark:text-white tracking-tighter uppercase italic">
                {name.split(' ')[0]}
              </h1>
              <span className="px-3 py-1 bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-cyan-400 text-[10px] font-black uppercase tracking-widest rounded-full border border-violet-200 dark:border-violet-800">{role}</span>
            </div>
            <p className="text-slate-600 dark:text-slate-400 font-bold max-w-md line-clamp-2">{bio || "Active Strategist"}</p>
          </div>
        </div>
        <button 
          onClick={onBack}
          className="px-6 py-3 bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-2xl font-black text-xs uppercase tracking-widest hover:border-violet-400 dark:hover:border-cyan-500 transition-all shadow-sm"
        >
          ← Back to Workspace
        </button>
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
            {isLoadingBlueprints ? (
              <div className="col-span-full py-20 text-center text-slate-400 font-black uppercase tracking-widest animate-pulse">Syncing Blueprints...</div>
            ) : blueprints.length === 0 ? (
               <div className="col-span-full py-20 text-center text-slate-400 font-bold">No strategies archived yet.</div>
            ) : (
              blueprints.map((project) => (
                <div 
                  key={project.id} 
                  onClick={() => onOpenProject?.(project.plan)}
                  className="group relative bg-white dark:bg-slate-900 p-10 rounded-[3.5rem] border-2 border-slate-50 dark:border-slate-800 shadow-sm hover:shadow-2xl hover:border-violet-200 dark:hover:border-cyan-900/50 transition-all duration-500 overflow-hidden cursor-pointer"
                >
                  <div className="flex justify-between items-start mb-6">
                    <span className="px-4 py-1.5 bg-slate-50 dark:bg-slate-800 rounded-xl text-[10px] font-black uppercase text-slate-600 dark:text-slate-500 tracking-[0.2em] border border-slate-100 dark:border-slate-700">
                      SAVED
                    </span>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{new Date(project.created_at).toLocaleDateString()}</span>
                  </div>

                  <h3 className="text-2xl font-black text-slate-950 dark:text-white mb-3 tracking-tighter group-hover:text-violet-700 dark:hover:text-cyan-400 transition-colors">
                    {project.title || "Untitled Vision"}
                  </h3>
                  <p className="text-slate-700 dark:text-slate-400 font-bold mb-8 line-clamp-2 italic leading-relaxed">
                    "{project.idea}"
                  </p>

                  <div className="w-full py-4 bg-slate-950 dark:bg-slate-800 text-white rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] group-hover:bg-violet-700 dark:group-hover:bg-cyan-600 transition-all shadow-lg flex items-center justify-center gap-2">
                    Open Strategy →
                  </div>

                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={(e) => handleDeleteBlueprint(project.id, e)}
                      className="p-3 bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 rounded-xl hover:bg-rose-600 hover:text-white transition-all border border-rose-100 dark:border-rose-900/30"
                      title="Delete Permanently"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))
            )}
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
                      className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-800 rounded-2xl font-bold text-slate-950 dark:text-white focus:border-violet-500 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 ml-2">Founder Role</label>
                    <select 
                      value={role} 
                      onChange={(e) => setRole(e.target.value)}
                      className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-800 rounded-2xl font-bold text-slate-950 dark:text-white focus:border-violet-500 outline-none transition-all cursor-pointer"
                    >
                      {roleOptions.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 ml-2">Strategic Bio</label>
                  <textarea 
                    rows={4}
                    value={bio} 
                    onChange={(e) => setBio(e.target.value)}
                    className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-800 rounded-2xl font-bold text-slate-950 dark:text-white focus:border-violet-500 outline-none transition-all resize-none"
                    placeholder="Briefly describe your focus area..."
                  />
                </div>
                <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-6">
                  <button 
                    onClick={handleSave}
                    disabled={isSaving}
                    className="w-full sm:w-auto px-12 py-5 bg-violet-600 text-white rounded-2xl font-black text-xs uppercase tracking-[0.3em] hover:bg-violet-700 shadow-xl active:scale-95 transition-all disabled:opacity-50"
                  >
                    {isSaving ? "Saving..." : isSaved ? "Saved! ✓" : "Update Profile"}
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-rose-50 dark:bg-rose-950/10 p-10 rounded-[3.5rem] border-2 border-rose-100 dark:border-rose-900/20">
               <h4 className="text-[11px] font-black text-rose-700 dark:text-rose-400 uppercase tracking-[0.4em] mb-4">Termination</h4>
               <button 
                onClick={onLogout}
                className="px-10 py-4 bg-rose-600 text-white rounded-2xl font-black text-xs uppercase tracking-[0.3em] hover:bg-rose-700 transition-all active:scale-95 shadow-lg"
               >
                  Secure Sign Out
               </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
