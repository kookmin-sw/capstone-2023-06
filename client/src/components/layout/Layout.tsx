
import React from 'react';
import Header from "./Header";
import Footer from "./Footer";

import { Container, MobileWrapper, MobileContainer } from '../common/Grid';

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

export const LoginLayout = ({ children } : { children: React.ReactNode }) => {
    return (
        <MobileWrapper>
            <MobileContainer>
                { children }
            </MobileContainer>
        </MobileWrapper>
    )
}
