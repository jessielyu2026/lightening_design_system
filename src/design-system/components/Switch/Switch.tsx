import React from 'react';
import './switch.css';

type SwitchSize = 'sm' | 'lg';

type SwitchProps = {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  size?: SwitchSize;
  disabled?: boolean;
  label?: string;
  labelPosition?: 'left' | 'right';
  id?: string;
  name?: string;
  className?: string;
};

export const Switch: React.FC<SwitchProps> = ({
  checked = false,
  onChange,
  size = 'lg',
  disabled = false,
  label,
  labelPosition = 'right',
  id,
  name,
  className = '',
}) => {
  const handleChange = () => {
    if (!disabled && onChange) {
      onChange(!checked);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleChange();
    }
  };

  const containerClasses = [
    'ds-switch',
    disabled ? 'ds-switch--disabled' : '',
    labelPosition === 'left' ? 'ds-switch--label-left' : '',
    className,
  ].filter(Boolean).join(' ');

  const trackClasses = [
    'ds-switch__track',
    `ds-switch__track--${size}`,
    checked ? 'ds-switch__track--on' : 'ds-switch__track--off',
  ].join(' ');

  const knobClasses = [
    'ds-switch__knob',
    `ds-switch__knob--${size}`,
  ].join(' ');

  return (
    <label className={containerClasses} onKeyDown={handleKeyDown}>
      <input
        type="checkbox"
        className="ds-switch__input"
        checked={checked}
        onChange={handleChange}
        disabled={disabled}
        id={id}
        name={name}
        role="switch"
        aria-checked={checked}
      />
      <span className={trackClasses}>
        <span className={knobClasses} />
      </span>
      {label && <span className="ds-switch__label">{label}</span>}
    </label>
  );
};

export type { SwitchProps, SwitchSize };
