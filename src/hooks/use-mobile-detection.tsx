
import * as React from "react";

const MOBILE_BREAKPOINT = 768;

export function useMobileDetection() {
  const [isMobile, setIsMobile] = React.useState<boolean>(false);
  const [hasTouch, setHasTouch] = React.useState<boolean>(false);
  const [isZoomed, setIsZoomed] = React.useState<boolean>(false);
  const [viewportScale, setViewportScale] = React.useState<number>(1);

  React.useEffect(() => {
    // Function to update mobile status based on screen size
    const updateMobileStatus = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };

    // Function to check if the viewport is zoomed
    const updateZoomStatus = () => {
      if (window.visualViewport) {
        setViewportScale(window.visualViewport.scale);
        setIsZoomed(window.visualViewport.scale > 1.05);
      }
    };

    // Set initial mobile status
    updateMobileStatus();
    updateZoomStatus();

    // Check for touch capabilities
    setHasTouch('ontouchstart' in window || navigator.maxTouchPoints > 0);

    // Create a throttled resize handler
    let resizeTimeout: number;
    const handleResize = () => {
      if (resizeTimeout) {
        window.cancelAnimationFrame(resizeTimeout);
      }
      resizeTimeout = window.requestAnimationFrame(() => {
        updateMobileStatus();
        updateZoomStatus();
      });
    };

    // Add event listeners with throttling
    window.addEventListener('resize', handleResize, { passive: true });
    
    // Add visual viewport event listener if available
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', updateZoomStatus);
      window.visualViewport.addEventListener('scroll', updateZoomStatus);
    }

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', updateZoomStatus);
        window.visualViewport.removeEventListener('scroll', updateZoomStatus);
      }
      if (resizeTimeout) {
        window.cancelAnimationFrame(resizeTimeout);
      }
    };
  }, []);

  return { 
    isMobile, 
    hasTouch,
    isZoomed,
    viewportScale,
    mobileBreakpoint: MOBILE_BREAKPOINT 
  };
}
