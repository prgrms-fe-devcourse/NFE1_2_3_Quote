import MainLayout from "@/layouts/MainLayout";
import { ChangeEvent, FormEvent, useState } from "react";
import styled from "styled-components";
import logo from "@assets/images/quoteLogo.png";
import { Link } from "react-router-dom";
import { useSignUp } from "../hooks/useSignUp";

const Container = styled.div`
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
  //password타입일 때 글꼴때문에 입력되는 것이 안 보여서 글꼴 수정
  &[type="password"] {
    font-family: Arial, Helvetica, sans-serif;
  }
`;
const ErrorMessage = styled.div`
  color: #d72121;
  font-size: 10px;
  margin: 6px 0 0 10px;
`;
const SignUpBtn = styled.button`
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

interface ErrorMessage {
  nicknameErr?: string;
  emailErr?: string;
  passwordErr?: string;
  checkPwdErr?: string;
}

const SignUpForm = () => {
  const [info, setInfo] = useState<SignUpData>({
    nickname: "",
    email: "",
    password: "",
    checkPwd: "",
  });
  const [errMsg, setErrorMsg] = useState<ErrorMessage>({});
  const { mutate: signUp } = useSignUp();

  //input값 반영
  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setInfo({ ...info, [name]: value });
  };

  //닉네임 입력 형식이 유효한지 확인
  const isValidNickname = (nickname: string) => {
    const nicknameRegex = /^[^\s]{1,8}$/;
    return nicknameRegex.test(nickname);
  };

  //닉네임 입력 형식이 유효한지 확인
  const isValidEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
    return emailRegex.test(email);
  };

  //비밀번호 형식이 유효한지 확인
  const isValidPwd = (pwd: string) => {
    const pwdRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*?_]).{8,15}$/;
    return pwdRegex.test(pwd);
  };

  //비밀번호 일치하는지 확인
  const doubleCheckPwd = (checkPwd: string) => {
    if (info.password === checkPwd) {
      return true;
    } else {
      return false;
    }
  };

  //유효하지 않으면 에러 반환
  const isValid = () => {
    const errors: ErrorMessage = {
      nicknameErr: "",
      emailErr: "",
      passwordErr: "",
      checkPwdErr: "",
    };

    if (!isValidNickname(info.nickname)) {
      errors.nicknameErr = "닉네임은 공백 없이 8자 이내로 입력해주세요.";
    }
    if (!isValidEmail(info.email)) {
      errors.emailErr = "아이디는 이메일 형식을 만족해야 합니다.";
    }
    if (!isValidPwd(info.password)) {
      errors.passwordErr =
        "비밀번호는 영문 대소문자, 숫자, 특수문자를 포함하여 8~15자 이내로 입력해주세요.";
    }
    if (!doubleCheckPwd(info.checkPwd)) {
      errors.checkPwdErr = "비밀번호가 일치하지 않습니다.";
    }

    return errors;
  };

  //새로운 유저 정보 전송
  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg({}); //버튼 누를 때 이전 에러 메세지 없애기

    const errors = isValid();
    const newUser = {
      nickname: info.nickname,
      email: info.email,
      password: info.password,
    };

    if (
      isValidEmail(info.email) &&
      isValidNickname(info.nickname) &&
      isValidPwd(info.password) &&
      doubleCheckPwd(info.checkPwd)
    ) {
      signUp(newUser);
    } else {
      setErrorMsg(errors);
    }
  };

  return (
    <MainLayout>
      <Container>
        <Header>
          <Logo src={logo} />
        </Header>

        <form onSubmit={onSubmitHandler}>
          <InputDiv>
            <InputStyle
              type='text'
              placeholder='닉네임 입력'
              name='nickname'
              value={info.nickname}
              onChange={handleChange}
              required
            />
            {errMsg.nicknameErr && (
              <ErrorMessage>{errMsg.nicknameErr}</ErrorMessage>
            )}
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
            {errMsg.emailErr && <ErrorMessage>{errMsg.emailErr}</ErrorMessage>}
          </InputDiv>

          <InputDiv>
            <InputStyle
              type='password'
              placeholder='비밀번호 입력(영문 대소문자, 숫자, 특수문자 포함 8~15자)'
              name='password'
              value={info.password}
              onChange={handleChange}
              required
            />
            {errMsg.passwordErr && (
              <ErrorMessage>{errMsg.passwordErr}</ErrorMessage>
            )}
          </InputDiv>

          <InputDiv>
            <InputStyle
              type='password'
              placeholder='비밀번호 확인'
              name='checkPwd'
              value={info.checkPwd}
              onChange={handleChange}
              required
            />
            {errMsg.checkPwdErr && (
              <ErrorMessage>{errMsg.checkPwdErr}</ErrorMessage>
            )}
          </InputDiv>

          <SignUpBtn type='submit'>회원가입</SignUpBtn>
        </form>

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
