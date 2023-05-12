import styled from "styled-components";

export const AdBannerContainer = styled.div`
  position: relative;
  width: 100%;
  paddingTop: 16.67%;
  overflow: hidden;
`;

export const AdSlideImage = styled.img<{ currentSlide: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: ${({ currentSlide }) => (currentSlide ? 1 : 0)};
  transition: opacity 1s ease-in-out;
`;

export const AdIndicatorContainer = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;
  color: white;
  font-size: 18px;
  font-weight: bold;
`;
