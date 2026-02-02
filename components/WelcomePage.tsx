
import React from 'react';

interface WelcomePageProps {
  onContinue: () => void;
}

const WelcomePage: React.FC<WelcomePageProps> = ({ onContinue }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fdf2ff] dark:bg-[#020617] px-4 py-12 transition-colors duration-500 overflow-hidden relative">
      {/* Immersive Background Layer */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Animated Mesh Aurora */}
        <div className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] bg-violet-600/10 dark:bg-violet-600/20 blur-[150px] rounded-full animate-pulse opacity-60"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] bg-cyan-500/10 dark:bg-cyan-500/20 blur-[150px] rounded-full animate-pulse [animation-delay:3s] opacity-60"></div>
        
        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 opacity-[0.05] dark:opacity-[0.05]" 
             style={{ backgroundImage: 'radial-gradient(#6366f1 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }}>
        </div>
        
        {/* Glowing Orbit Lines */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[120vw] border border-violet-500/[0.05] dark:border-white/[0.03] rounded-full animate-[spin_60s_linear_infinite]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] border border-cyan-500/[0.05] dark:border-white/[0.02] rounded-full animate-[spin_40s_linear_infinite_reverse]"></div>
      </div>

      <div className="max-w-6xl w-full text-center space-y-20 animate-fade-in relative z-10">
        <div className="space-y-10">
          <div className="inline-flex items-center gap-3 px-6 py-2.5 bg-white/50 dark:bg-white/5 backdrop-blur-md rounded-full border border-violet-200 dark:border-white/10 shadow-2xl animate-float">
             <span className="flex h-2 w-2 rounded-full bg-violet-600 dark:bg-cyan-400 shadow-[0_0_10px_rgba(139,92,246,0.5)] dark:shadow-[0_0_10px_rgba(34,211,238,0.8)]"></span>
             <span className="text-violet-700 dark:text-cyan-400 font-black tracking-[0.4em] uppercase text-[10px]">Strategic Intelligence v3.0</span>
          </div>
          
          <h1 className="text-7xl md:text-9xl font-black text-slate-950 dark:text-white leading-[0.95] tracking-tighter">
            Build Fast. <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-700 via-fuchsia-600 to-cyan-500 dark:from-violet-500 dark:via-fuchsia-500 dark:to-cyan-400">Scale Forever.</span>
          </h1>
          
          <p className="max-w-2xl mx-auto text-xl md:text-2xl text-slate-700 dark:text-slate-400 font-bold leading-relaxed px-4">
            The all-in-one AI co-founder that validates your market, designs your roadmap, and architects your revenue model in seconds.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <button 
            onClick={onContinue}
            className="group relative w-full sm:w-auto px-16 py-7 bg-violet-600 dark:bg-white text-white dark:text-slate-950 rounded-[2rem] font-black text-2xl hover:scale-105 transition-all shadow-2xl dark:shadow-[0_20px_50px_rgba(255,255,255,0.1)] active:scale-95 overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-4">
              Ignite My Idea
              <span className="text-3xl group-hover:translate-x-2 transition-transform">→</span>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-cyan-500 opacity-0 group-hover:opacity-10 dark:group-hover:opacity-100 dark:from-cyan-100 dark:to-violet-100 transition-opacity"></div>
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 pt-24 border-t border-slate-300 dark:border-white/5">
           {[
             { val: "2.5s", label: "Analysis Loop", color: "text-violet-700 dark:text-violet-400" },
             { val: "100%", label: "Secure Analysis", color: "text-cyan-600 dark:text-cyan-400" },
             { val: "V1", label: "MVP Roadmap", color: "text-fuchsia-700 dark:text-fuchsia-400" },
             { val: "99.9", label: "Uptime SLA", color: "text-emerald-700 dark:text-emerald-400" }
           ].map((stat, i) => (
             <div key={i} className="space-y-3 group cursor-default">
                <div className={`text-4xl font-black tracking-tighter ${stat.color} group-hover:scale-110 transition-transform duration-500`}>
                  {stat.val}
                </div>
                <div className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 dark:text-slate-500 group-hover:text-slate-900 dark:group-hover:text-slate-300 transition-colors">
                  {stat.label}
                </div>
             </div>
           ))}
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        .animate-float {
          animation: float 5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default WelcomePage;
