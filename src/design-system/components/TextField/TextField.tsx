
import React from 'react';
import './textfield.css';

type Props = {
  label?: string;
  description?: string;
  error?: string;
  value?: string;
  placeholder?: string;
  onChange?: (v: string) => void;
  className?: string;
};

export const TextField: React.FC<Props> = ({ label, description, error, value, onChange, placeholder, className }) => {
  const id = React.useId();
  return (
    <div className={["ds-field", className].filter(Boolean).join(' ')}>
      {label && <label className="ds-field__label" htmlFor={id}>{label}</label>}
      <input
        id={id}
        className={["ds-input", error ? 'is-error' : ''].join(' ')}
        value={value}
        placeholder={placeholder}
        onChange={(e)=> onChange?.(e.target.value)}
      />
      {description && !error && <div className="ds-field__desc">{description}</div>}
      {error && <div className="ds-field__error" role="alert">{error}</div>}
    </div>
  );
};
