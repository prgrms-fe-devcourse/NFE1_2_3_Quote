import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect, useCallback, memo } from "react";
import styled, { keyframes } from "styled-components";
import {
  fetchUserProfile,
  deleteUserAccount,
} from "./apis/mypage";
import { UserMe } from "@/types/Types"
import ProfileModifyButton from "@assets/icons/profile_modify_button.svg?react";
import profile from "@assets/images/profile.png";
import MainLayout from "@/layouts/MainLayout";
import WriteButton from "@/components/WriteButton/WriteButton";
import ProfileEditModal from "@/pages/MyPages/components/ProfileEditModal";
import DeleteModal from "@/pages/MyPages/components/DeleteModal";
import PostCard from "./components/PostCard";
import { useAuthStore } from "@/pages/LogInPage/store/authStore";

// Styled Components

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  caret-color: transparent;
  overflow: hidden;
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
  margin-top: 70px;
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
  width: 860px;
  height: 60px;
  display: flex;
  justify-content: space-evenly;
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

const MyPage = memo(() => {
  const [userProfile, setUserProfile] = useState<UserMe | null>(null);
  const [activeTab, setActiveTab] = useState("posts");
  const [menuVisible, setMenuVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showEditSuccess, setShowEditSuccess] = useState(false);
  const [showDeleteSuccess, setShowDeleteSuccess] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const navigate = useNavigate();
  const { storeLogout } = useAuthStore();

  const menuRef = useRef<HTMLDivElement>(null);
  const settingsButtonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const profile = await fetchUserProfile();
        setUserProfile(profile);
      } catch (error) {
        console.error("Failed to load user profile:", error);
      }
    };

    loadProfile();
  }, []);

  const toggleMenu = useCallback(() => {
    setMenuVisible((prev) => !prev);
  }, []);

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(event.target as Node) &&
      !settingsButtonRef.current?.contains(event.target as Node)
    ) {
      setMenuVisible(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  const getPosts = () =>
    activeTab === "posts"
      ? renderPosts(userProfile?.myPosts, "작성한 글이 없습니다.")
      : renderPosts(userProfile?.bookMarkedPosts, "북마크한 글이 없습니다.");

  const renderPosts = (posts: any[] | undefined, emptyMessage: string) =>
    posts?.length ? (
      posts.map((post, index) => (
        <PostCard
          key={index}
          post={post}
        />
      ))
    ) : (
      <MessageContainer>{emptyMessage}</MessageContainer>
    );

  const handleDeleteAccount = async () => {
    try {
      await deleteUserAccount();
      localStorage.removeItem("token");
      setShowDeleteSuccess(true);

      setTimeout(() => {
        setShowDeleteSuccess(false);
        navigate("/");
        storeLogout();
      }, 3000);
    } catch (error) {
      console.error("탈퇴 실패:", error);
      alert("탈퇴에 실패했습니다. 다시 시도해 주세요.");
    }
  };

  const handleProfileEditClick = useCallback(() => {
    setMenuVisible(false);
    setIsModalOpen(true);
  }, []);

  const handleDeleteClick = useCallback(() => {
    setMenuVisible(false);
    setIsDeleteModalOpen(true);
  }, []);

  const showEditSuccessMessage = useCallback(() => {
    setShowEditSuccess(true);

    setTimeout(() => {
      setShowEditSuccess(false);
    }, 3000);
  }, []);

  const handleUpdateProfile = (
    updatedImage: string,
    updatedNickname: string,
  ) => {
    setUserProfile((prevProfile) => ({
      ...prevProfile!,
      profileImage: `${updatedImage}?timestamp=${new Date().getTime()}`,
      nickname: updatedNickname,
    }));

    window.location.reload();
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
            src={userProfile?.profileImage || profile}
            alt='Profile'
          />
          <UserName>{userProfile?.nickname || "user"}</UserName>
          <UserEmail>{userProfile?.email || "user@gmail.com"}</UserEmail>
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
        <MessageContainer>{getPosts()}</MessageContainer>

        {isModalOpen && (
          <ProfileEditModal
            onClose={() => setIsModalOpen(false)}
            showSuccessMessage={showEditSuccessMessage}
            onUpdateProfile={handleUpdateProfile}
          />
        )}
        {showEditSuccess && (
          <SuccessMessage>프로필 수정이 완료되었습니다.</SuccessMessage>
        )}
        {isDeleteModalOpen && (
          <DeleteModal
            onClose={() => setIsDeleteModalOpen(false)}
            onConfirm={handleDeleteAccount}
          />
        )}
        {showDeleteSuccess && (
          <SuccessMessage>탈퇴가 완료되었습니다.</SuccessMessage>
        )}
      </Container>
      <WriteButton />
    </MainLayout>
  );
});

export default MyPage;
