/**
 * useParallaxScroll - Custom Hook for Parallax Scroll Animations
 * 
 * This hook tracks scroll position and provides transform values
 * for creating parallax effects where elements move at different speeds
 * or directions as the user scrolls.
 * 
 * Usage:
 * ```tsx
 * const { scrollY, getParallaxStyle } = useParallaxScroll();
 * return <div style={getParallaxStyle(0.5)}>Moves at half scroll speed</div>
 * ```
 * 
 * @returns Object containing:
 *   - scrollY: Current vertical scroll position
 *   - getParallaxStyle: Function to generate transform styles
 *   - getHorizontalParallax: Function for horizontal movement based on scroll
 * 
 * @file src/hooks/use-parallax-scroll.tsx
 */

import { useEffect, useState, useCallback } from "react";

export const useParallaxScroll = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    // Use passive listener for better scroll performance
    window.addEventListener("scroll", handleScroll, { passive: true });
    
    // Set initial scroll position
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /**
   * Generates CSS transform style for vertical parallax movement
   * @param speed - Movement speed multiplier (1 = normal, 0.5 = half speed, 2 = double speed)
   * @param offset - Starting offset in pixels
   */
  const getParallaxStyle = useCallback(
    (speed: number = 0.5, offset: number = 0) => ({
      transform: `translateY(${(scrollY - offset) * speed}px)`,
    }),
    [scrollY]
  );

  /**
   * Generates CSS transform style for horizontal parallax movement
   * @param speed - Movement speed multiplier (positive = right, negative = left)
   * @param elementTop - Top position of the element (for relative calculations)
   */
  const getHorizontalParallax = useCallback(
    (speed: number, elementTop: number = 0) => {
      const relativeScroll = scrollY - elementTop + window.innerHeight;
      return {
        transform: `translateX(${relativeScroll * speed}px)`,
      };
    },
    [scrollY]
  );

  /**
   * Calculates opacity based on element position in viewport
   * @param elementTop - Top position of the element
   * @param fadeDistance - Distance over which fade occurs
   */
  const getScrollOpacity = useCallback(
    (elementTop: number, fadeDistance: number = 300) => {
      const relativeScroll = scrollY - elementTop + window.innerHeight;
      const opacity = Math.min(1, Math.max(0, relativeScroll / fadeDistance));
      return opacity;
    },
    [scrollY]
  );

  return { scrollY, getParallaxStyle, getHorizontalParallax, getScrollOpacity };
};
