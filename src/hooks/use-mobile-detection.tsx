
import * as React from "react";

const MOBILE_BREAKPOINT = 768;

export function useMobileDetection() {
  const [isMobile, setIsMobile] = React.useState<boolean>(false);
  const [hasTouch, setHasTouch] = React.useState<boolean>(false);
  const [viewportWidth, setViewportWidth] = React.useState<number>(0);

  React.useEffect(() => {
    // Set core HTML/Body styles for mobile viewport
    document.documentElement.style.overflowX = 'hidden';
    document.documentElement.style.width = '100%';
    document.documentElement.style.position = 'relative';
    document.body.style.overflowX = 'hidden';
    document.body.style.width = '100%';
    document.body.style.position = 'relative';
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    
    // Function to update mobile status based on screen size
    const updateMobileStatus = () => {
      const width = window.innerWidth;
      setViewportWidth(width);
      setIsMobile(width < MOBILE_BREAKPOINT);
    };

    // Set initial mobile status
    updateMobileStatus();

    // Check for touch capabilities
    setHasTouch('ontouchstart' in window || navigator.maxTouchPoints > 0);

    // Create a throttled resize handler
    let resizeTimeout: number;
    const handleResize = () => {
      if (resizeTimeout) {
        window.cancelAnimationFrame(resizeTimeout);
      }
      resizeTimeout = window.requestAnimationFrame(updateMobileStatus);
    };

    // Add event listener with throttling
    window.addEventListener('resize', handleResize, { passive: true });

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (resizeTimeout) {
        window.cancelAnimationFrame(resizeTimeout);
      }
    };
  }, []);

  return { 
    isMobile, 
    hasTouch,
    viewportWidth,
    mobileBreakpoint: MOBILE_BREAKPOINT 
  };
}
