import styled from "styled-components";
import { Post } from "@/types/Types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBookmarkMutation } from "../hooks/useBookmarkMutation";
import BookMarkBefore from "@assets/icons/bookMark_before_select.svg?react";
import BookMarkAfter from "@assets/icons/bookMark_after_select.svg?react";

// Styled Components

interface PostCardContainerProps {
  $category: string;
}

const PostCardContainer = styled.div<PostCardContainerProps>`
  width: 270px;
  height: 300px;
  margin: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 20px;
  overflow: hidden;
  background-color: ${({ theme, $category }) => theme[$category].bgColor};
  color: ${({ theme, $category }) => theme[$category].fontColor};
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.25);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-3px) scale(1.03);
    box-shadow: 0 8px 12px ${({ theme }) => theme.colorShadow};
  }
`;

const PostContentContainer = styled.div<PostCardContainerProps>`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: calc(300px - 50px);
  cursor: pointer;
`;

const PostContent = styled.p`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 7;
  height: 80%;
  font-size: 16px;
  margin: 0;
  white-space: pre-wrap;
  overflow: hidden;
  line-height: 24px;
`;

const PostTitle = styled.p`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  font-size: 14px;
  font-weight: bold;
  margin: 0;
  overflow: hidden;
`;

const BottomContainer = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  padding: 0 1rem;
  background-color: ${({ theme }) => theme.colorSub};
  color: ${({ theme }) => theme.colorMainFont};
  font-size: 14px;
`;

const BookMark = styled.div`
  width: auto;
  display: flex;
  align-items: center;
  svg {
    color: ${({ theme }) => theme.colorFont};
    width: 18px;
    height: 18px;
    cursor: pointer;
    margin-right: 5px;
  }
`;

const UserText = styled.p<{ $noUser: boolean }>`
  width: auto;
  display: flex;
  justify-content: end;
  align-items: center;
  cursor: pointer;

  &:hover {
    //탈퇴한 회원이 아닐 때만 적용
    ${({ $noUser }) => !$noUser && "text-decoration: underline;"}
  }
`;

// PostCard

interface PostCardProps {
  post: Post;
  userId: string;
  isLogin: boolean;
  onClick: () => void;
}

const PostCard = (props: PostCardProps) => {
  const { post, userId, isLogin, onClick } = props;
  const navigate = useNavigate();

  //북마크 눌렀을 때
  const { mutate: addBookmark } = useBookmarkMutation(userId);
  const handleCheckBookmark = () => {
    if (!isLogin) {
      navigate("/login");
      return;
    }
    addBookmark(post._id);
  };

  //작성자 닉네임 눌렀을 때 페이지 이동
  const [noUser] = useState<boolean>(!post.authorId); //탈퇴한 회원
  const handleSelectAuthor = () => {
    if (!isLogin) {
      navigate("/login");
      return;
    }

    //탈퇴한 회원일 때
    if (noUser) {
      return;
    }

    navigate(`/user-page/${post.authorId._id}`);
  };

  return (
    <>
      <PostCardContainer $category={post.category}>
        <PostContentContainer
          $category={post.category}
          onClick={onClick}
        >
          <PostContent>{post.quote}</PostContent>
          <PostTitle>{post.title}</PostTitle>
        </PostContentContainer>
        <BottomContainer>
          <BookMark onClick={handleCheckBookmark}>
            {post.bookMarked.map((user) => user.userId).includes(userId) ? (
              <BookMarkAfter />
            ) : (
              <BookMarkBefore />
            )}
            {post.bookMarked.length}
          </BookMark>

          <UserText
            onClick={handleSelectAuthor}
            $noUser={noUser}
          >
            {post.authorId?.nickname || "탈퇴한 회원"}
          </UserText>
        </BottomContainer>
      </PostCardContainer>
    </>
  );
};

export default PostCard;
