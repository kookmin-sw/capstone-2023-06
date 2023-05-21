import React, { useCallback } from "react";

import { Container } from "../common/Grid";
import { autoLogin, logout } from "../../api/users";
import { NavBar, NavLinkItem } from "../common/Nav";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { RootState } from "../../modules";
import { setUser, resetUser } from "../../modules/users";

import styled from "styled-components";
import { Button } from "../common/Button";
import { IconPencil, IconUser } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { IconLogout } from "@tabler/icons-react";

const NavHeader = styled.header`
  border-bottom: 1px solid #dfdfdf;
`;

const Header = () => {
  const dispatch = useDispatch();

  const { id, nickname, isLoggedIn } = useSelector(
    (state: RootState) => ({
      id: state.users.id,
      nickname: state.users.nickname,
      isLoggedIn: state.users.isLoggedIn,
    }),
    shallowEqual
  );

  const checkIsLoggin = useCallback(async () => {
    try {
      //
      const res = await autoLogin();

      if (res.success) {
        dispatch(setUser({
            id: res.result.id,
            nickname: res.result.nickname,
            image: res.result.picture,
            email: res.result.email,
        }));
      }
    } catch (err) {
      console.error(err);
    }
  }, [dispatch]);

  const logoutHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      await logout();
      dispatch(resetUser());
    } catch (err) {
      console.error(err);
    }
  };

  React.useEffect(() => {
    if (!isLoggedIn) checkIsLoggin();
  }, [checkIsLoggin]);

  return (
    <NavHeader>
      <Container>
        <NavBar>
          {/* <NavLinkItem to="/">메인</NavLinkItem> */}
          {isLoggedIn ? (
            <LoggedInMenu>
            <Link to={`/write`}>
              <IconPencil size={16}></IconPencil>
            </Link>
              <Link to={`/user/${id}`}>
                <IconUser size={16}></IconUser>
              </Link>
              <LogoutButton onClick={logoutHandler}>
                <IconLogout size={16} />
              </LogoutButton>
            </LoggedInMenu>
          ) : (
            <NavLinkItem to="/login">로그인</NavLinkItem>
          )}
          {/* <PrimaryButton onClick={logoutHandler}>로그아웃</PrimaryButton> */}
        </NavBar>
      </Container>
    </NavHeader>
  );
};

export default Header;

const LoggedInMenu = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 1rem;
  font-weight: 400;
  a,
  button {
    color: #545454;
  }
`;

const LogoutButton = styled(Button)`
  padding: 0px;
  //   color: ${({ theme }) => theme.colors.primary};
`;
