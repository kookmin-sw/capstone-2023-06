import React from "react";
import styled from "styled-components";
import logo from "../../assets/DESKIT.png";
import { Link, NavLink } from "react-router-dom";

export const NavBar = ({ children }: { children: React.ReactNode }) => {
  return (
    <NavBarStyle>
      <LogoItem to="/">
        <Logo src={logo} alt="logo" />
      </LogoItem>
      <NavBarCollapse>{children}</NavBarCollapse>
    </NavBarStyle>
  );
};

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
  justify-content: space-between;
`;

export const NavLinkItem = styled(NavLink)`
  padding: 0.25rem 0.5rem;
  color: black;
  font-weight: 400;
  font-size: 14px;
  &.active {
    color: ${({ theme }) => theme.colors.primary};
  }
  ${({ theme }) => theme.devices.desktop} {
    padding: 0.5rem 1rem;
    // font-weight: bold;
    font-size: 1rem;
  }
`;

const LogoItem = styled(Link)`
  display: flex;
  align-items: center;
  margin-right: 1rem;
  ${({ theme }) => theme.devices.tablet} {
    margin-right: 2rem;
  }
`;
const Logo = styled.img`
  height: 1.5rem;
  ${({ theme }) => theme.devices.desktop} {
    height: 2rem;
  }
`;
