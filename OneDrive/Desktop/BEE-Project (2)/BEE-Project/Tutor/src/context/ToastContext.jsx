import React, { createContext, useContext, useState, useCallback } from 'react';

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const showToast = useCallback((message, type = 'info', duration = 3000) => {
        const id = Date.now();
        setToasts((prev) => [...prev, { id, message, type, duration }]);

        setTimeout(() => {
            removeToast(id);
        }, duration);
    }, []);

    const removeToast = useCallback((id) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, []);

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            <ToastContainer toasts={toasts} removeToast={removeToast} />
        </ToastContext.Provider>
    );
};

// Internal component for Toast Container to avoid circular dependency if kept in same file
const ToastContainer = ({ toasts, removeToast }) => {
    return (
        <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3 pointer-events-none">
            {toasts.map((toast) => (
                <div
                    key={toast.id}
                    className={`pointer-events-auto flex min-w-[320px] items-center justify-between rounded-2xl border border-white/40 bg-white/80 backdrop-blur-xl px-5 py-4 shadow-2xl transition-all animate-slide-in-right ${toast.type === 'success'
                        ? 'text-teal-600'
                        : toast.type === 'error'
                            ? 'text-rose-500'
                            : 'text-slate-600'
                        }`}
                >
                    <span className="text-sm font-medium tracking-wide">{toast.message}</span>
                    <button
                        onClick={() => removeToast(toast.id)}
                        className="ml-4 opacity-50 hover:opacity-100 transition-opacity"
                    >
                        ×
                    </button>
                </div>
            ))}
        </div>
    );
};
