
import { useEffect } from 'react';

/**
 * This hook applies fixes for various viewport issues that can occur on mobile browsers,
 * particularly those related to dynamic viewport height calculation and horizontal overflow.
 * Enhanced for dark mode compatibility.
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
      
      // Fix for iOS safe area issues
      document.documentElement.style.setProperty(
        '--safe-area-inset-top', 
        `env(safe-area-inset-top, 0px)`
      );
      document.documentElement.style.setProperty(
        '--safe-area-inset-bottom', 
        `env(safe-area-inset-bottom, 0px)`
      );
      
      // Ensure dark mode background extends to edges on mobile
      document.body.style.backgroundColor = '#171b23';
    };

    // Fix for content jumping when keyboard appears on mobile
    const preventKeyboardJump = () => {
      // Only needed for touch devices
      if ('ontouchstart' in window) {
        const viewportMeta = document.querySelector('meta[name=viewport]');
        if (viewportMeta) {
          viewportMeta.setAttribute(
            'content', 
            'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover'
          );
        }
      }
    };

    // Apply immediately
    setViewportHeight();
    preventHorizontalOverflow();
    preventKeyboardJump();
    
    // Update on resize
    const handleResize = () => {
      setViewportHeight();
      preventHorizontalOverflow();
    };
    
    window.addEventListener('resize', handleResize);
    
    // Update on orientation change
    window.addEventListener('orientationchange', () => {
      // Small delay to ensure the browser has completed the orientation change
      setTimeout(handleResize, 100);
    });

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, []);

  return null; // This hook doesn't return anything
}
