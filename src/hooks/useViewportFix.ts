
import { useEffect } from 'react';

/**
 * This hook applies fixes for various viewport issues that can occur on mobile browsers,
 * particularly those related to dynamic viewport height calculation and horizontal overflow.
 */
export function useViewportFix() {
  useEffect(() => {
    // Fix for mobile viewport height issues (especially iOS)
    const setViewportHeight = () => {
      // Set CSS custom property for true viewport height
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    // Fix for horizontal overflow issues
    const preventHorizontalOverflow = () => {
      document.documentElement.style.overflowX = 'hidden';
      document.body.style.overflowX = 'hidden';
      document.body.style.width = '100%';
      document.body.style.maxWidth = '100vw';
      document.body.style.position = 'relative';
    };

    // Apply immediately
    setViewportHeight();
    preventHorizontalOverflow();
    
    // Update on resize
    window.addEventListener('resize', () => {
      setViewportHeight();
      preventHorizontalOverflow();
    });
    
    // Update on orientation change
    window.addEventListener('orientationchange', () => {
      // Small delay to ensure the browser has completed the orientation change
      setTimeout(() => {
        setViewportHeight();
        preventHorizontalOverflow();
      }, 100);
    });

    return () => {
      window.removeEventListener('resize', setViewportHeight);
      window.removeEventListener('orientationchange', setViewportHeight);
    };
  }, []);

  return null; // This hook doesn't return anything
}
