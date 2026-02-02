
import React, { useState, useEffect, useRef } from 'react';

interface IdeaFormProps {
  onSubmit: (idea: string, name: string, role: string) => void;
  isLoading: boolean;
  initialName?: string;
  initialRole?: string;
  onBack: () => void;
}

const genieWisdom = {
  empty: ["Initialize your vision. The engine awaits.", "Every empire begins with a single prompt."],
  short: ["Analyzing core spark... Feed the model more detail.", "Define your 'Unfair Advantage' to strengthen the blueprint."],
  medium: ["Signal detected. The market gap is becoming visible.", "Strategic alignment is strong. Proceed to finalize?"],
  long: ["Maximum Clarity. You have constructed a high-fidelity vision.", "Ready for Synthesis. This is an investor-grade draft."]
};

const IdeaForm: React.FC<IdeaFormProps> = ({ onSubmit, isLoading, initialName, initialRole, onBack }) => {
  const [idea, setIdea] = useState('');
  const [name, setName] = useState(initialName || '');
  const [role, setRole] = useState(initialRole || 'Aspiring Entrepreneur');
  const [wisdom, setWisdom] = useState(genieWisdom.empty[0]);
  const [intensity, setIntensity] = useState(0);
  
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (initialName) setName(initialName);
    if (initialRole) setRole(initialRole);
  }, [initialName, initialRole]);

  useEffect(() => {
    const len = idea.trim().length;
    const calculatedIntensity = Math.min(100, Math.floor(len / 3.5));
    setIntensity(calculatedIntensity);

    if (len === 0) {
      setWisdom(genieWisdom.empty[Math.floor(Date.now() / 5000) % genieWisdom.empty.length]);
    } else if (len < 60) {
      setWisdom(genieWisdom.short[0]);
    } else if (len < 250) {
      setWisdom(genieWisdom.medium[Math.floor(len / 120) % genieWisdom.medium.length]);
    } else {
      setWisdom(genieWisdom.long[0]);
    }
  }, [idea]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (idea.trim().length < 10 || !name.trim()) return;
    onSubmit(idea, name, role);
  };

  const getActiveColor = () => {
    if (intensity < 20) return 'text-slate-400';
    if (intensity < 50) return 'text-violet-500';
    if (intensity < 85) return 'text-indigo-500';
    return 'text-cyan-400';
  };

  const getBorderColor = () => {
    if (intensity < 20) return 'border-slate-200 dark:border-slate-800';
    if (intensity < 50) return 'border-violet-500/30';
    if (intensity < 85) return 'border-indigo-500/50 shadow-[0_0_15px_rgba(99,102,241,0.2)]';
    return 'border-cyan-400/60 shadow-[0_0_25px_rgba(34,211,238,0.2)]';
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 animate-fade-in relative bg-[#fdf2ff] dark:bg-[#020617] overflow-hidden">
      
      {/* Immersive HUD Accents */}
      <div className="absolute inset-0 pointer-events-none opacity-20 dark:opacity-30">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.05)_0%,transparent_70%)]"></div>
        <div className="absolute top-1/4 left-10 w-px h-64 bg-gradient-to-b from-transparent via-violet-500 to-transparent"></div>
        <div className="absolute bottom-1/4 right-10 w-px h-64 bg-gradient-to-b from-transparent via-cyan-500 to-transparent"></div>
        <div className="absolute top-20 right-20 text-[10px] font-mono text-slate-400 dark:text-slate-600 rotate-90 tracking-[0.5em] uppercase">SYSTEM.DRAFT_MODE.V3</div>
      </div>

      <div className="max-w-7xl w-full grid lg:grid-cols-12 gap-16 items-start relative z-10">
        
        {/* Left Section: The Vision Metrics */}
        <div className="lg:col-span-4 flex flex-col space-y-10 lg:sticky lg:top-24">
          <div className="space-y-6">
            <button onClick={onBack} className="flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.4em] text-slate-500 hover:text-violet-600 transition-all group">
              <span className="group-hover:-translate-x-1 transition-transform">←</span> Return to Workspace
            </button>
            
            <h1 className="text-7xl md:text-8xl font-black text-slate-950 dark:text-white tracking-tighter leading-[0.85] italic">
              Market <br/>
              <span className={`transition-all duration-700 ${intensity > 70 ? 'text-cyan-500' : 'text-violet-700 dark:text-violet-400'}`}>Vision</span>
            </h1>
            
            <p className="text-slate-600 dark:text-slate-400 font-bold text-lg max-w-sm leading-relaxed">
              Synthesize your raw concepts into a high-performance roadmap. Detail the core friction and your unique solution.
            </p>
          </div>

          {/* Strength Meter HUB */}
          <div className="bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl p-8 rounded-[3rem] border-2 border-slate-200 dark:border-white/5 space-y-8 shadow-2xl shadow-violet-500/5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Vision Strength</span>
              <span className={`text-xl font-black italic ${getActiveColor()}`}>{intensity}%</span>
            </div>
            
            <div className="flex gap-2 h-12">
               {[...Array(20)].map((_, i) => (
                 <div 
                   key={i} 
                   className={`flex-grow rounded-sm transition-all duration-500 ${
                     intensity > (i * 5) 
                       ? 'bg-gradient-to-t from-violet-600 to-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.4)]' 
                       : 'bg-slate-200 dark:bg-slate-800'
                   }`}
                   style={{ height: `${60 + (i * 2)}%` }}
                 ></div>
               ))}
            </div>

            <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
               <div className="flex items-center gap-4 mb-3">
                 <div className={`w-2 h-2 rounded-full animate-pulse ${intensity > 50 ? 'bg-cyan-400' : 'bg-violet-600'}`}></div>
                 <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">Strategist Memo</span>
               </div>
               <p className="text-slate-950 dark:text-slate-200 font-black text-lg leading-tight italic">
                 "{wisdom}"
               </p>
            </div>
          </div>
        </div>

        {/* Right Section: The Intelligence Terminal */}
        <div className="lg:col-span-8">
          <div className="group relative">
            {/* Multi-layered Glass Card */}
            <div className={`relative bg-white/90 dark:bg-slate-900/80 backdrop-blur-3xl rounded-[4rem] p-8 md:p-14 border-2 transition-all duration-700 ${getBorderColor()}`}>
              
              {/* Terminal Header */}
              <div className="flex justify-between items-center mb-10">
                 <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-slate-950 dark:bg-white rounded-2xl flex items-center justify-center text-white dark:text-slate-950 shadow-lg">
                       <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                       </svg>
                    </div>
                    <div>
                       <div className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Input Module</div>
                       <div className="text-sm font-black text-slate-950 dark:text-white uppercase tracking-widest">Vision_Draft_01</div>
                    </div>
                 </div>
                 
                 <div className="hidden md:flex items-center gap-6">
                    <div className="text-right">
                       <div className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400">Sync Status</div>
                       <div className="text-[10px] font-black text-emerald-500 uppercase">Neural Link Online</div>
                    </div>
                    <div className="w-10 h-10 rounded-full border-2 border-slate-200 dark:border-slate-800 flex items-center justify-center">
                       <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></div>
                    </div>
                 </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-10">
                <div className="relative">
                  <textarea
                    ref={textareaRef}
                    required
                    autoFocus
                    value={idea}
                    onChange={(e) => setIdea(e.target.value)}
                    placeholder="Describe the world you're building..."
                    className="w-full h-[500px] p-12 bg-slate-50/50 dark:bg-black/30 border-2 border-slate-100 dark:border-slate-800/50 rounded-[3rem] focus:border-violet-600/30 dark:focus:border-cyan-500/30 focus:ring-0 outline-none transition-all text-xl md:text-3xl text-slate-950 dark:text-white placeholder:text-slate-300 dark:placeholder:text-slate-800 font-black resize-none leading-relaxed shadow-inner selection:bg-violet-600/20"
                    disabled={isLoading}
                  />
                  
                  {/* Floating Action Bar */}
                  <div className="absolute bottom-10 right-10 flex items-center gap-6">
                     <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 border-r border-slate-200 dark:border-slate-800 pr-6">
                        {idea.length} Characters
                     </div>
                     <div className="flex gap-1.5">
                        {[...Array(4)].map((_, i) => (
                          <div key={i} className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${intensity > (i * 25) ? 'bg-cyan-500 scale-125 shadow-[0_0_8px_rgba(34,211,238,1)]' : 'bg-slate-200 dark:bg-slate-800'}`}></div>
                        ))}
                     </div>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-8 items-center justify-between pt-4">
                  <div className="max-w-xs">
                     <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-1">Synthesis Target</p>
                     <p className="text-xs font-bold text-slate-700 dark:text-slate-300 leading-tight">
                        Generates MVP Roadmap, SWOT Analysis, Revenue Architecture, and Competitive Positioning.
                     </p>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={idea.trim().length < 10 || !name.trim() || isLoading}
                    className="group relative px-20 py-8 bg-slate-950 dark:bg-white text-white dark:text-slate-950 rounded-[2.5rem] font-black text-2xl hover:scale-[1.03] active:scale-[0.97] transition-all shadow-[0_30px_60px_rgba(0,0,0,0.15)] disabled:opacity-40 disabled:hover:scale-100 overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center gap-4">
                      {intensity > 85 ? 'Finalize Synthesis' : 'Begin Synthesis'}
                      <span className="group-hover:translate-x-2 transition-transform">→</span>
                    </span>
                    <div className={`absolute inset-0 bg-gradient-to-r from-violet-600 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity`}></div>
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
                  </button>
                </div>
              </form>
            </div>
            
            {/* Outer Decorative Rings */}
            <div className="absolute -top-10 -right-10 w-40 h-40 border-2 border-violet-500/10 rounded-full animate-[spin_20s_linear_infinite] -z-10"></div>
            <div className="absolute -bottom-10 -left-10 w-64 h-64 border-2 border-cyan-500/10 rounded-full animate-[spin_30s_linear_infinite_reverse] -z-10"></div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default IdeaForm;
