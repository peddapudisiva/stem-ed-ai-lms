import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import { useNotificationStore, ToastMessage } from '../../stores/notificationStore';
import { cn } from '../../utils/cn';

const toastConfig = {
  success: { icon: CheckCircle, className: 'bg-green-lt text-green-dk border-green-200' },
  error: { icon: AlertCircle, className: 'bg-red-lt text-red-dk border-red-200' },
  warning: { icon: AlertTriangle, className: 'bg-amber-lt text-amber-dk border-amber-200' },
  info: { icon: Info, className: 'bg-blue-lt text-blue-dk border-blue-200' }
};

export function ToastContainer() {
  const { toasts, removeToast } = useNotificationStore();

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 pointer-events-none md:bottom-6 md:right-6">
      <AnimatePresence>
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onClose={() => removeToast(toast.id)} />
        ))}
      </AnimatePresence>
    </div>
  );
}

function ToastItem({ toast, onClose }: { toast: ToastMessage; onClose: () => void }) {
  const config = toastConfig[toast.type];
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className={cn(
        'pointer-events-auto flex items-start gap-3 w-80 p-4 rounded-lg shadow-lg border',
        config.className
      )}
    >
      <Icon className="h-5 w-5 shrink-0" />
      <div className="flex-1 flex flex-col">
        {toast.title && <h4 className="text-[14px] font-[600] leading-none mb-1">{toast.title}</h4>}
        <p className="text-[13px] opacity-90 leading-snug">{toast.message}</p>
      </div>
      <button 
        onClick={onClose}
        className="shrink-0 p-1 rounded-md opacity-70 hover:opacity-100 hover:bg-black/5 transition-colors focus:outline-none"
      >
        <X className="h-4 w-4" />
      </button>
    </motion.div>
  );
}
