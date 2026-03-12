import React, { useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import './slideout.css';

type SlideoutSize = 'sm' | 'md' | 'lg' | 'xl';

type SlideoutTab = {
  id: string;
  label: string;
  icon?: React.ReactNode;
  closable?: boolean;
};

type SlideoutAnchor = {
  id: string;
  label: string;
};

type SlideoutProps = {
  isOpen: boolean;
  onClose: () => void;
  size?: SlideoutSize;
  tabs?: SlideoutTab[];
  activeTabId?: string;
  onTabChange?: (tabId: string) => void;
  onTabClose?: (tabId: string) => void;
  showTabNav?: boolean;
  onPrevTab?: () => void;
  onNextTab?: () => void;
  canPrev?: boolean;
  canNext?: boolean;
  children: React.ReactNode;
  className?: string;
};

type SlideoutHeaderProps = {
  icon?: React.ReactNode;
  iconColor?: 'blue' | 'purple' | 'green' | 'orange';
  title: React.ReactNode;
  titleHref?: string;
  subtitle?: string;
  actions?: React.ReactNode;
};

type SlideoutBodyProps = {
  anchors?: SlideoutAnchor[];
  activeAnchorId?: string;
  onAnchorChange?: (anchorId: string) => void;
  children: React.ReactNode;
};

type SlideoutSectionProps = {
  id?: string;
  title?: string;
  description?: string;
  children: React.ReactNode;
};

type SlideoutFooterProps = {
  split?: boolean;
  children: React.ReactNode;
};

// Icons
const CloseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ChevronLeftIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ChevronRightIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ExternalLinkIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10.5 7.58333V11.0833C10.5 11.3928 10.3771 11.6895 10.1583 11.9083C9.93951 12.1271 9.64275 12.25 9.33333 12.25H2.91667C2.60725 12.25 2.31049 12.1271 2.09171 11.9083C1.87292 11.6895 1.75 11.3928 1.75 11.0833V4.66667C1.75 4.35725 1.87292 4.06049 2.09171 3.84171C2.31049 3.62292 2.60725 3.5 2.91667 3.5H6.41667" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M8.75 1.75H12.25V5.25" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M5.83337 8.16667L12.25 1.75" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const SmallCloseIcon = () => (
  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7.5 2.5L2.5 7.5M2.5 2.5L7.5 7.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const Slideout: React.FC<SlideoutProps> = ({
  isOpen,
  onClose,
  size = 'md',
  tabs,
  activeTabId,
  onTabChange,
  onTabClose,
  showTabNav = false,
  onPrevTab,
  onNextTab,
  canPrev = false,
  canNext = false,
  children,
  className = '',
}) => {
  // Handle escape key
  const handleEscape = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape' && isOpen) {
      onClose();
    }
  }, [isOpen, onClose]);

  useEffect(() => {
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [handleEscape]);

  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const slideoutClasses = [
    'ds-slideout',
    isOpen ? 'ds-slideout--open' : '',
    `ds-slideout--${size}`,
    className,
  ].filter(Boolean).join(' ');

  const content = (
    <>
      <div
        className={`ds-slideout-overlay ${isOpen ? 'ds-slideout-overlay--open' : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        className={slideoutClasses}
        role="dialog"
        aria-modal="true"
      >
        {/* Tab Bar */}
        {tabs && tabs.length > 0 && (
          <div className="ds-slideout__tab-bar">
            <button
              type="button"
              className="ds-slideout__tab-bar-close"
              onClick={onClose}
              aria-label="Close slideout"
            >
              <CloseIcon />
            </button>

            {showTabNav && (
              <div className="ds-slideout__tab-bar-nav">
                <button
                  type="button"
                  className="ds-slideout__tab-bar-nav-btn"
                  onClick={onPrevTab}
                  disabled={!canPrev}
                  aria-label="Previous tab"
                >
                  <ChevronLeftIcon />
                </button>
                <button
                  type="button"
                  className="ds-slideout__tab-bar-nav-btn"
                  onClick={onNextTab}
                  disabled={!canNext}
                  aria-label="Next tab"
                >
                  <ChevronRightIcon />
                </button>
              </div>
            )}

            <div className="ds-slideout__tabs">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  className={`ds-slideout__tab ${activeTabId === tab.id ? 'ds-slideout__tab--active' : ''}`}
                  onClick={() => onTabChange?.(tab.id)}
                >
                  {tab.icon && (
                    <span className="ds-slideout__tab-icon">{tab.icon}</span>
                  )}
                  <span className="ds-slideout__tab-label">{tab.label}</span>
                  {tab.closable !== false && (
                    <span
                      className="ds-slideout__tab-close"
                      onClick={(e) => {
                        e.stopPropagation();
                        onTabClose?.(tab.id);
                      }}
                      role="button"
                      aria-label={`Close ${tab.label} tab`}
                    >
                      <SmallCloseIcon />
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {children}
      </div>
    </>
  );

  if (typeof document === 'undefined') {
    return null;
  }

  return createPortal(content, document.body);
};

export const SlideoutHeader: React.FC<SlideoutHeaderProps> = ({
  icon,
  iconColor = 'blue',
  title,
  titleHref,
  subtitle,
  actions,
}) => {
  return (
    <div className="ds-slideout__header">
      {icon && (
        <div className={`ds-slideout__header-icon ds-slideout__header-icon--${iconColor}`}>
          {icon}
        </div>
      )}
      <div className="ds-slideout__header-content">
        <h2 className="ds-slideout__header-title">
          {titleHref ? (
            <a href={titleHref} target="_blank" rel="noopener noreferrer">
              {title}
              <span className="ds-slideout__header-title-icon">
                <ExternalLinkIcon />
              </span>
            </a>
          ) : (
            title
          )}
        </h2>
        {subtitle && (
          <p className="ds-slideout__header-subtitle">{subtitle}</p>
        )}
      </div>
      {actions && (
        <div className="ds-slideout__header-actions">
          {actions}
        </div>
      )}
    </div>
  );
};

export const SlideoutBody: React.FC<SlideoutBodyProps> = ({
  anchors,
  activeAnchorId,
  onAnchorChange,
  children,
}) => {
  return (
    <div className="ds-slideout__body">
      {anchors && anchors.length > 0 && (
        <div className="ds-slideout__anchors">
          {anchors.map((anchor) => (
            <button
              key={anchor.id}
              type="button"
              className={`ds-slideout__anchor ${activeAnchorId === anchor.id ? 'ds-slideout__anchor--active' : ''}`}
              onClick={() => onAnchorChange?.(anchor.id)}
            >
              {anchor.label}
            </button>
          ))}
        </div>
      )}
      <div className="ds-slideout__content">
        {children}
      </div>
    </div>
  );
};

export const SlideoutSection: React.FC<SlideoutSectionProps> = ({
  id,
  title,
  description,
  children,
}) => {
  return (
    <div className="ds-slideout__section" id={id}>
      {title && (
        <h3 className="ds-slideout__section-title">{title}</h3>
      )}
      {description && (
        <p className="ds-slideout__section-description">{description}</p>
      )}
      <div className="ds-slideout__section-content">
        {children}
      </div>
    </div>
  );
};

export const SlideoutDivider: React.FC = () => {
  return <div className="ds-slideout__divider" />;
};

export const SlideoutFooter: React.FC<SlideoutFooterProps> = ({
  split = false,
  children,
}) => {
  return (
    <div className={`ds-slideout__footer ${split ? 'ds-slideout__footer--split' : ''}`}>
      {children}
    </div>
  );
};

export const SlideoutFooterGroup: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="ds-slideout__footer-group">{children}</div>;
};

export type {
  SlideoutProps,
  SlideoutSize,
  SlideoutTab,
  SlideoutAnchor,
  SlideoutHeaderProps,
  SlideoutBodyProps,
  SlideoutSectionProps,
  SlideoutFooterProps,
};
