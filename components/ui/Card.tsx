import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
  courtAccent?: boolean;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hoverEffect = true,
  courtAccent = false,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`
        relative overflow-hidden rounded-2xl bg-[#0f1f3c]/80 backdrop-blur-xl border border-white/10 
        transition-all duration-300
        ${hoverEffect ? 'hover:-translate-y-1 hover:border-[#1e6fff]/40 hover:shadow-[0_12px_32px_rgba(2,18,47,0.8)]' : ''}
        ${courtAccent ? 'before:absolute before:top-0 before:inset-x-0 before:h-[2px] before:bg-gradient-to-r before:from-[#cff40e] before:via-[#1e6fff] before:to-[#cff40e]' : ''}
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
};
