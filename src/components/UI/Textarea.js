import React from 'react';

const Textarea = ({ label, name, value, onChange, className = '', required = false, error }) => {
  return (
    <div className="mb-3">
      <label htmlFor={name} className="form-label">{label}{required && <span className="text-danger">*</span>}</label>
      <textarea
        className={`form-control ${className} ${error ? 'is-invalid' : ''}`}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

export default Textarea;
