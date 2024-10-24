import WriteButton from "@/components/WriteButton/WriteButton";
import MainLayout from "@/layouts/MainLayout";
import MainImage from "@assets/images/mainImage.png";
import styled from "styled-components";
import Search from "./components/Search";
import CategoryMark from "./components/CategoryMark";
import { useCallback, useState } from "react";
import PostCard from "./components/PostCard";
import { Post } from "@/types/Types";
import { categoryColors } from "@/styles/Colors";
import { useGetCategoryPostData } from "./hooks/useGetPostData";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  position: absolute;
  left: 0;
`;

const TopSection = styled.div`
  width: 100%;
  height: 40%;
  background-image: url(${MainImage});
  background-size: cover;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
`;

const CategoryContainer = styled.div`
  display: flex;
  position: absolute;
  bottom: -20px;
`;

const PostSection = styled.div`
  width: 960px;
  height: 50%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
`;

const PostContainer = styled.div`
  width: 870px; //270px * 3 + 10px * 6
  height: 100%;
  margin: 20px auto;
  display: flex;
  flex-wrap: wrap;
`;

const NoPostText = styled.p`
  margin: 20px auto;
  font-size: 18px;
`;

const MainPage = () => {
  const categoryList: string[] = [
    "전체",
    "도서",
    "노래",
    "대사",
    "인터뷰",
    "기타",
  ];

  const [selectCategory, setSelectCategory] = useState("전체");
  const navigate = useNavigate();

  const handleSelectCategory = useCallback((category: string) => {
    setSelectCategory(category);
    console.log("선택한 카테고리", category);
  }, []);

  const handleSelectPost = useCallback((postId: string) => {
    navigate(`/post/${postId}`);
  }, []);

  const { data, isLoading, isError } = useGetCategoryPostData(selectCategory);
  const sortedPostData = data?.sort((postA, postB) => {
    return (
      new Date(postB.createdAt).getTime() - new Date(postA.createdAt).getTime()
    );
  });

  console.log(data)

  const postData = sortedPostData || [];
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error</div>;
  }

  return (
    <MainLayout>
      <Container>
        <TopSection>
          <Search />
          <CategoryContainer>
            {categoryList.map((category, index) => (
              <CategoryMark
                key={index}
                category={category}
                active={category === selectCategory}
                color={categoryColors[category].bgColor}
                onClick={() => {
                  handleSelectCategory(category);
                }}
              />
            ))}
          </CategoryContainer>
        </TopSection>
        <PostSection>
          <PostContainer>
            {postData?.length > 0 ? (
              postData.map((post: Post) => (
                <PostCard
                  key={post._id}
                  post={post}
                  onClick={() => handleSelectPost(post._id)}
                />
              ))
            ) : (
              <NoPostText>포스트 글이 없습니다.</NoPostText>
            )}
          </PostContainer>
        </PostSection>
      </Container>
      <WriteButton />
    </MainLayout>
  );
};

export default MainPage;
