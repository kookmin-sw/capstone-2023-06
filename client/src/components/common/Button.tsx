import styled from 'styled-components';

export const Button = styled.button`
    border: none;
    border-radius: .125rem;
    padding: ${(props: { padding?: string }) => (props.padding || '0.5rem 1rem')};
    background: white;
    font-size: 1rem;
    outline: none;
`;
export const PrimaryButton = styled(Button)`
    color: white;
    background: ${({theme} ) => theme.colors.primary};
`
export const SecondaryButton = styled(Button)`
    color: white;
    background: ${({theme} ) => theme.colors.secondary};
`;

export const PrimaryRoundButton = styled.button`
    background-color: ${({theme} ) => theme.colors.primary};
    border: none;
    border-radius: 1rem;
`;

export const ExtraLinkButton = styled(Button)`
    margin-top: 1.25rem
    text-decoration: none;
    color: #3a3a3a;
    margin: 0.5rem 2rem 0.5rem 2rem;
    font-weight: 400;
    font-size: 1rem;
    &:extra-links a:hover {
        text-decoration: underline;
    }
    
`;

export const SubmitButton = styled(Button)`
    width: 100%;
    padding: 10px;
    margin-top: 1rem;
    background-color: #ccc;
    border-radius: 0.25rem;
    color: white;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.3s;
    &:enabled:hover {
        background-color: #386437;
    }
    &:enabled {
        background-color: #386437;
    }
`;
