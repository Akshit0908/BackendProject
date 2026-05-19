import React from "react";
import { FiArrowLeft, FiCheckCircle } from "react-icons/fi";

export default function LessonContentView({
    lesson,
    onBack,
    isCompleted,
    onToggleComplete
}) {
    if (!lesson) return null;

    return (
        <div className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-teal-50 to-sky-100 text-slate-800 p-6 md:p-12 animate-in fade-in slide-in-from-bottom-4 duration-500 font-sans">
            <div className="max-w-4xl mx-auto">
                {/* Navigation Header */}
                <div className="flex justify-between items-center mb-8">
                    <button
                        onClick={onBack}
                        className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors py-2 px-4 rounded-xl bg-white/50 border border-slate-200 hover:bg-white font-bold text-sm shadow-sm"
                    >
                        <FiArrowLeft /> Back to Course
                    </button>

                    <button
                        onClick={onToggleComplete}
                        className={`flex items-center gap-2 py-2.5 px-5 rounded-xl border transition-all text-sm font-bold shadow-sm ${isCompleted
                            ? "bg-[var(--color-karat-primary)] text-white border-[var(--color-karat-primary)]"
                            : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:text-slate-800"
                            }`}
                    >
                        <FiCheckCircle /> {isCompleted ? "COMPLETED" : "MARK AS DONE"}
                    </button>
                </div>

                {/* Content Box */}
                <div className="glass-card rounded-3xl border border-white/60 shadow-xl overflow-hidden mt-2">
                    {/* Header Image/Pattern Area */}
                    <div className="h-48 bg-gradient-to-br from-teal-100 to-sky-100 flex items-center justify-center relative overflow-hidden">
                        <div className="absolute inset-0 opacity-30 bg-white" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(20, 184, 166, 0.15) 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
                        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 tracking-tight uppercase relative z-10 px-6 text-center drop-shadow-sm">
                            {lesson.title}
                        </h1>
                    </div>

                    {/* Text Content */}
                    <div className="p-8 md:p-12 space-y-6">
                        <div className="flex items-center gap-4 text-[var(--color-karat-primary)] text-sm uppercase tracking-widest font-bold border-b border-slate-200 pb-4">
                            <span>Duration: {lesson.duration}</span>
                            <span className="w-1.5 h-1.5 bg-[var(--color-karat-primary)] rounded-full opacity-50"></span>
                            <span>Text Format</span>
                        </div>

                        <div className="prose prose-slate max-w-none">
                            <p className="text-lg md:text-xl leading-relaxed text-slate-600 font-medium whitespace-pre-wrap">
                                {lesson.content || "No content available for this lesson yet. Stay tuned for updates!"}
                            </p>

                            <div className="mt-12 p-8 bg-teal-50/50 rounded-2xl border border-teal-100">
                                <h3 className="text-[var(--color-karat-primary)] font-extrabold mb-4 uppercase tracking-tight">Key Takeaways</h3>
                                <ul className="space-y-3 text-slate-600 font-medium">
                                    <li className="flex gap-3 items-start">
                                        <span className="text-[var(--color-karat-primary)] mt-1">✦</span>
                                        Understand the fundamental concepts of this domain.
                                    </li>
                                    <li className="flex gap-3 items-start">
                                        <span className="text-[var(--color-karat-primary)] mt-1">✦</span>
                                        Identify production-ready patterns and best practices.
                                    </li>
                                    <li className="flex gap-3 items-start">
                                        <span className="text-[var(--color-karat-primary)] mt-1">✦</span>
                                        Apply learning through guided practical exercises.
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="bg-slate-50 p-6 border-t border-slate-100 flex justify-center">
                        <button
                            onClick={onBack}
                            className="text-slate-400 hover:text-slate-600 font-bold text-sm transition-colors"
                        >
                            Finished reading? Go back to module overview
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
