import styled from "styled-components";
import DarkModeButton from "@assets/icons/darkMode_button.svg?react";
import LightModeButton from "@assets/icons/lightMode_button.svg?react";
import LightModeLogo from "@assets/images/quoteLogo_lightMode.png";
import DarkModeLogo from "@assets/images/quoteLogo_darkMode.png";
import defaultProfile from "@assets/images/profile.png";
import { useState } from "react";
import { useAuthStore } from "@/pages/LogInPage/store/authStore";
import { useNavigate } from "react-router-dom";
import LogoutModal from "@/pages/LogInPage/components/LogoutModal";
import { useQuery } from "@tanstack/react-query";
import { fetchUserProfile } from "@/pages/MyPages/apis/mypage";
import useThemeStore from "@/styles/store/useThemeStore";
import { UserMe } from "@/types/Types";

const HeaderContainer = styled.header`
  background-color: ${({ theme }) => theme.colorHeader};
  width: 100%;
  height: 50px;
  opacity: 0.85;
  display: flex;
  justify-content: space-between;
  padding: 0 1rem;
  border-bottom: 1px solid #dadada;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 100;
  user-select: none; /* 텍스트 선택 방지 */
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled.img`
  padding: 10px;
  cursor: pointer;
  scale: 1.3;
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
  border: 1px solid ${({ theme }) => theme.colorMainFont};
  color: ${({ theme }) => theme.colorMainFont};
  background: none;
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
  const { themeMode, toggleThemeMode } = useThemeStore();
  const [logoutModal, setLogoutModal] = useState<boolean>(false);
  const { isLogin } = useAuthStore();
  const navigate = useNavigate();

  const { data: userProfile, refetch: refetchUserProfile } = useQuery<
    UserMe,
    Error
  >({
    queryKey: ["userProfile"],
    queryFn: fetchUserProfile,
    enabled: isLogin,
  });

  const showLogoutModal = () => {
    if (isLogin) {
      //로그인 상태(버튼이 로그아웃)일 때 로그아웃 모달창 띄우기
      setLogoutModal(true);
    } else {
      //로그아웃 상태(버튼이 시작하기)일 때 로그인 페이지로 이동
      navigate("/login");
    }
  };

  const handleLogoClick = () => {
    navigate("/");
  };

  const handleProfileClick = () => {
    navigate("/mypage");
  };

  const handleUpdateProfileImage = () => {
    refetchUserProfile();
  };

  return (
    <>
      <HeaderContainer>
        <Logo
          src={themeMode === "lightMode" ? LightModeLogo : DarkModeLogo}
          onClick={handleLogoClick}
        />
        <ButtonContainer>
          <StyledModeButton onClick={toggleThemeMode}>
            {themeMode === "lightMode" ? (
              <DarkModeButton />
            ) : (
              <LightModeButton />
            )}
          </StyledModeButton>
          <LoginButton onClick={showLogoutModal}>
            {isLogin ? "로그아웃" : "시작하기"}{" "}
          </LoginButton>
          {isLogin && (
            <Profile onClick={handleProfileClick}>
              <img
                src={userProfile?.profileImage || defaultProfile}
                alt='Profile'
                onLoad={handleUpdateProfileImage}
              />
            </Profile>
          )}
        </ButtonContainer>
      </HeaderContainer>
      {logoutModal && (
        <LogoutModal
          isModalOpen={logoutModal}
          onClose={() => setLogoutModal(false)}
        />
      )}
    </>
  );
};

export default Header;
