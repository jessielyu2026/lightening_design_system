import React from 'react';
import './header.css';

type BreadcrumbItem = {
  label: string;
  href?: string;
  icon?: React.ReactNode;
};

type HeaderProps = React.PropsWithChildren<{
  breadcrumbs?: BreadcrumbItem[];
  title?: string;
  searchPlaceholder?: string;
  onSearch?: (value: string) => void;
  avatar?: {
    src: string;
    alt?: string;
  };
  actionButton?: {
    icon: React.ReactNode;
    onClick?: () => void;
    ariaLabel?: string;
  };
  sticky?: boolean;
  className?: string;
}>;

export const Header: React.FC<HeaderProps> = ({
  breadcrumbs,
  title,
  searchPlaceholder = 'Search',
  onSearch,
  avatar,
  actionButton,
  sticky = false,
  className = '',
  children,
}) => {
  const classes = [
    'ds-header',
    sticky ? 'ds-header--sticky' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <header className={classes}>
      <div className="ds-header__left">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <Breadcrumb items={breadcrumbs} />
        )}
        {title && <h1 className="ds-header__title">{title}</h1>}
      </div>

      <div className="ds-header__right">
        <SearchInput
          placeholder={searchPlaceholder}
          onSearch={onSearch}
        />
        {avatar && (
          <div className="ds-header__avatar">
            <img src={avatar.src} alt={avatar.alt || 'User avatar'} />
          </div>
        )}
        {actionButton && (
          <button
            className="ds-header__action-btn"
            onClick={actionButton.onClick}
            aria-label={actionButton.ariaLabel || 'Action'}
            type="button"
          >
            {actionButton.icon}
          </button>
        )}
        {children}
      </div>
    </header>
  );
};

type BreadcrumbProps = {
  items: BreadcrumbItem[];
  className?: string;
};

export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  className = '',
}) => {
  const classes = ['ds-breadcrumb', className].filter(Boolean).join(' ');

  return (
    <nav className={classes} aria-label="Breadcrumb">
      <ol className="ds-breadcrumb__list">
        {items.map((item, index) => (
          <li key={index} className="ds-breadcrumb__item">
            {index > 0 && (
              <span className="ds-breadcrumb__separator">/</span>
            )}
            {item.icon && (
              <span className="ds-breadcrumb__icon">{item.icon}</span>
            )}
            {item.href ? (
              <a href={item.href} className="ds-breadcrumb__link">
                {item.label}
              </a>
            ) : (
              <span className="ds-breadcrumb__text">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

type SearchInputProps = {
  placeholder?: string;
  onSearch?: (value: string) => void;
  className?: string;
};

export const SearchInput: React.FC<SearchInputProps> = ({
  placeholder = 'Search',
  onSearch,
  className = '',
}) => {
  const classes = ['ds-search-input', className].filter(Boolean).join(' ');

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && onSearch) {
      onSearch((e.target as HTMLInputElement).value);
    }
  };

  return (
    <div className={classes}>
      <span className="ds-search-input__icon">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14 14L10 10M11.3333 6.66667C11.3333 9.244 9.244 11.3333 6.66667 11.3333C4.08934 11.3333 2 9.244 2 6.66667C2 4.08934 4.08934 2 6.66667 2C9.244 2 11.3333 4.08934 11.3333 6.66667Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </span>
      <input
        type="text"
        className="ds-search-input__field"
        placeholder={placeholder}
        onKeyDown={handleKeyDown}
      />
      <kbd className="ds-search-input__shortcut">
        <span className="ds-search-input__shortcut-cmd">⌘</span>K
      </kbd>
    </div>
  );
};

