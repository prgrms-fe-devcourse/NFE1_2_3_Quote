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
  height: 60%;
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

  const handleSelectCategory = useCallback((category: string) => {
    setSelectCategory(category);
  }, []);

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
            <PostCard post={sampleData1} />
            <PostCard post={sampleData2} />
            <PostCard post={sampleData3} />
            <PostCard post={sampleData2} />
            <PostCard post={sampleData3} />
            <PostCard post={sampleData2} />
          </PostContainer>
        </PostSection>
      </Container>
      <WriteButton />
    </MainLayout>
  );
};


export default MainPage;

const sampleData1: Post = {
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
};
const sampleData2: Post = {
  _id: "111",
  category: "노래",
  title: "서시",
  content:
    "죽는 날까지 하늘을 우러러 한 점 부끄럼이 없기를, 잎새에 이는 바람에도 나는 괴로워했다",
  quote: "인상깊음",
  author: "테스트123",
  authorId: "123",
  date: "2024-10-23",
  bookmarkCount: "309",
};

const sampleData3: Post = {
  _id: "111",
  category: "대사",
  title: "서시",
  content:
    "죽는 날까지 하늘을 우러러 한 점 부끄럼이 없기를, 잎새에 이는 바람에도 나는 괴로워했다",
  quote: "인상깊음",
  author: "테스트123",
  authorId: "123",
  date: "2024-10-23",
  bookmarkCount: "309",
};
