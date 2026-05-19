import React from "react";

function Footer() {
  return (
    <footer className="mt-20 border-t border-[var(--color-karat-primary)]/20 bg-white/50 backdrop-blur-md px-6 py-12 text-sm text-slate-600">
      <div className="mx-auto w-full max-w-6xl">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <h3 className="text-2xl font-bold tracking-tight text-slate-800">BrainByte</h3>
            <p className="mt-4 max-w-xs text-slate-500 leading-relaxed">
              Learn, build, collaborate, and track your growth with one modern, fluid platform designed for creators.
            </p>
          </div>

          <div>
            <p className="text-base font-bold text-slate-800">Quick Links</p>
            <div className="mt-4 flex flex-col gap-3 font-medium">
              <a href="#" className="hover:text-[var(--color-karat-primary)] transition-colors">Courses</a>
              <a href="#" className="hover:text-[var(--color-karat-primary)] transition-colors">Challenges</a>
              <a href="#" className="hover:text-[var(--color-karat-primary)] transition-colors">Community</a>
            </div>
          </div>

          <div>
            <p className="text-base font-bold text-slate-800">Legal & Support</p>
            <div className="mt-4 flex flex-col gap-3 font-medium">
              <a href="#" className="hover:text-[var(--color-karat-primary)] transition-colors">Privacy</a>
              <a href="#" className="hover:text-[var(--color-karat-primary)] transition-colors">Terms</a>
              <a href="#" className="hover:text-[var(--color-karat-primary)] transition-colors">Support</a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 flex flex-col md:flex-row items-center justify-between text-slate-400 font-medium">
          <p>© {new Date().getFullYear()} BrainByte. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <span className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">X</span>
            <span className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">I</span>
            <span className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">IN</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
