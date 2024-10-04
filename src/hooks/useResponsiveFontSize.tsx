import { calculateResponsiveFontSize } from "@/utils";
import { useState, useEffect, useCallback } from "react";

const useResponsiveFontSize = (
  minFontSize: number,
  maxFontSize: number,
  minViewportWidth: number,
  maxViewportWidth: number,
  debounceTime: number = 100
): number => {
  const [fontSize, setFontSize] = useState<number>(() => calculateFontSize());

  const calculateFontSize = (): number => {
    const viewportWidth = window.innerWidth;
    return calculateResponsiveFontSize(
      minFontSize,
      maxFontSize,
      minViewportWidth,
      maxViewportWidth,
      viewportWidth
    );
  };

  const calculateFontSizeCB = useCallback(calculateFontSize, [minFontSize,
    maxFontSize,
    minViewportWidth,
    maxViewportWidth]
  );

  useEffect(() => {
    const handleResize = () => {
      setFontSize(/* calculateFontSize */calculateFontSizeCB());
    };

    const debouncedResize = debounce(handleResize, debounceTime);
    window.addEventListener("resize", debouncedResize);

    return () => window.removeEventListener("resize", debouncedResize);
  }, [
    debounceTime,
    minFontSize,
    maxFontSize,
    minViewportWidth,
    maxViewportWidth,
    calculateFontSizeCB
  ]);

  return fontSize;
};

function debounce(func: () => void, wait: number) {
  let timeout: ReturnType<typeof setTimeout>;
  return () => {
    clearTimeout(timeout);
    timeout = setTimeout(func, wait);
  };
}

export default useResponsiveFontSize;
