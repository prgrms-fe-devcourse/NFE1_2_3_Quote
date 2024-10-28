import MainLayout from "@/layouts/MainLayout";
import PostModifyForm from "./components/PostModifyForm";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  background-color: #f3f3f3;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PostModifyPage = () => {
  return (
    <MainLayout>
      <Container>
        <PostModifyForm />
      </Container>
    </MainLayout>
  );
};

export default PostModifyPage;
