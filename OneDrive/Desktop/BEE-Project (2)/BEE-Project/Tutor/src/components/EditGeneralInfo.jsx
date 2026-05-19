import React from "react";

export default function EditGeneralInfo({ course, setCourse }) {
  return (
    <div className="space-y-10">
      <h2 className="text-2xl font-extrabold tracking-tight text-slate-800">General Information</h2>

      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest ml-1">Course Title</label>
          <input
            className="w-full p-4 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-4 focus:ring-teal-500/5 focus:border-[var(--color-karat-primary)] transition-all font-bold text-slate-700"
            placeholder="e.g. Master React in 30 Days"
            value={course.title}
            onChange={(e) => setCourse({ ...course, title: e.target.value })}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest ml-1">Price ($)</label>
            <input
              type="number"
              className="w-full p-4 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-4 focus:ring-teal-500/5 focus:border-[var(--color-karat-primary)] transition-all font-bold text-slate-700"
              placeholder="e.g. 49"
              value={course.price}
              onChange={(e) => setCourse({ ...course, price: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest ml-1">Skill Level</label>
            <select
              className="w-full p-4 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-4 focus:ring-teal-500/5 focus:border-[var(--color-karat-primary)] transition-all font-bold text-slate-700 appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%2394a3b8%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C/polyline%3E%3C/svg%3E')] bg-[length:1.2em_1.2em] bg-[right_1rem_center] bg-no-repeat"
              value={course.level}
              onChange={(e) => setCourse({ ...course, level: e.target.value })}
            >
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-between bg-teal-50/50 px-6 py-5 rounded-2xl border border-teal-500/10 shadow-sm">
          <div className="flex flex-col">
            <span className="font-extrabold text-slate-700 text-sm">Public Visibility</span>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Let anyone discover this course</span>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={course.isPublic}
              onChange={() => setCourse({ ...course, isPublic: !course.isPublic })}
            />
            <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:after:w-5 after:transition-all peer-checked:bg-[var(--color-karat-primary)]"></div>
          </label>
        </div>
      </div>
    </div>
  );
}