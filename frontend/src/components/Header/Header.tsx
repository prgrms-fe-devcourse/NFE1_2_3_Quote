import styled from "styled-components";
import DarkModeButton from "@assets/icons/darkMode_button.svg?react";
import LightModeButton from "@assets/icons/lightMode_button.svg?react";
import logo from "@assets/images/quoteLogo.png";
import defaultProfile from "@assets/images/profile.png";
import { useState, useEffect } from "react";
import { useAuthStore } from "@/pages/LogInPage/store/authStore";
import { useNavigate } from "react-router-dom";
import LogoutModal from "@/pages/LogInPage/components/LogoutModal";
import { fetchUserProfile } from "@/pages/MyPages/apis/mypage";
import useThemeStore from "@/styles/store/useThemeStore";

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
  cursor: pointer;
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
  const { themeMode, toggleThemeMode } = useThemeStore();

  const [logoutModal, setLogoutModal] = useState<boolean>(false);
  const [profileImage, setProfileImage] = useState<string>(defaultProfile);
  // const [isLogin, setIsLogin] = useState<boolean>(true);
  const { isLogin } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    const loadUserProfile = async () => {
      if (isLogin) {
        try {
          const user = await fetchUserProfile();
          setProfileImage(user.profileImage || defaultProfile);
        } catch (error) {
          console.error("Failed to fetch user profile:", error);
        }
      }
    };

    loadUserProfile();
  }, [isLogin]);

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

  return (
    <>
      <HeaderContainer>
        <Logo
          src={logo}
          onClick={handleLogoClick}
        />
        <ButtonContainer>
          <StyledModeButton onClick={toggleThemeMode}>
            {themeMode === "lightMode" ? <DarkModeButton /> : <LightModeButton />}
          </StyledModeButton>
          <LoginButton onClick={showLogoutModal}>
            {isLogin ? "로그아웃" : "시작하기"}{" "}
          </LoginButton>
          {isLogin && (
            <Profile onClick={handleProfileClick}>
              <img
                src={profileImage}
                alt='Profile'
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
