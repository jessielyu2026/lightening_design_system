import React from 'react';
import './radio.css';

type RadioProps = {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  label?: string;
  id?: string;
  name?: string;
  value?: string;
  className?: string;
};

export const Radio: React.FC<RadioProps> = ({
  checked = false,
  onChange,
  disabled = false,
  label,
  id,
  name,
  value,
  className = '',
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!disabled && onChange) {
      onChange(e.target.checked);
    }
  };

  const containerClasses = [
    'ds-radio',
    disabled ? 'ds-radio--disabled' : '',
    className,
  ].filter(Boolean).join(' ');

  const circleClasses = [
    'ds-radio__circle',
    checked ? 'ds-radio__circle--checked' : '',
  ].filter(Boolean).join(' ');

  return (
    <label className={containerClasses}>
      <input
        type="radio"
        className="ds-radio__input"
        checked={checked}
        onChange={handleChange}
        disabled={disabled}
        id={id}
        name={name}
        value={value}
      />
      <span className={circleClasses}>
        {checked && <span className="ds-radio__dot" />}
      </span>
      {label && <span className="ds-radio__label">{label}</span>}
    </label>
  );
};

// RadioGroup component for managing a group of radio buttons
type RadioOption = {
  value: string;
  label: string;
  disabled?: boolean;
};

type RadioGroupProps = {
  options: RadioOption[];
  value?: string;
  onChange?: (value: string) => void;
  name?: string;
  disabled?: boolean;
  orientation?: 'horizontal' | 'vertical';
  className?: string;
};

export const RadioGroup: React.FC<RadioGroupProps> = ({
  options,
  value,
  onChange,
  name,
  disabled = false,
  orientation = 'vertical',
  className = '',
}) => {
  const groupClasses = [
    'ds-radio-group',
    `ds-radio-group--${orientation}`,
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={groupClasses} role="radiogroup">
      {options.map((option) => (
        <Radio
          key={option.value}
          name={name}
          value={option.value}
          label={option.label}
          checked={value === option.value}
          onChange={() => onChange?.(option.value)}
          disabled={disabled || option.disabled}
        />
      ))}
    </div>
  );
};

export type { RadioProps, RadioGroupProps, RadioOption };
