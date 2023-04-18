import styled from "styled-components";
import { LineStyle } from "../editor/common/LineStyle";

export const Input = styled.input`
  border: none;
  padding-left: 0px;
  padding-right: 0px;
`;

export const TagInput = styled(Input)`
  width: 100%;
  font-size: 1rem;
  font-weight: 700;
  margin-top: 0.5rem;
  color: ${({ theme }) => theme.colors.primary};
  ${LineStyle}
  &::placeholder {
    color: #b0d19d;
  }
`;
export const TitleInput = styled(Input)`
  width: 100%;
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1rem;
  ${LineStyle}
  &::placeholder {
    color: #c5c5c5;
  }
`;

// 원형 공간을 만들때 사용 (e.g. RoundInputBlock > ColorPicker)
export const RoundInputBlock = styled.div`
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 1.25rem;
  overflow: hidden;
`;
export const ColorPicker = styled.input.attrs((props) => ({
  type: "color",
}))`
  border: 0;
  padding: 0;
  width: 200%;
  height: 200%;
  cursor: pointer;
  transform: translate(-25%, -25%);
`;
export const LinkInput = styled.input`
  border: none;
  border-radius: 0.25rem;
  background-color: #efefef;
  padding: 0.125rem;
  outline-color: ${({ theme }) => theme.colors.primary};
`;

export const LoginInput = styled.input`
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 0.25rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
  font-size: 1rem;
  outline: none;
  transition: border 0.3s;
`;
