import styled from 'styled-components';

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
    color: ${({theme})=>theme.colors.primary};
    &::placeholder {
        color: #b0d19d;
    }
`;
export const TitleInput = styled(Input)`
    width: 100%;
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 1rem;
    &::placeholder {
        color: #c5c5c5;
    }
`;
