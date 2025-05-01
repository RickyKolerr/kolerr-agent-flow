
import { useEffect } from 'react';

/**
 * This hook applies fixes for various viewport issues that can occur on mobile browsers,
 * particularly those related to dynamic viewport height calculation.
 */
export function useViewportFix() {
  useEffect(() => {
    // Fix for mobile viewport height issues (especially iOS)
    const setViewportHeight = () => {
      // Set CSS custom property for true viewport height
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    // Apply immediately
    setViewportHeight();
    
    // Update on resize
    window.addEventListener('resize', setViewportHeight);
    
    // Update on orientation change
    window.addEventListener('orientationchange', () => {
      // Small delay to ensure the browser has completed the orientation change
      setTimeout(setViewportHeight, 100);
    });

    return () => {
      window.removeEventListener('resize', setViewportHeight);
      window.removeEventListener('orientationchange', setViewportHeight);
    };
  }, []);

  return null; // This hook doesn't return anything
}
