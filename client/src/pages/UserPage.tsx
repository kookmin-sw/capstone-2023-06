import React,{useCallback} from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { autoLogin } from '../api/users';
import { RootState } from '../modules';
import { setUser, resetUser } from '../modules/users';
import { MainLayout } from '../components/layout/Layout';

const UserPage = () => {
    const nickname = useSelector((state: RootState) => state.users.nickname);
    const dispatch = useDispatch();

    const [isLoggedIn, setLoggedIn] = React.useState<boolean>(false);

    const checkIsLoggin = useCallback(async () => {
        try {
            const res = await autoLogin();
            setLoggedIn(res.success);
            if (res.success) {
                dispatch(setUser(res.result.nickname));
            }
        } catch (err) {
            console.error(err);
        }
    }, [dispatch]);
    return (
        <MainLayout> 
            {nickname}
        </MainLayout>
    );
};

export default UserPage;