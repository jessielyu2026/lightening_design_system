import React from 'react';
import './pill.css';

type PillVariant = 'default' | 'new' | 'warning' | 'error' | 'deleted';

type PillProps = {
  variant?: PillVariant;
  children: React.ReactNode;
  icon?: React.ReactNode;
  showCloseButton?: boolean;
  onClose?: () => void;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
};

type PillGroupProps = {
  children: React.ReactNode;
  className?: string;
};

// Close icon
const CloseIcon = () => (
  <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 2L2 6M2 2L6 6" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Default location icon
const LocationIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 6.5C6.82843 6.5 7.5 5.82843 7.5 5C7.5 4.17157 6.82843 3.5 6 3.5C5.17157 3.5 4.5 4.17157 4.5 5C4.5 5.82843 5.17157 6.5 6 6.5Z" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M6 11C6 11 10 7.5 10 5C10 2.79086 8.20914 1 6 1C3.79086 1 2 2.79086 2 5C2 7.5 6 11 6 11Z" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const Pill: React.FC<PillProps> = ({
  variant = 'default',
  children,
  icon,
  showCloseButton = true,
  onClose,
  onClick,
  disabled = false,
  className = '',
}) => {
  const pillClasses = [
    'ds-pill',
    `ds-pill--${variant}`,
    disabled ? 'ds-pill--disabled' : '',
    onClick ? 'ds-pill--clickable' : '',
    className,
  ].filter(Boolean).join(' ');

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!disabled && onClose) {
      onClose();
    }
  };

  const handleClick = () => {
    if (!disabled && onClick) {
      onClick();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <div
      className={pillClasses}
      onClick={onClick ? handleClick : undefined}
      onKeyDown={onClick ? handleKeyDown : undefined}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick && !disabled ? 0 : undefined}
      aria-disabled={disabled}
    >
      {icon !== undefined ? (
        icon && <span className="ds-pill__icon">{icon}</span>
      ) : (
        <span className="ds-pill__icon">
          <LocationIcon />
        </span>
      )}
      <span className="ds-pill__text">{children}</span>
      {showCloseButton && onClose && (
        <button
          type="button"
          className="ds-pill__close"
          onClick={handleClose}
          aria-label="Remove"
          disabled={disabled}
        >
          <CloseIcon />
        </button>
      )}
    </div>
  );
};

export const PillGroup: React.FC<PillGroupProps> = ({
  children,
  className = '',
}) => {
  const groupClasses = ['ds-pill-group', className].filter(Boolean).join(' ');

  return <div className={groupClasses}>{children}</div>;
};

export type { PillProps, PillVariant, PillGroupProps };
