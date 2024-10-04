export const calculateResponsiveFontSize = (
  minFontSize: number,
  maxFontSize: number,
  minViewportWidth: number,
  maxViewportWidth: number,
  currentViewportWidth: number
): number => {
  if (currentViewportWidth <= minViewportWidth) {
    return minFontSize;
  } else if (currentViewportWidth >= maxViewportWidth) {
    return maxFontSize;
  } else {
    const scaleFactor =
      (maxFontSize - minFontSize) / (maxViewportWidth - minViewportWidth);
    return (
      minFontSize + (currentViewportWidth - minViewportWidth) * scaleFactor
    );
  }
};
