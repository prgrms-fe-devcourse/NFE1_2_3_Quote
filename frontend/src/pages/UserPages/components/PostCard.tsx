import styled from "styled-components";
import BookMarkBefore from "@assets/icons/bookMark_before_select.svg?react";
import BookMarkAfter from "@assets/icons/bookMark_after_select.svg?react";
import { Post } from "@/types/Types";
import { useBookmark } from "../hooks/useBookmark";

interface PostCardContainerProps {
  $category: string;
}

const PostCardContainer = styled.div<PostCardContainerProps>`
  width: 190px;
  height: 210px;
  margin: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 20px;
  overflow: hidden;
  background-color: ${({ theme, $category }) => theme[$category].bgColor};
  box-shadow: 0 0 8px ${({ theme }) => theme.colorLine};
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
  -webkit-line-clamp: 4;
  font-size: 12px;
  white-space: pre-wrap;
  overflow: hidden;
  margin: 0;
  line-height: 24px;
`;

const PostTitle = styled.p`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  font-size: 10px;
  font-weight: bold;
  margin: 0;
  overflow: hidden;
`;

const BottomContainer = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-between;
  padding: 0 1rem;
  background-color: ${({ theme }) => theme.colorSub};
  font-size: 10px;
`;

const BookMark = styled.div`
  width: auto;
  display: flex;
  align-items: center;
  svg {
    color: ${({ theme }) => theme.colorFont};
    width: 16px;
    height: 16px;
    cursor: pointer;
    margin-right: 5px;
  }
`;

const UserText = styled.p`
  width: 8rem;
  display: flex;
  justify-content: end;
  align-items: center;
`;

interface PostCardProps {
  post: Post;
  userId: string;
  isBookmarked: boolean;
  onClick: () => void;
  onAddBookmark: (post: Post) => void;
  onRemoveBookmark: (postId: string) => void;
}

const PostCard = ({
  post,
  isBookmarked: initialIsBookmarked,
  onClick,
  onAddBookmark,
  onRemoveBookmark,
}: PostCardProps) => {
  const { bookmarkCount, toggleBookmark, isBookmarked } = useBookmark({
    post,
    isBookmarked: initialIsBookmarked,
    onAddBookmark,
    onRemoveBookmark,
  });

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
          <BookMark onClick={toggleBookmark}>
            {isBookmarked ? <BookMarkAfter /> : <BookMarkBefore />}
            {bookmarkCount}
          </BookMark>
          <UserText>{post.authorId?.nickname}</UserText>
        </BottomContainer>
      </PostCardContainer>
    </>
  );
};

export default PostCard;
