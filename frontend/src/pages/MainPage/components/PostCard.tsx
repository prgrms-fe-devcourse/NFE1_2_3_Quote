import styled from "styled-components";
import BookMarkBefore from "@assets/icons/bookMark_before_select.svg?react";
import BookMarkAfter from "@assets/icons/bookMark_after_select.svg?react";
import { Post } from "@/types/Types";
import { categoryColors } from "@/styles/Colors";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { postBookmark } from "../apis/bookmarkApi";

const PostCardContainer = styled.div`
  width: 270px;
  height: 300px;
  margin: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 20px;
  overflow: hidden;
  background-color: ${(props) => props.color};
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.25);
  cursor: pointer;
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
  height: 80%;
  font-size: 16px;
  white-space: pre-wrap;
  margin: 0;
`;

const PostTitle = styled.p`
  font-size: 14px;
  margin: 0;
`;

const BottomContainer = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  padding: 0 1rem;
  background-color: #f9f9f9;
  font-size: 14px;
`;

const BookMark = styled.div`
  width: auto;
  display: flex;
  align-items: center;
  svg {
    width: 18px;
    height: 18px;
    cursor: pointer;
  }
`;

const UserText = styled.p`
  width: auto;
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
  onClick: () => void;
}

const PostCard = (props: PostCardProps) => {
  const { post, userId, onClick } = props;

  //북마크 표시
  const [bookmark, setBookmark] = useState<boolean>(false);
  const [bookmarkCount, setBookmarkCount] = useState<number>(
    post.bookMarked.length,
  );
  useEffect(() => {
    const isBookmark = post.bookMarked
      .map((user) => user.userId)
      .includes(userId);
    setBookmark(isBookmark);
  }, []);

  //북마크 눌렀을 때
  const handleCheckBookmark = useCallback(() => {
    postBookmark(post._id);
    setBookmark(!bookmark);
    if (bookmark) {
      setBookmarkCount((prev) => prev - 1);
    } else {
      setBookmarkCount((prev) => prev + 1);
    }
  }, [bookmark]);

  //작성자 닉네임 눌렀을 때 페이지 이동
  const navigate = useNavigate();
  const handleSelectAuthor = useCallback(() => {
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
          <UserText onClick={handleSelectAuthor}>{post.author}</UserText>
        </BottomContainer>
      </PostCardContainer>
    </>
  );
};

export default PostCard;
