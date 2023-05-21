import React from 'react';

import { LoginLayout } from '../components/layout/Layout';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../api/users'; // 로그인 API 추가
import { ExtraLinkButton, SubmitButton } from '../components/common/Button';
import { LoginInput } from '../components/common/Input';

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");

  const submitLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // 로그인 API를 호출하는 로직 추가
    try {
      const res = await login({
        email,
        password,
      });
      if (res.success) {
        navigate('/');
      } else {
        console.error(res.message); // 에러 메시지 출력
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <LoginLayout>
      <Link to="/">홈(이미지)</Link>
      <form onSubmit={submitLogin} method="post">
        <section>
          <LoginInput id="username" name="username" type="text" autoComplete="username" onChange={(e) => setEmail(e.target.value)} required autoFocus />
        </section>
        <section>
          <LoginInput id="current-password" name="password" type="password" autoComplete="current-password" onChange={(e) => setPassword(e.target.value)} required />
        </section>
        <SubmitButton type="submit" disabled={!email || !password}>Sign in</SubmitButton>
        <ExtraLinkButton>
          <Link to="/signup">회원가입</Link>
          <Link to="/findaccount">ID/PW 찾기</Link>
        </ExtraLinkButton>
      </form>
    </LoginLayout>
  );
}

export default Login;