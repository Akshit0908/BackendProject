import { useState } from "react";

const defaultStarterCode = `function solution() {
  // write your solution
}`;

const defaultVisibleTests = `[
  { "id": 1, "args": [1], "output": 1 }
]`;

const defaultHiddenTests = `[
  { "args": [2], "output": 2 }
]`;

export default function ChallengeUploader({ onSave, onCancel }) {
  const [form, setForm] = useState({
    title: "",
    difficulty: "Easy",
    functionName: "",
    description: "",
    constraints: "",
    starterCode: defaultStarterCode,
    visibleTests: defaultVisibleTests,
    hiddenTests: defaultHiddenTests,
  });
  const [error, setError] = useState("");

  const setField = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");

    try {
      const constraints = form.constraints
        .split("\n")
        .map((item) => item.trim())
        .filter(Boolean);

      const visibleTests = JSON.parse(form.visibleTests);
      const hiddenTests = JSON.parse(form.hiddenTests);

      if (
        !form.title.trim() ||
        !form.functionName.trim() ||
        !form.description.trim() ||
        !constraints.length ||
        !form.starterCode.trim()
      ) {
        setError("All fields are required.");
        return;
      }

      if (!Array.isArray(visibleTests) || visibleTests.length === 0) {
        setError("Visible tests must be a non-empty JSON array.");
        return;
      }

      if (!Array.isArray(hiddenTests) || hiddenTests.length === 0) {
        setError("Hidden tests must be a non-empty JSON array.");
        return;
      }

      const normalizedVisibleTests = visibleTests.map((test, index) => ({
        id: Number(test?.id) || index + 1,
        args: test?.args ?? [],
        output: test?.output,
      }));

      const normalizedHiddenTests = hiddenTests.map((test) => ({
        args: test?.args ?? [],
        output: test?.output,
      }));

      onSave({
        id: Date.now(),
        title: form.title.trim(),
        difficulty: form.difficulty,
        solved: false,
        functionName: form.functionName.trim(),
        description: form.description.trim(),
        constraints,
        starterCode: form.starterCode,
        visibleTests: normalizedVisibleTests,
        hiddenTests: normalizedHiddenTests,
      });
    } catch {
      setError("Test cases must be valid JSON arrays.");
    }
  };

  return (
    <section className="min-h-[calc(100vh-64px)] px-4 py-12 pt-24 text-slate-800 md:px-8 max-w-7xl mx-auto">
      <div className="glass-card p-8 lg:p-12 shadow-2xl border-white/80 max-w-4xl mx-auto">
        <button
          type="button"
          className="secondary-button mb-8 px-5 py-2 text-sm flex items-center gap-2"
          onClick={onCancel}
        >
          ← Back to Contribute
        </button>
        <h1 className="mb-8 text-4xl font-extrabold tracking-tight text-slate-800">Upload Challenge</h1>
        <form className="space-y-8" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 ml-1">Title</label>
            <input
              className="w-full rounded-2xl border border-slate-100 bg-slate-50/50 px-4 py-3 outline-none focus:border-[var(--color-karat-primary)] focus:ring-4 focus:ring-teal-500/5 transition-all text-slate-700 font-medium"
              value={form.title}
              onChange={(e) => setField("title", e.target.value)}
              placeholder="e.g. Reverse a Linked List"
              required
            />
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 ml-1">Difficulty</label>
              <select
                className="w-full rounded-2xl border border-slate-100 bg-slate-50/50 px-4 py-3 outline-none focus:border-[var(--color-karat-primary)] transition-all text-slate-700 font-medium appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%2394a3b8%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C/polyline%3E%3C/svg%3E')] bg-[length:1.2em_1.2em] bg-[right_1rem_center] bg-no-repeat"
                value={form.difficulty}
                onChange={(e) => setField("difficulty", e.target.value)}
              >
                <option>Easy</option>
                <option>Medium</option>
                <option>Hard</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 ml-1">Function Name</label>
              <input
                className="w-full rounded-2xl border border-slate-100 bg-slate-50/50 px-4 py-3 outline-none focus:border-[var(--color-karat-primary)] transition-all text-slate-700 font-medium font-mono"
                value={form.functionName}
                onChange={(e) => setField("functionName", e.target.value)}
                placeholder="e.g. reverseList"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 ml-1">Description</label>
            <textarea
              rows={4}
              className="w-full rounded-2xl border border-slate-100 bg-slate-50/50 px-4 py-3 outline-none focus:border-[var(--color-karat-primary)] transition-all text-slate-700 font-medium leading-relaxed"
              value={form.description}
              onChange={(e) => setField("description", e.target.value)}
              placeholder="Describe the problem clearly..."
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 ml-1">Constraints (one per line)</label>
            <textarea
              rows={4}
              className="w-full rounded-2xl border border-slate-100 bg-slate-50/50 px-4 py-3 outline-none focus:border-[var(--color-karat-primary)] transition-all text-slate-700 font-medium font-mono text-sm"
              value={form.constraints}
              onChange={(e) => setField("constraints", e.target.value)}
              placeholder="1 <= nums.length <= 10^5"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 ml-1">Starter Code</label>
            <textarea
              rows={8}
              className="w-full rounded-2xl border border-slate-100 bg-slate-100/50 px-4 py-4 font-mono text-sm outline-none focus:border-[var(--color-karat-primary)] transition-all text-slate-700 leading-relaxed"
              value={form.starterCode}
              onChange={(e) => setField("starterCode", e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 ml-1">
                Visible Test Cases (JSON)
              </label>
              <textarea
                rows={6}
                className="w-full rounded-2xl border border-slate-100 bg-slate-100/50 px-4 py-4 font-mono text-sm outline-none focus:border-[var(--color-karat-primary)] transition-all text-slate-700"
                value={form.visibleTests}
                onChange={(e) => setField("visibleTests", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 ml-1">
                Hidden Test Cases (JSON)
              </label>
              <textarea
                rows={6}
                className="w-full rounded-2xl border border-slate-100 bg-slate-100/50 px-4 py-4 font-mono text-sm outline-none focus:border-[var(--color-karat-primary)] transition-all text-slate-700"
                value={form.hiddenTests}
                onChange={(e) => setField("hiddenTests", e.target.value)}
                required
              />
            </div>
          </div>

          {error ? <p className="text-sm font-bold text-rose-500 px-2 py-3 bg-rose-50 rounded-xl border border-rose-100">{error}</p> : null}

          <div className="flex items-center gap-4 pt-4">
            <button type="submit" className="glass-button px-8 py-3.5 shadow-xl active:scale-95 transition-all">
              Save Challenge
            </button>
            <button
              type="button"
              className="secondary-button px-8 py-3.5 shadow-sm active:scale-95 transition-all"
              onClick={onCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
