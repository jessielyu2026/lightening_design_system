
import React from 'react';
import './card.css';

export const Card: React.FC<React.PropsWithChildren<{ className?: string }>> = ({ className, children }) => (
  <div className={["ds-card", className].filter(Boolean).join(' ')}>{children}</div>
);
export const CardHeader: React.FC<React.PropsWithChildren<{ className?: string }>> = ({ className, children }) => (
  <div className={["ds-card__header", className].filter(Boolean).join(' ')}>{children}</div>
);
export const CardBody: React.FC<React.PropsWithChildren<{ className?: string }>> = ({ className, children }) => (
  <div className={["ds-card__body", className].filter(Boolean).join(' ')}>{children}</div>
);
export const CardFooter: React.FC<React.PropsWithChildren<{ className?: string }>> = ({ className, children }) => (
  <div className={["ds-card__footer", className].filter(Boolean).join(' ')}>{children}</div>
);
