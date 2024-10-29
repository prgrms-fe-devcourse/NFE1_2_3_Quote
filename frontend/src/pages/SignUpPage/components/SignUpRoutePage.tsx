import MainLayout from "@/layouts/MainLayout";
import styled, { useTheme } from "styled-components";
import darkModeLogo from "@assets/images/quoteLogo_darkMode.png";
import lightModeLogo from "@assets/images/quoteLogo_lightMode.png";
import { Link } from "react-router-dom";
import EmailIcon from "@assets/icons/signUp_email.svg?react";
import KakaoBtn from "./KakaoBtn";
import useThemeStore from "@/styles/store/useThemeStore";

const BtnCommonStyle = styled.button`
  width: 400px;
  height: 48px;
  border-radius: 10px;
  border-style: none;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  padding: 10px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;
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
const NormalSignUpBtn = styled(BtnCommonStyle)`
  background-color: ${({ theme }) => theme.colorMain};
  color: #f3f3f3;
  margin-bottom: 12px;
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

const SignUpRoutePage = () => {
  const { themeMode, toggleThemeMode } = useThemeStore();

  return (
    <MainLayout>
      <Container>
        <Header>
          {themeMode === "lightMode" ? (
            <Logo src={lightModeLogo} />
          ) : (
            <Logo src={darkModeLogo} />
          )}
        </Header>

        <Link
          to='/signup-normal'
          style={{ textDecoration: "none" }}
        >
          <NormalSignUpBtn>
            <EmailIcon style={{ width: "16px", height: "16px" }} />
            <span>이메일로 가입하기</span>
          </NormalSignUpBtn>
        </Link>

        <KakaoBtn btnText={"카카오 계정으로 시작하기"} />

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

export default SignUpRoutePage;
