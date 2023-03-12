import React from 'react';

import { LoginLayout } from '../components/layout/Layout';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../api/users';

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");


  const submitLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await login({
        email: email,
        password: password,
      });
      console.log(res);
      if (res.success) {
        // 일단은 메인으로, 나중에는 이전 페이지로 간다거나 할 수 있음
        navigate('/');
      }
    }
    catch (err) {
      console.error(err);
    }
  }

  const emailHandler = (e : any) => {
    e.preventDefault();
    setEmail(e.target.value);
  };

  const passwordHandler = (e : any) => {
    e.preventDefault();
    setPassword(e.target.value);
  };

  return (
    <LoginLayout>
      <Link to="/">홈(이미지)</Link>
      <h1>로그인</h1>
      {/* TODO : input도 form 도 모두 컴포넌트화 */}
      <form onSubmit={submitLogin} method="post">
          <section>
              <label htmlFor="username">Username</label>
              <input id="username" name="username" type="text" autoComplete="username" onChange={emailHandler} required autoFocus/>
          </section>
          <section>
              <label htmlFor="current-password">Password</label>
              <input id="current-password" name="password" type="password" autoComplete="current-password" onChange={passwordHandler}  required/>
          </section>
          <button type="submit">Sign in</button>
      </form>
    </LoginLayout>
  );
}

export default Login;