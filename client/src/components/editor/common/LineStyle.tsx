import styled, { css } from "styled-components";

export const LineStyle = css`
  padding-left: 0rem;
  padding-right: 0rem;

  ${({ theme }) => theme.devices.desktop} {
    padding-left: 12rem;
    padding-right: 12rem;
  }
`;


export const Line = styled.div`
  position: relative;
  margin-bottom: 10px;
  margin-top: 10px;
  ${LineStyle}
  :focus-visible {
    outline: 3px solid #aaa;
  }
`;
