import { useState } from "react";
import styled, { keyframes } from "styled-components";
import CancelPopUp from "./CancelPopUp";
import CategorySelect from "./CategorySelect";

const TitleContainer = styled.div`
  width: 90%;
`;
const TitleInput = styled.input`
  &::placeholder {
    color: #a7a7a7;
  }
  &:focus {
    outline: none;
  }
  width: 100%;
  padding: 20px;
  font-size: 28px;
  border: none;
  border-bottom: 1px solid #797979;
  background-color: #f3f3f3;
`;
const TitleText = styled.p`
  font-size: 17px;
  color: #a7a7a7;
  position: absolute;
  right: 55px;
  top: 120px;
  margin: 12px;
`;

const QuoteContainer = styled.div`
  width: 90%;
  height: 170px;
`;
const QuoteSentence = styled.textarea`
  &::placeholder {
    color: #a7a7a7;
  }
  &:focus {
    outline: none;
  }
  width: 100%;
  height: 100%;
  padding: 20px;
  font-size: 18px;
  resize: none;
  border: none;
  border-bottom: 1px solid #797979;
  background-color: #f3f3f3;
`;
const QuoteText = styled.p`
  font-size: 17px;
  color: #a7a7a7;
  position: absolute;
  right: 55px;
  top: 290px;
  margin: 12px;
`;

const ContentContainer = styled.div`
  width: 90%;
  height: 320px;
`;
const ContentInput = styled.textarea`
  &::placeholder {
    color: #a7a7a7;
  }
  &:focus {
    outline: none;
  }
  width: 100%;
  height: 100%;
  padding: 20px;
  font-size: 18px;
  resize: none;
  border: none;
  border-bottom: 1px solid #797979;
  background-color: #f3f3f3;
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
  border: 1px solid #474040;
  &:hover {
    cursor: pointer;
  }
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
  &:hover {
    cursor: pointer;
  }
`;

const fadeOut = keyframes`
  0% { opacity: 1; }
  100% { opacity: 0; }
`;

const CreateError = styled.div`
  position: fixed;
  top: 70px;
  width: 260px;
  height: 45px;
  padding: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #d72121;
  font-size: 16px;
  font-weight: bold;
  background-color: #fff;
  box-shadow: 0px 0px 6px #dfdfdf;
  border-radius: 10px;
  animation: ${fadeOut} 1s ease-in-out 1s forwards;
`;

const CreatePostForm = () => {
  const [category, setCategory] = useState("도서");
  const [title, setTitle] = useState("");
  const [quote, setQuote] = useState("");
  const [content, setContent] = useState("");

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 20) {
      e.target.value = e.target.value.substring(0, 20);
    }
    setTitle(e.target.value);
  };

  const handleQuoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length > 300) {
      e.target.value = e.target.value.substring(0, 300);
    }
    setQuote(e.target.value);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const [showCancelPopUp, setShowCancelPopUp] = useState(false);
  const [showMsg, setShowMsg] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleCancel = () => {
    setShowCancelPopUp(!showCancelPopUp);
  };

  const handleCreatePost = () => {
    if (!title.trim()) {
      setShowMsg(true);
      setErrorMsg("제목을 입력해주세요.");
      setTimeout(() => {
        setShowMsg(false);
      }, 2000);
      return;
    }
    if (!quote.trim()) {
      setShowMsg(true);
      setErrorMsg("문장을 입력해주세요.");
      setTimeout(() => {
        setShowMsg(false);
      }, 2000);
      return;
    }
    if (!content.trim()) {
      setShowMsg(true);
      setErrorMsg("본문을 입력해주세요.");
      setTimeout(() => {
        setShowMsg(false);
      }, 2000);
      return;
    }
  };

  return (
    <>
      <CategorySelect
        category={category}
        setCategory={setCategory}
      />
      <TitleContainer>
        <TitleInput
          placeholder={
            category === "기타"
              ? "출처 및 생각하신 제목을 입력해주세요."
              : "감명받은 작품을 입력해주세요."
          }
          maxLength={20}
          value={title}
          onChange={handleTitleChange}
        />
        <TitleText>{title.length}/20</TitleText>
      </TitleContainer>
      <QuoteContainer>
        <QuoteSentence
          placeholder={
            category === "기타"
              ? "자유로운 형식으로 작성해주세요."
              : "감명받은 부분을 입력해주세요."
          }
          maxLength={300}
          value={quote}
          onChange={handleQuoteChange}
        />
        <QuoteText>{quote.length}/300</QuoteText>
      </QuoteContainer>
      <ContentContainer>
        <ContentInput
          placeholder={
            category === "기타"
              ? "자유롭게 의견을 표현해주세요."
              : "생각 또는 느낌을 자유롭게 입력해주세요."
          }
          value={content}
          onChange={handleContentChange}
        />
      </ContentContainer>
      <ButtonContainer>
        <CancelButton
          type='button'
          onClick={handleCancel}
        >
          취소
        </CancelButton>
        <PublishButton
          type='submit'
          onClick={handleCreatePost}
        >
          발행
        </PublishButton>
      </ButtonContainer>
      {showCancelPopUp && (
        <CancelPopUp
          showCancelPopUp={showCancelPopUp}
          setShowCancelPopUp={setShowCancelPopUp}
        />
      )}
      {showMsg && <CreateError>{errorMsg}</CreateError>}
    </>
  );
};

export default CreatePostForm;
