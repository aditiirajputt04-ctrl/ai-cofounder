
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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const roles = [
    { id: "Aspiring Entrepreneur", icon: "🌱", desc: "Building from scratch" },
    { id: "Serial Founder", icon: "🚀", desc: "Scaling multiple visions" },
    { id: "Side-Hustler", icon: "🌙", desc: "Optimizing for growth" },
    { id: "Solopreneur", icon: "🏠", desc: "One person, infinite scale" },
    { id: "Technical Architect", icon: "💻", desc: "Product-first engineering" },
    { id: "Growth Lead", icon: "📈", desc: "Focused on distribution" },
    { id: "Impact Founder", icon: "🌍", desc: "Solving global challenges" },
    { id: "Researcher", icon: "🧬", desc: "Data-driven innovation" },
    { id: "Student", icon: "🎓", desc: "Learning while building" },
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setIsSubmitting(true);
    // Tiny delay for "brain sync" animation feel
    setTimeout(() => {
      onComplete(name, role);
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-[#020617] px-4 py-12 transition-colors duration-500 relative overflow-hidden">
      {/* HUD Accents */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
        <div className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-violet-600/10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-cyan-500/10 blur-[120px] rounded-full"></div>
      </div>

      <div className="max-w-5xl w-full grid lg:grid-cols-12 gap-12 items-center relative z-10">
        <div className="lg:col-span-5 space-y-8 animate-fade-in">
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-cyan-400 rounded-xl text-[10px] font-black uppercase tracking-[0.3em] border border-violet-200 dark:border-violet-800">
            <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse"></span>
            Profile Calibration
          </div>
          <h1 className="text-6xl md:text-7xl font-black text-slate-950 dark:text-white leading-[0.9] tracking-tighter italic">
            Define Your <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-cyan-500">Legend.</span>
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 font-bold leading-relaxed max-w-sm">
            The Genie adapts to your experience level. Choose your archetype to optimize strategy synthesis.
          </p>
        </div>

        <div className="lg:col-span-7 bg-white/80 dark:bg-slate-900/60 backdrop-blur-2xl rounded-[4rem] p-8 md:p-12 shadow-2xl border-2 border-slate-200 dark:border-white/5">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="flex flex-col items-center">
              <div className="relative group">
                <div className="w-24 h-24 rounded-[2rem] overflow-hidden bg-slate-100 dark:bg-slate-800 border-4 border-white dark:border-slate-800 shadow-xl flex items-center justify-center group-hover:scale-105 transition-all">
                  {profilePic ? (
                    <img src={profilePic} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-4xl font-black text-slate-300 dark:text-slate-700">{name ? name.charAt(0).toUpperCase() : '?'}</span>
                  )}
                </div>
                <label className="absolute inset-0 flex items-center justify-center bg-violet-600/80 rounded-[2rem] opacity-0 group-hover:opacity-100 transition-all cursor-pointer backdrop-blur-sm">
                  <span className="text-white text-[10px] font-black uppercase tracking-widest">Update</span>
                  <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                </label>
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 ml-4">Full Identity</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Founder Name"
                  className="w-full px-8 py-4 bg-slate-50/50 dark:bg-black/20 border-2 border-slate-100 dark:border-slate-800 rounded-[1.5rem] focus:border-violet-600/50 outline-none font-black text-xl text-slate-950 dark:text-white transition-all shadow-inner"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 ml-4">Archetype Selection</label>
                <div className="grid grid-cols-2 gap-3 max-h-[300px] overflow-y-auto pr-2 scrollbar-hide">
                  {roles.map((r) => (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => setRole(r.id)}
                      className={`p-4 rounded-[1.5rem] border-2 text-left transition-all group ${
                        role === r.id 
                          ? 'bg-violet-600 border-violet-600 text-white shadow-xl shadow-violet-500/30' 
                          : 'bg-slate-50 dark:bg-black/20 border-slate-100 dark:border-slate-800 hover:border-violet-400'
                      }`}
                    >
                      <div className="text-xl mb-1 group-hover:scale-110 transition-transform">{r.icon}</div>
                      <div className="text-[10px] font-black uppercase tracking-tight leading-tight">{r.id}</div>
                      <div className={`text-[8px] font-bold mt-1 opacity-60 ${role === r.id ? 'text-violet-100' : 'text-slate-500'}`}>{r.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={!name.trim() || isSubmitting}
              className="w-full py-5 bg-slate-950 dark:bg-white text-white dark:text-slate-950 rounded-[1.5rem] font-black text-lg hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 transition-all shadow-2xl relative overflow-hidden group"
            >
              <span className="relative z-10 flex items-center justify-center gap-4">
                {isSubmitting ? 'Calibrating...' : 'Initialize Workspace →'}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </button>
          </form>
        </div>
      </div>
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default AccountSetupPage;
