import styled from "styled-components";
import WriteButtonDarkMode from "@assets/icons/write_button_darkMode.svg?react";
import WriteButtonLightMode from "@assets/icons/write_button_lightMode.svg?react";
import { useState } from "react";

const StyledButton = styled.div`
  width: 50px;
  height: 50px;
  position: fixed;
  left: calc(50% + 480px + 20px);
  bottom: 50px;
  svg {
    width: 100%;
    height: 100%;
  }
`;

const WriteButton = () => {
  const [mode, setMode] = useState<boolean>(false);
  return (
    <>
      <StyledButton>
        {mode ? <WriteButtonLightMode /> : <WriteButtonDarkMode />}
      </StyledButton>
    </>
  );
};

export default WriteButton;
