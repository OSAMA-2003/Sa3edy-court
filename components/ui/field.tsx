import React from 'react';

export const FieldGroup: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className = '',
  children,
  ...props
}) => (
  <div className={`grid grid-cols-1 sm:grid-cols-2 gap-3.5 w-full ${className}`} {...props}>
    {children}
  </div>
);

export const Field: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className = '',
  children,
  ...props
}) => (
  <div className={`flex flex-col space-y-1.5 w-full ${className}`} {...props}>
    {children}
  </div>
);

export const FieldLabel: React.FC<React.LabelHTMLAttributes<HTMLLabelElement>> = ({
  className = '',
  children,
  ...props
}) => (
  <label className={`text-xs font-bold text-slate-700 select-none ${className}`} {...props}>
    {children}
  </label>
);
