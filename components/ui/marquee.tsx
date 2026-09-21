'use client';

import React from 'react';

interface MarqueeProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
  children?: React.ReactNode;
  vertical?: boolean;
  repeat?: number;
}

export const Marquee: React.FC<MarqueeProps> = ({
  className = '',
  reverse = false,
  pauseOnHover = false,
  children,
  vertical = false,
  repeat = 4,
  ...props
}) => {
  const getAnimationClass = () => {
    if (vertical) {
      return reverse ? 'animate-marquee-vertical-reverse' : 'animate-marquee-vertical';
    }
    return reverse ? 'animate-marquee-reverse' : 'animate-marquee';
  };

  return (
    <div
      className={`group flex overflow-hidden p-2 [--gap:1rem] [gap:var(--gap)] ${
        vertical ? 'flex-col' : 'flex-row'
      } ${className}`}
      {...props}
    >
      {Array.from({ length: repeat }).map((_, i) => (
        <div
          key={i}
          className={`flex shrink-0 justify-around [gap:var(--gap)] ${
            vertical ? 'flex-col' : 'flex-row'
          } ${getAnimationClass()} ${
            pauseOnHover ? 'group-hover:[animation-play-state:paused]' : ''
          }`}
        >
          {children}
        </div>
      ))}
    </div>
  );
};
