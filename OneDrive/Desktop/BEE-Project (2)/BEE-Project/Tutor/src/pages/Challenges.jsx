import { useMemo, useState } from "react";
import Editor from "@monaco-editor/react";
import { Lock, PanelLeft, Play, Rocket, X } from "lucide-react";

const defaultProblems = [
  {
    id: 1,
    title: "Two Sum",
    difficulty: "Easy",
    solved: true,
    functionName: "twoSum",
    description:
      "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
    constraints: [
      "2 <= nums.length <= 10^4",
      "-10^9 <= nums[i] <= 10^9",
      "-10^9 <= target <= 10^9",
    ],
    starterCode: `function twoSum(nums, target) {
  const seen = {};

  for (let i = 0; i < nums.length; i += 1) {
    const needed = target - nums[i];
    if (seen[needed] !== undefined) {
      return [seen[needed], i];
    }
    seen[nums[i]] = i;
  }

  return [];
}`,
    visibleTests: [
      { id: 1, args: [[2, 7, 11, 15], 9], output: [0, 1] },
      { id: 2, args: [[3, 2, 4], 6], output: [1, 2] },
    ],
    hiddenTests: [
      { args: [[3, 3], 6], output: [0, 1] },
      { args: [[1, 5, 8, 10], 13], output: [1, 2] },
    ],
  },
  {
    id: 2,
    title: "Valid Parentheses",
    difficulty: "Easy",
    solved: false,
    functionName: "isValid",
    description:
      "Given a string containing only ()[]{} characters, determine if the input string is valid.",
    constraints: ["1 <= s.length <= 10^4", "s consists of parentheses only"],
    starterCode: `function isValid(s) {
  const stack = [];
  const pairs = { ")": "(", "]": "[", "}": "{" };

  for (const ch of s) {
    if (ch === "(" || ch === "[" || ch === "{") {
      stack.push(ch);
      continue;
    }
    if (stack.pop() !== pairs[ch]) {
      return false;
    }
  }

  return stack.length === 0;
}`,
    visibleTests: [
      { id: 1, args: ["()[]{}"], output: true },
      { id: 2, args: ["(]"], output: false },
    ],
    hiddenTests: [
      { args: ["([{}])"], output: true },
      { args: ["((("], output: false },
    ],
  },
  {
    id: 3,
    title: "Best Time to Buy and Sell Stock",
    difficulty: "Easy",
    solved: false,
    functionName: "maxProfit",
    description:
      "Given an array prices where prices[i] is the price of a stock on the ith day, return the maximum profit.",
    constraints: ["1 <= prices.length <= 10^5", "0 <= prices[i] <= 10^4"],
    starterCode: `function maxProfit(prices) {
  let minPrice = Infinity;
  let best = 0;

  for (const price of prices) {
    minPrice = Math.min(minPrice, price);
    best = Math.max(best, price - minPrice);
  }

  return best;
}`,
    visibleTests: [
      { id: 1, args: [[7, 1, 5, 3, 6, 4]], output: 5 },
      { id: 2, args: [[7, 6, 4, 3, 1]], output: 0 },
    ],
    hiddenTests: [{ args: [[2, 4, 1]], output: 2 }],
  },
];

function normalize(value) {
  return JSON.stringify(value);
}

function buildRunner(code, functionName) {
  const factory = new Function(
    `${code}
    if (typeof ${functionName} !== "function") {
      throw new Error("Define a function named ${functionName}.");
    }
    return ${functionName};`
  );
  return factory();
}

export default function Challenges({ customChallenges = [] }) {
  const problems = useMemo(
    () => [...customChallenges, ...defaultProblems],
    [customChallenges]
  );
  const [selectedProblemIndex, setSelectedProblemIndex] = useState(0);
  const [code, setCode] = useState(problems[0]?.starterCode || "");
  const [result, setResult] = useState(null);
  const [showProblemList, setShowProblemList] = useState(false);

  const challenge = useMemo(
    () => problems[selectedProblemIndex],
    [problems, selectedProblemIndex]
  );

  const setActiveProblem = (index) => {
    setSelectedProblemIndex(index);
    setCode(problems[index].starterCode);
    setResult(null);
  };

  const runCode = () => {
    if (!challenge) return;
    try {
      const solver = buildRunner(code, challenge.functionName);
      const test = challenge.visibleTests[0];
      const output = solver(...test.args);
      const passed = normalize(output) === normalize(test.output);

      setResult({
        status: passed ? "Accepted" : "Wrong Answer",
        output: normalize(output),
        expected: normalize(test.output),
        mode: "Run",
      });
    } catch (error) {
      setResult({
        status: "Runtime Error",
        output: error instanceof Error ? error.message : "Unknown runtime error",
        expected: "-",
        mode: "Run",
      });
    }
  };

  const submitCode = () => {
    if (!challenge) return;
    try {
      const solver = buildRunner(code, challenge.functionName);

      for (const test of challenge.visibleTests) {
        const output = solver(...test.args);
        if (normalize(output) !== normalize(test.output)) {
          setResult({
            status: `Wrong Answer (Visible Test ${test.id} Failed)`,
            output: normalize(output),
            expected: normalize(test.output),
            mode: "Submit",
          });
          return;
        }
      }

      for (let i = 0; i < challenge.hiddenTests.length; i += 1) {
        const output = solver(...challenge.hiddenTests[i].args);
        if (normalize(output) !== normalize(challenge.hiddenTests[i].output)) {
          setResult({
            status: `Wrong Answer (Hidden Test ${i + 1} Failed)`,
            output: "Hidden",
            expected: "Hidden",
            mode: "Submit",
          });
          return;
        }
      }

      setResult({
        status: "Accepted",
        output: "All test cases passed.",
        expected: "-",
        mode: "Submit",
      });
    } catch (error) {
      setResult({
        status: "Runtime Error",
        output: error instanceof Error ? error.message : "Unknown runtime error",
        expected: "-",
        mode: "Submit",
      });
    }
  };

  if (!challenge) {
    return (
      <section className="min-h-[calc(100vh-64px)] p-6 text-slate-800">
        <div className="rounded-2xl border border-teal-500/10 bg-white/60 backdrop-blur-xl p-8 text-center shadow-lg">
          <h1 className="text-2xl font-extrabold tracking-tight">No challenges available</h1>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-[calc(100vh-64px)] text-slate-800 p-4 md:p-6">
      <button
        className="mb-4 inline-flex items-center gap-2 rounded-xl border border-teal-500/10 bg-white/70 px-4 py-2 text-sm font-bold shadow-sm hover:translate-y-[-2px] transition-all hover:shadow-md text-[var(--color-karat-primary)]"
        onClick={() => setShowProblemList(true)}
      >
        <PanelLeft size={16} />
        Problems
      </button>

      {showProblemList && (
        <div className="fixed inset-0 z-40 bg-slate-900/10 backdrop-blur-sm" onClick={() => setShowProblemList(false)} />
      )}

      <aside
        className={`fixed left-0 top-16 z-50 h-[calc(100vh-64px)] w-[300px] transform border-r border-teal-500/10 bg-white/80 backdrop-blur-2xl p-6 transition-transform duration-500 ease-in-out shadow-2xl ${showProblemList ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-extrabold tracking-tight text-slate-800">Problem List</h2>
          <button
            className="rounded-full bg-slate-100 p-1.5 hover:bg-slate-200 transition-colors"
            onClick={() => setShowProblemList(false)}
          >
            <X size={16} className="text-slate-500" />
          </button>
        </div>
        <div className="space-y-3 max-h-[calc(100vh-160px)] overflow-y-auto scrollbar-hide pr-1">
          {problems.map((problem, index) => (
            <button
              key={problem.id}
              className={`w-full rounded-2xl border p-4 text-left transition-all duration-300 ${index === selectedProblemIndex
                ? "border-[var(--color-karat-primary)] bg-teal-50/50 shadow-sm"
                : "border-slate-100 bg-white/40 hover:bg-white/70"
                }`}
              onClick={() => setActiveProblem(index)}
            >
              <p className="font-extrabold text-slate-800">{problem.id}. {problem.title}</p>
              <div className="mt-2 flex items-center justify-between text-xs">
                <span className="font-bold text-[var(--color-karat-primary)]">{problem.difficulty}</span>
                <span className={`font-bold ${problem.solved ? "text-teal-600" : "text-slate-400"}`}>
                  {problem.solved ? "Solved" : "Unsolved"}
                </span>
              </div>
            </button>
          ))}
        </div>
      </aside>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <article className="rounded-3xl border border-teal-500/10 bg-white/60 backdrop-blur-xl p-8 shadow-lg flex flex-col">
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-800">{challenge.title}</h1>
            <span className="rounded-lg bg-teal-50 px-3 py-1.5 text-xs font-extrabold tracking-widest text-[var(--color-karat-primary)] uppercase">
              {challenge.difficulty}
            </span>
          </div>

          <div className="mb-8 flex gap-3">
            <button
              className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-600 hover:bg-slate-50 disabled:opacity-30 transition-all shadow-sm"
              disabled={selectedProblemIndex === 0}
              onClick={() => setActiveProblem(selectedProblemIndex - 1)}
            >
              Previous
            </button>
            <button
              className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-600 hover:bg-slate-50 disabled:opacity-30 transition-all shadow-sm"
              disabled={selectedProblemIndex === problems.length - 1}
              onClick={() => setActiveProblem(selectedProblemIndex + 1)}
            >
              Next
            </button>
          </div>

          <div className="space-y-6 flex-1">
            <div>
              <p className="text-slate-600 font-medium leading-relaxed">{challenge.description}</p>
            </div>

            <div>
              <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Constraints</h2>
              <ul className="list-inside list-disc text-sm text-slate-600 font-medium space-y-1.5">
                {challenge.constraints.map((item) => (
                  <li key={item} className="pl-1">{item}</li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Visible Test Cases</h2>
              <div className="space-y-3">
                {challenge.visibleTests.map((test) => (
                  <div key={test.id} className="rounded-2xl border border-slate-100 bg-slate-50/50 p-4 text-sm font-mono">
                    <p className="text-slate-500 mb-1"><span className="text-teal-600 font-bold">Input:</span> {normalize(test.args)}</p>
                    <p className="text-slate-500"><span className="text-sky-600 font-bold">Output:</span> {normalize(test.output)}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-amber-200 bg-amber-50/30 p-4 text-sm font-medium text-amber-800">
              <p className="flex items-center gap-2">
                <Lock size={16} className="text-amber-500" />
                {challenge.hiddenTests.length} hidden test cases are used during submission.
              </p>
            </div>
          </div>
        </article>

        <article className="flex min-h-[580px] flex-col rounded-3xl border border-teal-500/10 bg-white/70 backdrop-blur-xl shadow-xl overflow-hidden">
          <header className="flex items-center justify-end gap-3 border-b border-slate-100 p-4 bg-white/50">
            <button
              type="button"
              onClick={runCode}
              className="flex items-center gap-2 rounded-xl bg-slate-100 px-5 py-2.5 text-sm font-extrabold text-slate-700 hover:bg-slate-200 transition-all shadow-sm active:scale-95"
            >
              <Play size={16} />
              Run
            </button>
            <button
              type="button"
              onClick={submitCode}
              className="flex items-center gap-2 rounded-xl bg-[var(--color-karat-primary)] px-5 py-2.5 text-sm font-extrabold text-white hover:opacity-90 transition-all shadow-[0_4px_12px_rgba(26,187,164,0.3)] active:scale-95"
            >
              <Rocket size={16} />
              Submit
            </button>
          </header>

          <div className="flex-1 bg-white">
            <Editor
              height="100%"
              defaultLanguage="javascript"
              theme="light"
              value={code}
              options={{
                fontSize: 14,
                fontFamily: "'Fira Code', monospace",
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                padding: { top: 20 },
              }}
              onChange={(value) => setCode(value || "")}
            />
          </div>

          <footer className="border-t border-slate-100 bg-slate-50/80 p-5 text-sm">
            {result ? (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${result.status.includes("Accepted") ? "bg-teal-500" : "bg-rose-500"}`} />
                  <p className={`font-extrabold uppercase tracking-widest text-[10px] ${result.status.includes("Accepted") ? "text-teal-600" : "text-rose-600"}`}>
                    {result.mode}: {result.status}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4 font-mono">
                  <div className="bg-white p-3 rounded-xl border border-slate-100">
                    <p className="text-[10px] text-slate-400 font-bold mb-1 uppercase">Output</p>
                    <p className="text-slate-600 truncate">{result.output}</p>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-slate-100">
                    <p className="text-[10px] text-slate-400 font-bold mb-1 uppercase">Expected</p>
                    <p className="text-slate-600 truncate">{result.expected}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-slate-400 italic">
                <Play size={14} />
                <p>Run or submit to see results. All tests will be evaluated.</p>
              </div>
            )}
          </footer>
        </article>
      </div>
    </section>
  );
}
