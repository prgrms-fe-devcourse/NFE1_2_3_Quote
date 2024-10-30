import styled from "styled-components";

const StyledComment = styled.div`
  width: 760px;
  display: flex;
  margin: 10px;
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

const DateContainer = styled.p`
  font-size: 12px;
  margin: 5px;
  margin-left: auto;
  display: flex;
  align-items: end;
`;

interface CommentProps {
  author: string;
  contents: string;
  createdAt: string;
}

const Comment = (props: CommentProps) => {
  const { author, contents, createdAt } = props;
  return (
    <StyledComment>
      <ProfileContainer>
        <Profile src='https://img1.daumcdn.net/thumb/R1280x0/?fname=http://t1.daumcdn.net/brunch/service/user/7r5X/image/9djEiPBPMLu_IvCYyvRPwmZkM1g.jpg' />
      </ProfileContainer>
      <TextContainer>
        <UserName>{author}</UserName>
        <Contents>{contents}</Contents>
      </TextContainer>
      <DateContainer>{createdAt.slice(0, 10)}</DateContainer>
    </StyledComment>
  );
};

export default Comment;
