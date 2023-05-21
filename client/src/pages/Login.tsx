import React from 'react';
import { LoginLayout } from '../components/layout/Layout';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../api/users'; 
import { ExtraLinkButton, SubmitButton } from '../components/common/Button';
import { LoginInput } from '../components/common/Input';

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
        setAlertMessage(res.message); // Set the alert message if login fails
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