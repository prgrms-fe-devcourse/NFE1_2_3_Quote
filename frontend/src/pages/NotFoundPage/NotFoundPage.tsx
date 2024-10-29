import styled, { useTheme } from "styled-components";
import NotFound_lightMode from "@assets/images/notFound_lightMode.png";
import NotFound_darkMode from "@assets/images/notFound_darkMode.png";
import MainLayout from "@/layouts/MainLayout";
import { useNavigate } from "react-router-dom";

const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const LogoContainer = styled.img`
  width: 150px;
`;

const ErrorTextContainer = styled.div`
  font-size: 18px;
  text-align: center;
  line-height: 24px;
  min-width: 500px;
  color: ${({ theme }) => theme.colorButton};
`;

const ErrorTitle = styled.p`
  font-size: 22px;
  font-weight: bold;
  margin: 20px;
`;

const GoHomeButton = styled.button`
  margin: 30px;
  width: 250px;
  height: 50px;
  background: none;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.colorButton};
  color: ${({ theme }) => theme.colorButton};
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colorButton};
    color: ${({ theme }) => theme.colorSub};
  }
`;

const NotFoundPage = () => {
  const theme = useTheme();

  const navigate = useNavigate();
  const handleGoHome = () => {
    navigate("/");
  };
  return (
    <MainLayout>
      <NotFoundContainer>
        <LogoContainer
          src={
            theme.mode === "lightMode" ? NotFound_lightMode : NotFound_darkMode
          }
        />
        <ErrorTextContainer>
          <ErrorTitle>페이지를 찾을 수 없습니다.</ErrorTitle>
          페이지의 주소가 잘못 입력되었거나, <br />
          주소가 변경 혹은 삭제되어 요청하신 페이지를 찾을 수 없습니다.
        </ErrorTextContainer>
        <GoHomeButton onClick={handleGoHome}>GO HOME</GoHomeButton>
      </NotFoundContainer>
    </MainLayout>
  );
};

export default NotFoundPage;
