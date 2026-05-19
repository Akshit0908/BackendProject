import React, { useMemo, useState } from "react";
import { FiHash, FiHeadphones, FiMessageSquare, FiSend, FiUsers } from "react-icons/fi";

const channelTemplate = ["announcements", "general", "qa", "projects", "resources"];

const seedMessages = [
  { user: "Mentor", text: "Welcome to the course server. Share your progress daily." },
  { user: "Aarav", text: "I am starting module 2 today. Anyone joining?" },
  { user: "Priya", text: "Pinned notes are in #resources." },
];

function CourseCommunity({ enrolledCourses = [], activeCourse = null, onSelectCourse = () => { } }) {
  const [activeChannel, setActiveChannel] = useState("general");
  const [draft, setDraft] = useState("");
  const [messagesByCourse, setMessagesByCourse] = useState({});

  const selectedCourse = activeCourse || enrolledCourses[0] || null;
  const selectedCourseTitle = selectedCourse?.title ?? "";
  const messages = useMemo(() => {
    if (!selectedCourseTitle) return [];
    return messagesByCourse[selectedCourseTitle] ?? seedMessages;
  }, [messagesByCourse, selectedCourseTitle]);

  const sendMessage = () => {
    const message = draft.trim();
    if (!message || !selectedCourseTitle) return;

    setMessagesByCourse((prev) => {
      const existing = prev[selectedCourseTitle] ?? seedMessages;
      return {
        ...prev,
        [selectedCourseTitle]: [...existing, { user: "You", text: message }],
      };
    });
    setDraft("");
  };

  if (enrolledCourses.length === 0) {
    return (
      <section className="min-h-[calc(100vh-64px)] p-8 text-slate-800">
        <div className="mx-auto max-w-3xl rounded-3xl border border-teal-500/10 bg-white/60 backdrop-blur-xl p-10 text-center shadow-lg">
          <div className="w-20 h-20 bg-teal-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <FiUsers className="text-3xl text-[var(--color-karat-primary)]" />
          </div>
          <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">Collaborate</h2>
          <p className="mt-4 text-slate-500 font-medium text-lg leading-relaxed">
            You are not enrolled in any course yet. Explore our catalog, enroll in a course, and join the community to start collaborating!
          </p>
          <button className="mt-8 glass-button px-8 py-3.5">
            Explore Courses
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-[calc(100vh-64px)] text-slate-800">
      <div className="grid grid-cols-[280px_1fr_240px] h-[calc(100vh-64px)] overflow-hidden">
        <aside className="border-r border-teal-500/10 bg-white/40 backdrop-blur-2xl p-4 overflow-y-auto scrollbar-hide">
          <div className="mb-4 px-3 text-[10px] font-extrabold uppercase tracking-[0.2em] text-slate-400">Your Learning Circles</div>
          <div className="space-y-2">
            {enrolledCourses.map((course) => (
              <button
                key={course.title}
                className={`w-full rounded-2xl px-4 py-3 text-left transition-all duration-300 border ${selectedCourseTitle === course.title
                  ? "border-teal-500/20 bg-teal-50/50 shadow-sm text-[var(--color-karat-primary)]"
                  : "border-transparent text-slate-600 hover:bg-white/50"
                  }`}
                onClick={() => onSelectCourse(course)}
              >
                <div className="flex items-center justify-between">
                  <span className="truncate pr-2 font-bold text-sm">{course.title}</span>
                  <FiMessageSquare className={selectedCourseTitle === course.title ? "text-[var(--color-karat-primary)]" : "text-slate-300"} />
                </div>
              </button>
            ))}
          </div>
        </aside>

        <main className="flex flex-col bg-slate-50/30 backdrop-blur-sm">
          <div className="h-16 border-b border-teal-500/10 px-6 flex items-center justify-between bg-white/30">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-teal-100 flex items-center justify-center">
                <FiHash className="text-[var(--color-karat-primary)]" />
              </div>
              <h3 className="font-extrabold text-slate-800">{selectedCourseTitle || "Community"}</h3>
              <span className="px-2 py-0.5 rounded-lg bg-slate-100 text-[10px] font-bold text-slate-500 uppercase tracking-wider">#{activeChannel}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors">
              <FiUsers size={18} />
              <span className="text-xs font-bold">Members</span>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
            {messages.map((message, idx) => (
              <div key={`${message.user}-${idx}`} className={`flex flex-col ${message.user === "You" ? "items-end" : "items-start"}`}>
                <div className={`max-w-[80%] rounded-2xl p-4 shadow-sm border ${message.user === "You"
                  ? "bg-[var(--color-karat-primary)] text-white border-transparent"
                  : "bg-white text-slate-700 border-slate-100"}`}>
                  <p className={`text-[10px] font-extrabold uppercase tracking-widest mb-1 ${message.user === "You" ? "text-white/70" : "text-[var(--color-karat-primary)]"}`}>
                    {message.user}
                  </p>
                  <p className="text-sm font-medium leading-relaxed">{message.text}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-6 bg-white/50 border-t border-teal-500/10">
            <div className="flex gap-3 bg-white p-2 rounded-2xl border border-slate-100 shadow-sm focus-within:border-[var(--color-karat-primary)] transition-all">
              <input
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder={`Message in #${activeChannel}...`}
                className="flex-1 bg-transparent border-none outline-none px-3 py-2 text-sm font-medium text-slate-700 placeholder-slate-400"
              />
              <button
                className="h-10 w-10 flex items-center justify-center rounded-xl bg-[var(--color-karat-primary)] text-white font-bold shadow-lg shadow-teal-500/20 hover:scale-105 transition-all"
                onClick={sendMessage}
              >
                <FiSend />
              </button>
            </div>
          </div>
        </main>

        <aside className="border-l border-teal-500/10 bg-white/40 backdrop-blur-2xl p-5 hidden lg:block overflow-y-auto scrollbar-hide">
          <div className="mb-6">
            <div className="mb-4 flex items-center gap-2 text-slate-400">
              <FiHeadphones size={16} />
              <span className="text-[10px] font-extrabold uppercase tracking-[0.2em]">Rooms</span>
            </div>
            <div className="space-y-1">
              {channelTemplate.map((channel) => (
                <button
                  key={channel}
                  className={`w-full text-left rounded-xl px-4 py-2.5 text-sm transition-all duration-300 ${activeChannel === channel
                    ? "bg-teal-50 text-[var(--color-karat-primary)] font-bold"
                    : "text-slate-500 hover:bg-slate-100/50"
                    }`}
                  onClick={() => setActiveChannel(channel)}
                >
                  <span className="inline-flex items-center gap-3">
                    <FiHash className={activeChannel === channel ? "text-[var(--color-karat-primary)]" : "text-slate-300"} />
                    {channel}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-4 flex items-center gap-2 text-slate-400">
              <FiUsers size={16} />
              <span className="text-[10px] font-extrabold uppercase tracking-[0.2em]">Active Now</span>
            </div>
            <div className="space-y-4">
              {["Mentor Bot", "Design Squad", "Debug Team", "You"].map(user => (
                <div key={user} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-500">
                    {user[0]}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-slate-700">{user}</span>
                    <span className="text-[8px] text-teal-500 font-bold uppercase tracking-widest">Online</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}

export default CourseCommunity;
