
import React from 'react';
import Header from "./Header";
import Footer from "./Footer";

import { Container, ContainerFluid, MobileWrapper, MobileContainer, LoginContainer } from '../common/Grid';

export const MainLayout = ({ children } : { children: React.ReactNode }) => {
    return (
        <div className='main-layout'>
            <Header/>
            <Container>
                { children }
            </Container>
            <Footer/>
        </div>
    )
}

export const FluidLayout = ({ children } : { children: React.ReactNode }) => {
    return (
        <div className='fluid-layout'>
            <Header/>
            <ContainerFluid className='pd-none'>
                { children }
            </ContainerFluid>
            <Footer/>
        </div>
    )
}

export const LoginLayout = ({ children } : { children: React.ReactNode }) => {
    return (
        <MobileWrapper>
            <LoginContainer>
                { children }
            </LoginContainer>
        </MobileWrapper>
    )
}
