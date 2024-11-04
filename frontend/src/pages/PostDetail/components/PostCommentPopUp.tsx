import styled from "styled-components";
import { useState } from "react";
import AlertPopUp from "@/components/AlertPopUp/AlertPopUp";
import {
  useCommentMutation,
  useModifyCommentMutation,
} from "../hooks/usePostComment";

const PopUpContainer = styled.div`
  width: 480px;
  height: 290px;
  z-index: 10;
  position: fixed;
  display: flex;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  background-color: ${({ theme }) => theme.colorCancelPopUp};
  border-radius: 20px;
  box-shadow: ${({ theme }) =>
    theme.mode === "lightMode" ? "0px 0px 6px #dfdfdf" : "none"};
`;

const PopUpTitle = styled.p`
  font-size: 16px;
  margin: 14px 0;
`;

const PopUpButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const Button = styled.button`
  width: 135px;
  height: 35px;
  border-radius: 30px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  margin: 14px 7px;
`;
const PopUpCancelButton = styled(Button)`
  background-color: ${({ theme }) => theme.colorCancelPopUp};
  color: ${({ theme }) => theme.colorCancelPopUPBtnFont};
  border: 1px solid ${({ theme }) => theme.colorCancelPopUPBtnFont};
`;
const PopUpConfirmButton = styled(Button)`
  background-color: ${({ theme }) => theme.colorMain};
  color: #ffffff;
  border: none;
`;


const PopUpTextAreaContainer = styled.div`
  width: 400px;
  height: 130px;
  position: relative;
`;

const PopUpTextArea = styled.textarea`
  width: 400px;
  height: 130px;
  border-radius: 10px;
  padding: 10px;
  font-size: 14px;
  line-height: 21px;
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
  right: 0;
  bottom: 0;
  z-index: 10;
  margin: 12px;
`;

interface PostCommentPopUpProps {
  postId: string;
  contents?: string;
  commentId?: string;
  showPopUp: boolean;
  onSetShowPopUp: (value: boolean) => void;
  onSetShowCommentMessage: (value: boolean) => void;
}

const PostCommentPopUp = (props: PostCommentPopUpProps) => {
  const {
    postId,
    contents,
    commentId,
    showPopUp,
    onSetShowPopUp,
    onSetShowCommentMessage,
  } = props;
  const [comment, setComment] = useState<string>(contents || "");
  const [noComment, setNoComment] = useState<boolean>(false);

  //댓글 입력
  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length > 100) {
      e.target.value = e.target.value.substring(0, 100);
    }
    setComment(e.target.value);
  };

  const { mutate: addComment } = useCommentMutation();
  const { mutate: modifyComment } = useModifyCommentMutation();

  //확인 버튼 누를 시
  const handleConfirmComment = () => {
    if (!comment.trim()) {
      setNoComment(true);
      setTimeout(() => {
        setNoComment(false);
      }, 2000);
      return;
    }

    commentId
      ? modifyComment({ commentId: commentId, contents: comment })
      : addComment({ postId: postId, contents: comment });
    onSetShowCommentMessage(true);
    onSetShowPopUp(!showPopUp);
    setTimeout(() => {
      onSetShowCommentMessage(false);
    }, 2000);
  };

  return (
    <>
      <PopUpContainer>
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
