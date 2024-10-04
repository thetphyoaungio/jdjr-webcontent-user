import useResponsiveFontSize from "@/hooks/useResponsiveFontSize";
import React from "react";

interface ResponsiveTextProps {
  text: string;
}

const ResponsiveText: React.FC<ResponsiveTextProps> = ({ text }) => {
  const fontSize = useResponsiveFontSize(12, 24, 320, 1440);

  return <p style={{ fontSize: `${fontSize}px` }}>{text}</p>;
};

export default ResponsiveText;
