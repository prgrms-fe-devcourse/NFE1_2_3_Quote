import CancelPopUp from "@/pages/PostCreate/components/CancelPopUp";
import { useEffect, useRef, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import useModifyPost from "../hooks/useModifyPost";
import useGetPostInfo from "@/pages/PostDetail/hooks/useGetPostInfo";
import AlertPopUp from "@/components/AlertPopUp/AlertPopUp";
import CancelIcon from "@assets/icons/cancelBtn.svg?react";

const WholeContentContainer = styled.div`
  width: 85%;
  margin-top: 30px;
  height: 100vh;
  position: relative;
`;
const SelectedCategory = styled.p`
  width: 100%;
  padding: 30px 10px 0 0;
  font-size: 16px;
  text-align: end;
`;

const TitleContainer = styled.div`
  width: 100%;
  position: relative;
  margin-top: 50px;
`;
const TitleInput = styled.input`
  &::placeholder {
    color: #a7a7a7;
  }
  &:focus {
    outline: none;
  }
  width: 100%;
  padding: 30px 10px;
  font-size: 24px;
  color: ${({ theme }) => theme.colorMainFont};
  border: none;
  background-color: ${({ theme }) => theme.colorBackground};
`;
const TitleText = styled.p`
  font-size: 14px;
  color: #a7a7a7;
  position: absolute;
  bottom: 15px;
  right: 10px;
  margin: 0;
`;

const QuoteContainer = styled.div`
  width: 100%;
  border-top: 0.7px solid #797979;
  display: flex;
  flex-direction: column;
`;
const QuoteSentence = styled.textarea`
  &::placeholder {
    color: #a7a7a7;
  }
  &:focus {
    outline: none;
  }
  width: 100%;
  height: auto;
  overflow: hidden;
  line-height: 30px;
  padding: 30px 10px 10px 10px;
  font-size: 15px;
  color: ${({ theme }) => theme.colorMainFont};
  resize: none;
  border: none;
  background-color: ${({ theme }) => theme.colorBackground};
`;
const QuoteText = styled.p`
  font-size: 14px;
  color: #a7a7a7;
  align-self: flex-end;
  margin: 15px 10px;
`;

const ContentContainer = styled.div`
  width: 100%;
  border-top: 0.7px solid #797979;
  margin-bottom: 100px;
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
  overflow: hidden;
  line-height: 30px;
  padding: 30px 10px;
  font-size: 15px;
  color: ${({ theme }) => theme.colorMainFont};
  resize: none;
  border: none;
  background-color: ${({ theme }) => theme.colorBackground};
  z-index: 1000;
`;

const BtnContainer = styled.div`
  position: fixed;
  left: calc(50% + 480px - 25px);
  bottom: 50px;
  align-self: flex-end;
  display: flex;
  align-items: center;
  gap: 10px;
  flex-direction: column;
`;
const BtnCommonStyle = styled.button`
  width: 50px;
  height: 50px;
  border-radius: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;
const CancelButton = styled(BtnCommonStyle)`
  color: ${({ theme }) => theme.colorButton};
  background-color: ${({ theme }) => theme.colorBackground};
  border-radius: 30px;
  border: 1px solid ${({ theme }) => theme.colorButton};
  &:hover {
    cursor: pointer;
  }
`;
const PublishButton = styled(BtnCommonStyle)`
  color: #f3f3f3;
  background-color: ${({ theme }) => theme.colorMain};
  border: none;
  border-radius: 30px;
  &:hover {
    cursor: pointer;
  }
`;

const PostModifyForm = () => {
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

  // const handleQuoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
  //   if (e.target.value.length > 300) {
  //     e.target.value = e.target.value.substring(0, 300);
  //   }
  //   setQuote(e.target.value);
  // };

  // const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
  //   setContent(e.target.value);
  // };

  //textarea 높이조절 위해서 함수 변경
  const quoteRef = useRef<HTMLTextAreaElement | null>(null);
  const contentRef = useRef<HTMLTextAreaElement | null>(null);

  //quote textarea 높이 조절
  const handleQuoteChange = (
    quoteRef: React.RefObject<HTMLTextAreaElement>,
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    if (quoteRef.current) {
      const currentScrollY = window.scrollY;
      quoteRef.current.style.height = "auto"; // 기존 높이 초기화
      quoteRef.current.style.height = quoteRef.current.scrollHeight + "px"; // 내용에 맞춰 높이 설정
      
      window.scrollTo(0, currentScrollY);
      if (e.target.value.length > 300) {
        e.target.value = e.target.value.substring(0, 300);
      }
      setQuote(e.target.value);
    }
  };

  //content textarea 높이 조절
  const handleContentChange = (
    contentRef: React.RefObject<HTMLTextAreaElement>,
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    if (contentRef.current) {
      const currentScrollY = window.scrollY;
      contentRef.current.style.height = "auto"; // 기존 높이 초기화 
      contentRef.current.style.height = contentRef.current.scrollHeight + "px"; // 내용에 맞춰 높이 설정
      window.scrollTo(0, currentScrollY);
      setContent(e.target.value);
    }
  };

  const initialQuote = quote;
  const initialContent = content;
  useEffect(() => {
    if (quoteRef.current && contentRef.current) {
      const quoteDefaultHeight = quoteRef.current.scrollHeight;
      const contentDefaultHeight = contentRef.current.scrollHeight;
      quoteRef.current.style.height = `${quoteDefaultHeight}px`;
      contentRef.current.style.height = `${contentDefaultHeight}px`;
    }
  }, [initialQuote, initialContent]);

  const [showCancelPopUp, setShowCancelPopUp] = useState(false);
  const [showMsg, setShowMsg] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleCancel = () => {
    setShowCancelPopUp(!showCancelPopUp);
  };

  const location = useLocation();
  const from = location.state.from;

  const { mutate } = useModifyPost(postId, from);
  const [btnDisabled, setBtnDisabled] = useState(false);

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
    setBtnDisabled(true);
    mutate({
      data: {
        title: title,
        category: category,
        content: content,
        quote: quote,
      },
      postId,
    });
    localStorage.setItem("postModifySuccess", "글 수정이 완료되었습니다.");
  };

  return (
    <>
      <WholeContentContainer>
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
            onChange={(e) => handleQuoteChange(quoteRef, e)}
            ref={quoteRef}
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
            onChange={(e) => handleContentChange(contentRef, e)}
            ref={contentRef}
          />
        </ContentContainer>
        <BtnContainer>
          <CancelButton
            type='button'
            onClick={handleCancel}
            disabled={btnDisabled}
          >
            <CancelIcon />
          </CancelButton>
          <PublishButton
            type='button'
            onClick={handleCreatePost}
            disabled={btnDisabled}
          >
            수정
          </PublishButton>
        </BtnContainer>
        {showCancelPopUp && (
          <CancelPopUp
            modify={true}
            showCancelPopUp={showCancelPopUp}
            setShowCancelPopUp={setShowCancelPopUp}
          />
        )}
        {showMsg && <AlertPopUp error>{errorMsg}</AlertPopUp>}
      </WholeContentContainer>
    </>
  );
};

export default PostModifyForm;
