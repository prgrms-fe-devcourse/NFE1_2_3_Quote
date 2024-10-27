import styled from "styled-components";
import BookMarkBefore from "@assets/icons/bookMark_before_select.svg?react";
import BookMarkAfter from "@assets/icons/bookMark_after_select.svg?react";
import { Post } from "@/types/Types";
import { categoryColors } from "@/styles/Colors";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { postBookmark } from "../apis/bookmarkApi";

const PostCardContainer = styled.div`
  width: 190px;
  height: 210px;
  margin: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 20px;
  overflow: hidden;
  background-color: ${(props) => props.color};
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.25);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-3px) scale(1.03);
    box-shadow: 0 12px 16px rgba(0, 0, 0, 0.3);
  }
`;

const PostContentContainer = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: calc(300px - 50px);
  color: ${(props) => props.color};
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
  background-color: #ffffff;
  font-size: 10px;
`;

const BookMark = styled.div`
  width: auto;
  display: flex;
  align-items: center;
  svg {
    width: 16px;
    height: 16px;
    cursor: pointer;
  }
`;

const UserText = styled.p`
  width: 8rem;
  display: flex;
  justify-content: end;
  align-items: center;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

interface PostCardProps {
  post: Post;
  userId: string;
  onClick: () => void;
  onAddBookmark?: (post: Post) => void;
  onRemoveBookmark?: (postId: string) => void;
}

const PostCard = ({
  post,
  userId,
  onClick,
  onRemoveBookmark,
  onAddBookmark,
}: PostCardProps) => {
  const [bookmark, setBookmark] = useState<boolean>(false);
  const [bookmarkCount, setBookmarkCount] = useState<number>(
    post.bookMarked?.length || 0,
  );

  useEffect(() => {
    if (post.bookMarked) {
      const isBookmark = post.bookMarked.some((user) => user.userId === userId);
      setBookmark(isBookmark);
    }
  }, [post.bookMarked, userId]);

  const handleCheckBookmark = useCallback(async () => {
    try {
      await postBookmark(post._id);

      setBookmark((prev) => !prev);
      setBookmarkCount((prev) => (bookmark ? prev - 1 : prev + 1));

      if (bookmark) {
        onRemoveBookmark?.(post._id);
      } else {
        onAddBookmark?.(post);
      }
    } catch (error) {
      console.error("Bookmark error:", error);
    }
  }, [bookmark, post._id, onRemoveBookmark, onAddBookmark]);

  const navigate = useNavigate();
  const handleSelectAuthor = useCallback(() => {
    if (post.authorId._id === userId) {
      navigate("/mypage");
    } else {
      navigate(`/user-page/${post.authorId._id}`);
    }
  }, [navigate, post.authorId._id, userId]);

  return (
    <>
      <PostCardContainer color={categoryColors[post.category].bgColor}>
        <PostContentContainer
          color={categoryColors[post.category].fontColor}
          onClick={onClick}
        >
          <PostContent>{post.quote}</PostContent>
          <PostTitle>{post.title}</PostTitle>
        </PostContentContainer>
        <BottomContainer>
          <BookMark onClick={handleCheckBookmark}>
            {bookmark ? <BookMarkAfter /> : <BookMarkBefore />}
            {bookmarkCount}
          </BookMark>
          <UserText onClick={handleSelectAuthor}>
            {post.authorId.nickname}
          </UserText>
        </BottomContainer>
      </PostCardContainer>
    </>
  );
};

export default PostCard;
