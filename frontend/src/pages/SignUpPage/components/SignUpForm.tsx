import MainLayout from "@/layouts/MainLayout";
import { ChangeEvent, FormEvent, useState } from "react";
import styled from "styled-components";
import logo from "@assets/images/quoteLogo.png";
import { Link } from "react-router-dom";
import { useSignUp } from "../hooks/useSignUp";

const Container = styled.form`
  width: 100%;
  display: flex;
  height: 100vh;
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
  height: 43px;
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
const SignUpBtn = styled.button`
  width: 400px;
  height: 45px;
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
const MoveToLogin = styled.div`
  font-size: 12px;
  font-weight: bold;
  margin-bottom: 65px;
`;
const CopyRight = styled.span`
  font-size: 10px;
  font-weight: bold;
  color: #474040;
`;

interface SignUpData {
  nickname: string;
  email: string;
  password: string;
  checkPwd: string;
}

const SignUpForm = () => {
  const [info, setInfo] = useState<SignUpData>({
    nickname: "",
    email: "",
    password: "",
    checkPwd: "",
  });
  const [checkPwd, setCheckPwd] = useState("");
  const [errMsg, setErrorMsg] = useState("");
  const { mutate: signUp } = useSignUp();

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setInfo({ ...info, [name]: value });
  };

  //입력값이 유효한지 확인
  const isValid = (data: string) => {
    if (data === info.nickname) {
      const nicknameRegex = /^[^\s]{1,8}$/;
      return nicknameRegex.test(data);
    }

    if (data === info.email) {
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
      return emailRegex.test(data);
    }

    if (data === info.password) {
      const pwdRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*?_]).{8,15}$/;
      return pwdRegex.test(data);
    }
  };

  //새로운 유저 정보 전송
  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newUser = {
      nickname: info.nickname,
      email: info.email,
      password: info.password,
    };

    const validation =
      isValid(info.email) &&
      isValid(info.nickname) &&
      isValid(info.password) &&
      info.password === info.checkPwd;

    const result = signUp(newUser);

    if (validation) {
      return result;
    }
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
            placeholder='닉네임 입력'
            name='nickname'
            value={info.nickname}
            onChange={handleChange}
            required
          />
          {errMsg && <ErrorMessage>{errMsg}</ErrorMessage>}
        </InputDiv>

        <InputDiv>
          <InputStyle
            type='text'
            placeholder='이메일 입력'
            name='email'
            value={info.email}
            onChange={handleChange}
            required
          />
          {errMsg && <ErrorMessage>{errMsg}</ErrorMessage>}
        </InputDiv>

        <InputDiv>
          <InputStyle
            type='text'
            placeholder='비밀번호 입력(영문 대소문자, 숫자, 특수문자 포함 8~15자)'
            name='password'
            value={info.password}
            onChange={handleChange}
            required
          />
          {errMsg && <ErrorMessage>{errMsg}</ErrorMessage>}
        </InputDiv>

        <InputDiv>
          <InputStyle
            type='text'
            placeholder='비밀번호 확인'
            name='checkPwd'
            value={checkPwd}
            onChange={handleChange}
            required
          />
          {errMsg && <ErrorMessage>{errMsg}</ErrorMessage>}
        </InputDiv>

        <SignUpBtn type='submit'>회원가입</SignUpBtn>

        <MoveToLogin>
          <span style={{ color: "#a7a7a7" }}>
            이미 계정이 있으신가요?&nbsp;
          </span>
          <Link
            to='/login'
            style={{ textDecoration: "none" }}
          >
            <span style={{ color: "#474040", cursor: "pointer" }}>로그인</span>
          </Link>
        </MoveToLogin>

        <CopyRight>Copyright © TEAM333333 All Rights Reserved.</CopyRight>
      </Container>
    </MainLayout>
  );
};

export default SignUpForm;
