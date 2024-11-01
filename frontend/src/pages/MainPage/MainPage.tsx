import styled from "styled-components";
import { Post } from "@/types/Types";
import { useGetCategoryPostData } from "./hooks/useGetPostData";
import { useNavigate } from "react-router-dom";
import { getUserData } from "./apis/userApi";
import { useAuthStore } from "../LogInPage/store/authStore";
import { useCallback, useEffect, useState } from "react";
import Search from "./components/Search";
import CategoryMark from "./components/CategoryMark";
import PostCard from "./components/PostCard";
import WriteButton from "@/components/WriteButton/WriteButton";
import MainLayout from "@/layouts/MainLayout";
import MainImage from "@assets/images/mainImage.png";
import AlertPopUp from "@/components/AlertPopUp/AlertPopUp";

// Styled Components

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
  min-height: 300px;
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
  margin: 0 auto;
  display: flex;
  justify-content: center;
`;

const PostContainer = styled.div`
  width: 870px; //270px * 3 + 10px * 6
  height: auto;
  margin: 20px auto;
  display: flex;
  flex-wrap: wrap;
`;

const NoPostText = styled.p`
  margin: 20px auto;
  font-size: 18px;
`;

// Main Page

//카테고리
const CATEGORY_LIST: string[] = [
  "전체",
  "도서",
  "노래",
  "대사",
  "인터뷰",
  "기타",
];

const MainPage = () => {
  const [selectCategory, setSelectCategory] = useState("전체");
  const [userId, setUserId] = useState<string>("");
  const [searchWord, setSearchWord] = useState<string>("");
  const navigate = useNavigate();
  const { isLogin } = useAuthStore();
  const [showDeleteMessage, setShowDeleteMessage] = useState(false);
  const [alert, setAlert] = useState<string>("");
  const [showDeleteSuccess, setShowDeleteSuccess] = useState(false);

  //카테고리 선택
  const handleSelectCategory = (category: string) => {
    setSelectCategory(category);
  };

  //포스트 선택 시
  const handleSelectPost = useCallback(
    (postId: string) => {
      if (!isLogin) {
        navigate("/login");
        return;
      }
      navigate(`/post/${postId}`, { state: { from: "main" } });
    },
    [isLogin],
  );

  //userId 받아오기
  const getUserId = async () => {
    const user = await getUserData();
    setUserId(user.id);
  };

  useEffect(() => {
    if (isLogin) {
      getUserId();
    } else {
      setUserId("none");
    }
  }, [isLogin]);

  //포스트 목록 불러오기
  const { data, isLoading, isError } = useGetCategoryPostData(
    selectCategory,
    searchWord,
  );

  //최신순 정렬
  const sortedPostData = data?.sort((postA, postB) => {
    return (
      new Date(postB.createdAt).getTime() - new Date(postA.createdAt).getTime()
    );
  });

  const postData = sortedPostData || [];

  const noPost = postData.length === 0;

  useEffect(() => {
    const shouldShowMessage =
      localStorage.getItem("showDeleteMessage") === "true";

    if (shouldShowMessage) {
      setShowDeleteMessage(true);

      const timer = setTimeout(() => {
        setShowDeleteMessage(false);
        localStorage.removeItem("showDeleteMessage");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    const loginAlert = localStorage.getItem("loginAlert");
    if (loginAlert) {
      setAlert(loginAlert);
      localStorage.removeItem("loginAlert");
      setTimeout(() => setAlert(""), 3000);
    }
  }, []);

  useEffect(() => {
    const deleteSuccess = localStorage.getItem("deleteSuccess");
    if (deleteSuccess) {
      setShowDeleteSuccess(true);
      localStorage.removeItem("deleteSuccess");
      setTimeout(() => setShowDeleteSuccess(false), 2000);
    }
  }, []);

  return (
    <MainLayout>
      <Container>
        <TopSection>
          <Search
            searchWord={searchWord}
            onChangeSearchWord={setSearchWord}
          />
          <CategoryContainer>
            {CATEGORY_LIST.map((category, index) => (
              <CategoryMark
                key={index}
                category={category}
                active={category === selectCategory}
                onClick={() => {
                  handleSelectCategory(category);
                }}
              />
            ))}
          </CategoryContainer>
        </TopSection>
        <PostSection>
          <PostContainer>
            {isLoading ? (
              <div /> 
            ) : isError || noPost ? (
              <NoPostText>포스트 글이 없습니다.</NoPostText>
            ) : (
              postData.map((post: Post) => (
                <PostCard
                  key={post._id}
                  post={post}
                  userId={userId}
                  isLogin={isLogin}
                  onClick={() => handleSelectPost(post._id)}
                />
              ))
            )}
            {showDeleteMessage && (
              <AlertPopUp>회원 탈퇴가 완료되었습니다.</AlertPopUp>
            )}
            {alert && <AlertPopUp>{alert}</AlertPopUp>}
            {showDeleteSuccess && <AlertPopUp>글이 삭제되었습니다.</AlertPopUp>}
          </PostContainer>
        </PostSection>
      </Container>
      <WriteButton location={"main"} />
    </MainLayout>
  );
};

export default MainPage;
