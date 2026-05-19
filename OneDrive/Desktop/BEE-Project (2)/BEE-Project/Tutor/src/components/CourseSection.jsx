import React from "react";
import { FiEdit2, FiClock, FiUsers, FiStar, FiInfo } from 'react-icons/fi';
const parseDuration = (dur) => {
  if (!dur || typeof dur !== 'string') return 0;
  const parts = dur.split(':').map(Number);
  if (parts.length === 2) return parts[0] * 60 + parts[1];
  if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
  return parts[0] || 0;
};
function CourseSection({ title, data, onSelectCourse, onEditCourse, onEnroll, onBookmark, enrolledCourses = [], bookmarkedCourses = [], completedLessons = {} }) {
  return (
    <div className="mb-12">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-2 h-8 bg-[var(--color-karat-primary)] rounded-full"></div>
        <h2 className="text-3xl text-slate-800 font-extrabold tracking-tight">{title}</h2>
      </div>
      <div className="flex gap-8 overflow-x-auto pb-8 pt-4 px-4 -mx-4 snap-x snap-mandatory scrollbar-hide">
        {data.map((course, index) => {
          // Check if user is enrolled in this course to show real progress
          const enrolledData = enrolledCourses.find(c => c.title === course.title);
          const isCurrentlyBookmarked = bookmarkedCourses.some(c => c.title === course.title);
          const courseCompletedList = completedLessons[course.title] || [];
          let displayProgress = course.progress;

          if (enrolledData) {
            const allLessons = course.sections?.flatMap(s => s.lessons) || [];
            const totalTime = allLessons.reduce((acc, l) => acc + parseDuration(l.duration), 0);
            const completedTime = allLessons.filter(l => courseCompletedList.includes(l.title))
                                            .reduce((acc, l) => acc + parseDuration(l.duration), 0);
            displayProgress = totalTime > 0 ? Math.round((completedTime / totalTime) * 100) : 0;
          }

          return (
            <div key={index} className="snap-start min-w-[320px] h-[400px] cursor-pointer group" onClick={() => onSelectCourse && onSelectCourse(course)}>
              <div className="relative w-full h-full rounded-3xl overflow-hidden glass-card transition-all hover:shadow-[0_25px_50px_-12px_rgba(20,184,166,0.25)] hover:translate-y-[-6px] flex flex-col bg-white border border-white shadow-lg shadow-slate-200/50">
                {/* Thumbnail Section */}
                <div className="h-44 bg-gradient-to-br from-teal-50 to-sky-100 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 opacity-20 bg-white" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(20, 184, 166, 0.2) 1px, transparent 0)', backgroundSize: '16px 16px' }}></div>

                  {/* Action Buttons */}
                  <div className="absolute top-4 right-4 flex gap-2 z-20">
                    {(course.instructor === 'You' || course.editable) && onEditCourse && (
                      <button
                        className="bg-white/90 hover:bg-white p-2.5 rounded-xl shadow-sm transition-all text-slate-600 hover:text-[var(--color-karat-primary)] backdrop-blur-sm border border-white/50"
                        onClick={(e) => { e.stopPropagation(); onEditCourse(course); }}
                        aria-label="Edit course"
                      >
                        <FiEdit2 size={16} />
                      </button>
                    )}
                    <button
                      className="bg-[var(--color-karat-primary)] hover:bg-teal-600 p-2.5 rounded-xl shadow-lg transition-all text-white backdrop-blur-sm border border-white/20"
                      onClick={(e) => { e.stopPropagation(); onSelectCourse && onSelectCourse(course); }}
                      aria-label="Course information"
                    >
                      <FiInfo size={16} />
                    </button>
                  </div>

                  <div className="w-16 h-16 bg-white/80 rounded-2xl shadow-sm flex items-center justify-center transform group-hover:scale-110 transition-transform duration-500 backdrop-blur-sm z-10 rotate-3">
                    <span className="text-2xl drop-shadow-sm">✦</span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-[10px] font-extrabold tracking-widest px-2.5 py-1 rounded-md bg-teal-50 text-[var(--color-karat-primary)] uppercase">
                      {course.level}
                    </span>
                    {enrolledData && (
                      <span className="text-[10px] font-extrabold tracking-widest px-2.5 py-1 rounded-md bg-sky-50 text-sky-600 uppercase">
                        {displayProgress}% Complete
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-extrabold mb-1 text-slate-800 line-clamp-2 leading-tight group-hover:text-[var(--color-karat-primary)] transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-sm font-semibold text-slate-500 mb-4 line-clamp-1">by {course.instructor}</p>

                  <div className="grid grid-cols-2 gap-y-3 gap-x-2 text-xs font-bold text-slate-500 mt-auto mb-5 bg-slate-50/50 p-3 rounded-xl border border-slate-100">
                    <div className="flex items-center gap-1.5">
                      <FiUsers className="text-teal-400" size={14} />
                      <span>{course.students}</span>
                    </div>
                    <div className="flex items-center gap-1.5 justify-end">
                      <FiStar className="text-amber-400 fill-amber-400" size={14} />
                      <span>{course.rating}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <FiClock className="text-sky-400" size={14} />
                      <span>{course.hours}h</span>
                    </div>
                    <div className="flex justify-end items-center">
                      <span className="font-extrabold text-sm text-[var(--color-karat-primary)]">
                        {course.price === 0 ? "FREE" : `$${course.price}`}
                      </span>
                    </div>
                  </div>

                  {enrolledData && (
                    <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden mt-auto">
                      <div className="bg-[var(--color-karat-primary)] h-full transition-all duration-1000 ease-out rounded-full" style={{ width: `${displayProgress}%` }}></div>
                    </div>
                  )}
                </div>
              </div>
            </div>

          );
        })}
      </div>
    </div>
  );
}

export default CourseSection;