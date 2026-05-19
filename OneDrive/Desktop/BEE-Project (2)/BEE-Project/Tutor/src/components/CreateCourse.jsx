import React from "react";

export default function CreateCourse({ course, setCourse }) {
  return (
    <div className="space-y-10">
      <h2 className="text-2xl font-extrabold tracking-tight text-slate-800">Course Identity</h2>

      <div className="space-y-8">
        <div className="space-y-3">
          <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest ml-1">Thumbnail Cover</label>
          <div className="border-2 border-dashed border-teal-500/20 rounded-3xl p-10 text-center bg-teal-50/20 backdrop-blur-sm group hover:border-[var(--color-karat-primary)] hover:bg-teal-50/40 transition-all cursor-pointer">
            <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <span className="text-2xl">🖼️</span>
            </div>
            <p className="mb-4 text-slate-500 font-bold text-sm">Drag and drop or click to upload</p>

            <input
              type="file"
              className="text-xs font-bold text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-extrabold file:bg-white file:text-[var(--color-karat-primary)] hover:file:bg-teal-50 transition-all"
              onChange={(e) =>
                setCourse({ ...course, thumbnail: e.target.files[0] })
              }
            />

            {course.thumbnail && (
              <div className="mt-4 flex items-center justify-center gap-2 text-teal-600 font-extrabold text-xs">
                <span>✔</span>
                <span>{course.thumbnail.name} selected</span>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest ml-1">Display Title</label>
          <input
            className="w-full p-4 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-4 focus:ring-teal-500/5 focus:border-[var(--color-karat-primary)] transition-all font-bold text-slate-700"
            placeholder="e.g. Master the Art of Design"
            value={course.title}
            onChange={(e) =>
              setCourse({ ...course, title: e.target.value })
            }
          />
        </div>
      </div>
    </div>
  );
}