import React from 'react';

const InputField = ({ label, name, type = 'text', value, onChange, placeholder, icon, error, helper, required, className = '' }) => (
  <div className={className}>
    {label && (
      <label htmlFor={name} className="block text-slate-300 text-sm font-semibold mb-1.5">
        {label}
        {required && <span className="text-risk ml-0.5">*</span>}
      </label>
    )}
    <div className="relative">
      {icon && (
        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-base pointer-events-none">{icon}</span>
      )}
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`field ${icon ? 'pl-10' : ''} ${error ? '!border-risk/50 focus:!border-risk/70' : ''}`}
      />
    </div>
    {error  && <p className="text-risk text-xs mt-1 font-medium">{error}</p>}
    {helper && !error && <p className="text-slate-600 text-xs mt-1">{helper}</p>}
  </div>
);

export default InputField;
