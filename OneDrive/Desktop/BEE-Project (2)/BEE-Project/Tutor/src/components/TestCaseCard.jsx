import { CheckCircle, Lock } from "lucide-react";

export default function TestCaseCard({ title, hidden }) {
  return (
    <div className="bg-[#12123a] p-3 rounded-xl mb-3">
      <div className="flex justify-between items-center">
        <p className="text-sm">{title}</p>
        {hidden ? <Lock className="text-green-400 w-4"/> : <CheckCircle className="text-green-400 w-4"/>}
      </div>
    </div>
  );
}