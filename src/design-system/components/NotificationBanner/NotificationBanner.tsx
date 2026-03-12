import React from 'react';
import './notificationbanner.css';

type NotificationBannerStatus = 'info' | 'success' | 'warning' | 'error' | 'neutral' | 'readonly';

type NotificationBannerProps = {
  status?: NotificationBannerStatus;
  title?: string;
  description?: string;
  showTitle?: boolean;
  showDescription?: boolean;
  linkText?: string;
  linkHref?: string;
  onLinkClick?: () => void;
  buttonText?: string;
  onButtonClick?: () => void;
  showCloseButton?: boolean;
  onClose?: () => void;
  inlineLinkText?: string;
  inlineLinkHref?: string;
  onInlineLinkClick?: () => void;
  className?: string;
  children?: React.ReactNode;
};

// Status icons
const InfoIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18ZM10 6C10.4142 6 10.75 6.33579 10.75 6.75V10.25C10.75 10.6642 10.4142 11 10 11C9.58579 11 9.25 10.6642 9.25 10.25V6.75C9.25 6.33579 9.58579 6 10 6ZM10 14C10.5523 14 11 13.5523 11 13C11 12.4477 10.5523 12 10 12C9.44772 12 9 12.4477 9 13C9 13.5523 9.44772 14 10 14Z" fill="currentColor"/>
  </svg>
);

const SuccessIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18ZM13.7071 8.70711C14.0976 8.31658 14.0976 7.68342 13.7071 7.29289C13.3166 6.90237 12.6834 6.90237 12.2929 7.29289L9 10.5858L7.70711 9.29289C7.31658 8.90237 6.68342 8.90237 6.29289 9.29289C5.90237 9.68342 5.90237 10.3166 6.29289 10.7071L8.29289 12.7071C8.68342 13.0976 9.31658 13.0976 9.70711 12.7071L13.7071 8.70711Z" fill="currentColor"/>
  </svg>
);

const WarningIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M8.48509 3.52148C9.17161 2.28813 10.8284 2.28813 11.5149 3.52148L17.7944 14.8232C18.4809 16.0566 17.6525 17.5714 16.2795 17.5714H3.72053C2.3475 17.5714 1.51908 16.0566 2.20561 14.8232L8.48509 3.52148ZM10 7C10.4142 7 10.75 7.33579 10.75 7.75V11.25C10.75 11.6642 10.4142 12 10 12C9.58579 12 9.25 11.6642 9.25 11.25V7.75C9.25 7.33579 9.58579 7 10 7ZM10 15C10.5523 15 11 14.5523 11 14C11 13.4477 10.5523 13 10 13C9.44772 13 9 13.4477 9 14C9 14.5523 9.44772 15 10 15Z" fill="currentColor"/>
  </svg>
);

const ErrorIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18ZM7.70711 7.70711C7.31658 7.31658 6.68342 7.31658 6.29289 7.70711C5.90237 8.09763 5.90237 8.7308 6.29289 9.12132L8.17157 11L6.29289 12.8787C5.90237 13.2692 5.90237 13.9024 6.29289 14.2929C6.68342 14.6834 7.31658 14.6834 7.70711 14.2929L9.58579 12.4142L11.4645 14.2929C11.855 14.6834 12.4882 14.6834 12.8787 14.2929C13.2692 13.9024 13.2692 13.2692 12.8787 12.8787L11 11L12.8787 9.12132C13.2692 8.7308 13.2692 8.09763 12.8787 7.70711C12.4882 7.31658 11.855 7.31658 11.4645 7.70711L9.58579 9.58579L7.70711 7.70711Z" fill="currentColor"/>
  </svg>
);

const LockIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M10 2C7.79086 2 6 3.79086 6 6V7H5C4.44772 7 4 7.44772 4 8V16C4 16.5523 4.44772 17 5 17H15C15.5523 17 16 16.5523 16 16V8C16 7.44772 15.5523 7 15 7H14V6C14 3.79086 12.2091 2 10 2ZM12 7V6C12 4.89543 11.1046 4 10 4C8.89543 4 8 4.89543 8 6V7H12ZM10 10C10.5523 10 11 10.4477 11 11V13C11 13.5523 10.5523 14 10 14C9.44772 14 9 13.5523 9 13V11C9 10.4477 9.44772 10 10 10Z" fill="currentColor"/>
  </svg>
);

const CloseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const getStatusIcon = (status: NotificationBannerStatus) => {
  switch (status) {
    case 'success':
      return <SuccessIcon />;
    case 'warning':
      return <WarningIcon />;
    case 'error':
      return <ErrorIcon />;
    case 'readonly':
      return <LockIcon />;
    case 'info':
    case 'neutral':
    default:
      return <InfoIcon />;
  }
};

export const NotificationBanner: React.FC<NotificationBannerProps> = ({
  status = 'info',
  title,
  description,
  showTitle = true,
  showDescription = true,
  linkText,
  linkHref,
  onLinkClick,
  buttonText,
  onButtonClick,
  showCloseButton = true,
  onClose,
  inlineLinkText,
  inlineLinkHref,
  onInlineLinkClick,
  className = '',
  children,
}) => {
  const bannerClasses = [
    'ds-notification-banner',
    `ds-notification-banner--${status}`,
    className,
  ].filter(Boolean).join(' ');

  const hasActions = linkText || buttonText || showCloseButton;

  return (
    <div className={bannerClasses} role="alert">
      <div className="ds-notification-banner__content">
        <div className="ds-notification-banner__title-group">
          <span className="ds-notification-banner__icon" aria-hidden="true">
            {getStatusIcon(status)}
          </span>
          {showTitle && title && (
            <span className="ds-notification-banner__title">{title}</span>
          )}
        </div>
        {showDescription && description && (
          <span className="ds-notification-banner__description">{description}</span>
        )}
        {children}
        {inlineLinkText && (
          inlineLinkHref ? (
            <a href={inlineLinkHref} className="ds-notification-banner__inline-link">
              {inlineLinkText}
            </a>
          ) : (
            <button
              type="button"
              className="ds-notification-banner__inline-link"
              onClick={onInlineLinkClick}
            >
              {inlineLinkText}
            </button>
          )
        )}
      </div>

      {hasActions && (
        <div className="ds-notification-banner__actions">
          <div className="ds-notification-banner__buttons">
            {linkText && (
              linkHref ? (
                <a href={linkHref} className="ds-notification-banner__link">
                  {linkText}
                </a>
              ) : (
                <button
                  type="button"
                  className="ds-notification-banner__link"
                  onClick={onLinkClick}
                >
                  {linkText}
                </button>
              )
            )}
            {buttonText && onButtonClick && (
              <button
                type="button"
                className={status === 'readonly' ? 'ds-btn ds-btn--secondary-outlined ds-btn--xxs' : 'ds-btn ds-btn--primary ds-btn--xxs'}
                onClick={onButtonClick}
              >
                {buttonText}
              </button>
            )}
          </div>
          {showCloseButton && onClose && (
            <button
              type="button"
              className="ds-notification-banner__close"
              onClick={onClose}
              aria-label="Close notification"
            >
              <CloseIcon />
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export type { NotificationBannerProps, NotificationBannerStatus };
