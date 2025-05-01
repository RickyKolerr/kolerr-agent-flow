
import { useState, useEffect } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export function useZoomDetection() {
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    if (!isMobile) return;

    // Calculate initial visual viewport dimensions
    const initialWidth = window.visualViewport?.width || window.innerWidth;
    
    const checkZoom = () => {
      if (!window.visualViewport) return;
      
      const currentZoom = window.visualViewport.scale || 1;
      const isCurrentlyZoomed = currentZoom > 1.05; // Threshold to detect zoom
      
      setZoomLevel(currentZoom);
      setIsZoomed(isCurrentlyZoomed);
    };

    // Check on mount
    checkZoom();
    
    // Add event listeners for zoom detection
    window.visualViewport?.addEventListener('resize', checkZoom);
    window.visualViewport?.addEventListener('scroll', checkZoom);
    
    return () => {
      window.visualViewport?.removeEventListener('resize', checkZoom);
      window.visualViewport?.removeEventListener('scroll', checkZoom);
    };
  }, [isMobile]);

  return { isZoomed, zoomLevel };
}
