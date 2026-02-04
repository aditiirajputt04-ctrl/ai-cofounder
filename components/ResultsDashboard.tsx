
import React, { useState, useEffect } from 'react';
import { StartupPlan } from '../types';

interface ResultsDashboardProps {
  plan: StartupPlan;
  onReset: () => void;
}

const ResultsDashboard: React.FC<ResultsDashboardProps> = ({ plan, onReset }) => {
  const [activeTab, setActiveTab] = useState<'OVERVIEW' | 'MARKET' | 'STRATEGY' | 'PRODUCT'>('OVERVIEW');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleCheck = (id: string) => {
    setCheckedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const tabs = [
    { id: 'OVERVIEW', label: 'Summary', icon: '💎' },
    { id: 'MARKET', label: 'Audience', icon: '🎯' },
    { id: 'STRATEGY', label: 'Advantage', icon: '♟️' },
    { id: 'PRODUCT', label: 'Roadmap', icon: '✅' },
  ];

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 min-h-screen relative transition-colors">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 bg-white/90 dark:bg-slate-900/80 backdrop-blur-xl p-8 rounded-[2.5rem] border border-slate-300 dark:border-violet-500/20 shadow-2xl shadow-violet-500/5 transition-colors">
        <div className="flex items-center gap-5">
          <div className="w-14 h-14 bg-gradient-to-br from-violet-600 to-cyan-500 rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-xl shadow-violet-500/20">
            {plan.pitchSummary.charAt(0).toUpperCase()}
          </div>
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-2xl font-black text-slate-950 dark:text-white tracking-tight">V1 Strategy Blueprint</h1>
              <span className="px-2 py-0.5 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-[8px] font-black uppercase tracking-widest rounded-md border border-emerald-200 dark:border-emerald-800 flex items-center gap-1">
                <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse"></span>
                Cloud Synced
              </span>
            </div>
            <p className="text-slate-800 dark:text-slate-400 text-[10px] font-black uppercase tracking-[0.3em]">
              Drafted for: <span className="text-violet-700 dark:text-cyan-400">{localStorage.getItem('user_name') || 'Founder'}</span>
            </p>
          </div>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={() => window.print()}
            className="px-6 py-3 text-xs border-2 border-slate-300 dark:border-slate-800 rounded-xl font-black uppercase tracking-widest bg-white dark:bg-slate-800 text-slate-950 dark:text-slate-200 hover:border-violet-600 dark:hover:border-cyan-500 transition-all flex items-center gap-2"
          >
            🖨️ PDF
          </button>
          <button 
            onClick={onReset}
            className="px-6 py-3 text-xs bg-violet-600 text-white rounded-xl font-black uppercase tracking-widest hover:bg-violet-700 shadow-lg shadow-violet-500/30 transition-all"
          >
            New Project
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-12">
        <aside className="lg:col-span-1">
          <div className="sticky top-24 space-y-3">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`w-full text-left px-6 py-4 rounded-[1.5rem] flex items-center gap-4 transition-all border-2 ${
                  activeTab === tab.id 
                    ? 'bg-violet-600 border-violet-600 text-white shadow-xl shadow-violet-500/30 translate-x-2' 
                    : 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:border-violet-400 dark:hover:border-cyan-900 font-black'
                }`}
              >
                <span className="text-xl">{tab.icon}</span>
                <span className="text-[11px] uppercase tracking-[0.2em]">{tab.label}</span>
              </button>
            ))}
            
            {plan.founderNote && (
              <div className="mt-12 p-8 bg-gradient-to-br from-violet-100/50 to-cyan-100/50 dark:from-violet-900/10 dark:to-cyan-900/5 rounded-[2.5rem] border-2 border-violet-200 dark:border-violet-500/20 relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-violet-700"></div>
                <p className="text-xs text-violet-950 dark:text-slate-300 font-bold leading-relaxed italic">
                  <span className="font-black block not-italic mb-3 uppercase tracking-[0.2em] text-[10px] text-violet-700 dark:text-cyan-400">Strategist Memo</span>
                  "{plan.founderNote}"
                </p>
              </div>
            )}
          </div>
        </aside>

        <div className="lg:col-span-3 space-y-8 pb-20">
          {activeTab === 'OVERVIEW' && (
            <div className="space-y-8 animate-fade-in">
              <div className="bg-white dark:bg-slate-900 p-12 rounded-[3.5rem] border-2 border-slate-200 dark:border-slate-800 shadow-sm transition-colors relative overflow-hidden">
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-violet-500/5 rounded-full blur-3xl"></div>
                <h2 className="text-[10px] font-black text-violet-700 dark:text-cyan-400 uppercase tracking-[0.4em] mb-8">The Executive Pitch</h2>
                <p className="text-4xl font-black text-slate-950 dark:text-white leading-[1.2] tracking-tighter">
                  {plan.pitchSummary}
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white dark:bg-slate-900 p-10 rounded-[3rem] border-2 border-slate-200 dark:border-slate-800 shadow-sm">
                  <h3 className="text-[10px] font-black text-slate-700 dark:text-slate-400 uppercase mb-8 tracking-[0.3em]">Key Players</h3>
                  <div className="flex flex-wrap gap-3">
                    {plan.competitors.map((c, i) => (
                      <span key={i} className="px-5 py-2.5 bg-slate-100 dark:bg-slate-800 text-slate-950 dark:text-slate-200 rounded-2xl text-xs font-black border border-slate-300 dark:border-slate-700">
                        {c.name}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="bg-gradient-to-br from-violet-950 to-indigo-950 p-10 rounded-[3rem] text-white shadow-2xl shadow-indigo-500/20 border-2 border-white/10">
                  <h3 className="text-[10px] font-black text-violet-300 uppercase mb-8 tracking-[0.3em]">Concept Refinement</h3>
                  <p className="text-indigo-50 leading-relaxed font-bold italic text-lg">
                    {plan.refinedIdea}
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'MARKET' && (
            <div className="space-y-8 animate-fade-in">
              <h2 className="text-2xl font-black text-slate-950 dark:text-white px-2 uppercase tracking-tighter italic">Ideal Customer Profile</h2>
              <div className="grid md:grid-cols-2 gap-8">
                {plan.targetUsers.map((u, i) => (
                  <div key={i} className="bg-white dark:bg-slate-900 p-12 rounded-[3.5rem] border-2 border-slate-200 dark:border-slate-800 shadow-sm hover:border-violet-500 dark:hover:border-cyan-500 transition-all group relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-violet-500/10 group-hover:bg-cyan-500/20 transition-all rounded-full -mr-8 -mt-8"></div>
                    <div className="w-16 h-16 bg-gradient-to-br from-violet-100 to-cyan-50 dark:from-violet-900/30 dark:to-cyan-900/10 text-violet-700 dark:text-cyan-400 rounded-[1.5rem] flex items-center justify-center text-3xl mb-8 group-hover:scale-110 transition-transform shadow-sm">
                      👤
                    </div>
                    <h4 className="text-2xl font-black text-slate-950 dark:text-white mb-4 uppercase tracking-tighter">{u.userType}</h4>
                    <div className="p-6 bg-slate-100 dark:bg-slate-800/40 rounded-3xl border border-slate-200 dark:border-slate-700">
                      <p className="text-sm text-slate-900 dark:text-slate-300 italic font-bold leading-relaxed">"{u.painPoint}"</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'STRATEGY' && (
            <div className="space-y-12 animate-fade-in">
              <div className="grid grid-cols-2 gap-6">
                {[
                  { title: "Strengths", items: plan.swot.strengths, color: "from-emerald-600 to-emerald-800", icon: "✓", bg: "emerald" },
                  { title: "Weaknesses", items: plan.swot.weaknesses, color: "from-rose-600 to-rose-800", icon: "!", bg: "rose" },
                  { title: "Opportunities", items: plan.swot.opportunities, color: "from-violet-600 to-violet-800", icon: "↗", bg: "violet" },
                  { title: "Threats", items: plan.swot.threats, color: "from-amber-600 to-amber-800", icon: "⚠", bg: "amber" }
                ].map((quad, i) => (
                  <div key={i} className="bg-white dark:bg-slate-900 p-8 rounded-[3rem] border-2 border-slate-200 dark:border-slate-800 transition-colors">
                    <h4 className={`text-[11px] font-black text-slate-950 dark:text-slate-200 mb-8 flex items-center gap-3 uppercase tracking-[0.3em]`}>
                      <span className={`w-8 h-8 rounded-xl bg-gradient-to-br ${quad.color} text-white flex items-center justify-center text-sm shadow-lg`}>{quad.icon}</span>
                      {quad.title}
                    </h4>
                    <ul className="space-y-4">
                      {quad.items.map((s, j) => (
                        <li key={j} className="text-[13px] text-slate-900 dark:text-slate-400 font-bold flex gap-3">
                           <span className="text-violet-600/70">•</span> {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="space-y-8">
                <h2 className="text-2xl font-black text-slate-950 dark:text-white px-2 flex items-center gap-4 uppercase tracking-tighter italic">
                  <span className="text-4xl">🤺</span> The Battlefield
                </h2>
                <div className="grid gap-10">
                  {plan.competitors.map((comp, i) => (
                    <div 
                      key={i} 
                      className="bg-white dark:bg-slate-900 p-12 rounded-[4rem] border-2 border-slate-200 dark:border-slate-800 shadow-sm hover:border-violet-500 dark:hover:border-cyan-600 transition-all opacity-0 animate-slide-up-reveal"
                      style={{ animationDelay: `${i * 120}ms` }}
                    >
                      <div className="flex flex-col md:flex-row gap-10">
                        <div className="md:w-1/3">
                          <h4 className="font-black text-slate-950 dark:text-white uppercase tracking-[0.2em] mb-4 text-xl tracking-tighter">{comp.name}</h4>
                          <span className="px-4 py-1.5 bg-slate-100 dark:bg-slate-800 text-[10px] font-black text-slate-700 dark:text-slate-500 rounded-xl uppercase tracking-widest border border-slate-300 dark:border-slate-700">Established Player</span>
                          
                          <div className="mt-8 space-y-4">
                            <div>
                              <p className="text-[10px] font-black text-violet-600 dark:text-cyan-400 uppercase tracking-[0.2em] mb-1">Market Stance</p>
                              <p className="text-sm font-bold text-slate-900 dark:text-slate-300 italic">{comp.marketPosition}</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="md:w-2/3 space-y-10">
                          <div className="space-y-4">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] flex items-center gap-3">
                              Primary USP / Differentiator
                            </p>
                            <p className="text-sm text-slate-900 dark:text-slate-400 font-bold leading-relaxed border-l-4 border-slate-200 dark:border-slate-800 pl-8 italic">
                              {comp.keyDifferentiator}
                            </p>
                          </div>

                          <div className="p-8 bg-gradient-to-br from-violet-100/30 to-white dark:from-violet-900/20 dark:to-slate-900 rounded-[2.5rem] border-2 border-violet-200 dark:border-violet-500/20 shadow-inner">
                            <p className="text-[10px] font-black text-violet-800 dark:text-cyan-400 uppercase tracking-[0.4em] mb-4 flex items-center gap-3">
                              <span className="p-1.5 bg-white dark:bg-violet-900 rounded-lg shadow-sm">⚡</span> Strategic Gap / Our Edge
                            </p>
                            <p className="text-[15px] text-slate-950 dark:text-slate-100 font-black leading-relaxed">
                              {comp.strategicGap}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-slate-950 p-12 rounded-[4rem] text-white shadow-3xl relative overflow-hidden group border-2 border-violet-500/20">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-[120px] -z-0"></div>
                <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-cyan-600/10 rounded-full blur-[120px] -z-0"></div>
                
                <h3 className="text-3xl font-black mb-12 flex items-center gap-5 relative z-10 italic">
                  <span className="text-5xl">💎</span> Revenue Architecture
                </h3>
                <div className="grid md:grid-cols-2 gap-12 relative z-10">
                  {plan.monetization.map((m, i) => (
                    <div key={i} className="border-l-4 border-cyan-500 pl-10 group-hover:translate-x-2 transition-transform duration-500">
                      <h4 className="font-black mb-4 text-2xl uppercase tracking-tight text-cyan-400">{m.modelName}</h4>
                      <p className="text-slate-100 text-[15px] font-bold leading-relaxed">{m.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'PRODUCT' && (
            <div className="space-y-8 animate-fade-in">
              <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl p-10 md:p-16 rounded-[4.5rem] border-2 border-slate-200 dark:border-violet-500/10 shadow-xl roadmap-line relative">
                <div className="flex items-center gap-6 mb-20 relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-br from-violet-600 to-cyan-500 text-white rounded-[2rem] flex items-center justify-center font-black text-2xl shadow-2xl shadow-violet-500/30">V1</div>
                  <div>
                    <h2 className="text-4xl font-black text-slate-950 dark:text-white tracking-tighter uppercase italic">The Execution Plan</h2>
                    <p className="text-violet-700 dark:text-cyan-400 font-black uppercase text-[10px] tracking-[0.5em] mt-1">Milestone Checklist</p>
                  </div>
                </div>
                
                <div className="space-y-16 relative z-10">
                  <div className="space-y-8">
                    <h3 className="text-[10px] font-black text-violet-700 dark:text-cyan-400 uppercase tracking-[0.6em] mb-10 pl-16 flex items-center gap-6">
                      Phase 1: Foundation (Must-Haves)
                      <div className="flex-grow h-px bg-violet-200 dark:bg-violet-900/30"></div>
                    </h3>
                    
                    <div className="space-y-6">
                      {plan.mvpFeatures.mustHave.map((f, i) => {
                        const id = `must-${i}`;
                        const isChecked = checkedItems[id];
                        return (
                          <div 
                            key={i} 
                            onClick={() => toggleCheck(id)}
                            className={`flex items-start gap-8 group cursor-pointer transition-all duration-300 ${isChecked ? 'opacity-60 grayscale-[0.5]' : ''}`}
                          >
                            <div className={`mt-2 w-10 h-10 rounded-2xl border-2 flex items-center justify-center shrink-0 transition-all duration-500 ${
                              isChecked 
                                ? 'bg-cyan-500 border-cyan-500 shadow-lg shadow-cyan-500/30 rotate-[360deg]' 
                                : 'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700 group-hover:border-violet-600'
                            }`}>
                               {isChecked ? (
                                 <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" />
                                 </svg>
                               ) : (
                                 <span className="text-slate-500 dark:text-slate-500 font-black text-xs group-hover:text-violet-700">{i + 1}</span>
                               )}
                            </div>
                            <div className={`flex-grow p-8 rounded-[2.5rem] border-2 transition-all duration-500 ${
                              isChecked 
                                ? 'bg-cyan-50 dark:bg-cyan-900/10 border-cyan-200 dark:border-cyan-900/30' 
                                : 'bg-white dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 group-hover:shadow-xl group-hover:border-violet-600/20'
                            }`}>
                               <div className="flex items-center justify-between gap-6">
                                 <span className={`font-black text-xl uppercase tracking-tight transition-all duration-500 ${
                                   isChecked ? 'line-through text-slate-500' : 'text-slate-950 dark:text-slate-100'
                                 }`}>{f}</span>
                                 {!isChecked && <span className="px-4 py-1.5 bg-violet-600 text-white text-[10px] font-black rounded-xl uppercase tracking-widest shadow-lg shadow-violet-500/20">Critical</span>}
                               </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="space-y-8 pt-10">
                    <h3 className="text-[10px] font-black text-slate-500 dark:text-slate-500 uppercase tracking-[0.6em] mb-10 pl-16 flex items-center gap-6">
                      Phase 2: Growth (Upcoming)
                      <div className="flex-grow h-px bg-slate-200 dark:bg-slate-800"></div>
                    </h3>
                    
                    <div className="grid md:grid-cols-2 gap-6 pl-16">
                      {plan.mvpFeatures.optional.map((f, i) => (
                        <div 
                          key={i} 
                          className="p-8 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-300 rounded-[2rem] text-sm font-black flex items-center gap-5 transition-all hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-cyan-500 group"
                        >
                          <div className="w-3 h-3 rounded-full bg-slate-300 dark:bg-slate-700 group-hover:bg-cyan-600 group-hover:scale-150 transition-all shadow-sm"></div>
                          <span className="tracking-tight uppercase">{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-10 right-10 w-16 h-16 bg-gradient-to-br from-violet-600 to-cyan-500 text-white rounded-[1.75rem] shadow-3xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-40 animate-fade-in shadow-violet-500/40"
          title="Back to Top"
        >
          <span className="text-2xl font-black">↑</span>
        </button>
      )}

      <style>{`
        @keyframes slide-up-reveal {
          from {
            opacity: 0;
            transform: translateY(16px) scale(0.97);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .animate-slide-up-reveal {
          animation: slide-up-reveal 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default ResultsDashboard;
