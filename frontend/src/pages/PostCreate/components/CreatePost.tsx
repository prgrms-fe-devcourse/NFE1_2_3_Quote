import MainLayout from "@/layouts/MainLayout";
import styled from "styled-components";
import DropBoxBtn from "@assets/icons/category_dropbox_button.svg?react";
import { useState } from "react";

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  background-color: #f3f3f3;
`;
const WriteSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CategorySelectContainer = styled.div`
  width: 860px;
  margin-top: 40px;
  display: flex;
  flex-direction: row-reverse;
`;

const CategorySelectButton = styled.button`
  width: 110px;
  height: 50px;
  padding: 8px;
  font-size: 20px;
  color: #303030;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  background-color: #f3f3f3;
`;

const DropBoxButton = styled(DropBoxBtn)`
  font-size: 24px;
  margin-left: 4px;
`;

const CategoryListContainer = styled.div`
  width: 150px;
  height: 210px;
  position: absolute;
  right: 40px;
  top: 90px;
  background-color: #fff;
  box-shadow: 0px 0px 6px #dfdfdf;
  border: 1px solid #e3e3e3;
  border-radius: 10px;
`;

const CategoryItem = styled.li`
  &:last-child {
    border: none;
  }
  list-style: none;
  font-size: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px;
  border-bottom: 1px solid #e3e3e3;
`;

const TitleInput = styled.input`
  &::placeholder {
    color: #a7a7a7;
  }
  &:focus {
    outline: none;
  }
  width: 860px;
  height: 80px;
  margin-top: 20px;
  padding: 18px;
  font-size: 28px;
  border: none;
  border-bottom: 1px solid #797979;
  background-color: #f3f3f3;
`;

const QuoteSentence = styled.textarea`
  &::placeholder {
    color: #a7a7a7;
  }
  &:focus {
    outline: none;
  }
  width: 860px;
  height: 240px;
  padding: 18px;
  font-size: 18px;
  resize: none;
  border: none;
  border-bottom: 1px solid #797979;
  background-color: #f3f3f3;
`;

const MainInput = styled.textarea`
  &::placeholder {
    color: #a7a7a7;
  }
  &:focus {
    outline: none;
  }
  width: 860px;
  height: 430px;
  padding: 18px;
  font-size: 18px;
  resize: none;
  border: none;
  border-bottom: 1px solid #797979;
  background-color: #f3f3f3;
`;

const ButtonContainer = styled.div`
  width: 860px;
  display: flex;
  justify-content: center;
  margin-top: 40px;
`;
const CancelButton = styled.button`
  width: 140px;
  height: 45px;
  margin: 20px 10px;
  font-size: 16px;
  color: #474040;
  background-color: #f3f3f3;
  border-radius: 30px;
  border: 2px solid #474040;
`;

const PublishButton = styled.button`
  width: 140px;
  height: 45px;
  margin: 20px 10px;
  font-size: 16px;
  color: #f3f3f3;
  background-color: #474040;
  border: none;
  border-radius: 30px;
`;

const CreatePost = () => {
  const [category, setCategory] = useState<String>("도서");
  const [showList, setShowList] = useState<boolean>(false);
  const categoryList: string[] = ["도서", "노래", "대사", "인터뷰", "기타"];
  const handleCategorySelect = (value: string) => {
    setCategory(value);
    setShowList(!showList);
  };

  return (
    <MainLayout>
      <Container>
        <WriteSection>
          <CategorySelectContainer>
            <CategorySelectButton onClick={() => setShowList(!showList)}>
              {category}
              <DropBoxButton />
            </CategorySelectButton>
          </CategorySelectContainer>
          {showList && (
            <CategoryListContainer>
              {categoryList.map((item, index) => (
                <CategoryItem
                  key={index}
                  onClick={() => handleCategorySelect(item)}
                >
                  {item}
                </CategoryItem>
              ))}
            </CategoryListContainer>
          )}
          <TitleInput placeholder='감명받은 작품을 입력해주세요.' />
          <QuoteSentence placeholder='감명받은 부분을 입력해주세요.' />
          <MainInput placeholder='생각 또는 느낌을 자유롭게 입력해주세요.' />
          <ButtonContainer>
            <CancelButton>취소</CancelButton>
            <PublishButton>발행</PublishButton>
          </ButtonContainer>
        </WriteSection>
      </Container>
    </MainLayout>
  );
};

export default CreatePost;
