import React from "react";
import { AdIndicatorContainer } from "./AdStyles";

interface AdIndicatorProps {
  currentSlide: number;
  totalSlides: number;
}

const AdIndicator: React.FC<AdIndicatorProps> = ({ currentSlide, totalSlides }) => {
  return (
    <AdIndicatorContainer>
      {currentSlide + 1} / {totalSlides}
    </AdIndicatorContainer>
  );
};

export default AdIndicator;
