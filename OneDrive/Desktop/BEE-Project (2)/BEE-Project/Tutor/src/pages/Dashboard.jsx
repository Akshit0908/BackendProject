import React from "react";
import { useAuth } from "../context/AuthContext";
import CourseSection from "../components/CourseSection";
const parseDuration = (dur) => {
  if (!dur || typeof dur !== 'string') return 0;
  const parts = dur.split(':').map(Number);
  if (parts.length === 2) return parts[0] * 60 + parts[1];
  if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
  return parts[0] || 0;
};
export default function Dashboard({
  courses,
  customChallenges = [],
  openCourse,
  createNew,
  editCourse,
  createNewChallenge,
  onEnroll,
  enrolledCourses = [],
  bookmarkedCourses = [],
  completedLessons = {}
}) {
  const { user } = useAuth();

  // 🎯 Convert saved course → UI card format
  const formattedCourses = courses.map((course) => {
    const allLessons = course.sections?.flatMap(s => s.lessons) || [];
    const courseCompletedList = completedLessons[course.title] || [];
    
    const totalTime = allLessons.reduce((acc, l) => acc + parseDuration(l.duration), 0);
    const completedTime = allLessons.filter(l => courseCompletedList.includes(l.title))
                                    .reduce((acc, l) => acc + parseDuration(l.duration), 0);
    const progress = totalTime > 0 ? Math.round((completedTime / totalTime) * 100) : 0;

    return {
      ...course,
      progress,
      students: 1200,
      rating: 4.5,
      weeks: `${course.sections?.length || 0} Weeks`,
      instructor: "You",
      gradient: "gradient-to-r from-emerald-400 to-green-500"
    };
  });

  return (
    <div className="dashboard px-6 sm:px-10 py-12 pt-24 max-w-7xl mx-auto font-sans relative z-10 text-slate-800">
      <h1 className="text-4xl font-extrabold mb-10 text-slate-800 tracking-tight">
        {user?.name ? `${user.name}'s Dashboard` : 'Expert Dashboard'}
      </h1>

      <div className="flex flex-wrap gap-4 mb-12">
        <button className="glass-button px-6 py-3" onClick={createNew}>
          + Create New Course
        </button>
        <button className="secondary-button px-6 py-3" onClick={createNewChallenge}>
          Upload Challenge
        </button>
      </div>

      <CourseSection
        title="Your Published Courses"
        data={formattedCourses}
        onSelectCourse={openCourse}
        onEditCourse={editCourse}
        onEnroll={onEnroll}
        enrolledCourses={enrolledCourses}
        bookmarkedCourses={bookmarkedCourses}
        completedLessons={completedLessons}
      />

      <div className="mb-12 mt-16">
        <h2 className="mb-8 text-3xl font-extrabold tracking-tight text-slate-800">Your Uploaded Challenges</h2>
        {customChallenges.length === 0 ? (
          <div className="rounded-2xl border-2 border-dashed border-slate-200 bg-white/50 p-12 text-center shadow-sm">
            <p className="text-slate-500 font-medium text-lg">
              You have not uploaded any challenges yet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {customChallenges.map((challenge) => (
              <div
                key={challenge.id}
                className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm hover:shadow-md transition-shadow cursor-default"
              >
                <div className="mb-4 flex items-center justify-between gap-3">
                  <h3 className="text-lg font-bold text-slate-800 line-clamp-1">{challenge.title}</h3>
                  <span className="rounded-md bg-teal-50 px-2.5 py-1 text-[10px] uppercase font-bold tracking-widest text-[var(--color-karat-primary)] flex-shrink-0">
                    {challenge.difficulty}
                  </span>
                </div>
                <p className="text-sm text-slate-500 font-medium leading-relaxed line-clamp-3">{challenge.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
