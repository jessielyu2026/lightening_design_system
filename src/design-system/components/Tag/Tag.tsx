
import React from 'react';
import './tag.css';

type Props = React.PropsWithChildren<{
  variant?: 'neutral' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md';
  className?: string;
}>;

export const Tag: React.FC<Props> = ({ variant = 'neutral', size = 'md', className, children }) => {
  const classes = ['ds-tag', `ds-tag--${variant}`, `ds-tag--${size}`, className].filter(Boolean).join(' ');
  return <span className={classes}>{children}</span>;
};
