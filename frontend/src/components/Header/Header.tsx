import styled from "styled-components";
import DarkModeButton from "@assets/icons/darkMode_button.svg?react";
import LightModeButton from "@assets/icons/lightMode_button.svg?react";
import logo from "@assets/images/quoteLogo.png";
import profile from "@assets/images/profile.png";
import { useState } from "react";

const HeaderContainer = styled.header`
  background-color: #f3f3f3;
  width: 100%;
  height: 50px;
  opacity: 0.85;
  display: flex;
  justify-content: space-between;
  padding: 0 1rem;
  border-bottom: 1px solid #e3e3e3;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled.img`
  padding: 10px;
`;

const StyledModeButton = styled.div`
  width: 30px;
  height: 30px;
  margin-right: 1rem;
  cursor: pointer;
  svg {
    width: 30px;
    height: 30px;
  }
`;

const LoginButton = styled.button`
  width: 120px;
  height: 30px;
  border-radius: 15px;
  border: 1px solid #474040;
  color: #474040;
  cursor: pointer;
`;

const Profile = styled.div`
  width: 40px;
  height: 40px;
  margin-left: 1rem;
  border-radius: 20px;
  overflow: hidden;
  cursor: pointer;

  img {
    width: 100%;
  }
`;

const Header = () => {
  const [mode, setMode] = useState<boolean>(false);
  const [isLogin, setIsLogin] = useState<boolean>(true);

  return (
    <HeaderContainer>
      <Logo src={logo} />
      <ButtonContainer>
        <StyledModeButton onClick={() => setMode(!mode)}>
          {mode ? <LightModeButton /> : <DarkModeButton />}
        </StyledModeButton>
        <LoginButton>{isLogin ? "로그아웃" : "시작하기"} </LoginButton>
        {isLogin && (
          <Profile>
            <img src={profile} />
          </Profile>
        )}
      </ButtonContainer>
    </HeaderContainer>
  );
};

export default Header;
