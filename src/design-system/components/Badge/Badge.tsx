import React from 'react';
import './badge.css';

export type BadgeVariant =
  | 'new'
  | 'preview'
  | 'created'
  | 'updated'
  | 'deleted'
  | 'disabled'
  | 'info'
  | 'info-light'
  | 'low'
  | 'medium'
  | 'high'
  | 'critical'
  | 'beta'
  | 'recommended'
  | 'draft'
  | 'extrascope'
  | 'gray';

type Props = {
  variant?: BadgeVariant;
  children?: React.ReactNode;
  className?: string;
};

export const Badge: React.FC<Props> = ({
  variant = 'new',
  children,
  className,
}) => {
  const classes = [
    'ds-badge',
    `ds-badge--${variant}`,
    className,
  ].filter(Boolean).join(' ');

  return <span className={classes}>{children}</span>;
};
