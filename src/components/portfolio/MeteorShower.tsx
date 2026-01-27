/**
 * MeteorShower.tsx - Animated Meteor Shower Background
 * 
 * Creates a fixed fullscreen animated background featuring:
 * - 300 randomly positioned stars using box-shadow
 * - 15 animated meteors with staggered timing
 * - Dark radial gradient background (#080e21 to #1b2735)
 * 
 * Properties:
 * - position: fixed with inset: 0 for full coverage
 * - z-index: -1 to sit behind content
 * - pointer-events: none to allow clicks through
 * 
 * @component
 * @file src/components/portfolio/MeteorShower.tsx
 */

import { useMemo } from "react";

/**
 * Generates random star positions as box-shadow string
 * @param count - Number of stars to generate
 * @returns CSS box-shadow string with random star positions
 */
const generateStars = (count: number): string => {
  const stars: string[] = [];
  for (let i = 0; i < count; i++) {
    const x = Math.floor(Math.random() * 2000);
    const y = Math.floor(Math.random() * 2000);
    stars.push(`${x}px ${y}px #fff`);
  }
  return stars.join(", ");
};

/**
 * Pre-calculated meteor configurations
 * Each meteor has: left position (%), top position (px), animation duration (s)
 */
const meteorConfigs = [
  { left: 15, top: 120, duration: 5.2 },
  { left: 78, top: 180, duration: 4.8 },
  { left: 32, top: 85, duration: 6.1 },
  { left: 91, top: 220, duration: 3.9 },
  { left: 45, top: 150, duration: 5.5 },
  { left: 67, top: 95, duration: 4.3 },
  { left: 23, top: 250, duration: 6.8 },
  { left: 85, top: 130, duration: 4.1 },
  { left: 52, top: 200, duration: 5.7 },
  { left: 38, top: 75, duration: 3.5 },
  { left: 71, top: 280, duration: 6.4 },
  { left: 18, top: 165, duration: 4.6 },
  { left: 94, top: 110, duration: 5.9 },
  { left: 59, top: 235, duration: 3.7 },
  { left: 29, top: 190, duration: 7.2 },
];

export const MeteorShower = () => {
  /** Memoized star shadows to prevent recalculation on re-renders */
  const starShadows = useMemo(() => generateStars(300), []);

  return (
    <div
      className="fixed inset-0 overflow-hidden"
      style={{
        zIndex: -1,
        pointerEvents: "none",
        background: "radial-gradient(ellipse at top, #080e21 0%, #1b2735 95%)",
      }}
      aria-hidden="true"
    >
      {/* Stars Layer - 300 random stars using box-shadow */}
      <div
        className="absolute w-[1px] h-[1px] bg-transparent"
        style={{ boxShadow: starShadows }}
      />

      {/* Meteors Layer - 15 animated meteors */}
      {meteorConfigs.map((config, index) => (
        <div
          key={index}
          className="absolute w-[300px] h-[1px]"
          style={{
            left: `${config.left}%`,
            top: `${config.top}px`,
            transform: "rotate(-45deg)",
            background: "linear-gradient(to right, #fff, rgba(255,255,255,0))",
            animation: `meteor ${config.duration}s linear infinite`,
            animationDelay: `${index * 0.3}s`,
          }}
        >
          {/* Meteor head glow */}
          <div
            className="absolute w-1 h-[5px] rounded-full"
            style={{
              marginTop: "-2px",
              background: "rgba(255,255,255,0.7)",
              boxShadow: "0 0 15px 3px #fff",
            }}
          />
        </div>
      ))}
    </div>
  );
};
