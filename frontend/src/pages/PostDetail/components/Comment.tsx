import styled from "styled-components";
import ModifyButton from "@assets/icons/write_modify_button.svg?react";
import { useState } from "react";
import PostCommentPopUp from "./PostCommentPopUp";
import AlertPopUp from "@/components/AlertPopUp/AlertPopUp";
import { useDeleteCommentMutation } from "../hooks/usePostComment";

const StyledComment = styled.div`
  width: 760px;
  display: flex;
  margin: 10px;
  padding-bottom: 20px;
  border-bottom: 1px solid ${({ theme }) => theme.colorLine};
  position: relative;
`;

const ProfileContainer = styled.div`
  margin: 5px;
`;

const Profile = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 90px;
`;

const TextContainer = styled.div`
  width: 80%;
  padding: 5px;
  white-space: pre-wrap;
`;

const UserName = styled.p`
  font-size: 14px;
  margin: 5px 0 10px 0;
`;

const Contents = styled.p`
  font-size: 16px;
  margin: 0;
  line-height: 20px;
`;

const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 5px;
  margin-left: auto;
  align-items: flex-end;
  justify-content: space-between;

  svg {
    cursor: pointer;
  }
`;

const DateContainer = styled.p`
  font-size: 12px;
  margin: 0;
`;

const ModifyMenu = styled.ul`
  position: absolute;
  width: 70px;
  height: 82px;
  right: 0px;
  top: 30px;
  background-color: ${({ theme }) => theme.colorCategoryList};
  list-style: none;
  margin: 0px;
  padding: 0px;
  border-radius: 10px;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.25);
  overflow: hidden;
`;
const ModifyItem = styled.li`
  width: 100%;
  font-size: 12px;
  text-align: center;
  line-height: 25px;
  padding: 8px;

  &:last-child {
    border-top: 1px solid #e3e3e3;
  }
  &:hover {
    background-color: ${({ theme }) => theme.colorCategoryListHover};
    cursor: pointer;
  }
`;

interface CommentProps {
  isUser: boolean;
  postId: string;
  commentId: string;
  author: { [key: string]: string };
  contents: string;
  createdAt: string;
  onSetShowDeleteMessage: (value: boolean) => void;
}

const Comment = (props: CommentProps) => {
  const {
    isUser,
    postId,
    commentId,
    author,
    contents,
    createdAt,
    onSetShowDeleteMessage,
  } = props;
  const [showList, setShowList] = useState(false);
  const [showPopUp, setShowPopUp] = useState(false);
  const [showCommentMessage, setShowCommentMessage] = useState(false);

  const { mutate: deleteComment } = useDeleteCommentMutation();

  const handleModifyList = () => {
    setShowList(!showList);
  };

  const handleModifyComment = () => {
    setShowList(!showList);
    setShowPopUp(true);
  };

  const handleDeleteComment = () => {
    setShowList(!showList);
    onSetShowDeleteMessage(true);
    deleteComment({ commentId: commentId });
    setTimeout(() => {
      onSetShowDeleteMessage(false);
    }, 2000);
  };

  return (
    <>
      <StyledComment>
        <ProfileContainer>
          <Profile
            src={
              author.profileImage ||
              "https://img1.daumcdn.net/thumb/R1280x0/?fname=http://t1.daumcdn.net/brunch/service/user/7r5X/image/9djEiPBPMLu_IvCYyvRPwmZkM1g.jpg"
            }
          />
        </ProfileContainer>
        <TextContainer>
          <UserName>{author.nickname || "탈퇴한 회원"}</UserName>
          <Contents>{contents}</Contents>
        </TextContainer>
        <RightContainer>
          {isUser ? (
            <ModifyButton onClick={handleModifyList} />
          ) : (
            <div style={{ width: "24px" }} />
          )}

          <DateContainer>{createdAt.slice(0, 10)}</DateContainer>
        </RightContainer>
        {showList && (
          <ModifyMenu>
            <ModifyItem onClick={handleModifyComment}>수정</ModifyItem>
            <ModifyItem onClick={handleDeleteComment}>삭제</ModifyItem>
          </ModifyMenu>
        )}
      </StyledComment>
      {showPopUp && (
        <PostCommentPopUp
          postId={postId}
          contents={contents}
          commentId={commentId}
          showPopUp={showPopUp}
          onSetShowPopUp={setShowPopUp}
          onSetShowCommentMessage={setShowCommentMessage}
        />
      )}
      {showCommentMessage && <AlertPopUp>댓글이 수정되었습니다.</AlertPopUp>}
    </>
  );
};

export default Comment;
