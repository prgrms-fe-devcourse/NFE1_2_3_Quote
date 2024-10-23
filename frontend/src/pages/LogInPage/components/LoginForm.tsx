import MainLayout from "@/layouts/MainLayout";
import { FormEvent, useState } from "react";
import styled from "styled-components";
import logo from "@assets/images/quoteLogo.png";
import { Link } from "react-router-dom";

const Container = styled.form`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Header = styled.div`
  margin: 60px 0;
`;
const Logo = styled.img`
  width: 250px;
`;
const InputDiv = styled.div`
  margin-bottom: 20px;
`;
const InputStyle = styled.input`
  width: 400px;
  height: 46px;
  font-size: 12px;
  outline-style: none;
  border-radius: 10px;
  border: 0.9px solid black;
  padding: 16px;
  &:-webkit-autofill {
    -webkit-box-shadow: 0 0 0 30px #fff inset;
    -webkit-text-fill-color: #000;
  }
  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active {
    transition: background-color 5000s ease-in-out 0s;
  }
`;
const ErrorMessage = styled.div`
  color: #d72121;
  font-size: 12px;
  margin: 6px 0 0 10px;
`;
const LoginBtn = styled.button`
  width: 400px;
  height: 48px;
  border-radius: 10px;
  background-color: #474040;
  color: #f3f3f3;
  border-style: none;
  font-size: 14px;
  font-weight: bold;
  margin: 20px 0 27px 0;
  cursor: pointer;
  padding: 10px 0;
`;
const MoveToSignUp = styled.div`
  font-size: 12px;
  font-weight: bold;
  margin-bottom: 65px;
`;
const CopyRight = styled.span`
  font-size: 10px;
  font-weight: bold;
  color: #474040;
`;

const LoginForm = () => {
  const [errMsg, setErrorMsg] = useState("");

  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <MainLayout>
      <Container onSubmit={onSubmitHandler}>
        <Header>
          <Logo src={logo} />
        </Header>

        <InputDiv>
          <InputStyle
            type='text'
            placeholder='이메일 입력'
            name='email'
          />
          {errMsg && <ErrorMessage>{errMsg}</ErrorMessage>}
        </InputDiv>

        <InputDiv>
          <InputStyle
            type='text'
            placeholder='비밀번호 입력'
            name='password'
          />
          {errMsg && <ErrorMessage>{errMsg}</ErrorMessage>}
        </InputDiv>

        <LoginBtn type='submit'>로그인</LoginBtn>

        <MoveToSignUp>
          <span style={{ color: "#a7a7a7" }}>
            아직 회원이 아니신가요?&nbsp;
          </span>
          <Link
            to='/signup'
            style={{ textDecoration: "none" }}
          >
            <span
              style={{
                color: "#474040",
                cursor: "pointer",
              }}
            >
              회원가입
            </span>
          </Link>
        </MoveToSignUp>

        <CopyRight>Copyright © TEAM333333 All Rights Reserved.</CopyRight>
      </Container>
    </MainLayout>
  );
};

export default LoginForm;
