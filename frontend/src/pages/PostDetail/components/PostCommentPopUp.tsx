import styled from "styled-components";
import { useState } from "react";
import { useTheme } from "styled-components";
import AlertPopUp from "@/components/AlertPopUp/AlertPopUp";
import { useCommentMutation } from "../hooks/usePostComment";

const PopUpContainer = styled.div`
  width: 400px;
  height: 250px;
  position: fixed;
  display: flex;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colorCancelPopUp};
  border-radius: 20px;
`;

const PopUpTitle = styled.p`
  font-size: 18px;
  font-weight: bold;
  margin: 14px 0;
`;

const PopUpButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const PopUpCancelButton = styled.p`
  width: 120px;
  height: 40px;
  background-color: ${({ theme }) => theme.colorCancelPopUp};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  color: ${({ theme }) => theme.colorCancelPopUPBtnFont};
  border: 1px solid ${({ theme }) => theme.colorCancelPopUPBtnFont};
  border-radius: 30px;
  margin: 14px 7px;
  &:hover {
    cursor: pointer;
  }
`;

const PopUpConfirmButton = styled.p`
  width: 120px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colorMain};
  font-size: 14px;
  color: #ffffff;
  border-radius: 30px;
  margin: 14px 7px;
  &:hover {
    cursor: pointer;
  }
`;

const PopUpTextAreaContainer = styled.div`
  width: 250px;
  height: 120px;
  position: relative;
`;

const PopUpTextArea = styled.textarea`
  width: 250px;
  height: 120px;
  border-radius: 10px;
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.colorMainFont};
  color: ${({ theme }) => theme.colorMainFont};
  background: none;
  overflow-y: scroll;

  &::placeholder {
    color: #a7a7a7;
  }
  &:focus {
    outline-color: ${({ theme }) => theme.colorMain};
  }
`;

const CommentText = styled.p`
  font-size: 12px;
  color: #a7a7a7;
  position: absolute;
  right: -5px;
  bottom: -5px;
  z-index: 10;
  margin: 12px;
`;

interface PostCommentPopUpProps {
  postId: string;
  showPopUp: boolean;
  onSetShowPopUp: (value: boolean) => void;
  onSetShowCommentMessage: (value: boolean) => void;
}

const PostCommentPopUp = (props: PostCommentPopUpProps) => {
  const { postId, showPopUp, onSetShowPopUp, onSetShowCommentMessage } = props;
  const theme = useTheme();

  const [comment, setComment] = useState<string>("");
  const [noComment, setNoComment] = useState<boolean>(false);

  //댓글 입력
  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length > 100) {
      e.target.value = e.target.value.substring(0, 100);
    }
    setComment(e.target.value);
  };

  const { mutate: addComment } = useCommentMutation();

  //확인 버튼 누를 시
  const handleConfirmComment = () => {
    if (!comment.trim()) {
      setNoComment(true);
      setTimeout(() => {
        setNoComment(false);
      }, 2000);
      return;
    }
    addComment({ postId: postId, contents: comment });
    onSetShowCommentMessage(true);
    onSetShowPopUp(!showPopUp);
    setTimeout(() => {
      onSetShowCommentMessage(false);
    }, 2000);
  };

  return (
    <>
      <PopUpContainer
        style={{
          boxShadow: theme.mode == "lightMode" ? "0px 0px 6px #dfdfdf" : "none",
        }}
      >
        <PopUpTitle>댓글 입력</PopUpTitle>
        <PopUpTextAreaContainer>
          <PopUpTextArea
            placeholder='댓글을 입력해주세요.'
            value={comment}
            onChange={handleCommentChange}
            maxLength={100}
          />
          <CommentText>{comment.length}/100</CommentText>
        </PopUpTextAreaContainer>
        <PopUpButtonContainer>
          <PopUpCancelButton onClick={() => onSetShowPopUp(!showPopUp)}>
            취소
          </PopUpCancelButton>
          <PopUpConfirmButton onClick={handleConfirmComment}>
            확인
          </PopUpConfirmButton>
        </PopUpButtonContainer>
      </PopUpContainer>
      {noComment && <AlertPopUp error={true}>댓글을 입력해주세요.</AlertPopUp>}
    </>
  );
};

export default PostCommentPopUp;
