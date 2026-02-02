
import React, { useState, useEffect } from 'react';

const messages = [
  "Quantifying advantages...",
  "Drafting personas...",
  "Structuring milestones...",
  "Optimizing economics...",
  "Finalizing roadmap...",
  "Activating engine..."
];

const insights = [
  "Execution is everything.",
  "Do the right things early.",
  "Momentum is your most precious resource.",
  "Solve specific pain points.",
  "AI accelerates validation loops.",
  "Simple products win fast."
];

const LoadingScreen: React.FC = () => {
  const [msgIndex, setMsgIndex] = useState(0);
  const [insightIndex, setInsightIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Accelerated intervals for faster perceived performance
    const msgInterval = setInterval(() => {
      setMsgIndex((prev) => (prev + 1) % messages.length);
    }, 1200);

    const insightInterval = setInterval(() => {
      setInsightIndex((prev) => (prev + 1) % insights.length);
    }, 3500);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100;
        const remaining = 100 - prev;
        // Faster increments to match the lite model speed
        const increment = Math.max(0.8, Math.random() * (remaining * 0.25));
        const nextValue = prev + increment;
        return nextValue > 100 ? 100 : nextValue;
      });
    }, 300);

    return () => {
      clearInterval(msgInterval);
      clearInterval(insightInterval);
      clearInterval(progressInterval);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 text-center animate-fade-in relative overflow-hidden bg-slate-50 dark:bg-slate-950">
      
      {/* Immersive Background Nodes */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none opacity-20 dark:opacity-40">
        <div className="absolute top-1/4 left-1/4 w-[30vw] h-[30vw] bg-violet-500/10 blur-[100px] rounded-full animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[25vw] h-[25vw] bg-cyan-500/10 blur-[100px] rounded-full animate-pulse [animation-delay:2s]"></div>
      </div>

      {/* Modern Strategy Engine Visualization */}
      <div className="relative w-48 h-48 mb-16 flex items-center justify-center">
        {/* Dynamic Glowing Rings */}
        <div className="absolute inset-0 border-[2px] border-violet-600/10 rounded-[3.5rem] animate-[spin_8s_linear_infinite]"></div>
        <div className="absolute inset-4 border-[2px] border-cyan-500/20 rounded-[3rem] animate-[spin_6s_linear_infinite_reverse]"></div>
        <div className="absolute inset-8 border-[2px] border-violet-600/40 rounded-[2.5rem] animate-[spin_4s_linear_infinite]"></div>
        
        {/* Central Pulsing Brain/Node */}
        <div className="relative z-10 w-20 h-20 bg-gradient-to-br from-violet-600 to-cyan-500 rounded-[1.75rem] flex items-center justify-center text-white shadow-2xl shadow-violet-500/50 animate-pulse">
           <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
           </svg>
        </div>

        {/* Binary Floating Dots */}
        {[0, 60, 120, 180, 240, 300].map((deg) => (
           <div 
             key={deg} 
             className="absolute w-2.5 h-2.5 bg-cyan-600 rounded-full"
             style={{
               transform: `rotate(${deg}deg) translateY(-85px)`,
               opacity: Math.random() > 0.5 ? 1 : 0.4
             }}
           ></div>
        ))}
      </div>

      <div className="h-32 flex flex-col items-center max-w-lg">
        <h2 className="text-3xl font-black text-slate-950 dark:text-white mb-4 transition-all duration-700 leading-tight">
          {messages[msgIndex]}
        </h2>
        <div className="flex items-center gap-3 px-6 py-2 bg-white dark:bg-slate-900 rounded-full text-violet-700 dark:text-cyan-400 font-black text-[10px] uppercase tracking-[0.3em] border border-slate-300 dark:border-slate-800 shadow-sm">
          <span className="flex h-1.5 w-1.5 rounded-full bg-cyan-600 animate-ping"></span>
          Strategic Flash Core Active
        </div>
      </div>

      {/* High Fidelity Progress Bar */}
      <div className="w-full max-w-md mt-10 mb-16">
        <div className="flex justify-between mb-3 px-2">
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-600">Flash Sync</span>
          <span className="text-[10px] font-black text-violet-700 dark:text-cyan-400">{Math.round(progress)}%</span>
        </div>
        <div className="h-3 w-full bg-slate-200 dark:bg-slate-900 rounded-full overflow-hidden border border-slate-300 dark:border-slate-800 shadow-inner">
          <div 
            className="h-full bg-gradient-to-r from-violet-600 via-fuchsia-600 to-cyan-500 transition-all duration-500 ease-out relative"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.4)_50%,transparent_100%)] w-24 animate-[scan_1.5s_ease-in-out_infinite]"></div>
          </div>
        </div>
      </div>

      {/* Founder Quote Card */}
      <div className="max-w-lg w-full bg-white/90 dark:bg-slate-900/60 backdrop-blur-xl p-10 rounded-[3.5rem] border-2 border-slate-200 dark:border-violet-500/20 shadow-2xl animate-fade-in">
        <div className="flex items-center gap-3 mb-6 justify-center">
          <span className="text-2xl">✨</span>
          <span className="text-[10px] font-black uppercase tracking-[0.5em] text-violet-700 dark:text-cyan-400">Tactical Insight</span>
        </div>
        <p className="text-slate-950 dark:text-slate-100 font-black text-xl leading-relaxed italic">
          "{insights[insightIndex]}"
        </p>
      </div>

      <style>{`
        @keyframes scan {
          from { left: -100px; }
          to { left: 100%; }
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;
