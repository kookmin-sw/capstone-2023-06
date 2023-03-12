import styled from 'styled-components';

export const Button = styled.button`
    border: none;
    border-radius: .125rem;
    padding: 0.5rem 1rem;
    color: white;
    background: ${({theme} ) => theme.colors.primary};
    font-size: 1rem;
    cursor: pointer;
    outline: none;
`;
export const SecondaryButton = styled(Button)`
    background: ${({theme} ) => theme.colors.secondary};
`;