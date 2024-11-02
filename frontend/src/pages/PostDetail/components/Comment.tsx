import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import { useDeleteCommentMutation } from "../hooks/usePostComment";
import { Comment as CommentType } from "@/types/Types";
import { useNavigate } from "react-router-dom";
import formatTime from "@/utils/formatTime";
import ModifyButton from "@assets/icons/write_modify_button.svg?react";
import PostCommentPopUp from "./PostCommentPopUp";
import AlertPopUp from "@/components/AlertPopUp/AlertPopUp";

// Styled Components

const StyledComment = styled.div`
  width: 760px;
  display: flex;
  /* padding-bottom: 20px; */
  border-bottom: 0.7px solid #797979;
  padding: 20px 5px 25px 5px;
  position: relative;
`;

const ImgBox = styled.div`
  flex: 1;
`;
const Profile = styled.img`
  width: 45px;
  height: 45px;
  border-radius: 90px;
  cursor: pointer;
`;

const TextContainer = styled.div`
  flex: 16;
  margin: 10px 0 0 15px;
  white-space: pre-wrap;
  display: flex;
  flex-direction: column;
`;
const UserName = styled.p`
  width: auto;
  display: inline-block;
  font-size: 14px;
  font-weight: bold;
  margin: 0;
  cursor: pointer;
`;
const DateContainer = styled.span`
  font-size: 12px;
  margin: 5px 0 15px 0;
  color: ${({ theme }) => theme.colorSubFont};
`;
const Contents = styled.p`
  font-size: 14px;
  margin: 0;
  line-height: 23.8px;
  overflow-wrap: break-word;
  word-break: break-word;
`;

const RightContainer = styled.div`
  position: absolute;
  top: 10px;
  right: 0;
`;

const ModifyButtonContainer = styled.div`
  position: relative;
  width: 30px;
  height: 30px;
  cursor: pointer;
  text-align: end;
  font-size: 18px;
  z-index: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModifyMenu = styled.ul`
  position: absolute;
  width: 70px;
  height: 82px;
  right: 5px;
  top: 35px;
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

// Comment

interface CommentProps {
  isUser: boolean;
  comment: CommentType;
  onSetShowDeleteMessage: (value: boolean) => void;
}

const Comment = (props: CommentProps) => {
  const { isUser, comment, onSetShowDeleteMessage } = props;
  const [showList, setShowList] = useState<boolean>(false);
  const [showPopUp, setShowPopUp] = useState<boolean>(false);
  const [showCommentMessage, setShowCommentMessage] = useState<boolean>(false);
  const noUser: boolean = !comment.authorId;

  const { mutate: deleteComment } = useDeleteCommentMutation();

  // 댓글 작성자 페이지 이동
  const navigate = useNavigate();
  const handleUserPage = () => {
    if (noUser) {
      return;
    }
    if (isUser) {
      navigate(`/mypage`);
      return;
    }
    navigate(`/user-page/${comment.authorId._id}`);
  };

  // 수정 및 삭제 메뉴
  const handleModifyList = () => {
    setShowList((prev) => !prev);
  };

  const listRef = useRef<HTMLDivElement | null>(null);
  const menuRef = useRef<HTMLUListElement | null>(null);
  useEffect(() => {
    const handleOutsideClose = (e: { target: any }) => {
      if (
        showList &&
        listRef.current &&
        !listRef.current.contains(e.target as Node) &&
        menuRef.current &&
        !menuRef.current.contains(e.target as Node)
      ) {
        setShowList(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClose);

    return () => document.removeEventListener("mousedown", handleOutsideClose);
  }, [showList]);

  // 댓글 수정 팝업
  const handleModifyComment = () => {
    setShowList(false);
    setShowPopUp(true);
  };

  // 댓글 삭제
  const handleDeleteComment = () => {
    setShowList(false);
    onSetShowDeleteMessage(true);
    deleteComment({ commentId: comment._id });
    setTimeout(() => {
      onSetShowDeleteMessage(false);
    }, 2000);
  };

  return (
    <>
      <StyledComment>
        <ImgBox>
          <Profile
            src={
              comment.authorId.profileImage ||
              "https://img1.daumcdn.net/thumb/R1280x0/?fname=http://t1.daumcdn.net/brunch/service/user/7r5X/image/9djEiPBPMLu_IvCYyvRPwmZkM1g.jpg"
            }
            onClick={handleUserPage}
          />
        </ImgBox>

        <TextContainer>
          <UserName onClick={handleUserPage}>
            {comment.authorId.nickname || "탈퇴한 회원"}
          </UserName>
          <DateContainer>{formatTime(comment.createdAt)}</DateContainer>
          <Contents>{comment.contents}</Contents>
        </TextContainer>
        <RightContainer>
          {isUser ? (
            <ModifyButtonContainer
              ref={listRef}
              onClick={handleModifyList}
            >
              <ModifyButton />
            </ModifyButtonContainer>
          ) : (
            <div style={{ width: "24px" }} />
          )}
        </RightContainer>
        {showList && (
          <ModifyMenu ref={menuRef}>
            <ModifyItem onClick={handleModifyComment}>수정</ModifyItem>
            <ModifyItem onClick={handleDeleteComment}>삭제</ModifyItem>
          </ModifyMenu>
        )}
      </StyledComment>
      {showPopUp && (
        <PostCommentPopUp
          postId={comment.postId}
          contents={comment.contents}
          commentId={comment._id}
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
