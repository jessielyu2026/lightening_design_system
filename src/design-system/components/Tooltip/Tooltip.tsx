import React, { useState, useRef, useCallback } from 'react';
import './tooltip.css';

type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';
type TooltipVariant = 'default' | 'warning';

type TooltipProps = {
  content: React.ReactNode;
  children: React.ReactElement;
  position?: TooltipPosition;
  variant?: TooltipVariant;
  showArrow?: boolean;
  delay?: number;
  className?: string;
};

// Warning icon for warning variant
const WarningIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M8 5.5V8.5M8 10.5V10.51M3.07 14H12.93C14.07 14 14.77 12.77 14.2 11.8L9.27 3.2C8.7 2.23 7.3 2.23 6.73 3.2L1.8 11.8C1.23 12.77 1.93 14 3.07 14Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  position = 'top',
  variant = 'default',
  showArrow = true,
  delay = 0,
  className = '',
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showTooltip = useCallback(() => {
    if (delay > 0) {
      timeoutRef.current = setTimeout(() => {
        setIsVisible(true);
      }, delay);
    } else {
      setIsVisible(true);
    }
  }, [delay]);

  const hideTooltip = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsVisible(false);
  }, []);

  const tooltipClasses = [
    'ds-tooltip',
    `ds-tooltip--${position}`,
    variant === 'warning' ? 'ds-tooltip--warning' : '',
    !showArrow ? 'ds-tooltip--no-arrow' : '',
    isVisible ? 'ds-tooltip--visible' : '',
    className,
  ].filter(Boolean).join(' ');

  const renderContent = () => {
    if (variant === 'warning') {
      return (
        <div className="ds-tooltip__content">
          <span className="ds-tooltip__icon">
            <WarningIcon />
          </span>
          <span className="ds-tooltip__text">{content}</span>
        </div>
      );
    }
    return <div className="ds-tooltip__content">{content}</div>;
  };

  return (
    <div
      className="ds-tooltip-wrapper"
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      onFocus={showTooltip}
      onBlur={hideTooltip}
    >
      {children}
      <div
        className={tooltipClasses}
        role="tooltip"
        aria-hidden={!isVisible}
      >
        {renderContent()}
        {showArrow && <div className="ds-tooltip__arrow" />}
      </div>
    </div>
  );
};

export type { TooltipProps, TooltipPosition, TooltipVariant };
