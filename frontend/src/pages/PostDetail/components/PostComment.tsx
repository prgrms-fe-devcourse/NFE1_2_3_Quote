import styled from "styled-components";
import { useGetComment } from "../hooks/usePostComment";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Comment from "./Comment";
import PostCommentPopUp from "./PostCommentPopUp";
import AlertPopUp from "@/components/AlertPopUp/AlertPopUp";
import { getUserData } from "@/pages/MainPage/apis/userApi";

// Styled Components

const CommentContainer = styled.div`
  width: 760px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
`;

const CommentSection = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const CommentCount = styled.div`
  text-align: center;
  line-height: 26px;

  & > span {
    font-weight: bold;
    color: ${({ theme }) => theme.colorButton};
  }
`;

const CommentButton = styled.button`
  background: none;
  border: 1px solid ${({ theme }) => theme.colorMainFont};
  border-radius: 20px;
  font-weight: bold;
  padding: 5px 10px;
  color: ${({ theme }) => theme.colorMainFont};
  cursor: pointer;
`;

const NoCommentText = styled.p`
  margin: 20px auto;
  font-size: 18px;
`;

const PostComment = () => {
  const [showPopUp, setShowPopUp] = useState(false);
  const [showCommentMessage, setShowCommentMessage] = useState(false);
  const [showDeleteMessage, setShowDeleteMessage] = useState(false);

  const [userId, setUserId] = useState<string>("");
  const { postId } = useParams() as { postId: string };
  const { data, isLoading, isError } = useGetComment(postId);
  const commentData = data || [];

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
            댓글 <span>{commentData.length}</span>
          </CommentCount>
          <CommentButton onClick={handleCommentPopUp}>댓글 쓰기</CommentButton>
        </CommentSection>

        {isLoading ? (
          <NoCommentText>Loading ...</NoCommentText>
        ) : isError ? (
          <NoCommentText>Error</NoCommentText>
        ) : commentData?.length > 0 ? (
          commentData.map((comment) => (
            <Comment
              isUser={userId === comment.authorId._id}
              key={comment._id}
              comment={comment}
              onSetShowDeleteMessage={setShowDeleteMessage}
            />
          ))
        ) : (
          <NoCommentText>댓글이 없습니다.</NoCommentText>
        )}
        {}
      </CommentContainer>
      {showCommentMessage && <AlertPopUp>댓글이 작성되었습니다.</AlertPopUp>}
      {showDeleteMessage && <AlertPopUp>댓글이 삭제되었습니다.</AlertPopUp>}
    </>
  );
};

export default PostComment;
