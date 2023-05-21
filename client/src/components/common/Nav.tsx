import React from "react";
import styled from "styled-components";
import { NavLink } from 'react-router-dom';
import logo from '../../assets/DESKIT.png';

export const NavBar = ({ children } : { children: React.ReactNode}) => {
    return (
        <NavBarStyle>
            <img src={logo} alt="logo" width={130} height={40}/> 
            <NavBarCollapse>
                { children }
            </NavBarCollapse>
        </NavBarStyle>
    )
}

export const NavBarStyle = styled.nav`
    height: 3.5rem;
    display: flex;
    padding-left: 0;
    margin-top: 0;
    margin-bottom: 0;
    list-style: none;
    align-items: center;
`;

const NavBarCollapse = styled(NavBarStyle)`
    flex-basis: auto;
    flex-grow: 1;
    justify-content: end;
`;

export const NavLinkItem = styled(NavLink)`
    padding: 0.5rem 1rem;
    color: black;
    font-weight: bold;
    &.active {
        color: ${({ theme }) => theme.colors.primary };
    }
`;

