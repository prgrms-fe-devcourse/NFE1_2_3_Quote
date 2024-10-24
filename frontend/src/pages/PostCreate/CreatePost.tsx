import styled from "styled-components";
import CreatePostForm from "./components/CreatePostForm";
import MainLayout from "@/layouts/MainLayout";

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  background-color: #f3f3f3;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CreatePost = () => {
  return (
    <MainLayout>
      <Container>
        <CreatePostForm />
      </Container>
    </MainLayout>
  );
};

export default CreatePost;
