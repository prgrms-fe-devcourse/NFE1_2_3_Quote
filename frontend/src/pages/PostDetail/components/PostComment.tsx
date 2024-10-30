import styled from "styled-components";
import { useGetComment } from "../hooks/useGetComment";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Comment from "./Comment";
import PostCommentPopUp from "./PostCommentPopUp";
import AlertPopUp from "@/components/AlertPopUp/AlertPopUp";
import { getUserData } from "@/pages/MainPage/apis/userApi";
import { useAuthStore } from "@/pages/LogInPage/store/authStore";

const CommentContainer = styled.div`
  width: 760px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
`;

const CommentButton = styled.button`
  align-self: flex-end;
  margin-bottom: 10px;
  background: none;
  border: none;
  font-weight: bold;
  padding: 0;
  color: ${({ theme }) => theme.colorMainFont};
  cursor: pointer;
`;

const NoCommentText = styled.p`
  margin: 20px auto;
  font-size: 18px;
`;

const PostComment = () => {
  const { data, isLoading, isError } = useGetComment();
  const [userId, setUserId] = useState<string>("");
  const { isLogin } = useAuthStore();
  const [showPopUp, setShowPopUp] = useState(false);
  const [showCommentMessage, setShowCommentMessage] = useState(false);
  const { postId } = useParams() as { postId: string };
  const commentData = data?.filter((comment) => comment.info === postId) || [];

  const handleCommentPopUp = () => {
    setShowPopUp(true);
  };

  const getUserId = async () => {
    const user = await getUserData();
    setUserId(user.id);
  };

  useEffect(() => {
    if (isLogin) {
      getUserId();
    } else {
      setUserId("none");
    }
  }, [isLogin]);

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
        <CommentButton onClick={handleCommentPopUp}>댓글 쓰기</CommentButton>
        {isLoading ? (
          <NoCommentText>Loading ...</NoCommentText>
        ) : isError ? (
          <NoCommentText>Error</NoCommentText>
        ) : commentData?.length > 0 ? (
          commentData.map((comment) => (
            <Comment
              isUser={userId === comment.author}
              postId = {comment.info}
              key={comment._id}
              author={comment.author}
              contents={comment.contents}
              createdAt={comment.createdAt}
            />
          ))
        ) : (
          <NoCommentText>댓글이 없습니다.</NoCommentText>
        )}
        {}
      </CommentContainer>
      {showCommentMessage && <AlertPopUp>댓글이 작성되었습니다.</AlertPopUp>}
    </>
  );
};

export default PostComment;
