'use client';

import React, { useEffect, useRef } from 'react';

export interface CoolModeProps {
  children: React.ReactNode;
  particle?: string;
  size?: number;
  particleCount?: number;
  speedHorz?: number;
  speedUp?: number;
  disabled?: boolean;
}

export const CoolMode: React.FC<CoolModeProps> = ({
  children,
  particle = '/ball.png',
  size = 45,
  particleCount = 7,
  speedHorz = 5,
  speedUp = 9,
  disabled = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (disabled) return;
    const container = containerRef.current;
    if (!container) return;

    const handleClick = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const originX = e.clientX || rect.left + rect.width / 2;
      const originY = e.clientY || rect.top + rect.height / 2;

      for (let i = 0; i < particleCount; i++) {
        const particleNode = document.createElement('div');
        const particleSize = size + (Math.random() * 14 - 7); // slight size variation

        particleNode.style.position = 'fixed';
        particleNode.style.pointerEvents = 'none';
        particleNode.style.zIndex = '99999';
        particleNode.style.width = `${particleSize}px`;
        particleNode.style.height = `${particleSize}px`;
        particleNode.style.left = `${originX - particleSize / 2}px`;
        particleNode.style.top = `${originY - particleSize / 2}px`;
        particleNode.style.backgroundImage = `url("${particle}")`;
        particleNode.style.backgroundSize = 'contain';
        particleNode.style.backgroundRepeat = 'no-repeat';
        particleNode.style.backgroundPosition = 'center';
        particleNode.style.willChange = 'transform, opacity';
        particleNode.style.filter = 'drop-shadow(0 4px 10px rgba(0,0,0,0.5))';

        document.body.appendChild(particleNode);

        // Initial launch velocities: Shoot UP first (negative Y)
        let vx = (Math.random() - 0.5) * speedHorz * 2.5;
        let vy = -(speedUp + Math.random() * 5); // Shoots UPwards
        const gravity = 0.45; // Pulls DOWNwards
        const spin = (Math.random() - 0.5) * 18;

        let posX = 0;
        let posY = 0;
        let rotation = 0;
        let startTime: number | null = null;
        const duration = 1200; // ms

        const animate = (timestamp: number) => {
          if (!startTime) startTime = timestamp;
          const elapsed = timestamp - startTime;

          if (elapsed >= duration) {
            particleNode.remove();
            return;
          }

          // Apply physics
          vy += gravity; // Gravity accelerates downward
          posX += vx;
          posY += vy;
          rotation += spin;

          // Fade out as it drops down
          const progress = elapsed / duration;
          const opacity = progress < 0.6 ? 1 : 1 - (progress - 0.6) / 0.4;
          const scale = 1 + progress * 0.15; // slightly pops out

          particleNode.style.transform = `translate3d(${posX}px, ${posY}px, 0) rotate(${rotation}deg) scale(${scale})`;
          particleNode.style.opacity = `${opacity}`;

          requestAnimationFrame(animate);
        };

        requestAnimationFrame(animate);
      }
    };

    container.addEventListener('click', handleClick);

    return () => {
      container.removeEventListener('click', handleClick);
    };
  }, [particle, size, particleCount, speedHorz, speedUp, disabled]);

  return (
    <div ref={containerRef} className="inline-block relative w-full sm:w-auto">
      {children}
    </div>
  );
};
