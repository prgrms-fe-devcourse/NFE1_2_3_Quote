import { useState, useRef, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import ProfileModifyButton from "@assets/icons/profile_modify_button.svg?react";
import profile from "@assets/images/profile.png";
import MainLayout from "@/layouts/MainLayout";
import ProfileEditModal from "@/pages/MyPages/components/ProfileEditModal";
import DeleteModal from "@/pages/MyPages/components/DeleteModal";

// Styled Components

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  caret-color: transparent;
`;

const fadeOut = keyframes`
  0% { opacity: 1; }
  100% { opacity: 0; }
`;

const SuccessMessage = styled.div`
  position: fixed;
  top: 70px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #fff;
  color: #303030;
  padding: 10px 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.25);
  font-size: 14px;
  font-weight: bold;
  z-index: 1100;
  pointer-events: none;
  opacity: 1;
  animation: ${fadeOut} 2s ease-in-out 1s forwards;
`;

const ProfileSection = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  width: 100%;
  max-width: 600px;
`;

const SettingsButtonWrapper = styled.div`
  position: absolute;
  top: 0;
  right: -20px;
  z-index: 1;
  cursor: pointer;
  width: 20px;
  height: 20px;
  svg {
    width: 100%;
    height: 100%;
  }
`;

const ProfileImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  margin-top: 50px;
  border-radius: 50%;
`;

const UserName = styled.h2`
  margin-top: 20px;
  font-size: 20px;
  color: #303030;
  text-align: center;
`;

const UserEmail = styled.p`
  margin-top: 5px;
  font-size: 10px;
  color: #a7a7a7;
  text-align: center;
`;

const ContentSection = styled.div`
  width: 700px;
  height: 60px;
  display: flex;
  justify-content: space-between;
  margin-top: 50px;
`;

const TabButton = styled.button<{ $isActive: boolean }>`
  width: 50%;
  height: 100%;
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  color: ${({ $isActive }) => ($isActive ? "#303030" : "#A7A7A7")};
  border-bottom: ${({ $isActive }) => ($isActive ? "2px solid black" : "none")};
`;

const MessageContainer = styled.div`
  margin-top: 50px;
  font-size: 18px;
  color: #a7a7a7;
`;

const Menu = styled.div`
  position: absolute;
  top: 30px;
  right: -20px;
  width: 110px;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 8px #e3e3e3;
  z-index: 10;
`;

const MenuItem = styled.button`
  width: 100%;
  padding: 12px;
  border: none;
  background: none;
  cursor: pointer;
  text-align: center;
  font-size: 12px;

  &:not(:last-child) {
    border-bottom: 1px solid #e3e3e3;
  }
`;

const MyPage = () => {
  const [activeTab, setActiveTab] = useState("posts");
  const [menuVisible, setMenuVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showEditSuccess, setShowEditSuccess] = useState(false);
  const [showDeleteSuccess, setShowDeleteSuccess] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const settingsButtonRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setMenuVisible((prev) => !prev);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(event.target as Node) &&
      !settingsButtonRef.current?.contains(event.target as Node)
    ) {
      setMenuVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const getMessage = () => {
    return activeTab === "posts"
      ? "작성한 글이 없습니다."
      : "북마크한 글이 없습니다.";
  };

  
  const handleDeleteAccount = () => {
    setShowDeleteSuccess(true); 
    setIsDeleteModalOpen(false);
  
    setTimeout(() => {
      setShowDeleteSuccess(false);
    }, 3000);
  };

  const handleProfileEditClick = () => {
    setMenuVisible(false);
    setIsModalOpen(true);
  };

  const handleDeleteClick = () => {
    setMenuVisible(false);
    setIsDeleteModalOpen(true);
  };

  const showEditSuccessMessage = () => {
    setShowEditSuccess(true);

    setTimeout(() => {
      setShowEditSuccess(false);
    }, 3000);
  };

  return (
    <MainLayout>
      <Container>
        <ProfileSection>
          <SettingsButtonWrapper ref={settingsButtonRef}>
            <ProfileModifyButton onClick={toggleMenu} />
          </SettingsButtonWrapper>
          {menuVisible && (
            <Menu ref={menuRef}>
              <MenuItem onClick={handleProfileEditClick}>프로필 수정</MenuItem>
              <MenuItem onClick={handleDeleteClick}>회원탈퇴</MenuItem>
            </Menu>
          )}
          <ProfileImage
            src={profile}
            alt='Profile'
          />
          <UserName>user</UserName>
          <UserEmail>user@gmail.com</UserEmail>
        </ProfileSection>
        <ContentSection>
          <TabButton
            $isActive={activeTab === "posts"}
            onClick={() => setActiveTab("posts")}
          >
            작성한 글
          </TabButton>
          <TabButton
            $isActive={activeTab === "bookmarks"}
            onClick={() => setActiveTab("bookmarks")}
          >
            북마크
          </TabButton>
        </ContentSection>
        <MessageContainer>{getMessage()}</MessageContainer>

        {isModalOpen && (
          <ProfileEditModal
            onClose={() => setIsModalOpen(false)}
            showSuccessMessage={showEditSuccessMessage}
          />
        )}
        {showEditSuccess && (
          <SuccessMessage>
            프로필 수정이 완료되었습니다.
          </SuccessMessage>
        )}
        {isDeleteModalOpen && (
          <DeleteModal
            onClose={() => setIsDeleteModalOpen(false)}
            onConfirm={handleDeleteAccount}
          />
        )}
        {showDeleteSuccess && (
          <SuccessMessage>
            탈퇴가 완료되었습니다.
          </SuccessMessage>
        )}
      </Container>
    </MainLayout>
  );
};

export default MyPage;
