'use client';

import React, { ElementType, useState, useEffect, useRef } from 'react';

export type AnimationType =
  | 'fadeIn'
  | 'blurIn'
  | 'blurInUp'
  | 'slideUp'
  | 'slideDown'
  | 'slideLeft'
  | 'slideRight'
  | 'scaleUp';

export type SegmentType = 'character' | 'word' | 'line' | 'text';

interface TextAnimateProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  animation?: AnimationType;
  by?: SegmentType;
  duration?: number;
  delay?: number;
  staggerDelay?: number;
  as?: ElementType;
  className?: string;
}

export const TextAnimate: React.FC<TextAnimateProps> = ({
  children,
  animation = 'blurInUp',
  by = 'word',
  duration = 0.55,
  delay = 0,
  staggerDelay = 0.04,
  as: Component = 'div',
  className = '',
  ...props
}) => {
  const containerRef = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Re-trigger animation every time element enters or leaves viewport
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const getAnimationStyles = (index: number) => {
    const itemDelay = delay + index * staggerDelay;
    const transitionStyle = `all ${duration}s cubic-bezier(0.16, 1, 0.3, 1) ${itemDelay}s`;

    if (!isInView) {
      switch (animation) {
        case 'blurInUp':
          return {
            opacity: 0,
            filter: 'blur(10px)',
            transform: 'translate3d(0, 24px, 0)',
            transition: transitionStyle,
          };
        case 'blurIn':
          return {
            opacity: 0,
            filter: 'blur(12px)',
            transform: 'scale(0.92)',
            transition: transitionStyle,
          };
        case 'slideUp':
          return {
            opacity: 0,
            transform: 'translate3d(0, 30px, 0)',
            transition: transitionStyle,
          };
        case 'slideDown':
          return {
            opacity: 0,
            transform: 'translate3d(0, -30px, 0)',
            transition: transitionStyle,
          };
        case 'slideLeft':
          return {
            opacity: 0,
            transform: 'translate3d(40px, 0, 0)',
            transition: transitionStyle,
          };
        case 'slideRight':
          return {
            opacity: 0,
            transform: 'translate3d(-40px, 0, 0)',
            transition: transitionStyle,
          };
        case 'scaleUp':
          return {
            opacity: 0,
            transform: 'scale(0.85)',
            transition: transitionStyle,
          };
        case 'fadeIn':
        default:
          return {
            opacity: 0,
            transition: transitionStyle,
          };
      }
    }

    return {
      opacity: 1,
      filter: 'blur(0px)',
      transform: 'translate3d(0, 0, 0) scale(1)',
      transition: transitionStyle,
    };
  };

  const renderContent = () => {
    if (typeof children !== 'string') {
      return (
        <span className="inline-block" style={getAnimationStyles(0)}>
          {children}
        </span>
      );
    }

    const text = children;

    if (by === 'character') {
      return Array.from(text).map((char, index) => (
        <span
          key={index}
          className="inline-block whitespace-pre"
          style={getAnimationStyles(index)}
        >
          {char}
        </span>
      ));
    }

    if (by === 'word') {
      return text.split(' ').map((word, index) => (
        <span
          key={index}
          className="inline-block whitespace-nowrap me-[0.25em]"
          style={getAnimationStyles(index)}
        >
          {word}
        </span>
      ));
    }

    return (
      <span className="inline-block" style={getAnimationStyles(0)}>
        {text}
      </span>
    );
  };

  return (
    <Component
      ref={containerRef}
      className={`inline-block ${className}`}
      {...props}
    >
      {renderContent()}
    </Component>
  );
};
