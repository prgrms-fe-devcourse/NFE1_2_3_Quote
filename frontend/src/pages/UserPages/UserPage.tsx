import styled from "styled-components";
import profile from "@assets/images/profile.png";
import MainLayout from "@/layouts/MainLayout";
import PostCard from "./components/PostCard";
import { useUserPage } from "./hooks/useUserPage";
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
  height: 40px;
  display: flex;
  justify-content: center;
  margin-top: 50px;
`;

const TabLabel = styled.h3`
  width: 100%;
  height: 100%;
  background: none;
  border: none;
  font-size: 18px;
  text-align: center;
  color: ${({ theme }) => theme.colorMainFont};
  border-bottom: 2px solid ${({ theme }) => theme.colorMainFont};
`;

const MessageContainer = styled.div`
  margin-top: 50px;
  font-size: 18px;
  color: ${({ theme }) => theme.colorSubFont};
  text-align: center;
`;

const PostContainer = styled.div`
  width: 840px;
  height: 100%;
  margin: 30px auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
`;

const UserPage = () => {
  const {
    user,
    posts,
    isBookmarked,
    handleAddBookmark,
    handleRemoveBookmark,
    handleSelectPost,
  } = useUserPage();

  const renderPosts = (posts: Post[]) =>
    posts.length ? (
      <PostContainer>
        {posts.map((post) => (
          <PostCard
            key={post._id}
            post={post}
            userId={user?.id || ""}
            isBookmarked={isBookmarked(post._id)}
            onClick={() => handleSelectPost(post._id)}
            onAddBookmark={() => handleAddBookmark(post)}
            onRemoveBookmark={() => handleRemoveBookmark(post._id)}
          />
        ))}
      </PostContainer>
    ) : (
      <MessageContainer>작성한 글이 없습니다.</MessageContainer>
    );

  return (
    <MainLayout>
      <Container>
        <ProfileSection>
          <ProfileImage
            src={user?.profileImage || profile}
            alt='Profile'
          />
          <UserName>{user?.nickname || "user"}</UserName>
          <UserEmail>{user?.email || "user@gmail.com"}</UserEmail>
        </ProfileSection>

        <ContentSection>
          <TabLabel>작성한 글</TabLabel>
        </ContentSection>
        {renderPosts(posts)}
      </Container>
    </MainLayout>
  );
};

export default UserPage;
