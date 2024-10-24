import styled from "styled-components";
import profile from "@assets/images/profile.png";
import MainLayout from "@/layouts/MainLayout";
import WriteButton from "@/components/WriteButton/WriteButton";
import PostCard from "./components/PostCard";
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
  color: #303030;
  border-bottom: 2px solid black;
`;

const MessageContainer = styled.div`
  margin-top: 50px;
  font-size: 18px;
  color: #a7a7a7;
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
  const hasPosts = sampleData.length > 0;

  return (
    <MainLayout>
      <Container>
        <ProfileSection>
          <ProfileImage
            src={profile}
            alt='Profile'
          />
          <UserName>user</UserName>
          <UserEmail>user@gmail.com</UserEmail>
        </ProfileSection>

        <ContentSection>
          <TabLabel>작성한 글</TabLabel>
        </ContentSection>

        {hasPosts ? (
          <PostContainer>
            {sampleData.map((post) => (
              <PostCard
                key={post._id}
                post={post}
              />
            ))}
          </PostContainer>
        ) : (
          <MessageContainer>작성한 글이 없습니다.</MessageContainer>
        )}
      </Container>
      <WriteButton />
    </MainLayout>
  );
};

export default UserPage;

const sampleData: Post[] = [
  {
    _id: "111",
    category: "도서",
    title: "서시",
    content:
      "죽는 날까지 하늘을 우러러 한 점 부끄럼이 없기를, 잎새에 이는 바람에도 나는 괴로워했다",
    quote: "인상깊음",
    author: "테스트123",
    authorId: "123",
    date: "2024-10-23",
    bookmarkCount: "309",
  },
  {
    _id: "112",
    category: "노래",
    title: "서시",
    content:
      "죽는 날까지 하늘을 우러러 한 점 부끄럼이 없기를, 잎새에 이는 바람에도 나는 괴로워했다죽는 날까지 하늘을 우러러 한 점 부끄럼이 없기를, 잎새에 이는 바람에도 나는 괴로워했다죽는 날까지 하늘을 우러러 한 점 부끄럼이 없기를, 잎새에 이는 바람에도 나는 괴로워했다죽는 날까지 하늘을 우러러 한 점 부끄럼이 없기를, 잎새에 이는 바람에도 나는 괴로워했다죽는 날까지 하늘을 우러러 한 점 부끄럼이 없기를, 잎새에 이는 바람에도 나는 괴로워했다",
    quote: "인상깊음",
    author: "테스트123",
    authorId: "123",
    date: "2024-10-23",
    bookmarkCount: "309",
  },
  {
    _id: "113",
    category: "대사",
    title: "서시서시서시서시서시서시서시서시서시서시서시",
    content:
      "죽는 날까지 하늘을 우러러 한 점 부끄럼이 없기를, 잎새에 이는 바람에도 나는 괴로워했다",
    quote: "인상깊음",
    author: "테스트123",
    authorId: "123",
    date: "2024-10-23",
    bookmarkCount: "309",
  },
  {
    _id: "114",
    category: "인터뷰",
    title: "서시",
    content:
      "죽는 날까지 하늘을 우러러 한 점 부끄럼이 없기를, 잎새에 이는 바람에도 나는 괴로워했다",
    quote: "인상깊음",
    author: "테스트123",
    authorId: "123",
    date: "2024-10-24",
    bookmarkCount: "119",
  },
  {
    _id: "115",
    category: "기타",
    title: "서시",
    content:
      "죽는 날까지 하늘을 우러러 한 점 부끄럼이 없기를, 잎새에 이는 바람에도 나는 괴로워했다",
    quote: "인상깊음",
    author: "테스트123",
    authorId: "123",
    date: "2024-10-24",
    bookmarkCount: "112",
  },
];
