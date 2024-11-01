import styled, { useTheme } from "styled-components";
import WriteButtonDarkMode from "@assets/icons/write_button_darkMode.svg?react";
import WriteButtonLightMode from "@assets/icons/write_button_lightMode.svg?react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@pages/LogInPage/store/authStore";

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

interface WriteBtnProps {
  location: string;
  id?: string;
}

const WriteButton = ({ location, id }: WriteBtnProps) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isLogin = useAuthStore((state) => state.isLogin);
  
  const handleWriteButton = () => {
    if (isLogin) {
      navigate("/create-post", { state: { from: location, id: id } });
    } else {
      navigate("/login");
    }
  };

  return (
    <>
      <StyledButton onClick={handleWriteButton}>
        {theme.mode === "lightMode" ? (
          <WriteButtonLightMode />
        ) : (
          <WriteButtonDarkMode />
        )}
      </StyledButton>
    </>
  );
};

export default WriteButton;
