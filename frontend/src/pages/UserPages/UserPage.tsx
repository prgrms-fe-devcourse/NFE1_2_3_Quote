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
  margin-top: 90px;
  width: 100%;
  max-width: 860px;
`;

const ProfileImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  margin-top: 50px;
  border-radius: 50%;
`;

const UserName = styled.h1`
  margin-top: 15px;
  font-size: 18px;
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
  justify-content: center;
  margin-top: 100px;
`;

const TabLabel = styled.div`
  width: 100%;
  height: 58px;
  background: none;
  border: none;
  font-size: 16px;
  padding: 20px 0;
  text-align: center;
  color: ${({ theme }) => theme.colorMainFont};
  border-bottom: 1.5px solid ${({ theme }) => theme.colorMainFont};
`;

const MessageContainer = styled.div`
  margin-top: 100px;
  font-size: 15px;
  color: ${({ theme }) => theme.colorSubFont};
  text-align: center;
`;

const PostContainer = styled.div`
  width: 840px;
  height: 100%;
  margin: 20px auto 100px auto;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  flex-wrap: wrap;
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
      {/* <WriteButton
        location={"userPage"}
        id={user?.id}
      /> */}
    </MainLayout>
  );
};

export default UserPage;
