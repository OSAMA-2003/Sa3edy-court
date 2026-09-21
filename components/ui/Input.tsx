import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: React.ReactNode;
  error?: string;
}

export const Input: React.FC<InputProps> = ({ label, icon, error, className = '', ...props }) => {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && <label className="text-xs font-semibold text-slate-300 tracking-wide">{label}</label>}
      <div className="relative flex items-center">
        {icon && (
          <div className="absolute start-3.5 text-slate-400 pointer-events-none flex items-center justify-center">
            {icon}
          </div>
        )}
        <input
          className={`
            w-full bg-[#03173d] text-white placeholder-slate-400 text-sm rounded-xl py-3
            border border-white/15 focus:border-[#1e6fff] focus:ring-2 focus:ring-[#1e6fff]/30 focus:outline-none
            transition-all duration-200
            ${icon ? 'ps-10 pe-4' : 'px-4'}
            ${error ? 'border-rose-500 focus:ring-rose-500/30' : ''}
            ${className}
          `}
          {...props}
        />
      </div>
      {error && <span className="text-xs text-rose-400">{error}</span>}
    </div>
  );
};

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  icon?: React.ReactNode;
  options: { value: string; label: string }[];
}

export const Select: React.FC<SelectProps> = ({ label, icon, options, className = '', ...props }) => {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && <label className="text-xs font-semibold text-slate-300 tracking-wide">{label}</label>}
      <div className="relative flex items-center">
        {icon && (
          <div className="absolute start-3.5 text-slate-400 pointer-events-none flex items-center justify-center">
            {icon}
          </div>
        )}
        <select
          className={`
            w-full bg-[#03173d] text-white text-sm rounded-xl py-3
            border border-white/15 focus:border-[#1e6fff] focus:ring-2 focus:ring-[#1e6fff]/30 focus:outline-none
            transition-all duration-200 appearance-none cursor-pointer
            ${icon ? 'ps-10 pe-9' : 'ps-4 pe-9'}
            ${className}
          `}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} className="bg-[#0f1f3c] text-white py-2">
              {opt.label}
            </option>
          ))}
        </select>
        <div className="absolute end-3.5 text-slate-400 pointer-events-none">
          ▼
        </div>
      </div>
    </div>
  );
};
