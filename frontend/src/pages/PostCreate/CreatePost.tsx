import styled from "styled-components";
import CreatePostForm from "./components/CreatePostForm";
import MainLayout from "@/layouts/MainLayout";

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  background-color: ${({ theme }) => theme.colorBackground};
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
