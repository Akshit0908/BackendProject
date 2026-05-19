import React, { useState } from "react";

export default function CurriculumBuilder({ course, setCourse }) {
  const [sectionTitle, setSectionTitle] = useState("");
  const [editingLesson, setEditingLesson] = useState(null); // { sectionId, lesson }

  // 🛡 Safe fallback
  const sections = course?.sections || [];

  // ➕ Add Section
  const addSection = () => {
    if (!sectionTitle.trim()) return;

    const newSection = {
      id: Date.now(),
      title: sectionTitle,
      lessons: []
    };

    setCourse({
      ...course,
      sections: [...sections, newSection]
    });

    setSectionTitle("");
  };

  // ➕ Add Lesson
  const addLesson = (sectionId) => {
    const updatedSections = sections.map((sec) => {
      if (sec.id === sectionId) {
        return {
          ...sec,
          lessons: [
            ...sec.lessons,
            {
              id: Date.now(),
              title: "New Lesson",
              duration: "5:00",
              content: ""
            }
          ]
        };
      }
      return sec;
    });

    setCourse({
      ...course,
      sections: updatedSections
    });
  };

  // 📝 Update Lesson
  const updateLesson = (sectionId, lessonId, updates) => {
    const updatedSections = sections.map((sec) => {
      if (sec.id === sectionId) {
        return {
          ...sec,
          lessons: sec.lessons.map((lesson) =>
            lesson.id === lessonId ? { ...lesson, ...updates } : lesson
          )
        };
      }
      return sec;
    });

    setCourse({
      ...course,
      sections: updatedSections
    });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center pb-6 border-b border-slate-100">
        <h2 className="text-2xl font-extrabold tracking-tight text-slate-800">Course Curriculum</h2>

        <div className="px-4 py-1.5 rounded-full bg-teal-50 text-xs font-bold text-[var(--color-karat-primary)] uppercase tracking-widest border border-teal-500/10">
          {sections.length} Sections •{" "}
          {sections.reduce((a, s) => a + s.lessons.length, 0)} Lessons
        </div>
      </div>

      {/* Sections List */}
      <div className="space-y-6">
        {sections.map((sec) => (
          <div
            key={sec.id}
            className="bg-white/50 border border-slate-100 p-6 rounded-2xl shadow-sm transition-all hover:bg-white"
          >
            {/* Section Title */}
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-extrabold text-slate-800">
                {sec.title}
              </h3>

              <button
                onClick={() => addLesson(sec.id)}
                className="text-xs px-4 py-2 rounded-xl bg-slate-100 font-bold text-slate-600 hover:bg-slate-200 transition-all border border-slate-200 shadow-sm"
              >
                + Add Lesson
              </button>
            </div>

            {/* Lessons */}
            <div className="space-y-3">
              {sec.lessons.length === 0 && (
                <div className="py-6 text-center border-2 border-dashed border-slate-100 rounded-xl">
                  <p className="text-slate-400 text-sm italic font-medium">
                    No lessons in this section yet
                  </p>
                </div>
              )}

              {sec.lessons.map((lesson) => (
                <div key={lesson.id} className="space-y-3">
                  <div
                    className="flex justify-between items-center bg-white px-5 py-4 rounded-xl border border-slate-100 shadow-sm group hover:border-[var(--color-karat-primary)] transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-teal-50 group-hover:text-[var(--color-karat-primary)] transition-all">
                        📘
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-extrabold text-slate-700">
                          {lesson.title}
                        </span>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">
                          {lesson.duration}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => setEditingLesson({ sectionId: sec.id, ...lesson })}
                      className="text-[10px] uppercase font-extrabold tracking-widest px-4 py-2 rounded-lg bg-teal-50 text-[var(--color-karat-primary)] border border-teal-500/10 hover:bg-teal-500 hover:text-white transition-all shadow-sm"
                    >
                      Edit Content
                    </button>
                  </div>

                  {/* Inline Editor for Lesson */}
                  {editingLesson?.id === lesson.id && (
                    <div className="p-6 bg-teal-50/30 border border-teal-500/10 rounded-2xl space-y-5 animate-in fade-in zoom-in-95 duration-300">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        <div className="md:col-span-2">
                          <label className="text-[10px] font-extrabold text-slate-400 block mb-2 uppercase tracking-widest">Lesson Title</label>
                          <input
                            value={editingLesson.title}
                            onChange={(e) => setEditingLesson({ ...editingLesson, title: e.target.value })}
                            className="w-full p-3 text-sm font-bold rounded-xl bg-white border border-slate-200 focus:outline-none focus:ring-4 focus:ring-teal-500/5 focus:border-[var(--color-karat-primary)] transition-all"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-extrabold text-slate-400 block mb-2 uppercase tracking-widest">Duration</label>
                          <input
                            value={editingLesson.duration}
                            onChange={(e) => setEditingLesson({ ...editingLesson, duration: e.target.value })}
                            placeholder="e.g. 5:00"
                            className="w-full p-3 text-sm font-bold rounded-xl bg-white border border-slate-200 focus:outline-none focus:ring-4 focus:ring-teal-500/5 focus:border-[var(--color-karat-primary)] transition-all"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-[10px] font-extrabold text-slate-400 block mb-2 uppercase tracking-widest">Content (Text or Video Link)</label>
                        <textarea
                          rows={6}
                          value={editingLesson.content || ""}
                          onChange={(e) => setEditingLesson({ ...editingLesson, content: e.target.value })}
                          placeholder="Describe the lesson content or provide resources..."
                          className="w-full p-4 text-sm font-medium rounded-xl bg-white border border-slate-200 focus:outline-none focus:ring-4 focus:ring-teal-500/5 focus:border-[var(--color-karat-primary)] transition-all leading-relaxed"
                        />
                      </div>
                      <div className="flex justify-end gap-3 pt-2">
                        <button
                          onClick={() => setEditingLesson(null)}
                          className="text-xs font-bold text-slate-400 hover:text-slate-600 px-4 transition-colors"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => {
                            updateLesson(editingLesson.sectionId, editingLesson.id, {
                              title: editingLesson.title,
                              duration: editingLesson.duration,
                              content: editingLesson.content
                            });
                            setEditingLesson(null);
                          }}
                          className="glass-button px-6 py-2.5 text-xs shadow-lg active:scale-95 transition-all"
                        >
                          Save Lesson
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Add Section */}
      <div className="bg-white/60 border border-slate-100 p-8 rounded-3xl backdrop-blur-sm shadow-sm">
        <h3 className="text-lg font-extrabold mb-5 text-slate-800 tracking-tight">
          Add New Section
        </h3>

        <div className="flex gap-4">
          <input
            value={sectionTitle}
            onChange={(e) => setSectionTitle(e.target.value)}
            placeholder="e.g. Advanced Patterns"
            className="flex-1 p-4 rounded-xl bg-white border border-slate-200 focus:outline-none focus:ring-4 focus:ring-teal-500/5 focus:border-[var(--color-karat-primary)] transition-all font-bold text-slate-700"
          />

          <button
            onClick={addSection}
            className="glass-button px-8 rounded-xl shadow-lg active:scale-95 transition-all"
          >
            Add Section
          </button>
        </div>
      </div>

    </div>
  );
}
