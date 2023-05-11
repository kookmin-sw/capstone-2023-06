import React from "react";
import { AdSlideImage } from "./AdStyles";

interface AdSlideProps {
  image: string;
  index: number;
  currentSlide: number;
}

const AdSlide: React.FC<AdSlideProps> = ({ image, index, currentSlide }) => {
  return (
    <AdSlideImage
      src={image}
      alt={`Advertisement ${index + 1}`}
      currentSlide={currentSlide === index}
    />
  );
};

export default AdSlide;