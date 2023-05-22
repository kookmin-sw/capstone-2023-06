import React from 'react';
import { LoginLayout } from '../components/layout/Layout';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../api/users'; 
import { ExtraLinkButton, SubmitButton } from '../components/common/Button';
import { LoginInput } from '../components/common/Input';
import logo from '../../src/assets/DESKIT.png';

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [alertMessage, setAlertMessage] = React.useState<string|null>(null); // State for alert message

  const submitLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await login({
        email,
        password,
      });
      if (res.success) {
        navigate('/');
      } else {
        setAlertMessage(res.message); 
        console.log("asdfasdfasdf");
      }
    } catch (err) {
      alert('아이디 또는 비밀번호가 일치하지 않습니다.');
      console.error(err);
    }
  };

  return (
    <LoginLayout>
      <Link to="/">
        <img src={logo} alt="logo" width={130} height={40}/>
      </Link>
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