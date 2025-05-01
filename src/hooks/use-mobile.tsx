
import { useMobileDetection } from "./use-mobile-detection";
import { useZoomDetection } from "./use-zoom-detection";

export function useIsMobile() {
  const { isMobile, hasTouch, screenWidth } = useMobileDetection();
  const { isZoomed, zoomLevel } = useZoomDetection();
  
  return {
    isMobile,
    hasTouch,
    screenWidth,
    isZoomed,
    zoomLevel
  };
}
