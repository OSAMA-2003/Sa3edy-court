import React from 'react';

export const InputGroup: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className = '',
  children,
  ...props
}) => (
  <div
    className={`relative flex items-center rounded-xl border border-slate-200 bg-slate-50 focus-within:bg-white focus-within:border-[#04307C] focus-within:ring-2 focus-within:ring-[#04307C]/10 transition-all ${className}`}
    {...props}
  >
    {children}
  </div>
);

export const InputGroupInput: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = ({
  className = '',
  ...props
}) => (
  <input
    className={`w-full bg-transparent px-3 py-2 text-xs sm:text-sm font-semibold text-[#02122F] outline-none placeholder:text-slate-400 ${className}`}
    {...props}
  />
);

export const InputGroupAddon: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className = '',
  children,
  ...props
}) => (
  <div className={`flex items-center px-3 text-slate-400 shrink-0 pointer-events-none ${className}`} {...props}>
    {children}
  </div>
);
