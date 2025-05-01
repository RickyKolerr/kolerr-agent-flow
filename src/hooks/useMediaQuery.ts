
import { useState, useEffect } from 'react';

/**
 * Custom hook for responsive design that returns if a media query is matched
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
      rafId = window.requestAnimationFrame(updateMatches);
    };
    
    window.addEventListener('resize', handleResize, { passive: true });
    
    // Cleanup function
    return () => {
      media.removeEventListener('change', updateMatches);
      window.removeEventListener('resize', handleResize);
      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, [query]);

  return matches;
}
