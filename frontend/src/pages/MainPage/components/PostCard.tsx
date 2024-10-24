import styled from "styled-components";
import BookMarkIcon from "@assets/icons/bookMark_before_select.svg?react";
import { Post } from "@/types/Types";
import { categoryColors } from "@/styles/Colors";
import { useCallback, useState } from "react";

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
  width: 8rem;
  display: flex;
  justify-content: end;
  align-items: center;
`;

interface PostCardProps {
  post: Post;
  onClick: () => void;
}

const PostCard = (props: PostCardProps) => {
  const { post, onClick } = props;
  
  const handleCheckBookmark = useCallback(() => {

  }, [])

  const [bookmark, setBookmark] = useState<boolean>(false)

  
  return (
    <>
      <PostCardContainer
        color={categoryColors[post.category].bgColor}
        onClick={onClick}
      >
        <PostContentContainer color={categoryColors[post.category].fontColor}>
          <PostContent>{post.quote}</PostContent>
          <PostTitle>{post.title}</PostTitle>
        </PostContentContainer>
        <BottomContainer>
          <BookMark onClick={handleCheckBookmark}>
            <BookMarkIcon />
            {/* {post.likes} */}
          </BookMark>
          <UserText>{post.author}</UserText>
        </BottomContainer>
      </PostCardContainer>
    </>
  );
};

export default PostCard;
