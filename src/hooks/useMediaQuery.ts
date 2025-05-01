
import { useState, useEffect } from 'react';

/**
 * Custom hook for responsive design that returns if a media query is matched
 * 
 * @param query CSS media query string
 * @returns Boolean indicating if the query matches
 * 
 * @example
 * const isMobile = useMediaQuery('(max-width: 640px)');
 * const isDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
 */
export function useMediaQuery(query: string): boolean {
  // Default to false for SSR
  const [matches, setMatches] = useState<boolean>(() => {
    // Set initial value (SSR safe)
    if (typeof window !== 'undefined') {
      return window.matchMedia(query).matches;
    }
    return false;
  });

  useEffect(() => {
    // Don't run in SSR context
    if (typeof window === 'undefined') return;
    
    const media = window.matchMedia(query);
    
    // Update matches state initially and on changes
    const updateMatches = () => setMatches(media.matches);
    updateMatches();
    
    // Use the appropriate event listener based on browser support
    if (media.addEventListener) {
      media.addEventListener('change', updateMatches);
      return () => media.removeEventListener('change', updateMatches);
    } else {
      // Fallback for older browsers
      media.addListener(updateMatches);
      return () => media.removeListener(updateMatches);
    }
  }, [query]);

  return matches;
}
