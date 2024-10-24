import MainLayout from "@/layouts/MainLayout";
import { ChangeEvent, FormEvent, useState } from "react";
import styled from "styled-components";
import logo from "@assets/images/quoteLogo.png";
import { Link } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";

const Container = styled.div`
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
  font-size: 14px;
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

interface LoginData {
  email: string;
  password: string;
}

interface ErrorMessage {
  emailErr?: string;
  passwordErr?: string;
}

const LoginForm = () => {
  const [loginInfo, setLoginInfo] = useState<LoginData>({
    email: "",
    password: "",
  });
  const [errMsg, setErrorMsg] = useState<ErrorMessage>({});
  const { mutate: loginMutation } = useLogin();

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setLoginInfo({ ...loginInfo, [name]: value });
  };

  //이메일 입력 형식이 유효한지 확인
  const isValidEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
    return emailRegex.test(email);
  };

  //비밀번호 형식이 유효한지 확인
  const isValidPwd = (pwd: string) => {
    const pwdRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*?_]).{8,15}$/;
    return pwdRegex.test(pwd);
  };

  //유효하지 않으면 에러 반환
  const isValid = () => {
    const errors: ErrorMessage = {
      emailErr: "",
      passwordErr: "",
    };

    if (!isValidEmail(loginInfo.email)) {
      errors.emailErr = "아이디를 정확하게 입력해주세요.";
    }
    if (!isValidPwd(loginInfo.password)) {
      errors.passwordErr = "비밀번호를 정확하게 입력해주세요.";
    }

    return errors;
  };

  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg({}); //버튼 누를 때 이전 에러 메세지 없애기

    const errors = isValid();
    const loginUser = {
      email: loginInfo.email,
      password: loginInfo.password,
    };

    if (isValidEmail(loginInfo.email) && isValidPwd(loginInfo.password)) {
      loginMutation(loginUser);
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
              placeholder='이메일 입력'
              name='email'
              onChange={handleChange}
              value={loginInfo.email}
              required
            />
            {errMsg.emailErr && <ErrorMessage>{errMsg.emailErr}</ErrorMessage>}
          </InputDiv>

          <InputDiv>
            <InputStyle
              type='password'
              placeholder='비밀번호 입력'
              name='password'
              onChange={handleChange}
              value={loginInfo.password}
              required
            />
            {errMsg.passwordErr && (
              <ErrorMessage>{errMsg.passwordErr}</ErrorMessage>
            )}
          </InputDiv>

          <LoginBtn type='submit'>로그인</LoginBtn>
        </form>

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
