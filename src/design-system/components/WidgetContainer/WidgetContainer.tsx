import React from 'react';
import './widgetcontainer.css';

type WidgetSize = '1x1' | '2x1' | '3x1' | '4x1' | '2x2';

type WidgetContainerProps = React.PropsWithChildren<{
  title?: string;
  size?: WidgetSize;
  loading?: boolean;
  className?: string;
}>;

export const WidgetContainer: React.FC<WidgetContainerProps> = ({
  title,
  size = '1x1',
  loading = false,
  className = '',
  children,
}) => {
  const classes = [
    'ds-widget',
    `ds-widget--${size.replace('x', '-')}`,
    loading ? 'ds-widget--loading' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={classes}>
      {title && (
        <div className="ds-widget__header">
          <h3 className="ds-widget__title">{title}</h3>
        </div>
      )}
      <div className="ds-widget__content">
        {loading ? (
          <div className="ds-widget__loader">
            <div className="ds-widget__spinner" />
          </div>
        ) : (
          children
        )}
      </div>
    </div>
  );
};

type WidgetStatProps = {
  label: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon?: React.ReactNode;
  className?: string;
};

export const WidgetStat: React.FC<WidgetStatProps> = ({
  label,
  value,
  change,
  changeType = 'neutral',
  icon,
  className = '',
}) => {
  return (
    <div className={`ds-widget-stat ${className}`}>
      {icon && <div className="ds-widget-stat__icon">{icon}</div>}
      <div className="ds-widget-stat__content">
        <span className="ds-widget-stat__label">{label}</span>
        <span className="ds-widget-stat__value">{value}</span>
        {change && (
          <span className={`ds-widget-stat__change ds-widget-stat__change--${changeType}`}>
            {change}
          </span>
        )}
      </div>
    </div>
  );
};

type WidgetGridProps = React.PropsWithChildren<{
  columns?: 1 | 2 | 3 | 4;
  gap?: 'sm' | 'md' | 'lg';
  className?: string;
}>;

export const WidgetGrid: React.FC<WidgetGridProps> = ({
  columns = 2,
  gap = 'md',
  className = '',
  children,
}) => {
  const classes = [
    'ds-widget-grid',
    `ds-widget-grid--cols-${columns}`,
    `ds-widget-grid--gap-${gap}`,
    className,
  ].filter(Boolean).join(' ');

  return <div className={classes}>{children}</div>;
};
