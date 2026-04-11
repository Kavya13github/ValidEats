// src/components/InputField.jsx
import React from 'react';

const InputField = ({ label, name, type = 'text', value, onChange, placeholder, helper, error, required, icon, className = '', ...props }) => (
  <div className={`flex flex-col gap-1.5 ${className}`}>
    {label && (
      <label htmlFor={name} className="text-xs font-medium text-gray-400 tracking-wide flex items-center gap-1">
        {label}{required && <span className="text-risk ml-0.5">*</span>}
      </label>
    )}
    <div className="relative">
      {icon && <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-charcoal-400 text-sm">{icon}</span>}
      <input
        id={name} name={name} type={type} value={value} onChange={onChange}
        placeholder={placeholder} required={required}
        className={`premium-input ${icon ? 'pl-10' : ''} ${error ? '!border-risk/50 focus:!border-risk/70' : ''}`}
        {...props}
      />
    </div>
    {helper && !error && <p className="text-charcoal-400 text-xs leading-relaxed">{helper}</p>}
    {error && <p className="text-risk text-xs flex items-center gap-1"><span>⚠</span>{error}</p>}
  </div>
);

export default InputField;
