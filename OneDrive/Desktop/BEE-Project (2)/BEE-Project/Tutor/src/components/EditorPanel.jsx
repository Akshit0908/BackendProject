import Editor from "@monaco-editor/react";
import { Play, Rocket } from "lucide-react";

export default function EditorPanel({ code, setCode, onRun, onSubmit }) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-end gap-3 p-2 border-b border-gray-700">
        <button
          onClick={onRun}
          className="flex items-center gap-2 bg-green-600 px-4 py-1 rounded-lg"
        >
          <Play size={16} /> Run
        </button>

        <button
          onClick={onSubmit}
          className="flex items-center gap-2 bg-blue-600 px-4 py-1 rounded-lg"
        >
          <Rocket size={16} /> Submit
        </button>
      </div>

      <Editor
        height="100%"
        defaultLanguage="java"
        theme="vs-dark"
        value={code}
        onChange={(value) => setCode(value)}
      />
    </div>
  );
}