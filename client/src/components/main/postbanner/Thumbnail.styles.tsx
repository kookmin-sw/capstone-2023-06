import styled from 'styled-components';

export const PostWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

export const PostContainer = styled.div`
  width: 30%;
  padding: 1rem;
  box-sizing: border-box;
`;

export const PostImage = styled.div`
  width: 100%;
  height: 150px;
  border-radius: 0.5rem;
  background-color: #ccc;
  margin-bottom: 0.5rem;
`;

export const PostContent = styled.div`
  cursor: pointer;
  width: 100%;
  transition: transform 0.1s;

  &:active {
    transform: scale(0.95);
  }
`;