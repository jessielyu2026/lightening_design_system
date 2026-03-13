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

export type MitreVariant =
  | 'mitre-credential-access'
  | 'mitre-initial-access'
  | 'mitre-persistence'
  | 'mitre-privilege-escalation'
  | 'mitre-discovery'
  | 'mitre-lateral-movement'
  | 'mitre-impact'
  | 'mitre-exfiltration'
  | 'mitre-command-and-control'
  | 'mitre-collection'
  | 'mitre-reconnaissance';

type Props = {
  variant?: BadgeVariant | MitreVariant;
  children?: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
};

const isMitreVariant = (variant: string): variant is MitreVariant => {
  return variant.startsWith('mitre-');
};

export const Badge: React.FC<Props> = ({
  variant = 'new',
  children,
  className,
  icon,
}) => {
  const isMitre = isMitreVariant(variant);

  const classes = [
    'ds-badge',
    isMitre && 'ds-badge--mitre',
    `ds-badge--${variant}`,
    className,
  ].filter(Boolean).join(' ');

  return (
    <span className={classes}>
      {icon && <span className="ds-badge--mitre-icon">{icon}</span>}
      {children}
    </span>
  );
};
