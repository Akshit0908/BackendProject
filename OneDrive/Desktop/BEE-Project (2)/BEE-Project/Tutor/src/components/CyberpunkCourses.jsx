
import React, { useState, useMemo } from "react";
import { FiSearch } from "react-icons/fi";
import CourseSection from "./CourseSection";
/* ---------- AUTO GENERATE 50 COURSES ---------- */
const gradients = [
  "white",
  "white",
  "white",
  "white",
  "white",
  "white",
  "white",
  "white",
  "white",
];

const titles = [
  "Python for Beginners",
  "Data Structures & Algorithms",
  "Web Development Masterclass",
  "Machine Learning Bootcamp",
  "Cyber Security Essentials",
  "Blockchain & Web3",
  "UI/UX Design Mastery",
  "Cloud Computing AWS",
  "DevOps Engineering",
  "Mobile App Development",
];

const levels = ["Beginner", "Intermediate", "Advanced"];

const instructors = [
  "Dr. Sarah Johnson",
  "Prof. Michael Chen",
  "Emily Davis",
  "Andrew Ng",
  "Kevin Mitnick",
  "Vitalik Buterin",
  "Don Norman",
  "Jeff Barr",
];

const dummySections = [
  {
    id: "sec-1",
    title: "Introduction",
    lessons: [
      { id: "l-1", title: "Overview", duration: "05:00", content: "Welcome to the course! In this lesson, we will cover the high-level overview of what you will learn. We'll explore the core objectives and the roadmap for the following weeks. Get ready to dive deep into the world of technology and innovation." },
      { id: "l-2", title: "Getting Started", duration: "10:00", content: "To get started, you'll need to set up your environment. This includes installing the necessary software, configuring your IDE, and ensuring your system meets the minimum requirements. Follow these steps carefully to avoid any issues later on." },
    ],
  },
  {
    id: "sec-2",
    title: "Core Concepts",
    lessons: [
      { id: "l-3", title: "Deep Dive", duration: "15:00", content: "Now we're getting into the meat of the subject. This lesson explores the fundamental principles that govern this field. We'll look at architectural patterns, data flow, and efficiency considerations. Understanding these concepts is crucial for mastering the advanced topics." },
      { id: "l-4", title: "Practical Application", duration: "20:00", content: "Theory is great, but practice is where you truly learn. In this lesson, we'll apply the concepts from the previous videos to a real-world scenario. You'll build a small project from scratch, implementing everything we've discussed so far." },
    ],
  },
];

const generatedCourses = Array.from({ length: 50 }, (_, i) => {
  const hours = Math.floor(Math.random() * 40) + 1;
  const weeks = Math.ceil(hours / 4) + 1; // Assuming ~4 hours per week
  return {
    title: `${titles[i % titles.length]} ${i + 1}`,
    level: levels[i % levels.length],
    progress: 0, // Default to 0, will be overridden if enrolled
    students: (1000 + Math.floor(Math.random() * 4000)).toLocaleString(),
    rating: (4.1 + Math.random() * 0.9).toFixed(1),
    weeks: `${weeks} weeks`,
    instructor: instructors[i % instructors.length],
    gradient: gradients[i % instructors.length % gradients.length],
    sections: dummySections,
    price: Math.floor(Math.random() * 300),
    hours: hours,
  };
});

const dummyCourseConnect = {
  title: "Course Connect (Dummy)",
  level: "Beginner",
  progress: 0,
  students: "0",
  rating: "5.0",
  weeks: "4 weeks",
  instructor: "Demo Instructor",
  gradient: "white",
  sections: dummySections,
  price: 0,
  hours: 5,
};

const allCourses = [dummyCourseConnect, ...generatedCourses];

/* ---------- SECTIONS ---------- */
const trending = allCourses.slice(0, 10);
const niche = allCourses.filter(c => c.level === "Advanced").slice(0, 10);
const saved = allCourses.slice(10, 20);

/* ---------- COURSE CARD SECTION ---------- */


const Sidebar = ({
  difficulty,
  setDifficulty,
  priceRange,
  setPriceRange,
  duration,
  setDuration,
  rating,
  setRating,
  searchQuery,
  setSearchQuery,
  onClear,
}) => {
  const toggleDifficulty = (level) => {
    setDifficulty((prev) => ({ ...prev, [level]: !prev[level] }));
  };

  return (
    <div className="w-80 flex-shrink-0 bg-white/60 backdrop-blur-md text-slate-800 p-6 space-y-8 border-r border-teal-500/10 h-full overflow-y-auto scrollbar-hide shadow-sm relative z-10 hidden lg:block">
      {/* Search Bar */}
      <div className="relative mt-4">
        <input
          type="text"
          placeholder="Search courses..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full py-3 pl-11 pr-4 bg-white/70 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-karat-primary)] focus:border-transparent shadow-sm"
        />
        <FiSearch className="absolute left-4 top-3.5 text-slate-400" size={18} />
      </div>

      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-extrabold tracking-tight text-slate-800">Filters</h2>
        <button onClick={onClear} className="text-[var(--color-karat-primary)] font-bold text-xs hover:underline">CLEAR ALL</button>
      </div>

      {/* Difficulty Level */}
      <div>
        <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest mb-3">
          Difficulty Level
        </p>
        <div className="space-y-3">
          {["Beginner", "Intermediate", "Advanced"].map((level) => (
            <div key={level} className="flex items-center justify-between">
              <span className="font-medium text-slate-600 text-sm">{level}</span>
              <button
                onClick={() => toggleDifficulty(level)}
                className={`w-10 h-5.5 rounded-full p-0.5 transition-colors ${difficulty[level] ? "bg-[var(--color-karat-primary)]" : "bg-slate-200"
                  }`}
              >
                <div
                  className={`bg-white w-4.5 h-4.5 rounded-full shadow-sm transform duration-300 ease-in-out ${difficulty[level] ? "translate-x-4.5" : ""
                    }`}
                ></div>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest mb-3">Price Range</p>
        <div className="flex justify-between text-xs font-medium text-slate-500 mb-2">
          <span>Free</span>
          <span>$100</span>
          <span>$300+</span>
        </div>
        <input
          type="range"
          min="0"
          max="300"
          value={priceRange[1]}
          onChange={(e) => setPriceRange([0, Number(e.target.value)])}
          className="w-full accent-[var(--color-karat-primary)] h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer"
        />
        <p className="text-right text-xs mt-2 font-bold text-teal-600">
          ${priceRange[0]} - ${priceRange[1] >= 300 ? "300+" : priceRange[1]}
        </p>
      </div>

      {/* Duration */}
      <div>
        <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest mb-3">Duration</p>
        <div className="grid grid-cols-2 gap-2">
          {["All", "0-2 Hours", "3-6 Hours", "7-16 Hours", "17+ Hours"].map((d) => (
            <button
              key={d}
              className={`py-2 px-1 rounded-xl text-xs font-bold transition-all ${duration === d ? "bg-[var(--color-karat-primary)] text-white shadow-md" : "bg-white/50 border border-slate-200 text-slate-600 hover:bg-white"
                }`}
              onClick={() => setDuration(d)}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      {/* Ratings */}
      <div>
        <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest mb-3">Ratings</p>
        <div className="flex flex-col gap-2">
          {[4, 3, 2].map((r) => (
            <button
              key={r}
              className={`flex items-center gap-2 p-2 rounded-xl text-sm font-bold transition-colors ${rating === r ? "bg-teal-50 text-[var(--color-karat-primary)]" : "text-slate-500 hover:bg-slate-50 hover:text-slate-700"
                }`}
              onClick={() => setRating(r)}
            >
              <div className="flex text-amber-400 text-xs">
                {"★".repeat(r)}
                <span className="text-slate-200">{"★".repeat(5 - r)}</span>
              </div>
              <span className="text-xs">& Up</span>
            </button>
          ))}
          <button
            className={`flex items-center gap-2 p-2 rounded-xl text-sm font-bold transition-colors ${rating === 0 ? "bg-teal-50 text-[var(--color-karat-primary)]" : "text-slate-500 hover:bg-slate-50 hover:text-slate-700"
              }`}
            onClick={() => setRating(0)}
          >
            All Ratings
          </button>
        </div>
      </div>
    </div>
  );
};
/* ---------- MAIN COMPONENT ---------- */
function CyberpunkCourses({ onSelectCourse, onEnroll, onBookmark, enrolledCourses = [], bookmarkedCourses = [], completedLessons = {} }) {
  const [difficulty, setDifficulty] = useState({
    Beginner: true,
    Intermediate: true,
    Advanced: true,
  });
  const [priceRange, setPriceRange] = useState([0, 300]);
  const [duration, setDuration] = useState("All");
  const [rating, setRating] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  const clearFilters = () => {
    setDifficulty({ Beginner: true, Intermediate: true, Advanced: true });
    setPriceRange([0, 300]);
    setDuration("All");
    setRating(0);
    setSearchQuery("");
  };

  const filteredCourses = useMemo(() => {
    return allCourses.filter((course) => {
      // Search filter
      if (searchQuery && !course.title.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }

      // Difficulty filter
      if (!difficulty[course.level]) {
        return false;
      }

      // Price filter
      if (course.price > priceRange[1]) {
        return false;
      }

      // Rating filter
      if (parseFloat(course.rating) < rating) {
        return false;
      }

      // Duration filter
      if (duration !== "All") {
        const h = course.hours;
        if (duration === "0-2 Hours" && h > 2) return false;
        if (duration === "3-6 Hours" && (h < 3 || h > 6)) return false;
        if (duration === "7-16 Hours" && (h < 7 || h > 16)) return false;
        if (duration === "17+ Hours" && h < 17) return false;
      }

      return true;
    });
  }, [difficulty, priceRange, duration, rating, searchQuery]);

  const isFilterActive = searchQuery !== "" || priceRange[1] < 300 || duration !== "All" || rating !== 0 || !Object.values(difficulty).every(v => v);

  // Original sections (can still be shown if no filters active)
  const trending = allCourses.slice(0, 10);
  const niche = allCourses.filter(c => c.level === "Advanced").slice(0, 10);
  const saved = allCourses.slice(10, 20);

  return (
    <div className="flex h-[calc(100vh-64px)] text-[var(--color-karat-text)] font-sans relative overflow-hidden bg-white/30 border-b border-slate-100">
      <Sidebar
        difficulty={difficulty}
        setDifficulty={setDifficulty}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        duration={duration}
        setDuration={setDuration}
        rating={rating}
        setRating={setRating}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onClear={clearFilters}
      />

      {/* ===== RIGHT MAIN CONTENT ===== */}
      <div className="flex-1 px-6 sm:px-10 py-8 lg:py-12 overflow-y-auto h-full scrollbar-hide relative z-0 bg-slate-100/40">
        <div className="max-w-7xl mx-auto space-y-16 pb-20">
          {isFilterActive ? (
            <CourseSection
              title={`🔍 Filter Results (${filteredCourses.length})`}
              data={filteredCourses}
              onSelectCourse={onSelectCourse}
              onEnroll={onEnroll}
              enrolledCourses={enrolledCourses}
              completedLessons={completedLessons}
            />
          ) : (
            <>
              <CourseSection
                title="✨ Trending Courses"
                data={trending}
                onSelectCourse={onSelectCourse}
                onEnroll={onEnroll}
                enrolledCourses={enrolledCourses}
                completedLessons={completedLessons}
              />
              <CourseSection
                title="🎯 Your Niche"
                data={niche}
                onSelectCourse={onSelectCourse}
                onEnroll={onEnroll}
                enrolledCourses={enrolledCourses}
                completedLessons={completedLessons}
              />
              {bookmarkedCourses.length > 0 && (
                <CourseSection
                  title="💾 Saved for Later"
                  data={allCourses.filter(c => bookmarkedCourses.some(bc => bc.title === c.title))}
                  onSelectCourse={onSelectCourse}
                  onEnroll={onEnroll}
                  enrolledCourses={enrolledCourses}
                  completedLessons={completedLessons}
                />
              )}
              <CourseSection
                title="📚 All Courses"
                data={allCourses}
                onSelectCourse={onSelectCourse}
                onEnroll={onEnroll}
                enrolledCourses={enrolledCourses}
                completedLessons={completedLessons}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default CyberpunkCourses;
