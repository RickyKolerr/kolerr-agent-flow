
import * as React from "react";
import { useMediaQuery } from "./useMediaQuery";

// Multiple breakpoints for more precise device detection
const MOBILE_BREAKPOINT = 768;
const SMALL_MOBILE_BREAKPOINT = 480;
const TABLET_BREAKPOINT = 1024;

/**
 * A hook that provides device detection and responsive layout information
 * 
 * @returns Object with device and touch detection information
 * 
 * @example
 * const { isMobile, isTablet, hasTouch } = useMobileDetection();
 * 
 * if (isMobile) {
 *   // Use mobile-specific UI
 * }
 */
export function useMobileDetection() {
  // Use useMediaQuery for responsive breakpoint detection
  const isSmallMobile = useMediaQuery(`(max-width: ${SMALL_MOBILE_BREAKPOINT}px)`);
  const isMobile = useMediaQuery(`(max-width: ${MOBILE_BREAKPOINT}px)`);
  const isTablet = useMediaQuery(`(min-width: ${MOBILE_BREAKPOINT + 1}px) and (max-width: ${TABLET_BREAKPOINT}px)`);
  
  const [hasTouch, setHasTouch] = React.useState<boolean>(false);
  const [isIOS, setIsIOS] = React.useState<boolean>(false);
  const [isAndroid, setIsAndroid] = React.useState<boolean>(false);

  // Detect device capabilities on mount
  React.useEffect(() => {
    // Touch detection
    setHasTouch('ontouchstart' in window || navigator.maxTouchPoints > 0);
    
    // OS detection
    const userAgent = window.navigator.userAgent.toLowerCase();
    setIsIOS(/iphone|ipad|ipod/.test(userAgent));
    setIsAndroid(/android/.test(userAgent));
    
    // Add viewport height fix for mobile browsers
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      // Fix for mobile viewport height issues
      const setVh = () => {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
      };
      
      setVh();
      window.addEventListener('resize', setVh, { passive: true });
      
      return () => {
        window.removeEventListener('resize', setVh);
      };
    }
  }, []);

  return {
    isMobile,
    isSmallMobile,
    isTablet, 
    hasTouch,
    isIOS,
    isAndroid,
    mobileBreakpoint: MOBILE_BREAKPOINT,
    smallMobileBreakpoint: SMALL_MOBILE_BREAKPOINT,
    tabletBreakpoint: TABLET_BREAKPOINT
  };
}
