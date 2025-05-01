
import * as React from "react";

const MOBILE_BREAKPOINT = 768;

/**
 * Enhanced mobile detection with PWA support and additional optimizations
 */
export function useMobileDetection() {
  const [isMobile, setIsMobile] = React.useState<boolean>(false);
  const [hasTouch, setHasTouch] = React.useState<boolean>(false);
  const [viewportWidth, setViewportWidth] = React.useState<number>(0);
  const [isStandalone, setIsStandalone] = React.useState<boolean>(false);
  const [hasSafeArea, setHasSafeArea] = React.useState<boolean>(false);
  const [isIOSDevice, setIsIOSDevice] = React.useState<boolean>(false);

  React.useEffect(() => {
    // Fix core HTML/Body styles for viewport stability
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
    
    // iOS detection
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || 
                  (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    setIsIOSDevice(isIOS);
    
    // Standalone PWA detection
    const standalone = window.matchMedia('(display-mode: standalone)').matches || 
                      (window.navigator as any).standalone === true;
    setIsStandalone(standalone);
    
    // Safe area detection for notched devices
    const hasSafeAreaInsets = CSS.supports('padding: env(safe-area-inset-top)');
    setHasSafeArea(hasSafeAreaInsets);
    
    if (hasSafeAreaInsets) {
      // Apply safe area insets as CSS variables
      document.documentElement.style.setProperty(
        '--safe-area-inset-top', 
        'env(safe-area-inset-top, 0px)'
      );
      document.documentElement.style.setProperty(
        '--safe-area-inset-bottom', 
        'env(safe-area-inset-bottom, 0px)'
      );
    }
    
    // For iOS-specific bugs
    if (isIOS) {
      // Prevent elastic scrolling
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.height = '100%';
      document.body.style.overflow = 'auto';
      
      // Prevent double-tap zoom
      document.addEventListener('touchstart', function(e) {
        if (e.touches.length > 1) {
          e.preventDefault();
        }
      }, { passive: false });
    }
    
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
      resizeTimeout = window.requestAnimationFrame(() => {
        updateMobileStatus();
        // Reapply critical styles
        document.documentElement.style.width = '100%';
        document.body.style.width = '100%';
        document.body.style.overflowX = 'hidden';
      });
    };

    // Add event listeners with throttling
    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('orientationchange', handleResize, { passive: true });
    
    // Handle page visibility changes (for when app resumes from background)
    document.addEventListener('visibilitychange', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
      document.removeEventListener('visibilitychange', handleResize);
      if (resizeTimeout) {
        window.cancelAnimationFrame(resizeTimeout);
      }
    };
  }, []);

  return { 
    isMobile, 
    hasTouch,
    viewportWidth,
    mobileBreakpoint: MOBILE_BREAKPOINT,
    isStandalone,
    hasSafeArea,
    isIOSDevice
  };
}
