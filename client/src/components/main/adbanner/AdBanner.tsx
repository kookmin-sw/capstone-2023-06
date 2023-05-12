import React, { useEffect, useState } from 'react';
import { Slide, SlideWrapper, SlideIndicatorWrapper, SlideIndicator } from './AdBanner.styles';

const AdBanner = () => {
  const adImages = [
    'https://images.samsung.com/kdp/event/sec/2023/0207_galaxy_s23/launching_may/s23_kv_0501_pc.png',
    'https://images.samsung.com/kdp/event/sec/2023/0207_galaxy_s23/launching_may/s23_kv_0501_z_pc.png',
    'https://www.apple.com/v/apple-watch-ultra/e/images/overview/design/dive_face_dark_part1_startframe__gsl4cajoftui_medium_2x.jpg',
  ];
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % adImages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <SlideWrapper>
      {adImages.map((imageUrl, index) => (
        <Slide
          key={index}
          style={{
            opacity: currentSlide === index ? 1 : 0,
            backgroundImage: `url(${imageUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      ))}
      <SlideIndicatorWrapper>
        {adImages.map((_, index) => (
          <SlideIndicator key={index} isActive={currentSlide === index} />
        ))}
      </SlideIndicatorWrapper>
    </SlideWrapper>
  );
};

export default AdBanner;
