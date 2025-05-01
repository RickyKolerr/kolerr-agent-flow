
import { useState, useEffect } from 'react';

interface Viewport {
  width: number;
  height: number;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  orientation: 'portrait' | 'landscape';
}

/**
 * Custom hook for responsive design that provides viewport information
 */
export function useViewport(): Viewport {
  const [viewport, setViewport] = useState<Viewport>({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
    isMobile: false,
    isTablet: false,
    isDesktop: false,
    orientation: 'portrait'
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Fix viewport issues on mobile
    document.documentElement.style.overflowX = 'hidden';
    document.documentElement.style.width = '100%';
    document.body.style.overflowX = 'hidden';
    document.body.style.width = '100%';
    
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
        orientation: width > height ? 'landscape' : 'portrait'
      });
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
    window.addEventListener('orientationchange', updateViewport);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', updateViewport);
      if (timeoutId) {
        window.cancelAnimationFrame(timeoutId);
      }
    };
  }, []);

  return viewport;
}
