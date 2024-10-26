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
`;

const PostContentContainer = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: calc(300px - 50px);
  color: ${(props) => props.color};
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

  &:hover {
    text-decoration: underline;
  }
`;

interface PostCardProps {
  post: Post;
  userId: string;
  isLogin: boolean;
  onClick: () => void;
}

const PostCard = (props: PostCardProps) => {
  const { post, userId, isLogin, onClick } = props;

  const [bookmark, setBookmark] = useState<boolean>(false);
  const [bookmarkCount, setBookmarkCount] = useState<number>(
    post.bookMarked.length,
  );

  useEffect(() => {
    if (userId === "none") {
      return;
    }
    const isBookmark = post.bookMarked
      .map((user) => user.userId)
      .includes(userId);
    setBookmark(isBookmark);
  }, [post.bookMarked]);

  const handleCheckBookmark = useCallback(() => {
    if (!isLogin) {
      navigate("/login");
      return;
    }
    postBookmark(post._id);
    setBookmark(!bookmark);
    if (bookmark) {
      setBookmarkCount((prev) => prev - 1);
    } else {
      setBookmarkCount((prev) => prev + 1);
    }
  }, [bookmark]);

  const navigate = useNavigate();
  const handleSelectAuthor = useCallback(() => {
    if (!isLogin) {
      navigate("/login");
      return;
    }
    navigate(`/user-page/${post.authorId}`);
  }, []);

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
