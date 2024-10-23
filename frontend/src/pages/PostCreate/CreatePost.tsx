import { useState } from "react";
import styled from "styled-components";
import CategorySelect from "./components/CategorySelect";
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

const ButtonContainer = styled.div`
  width: 90%;
  display: flex;
  justify-content: center;
  margin: 20px;
`;
const CancelButton = styled.button`
  width: 130px;
  height: 45px;
  margin: 20px 10px;
  font-size: 16px;
  color: #474040;
  background-color: #f3f3f3;
  border-radius: 30px;
  border: 2px solid #474040;
`;

const PublishButton = styled.button`
  width: 130px;
  height: 45px;
  margin: 20px 10px;
  font-size: 16px;
  color: #f3f3f3;
  background-color: #474040;
  border: none;
  border-radius: 30px;
`;

const CreatePost = () => {
  const [category, setCategory] = useState("도서");
  return (
    <MainLayout>
      <Container>
        <CategorySelect
          category={category}
          setCategory={setCategory}
        />
        <CreatePostForm category={category} />
        <ButtonContainer>
          <CancelButton>취소</CancelButton>
          <PublishButton>발행</PublishButton>
        </ButtonContainer>
      </Container>
    </MainLayout>
  );
};

export default CreatePost;
