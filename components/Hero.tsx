
import React, { useState, useEffect } from 'react';

interface HeroProps {
  onStart: () => void;
  onShowDemo: () => void;
  userName?: string;
  userRole?: string;
  isLoggedIn?: boolean;
}

const quotes = [
  { text: "The secret to getting ahead is getting started.", author: "Mark Twain", category: "Momentum" },
  { text: "Don't find customers for your products, find products for your customers.", author: "Seth Godin", category: "Market Fit" },
  { text: "Ideas are easy. Implementation is hard.", author: "Guy Kawasaki", category: "Execution" },
  { text: "If you're not embarrassed by the first version of your product, you've launched too late.", author: "Reid Hoffman", category: "Lean" },
  { text: "Make every detail perfect and limit the number of details to perfect.", author: "Jack Dorsey", category: "Focus" },
  { text: "Your most unhappy customers are your greatest source of learning.", author: "Bill Gates", category: "Feedback" },
  { text: "The best way to predict the future is to create it.", author: "Peter Drucker", category: "Vision" },
  { text: "Innovation distinguishes between a leader and a follower.", author: "Steve Jobs", category: "Innovation" },
  { text: "Complexity is your enemy. Any fool can make something complicated. It is hard to keep things simple.", author: "Richard Branson", category: "Simplicity" },
  { text: "The value of an idea lies in the using of it.", author: "Thomas Edison", category: "Utility" },
  { text: "Timing, perseverance, and ten years of trying will eventually make you look like an overnight success.", author: "Biz Stone", category: "Persistence" },
  { text: "Move fast and break things. Unless you are breaking stuff, you are not moving fast enough.", author: "Mark Zuckerberg", category: "Speed" },
  { text: "Be so good they can't ignore you.", author: "Steve Martin", category: "Excellence" },
  { text: "Always deliver more than expected.", author: "Larry Page", category: "Value" },
  { text: "Stay hungry, stay foolish.", author: "Steve Jobs", category: "Mindset" },
  { text: "A brand for a company is like a reputation for a person. You earn reputation by trying to do hard things well.", author: "Jeff Bezos", category: "Brand" },
  { text: "Don't be afraid to give up the good to go for the great.", author: "John D. Rockefeller", category: "Ambition" },
  { text: "Chase the vision, not the money; the money will end up following you.", author: "Tony Hsieh", category: "Vision" },
  { text: "If you can dream it, you can do it.", author: "Walt Disney", category: "Belief" },
  { text: "Everything is figureoutable.", author: "Marie Forleo", category: "Problem Solving" }
];

const Hero: React.FC<HeroProps> = ({ onStart, onShowDemo, userName, userRole, isLoggedIn }) => {
  const [quote, setQuote] = useState(quotes[0]);

  useEffect(() => {
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  }, []);

  return (
    <div className="relative transition-colors duration-300">
      <div className="overflow-hidden pt-12 pb-20 lg:pt-24 lg:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          
          <div className="inline-flex items-center gap-2 bg-violet-100/50 dark:bg-violet-900/30 text-violet-900 dark:text-violet-300 px-5 py-2 rounded-full text-xs font-black mb-10 border border-violet-200 dark:border-violet-800 shadow-sm animate-fade-in">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            Accelerate your Startup with Gemini 3 Flash
          </div>

          <h1 className="text-5xl lg:text-8xl font-black text-slate-950 dark:text-white tracking-tighter mb-8 leading-[1.1]">
            Build Your Legacy, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-700 via-fuchsia-600 to-cyan-600">One Milestone at a Time.</span>
          </h1>
          
          <p className="max-w-2xl mx-auto text-xl text-slate-800 dark:text-slate-400 mb-12 leading-relaxed font-bold">
            We turn ambition into a structured reality. Use the world's fastest AI strategist to blueprint your path to product-market fit.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <button 
              onClick={onStart}
              className="w-full sm:w-auto px-12 py-5 bg-violet-600 text-white rounded-2xl font-black text-xl hover:bg-violet-700 hover:-translate-y-1 transition-all shadow-xl shadow-violet-500/30 dark:shadow-none active:scale-95"
            >
              {isLoggedIn ? 'Launch New Strategy' : 'Start My Roadmap'}
            </button>
            <button 
              onClick={onShowDemo}
              className="w-full sm:w-auto px-12 py-5 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 border-2 border-slate-300 dark:border-slate-700 rounded-2xl font-black text-xl hover:bg-slate-50 dark:hover:bg-slate-700 hover:-translate-y-1 transition-all shadow-lg"
            >
              View Sample
            </button>
          </div>

          {/* Motivational Quote Card */}
          <div className="max-w-3xl mx-auto mb-20 animate-slide-up-reveal">
             <div className="bg-white/90 dark:bg-slate-900/40 backdrop-blur-xl p-10 rounded-[3rem] border border-violet-200 dark:border-violet-900/30 relative group overflow-hidden shadow-2xl shadow-violet-500/5">
                <div className="absolute -top-10 -left-10 w-32 h-32 bg-violet-500/10 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl"></div>
                
                <div className="flex flex-col items-center gap-6">
                  <div className="px-3 py-1 bg-violet-100 dark:bg-violet-900/50 rounded-lg text-[10px] font-black uppercase tracking-[0.2em] text-violet-700 dark:text-cyan-400">
                    {quote.category}
                  </div>
                  <p className="text-slate-950 dark:text-slate-100 text-2xl font-black italic leading-tight text-center relative z-10 max-w-xl">
                    "{quote.text}"
                  </p>
                  <div className="flex items-center justify-center gap-4">
                    <div className="h-px w-10 bg-violet-300 dark:bg-violet-800"></div>
                    <span className="text-[12px] font-black uppercase tracking-widest text-slate-800 dark:text-slate-400">— {quote.author}</span>
                    <div className="h-px w-10 bg-violet-300 dark:bg-violet-800"></div>
                  </div>
                </div>
             </div>
          </div>
        </div>
      </div>

      <div className="py-24 border-t border-slate-300 dark:border-slate-800/50 bg-white/50 dark:bg-slate-950/20 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Strategic Edge", text: "Identify hidden market gaps before your competitors do.", icon: "🎯", color: "from-violet-600 to-violet-800" },
              { title: "Rapid Validation", text: "Test concepts in seconds instead of months of manual research.", icon: "⚡", color: "from-cyan-500 to-cyan-700" },
              { title: "Investor Ready", text: "Professional pitch summaries and feature roadmaps at your fingertips.", icon: "🚀", color: "from-fuchsia-600 to-fuchsia-800" }
            ].map((feature, i) => (
              <div key={i} className="group p-10 rounded-[2.5rem] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-violet-500 dark:hover:border-cyan-500 transition-all hover:shadow-2xl">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} text-white flex items-center justify-center text-3xl mb-8 group-hover:scale-110 transition-transform shadow-lg`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-black text-slate-950 dark:text-white mb-3">{feature.title}</h3>
                <p className="text-slate-800 dark:text-slate-400 leading-relaxed font-bold">{feature.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
