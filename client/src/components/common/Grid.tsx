import styled from "styled-components";

export const ContainerFluid = styled.div`
	width: 100%;
	padding-left: 1rem;
	padding-right: 1rem;
    &.pd-none {
        padding-left: 0px;
        padding-right: 0px;
    }
`;
export const Container = styled(ContainerFluid)`
    margin-left: auto;
    margin-right: auto;
    ${({ theme }) => theme.devices.mobile} {
        max-width: 544px;
    }
    ${({ theme }) => theme.devices.tablet} {
        max-width: 736px;
    }
    ${({ theme }) => theme.devices.desktop} {
        max-width: 960px;
    }
    ${({ theme }) => theme.devices.desktopLarge} {
        max-width: 1168px;
    }
`;
export const MobileContainer = styled.div`
    max-width: 300px;
    margin-left: auto;
    margin-right: auto;
`;
export const MobileWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
`;

export const LoginContainer = styled.div`
    max-width: 350px;
    margin: 0 auto;
    padding: 30px;
    border-radius: 5px;
    background-color: #ffffff00;
    text-align: center;
`;