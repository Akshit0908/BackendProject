export default function CourseContent({
  course = null,
  completedLessons = [],
  onToggleLesson = () => { },
  onSelectLesson = () => { },
  onBack = () => { }
}) {
  const fallbackSections = [
    {
      id: "sec-1",
      title: "Getting Started",
      lessons: [
        { id: "l-1", title: "Course Introduction", duration: "08:00" },
        { id: "l-2", title: "Setup and Prerequisites", duration: "14:00" },
      ],
    },
    {
      id: "sec-2",
      title: "Core Concepts",
      lessons: [
        { id: "l-3", title: "Fundamentals", duration: "22:00" },
        { id: "l-4", title: "Hands-on Practice", duration: "30:00" },
      ],
    },
  ];

  const sections = course?.sections?.length ? course.sections : fallbackSections;

  return (
    <section className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-teal-50 to-sky-100 px-4 py-8 md:py-12 ext-slate-800 font-sans">
      <div className="mx-auto max-w-5xl glass-card border border-white/60 p-6 md:p-10 shadow-xl">
        <button
          type="button"
          className="mb-8 rounded-lg border border-slate-200 bg-white/50 px-4 py-2 text-sm font-bold text-slate-600 hover:bg-white hover:shadow-sm transition-all flex items-center gap-2"
          onClick={onBack}
        >
          Back to Courses
        </button>

        <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight">{course?.title ?? "Course Content"}</h1>
        <p className="mt-2 text-slate-500 font-medium mb-10 text-lg">
          Instructor: <span className="text-slate-700 font-bold">{course?.instructor ?? "Course Author"}</span>
        </p>

        <div className="space-y-4">
          {sections.map((section, sectionIndex) => (
            <div
              key={section.id ?? sectionIndex}
              className="rounded-2xl border border-slate-100 bg-white shadow-sm p-6"
            >
              <h2 className="text-xl font-bold text-slate-800 tracking-tight">
                {sectionIndex + 1}. {section.title || "Untitled Section"}
              </h2>

              {section.lessons?.length ? (
                <ul className="mt-3 space-y-2">
                  {section.lessons.map((lesson, lessonIndex) => {
                    const isCompleted = completedLessons.includes(lesson.title);
                    return (
                      <li
                        key={lesson.id ?? lessonIndex}
                        className={`flex items-center justify-between rounded-xl border px-4 py-3.5 transition-all cursor-pointer group ${isCompleted
                          ? "border-[var(--color-karat-primary)] bg-teal-50/50"
                          : "border-slate-100 bg-slate-50 hover:border-teal-200 hover:bg-white hover:shadow-sm"
                          }`}
                        onClick={() => onSelectLesson(lesson)}
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={isCompleted}
                            onChange={(e) => { e.stopPropagation(); onToggleLesson(lesson.title); }}
                            className="w-5 h-5 accent-[var(--color-karat-primary)] cursor-pointer rounded-sm"
                          />
                          <span className={`font-bold ${isCompleted ? "text-[var(--color-karat-primary)] line-through opacity-70" : "text-slate-700"}`}>
                            {lesson.title || `Lesson ${lessonIndex + 1}`}
                          </span>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-sm font-bold text-slate-400 group-hover:text-slate-600 transition-colors">
                            {lesson.duration || "10:00"}
                          </span>
                          <button
                            className="hidden group-hover:block text-xs bg-[var(--color-karat-primary)] text-white font-bold px-3 py-1.5 rounded-lg shadow-sm"
                          >
                            READ
                          </button>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <p className="mt-3 text-sm text-emerald-100/80">No lessons yet in this section.</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
