function PremiumPlans({ isPremium = false, onSelectPlan = () => { }, onCancelSubscription = () => { }, onBack = () => { } }) {
  return (
    <section className="mx-auto max-w-5xl px-6 py-20 pt-32 text-slate-800">
      <div className="mb-16 text-center">
        <h1 className="text-5xl font-extrabold text-slate-800 tracking-tight">Choose Your Premium Plan</h1>
        <p className="mt-4 text-slate-500 font-medium text-lg leading-relaxed max-w-2xl mx-auto">
          Unlock Contribute access and advanced creator tools with a premium subscription. Join our elite circle of creators.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Monthly Plan */}
        <div className="rounded-3xl border border-teal-500/10 bg-white/60 backdrop-blur-xl p-10 shadow-xl flex flex-col hover:translate-y-[-4px] transition-all duration-300">
          <p className="text-[10px] uppercase font-extrabold tracking-[0.2em] text-slate-400">Standard Access</p>
          <div className="mt-4 flex items-baseline gap-1">
            <h2 className="text-5xl font-extrabold text-slate-800">$9.99</h2>
            <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">/ Month</span>
          </div>
          <ul className="mt-10 space-y-4 text-sm font-medium text-slate-600 flex-1">
            <li className="flex items-center gap-3">
              <span className="text-teal-500 font-bold">✓</span>
              Contribute tab access
            </li>
            <li className="flex items-center gap-3">
              <span className="text-teal-500 font-bold">✓</span>
              Create and upload challenges
            </li>
            <li className="flex items-center gap-3">
              <span className="text-teal-500 font-bold">✓</span>
              Basic community recognition
            </li>
          </ul>
          <button
            className="mt-10 secondary-button w-full py-4 text-sm"
            onClick={() => onSelectPlan('monthly')}
          >
            {isPremium ? 'Switch to Monthly' : 'Get Started'}
          </button>
        </div>

        {/* Yearly Plan */}
        <div className="rounded-3xl border border-[var(--color-karat-primary)] bg-white/80 backdrop-blur-xl p-10 shadow-2xl flex flex-col relative overflow-hidden group hover:translate-y-[-4px] transition-all duration-300">
          <div className="absolute top-0 right-0 bg-[var(--color-karat-primary)] text-white text-[10px] font-extrabold px-6 py-2 rounded-bl-2xl uppercase tracking-widest shadow-lg">
            Best Value
          </div>
          <p className="text-[10px] uppercase font-extrabold tracking-[0.2em] text-[var(--color-karat-primary)]">Pro Access</p>
          <div className="mt-4 flex items-baseline gap-1">
            <h2 className="text-5xl font-extrabold text-slate-800">$79.99</h2>
            <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">/ Year</span>
          </div>
          <p className="mt-2 text-xs font-bold text-teal-600 uppercase tracking-widest">Save 33% annually</p>
          <ul className="mt-10 space-y-4 text-sm font-medium text-slate-600 flex-1">
            <li className="flex items-center gap-3 font-bold text-slate-800">
              <span className="text-teal-500 font-bold">✓</span>
              Everything in Monthly
            </li>
            <li className="flex items-center gap-3">
              <span className="text-teal-500 font-bold">✓</span>
              Early access to new features
            </li>
            <li className="flex items-center gap-3">
              <span className="text-teal-500 font-bold">✓</span>
              Premium badge for profile
            </li>
          </ul>
          <button
            className="mt-10 glass-button w-full py-4 text-sm shadow-[0_8px_20px_rgba(26,187,164,0.3)]"
            onClick={() => onSelectPlan('yearly')}
          >
            {isPremium ? 'Switch to Yearly' : 'Get Yearly Pro'}
          </button>
        </div>
      </div>

      <div className="mt-16 flex flex-col items-center gap-6">
        {isPremium && (
          <button
            className="text-xs font-bold text-slate-400 hover:text-rose-500 transition-colors uppercase tracking-widest"
            onClick={onCancelSubscription}
          >
            Cancel Subscription
          </button>
        )}
        <button
          className="secondary-button px-12 py-3 text-sm"
          onClick={onBack}
        >
          ← Back to Dashboard
        </button>
      </div>
    </section>
  )
}

export default PremiumPlans
