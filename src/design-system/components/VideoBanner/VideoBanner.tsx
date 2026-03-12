import React from 'react';
import './videobanner.css';

type VideoBannerProps = {
  header: string;
  description: string;
  buttonText?: string;
  buttonIcon?: React.ReactNode;
  onButtonClick?: () => void;
  thumbnailSrc?: string;
  thumbnailAlt?: string;
  videoDuration?: string;
  onVideoClick?: () => void;
  className?: string;
};

const DefaultButtonIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 4C2 2.89543 2.89543 2 4 2H6C7.10457 2 8 2.89543 8 4V6C8 7.10457 7.10457 8 6 8H4C2.89543 8 2 7.10457 2 6V4Z" stroke="currentColor" strokeWidth="1.25"/>
    <path d="M2 10C2 8.89543 2.89543 8 4 8H6C7.10457 8 8 8.89543 8 10V12C8 13.1046 7.10457 14 6 14H4C2.89543 14 2 13.1046 2 12V10Z" stroke="currentColor" strokeWidth="1.25"/>
    <path d="M8 4C8 2.89543 8.89543 2 10 2H12C13.1046 2 14 2.89543 14 4V12C14 13.1046 13.1046 14 12 14H10C8.89543 14 8 13.1046 8 12V4Z" stroke="currentColor" strokeWidth="1.25"/>
  </svg>
);

const PlayIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 3.5V12.5C4 12.9659 4.5 13.25 4.9 13L12.1 8.5C12.5 8.25 12.5 7.75 12.1 7.5L4.9 3C4.5 2.75 4 3.0341 4 3.5Z" fill="currentColor"/>
  </svg>
);

export const VideoBanner: React.FC<VideoBannerProps> = ({
  header,
  description,
  buttonText = 'Learn More',
  buttonIcon,
  onButtonClick,
  thumbnailSrc,
  thumbnailAlt = 'Video thumbnail',
  videoDuration = '0:52',
  onVideoClick,
  className = '',
}) => {
  const classes = ['ds-video-banner', className].filter(Boolean).join(' ');

  return (
    <div className={classes}>
      {/* Content Block */}
      <div className="ds-video-banner__content">
        <div className="ds-video-banner__text">
          <h3 className="ds-video-banner__header">{header}</h3>
          <p className="ds-video-banner__description">{description}</p>
        </div>
        <button
          type="button"
          className="ds-video-banner__button"
          onClick={onButtonClick}
        >
          <span className="ds-video-banner__button-icon">
            {buttonIcon || <DefaultButtonIcon />}
          </span>
          {buttonText}
        </button>
      </div>

      {/* Video Thumbnail */}
      <div
        className="ds-video-banner__thumbnail"
        onClick={onVideoClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onVideoClick?.();
          }
        }}
      >
        <div className="ds-video-banner__video-preview">
          {thumbnailSrc ? (
            <img
              src={thumbnailSrc}
              alt={thumbnailAlt}
              className="ds-video-banner__video-image"
            />
          ) : (
            <DefaultThumbnail />
          )}
          <div className="ds-video-banner__play-button">
            <PlayIcon />
          </div>
          <div className="ds-video-banner__timestamp">
            <span className="ds-video-banner__timestamp-text">{videoDuration}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const DefaultThumbnail: React.FC = () => (
  <svg
    width="180"
    height="100"
    viewBox="0 0 180 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ width: '100%', height: '100%' }}
  >
    <rect width="180" height="100" fill="#2e3a46" />
    <path
      d="M90 30L120 70H60L90 30Z"
      fill="#f97316"
      opacity="0.8"
    />
    <path
      d="M70 45L90 70H50L70 45Z"
      fill="#fb923c"
      opacity="0.6"
    />
    <rect x="130" y="10" width="40" height="8" rx="2" fill="#455465" opacity="0.5" />
  </svg>
);

export default VideoBanner;
