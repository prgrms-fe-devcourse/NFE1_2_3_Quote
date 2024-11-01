import MainLayout from "@/layouts/MainLayout";
import styled from "styled-components";
import PostDetail from "./components/PostDetail";
import ScrollToTop from "./components/ScrollToTop";

const Container = styled.div`
  width: 100%;
  padding-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const PostDetailPage = () => {
  return (
    <MainLayout>
      <Container>
        <ScrollToTop />
        <PostDetail />
      </Container>
    </MainLayout>
  );
};

export default PostDetailPage;
