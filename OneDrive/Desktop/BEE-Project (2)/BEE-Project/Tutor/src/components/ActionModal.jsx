import React from 'react';

const ActionModal = ({
    isOpen,
    title,
    message,
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    onConfirm,
    onCancel,
    variant = 'blue' // 'blue' | 'red' | 'emerald'
}) => {
    if (!isOpen) return null;

    const colorClasses = {
        blue: 'border-[var(--color-karat-primary)] shadow-md text-[var(--color-karat-primary)]',
        red: 'border-red-500 shadow-[0_0_30px_rgba(239,68,68,0.3)] text-red-400',
        emerald: 'border-emerald-400 shadow-[0_0_30px_rgba(52,211,153,0.3)] text-emerald-400'
    };

    const btnClasses = {
        blue: 'bg-[var(--color-karat-primary)]/10 hover:bg-[var(--color-karat-primary)]/20 text-[var(--color-karat-primary)] border-[var(--color-karat-primary)]/20',
        red: 'bg-red-500/20 hover:bg-red-500/40 text-red-400 border-red-500/50',
        emerald: 'bg-emerald-500/20 hover:bg-emerald-500/40 text-emerald-400 border-emerald-500/50'
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
                onClick={onCancel}
            />

            {/* Modal Content */}
            <div className={`relative w-full max-w-md overflow-hidden rounded-3xl border border-white/40 bg-white/70 backdrop-blur-2xl p-8 shadow-2xl animate-in fade-in zoom-in duration-300`}>
                <div className="relative z-10">
                    <h2 className="mb-4 text-2xl font-extrabold tracking-tight text-slate-800">
                        {title}
                    </h2>

                    <p className="mb-8 text-sm font-medium leading-relaxed text-slate-500">
                        {message}
                    </p>

                    <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                        <button
                            onClick={onCancel}
                            className="px-6 py-2.5 text-xs font-bold uppercase tracking-widest text-slate-400 transition-all hover:text-slate-600"
                        >
                            {cancelText}
                        </button>
                        <button
                            onClick={onConfirm}
                            className={`rounded-xl border border-white/50 px-8 py-3 text-xs font-extrabold uppercase tracking-widest transition-all hover:translate-y-[-2px] active:scale-95 shadow-lg group ${variant === 'red' ? 'bg-rose-500 text-white shadow-rose-200' : variant === 'emerald' ? 'bg-[var(--color-karat-primary)] text-white shadow-teal-200' : 'bg-slate-800 text-white shadow-slate-200'}`}
                        >
                            {confirmText}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ActionModal;
