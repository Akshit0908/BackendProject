import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

function AuthPage({ onAuthSuccess }) {
  const [mode, setMode] = useState("login");
  const { login, register } = useAuth();
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (mode === "signup" && formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      if (mode === "login") {
        await login(formData.email, formData.password);
      } else {
        await register(formData.name, formData.email, formData.password);
      }
      if (onAuthSuccess) onAuthSuccess();
    } catch (err) {
      setError(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-teal-50 to-sky-100 px-4 py-10 md:py-20 text-slate-800 font-sans flex items-center justify-center">
      <div className="w-full max-w-md glass-card p-8 shadow-xl">
        <div className="mb-8 flex rounded-xl bg-slate-100 p-1 shadow-inner">
          <button
            className={`w-1/2 rounded-lg py-2.5 text-sm font-bold transition-all ${mode === "login"
              ? "bg-white text-[var(--color-karat-primary)] shadow-sm"
              : "text-slate-500 hover:text-slate-700 hover:bg-slate-200/50"
              }`}
            onClick={() => setMode("login")}
          >
            Log In
          </button>
          <button
            className={`w-1/2 rounded-lg py-2.5 text-sm font-bold transition-all ${mode === "signup"
              ? "bg-white text-[var(--color-karat-primary)] shadow-sm"
              : "text-slate-500 hover:text-slate-700 hover:bg-slate-200/50"
              }`}
            onClick={() => setMode("signup")}
          >
            Sign Up
          </button>
        </div>

        <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight text-center">
          {mode === "login" ? "Welcome Back" : "Create Account"}
        </h1>
        <p className="mt-2 text-sm text-slate-500 text-center font-medium">
          {mode === "login"
            ? "Log in to continue your learning journey."
            : "Sign up to start learning and collaborating."}
        </p>

        {error && <div className="mt-4 rounded bg-red-500/20 p-2 text-sm text-red-400 text-center">{error}</div>}

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          {mode === "signup" && (
            <div>
              <label className="mb-1.5 block text-sm font-bold text-slate-700">Full Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Alex Rivera"
                className="w-full rounded-xl border border-slate-200 bg-white/50 px-4 py-3 outline-none focus:border-[var(--color-karat-primary)] focus:ring-2 focus:ring-[var(--color-karat-primary)]/20 transition-all"
              />
            </div>
          )}

          <div>
            <label className="mb-1.5 block text-sm font-bold text-slate-700">Email</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="you@example.com"
              className="w-full rounded-xl border border-slate-200 bg-white/50 px-4 py-3 outline-none focus:border-[var(--color-karat-primary)] focus:ring-2 focus:ring-[var(--color-karat-primary)]/20 transition-all"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-bold text-slate-700">Password</label>
            <input
              type="password"
              required
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="••••••••"
              className="w-full rounded-xl border border-slate-200 bg-white/50 px-4 py-3 outline-none focus:border-[var(--color-karat-primary)] focus:ring-2 focus:ring-[var(--color-karat-primary)]/20 transition-all"
            />
          </div>

          {mode === "signup" && (
            <div>
              <label className="mb-1.5 block text-sm font-bold text-slate-700">Confirm Password</label>
              <input
                type="password"
                required
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                placeholder="••••••••"
                className="w-full rounded-xl border border-slate-200 bg-white/50 px-4 py-3 outline-none focus:border-[var(--color-karat-primary)] focus:ring-2 focus:ring-[var(--color-karat-primary)]/20 transition-all"
              />
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-6 w-full rounded-xl bg-[var(--color-karat-primary)] py-3.5 font-bold text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:hover:translate-y-0 text-lg"
          >
            {loading ? "Please wait..." : (mode === "login" ? "Log In" : "Create Account")}
          </button>
        </form>
      </div>
    </section>
  );
}

export default AuthPage;
