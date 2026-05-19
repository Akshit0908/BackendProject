import React from "react";
import {
  FiArrowLeft,
  FiBookmark,
  FiLock,
  FiMessageSquare,
  FiPlayCircle,
  FiShare2,
} from "react-icons/fi";

export default function CyberpunkCourseDetails({
  open = false,
  course = null,
  onClose = () => { },
  onEnroll = () => { },
  onBookmark = () => { },
  bookmarkedCourses = [],
  enrolledCourses = [],
  onOpenCommunity = () => { },
}) {
  const price = course
    ? `$${Math.max(20, Math.floor(Math.random() * 120) + 20).toFixed(2)}`
    : "$--";

  const isBookmarked = course && bookmarkedCourses.some(c => c.title === course.title);
  const isEnrolled = course && enrolledCourses.some(c => c.title === course.title);

  return (
    <div
      className={`fixed left-0 top-0 h-full z-50 transform transition-transform duration-300 ${open ? "translate-x-0" : "-translate-x-full"
        }`}
    >
      <div className="w-[360px] h-full bg-white/80 backdrop-blur-xl text-slate-800 p-4 border-r border-teal-500/10 shadow-2xl">
        <div className="w-full h-full glass-card overflow-hidden flex flex-col border border-white">
          <div className="relative h-40 bg-gradient-to-br from-teal-50 to-sky-100 flex items-center justify-center">
            <span className="text-5xl font-extrabold opacity-10 text-slate-800">{course?.title ? "OPEN" : "KRT"}</span>

            <div
              className="absolute top-3 left-3 bg-white/70 p-2 rounded-full shadow-sm text-slate-600 hover:text-slate-900 cursor-pointer hover:bg-white transition-all z-10"
              onClick={onClose}
            >
              <FiArrowLeft />
            </div>

            <div
              className={`absolute top-3 right-12 p-2 rounded-full cursor-pointer transition-all shadow-sm z-10 ${isBookmarked ? 'bg-[var(--color-karat-primary)] text-white' : 'bg-white/70 text-slate-600 hover:text-slate-900 hover:bg-white'}`}
              onClick={() => onBookmark(course)}
              title={isBookmarked ? "Remove from saved" : "Save for later"}
            >
              <FiBookmark fill={isBookmarked ? "currentColor" : "none"} />
            </div>

            <div className="absolute top-3 right-3 bg-white/70 p-2 rounded-full shadow-sm text-slate-600 cursor-pointer hover:bg-white hover:text-slate-900 transition-all z-10">
              <FiShare2 />
            </div>
          </div>

          <div className="p-5 space-y-5 overflow-y-auto flex-1 scrollbar-hide bg-white/40">
            <div>
              <span className="text-[10px] font-bold tracking-wider px-2 py-1 bg-teal-100 text-teal-700 rounded-md">
                {course?.level ?? "FEATURED"}
              </span>
              <h2 className="mt-2 text-xl font-extrabold text-slate-800 leading-tight">
                {course?.title ?? "Select a course to view details"}
              </h2>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center text-xs font-semibold">
              <div className="bg-white/60 border border-slate-100 rounded-xl p-3 shadow-sm">
                <p className="text-slate-400 text-[10px] uppercase tracking-wider mb-1">TIME</p>
                <p className="text-slate-800">{course?.hours || 12}h</p>
              </div>
              <div className="bg-white/60 border border-slate-100 rounded-xl p-3 shadow-sm">
                <p className="text-slate-400 text-[10px] uppercase tracking-wider mb-1">LEVEL</p>
                <p className="text-slate-800">{course?.level || "Int."}</p>
              </div>
              <div className="bg-white/60 border border-slate-100 rounded-xl p-3 shadow-sm">
                <p className="text-slate-400 text-[10px] uppercase tracking-wider mb-1">LANG</p>
                <p className="text-slate-800">ENG</p>
              </div>
            </div>

            <div className="glass-panel p-4">
              <p className="text-[11px] uppercase tracking-wider text-slate-500 font-bold mb-3">Course Author</p>
              <div className="flex gap-3 items-center">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-200 to-sky-200"></div>
                <div>
                  <p className="text-sm font-bold text-slate-800">{course?.instructor ?? "Course Author"}</p>
                  <p className="text-xs text-slate-500">
                    Expert Instructor
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-slate-800 font-bold mb-3">What You Will Learn</h3>
              <ul className="text-sm space-y-2 font-medium">
                <li className="flex gap-2 items-center text-slate-600"><span className="text-[var(--color-karat-primary)] font-bold">✓</span> Build practical project skills</li>
                <li className="flex gap-2 items-center text-slate-600"><span className="text-[var(--color-karat-primary)] font-bold">✓</span> Learn production-ready patterns</li>
                <li className="flex gap-2 items-center text-slate-600"><span className="text-[var(--color-karat-primary)] font-bold">✓</span> Practice with guided tasks</li>
                <li className="flex gap-2 items-center text-slate-600"><span className="text-[var(--color-karat-primary)] font-bold">✓</span> Join the learner community</li>
              </ul>
            </div>

            <div>
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-slate-800 font-bold">Curriculum</h3>
                <span className="text-xs font-bold text-teal-600 bg-teal-50 px-2 py-1 rounded-md">
                  {course?.sections?.reduce((acc, s) => acc + (s.lessons?.length || 0), 0) || 0} Lessons
                </span>
              </div>

              <div className="space-y-4 text-sm mt-4">
                {course?.sections?.length > 0 ? (
                  course.sections.map((section, sIdx) => (
                    <div key={section.id || sIdx} className="space-y-2">
                      <p className="text-slate-400 text-[10px] uppercase tracking-widest font-bold">
                        SECTION {sIdx + 1}: {section.title}
                      </p>
                      {section.lessons?.length > 0 ? (
                        section.lessons.map((lesson, lIdx) => (
                          <div
                            key={lesson.id || lIdx}
                            className="flex justify-between items-center bg-white border border-slate-100 rounded-xl p-3 hover:border-teal-200 hover:shadow-md transition-all cursor-default"
                          >
                            <div>
                              <p className="text-slate-700 font-bold line-clamp-1">
                                {lIdx + 1}. {lesson.title}
                              </p>
                              <p className="text-[11px] text-slate-500 mt-0.5">{lesson.duration || "10:00"} mins</p>
                            </div>
                            <FiPlayCircle className="text-teal-400 flex-shrink-0 ml-2 shadow-sm rounded-full" size={18} />
                          </div>
                        ))
                      ) : (
                        <p className="text-xs text-slate-400 italic pl-2">No lessons yet</p>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center p-8 bg-white/50 border border-slate-200 rounded-xl border-dashed">
                    <FiLock className="text-slate-300 text-3xl mb-2" />
                    <p className="text-xs text-slate-500 text-center font-medium">Curriculum hasn't been published yet.</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="mt-auto p-4 bg-white/80 border-t border-slate-100 flex justify-between items-center gap-3">
            <div>
              <p className="text-[10px] uppercase font-bold tracking-widest text-slate-400 mb-0.5">Price</p>
              <p className="text-lg font-extrabold text-slate-800">
                {course?.price === 0 || course?.instructor === 'You' ? "FREE" : price}
              </p>
            </div>

            <div className="flex gap-2">
              <button
                className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-50 text-teal-600 hover:bg-teal-100 transition-colors shadow-sm"
                title="Open community chat"
                onClick={() => onOpenCommunity(course)}
                disabled={!course}
              >
                <FiMessageSquare strokeWidth={2.5} />
              </button>
              <button
                className="glass-button px-5 py-2 rounded-xl shadow-[0_4px_15px_rgba(26,187,164,0.25)] hover:shadow-[0_6px_20px_rgba(26,187,164,0.4)] transition-all font-bold tracking-wide"
                onClick={() => onEnroll(course)}
                disabled={!course}
              >
                {course?.instructor === 'You' ? "Open Dash" : (isEnrolled ? "Continue" : "Enroll")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
