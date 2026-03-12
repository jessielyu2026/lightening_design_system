import React from 'react';
import './status.css';

export type StatusVariant = 'enabled' | 'disabled' | 'success' | 'fail' | 'error' | 'warning';

type Props = {
  status?: StatusVariant;
  className?: string;
};

const CheckCircleIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M8 14.5C11.5899 14.5 14.5 11.5899 14.5 8C14.5 4.41015 11.5899 1.5 8 1.5C4.41015 1.5 1.5 4.41015 1.5 8C1.5 11.5899 4.41015 14.5 8 14.5ZM11.3536 6.35355C11.5488 6.15829 11.5488 5.84171 11.3536 5.64645C11.1583 5.45118 10.8417 5.45118 10.6464 5.64645L7 9.29289L5.35355 7.64645C5.15829 7.45118 4.84171 7.45118 4.64645 7.64645C4.45118 7.84171 4.45118 8.15829 4.64645 8.35355L6.64645 10.3536C6.84171 10.5488 7.15829 10.5488 7.35355 10.3536L11.3536 6.35355Z" fill="currentColor"/>
  </svg>
);

const DisableIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M8 14.5C11.5899 14.5 14.5 11.5899 14.5 8C14.5 4.41015 11.5899 1.5 8 1.5C4.41015 1.5 1.5 4.41015 1.5 8C1.5 11.5899 4.41015 14.5 8 14.5ZM4.5 8C4.5 7.72386 4.72386 7.5 5 7.5H11C11.2761 7.5 11.5 7.72386 11.5 8C11.5 8.27614 11.2761 8.5 11 8.5H5C4.72386 8.5 4.5 8.27614 4.5 8Z" fill="currentColor"/>
  </svg>
);

const CircleXmarkIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M8 14.5C11.5899 14.5 14.5 11.5899 14.5 8C14.5 4.41015 11.5899 1.5 8 1.5C4.41015 1.5 1.5 4.41015 1.5 8C1.5 11.5899 4.41015 14.5 8 14.5ZM5.64645 5.64645C5.84171 5.45118 6.15829 5.45118 6.35355 5.64645L8 7.29289L9.64645 5.64645C9.84171 5.45118 10.1583 5.45118 10.3536 5.64645C10.5488 5.84171 10.5488 6.15829 10.3536 6.35355L8.70711 8L10.3536 9.64645C10.5488 9.84171 10.5488 10.1583 10.3536 10.3536C10.1583 10.5488 9.84171 10.5488 9.64645 10.3536L8 8.70711L6.35355 10.3536C6.15829 10.5488 5.84171 10.5488 5.64645 10.3536C5.45118 10.1583 5.45118 9.84171 5.64645 9.64645L7.29289 8L5.64645 6.35355C5.45118 6.15829 5.45118 5.84171 5.64645 5.64645Z" fill="currentColor"/>
  </svg>
);

const CircleExclamationIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M8 14.5C11.5899 14.5 14.5 11.5899 14.5 8C14.5 4.41015 11.5899 1.5 8 1.5C4.41015 1.5 1.5 4.41015 1.5 8C1.5 11.5899 4.41015 14.5 8 14.5ZM8 4.5C8.27614 4.5 8.5 4.72386 8.5 5V8.5C8.5 8.77614 8.27614 9 8 9C7.72386 9 7.5 8.77614 7.5 8.5V5C7.5 4.72386 7.72386 4.5 8 4.5ZM8 11.5C8.41421 11.5 8.75 11.1642 8.75 10.75C8.75 10.3358 8.41421 10 8 10C7.58579 10 7.25 10.3358 7.25 10.75C7.25 11.1642 7.58579 11.5 8 11.5Z" fill="currentColor"/>
  </svg>
);

const TriangleExclamationIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M6.93933 2.5C7.52513 1.5 8.97487 1.5 9.56067 2.5L14.5607 11C15.1465 12 14.4216 13.25 13.25 13.25H3.25C2.07843 13.25 1.35351 12 1.93931 11L6.93933 2.5ZM8.25 5.75C8.25 5.47386 8.02614 5.25 7.75 5.25C7.47386 5.25 7.25 5.47386 7.25 5.75V8.25C7.25 8.52614 7.47386 8.75 7.75 8.75C8.02614 8.75 8.25 8.52614 8.25 8.25V5.75ZM7.75 11.25C8.16421 11.25 8.5 10.9142 8.5 10.5C8.5 10.0858 8.16421 9.75 7.75 9.75C7.33579 9.75 7 10.0858 7 10.5C7 10.9142 7.33579 11.25 7.75 11.25Z" fill="currentColor"/>
  </svg>
);

const statusConfig: Record<StatusVariant, { icon: React.ReactNode; label: string }> = {
  enabled: { icon: <CheckCircleIcon />, label: 'Enabled' },
  disabled: { icon: <DisableIcon />, label: 'Disabled' },
  success: { icon: <CheckCircleIcon />, label: 'Success' },
  fail: { icon: <CircleXmarkIcon />, label: 'Fail' },
  error: { icon: <CircleExclamationIcon />, label: 'Error' },
  warning: { icon: <TriangleExclamationIcon />, label: 'Warning' },
};

export const Status: React.FC<Props> = ({
  status = 'enabled',
  className,
}) => {
  const config = statusConfig[status];

  const classes = [
    'ds-status',
    `ds-status--${status}`,
    className,
  ].filter(Boolean).join(' ');

  return (
    <span className={classes}>
      <span className="ds-status__icon">{config.icon}</span>
      <span className="ds-status__label">{config.label}</span>
    </span>
  );
};
