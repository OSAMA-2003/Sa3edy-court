import React from 'react';

interface BadgeProps {
  variant?: 'neon' | 'live' | 'cobalt' | 'glass' | 'gold' | 'danger';
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'neon',
  children,
  icon,
  className = '',
}) => {
  const variants = {
    neon: 'bg-[#cff40e] text-[#02122f] font-bold shadow-[0_0_10px_rgba(207,244,14,0.3)]',
    live: 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-semibold',
    cobalt: 'bg-[#1e6fff]/20 text-[#739bff] border border-[#1e6fff]/40 font-semibold',
    glass: 'bg-[#04307c]/70 text-slate-200 border border-white/15 backdrop-blur-md font-medium',
    gold: 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-semibold',
    danger: 'bg-rose-500/20 text-rose-300 border border-rose-500/40 font-semibold',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs rounded-full transition-all duration-200 ${variants[variant]} ${className}`}
    >
      {icon && <span className="text-current">{icon}</span>}
      {children}
    </span>
  );
};
