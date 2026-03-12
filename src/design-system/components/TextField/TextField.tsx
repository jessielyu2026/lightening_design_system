import React from 'react';
import './textfield.css';

type TextFieldType = 'default' | 'error' | 'validated' | 'warning';
type TextFieldOrientation = 'vertical' | 'horizontal';
type TextFieldSize = 'short' | 'long';

type TextFieldProps = {
  label?: string;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onBlur?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onFocus?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  type?: TextFieldType;
  orientation?: TextFieldOrientation;
  size?: TextFieldSize;
  helperText?: string;
  description?: string;
  error?: string;
  maxLength?: number;
  showCharCount?: boolean;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  autoFocus?: boolean;
  name?: string;
  id?: string;
  className?: string;
};

// Status icons
const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M13.5 4.5L6.5 11.5L3 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ErrorIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M8 5V8.5M8 11H8.005" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const WarningIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 5.5V8.5M8 11H8.005M2.5 13H13.5L8 3L2.5 13Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const TextField: React.FC<TextFieldProps> = ({
  label,
  placeholder,
  value,
  defaultValue,
  onChange,
  onBlur,
  onFocus,
  type = 'default',
  orientation = 'vertical',
  size = 'short',
  helperText,
  description,
  error,
  maxLength,
  showCharCount = false,
  required = false,
  disabled = false,
  readOnly = false,
  autoFocus = false,
  name,
  id,
  className = '',
}) => {
  const generatedId = React.useId();
  const inputId = id || generatedId;

  // Determine actual type based on error prop for backwards compatibility
  const actualType = error ? 'error' : type;

  // Determine helper text
  const displayHelperText = error || helperText || description;

  // Character count
  const currentLength = (value || defaultValue || '').length;
  const isOverLimit = maxLength && currentLength > maxLength;
  const isNearLimit = maxLength && currentLength > maxLength * 0.9;

  const containerClasses = [
    'ds-textfield',
    `ds-textfield--${actualType}`,
    orientation === 'horizontal' ? 'ds-textfield--horizontal' : '',
    className,
  ].filter(Boolean).join(' ');

  const inputClasses = [
    'ds-textfield__input',
    `ds-textfield__input--${size}`,
    actualType !== 'default' ? 'ds-textfield__input--with-icon' : '',
  ].filter(Boolean).join(' ');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onChange?.(e.target.value);
  };

  const renderStatusIcon = () => {
    if (actualType === 'default') return null;

    return (
      <span className="ds-textfield__icon" aria-hidden="true">
        {actualType === 'validated' && <CheckIcon />}
        {actualType === 'error' && <ErrorIcon />}
        {actualType === 'warning' && <WarningIcon />}
      </span>
    );
  };

  const inputProps = {
    id: inputId,
    name,
    className: inputClasses,
    placeholder,
    value,
    defaultValue,
    onChange: handleChange,
    onBlur,
    onFocus,
    disabled,
    readOnly,
    autoFocus,
    maxLength,
    'aria-invalid': actualType === 'error',
    'aria-describedby': displayHelperText ? `${inputId}-helper` : undefined,
  };

  return (
    <div className={containerClasses}>
      {label && (
        <label
          htmlFor={inputId}
          className={`ds-textfield__label ${required ? 'ds-textfield__label--required' : ''}`}
        >
          {label}
        </label>
      )}

      <div className="ds-textfield__wrapper">
        <div className="ds-textfield__input-container">
          {size === 'long' ? (
            <textarea {...inputProps} />
          ) : (
            <input type="text" {...inputProps} />
          )}
          {renderStatusIcon()}
        </div>

        {(displayHelperText || (showCharCount && maxLength)) && (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px' }}>
            {displayHelperText && (
              <span
                id={`${inputId}-helper`}
                className="ds-textfield__helper"
                role={actualType === 'error' ? 'alert' : undefined}
              >
                {displayHelperText}
              </span>
            )}
            {showCharCount && maxLength && (
              <span
                className={`ds-textfield__count ${
                  isOverLimit ? 'ds-textfield__count--error' : isNearLimit ? 'ds-textfield__count--warning' : ''
                }`}
              >
                {currentLength}/{maxLength}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export type { TextFieldProps, TextFieldType, TextFieldOrientation, TextFieldSize };
