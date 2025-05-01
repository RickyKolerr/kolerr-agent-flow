
import { useState, useEffect } from 'react';

interface Viewport {
  width: number;
  height: number;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  orientation: 'portrait' | 'landscape';
  isStandalone: boolean;
  hasSafeArea: boolean;
  safeAreaInsets: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
}

/**
 * Enhanced custom hook for responsive design that provides viewport information
 * with special optimizations for PWAs
 */
export function useViewport(): Viewport {
  const [viewport, setViewport] = useState<Viewport>({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
    isMobile: false,
    isTablet: false,
    isDesktop: false,
    orientation: 'portrait',
    isStandalone: false,
    hasSafeArea: false,
    safeAreaInsets: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    }
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Apply critical viewport fixes
    document.documentElement.style.position = 'fixed';
    document.documentElement.style.height = '100%';
    document.documentElement.style.width = '100%';
    document.documentElement.style.overflow = 'hidden';
    document.documentElement.style.overflowX = 'hidden';
    
    document.body.style.position = 'absolute';
    document.body.style.top = '0';
    document.body.style.left = '0';
    document.body.style.right = '0';
    document.body.style.bottom = '0';
    document.body.style.overflow = 'auto';
    document.body.style.overflowX = 'hidden';
    document.body.style.webkitOverflowScrolling = 'touch';
    document.body.style.margin = '0';
    document.body.style.height = '100%';
    document.body.style.width = '100%';
    
    // Check for standalone PWA mode
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || 
                        (window.navigator as any).standalone === true;
    
    // Check for safe area support
    const hasSafeArea = CSS.supports('padding: env(safe-area-inset-top)');
    
    // Get safe area insets if supported
    const getSafeAreaInsets = () => {
      if (!hasSafeArea) {
        return { top: 0, right: 0, bottom: 0, left: 0 };
      }
      
      const computedStyle = getComputedStyle(document.documentElement);
      const getInset = (prop: string) => {
        const value = computedStyle.getPropertyValue(`env(safe-area-inset-${prop})`);
        return value ? parseInt(value, 10) : 0;
      };
      
      return {
        top: getInset('top'),
        right: getInset('right'),
        bottom: getInset('bottom'),
        left: getInset('left')
      };
    };
    
    // Apply safe area inset CSS variables
    if (hasSafeArea) {
      document.documentElement.style.setProperty('--safe-area-inset-top', 'env(safe-area-inset-top, 0px)');
      document.documentElement.style.setProperty('--safe-area-inset-right', 'env(safe-area-inset-right, 0px)');
      document.documentElement.style.setProperty('--safe-area-inset-bottom', 'env(safe-area-inset-bottom, 0px)');
      document.documentElement.style.setProperty('--safe-area-inset-left', 'env(safe-area-inset-left, 0px)');
    }
    
    // Function to update viewport state
    const updateViewport = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      setViewport({
        width,
        height,
        isMobile: width < 768,
        isTablet: width >= 768 && width < 1024,
        isDesktop: width >= 1024,
        orientation: width > height ? 'landscape' : 'portrait',
        isStandalone,
        hasSafeArea,
        safeAreaInsets: getSafeAreaInsets()
      });
      
      // Reapply critical styles to prevent mobile scroll issues
      document.documentElement.style.width = '100%';
      document.body.style.width = '100%';
      document.body.style.overflowX = 'hidden';
    };
    
    // Set initial values
    updateViewport();
    
    // Add event listener for resize
    let timeoutId: number;
    const handleResize = () => {
      if (timeoutId) {
        window.cancelAnimationFrame(timeoutId);
      }
      timeoutId = window.requestAnimationFrame(updateViewport);
    };
    
    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('orientationchange', handleResize, { passive: true });
    
    // Handle visibility changes (app coming back from background)
    document.addEventListener('visibilitychange', handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
      document.removeEventListener('visibilitychange', handleResize);
      if (timeoutId) {
        window.cancelAnimationFrame(timeoutId);
      }
    };
  }, []);

  return viewport;
}
