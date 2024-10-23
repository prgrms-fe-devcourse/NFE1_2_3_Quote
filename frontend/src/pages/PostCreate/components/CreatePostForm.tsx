import styled from "styled-components";

const TitleInput = styled.input`
  &::placeholder {
    color: #a7a7a7;
  }
  &:focus {
    outline: none;
  }
  width: 90%;
  height: 50px;
  padding: 16px;
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
  width: 90%;
  height: 190px;
  padding: 16px;
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
  width: 90%;
  height: 300px;
  padding: 16px;
  font-size: 18px;
  resize: none;
  border: none;
  border-bottom: 1px solid #797979;
  background-color: #f3f3f3;
`;

interface CategorySelectProps {
  category: string;
}

const CreatePostForm = ({ category }: CategorySelectProps) => {
  return (
    <>
      <TitleInput
        placeholder={
          category === "기타"
            ? "출처 및 생각하신 제목을 입력해주세요."
            : "감명받은 작품을 입력해주세요."
        }
      />
      <QuoteSentence
        placeholder={
          category === "기타"
            ? "자유로운 형식으로 작성해주세요."
            : "감명받은 부분을 입력해주세요."
        }
      />
      <MainInput
        placeholder={
          category === "기타"
            ? "자유롭게 의견을 표현해주세요."
            : "생각 또는 느낌을 자유롭게 입력해주세요."
        }
      />
    </>
  );
};

export default CreatePostForm;
