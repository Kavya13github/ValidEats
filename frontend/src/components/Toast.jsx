// src/components/Toast.jsx
import React, { createContext, useContext, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ToastContext = createContext(null);

const icons = { success: '✓', error: '✕', info: 'ℹ', warning: '⚠' };
const styles = {
  success: { border: 'border-safe/40',    bg: 'bg-safe/10',    text: 'text-safe',    dot: 'bg-safe'    },
  error:   { border: 'border-risk/40',    bg: 'bg-risk/10',    text: 'text-risk',    dot: 'bg-risk'    },
  info:    { border: 'border-gold/40',    bg: 'bg-gold/10',    text: 'text-gold',    dot: 'bg-gold'    },
  warning: { border: 'border-caution/40', bg: 'bg-caution/10', text: 'text-caution', dot: 'bg-caution' },
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const show = useCallback((message, type = 'info', duration = 3500) => {
    const id = Date.now();
    setToasts((t) => [...t, { id, message, type }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), duration);
  }, []);

  const dismiss = useCallback((id) => setToasts((t) => t.filter((x) => x.id !== id)), []);

  return (
    <ToastContext.Provider value={{ show }}>
      {children}
      {/* Toast portal */}
      <div className="fixed bottom-6 right-6 z-[200] flex flex-col gap-3 pointer-events-none">
        <AnimatePresence mode="sync">
          {toasts.map((toast) => {
            const s = styles[toast.type] || styles.info;
            return (
              <motion.div
                key={toast.id}
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.9 }}
                transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                className={`pointer-events-auto flex items-center gap-3 pl-4 pr-3 py-3 rounded-2xl border ${s.border} ${s.bg}
                  backdrop-blur-xl shadow-popup min-w-[260px] max-w-[360px]`}
                style={{ boxShadow: '0 12px 40px rgba(0,0,0,0.6)' }}
              >
                <span className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold ${s.bg} ${s.text} border ${s.border}`}>
                  {icons[toast.type]}
                </span>
                <p className="text-sm text-slate-200 font-medium flex-1 leading-snug">{toast.message}</p>
                <button
                  onClick={() => dismiss(toast.id)}
                  className="text-slate-500 hover:text-slate-300 transition-colors p-1 flex-shrink-0"
                >✕</button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be inside ToastProvider');
  return ctx;
};

export default ToastProvider;
