import React, { useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import './modal.css';

type ModalSize = 'small' | 'medium' | 'large' | 'xlarge';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  size?: ModalSize;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  children: React.ReactNode;
  className?: string;
};

type ModalHeaderProps = {
  title: string;
  subtitle?: string;
  onClose?: () => void;
  showCloseButton?: boolean;
  className?: string;
};

type ModalBodyProps = {
  children: React.ReactNode;
  className?: string;
};

type ModalFooterProps = {
  children: React.ReactNode;
  align?: 'left' | 'center' | 'right' | 'space-between';
  className?: string;
};

type ModalSlotProps = {
  children: React.ReactNode;
  className?: string;
};

// Close icon
const CloseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  size = 'medium',
  closeOnOverlayClick = true,
  closeOnEscape = true,
  children,
  className = '',
}) => {
  // Handle escape key
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (closeOnEscape && e.key === 'Escape') {
      onClose();
    }
  }, [closeOnEscape, onClose]);

  // Handle overlay click
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (closeOnOverlayClick && e.target === e.currentTarget) {
      onClose();
    }
  };

  // Add/remove event listeners and body scroll lock
  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  const modalClasses = [
    'ds-modal',
    `ds-modal--${size}`,
    className,
  ].filter(Boolean).join(' ');

  const modalContent = (
    <div
      className="ds-modal-overlay"
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
    >
      <div className={modalClasses}>
        {children}
      </div>
    </div>
  );

  // Render to portal
  return createPortal(modalContent, document.body);
};

export const ModalHeader: React.FC<ModalHeaderProps> = ({
  title,
  subtitle,
  onClose,
  showCloseButton = true,
  className = '',
}) => {
  const headerClasses = [
    'ds-modal__header',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={headerClasses}>
      <div className="ds-modal__header-content">
        <h2 className="ds-modal__title">{title}</h2>
        {subtitle && <p className="ds-modal__subtitle">{subtitle}</p>}
      </div>
      {showCloseButton && onClose && (
        <button
          type="button"
          className="ds-modal__close"
          onClick={onClose}
          aria-label="Close modal"
        >
          <CloseIcon />
        </button>
      )}
    </div>
  );
};

export const ModalBody: React.FC<ModalBodyProps> = ({
  children,
  className = '',
}) => {
  const bodyClasses = [
    'ds-modal__body',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={bodyClasses}>
      {children}
    </div>
  );
};

export const ModalFooter: React.FC<ModalFooterProps> = ({
  children,
  align = 'right',
  className = '',
}) => {
  const footerClasses = [
    'ds-modal__footer',
    align === 'left' ? 'ds-modal__footer--left' : '',
    align === 'center' ? 'ds-modal__footer--center' : '',
    align === 'space-between' ? 'ds-modal__footer--space-between' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={footerClasses}>
      {children}
    </div>
  );
};

export const ModalSlot: React.FC<ModalSlotProps> = ({
  children,
  className = '',
}) => {
  const slotClasses = [
    'ds-modal__slot',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={slotClasses}>
      {children}
    </div>
  );
};

export type { ModalProps, ModalSize, ModalHeaderProps, ModalBodyProps, ModalFooterProps, ModalSlotProps };
