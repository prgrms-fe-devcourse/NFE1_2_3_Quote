import styled from "styled-components";
import { useGetComment } from "../hooks/usePostComment";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUserData } from "@/pages/MainPage/apis/userApi";
import Comment from "./Comment";
import PostCommentPopUp from "./PostCommentPopUp";
import AlertPopUp from "@/components/AlertPopUp/AlertPopUp";
import BookMarkBeforeBtn from "@assets/icons/bookMark_before_select.svg?react";
import BookMarkAfterBtn from "@assets/icons/bookMark_after_select.svg?react";
import useGetPostInfo from "../hooks/useGetPostInfo";
import useBookmark from "../hooks/useBookmark";

// Styled Components

const CommentContainer = styled.div`
  width: 760px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* gap: 10px; */
  margin: 30px 0;
`;

const CommentSection = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
`;

const CommentCount = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;

  & > span {
    font-weight: bold;
    color: ${({ theme }) => theme.colorButton};
  }
`;

const ButtonContainer = styled.div`
  width: auto;
  display: flex;
  gap: 10px;
`;

const CommentButton = styled.button`
  width: 96px;
  height: 35px;
  /* border-radius: 10px; */
  background: none;
  background-color: ${({ theme }) =>
    theme.mode === "lightMode" ? theme.colorMain : "#3b3b3b"};
  border: none;
  padding: 5px 10px;
  font-size: 14px;
  color: #f3f3f3;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  cursor: pointer;

  &:hover {
    transition: 0.1s linear;
    background-color: ${({ theme }) =>
      theme.mode === "lightMode" ? "#675959" : "#797979"};
    color: ${({ theme }) =>
      theme.mode === "lightMode" ? "#F3F3F3" : "#f3f3f3"};
  }

  svg {
    width: 16px;
    height: 16px;
  }
`;

const NoCommentText = styled.p`
  margin: 50px auto;
  font-size: 15px;
  color: ${({ theme }) => theme.colorSubFont};
`;

const PostComment = () => {
  const [showPopUp, setShowPopUp] = useState<boolean>(false);
  const [showCommentMessage, setShowCommentMessage] = useState<boolean>(false);
  const [showDeleteMessage, setShowDeleteMessage] = useState<boolean>(false);

  const [userId, setUserId] = useState<string>("");
  const { postId } = useParams() as { postId: string };
  const { postInfo } = useGetPostInfo(postId);
  const { data: commentData, isError } = useGetComment(postId);

  // 현재 유저 id 확인
  useEffect(() => {
    const getUserId = async () => {
      const user = await getUserData();
      setUserId(user.id);
    };
    getUserId();
  }, []);

  //댓글 작성 팝업
  const handleCommentPopUp = () => {
    setShowPopUp(true);
  };

  //북마크
  const { mutate } = useBookmark();
  const isActive =
    userId &&
    postInfo &&
    postInfo?.bookMarked.some((item) => item.userId === userId);

  const handleBookMarked = () => {
    mutate(postId);
  };

  const noComment = commentData?.length === 0;

  return (
    <>
      <CommentContainer>
        {showPopUp && (
          <PostCommentPopUp
            postId={postId}
            showPopUp={showPopUp}
            onSetShowPopUp={setShowPopUp}
            onSetShowCommentMessage={setShowCommentMessage}
          />
        )}
        <CommentSection>
          <CommentCount>
            댓글 <span>{commentData?.length}</span>
          </CommentCount>
          <ButtonContainer>
            <CommentButton onClick={handleBookMarked}>
              {isActive ? <BookMarkAfterBtn /> : <BookMarkBeforeBtn />}
              <p>{postInfo?.bookMarked.length}</p>
            </CommentButton>
            <CommentButton onClick={handleCommentPopUp}>
              댓글 작성
            </CommentButton>
          </ButtonContainer>
        </CommentSection>

        {isError && <NoCommentText>Error</NoCommentText>}
        {noComment ? (
          <NoCommentText>댓글이 없습니다.</NoCommentText>
        ) : (
          commentData?.map((comment) => (
            <Comment
              isUser={userId === comment.authorId._id}
              key={comment._id}
              comment={comment}
              onSetShowDeleteMessage={setShowDeleteMessage}
            />
          ))
        )}
      </CommentContainer>
      {showCommentMessage && <AlertPopUp>댓글이 작성되었습니다.</AlertPopUp>}
      {showDeleteMessage && <AlertPopUp>댓글이 삭제되었습니다.</AlertPopUp>}
    </>
  );
};

export default PostComment;
