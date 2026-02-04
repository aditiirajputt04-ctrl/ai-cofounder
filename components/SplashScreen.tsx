
import React, { useEffect } from 'react';

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  useEffect(() => {
    // Reduced duration for faster perceived load
    const timer = setTimeout(onComplete, 1200);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-white dark:bg-slate-950 flex flex-col items-center justify-center z-[100] animate-fade-in transition-colors duration-500">
      <div className="flex flex-col items-center">
        <div className="w-20 h-20 bg-violet-600 rounded-[2rem] flex items-center justify-center mb-6 shadow-2xl shadow-violet-500/20 animate-bounce">
          <span className="text-white font-black text-4xl">SG</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tighter animate-pulse uppercase italic">
          StartUp<span className="text-violet-600">Genie</span>
        </h1>
        <div className="mt-8 flex gap-1">
          <div className="w-2 h-2 rounded-full bg-violet-600 animate-bounce [animation-delay:-0.3s]"></div>
          <div className="w-2 h-2 rounded-full bg-violet-600 animate-bounce [animation-delay:-0.15s]"></div>
          <div className="w-2 h-2 rounded-full bg-violet-600 animate-bounce"></div>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
