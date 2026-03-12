import React from 'react';
import './optioncard.css';

type SelectionType = 'checkbox' | 'radio';

type OptionCardProps = {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  selected?: boolean;
  selectionType?: SelectionType;
  disabled?: boolean;
  onChange?: (selected: boolean) => void;
  value?: string;
  name?: string;
  className?: string;
};

// Default icon - circle with exclamation/check
const DefaultIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 5.5V8.5M8 11H8.005M14 8C14 11.3137 11.3137 14 8 14C4.68629 14 2 11.3137 2 8C2 4.68629 4.68629 2 8 2C11.3137 2 14 4.68629 14 8Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Checkmark icon for selected checkbox
const CheckmarkIcon = () => (
  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1.5 5.5L4 8L8.5 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const OptionCard: React.FC<OptionCardProps> = ({
  title,
  description,
  icon,
  selected = false,
  selectionType = 'checkbox',
  disabled = false,
  onChange,
  value,
  name,
  className = '',
}) => {
  const handleClick = () => {
    if (!disabled && onChange) {
      onChange(!selected);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.key === 'Enter' || e.key === ' ') && !disabled) {
      e.preventDefault();
      onChange?.(!selected);
    }
  };

  const classes = [
    'ds-option-card',
    selected ? 'ds-option-card--selected' : '',
    disabled ? 'ds-option-card--disabled' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div
      className={classes}
      role={selectionType === 'radio' ? 'radio' : 'checkbox'}
      aria-checked={selected}
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : 0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      data-value={value}
      data-name={name}
    >
      <div className="ds-option-card__content">
        <div className="ds-option-card__icon-wrapper">
          <span className="ds-option-card__icon">
            {icon || <DefaultIcon />}
          </span>
        </div>
        <div className="ds-option-card__text">
          <p className="ds-option-card__title">{title}</p>
          {description && (
            <p className="ds-option-card__description">{description}</p>
          )}
        </div>
      </div>

      {selectionType === 'checkbox' ? (
        <div className="ds-option-card__checkbox">
          <span className="ds-option-card__checkmark">
            <CheckmarkIcon />
          </span>
        </div>
      ) : (
        <div className="ds-option-card__radio">
          <div className="ds-option-card__radio-dot" />
        </div>
      )}
    </div>
  );
};

// OptionCardGroup for managing multiple options
type OptionCardGroupProps = {
  children: React.ReactNode;
  direction?: 'vertical' | 'horizontal';
  className?: string;
};

export const OptionCardGroup: React.FC<OptionCardGroupProps> = ({
  children,
  direction = 'vertical',
  className = '',
}) => {
  const classes = [
    'ds-option-card-group',
    direction === 'horizontal' ? 'ds-option-card-group--horizontal' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} role="group">
      {children}
    </div>
  );
};

export type { OptionCardProps, OptionCardGroupProps, SelectionType };
