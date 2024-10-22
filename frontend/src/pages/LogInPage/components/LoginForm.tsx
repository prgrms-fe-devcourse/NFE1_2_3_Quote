import MainLayout from "@/layouts/MainLayout";
import { useState } from "react";
import styled from "styled-components";
import logo from "@assets/images/quoteLogo.png";

const Container = styled.form`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 95px;
`;
const Header = styled.div`
  margin-bottom: 96px;
`;
const Logo = styled.img`
  width: 340px;
`;
const InputStyle = styled.input`
  width: 500px;
  height: 55px;
  font-size: 15px;
  outline-style: none;
  border-radius: 10px;
  box-sizing: border-box;
  border: 1px solid black;
  padding: 16px 22px;
  margin-bottom: 27px;
`;
const ErrorMessage = styled.div`
  color: #d72121;
  font-size: 12px;
  width: 500px;
  margin: 6px 0 24px 0;
`;
const LoginBtn = styled.button`
  width: 500px;
  height: 60px;
  border-radius: 10px;
  background-color: #474040;
  box-sizing: border-box;
  color: #f3f3f3;
  border-style: none;
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 27px;
  cursor: pointer;
  padding: 18px 0;
`;
const MoveToSignUp = styled.div`
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 47px;
`;
const CopyRight = styled.span`
  font-size: 12px;
  font-weight: bold;
  color: #474040;
`;

const LoginForm = () => {
  const [errMsg, setErrorMsg] = useState("");
  return (
    <MainLayout>
      <Container>
        <Header>
          <Logo src={logo} />
        </Header>
        <InputStyle
          type='text'
          placeholder='이메일 입력'
        />
        <ErrorMessage>{errMsg}</ErrorMessage>

        <InputStyle
          type='text'
          placeholder='비밀번호 입력'
        />
        <ErrorMessage>{errMsg}</ErrorMessage>

        <LoginBtn type='submit'>로그인</LoginBtn>

        <MoveToSignUp>
          <span style={{ color: "#a7a7a7" }}>
            아직 회원이 아니신가요?&nbsp;
          </span>
          <span style={{ color: "#474040", cursor: "pointer" }}>회원가입</span>
        </MoveToSignUp>

        <CopyRight>Copyright © TEAM333333 All Rights Reserved.</CopyRight>
      </Container>
    </MainLayout>
  );
};

export default LoginForm;
