
import * as React from "react";

interface TouchEventOptions {
  preventZoom?: boolean;
  preventScroll?: boolean;
  enablePinchToZoom?: boolean;
}

/**
 * Hook to handle touch events with proper zoom handling
 */
export function useTouchEvents(ref: React.RefObject<HTMLElement>, options: TouchEventOptions = {}) {
  const { 
    preventZoom = false, 
    preventScroll = false,
    enablePinchToZoom = true
  } = options;
  
  React.useEffect(() => {
    const element = ref.current;
    if (!element) return;
    
    let initialTouchDistance = 0;
    let isZooming = false;
    
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 2) {
        // This is a pinch/zoom gesture
        isZooming = true;
        
        // Calculate initial distance between touch points
        const touch1 = e.touches[0];
        const touch2 = e.touches[1];
        initialTouchDistance = Math.hypot(
          touch2.clientX - touch1.clientX,
          touch2.clientY - touch1.clientY
        );
        
        if (preventZoom && !enablePinchToZoom) {
          e.preventDefault();
        }
      }
    };
    
    const handleTouchMove = (e: TouchEvent) => {
      if (preventScroll) {
        // This prevents scroll but allows pinch if enablePinchToZoom is true
        if (!(isZooming && enablePinchToZoom)) {
          e.preventDefault();
        }
      }
      
      // Add zoom detection for custom handling
      if (e.touches.length === 2 && isZooming) {
        const touch1 = e.touches[0];
        const touch2 = e.touches[1];
        const currentDistance = Math.hypot(
          touch2.clientX - touch1.clientX,
          touch2.clientY - touch1.clientY
        );
        
        // Calculate zoom factor
        const zoomFactor = currentDistance / initialTouchDistance;
        
        // Custom zoom handling can be added here
        if (preventZoom && !enablePinchToZoom) {
          e.preventDefault();
        }
      }
    };
    
    const handleTouchEnd = () => {
      isZooming = false;
      initialTouchDistance = 0;
    };
    
    // Add event listeners
    element.addEventListener('touchstart', handleTouchStart, { passive: !preventZoom });
    element.addEventListener('touchmove', handleTouchMove, { passive: !preventScroll && !preventZoom });
    element.addEventListener('touchend', handleTouchEnd);
    
    // Clean up
    return () => {
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchmove', handleTouchMove);
      element.removeEventListener('touchend', handleTouchEnd);
    };
  }, [ref, preventZoom, preventScroll, enablePinchToZoom]);
}

/**
 * Helper to detect mobile pinch gestures in progress
 */
export function usePinchDetection() {
  const [isPinching, setIsPinching] = React.useState(false);
  
  React.useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 2) {
        setIsPinching(true);
      }
    };
    
    const handleTouchEnd = () => {
      setIsPinching(false);
    };
    
    // Update based on visualViewport scale changes
    const handleViewportScale = () => {
      if (window.visualViewport) {
        const isZoomed = window.visualViewport.scale > 1;
        if (isZoomed) {
          setIsPinching(true);
          // Reset after a delay
          setTimeout(() => setIsPinching(false), 300);
        }
      }
    };
    
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchend', handleTouchEnd);
    
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', handleViewportScale);
    }
    
    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
      
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', handleViewportScale);
      }
    };
  }, []);
  
  return { isPinching };
}
