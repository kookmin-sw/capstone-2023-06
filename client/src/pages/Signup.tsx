import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { LoginLayout } from "../components/layout/Layout";
import { ExtraLinkButton, SubmitButton } from "../components/common/Button";
import { LoginInput } from "../components/common/Input";
import { signup } from "../api/users"; // Assuming your signup API function is exported from ./api
import logo from "../../src/assets/DESKIT.png";

const Signup = () => {
  const navigate = useNavigate();

  const [name, setName] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [confirmPassword, setConfirmPassword] = React.useState<string>("");

  const submitSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    try {
      const response = await signup({
        nickname: name,
        password: password,
        email: email,
        picture:
          "https://deskit-bucket-1.s3.ap-northeast-2.amazonaws.com/base/logo_square.png",
      });
      if (response.success) {
        navigate("/login");
      } else {
        alert(response.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <LoginLayout>
      <Link to="/">
        <img src={logo} alt="logo" height={40} />
      </Link>
      <form onSubmit={submitSignup} method="post">
        <section>
          <LoginInput
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="이름"
            onChange={(e) => setName(e.target.value)}
            required
            autoFocus
          />
        </section>
        <section>
          <LoginInput
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="이메일"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </section>
        <section>
          <LoginInput
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            placeholder="비밀번호"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </section>
        <section>
          <LoginInput
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            autoComplete="new-password"
            placeholder="비밀번호 확인"
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </section>
        <SubmitButton
          disabled={!name || !email || !password || !confirmPassword}
        >
          회원가입
        </SubmitButton>
        <ExtraLinkButton>
          <Link to="/login">로그인</Link>
          <Link to="/findaccount">ID/PW 찾기</Link>
        </ExtraLinkButton>
      </form>
    </LoginLayout>
  );
};
export default Signup;
