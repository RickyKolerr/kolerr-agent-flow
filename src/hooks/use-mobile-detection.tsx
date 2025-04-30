
import * as React from "react";

const MOBILE_BREAKPOINT = 768;

export function useMobileDetection() {
  const [isMobile, setIsMobile] = React.useState<boolean>(false);
  const [hasTouch, setHasTouch] = React.useState<boolean>(false);

  React.useEffect(() => {
    // Function to update mobile status based on screen size
    const updateMobileStatus = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
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
    mobileBreakpoint: MOBILE_BREAKPOINT 
  };
}
