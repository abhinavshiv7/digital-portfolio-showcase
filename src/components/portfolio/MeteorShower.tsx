/**
 * MeteorShower.tsx - Animated Meteor Shower Background
 * 
 * Creates a fixed fullscreen animated background featuring:
 * - Static stars using CSS box-shadow
 * - 10 animated meteors with glowing heads
 * - Dark radial gradient background (#080e21 to #1b2735)
 * 
 * Properties:
 * - position: fixed with inset: 0 for full coverage
 * - z-index: -1 to sit behind content
 * - pointer-events: none to allow clicks through
 * 
 * CSS classes defined in: src/index.css
 * - .meteor-container: Main container styling
 * - .star: Star field using box-shadows
 * - .meteor-1 through .meteor-10: Individual meteor animations
 * 
 * @component
 * @file src/components/portfolio/MeteorShower.tsx
 */

export const MeteorShower = () => {
  return (
    <div className="meteor-container" aria-hidden="true">
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
    </div>
  );
};
