'use client';

import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
  variant?: 'cyber' | 'cyber-dark' | 'secondary' | 'default';
  curveSize?: 'sm' | 'md' | 'lg';
  hoverEffect?: boolean;
  courtAccent?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  innerClassName = '',
  variant = 'cyber',
  curveSize = 'md',
  hoverEffect = true,
  courtAccent = false,
  style,
  ...props
}) => {
  if (variant === 'default') {
    return (
      <div
        className={`
          relative rounded-3xl bg-white text-[#02122F] border border-slate-200/80 shadow-sm
          transition-all duration-300
          ${hoverEffect ? 'hover:-translate-y-0.5 hover:shadow-md hover:border-slate-300' : ''}
          ${courtAccent ? 'before:absolute before:top-0 before:inset-x-0 before:h-[2px] before:bg-gradient-to-r before:from-[#cff40e] before:via-[#04307c] before:to-[#cff40e]' : ''}
          ${className}
        `}
        style={style}
        {...props}
      >
        {children}
      </div>
    );
  }

  const curveMap = {
    sm: '0.85rem',
    md: '1.25rem',
    lg: '1.6rem',
  };

  const curve = curveMap[curveSize] || '1.25rem';
  const isDark = variant === 'cyber-dark';
  const isSecondary = variant === 'secondary';

  return (
    <div
      style={{ ['--curve-size' as any]: curve, ...style }}
      className={`cyber-card-outer ${isDark ? 'dark' : ''} ${isSecondary ? 'secondary' : ''} ${className}`}
      {...props}
    >
      <div className={`cyber-card-inner ${innerClassName}`}>
        {children}
      </div>
    </div>
  );
};

export const CardHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className = '',
  children,
  ...props
}) => (
  <div className={`p-5 sm:p-6 pb-2 sm:pb-3 flex flex-col space-y-1.5 ${className}`} {...props}>
    {children}
  </div>
);

export const CardTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({
  className = '',
  children,
  ...props
}) => (
  <h3 className={`font-black text-lg sm:text-xl text-[#02122F] leading-none tracking-tight ${className}`} {...props}>
    {children}
  </h3>
);

export const CardDescription: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = ({
  className = '',
  children,
  ...props
}) => (
  <p className={`text-xs sm:text-sm text-slate-500 font-normal ${className}`} {...props}>
    {children}
  </p>
);

export const CardContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className = '',
  children,
  ...props
}) => (
  <div className={`p-5 sm:p-6 ${className}`} {...props}>
    {children}
  </div>
);

export const CardFooter: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className = '',
  children,
  ...props
}) => (
  <div className={`p-5 sm:p-6 pt-3 sm:pt-4 border-t border-slate-100 flex items-center ${className}`} {...props}>
    {children}
  </div>
);
