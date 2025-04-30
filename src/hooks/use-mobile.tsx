
import { useMobileDetection } from "./use-mobile-detection";

export function useIsMobile() {
  const { isMobile } = useMobileDetection();
  return isMobile;
}
