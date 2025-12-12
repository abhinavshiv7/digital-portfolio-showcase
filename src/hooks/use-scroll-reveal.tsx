/**
 * useScrollReveal - Custom Hook for Scroll-Based Reveal Animations
 * 
 * This hook uses the Intersection Observer API to detect when an element
 * enters the viewport and triggers visibility state changes for animations.
 * 
 * Usage:
 * ```tsx
 * const { ref, isVisible } = useScrollReveal();
 * return <div ref={ref} className={isVisible ? 'visible' : 'hidden'}>Content</div>
 * ```
 * 
 * @param options - Configuration options
 * @param options.threshold - Percentage of element visible to trigger (0-1, default: 0.1)
 * @param options.rootMargin - Margin around root element (default: "0px 0px -100px 0px")
 * @param options.triggerOnce - If true, animation only triggers once (default: true)
 * 
 * @returns Object containing:
 *   - ref: React ref to attach to the target element
 *   - isVisible: Boolean indicating if element is in viewport
 * 
 * @file src/hooks/use-scroll-reveal.tsx
 */

import { useEffect, useRef, useState } from "react";

interface UseScrollRevealOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export const useScrollReveal = (options: UseScrollRevealOptions = {}) => {
  const {
    threshold = 0.1,
    rootMargin = "0px 0px -100px 0px",
    triggerOnce = true,
  } = options;

  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce) {
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [threshold, rootMargin, triggerOnce]);

  return { ref, isVisible };
};
