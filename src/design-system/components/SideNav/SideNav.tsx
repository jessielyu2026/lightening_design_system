import React, { useState } from 'react';
import './sidenav.css';

type SideNavProps = React.PropsWithChildren<{
  collapsed?: boolean;
  logo?: React.ReactNode;
  onToggleCollapse?: () => void;
  className?: string;
}>;

export const SideNav: React.FC<SideNavProps> = ({
  collapsed = false,
  logo,
  onToggleCollapse,
  className = '',
  children,
}) => {
  const classes = [
    'ds-sidenav',
    collapsed ? 'ds-sidenav--collapsed' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <nav className={classes}>
      {(logo || onToggleCollapse) && (
        <div className="ds-sidenav__header">
          {logo && <div className="ds-sidenav__logo">{logo}</div>}
          {onToggleCollapse && (
            <button
              className="ds-sidenav__toggle"
              onClick={onToggleCollapse}
              aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              type="button"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 4L6 8L10 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          )}
        </div>
      )}
      <div className="ds-sidenav__content">
        {children}
      </div>
    </nav>
  );
};

type SideNavSectionProps = React.PropsWithChildren<{
  title?: string;
  defaultExpanded?: boolean;
  collapsible?: boolean;
  className?: string;
}>;

export const SideNavSection: React.FC<SideNavSectionProps> = ({
  title,
  defaultExpanded = true,
  collapsible = false,
  className = '',
  children,
}) => {
  const [expanded, setExpanded] = useState(defaultExpanded);

  const handleToggle = () => {
    if (collapsible) {
      setExpanded(!expanded);
    }
  };

  return (
    <div className={`ds-sidenav__section ${className}`}>
      {title && (
        <button
          className={`ds-sidenav__section-header ${collapsible ? 'ds-sidenav__section-header--collapsible' : ''}`}
          onClick={handleToggle}
          type="button"
          aria-expanded={expanded}
        >
          <span className="ds-sidenav__section-title">{title}</span>
          {collapsible && (
            <span className={`ds-sidenav__section-chevron ${expanded ? 'ds-sidenav__section-chevron--expanded' : ''}`}>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
          )}
        </button>
      )}
      {expanded && (
        <ul className="ds-sidenav__list">
          {children}
        </ul>
      )}
    </div>
  );
};

type SideNavItemLevel = 1 | 2 | 3;

type SideNavItemProps = React.PropsWithChildren<{
  href?: string;
  icon?: React.ReactNode;
  badge?: React.ReactNode;
  active?: boolean;
  disabled?: boolean;
  expandable?: boolean;
  expanded?: boolean;
  defaultExpanded?: boolean;
  level?: SideNavItemLevel;
  onClick?: React.MouseEventHandler;
  className?: string;
}>;

export const SideNavItem: React.FC<SideNavItemProps> = ({
  href,
  icon,
  badge,
  active = false,
  disabled = false,
  expandable = false,
  expanded: controlledExpanded,
  defaultExpanded = false,
  level = 1,
  onClick,
  className = '',
  children,
}) => {
  const [internalExpanded, setInternalExpanded] = useState(defaultExpanded);
  const expanded = controlledExpanded ?? internalExpanded;

  // Check if children contains sub-items (for expandable items)
  const hasSubItems = expandable && React.Children.count(children) > 0;
  const isTextOnly = !hasSubItems;

  const classes = [
    'ds-sidenav__item',
    `ds-sidenav__item--level-${level}`,
    active ? 'ds-sidenav__item--active' : '',
    disabled ? 'ds-sidenav__item--disabled' : '',
    expandable ? 'ds-sidenav__item--expandable' : '',
    expanded ? 'ds-sidenav__item--expanded' : '',
    className,
  ].filter(Boolean).join(' ');

  const handleClick = (e: React.MouseEvent) => {
    if (expandable && hasSubItems) {
      e.preventDefault();
      setInternalExpanded(!expanded);
    }
    onClick?.(e);
  };

  const content = (
    <>
      {icon && <span className="ds-sidenav__item-icon">{icon}</span>}
      <span className="ds-sidenav__item-label">{isTextOnly ? children : (typeof children === 'string' ? children : React.Children.toArray(children)[0])}</span>
      {badge && <span className="ds-sidenav__item-badge">{badge}</span>}
      {expandable && (
        <span className={`ds-sidenav__item-chevron ${expanded ? 'ds-sidenav__item-chevron--expanded' : ''}`}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
      )}
    </>
  );

  const itemElement = href && !disabled ? (
    <a className={classes} href={href} onClick={handleClick}>
      {content}
    </a>
  ) : (
    <button
      className={classes}
      onClick={handleClick}
      disabled={disabled}
      type="button"
    >
      {content}
    </button>
  );

  return (
    <li className="ds-sidenav__item-wrapper">
      {itemElement}
      {expandable && hasSubItems && expanded && (
        <ul className="ds-sidenav__sublist">
          {React.Children.toArray(children).slice(1)}
        </ul>
      )}
    </li>
  );
};

type SideNavSubItemProps = React.PropsWithChildren<{
  href?: string;
  active?: boolean;
  badge?: React.ReactNode;
  onClick?: React.MouseEventHandler;
  className?: string;
}>;

export const SideNavSubItem: React.FC<SideNavSubItemProps> = ({
  href,
  active = false,
  badge,
  onClick,
  className = '',
  children,
}) => {
  const classes = [
    'ds-sidenav__subitem',
    active ? 'ds-sidenav__subitem--active' : '',
    className,
  ].filter(Boolean).join(' ');

  const content = (
    <>
      <span className="ds-sidenav__subitem-branch" aria-hidden="true" />
      <span className="ds-sidenav__subitem-content">
        <span className="ds-sidenav__subitem-label">{children}</span>
        {badge && <span className="ds-sidenav__subitem-badge">{badge}</span>}
      </span>
    </>
  );

  if (href) {
    return (
      <li className="ds-sidenav__subitem-wrapper">
        <a className={classes} href={href} onClick={onClick}>
          {content}
        </a>
      </li>
    );
  }

  return (
    <li className="ds-sidenav__subitem-wrapper">
      <button className={classes} onClick={onClick} type="button">
        {content}
      </button>
    </li>
  );
};

type SideNavDividerProps = {
  className?: string;
};

export const SideNavDivider: React.FC<SideNavDividerProps> = ({
  className = '',
}) => {
  return <div className={`ds-sidenav__divider ${className}`} />;
};

type SideNavFooterProps = React.PropsWithChildren<{
  className?: string;
}>;

export const SideNavFooter: React.FC<SideNavFooterProps> = ({
  className = '',
  children,
}) => {
  return (
    <div className={`ds-sidenav__footer ${className}`}>
      {children}
    </div>
  );
};
