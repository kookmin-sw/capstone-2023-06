import styled from 'styled-components';

export const Button = styled.button`
    border: none;
    border-radius: .125rem;
    padding: 0.5rem 1rem;
    color: white;
    background: ${({theme} ) => theme.colors.primary};
    font-size: 1rem;
    outline: none;
`;
export const SecondaryButton = styled(Button)`
    background: ${({theme} ) => theme.colors.secondary};
`;

export const PrimaryRoundButton = styled.button`
    background-color: ${({theme} ) => theme.colors.primary};
    border: none;
    border-radius: 1rem;
`;