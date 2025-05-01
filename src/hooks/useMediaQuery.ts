
import { useState, useEffect } from 'react';

/**
 * Enhanced custom hook for responsive design that returns if a media query is matched
 * with optimizations for mobile devices and PWAs
 * 
 * @example
 * const isMobile = useMediaQuery('(max-width: 640px)');
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(() => {
    // Set initial value (SSR safe)
    if (typeof window !== 'undefined') {
      return window.matchMedia(query).matches;
    }
    return false;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Apply core document styles for mobile optimization
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
    // Apply webkit overflow scrolling with type casting
    (document.body.style as any).webkitOverflowScrolling = 'touch';
    document.body.style.margin = '0';
    document.body.style.height = '100%';
    document.body.style.width = '100%';
    
    // Add classes and styles for proper mobile display
    document.body.classList.add('has-responsive-elements');
    
    // Check for standalone PWA mode
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || 
                        (window.navigator as any).standalone === true;
    
    if (isStandalone) {
      document.documentElement.classList.add('pwa-standalone-mode');
      
      // Add safe area insets for notched devices
      document.documentElement.style.setProperty(
        '--safe-area-inset-top', 
        'env(safe-area-inset-top, 0px)'
      );
      document.documentElement.style.setProperty(
        '--safe-area-inset-bottom', 
        'env(safe-area-inset-bottom, 0px)'
      );
    }
    
    const media = window.matchMedia(query);
    
    // Update matches state initially and on changes
    const updateMatches = () => {
      setMatches(media.matches);
    };
    updateMatches();
    
    // Use correct event listener based on browser support
    media.addEventListener('change', updateMatches);
    
    // Use requestAnimationFrame to handle resize events more efficiently
    let rafId: number;
    const handleResize = () => {
      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }
      rafId = window.requestAnimationFrame(() => {
        updateMatches();
        // Reapply viewport fixes
        document.body.style.width = '100%';
        document.body.style.overflowX = 'hidden';
      });
    };
    
    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('orientationchange', handleResize, { passive: true });
    
    // Cleanup function
    return () => {
      media.removeEventListener('change', updateMatches);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, [query]);

  return matches;
}
