import React from "react";
import { useAuth } from "../context/AuthContext";
import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, Filler);
const parseDuration = (dur) => {
  if (!dur || typeof dur !== 'string') return 0;
  const parts = dur.split(':').map(Number);
  if (parts.length === 2) return parts[0] * 60 + parts[1];
  if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
  return parts[0] || 0;
};
export default function UserProgressDashboard({ enrolledCourses = [], bookmarkedCourses = [], completedLessons = {}, onOpenCourses = () => { }, onResumeCourse = () => { } }) {
  const { user } = useAuth();
  const [showAllAchievements, setShowAllAchievements] = React.useState(false);
  const [showAllCourses, setShowAllCourses] = React.useState(false);
  const [showFullLeaderboard, setShowFullLeaderboard] = React.useState(false);

  const fallbackCourses = [
    { title: "Advanced UI Design", instructor: "Module 4: Dynamic Layouts", progress: 75, lessonsDone: 12, lessonsTotal: 16 },
    { title: "Intro to Python", instructor: "David Malan", progress: 40, lessonsDone: 8, lessonsTotal: 20 },
    { title: "App Marketing", instructor: "Emma Watson", progress: 10, lessonsDone: 2, lessonsTotal: 20 },
  ];

  const sourceCourses = enrolledCourses.length ? enrolledCourses : fallbackCourses;

  const normalizedCourses = sourceCourses.map((course, index) => {
    const courseCompletedList = completedLessons[course.title] || [];
    const allLessonTitles = course.sections?.flatMap(s => s.lessons.map(l => l.title)) || [];
    const totalLessons = allLessonTitles.length;
    const lessonsDone = courseCompletedList.filter(title => allLessonTitles.includes(title)).length;
    const calculatedProgress = totalLessons > 0 ? Math.round((lessonsDone / totalLessons) * 100) : 0;

    // If it's a fallback course (doesn't have sections), use existing logic or some default
    const progress = (course.sections && course.sections.length > 0)
      ? calculatedProgress
      : (typeof course.progress === "number" ? course.progress : Math.max(10, 35 + ((index * 17) % 55)));

    return {
      ...course,
      progress: Math.max(0, Math.min(100, progress)),
      lessonsDone: (course.sections || enrolledCourses.length > 0) ? lessonsDone : (course.lessonsDone ?? Math.max(1, Math.round(((Math.max(0, Math.min(100, progress))) / 100) * 16))),
      lessonsTotal: totalLessons,
    };
  });

  const completedCourses = normalizedCourses.filter((course) => course.progress >= 90);
  const inProgressCourses = normalizedCourses.filter((course) => course.progress < 90);
  const achievements = [
    { title: "Early Bird", symbol: "◎" },
    { title: "Fast Learner", symbol: "⚡" },
    { title: "7-Day Warrior", symbol: "🏆" },
    { title: "Scholar", symbol: "🔒" },
    { title: "Consistency", symbol: "🔥" },
    { title: "Problem Solver", symbol: "🧠" },
    { title: "Top Contributor", symbol: "⭐" },
    { title: "Community Helper", symbol: "💬" },
  ];

  const certificatesEarned = completedCourses.length + 1;
  const streakDays = normalizedCourses.length ? 15 : 0;
  const badgesUnlocked = 6 + Math.min(inProgressCourses.length, 4);
  const leaderboard = [
    { rank: 4, name: "You", xp: 12450, highlight: true },
    { rank: 3, name: "Sarah Jenkins", xp: 12890, highlight: false },
    { rank: 2, name: "Arjun Mehta", xp: 14220, highlight: false },
    { rank: 1, name: "Lina Park", xp: 15610, highlight: false },
    { rank: 5, name: "Mia Collins", xp: 11840, highlight: false },
    { rank: 6, name: "Ethan Ross", xp: 10970, highlight: false },
    { rank: 7, name: "Noah Reed", xp: 10340, highlight: false },
    { rank: 8, name: "Ava Patel", xp: 9780, highlight: false },
  ];

  const resumeCourse = normalizedCourses[0];
  const visibleAchievements = showAllAchievements ? achievements : achievements.slice(0, 4);
  const visibleCourses = showAllCourses ? normalizedCourses : normalizedCourses.slice(0, 3);
  const visibleLeaderboard = showFullLeaderboard ? leaderboard : leaderboard.slice(0, 2);
  const canExpandCourses = normalizedCourses.length > 3;
  const monthlySolvedData = React.useMemo(() => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const currentMonthIndex = new Date().getMonth();
    const data = months.map((month, index) => {
      // Simulate historical data but make it look realistic based on current progress
      let solved = 0;
      if (index < currentMonthIndex) {
        solved = 15 + (index * 3) + (Object.keys(completedLessons).length % 5);
      } else if (index === currentMonthIndex) {
        // Current month reflects actual completed lessons from all courses
        solved = Object.values(completedLessons).reduce((acc, curr) => acc + curr.length, 0);
      }
      return { month, solved };
    });
    return data;
  }, [completedLessons]);
  const monthLabels = monthlySolvedData.map((item) => item.month);
  const monthlySolved = monthlySolvedData.map((item) => item.solved);
  const maxSolvedInMonth = Math.max(...monthlySolved, 1);
  const lineChartData = {
    labels: monthLabels,
    datasets: [
      {
        label: "Problems solved",
        data: monthlySolved,
        borderColor: "#1abba4",
        backgroundColor: "rgba(26, 187, 164, 0.05)",
        tension: 0.4,
        fill: true,
        pointRadius: 4,
        pointHoverRadius: 6,
        pointBackgroundColor: "#1abba4",
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
      },
    ],
  };
  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context) => `${context.label}: ${context.parsed.y} solved`,
        },
      },
    },
    scales: {
      x: {
        ticks: { color: "#94a3b8", font: { size: 10, weight: 'bold' } },
        grid: { color: "rgba(148, 163, 184, 0.05)" },
      },
      y: {
        beginAtZero: true,
        suggestedMax: maxSolvedInMonth + 4,
        ticks: { color: "#94a3b8", stepSize: 5, font: { weight: 'bold' } },
        grid: { color: "rgba(148, 163, 184, 0.05)" },
      },
    },
  };
  const daysInMonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const monthlyHeatmap = monthLabels.map((month, monthIndex) => {
    const days = daysInMonths[monthIndex];
    const totalDone = Object.values(completedLessons).reduce((acc, curr) => acc + curr.length, 0);
    return {
      month,
      days,
      values: Array.from({ length: days }, (_, day) => {
        // If it's the current month, we can make it look more "active" if lessons were done
        if (monthIndex === new Date().getMonth() && day < new Date().getDate()) {
          return (day + totalDone) % 5;
        }
        return (monthIndex * 2 + day) % 3; // Historical "faint" activity
      }),
    };
  });
  const heatmapColors = [
    "bg-slate-100",
    "bg-teal-100",
    "bg-teal-300",
    "bg-teal-500",
    "bg-[var(--color-karat-primary)]",
  ];

  return (
    <section className="min-h-[calc(100vh-64px)] w-full px-4 py-8 text-slate-800 md:px-8 md:py-12 bg-slate-50/50">
      <div className="mx-auto w-full max-w-6xl glass-card p-6 md:p-10 shadow-2xl border-white/80">
        <div className="flex items-center justify-between gap-4 mb-10 pb-6 border-b border-slate-100">
          <div className="flex items-center gap-5">
            <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-teal-400 to-sky-400 shadow-lg flex items-center justify-center text-white text-xl font-bold">
              {user?.name ? user.name.split(' ').map(n => n[0]).join('').toUpperCase() : 'U'}
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] font-extrabold text-slate-400">Welcome back</p>
              <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight leading-none mt-1">{user?.name || "User"}</h1>
            </div>
          </div>
          <div className="rounded-full bg-teal-50 border border-teal-500/10 px-5 py-2 text-xs font-extrabold text-[var(--color-karat-primary)] uppercase tracking-widest shadow-sm">
            🔥 {streakDays} Day Streak
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="rounded-3xl border border-slate-100 bg-white/50 p-6 shadow-sm hover:shadow-md transition-shadow">
            <h4 className="text-lg font-extrabold text-slate-800 mb-6">Activity Overview</h4>
            <div className="rounded-2xl border border-slate-50 bg-slate-50/50 p-4">
              <div className="h-60 w-full">
                <Line data={lineChartData} options={lineChartOptions} />
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                Total solved this year
              </p>
              <span className="text-lg font-extrabold text-[var(--color-karat-primary)]">
                {monthlySolved.reduce((a, b) => a + b, 0)}
              </span>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-100 bg-white/50 p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col">
            <h4 className="text-lg font-extrabold text-slate-800 mb-2">Contribution Heatmap</h4>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Activity by day</p>
            <div className="overflow-x-auto pb-2 scrollbar-hide mt-auto">
              <div className="inline-flex items-start rounded-2xl bg-slate-950 p-6 shadow-inner border border-slate-800">
                {monthlyHeatmap.map((monthData, monthIndex) => (
                  <React.Fragment key={`month-heatmap-${monthData.month}`}>
                    <div className="flex flex-col items-center">
                      <p className="mb-3 text-[10px] font-extrabold uppercase tracking-widest text-slate-500">{monthData.month}</p>
                      <div className="grid grid-flow-col grid-rows-7 gap-1.5">
                        {monthData.values.map((value, dayIndex) => (
                          <div
                            key={`cell-${monthData.month}-${dayIndex + 1}`}
                            className={`h-3 w-3 rounded-[2px] shadow-sm transition-all duration-300 hover:scale-125 hover:z-10 ${heatmapColors[value] === 'bg-slate-100' ? 'bg-slate-800' : heatmapColors[value]}`}
                            title={`${monthData.month} ${dayIndex + 1}: ${value} submissions`}
                          />
                        ))}
                      </div>
                    </div>
                    {monthIndex < monthlyHeatmap.length - 1 && (
                      <div className="w-4" />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-teal-500/10 bg-teal-50/30 p-8 shadow-sm mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex-1">
            <p className="text-[10px] uppercase font-extrabold tracking-[0.2em] text-teal-600 mb-2">Continue Learning</p>
            <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">{resumeCourse.title}</h2>
            <p className="text-sm font-bold text-slate-400 mt-1">{resumeCourse.instructor || "Module 4: Dynamic Layouts"}</p>
            <div className="mt-6 flex items-center justify-between text-xs font-extrabold uppercase tracking-widest">
              <p className="text-[var(--color-karat-primary)]">{resumeCourse.progress}% Complete</p>
              <p className="text-slate-400">
                {resumeCourse.lessonsDone} / {resumeCourse.lessonsTotal} Lessons
              </p>
            </div>
            <div className="mt-3 h-2.5 w-full rounded-full bg-white border border-teal-500/5 shadow-inner">
              <div className="h-full rounded-full bg-gradient-to-r from-teal-400 to-[var(--color-karat-primary)] transition-all duration-1000" style={{ width: `${resumeCourse.progress}%` }} />
            </div>
          </div>
          <button
            className="glass-button px-10 py-4 shadow-lg shadow-teal-500/10 active:scale-95 transition-all text-sm"
            onClick={() => resumeCourse && onResumeCourse(resumeCourse)}
          >
            Resume Lesson
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-10">
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-extrabold text-slate-800 tracking-tight">Achievements</h3>
                <button
                  className="text-xs font-bold text-[var(--color-karat-primary)] uppercase tracking-widest hover:text-teal-600 transition-colors"
                  onClick={() => setShowAllAchievements((prev) => !prev)}
                >
                  {showAllAchievements ? "Show Less" : "View All"}
                </button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {visibleAchievements.map((item) => (
                  <div key={item.title} className="rounded-2xl bg-white border border-slate-100 p-5 text-center shadow-sm hover:translate-y-[-2px] transition-all">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-50 text-xl text-[var(--color-karat-primary)] shadow-sm">
                      {item.symbol}
                    </div>
                    <p className="mt-3 text-[10px] font-extrabold uppercase tracking-widest text-slate-600">{item.title}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-extrabold text-slate-800 tracking-tight">Global Ranking</h3>
                <span className="px-3 py-1 rounded-full bg-slate-100 text-[10px] font-extrabold text-slate-500 uppercase tracking-widest">Diamond League</span>
              </div>
              <div className="space-y-3">
                {visibleLeaderboard.map((row) => (
                  <div
                    key={row.name}
                    className={`flex items-center justify-between rounded-2xl border p-4 transition-all ${row.highlight
                      ? "border-[var(--color-karat-primary)] bg-teal-50/50 shadow-sm"
                      : "border-slate-100 bg-white hover:border-slate-200"
                      }`}
                  >
                    <div className="flex items-center gap-4">
                      <span className={`text-xl font-extrabold ${row.highlight ? "text-[var(--color-karat-primary)]" : "text-slate-300"}`}>#{row.rank}</span>
                      <span className={`font-bold ${row.highlight ? "text-slate-800" : "text-slate-600"}`}>{row.name}</span>
                    </div>
                    <span className="font-extrabold text-teal-600 text-sm tracking-tight">{row.xp.toLocaleString()} XP</span>
                  </div>
                ))}
              </div>
              <button
                className="mt-6 w-full text-center text-[10px] font-extrabold uppercase tracking-[0.2em] text-slate-400 hover:text-[var(--color-karat-primary)] transition-colors"
                onClick={() => setShowFullLeaderboard((prev) => !prev)}
              >
                {showFullLeaderboard ? "Show Less Leaderboard" : "View Full Leaderboard"}
              </button>
            </div>
          </div>

          <div className="space-y-10">
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-extrabold text-slate-800 tracking-tight">Active Courses</h3>
                <button
                  className="text-xs font-bold text-[var(--color-karat-primary)] uppercase tracking-widest hover:text-teal-600 transition-colors"
                  onClick={() => {
                    if (canExpandCourses) {
                      setShowAllCourses((prev) => !prev);
                      return;
                    }
                    onOpenCourses();
                  }}
                >
                  {canExpandCourses ? (showAllCourses ? "Less" : "All") : "Browse"}
                </button>
              </div>
              <div className="space-y-4">
                {visibleCourses.map((course, index) => (
                  <div key={`${course.title}-${index}`} className="rounded-2xl border border-slate-100 bg-white p-4 hover:shadow-md transition-all group">
                    <div className="flex gap-4">
                      <div className="h-16 w-16 rounded-xl bg-slate-50 flex items-center justify-center text-2xl group-hover:scale-105 transition-transform shadow-inner">
                        📚
                      </div>
                      <div className="flex-1">
                        <p className="font-extrabold text-slate-800 text-sm line-clamp-1">{course.title}</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">{course.instructor || "Instructor"}</p>
                        <div className="mt-4 flex items-center justify-between text-[10px] font-extrabold uppercase tracking-widest">
                          <span className="text-slate-400">Progress</span>
                          <span className="text-teal-600">{course.progress}%</span>
                        </div>
                        <div className="mt-1.5 h-1.5 rounded-full bg-slate-50 border border-slate-100 shadow-inner">
                          <div className="h-full rounded-full bg-gradient-to-r from-teal-400 to-[var(--color-karat-primary)]" style={{ width: `${course.progress}%` }} />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {bookmarkedCourses.length > 0 && (
              <div>
                <h3 className="text-2xl font-extrabold text-slate-800 tracking-tight mb-6">Saved Items</h3>
                <div className="space-y-3">
                  {bookmarkedCourses.map((course, index) => (
                    <div key={`saved-${course.title}-${index}`} className="rounded-2xl border border-slate-100 bg-white/50 p-4 transition-all hover:bg-white hover:shadow-sm">
                      <p className="font-bold text-slate-800 text-sm">{course.title}</p>
                      <button
                        onClick={onOpenCourses}
                        className="mt-3 text-[10px] font-extrabold uppercase tracking-widest text-[var(--color-karat-primary)] hover:underline"
                      >
                        View Course →
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

