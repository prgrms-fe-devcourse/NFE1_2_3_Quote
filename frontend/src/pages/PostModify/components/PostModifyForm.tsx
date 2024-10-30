import CancelPopUp from "@/pages/PostCreate/components/CancelPopUp";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled, { keyframes, useTheme } from "styled-components";
import useModifyPost from "../hooks/useModifyPost";
import useGetPostInfo from "@/pages/PostDetail/hooks/useGetPostInfo";

const SelectedCategory = styled.p`
  width: 90%;
  margin-top: 50px;
  padding-top: 20px;
  font-size: 20px;
  text-align: end;
`;

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
  font-size: 26px;
  color: ${({ theme }) => theme.colorMainFont};
  border: none;
  border-bottom: 1px solid #797979;
  background-color: ${({ theme }) => theme.colorBackground};
`;
const TitleText = styled.p`
  font-size: 17px;
  color: #a7a7a7;
  position: absolute;
  right: 55px;
  top: 135px;
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
  color: ${({ theme }) => theme.colorMainFont};
  resize: none;
  border: none;
  border-bottom: 1px solid #797979;
  background-color: ${({ theme }) => theme.colorBackground};
`;
const QuoteText = styled.p`
  font-size: 17px;
  color: #a7a7a7;
  position: absolute;
  right: 55px;
  top: 305px;
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
  color: ${({ theme }) => theme.colorMainFont};
  resize: none;
  border: none;
  border-bottom: 1px solid #797979;
  background-color: ${({ theme }) => theme.colorBackground};
`;

const CancelButton = styled.button`
  width: 130px;
  height: 45px;
  margin: 40px 10px;
  font-size: 16px;
  color: ${({ theme }) => theme.colorButton};
  background-color: ${({ theme }) => theme.colorBackground};
  border-radius: 30px;
  border: 1px solid ${({ theme }) => theme.colorButton};
  &:hover {
    cursor: pointer;
  }
`;
const PublishButton = styled.button`
  width: 130px;
  height: 45px;
  margin: 40px 10px;
  font-size: 16px;
  color: #f3f3f3;
  background-color: ${({ theme }) => theme.colorMain};
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
  color: ${({ theme }) => theme.colorValidation};
  font-size: 16px;
  font-weight: bold;
  background-color: ${({ theme }) => theme.colorSub};
  border-radius: 10px;
  animation: ${fadeOut} 2s ease-in-out 1s forwards;
`;

const CreateSuccess = styled.div`
  position: fixed;
  top: 70px;
  width: 260px;
  height: 45px;
  padding: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.colorMainFont};
  font-size: 16px;
  font-weight: bold;
  background-color: ${({ theme }) => theme.colorSub};
  border-radius: 10px;
  animation: ${fadeOut} 2s ease-in-out 1s forwards;
`;

const PostModifyForm = () => {
  const theme = useTheme();
  const { postId } = useParams() as { postId: string };
  const { postInfo } = useGetPostInfo(postId);

  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [quote, setQuote] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (postInfo) {
      setCategory(postInfo.category);
      setTitle(postInfo.title);
      setQuote(postInfo.quote);
      setContent(postInfo.content);
    }
  }, [postInfo]);

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
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);

  const handleCancel = () => {
    setShowCancelPopUp(!showCancelPopUp);
  };

  const { mutate } = useModifyPost(setShowSuccessMsg, postId);

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
    mutate({
      data: {
        title: title,
        category: category,
        content: content,
        quote: quote,
      },
      postId,
    });
  };

  return (
    <>
      <SelectedCategory>{category}</SelectedCategory>
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
      <div>
        <CancelButton
          type='button'
          onClick={handleCancel}
        >
          취소
        </CancelButton>
        <PublishButton
          type='button'
          onClick={handleCreatePost}
        >
          수정
        </PublishButton>
      </div>
      {showCancelPopUp && (
        <CancelPopUp
          modify={true}
          showCancelPopUp={showCancelPopUp}
          setShowCancelPopUp={setShowCancelPopUp}
        />
      )}
      {showMsg && (
        <CreateError
          style={{
            boxShadow:
              theme.mode == "lightMode" ? "0px 0px 6px #dfdfdf" : "none",
          }}
        >
          {errorMsg}
        </CreateError>
      )}
      {showSuccessMsg && (
        <CreateSuccess
          style={{
            boxShadow:
              theme.mode == "lightMode" ? "0px 0px 6px #dfdfdf" : "none",
          }}
        >
          글 수정이 완료되었습니다.
        </CreateSuccess>
      )}
    </>
  );
};

export default PostModifyForm;
