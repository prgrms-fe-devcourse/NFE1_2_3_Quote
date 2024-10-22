import styled from "styled-components";
import logo from "@assets/images/quoteLogo.png";
import DarkModeButton from "@assets/icons/darkMode_button.svg?react";
import LightModeButton from "@assets/icons/lightMode_button.svg?react";
import { useState } from "react";

const HeaderContainer = styled.header`
  background-color: #f3f3f3;
  width: 100%;
  height: 50px;
  opacity: 0.85;
  display: flex;
`;

const Logo = styled.img`
  padding: 10px;
`;

const LoginButton = styled.button`
  width: 120px;
  height: 30px;
  border-radius: 15px;
  border: 1px solid #474040;
`;

const Header = () => {
  const [mode, setMode] = useState<boolean>(true);
  return (
    <HeaderContainer>
      <Logo src={logo} />
      {mode ? (
        <DarkModeButton onClick={() => setMode(!mode)} width="30px" height="30px" />
      ) : (
        <LightModeButton onClick={() => setMode(!mode)} width="30px" height="30px" />
      )}
      <LoginButton />
    </HeaderContainer>
  );
};

export default Header;
