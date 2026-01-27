/**
 * MeteorShower.tsx - Animated Meteor Shower Background
 * 
 * Creates a fixed fullscreen animated background featuring:
 * - Static stars using CSS box-shadow (defined in index.css)
 * - 10 animated meteors with staggered timing and positions
 * - Dark radial gradient background (#080e21 to #1b2735)
 * 
 * Properties:
 * - position: fixed with full coverage
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
      {/* Stars Layer - Static stars using CSS box-shadow */}
      <div className="star" />

      {/* Meteors Layer - 10 animated falling meteors */}
      <div className="meteor-1" />
      <div className="meteor-2" />
      <div className="meteor-3" />
      <div className="meteor-4" />
      <div className="meteor-5" />
      <div className="meteor-6" />
      <div className="meteor-7" />
      <div className="meteor-8" />
      <div className="meteor-9" />
      <div className="meteor-10" />
    </div>
  );
};
