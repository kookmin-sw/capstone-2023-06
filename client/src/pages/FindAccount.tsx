import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { LoginLayout } from '../components/layout/Layout';
import { ExtraLinkButton, SubmitButton, SwapButton } from '../components/common/Button';
import { LoginInput } from '../components/common/Input';
import logo from '../../src/assets/DESKIT.png';
import { Alert } from '../components/auth/FindAccount.styles';


const FindPassword = () => {
  const [email, setEmail] = useState<string>("");
  const [userID, setUserID] = useState<string>("");
  const [showFindID, setShowFindID] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
      navigate('/');
    }, 10000);
  }, []);

  const submitFindPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const submitFindID = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <LoginLayout>
      {showAlert && (
        <Link to="/">
          <Alert>
            <h2>OPPS!!</h2>
            <p>아직 지원되지 않는 서비스입니다.</p>
          </Alert>
        </Link>
      )}
      <Link to="/">
        <img src={logo} alt="logo" width={130} height={40}/>
      </Link>
      {!showFindID ? (
        <form onSubmit={submitFindPassword} method="post">
          <section>
            <LoginInput id="userID" name="userID" type="text" autoComplete="username" placeholder="아이디" onChange={(e) => setUserID(e.target.value)} required />
          </section>
          <section>
            <LoginInput id="email" name="email" type="email" autoComplete="email" placeholder="가입한 이메일" onChange={(e) => setEmail(e.target.value)} required />
          </section>
          <SubmitButton disabled={!email || !userID}>PW 찾기</SubmitButton>
          <SwapButton onClick={() => setShowFindID(true)}>ID 찾기</SwapButton>
          <ExtraLinkButton>
            <Link to="/login">로그인</Link>
          </ExtraLinkButton>
        </form>
      ) : (
        <form onSubmit={submitFindID} method="post">
          <section>
            <LoginInput id="email" name="email" type="email" autoComplete="email" placeholder="가입한 이메일" onChange={(e) => setEmail(e.target.value)} required />
          </section>
          <SubmitButton disabled={!email}>ID 찾기</SubmitButton>
          <SwapButton onClick={() => setShowFindID(false)}>PW 찾기</SwapButton>
          <ExtraLinkButton>
            <Link to="/login">로그인</Link>
          </ExtraLinkButton>
        </form>
      )}
    </LoginLayout>
  );
};

export default FindPassword;