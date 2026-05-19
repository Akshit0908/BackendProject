import React from "react";

function CyberpunkHome({ onGetStartedClick }) {
  return (
    <section className="min-h-screen pt-28 pb-16 px-6 relative flex flex-col items-center justify-center overflow-hidden">

      {/* Background Decorative Elements */}
      <div className="absolute top-1/4 left-10 w-64 h-64 bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-float"></div>
      <div className="absolute top-1/3 right-10 w-72 h-72 bg-sky-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-float-delay"></div>

      {/* Background subtle wavy pattern or shapes */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20"
        style={{ backgroundImage: 'radial-gradient(circle at 20px 20px, rgba(26, 187, 164, 0.4) 2px, transparent 0)', backgroundSize: '40px 40px' }} />

      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
        {/* Left Column: Text Content */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-800 leading-[1.1] mb-6">
            Learning tailored <br />
            <span className="text-[var(--color-karat-primary)]">for creators</span>
          </h1>

          <p className="text-lg md:text-xl text-slate-600 mb-8 max-w-xl mx-auto md:mx-0 leading-relaxed font-medium">
            Let's get you the skills you deserve. Upgrade your knowledge, build projects, and collaborate in a modern, streamlined environment.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start items-center">
            <button className="glass-button px-8 py-3 text-lg" onClick={onGetStartedClick}>
              Get started for free today
            </button>
            <p className="text-sm font-medium text-slate-500 mt-2 sm:mt-0 sm:ml-4">
              Need to level up? <a href="#" className="text-[var(--color-karat-primary)] hover:underline">We can help</a>
            </p>
          </div>
        </div>

        {/* Right Column: Floating Cards Display */}
        <div className="flex-1 relative w-full h-[500px] hidden md:block">
          {/* Main big floating card */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-96 glass-card p-6 rotate-3 hover:rotate-0 transition-transform duration-500 z-20 flex flex-col justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-200" />
              <div>
                <p className="text-sm font-bold text-slate-800">@creative_mind</p>
                <p className="text-xs text-slate-500">Learning WebGL</p>
              </div>
            </div>
            <div className="w-full h-48 bg-gradient-to-br from-teal-100 to-sky-100 rounded-2xl my-4 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-white/60 flex items-center justify-center shadow-lg">
                <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[12px] border-l-teal-500 border-b-[8px] border-b-transparent ml-1" />
              </div>
            </div>
            <div className="flex justify-between items-center bg-white/50 p-3 rounded-xl">
              <span className="text-sm font-bold text-slate-800 flex items-center gap-1">
                <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                34.8k Learners
              </span>
            </div>
          </div>

          {/* Secondary small floating card 1 */}
          <div className="absolute top-10 right-0 w-48 glass-card p-4 -rotate-6 hover:-rotate-0 transition-transform duration-500 z-10 animate-float">
            <div className="w-12 h-12 bg-teal-100 rounded-full mb-3 flex items-center justify-center">
              <span className="text-2xl">🌱</span>
            </div>
            <p className="font-bold text-slate-800 text-sm mb-1">Solve Challenge</p>
            <p className="text-xs text-slate-500 leading-tight"> Foster problem solving skills and sharpen your mind</p>
          </div>

          {/* Secondary small floating card 2 */}
          <div className="absolute bottom-10 left-0 w-56 glass-card p-4 rotate-6 hover:rotate-0 transition-transform duration-500 z-30 animate-float-delay">
            <p className="font-bold text-slate-800 text-sm mb-3">Track your progress</p>
            <div className="h-2 w-full bg-slate-100 rounded-full mb-2 overflow-hidden">
              <div className="h-full bg-[var(--color-karat-primary)] w-3/4 rounded-full"></div>
            </div>
            <div className="h-2 w-full bg-slate-100 rounded-full mb-2 overflow-hidden">
              <div className="h-full bg-teal-300 w-1/2 rounded-full"></div>
            </div>
            <p className="text-[10px] text-slate-400 mt-2 text-right">View progress</p>
          </div>
        </div>
      </div>

    </section>
  );
}

export default CyberpunkHome;
