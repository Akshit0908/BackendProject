import React, { useState } from "react";
import CreateCourse from "../components/CreateCourse";
import EditGeneralInfo from "../components/EditGeneralInfo";
import CurriculumBuilder from "../components/CurriculumBuilder";

export default function CourseEditor({ course, setCourse, goBack }) {
  const [tab, setTab] = useState("thumbnail");

  const tabs = [
    { id: "thumbnail", label: "Thumbnail" },
    { id: "general", label: "General Info" },
    { id: "curriculum", label: "Curriculum" }
  ];

  return (
    <div className="min-h-screen text-slate-800 px-6 py-10 pt-24 max-w-7xl mx-auto font-sans">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div className="flex items-center gap-4">
          <button
            onClick={goBack}
            className="secondary-button px-5 py-2.5 flex items-center gap-2 text-sm"
          >
            ← Back
          </button>
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-800">
            Edit Course
          </h1>
        </div>

        <button
          onClick={goBack}
          className="glass-button px-8 py-3.5 text-base shadow-xl active:scale-95 transition-all"
        >
          🚀 Publish Course
        </button>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-3 mb-10 bg-white/40 p-2 rounded-2xl border border-teal-500/5 backdrop-blur-sm self-start inline-flex">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-6 py-2.5 rounded-xl text-sm font-extrabold transition-all duration-300
              ${tab === t.id
                ? "bg-white text-[var(--color-karat-primary)] shadow-md translate-y-[-1px]"
                : "text-slate-400 hover:text-slate-600 hover:bg-white/50"}
            `}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Content Card */}
      <div className="glass-card p-8 lg:p-12 shadow-2xl border-white/80">
        <div className="max-w-4xl mx-auto">
          {tab === "thumbnail" && (
            <CreateCourse course={course} setCourse={setCourse} next={() => setTab("general")} />
          )}

          {tab === "general" && (
            <EditGeneralInfo course={course} setCourse={setCourse} next={() => setTab("curriculum")} />
          )}

          {tab === "curriculum" && (
            <CurriculumBuilder course={course} setCourse={setCourse} />
          )}
        </div>
      </div>
    </div>
  );
}
