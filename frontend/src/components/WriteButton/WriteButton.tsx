import styled from "styled-components";
import WriteButtonDarkMode from "@assets/icons/write_button_darkMode.svg?react";
import WriteButtonLightMode from "@assets/icons/write_button_lightMode.svg?react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const StyledButton = styled.div`
  width: 50px;
  height: 50px;
  position: fixed;
  left: calc(50% + 480px + 20px);
  bottom: 50px;
  cursor: pointer;
  svg {
    width: 100%;
    height: 100%;
  }
`;

const WriteButton = () => {
  const [mode, setMode] = useState<boolean>(false);
  const navigate = useNavigate();
  const handleWriteButton = () => {
    navigate("/create-post");
  };
  return (
    <>
      <StyledButton onClick={handleWriteButton}>
        {mode ? <WriteButtonDarkMode /> : <WriteButtonLightMode />}
      </StyledButton>
    </>
  );
};

export default WriteButton;
