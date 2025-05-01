
import { useMobileDetection } from "./use-mobile-detection";
import { useZoomDetection } from "./use-zoom-detection";

/**
 * Custom hook that combines mobile detection and zoom detection
 * @returns Combined mobile and zoom detection properties
 */
export function useIsMobile() {
  const mobileDetection = useMobileDetection();
  const zoomDetection = useZoomDetection();
  
  // Return both the mobile detection and zoom detection properties
  return {
    ...mobileDetection,
    ...zoomDetection
  };
}
