import { useMemo } from 'react';

export function usePerformanceProfile() {
  return useMemo(() => {
    const coarsePointer = window.matchMedia('(pointer: coarse)').matches;
    const narrowViewport = window.matchMedia('(max-width: 768px)').matches;
    const lowMemory = navigator.deviceMemory != null && navigator.deviceMemory <= 4;
    const isMobile = coarsePointer || narrowViewport || lowMemory;

    return {
      isMobile,
      dpr: isMobile ? 1 : Math.min(window.devicePixelRatio, 1.5),
      particleCount: isMobile ? 80 : 180,
      tunnelSegments: isMobile ? 3 : 4,
    };
  }, []);
}
