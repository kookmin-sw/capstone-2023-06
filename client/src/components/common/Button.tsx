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