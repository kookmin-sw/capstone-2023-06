// TagScroller.styles.tsx
import styled, { keyframes } from 'styled-components';

const scroll = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
`;

export const TagContainer = styled.div`
  overflow: hidden;
  width: 100%;
  
  .scrolling-wrapper {
    display: flex;
    width: 200%;
    animation: ${scroll} 30s linear infinite;
  }
`;

export const Tag = styled.a`
  padding: 10px;
  color: black;
  text-decoration: none;

  &:hover {
    color: gray;
  }
`;
