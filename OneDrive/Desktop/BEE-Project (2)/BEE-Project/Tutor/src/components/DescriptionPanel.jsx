export default function DescriptionPanel() {
  return (
    <div className="h-full overflow-y-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Two Sum</h1>
      <p className="mb-4 text-gray-300">
        Given an array of integers nums and an integer target, return indices of
        the two numbers such that they add up to target.
      </p>

      <div className="bg-[#020617] p-4 rounded-xl">
        <p className="font-semibold">Example:</p>
        <p className="text-sm text-gray-400">
          Input: nums = [2,7,11,15], target = 9
        </p>
        <p className="text-sm text-gray-400">Output: [0,1]</p>
      </div>
    </div>
  );
}