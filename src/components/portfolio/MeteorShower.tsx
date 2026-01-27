/**
 * MeteorShower.tsx - Animated Meteor Shower Background Component
 * 
 * This component renders an animated meteor shower effect with:
 * - 15 animated meteors with random positions and timing
 * - Twinkling star field background
 * - Diagonal meteor trails with glow effects
 * 
 * The component is positioned as a fixed background layer (z-index: -1)
 * and does not interfere with other page content or interactions.
 * 
 * @component
 * @file src/components/portfolio/MeteorShower.tsx
 */

import "./MeteorShower.css";

export const MeteorShower = () => {
  return (
    <div className="meteor-shower-container">
      <div className="star"></div>
      <div className="meteor-1"></div>
      <div className="meteor-2"></div>
      <div className="meteor-3"></div>
      <div className="meteor-4"></div>
      <div className="meteor-5"></div>
      <div className="meteor-6"></div>
      <div className="meteor-7"></div>
      <div className="meteor-8"></div>
      <div className="meteor-9"></div>
      <div className="meteor-10"></div>
      <div className="meteor-11"></div>
      <div className="meteor-12"></div>
      <div className="meteor-13"></div>
      <div className="meteor-14"></div>
      <div className="meteor-15"></div>
    </div>
  );
};
