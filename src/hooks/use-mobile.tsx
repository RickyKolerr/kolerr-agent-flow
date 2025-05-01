
import { useState, useEffect } from "react";
import { useMobileDetection } from "./use-mobile-detection";
import { useViewport } from "./useViewport";
import { useMediaQuery } from "./useMediaQuery";

interface MobileLayoutOptions {
  enableFixedPositioning: boolean;
  preventElasticScroll: boolean;
  useBottomSafeArea: boolean;
  applyTouchOptimizations: boolean;
}

/**
 * Comprehensive mobile layout management hook that combines multiple mobile hooks
 * and applies optimal settings for PWA and mobile web experiences
 */
export function useIsMobile(options?: Partial<MobileLayoutOptions>) {
  // Merge with default options
  const defaultOptions: MobileLayoutOptions = {
    enableFixedPositioning: true,
    preventElasticScroll: true,
    useBottomSafeArea: true,
    applyTouchOptimizations: true
  };
  
  const settings = { ...defaultOptions, ...options };
  
  // Combine multiple hooks for comprehensive detection
  const { isMobile, hasTouch, isStandalone, hasSafeArea, isIOSDevice } = useMobileDetection();
  const viewport = useViewport();
  const isMobileQuery = useMediaQuery('(max-width: 768px)');
  
  // Additional state for layout management
  const [safeAreaValues, setSafeAreaValues] = useState({
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  });
  
  // Apply all mobile optimizations
  useEffect(() => {
    if (!isMobile && !isMobileQuery) return;
    
    // Fix viewport and prevent scrolling issues
    if (settings.enableFixedPositioning) {
      document.documentElement.style.position = 'fixed';
      document.documentElement.style.height = '100%';
      document.documentElement.style.width = '100%';
      document.documentElement.style.overflow = 'hidden';
      
      document.body.style.position = 'absolute';
      document.body.style.top = '0';
      document.body.style.left = '0';
      document.body.style.right = '0';
      document.body.style.bottom = '0';
      document.body.style.overflow = 'auto';
      document.body.style.webkitOverflowScrolling = 'touch';
    }
    
    // Prevent elastic scrolling on iOS
    if (settings.preventElasticScroll && isIOSDevice) {
      document.addEventListener('touchmove', function(e) {
        if (e.touches.length > 1) {
          e.preventDefault();
        }
      }, { passive: false });
    }
    
    // Apply safe area insets
    if (settings.useBottomSafeArea && hasSafeArea) {
      // Get computed values for safe areas
      const computeInset = (side: string) => {
        const computedStyle = getComputedStyle(document.documentElement);
        return parseInt(computedStyle.getPropertyValue(`--safe-area-inset-${side}`).replace('px', '')) || 0;
      };
      
      setSafeAreaValues({
        top: computeInset('top'),
        right: computeInset('right'),
        bottom: computeInset('bottom'),
        left: computeInset('left')
      });
      
      // Apply to root element
      document.documentElement.style.setProperty('--safe-area-inset-top', 'env(safe-area-inset-top, 0px)');
      document.documentElement.style.setProperty('--safe-area-inset-right', 'env(safe-area-inset-right, 0px)');
      document.documentElement.style.setProperty('--safe-area-inset-bottom', 'env(safe-area-inset-bottom, 0px)');
      document.documentElement.style.setProperty('--safe-area-inset-left', 'env(safe-area-inset-left, 0px)');
    }
    
    // Touch optimizations
    if (settings.applyTouchOptimizations) {
      // Add touch-action to all interactive elements
      const elements = document.querySelectorAll('button, a, input, select, textarea');
      elements.forEach(el => {
        (el as HTMLElement).style.touchAction = 'manipulation';
        // Ensure tap targets are large enough
        if (el.tagName === 'BUTTON' || el.tagName === 'A') {
          const elem = el as HTMLElement;
          if (parseInt(getComputedStyle(elem).height) < 44) {
            elem.style.minHeight = '44px';
          }
        }
      });
    }
    
    return () => {
      // Cleanup if needed
      if (settings.preventElasticScroll && isIOSDevice) {
        document.removeEventListener('touchmove', function(e) {
          if (e.touches.length > 1) e.preventDefault();
        });
      }
    };
  }, [isMobile, isMobileQuery, isIOSDevice, hasSafeArea, settings]);
  
  return { 
    isMobile: isMobile || isMobileQuery, 
    hasTouch,
    isStandalone,
    hasSafeArea,
    isIOSDevice,
    safeAreaInsets: safeAreaValues,
    viewport
  };
}
