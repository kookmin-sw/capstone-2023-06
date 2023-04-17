import React from 'react';

import { Link } from 'react-router-dom';
import { LoginLayout } from '../components/layout/Layout';
import { ExtraLinkButton, SubmitButton } from '../components/common/Button';
import { LoginInput } from '../components/common/Input';

const FindPassword = () => {
  const [email, setEmail] = React.useState<string>("");
  const [userID, setUserID] = React.useState<string>("");
  const [showFindID, setShowFindID] = React.useState<boolean>(false);

  const submitFindPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // PW 찾기 API 호출 및 데이터 유효성 검사를 이곳에서 수행하세요
    console.log(email, userID);
  };

  const submitFindID = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // ID 찾기 API 호출 및 데이터 유효성 검사를 이곳에서 수행하세요
    console.log(email);
  };

  return (
    <LoginLayout>
      <Link to="/">홈(이미지)</Link>
      {!showFindID ? (
        <form onSubmit={submitFindPassword} method="post">
          <section>
            <LoginInput id="userID" name="userID" type="text" autoComplete="username" placeholder="아이디" onChange={(e) => setUserID(e.target.value)} required />
          </section>
          <section>
            <LoginInput id="email" name="email" type="email" autoComplete="email" placeholder="가입한 이메일" onChange={(e) => setEmail(e.target.value)} required />
          </section>
          <SubmitButton type="submit" disabled={!email || !userID}>PW 찾기</SubmitButton>
          <SubmitButton type="button" onClick={() => setShowFindID(true)}>ID 찾기</SubmitButton>
          <ExtraLinkButton>
            <Link to="/login">로그인</Link>
          </ExtraLinkButton>
        </form>
      ) : (
        <form onSubmit={submitFindID} method="post">
          <section>
            <LoginInput id="email" name="email" type="email" autoComplete="email" placeholder="가입한 이메일" onChange={(e) => setEmail(e.target.value)} required />
          </section>
          <SubmitButton type="submit" disabled={!email}>ID 찾기</SubmitButton>
          <SubmitButton type="button" onClick={() => setShowFindID(false)}>PW 찾기</SubmitButton>
          <ExtraLinkButton>
            <Link to="/login">로그인</Link>
          </ExtraLinkButton>
        </form>
      )}
    </LoginLayout>
  );
};

export default FindPassword;