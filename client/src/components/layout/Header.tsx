import React, { useCallback } from 'react';

import { Container } from '../common/Grid';
import { autoLogin, logout } from '../../api/users';
import { NavBar, NavLinkItem } from '../common/Nav';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../modules';
import { setUser, resetUser } from '../../modules/users';

import styled from 'styled-components';

const NavHeader = styled.header`
    border-bottom: 1px solid #dfdfdf;
`;

const Header = () => {
    const nickname = useSelector((state: RootState) => state.users.nickname);
    const dispatch = useDispatch();

    const [isLoggedIn, setLoggedIn] = React.useState<boolean>(false);
  
    const checkIsLoggin = useCallback(async () => {
        try {
            // 
            const res = await autoLogin();
            setLoggedIn(res.success);
            if (res.success) {
                dispatch(setUser(res.user.nickname));
            }
        } catch (err) {
            console.error(err);
        }
    }, [dispatch]);
  
    const logoutHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        try {
            await logout();
            setLoggedIn(false);
            dispatch(resetUser());
        } catch (err) {
            console.error(err);
        }
    }
  
    React.useEffect(() => {
      checkIsLoggin();
    }, [checkIsLoggin]);

    return (
        <NavHeader>
            <Container>
                <NavBar>
                    <NavLinkItem to="/">메인</NavLinkItem>
                    { nickname }
                    {
                        isLoggedIn ? 
                        <button onClick={logoutHandler}>로그아웃</button> :
                        <NavLinkItem to="/login">로그인</NavLinkItem> 
                    }
                    {/* <PrimaryButton onClick={logoutHandler}>로그아웃</PrimaryButton> */}
                </NavBar>
            </Container>
        </NavHeader>
    )
}

export default Header;