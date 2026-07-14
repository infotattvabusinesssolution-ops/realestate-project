import React, { createContext, useContext, useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle, AlertCircle, Info, X, AlertTriangle } from 'lucide-react';

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'info', duration = 4000) => {
    const id = Date.now() + Math.random().toString(36).substr(2, 9);
    setToasts((prevToasts) => [...prevToasts, { id, message, type, duration }]);
    
    setTimeout(() => {
      removeToast(id);
    }, duration);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  }, []);

  const toast = {
    success: (msg, dur) => addToast(msg, 'success', dur),
    error: (msg, dur) => addToast(msg, 'error', dur),
    info: (msg, dur) => addToast(msg, 'info', dur),
    warning: (msg, dur) => addToast(msg, 'warning', dur),
  };

  React.useEffect(() => {
    const originalAlert = window.alert;

    window.alert = (message) => {
      if (message === undefined || message === null) return;
      const msgStr = String(message);
      
      // Auto-detect type from message content
      let type = 'info';
      const lower = msgStr.toLowerCase();
      
      if (
        lower.includes('success') || 
        lower.includes('successfully') || 
        lower.includes('updated') || 
        lower.includes('saved') || 
        lower.includes('added') || 
        lower.includes('created') || 
        lower.includes('approved') || 
        lower.includes('sent')
      ) {
        type = 'success';
      } else if (
        lower.includes('fail') || 
        lower.includes('failed') || 
        lower.includes('error') || 
        lower.includes('unable') || 
        lower.includes('invalid') || 
        lower.includes('incorrect') || 
        lower.includes('cannot')
      ) {
        type = 'error';
      } else if (
        lower.includes('warn') || 
        lower.includes('warning') || 
        lower.includes('caution') || 
        lower.includes('attention')
      ) {
        type = 'warning';
      }
      
      addToast(msgStr, type);
    };

    return () => {
      window.alert = originalAlert;
    };
  }, [addToast]);

  const getToastStyles = (type) => {
    switch (type) {
      case 'success':
        return {
          bg: 'bg-emerald-600 border-emerald-700 dark:bg-emerald-700 dark:border-emerald-800 shadow-emerald-500/25',
          text: 'text-white',
          icon: <CheckCircle className="text-emerald-100 w-5 h-5 flex-shrink-0" />,
          closeBtn: 'text-emerald-200 hover:text-white',
        };
      case 'error':
        return {
          bg: 'bg-rose-600 border-rose-700 dark:bg-rose-700 dark:border-rose-800 shadow-rose-500/25',
          text: 'text-white',
          icon: <AlertCircle className="text-rose-100 w-5 h-5 flex-shrink-0" />,
          closeBtn: 'text-rose-200 hover:text-white',
        };
      case 'warning':
        return {
          bg: 'bg-amber-600 border-amber-700 dark:bg-amber-700 dark:border-amber-800 shadow-amber-500/25',
          text: 'text-white',
          icon: <AlertTriangle className="text-amber-100 w-5 h-5 flex-shrink-0" />,
          closeBtn: 'text-amber-200 hover:text-white',
        };
      default:
        return {
          bg: 'bg-blue-600 border-blue-700 dark:bg-blue-700 dark:border-blue-800 shadow-blue-500/25',
          text: 'text-white',
          icon: <Info className="text-blue-100 w-5 h-5 flex-shrink-0" />,
          closeBtn: 'text-blue-200 hover:text-white',
        };
    }
  };

  return (
    <ToastContext.Provider value={toast}>
      {children}
      
      {/* Toast Portal Container */}
      <div className="fixed top-5 right-5 z-[9999] flex flex-col gap-3 w-full max-w-sm pointer-events-none">
        <AnimatePresence>
          {toasts.map((t) => {
            const styles = getToastStyles(t.type);
            return (
              <motion.div
                key={t.id}
                layout
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.15 } }}
                className={`flex items-start gap-3 p-4 border rounded-xl shadow-lg backdrop-blur-md pointer-events-auto transition-colors duration-200 ${styles.bg}`}
              >
                {styles.icon}
                <div className={`flex-1 text-xs font-bold leading-relaxed ${styles.text}`}>
                  {t.message}
                </div>
                <button
                  onClick={() => removeToast(t.id)}
                  className={`${styles.closeBtn} transition-colors p-0.5`}
                >
                  <X size={14} />
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
