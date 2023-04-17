import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LoginLayout } from '../components/layout/Layout';
import { ExtraLinkButton, SubmitButton } from '../components/common/Button';
import { LoginInput } from '../components/common/Input';

const Signup = () => {
    const navigate = useNavigate();

    const [name, setName] = React.useState<string>("");
    const [email, setEmail] = React.useState<string>("");
    const [password, setPassword] = React.useState<string>("");
    const [confirmPassword, setConfirmPassword] = React.useState<string>("");
  
    const submitSignup = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      //console.log(name, email, password, confirmPassword);
      navigate('/login');
    };

    return (
        <LoginLayout>
          <Link to="/">홈(이미지)</Link>
          <form onSubmit={submitSignup} method="post">
            <section>
              <LoginInput id="name" name="name" type="text" autoComplete="name" placeholder="이름" onChange={(e) => setName(e.target.value)} required autoFocus />
            </section>
            <section>
              <LoginInput id="email" name="email" type="email" autoComplete="email" placeholder="이메일" onChange={(e) => setEmail(e.target.value)} required />
            </section>
            <section>
              <LoginInput id="password" name="password" type="password" autoComplete="new-password" placeholder="비밀번호" onChange={(e) => setPassword(e.target.value)} required />
            </section>
            <section>
              <LoginInput id="confirmPassword" name="confirmPassword" type="password" autoComplete="new-password" placeholder="비밀번호 확인" onChange={(e) => setConfirmPassword(e.target.value)} required />
            </section>
            <SubmitButton disabled={!name || !email || !password || !confirmPassword}>회원가입</SubmitButton>
            <ExtraLinkButton>
              <Link to="/login">로그인</Link>
              <Link to="/findaccount">ID/PW 찾기</Link>
            </ExtraLinkButton>
          </form>
        </LoginLayout>
      );
}
export default Signup;