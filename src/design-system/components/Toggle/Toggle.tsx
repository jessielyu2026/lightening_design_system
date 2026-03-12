import React from 'react';
import './toggle.css';

type ToggleOption = {
  id: string;
  label: string;
  icon?: React.ReactNode;
  badge?: string | number;
  disabled?: boolean;
};

type ToggleProps = {
  options: ToggleOption[];
  value: string;
  onChange: (value: string) => void;
  fullWidth?: boolean;
  className?: string;
};

export const Toggle: React.FC<ToggleProps> = ({
  options,
  value,
  onChange,
  fullWidth = false,
  className = '',
}) => {
  const containerClasses = [
    'ds-toggle',
    fullWidth ? 'ds-toggle--full-width' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={containerClasses} role="tablist">
      {options.map((option) => {
        const isActive = value === option.id;
        const buttonClasses = [
          'ds-toggle__button',
          isActive ? 'ds-toggle__button--active' : '',
        ].filter(Boolean).join(' ');

        return (
          <button
            key={option.id}
            type="button"
            className={buttonClasses}
            onClick={() => onChange(option.id)}
            disabled={option.disabled}
            role="tab"
            aria-selected={isActive}
            aria-controls={`panel-${option.id}`}
          >
            {option.icon && (
              <span className="ds-toggle__button-icon">{option.icon}</span>
            )}
            <span>{option.label}</span>
            {option.badge !== undefined && (
              <span className="ds-toggle__button-badge">{option.badge}</span>
            )}
          </button>
        );
      })}
    </div>
  );
};

export type { ToggleProps, ToggleOption };
