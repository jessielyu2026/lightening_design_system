import React from 'react';
import './checkbox.css';

export type CheckboxState = 'unchecked' | 'checked' | 'indeterminate';

type CheckboxProps = {
  checked?: boolean;
  indeterminate?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  error?: boolean;
  label?: string;
  id?: string;
  name?: string;
  className?: string;
};

export const Checkbox: React.FC<CheckboxProps> = ({
  checked = false,
  indeterminate = false,
  onChange,
  disabled = false,
  error = false,
  label,
  id,
  name,
  className = '',
}) => {
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!disabled && onChange) {
      onChange(e.target.checked);
    }
  };

  const containerClasses = [
    'ds-checkbox',
    disabled ? 'ds-checkbox--disabled' : '',
    error ? 'ds-checkbox--error' : '',
    className,
  ].filter(Boolean).join(' ');

  const boxClasses = [
    'ds-checkbox__box',
    checked || indeterminate ? 'ds-checkbox__box--checked' : '',
    indeterminate ? 'ds-checkbox__box--indeterminate' : '',
  ].filter(Boolean).join(' ');

  return (
    <label className={containerClasses}>
      <input
        ref={inputRef}
        type="checkbox"
        className="ds-checkbox__input"
        checked={checked}
        onChange={handleChange}
        disabled={disabled}
        id={id}
        name={name}
        aria-invalid={error}
      />
      <span className={boxClasses}>
        {(checked || indeterminate) && !disabled && (
          <span className="ds-checkbox__icon">
            {indeterminate ? (
              <svg width="10" height="2" viewBox="0 0 10 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1H9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            ) : (
              <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 4L3.5 6.5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          </span>
        )}
        {(checked || indeterminate) && disabled && (
          <span className="ds-checkbox__icon ds-checkbox__icon--disabled">
            {indeterminate ? (
              <svg width="10" height="2" viewBox="0 0 10 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1H9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            ) : (
              <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 4L3.5 6.5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          </span>
        )}
      </span>
      {label && <span className="ds-checkbox__label">{label}</span>}
    </label>
  );
};

export type { CheckboxProps };
