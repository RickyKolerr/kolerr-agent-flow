
import * as React from "react";

const MOBILE_BREAKPOINT = 768;

export function useMobileDetection() {
  const [isMobile, setIsMobile] = React.useState<boolean>(false);
  const [hasTouch, setHasTouch] = React.useState<boolean>(false);
  const [screenWidth, setScreenWidth] = React.useState<number>(0);

  React.useEffect(() => {
    // Function to update mobile status based on screen size
    const updateMobileStatus = () => {
      const width = window.innerWidth;
      setScreenWidth(width);
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

    // Prevent double-tap to zoom on mobile
    const preventZoom = (e: TouchEvent) => {
      if (e.touches.length > 1) {
        e.preventDefault();
      }
    };

    // Add event listeners with throttling
    window.addEventListener('resize', handleResize, { passive: true });
    
    // Add touch event listeners for mobile users
    if (hasTouch) {
      document.addEventListener('touchstart', preventZoom, { passive: false });
    }

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (hasTouch) {
        document.removeEventListener('touchstart', preventZoom);
      }
      if (resizeTimeout) {
        window.cancelAnimationFrame(resizeTimeout);
      }
    };
  }, [hasTouch]);

  return { 
    isMobile, 
    hasTouch,
    screenWidth,
    mobileBreakpoint: MOBILE_BREAKPOINT 
  };
}
