import React, { createContext, useContext, useState, useCallback, useId } from 'react';
import './toast.css';

type ToastType = 'loading' | 'success' | 'error' | 'general';
type ToastPosition = 'top-right' | 'top-left' | 'top-center' | 'bottom-right' | 'bottom-left' | 'bottom-center';

type ToastProps = {
  type?: ToastType;
  title?: string;
  description?: string;
  linkText?: string;
  onLinkClick?: () => void;
  onClose?: () => void;
  showIcon?: boolean;
  showCloseButton?: boolean;
  icon?: React.ReactNode;
  className?: string;
};

const CloseIcon = () => (
  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 1L1 9M1 1L9 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const SuccessIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" fill="currentColor"/>
    <path d="M8 12L11 15L16 9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ErrorIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" fill="currentColor"/>
    <path d="M12 8V12M12 16H12.01" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const LoadingSpinner = () => (
  <div className="ds-toast__spinner" />
);

export const Toast: React.FC<ToastProps> = ({
  type = 'general',
  title,
  description,
  linkText,
  onLinkClick,
  onClose,
  showIcon = true,
  showCloseButton = true,
  icon,
  className = '',
}) => {
  const renderIcon = () => {
    if (!showIcon) return null;

    if (icon) {
      return <div className="ds-toast__icon">{icon}</div>;
    }

    switch (type) {
      case 'loading':
        return (
          <div className="ds-toast__icon">
            <LoadingSpinner />
          </div>
        );
      case 'success':
        return (
          <div className="ds-toast__icon ds-toast__icon--success">
            <SuccessIcon />
          </div>
        );
      case 'error':
        return (
          <div className="ds-toast__icon ds-toast__icon--error">
            <ErrorIcon />
          </div>
        );
      case 'general':
      default:
        return null;
    }
  };

  const toastClasses = [
    'ds-toast',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={toastClasses} role="alert">
      {renderIcon()}
      <div className="ds-toast__content">
        {title && <p className="ds-toast__title">{title}</p>}
        {description && <p className="ds-toast__description">{description}</p>}
        {linkText && (
          <button type="button" className="ds-toast__link" onClick={onLinkClick}>
            {linkText}
          </button>
        )}
      </div>
      {showCloseButton && onClose && (
        <button
          type="button"
          className="ds-toast__close"
          onClick={onClose}
          aria-label="Close"
        >
          <CloseIcon />
        </button>
      )}
    </div>
  );
};

// Toast Context and Provider for managing toasts globally
type ToastItem = {
  id: string;
  type: ToastType;
  title?: string;
  description?: string;
  linkText?: string;
  onLinkClick?: () => void;
  duration?: number;
  showIcon?: boolean;
  showCloseButton?: boolean;
};

type ToastContextType = {
  toasts: ToastItem[];
  addToast: (toast: Omit<ToastItem, 'id'>) => string;
  removeToast: (id: string) => void;
  clearToasts: () => void;
};

const ToastContext = createContext<ToastContextType | null>(null);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

type ToastProviderProps = {
  children: React.ReactNode;
  position?: ToastPosition;
  maxToasts?: number;
};

export const ToastProvider: React.FC<ToastProviderProps> = ({
  children,
  position = 'top-right',
  maxToasts = 5,
}) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const baseId = useId();
  let toastCounter = 0;

  const addToast = useCallback((toast: Omit<ToastItem, 'id'>) => {
    const id = `${baseId}-toast-${toastCounter++}-${Date.now()}`;
    const newToast: ToastItem = { ...toast, id };

    setToasts((prev) => {
      const updated = [...prev, newToast];
      return updated.slice(-maxToasts);
    });

    // Auto-remove after duration (default 5000ms, except for loading which doesn't auto-dismiss)
    if (toast.type !== 'loading') {
      const duration = toast.duration ?? 5000;
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }

    return id;
  }, [baseId, maxToasts]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const clearToasts = useCallback(() => {
    setToasts([]);
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast, clearToasts }}>
      {children}
      <ToastContainer position={position} />
    </ToastContext.Provider>
  );
};

type ToastContainerProps = {
  position?: ToastPosition;
};

const ToastContainer: React.FC<ToastContainerProps> = ({ position = 'top-right' }) => {
  const { toasts, removeToast } = useToast();

  const containerClasses = [
    'ds-toast-container',
    `ds-toast-container--${position}`,
  ].join(' ');

  return (
    <div className={containerClasses}>
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          type={toast.type}
          title={toast.title}
          description={toast.description}
          linkText={toast.linkText}
          onLinkClick={toast.onLinkClick}
          showIcon={toast.showIcon}
          showCloseButton={toast.showCloseButton}
          onClose={() => removeToast(toast.id)}
          className="ds-toast--entering"
        />
      ))}
    </div>
  );
};

export type { ToastProps, ToastType, ToastPosition, ToastItem };
