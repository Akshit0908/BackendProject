export default function ResultPanel({ result }) {
  return (
    <div className="h-1/3 border-t border-gray-700 p-4 bg-[#020617]">
      <h2 className="text-lg font-bold mb-2">Result</h2>

      <p
        className={`font-semibold ${
          result.verdict.includes("Accepted")
            ? "text-green-400"
            : "text-red-400"
        }`}
      >
        {result.verdict}
      </p>

      {result.output && (
        <div className="mt-2 text-sm text-gray-300">
          <p>Output: {result.output}</p>
          <p>Expected: {result.expected}</p>
        </div>
      )}
    </div>
  );
}