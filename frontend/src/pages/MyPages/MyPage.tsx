import { memo } from "react";
import styled, { keyframes } from "styled-components";
import { useMyPage } from "./hooks/useMyPage";
import ProfileEditModal from "./components/ProfileEditModal";
import DeleteModal from "./components/DeleteModal";
import PostCard from "./components/PostCard";
import profile from "@assets/images/profile.png";
import WriteButton from "@/components/WriteButton/WriteButton";
import MainLayout from "@/layouts/MainLayout";
import ProfileModifyButton from "@assets/icons/profile_modify_button.svg?react";
import { Post } from "@/types/Types";

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
  background-color: ${({ theme }) => theme.colorSub};
  color: ${({ theme }) => theme.colorMainFont};
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

const UserName = styled.h1`
  margin-top: 10px;
  font-size: 20px;
  color: ${({ theme }) => theme.colorMainFont};
  text-align: center;
`;

const UserEmail = styled.p`
  margin-top: -5px;
  font-size: 10px;
  color: ${({ theme }) => theme.colorSubFont};
  text-align: center;
`;

const ContentSection = styled.div`
  width: 860px;
  height: 100%;
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
  padding-top: 20px;
  padding-bottom: 15px;
  cursor: pointer;
  color: ${({ $isActive }) => ($isActive ? "#303030" : "#A7A7A7")};
  border-bottom: ${({ $isActive }) => ($isActive ? "2px solid black" : "none")};
`;

const MessageContainer = styled.div`
  margin-top: 50px;
  font-size: 18px;
  color: ${({ theme }) => theme.colorSubFont};
`;

const PostContainer = styled.div`
  width: 840px;
  height: 100%;
  margin: 10px auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
`;

const Menu = styled.div`
  position: absolute;
  top: 30px;
  right: -20px;
  width: 110px;
  background: ${({ theme }) => theme.colorCategoryList};
  border-radius: 8px;
  box-shadow: 0 4px 8px ${({ theme }) => theme.colorLine};
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
  color: ${({ theme }) => theme.colorMainFont};

  &:not(:last-child) {
    border-bottom: 1px solid ${({ theme }) => theme.colorBottom};
  }
`;

const MyPage = memo(() => {
  const {
    userProfile,
    myPosts,
    bookmarkedPosts,
    activeTab,
    setActiveTab,
    menuVisible,
    setMenuVisible,
    isModalOpen,
    setIsModalOpen,
    showEditSuccess,
    showDeleteSuccess,
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    handleDeleteAccount,
    handleUpdateProfile,
    handleAddBookmark,
    handleRemoveBookmark,
    toggleMenu,
    handleSelectPost,
    menuRef,
    settingsButtonRef,
  } = useMyPage();

  const renderPosts = (posts: Post[]) =>
    posts.length ? (
      <PostContainer>
        {posts.map((post, index) => (
          <PostCard
            key={`${post._id}-${index}`}
            post={post}
            userId={profile || ""}
            isBookmarked={bookmarkedPosts.some((p) => p._id === post._id)}
            onClick={() => handleSelectPost(post._id)}
            onAddBookmark={handleAddBookmark}
            onRemoveBookmark={handleRemoveBookmark}
          />
        ))}
      </PostContainer>
    ) : (
      <MessageContainer>
        {activeTab === "posts"
          ? "작성한 글이 없습니다."
          : "북마크한 글이 없습니다."}
      </MessageContainer>
    );

  return (
    <MainLayout>
      <Container>
        <ProfileSection>
          <SettingsButtonWrapper ref={settingsButtonRef}>
            <ProfileModifyButton onClick={toggleMenu} />
          </SettingsButtonWrapper>
          {menuVisible && (
            <Menu ref={menuRef}>
              <MenuItem
                onClick={() => {
                  setIsModalOpen(true);
                  setMenuVisible(false);
                }}
              >
                프로필 수정
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setIsDeleteModalOpen(true);
                  setMenuVisible(false);
                }}
              >
                회원탈퇴
              </MenuItem>
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
        {renderPosts(activeTab === "posts" ? myPosts : bookmarkedPosts)}

        {isModalOpen && (
          <ProfileEditModal
            onClose={() => setIsModalOpen(false)}
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
      <WriteButton location={"myPage"}/>
    </MainLayout>
  );
});

export default MyPage;
