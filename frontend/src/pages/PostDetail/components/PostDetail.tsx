import WriteModifyBtn from "@assets/icons/write_modify_button.svg?react";
import GoToBackBtn from "@assets/icons/goToBack_button.svg?react";
import QuoteStartIcon from "@assets/icons/quote_start.svg?react";
import QuoteEndIcon from "@assets/icons/quote_end.svg?react";
import styled from "styled-components";
import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import PostDeletePopUp from "./PostDeletePopUp";
import useGetLoggedInUser from "../hooks/useGetLoggedInUser";
import useGetPostInfo from "../hooks/useGetPostInfo";
import { useTheme } from "styled-components";

const DetailContainer = styled.div`
  width: 760px;
  position: relative;
`;
const GotoBackButton = styled.button`
  border: none;
  background: none;
  position: absolute;
  font-size: 30px;
  left: -80px;
  top: 25px;
  &:hover {
    cursor: pointer;
  }
`;

const TopContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  padding-top: 15px;
`;

const Category = styled.p`
  font-size: 16px;
  font-weight: bold;
  line-height: 25px;
  margin-top: 16px;
  margin-bottom: 0px;
  color: #a7a7a7;
`;

const ModifyBtn = styled.button`
  position: absolute;
  right: 0;
  height: 20px;
  border: none;
  padding: 0px;
  background: none;
  font-size: 20px;
  color: ${({ theme }) => theme.colorMainFont};
  margin: 14px 14px 6px 14px;
  &:hover {
    cursor: pointer;
  }
`;

const ModifyMenu = styled.ul`
  position: absolute;
  width: 70px;
  height: 82px;
  right: 0px;
  top: 55px;
  background-color: ${({ theme }) => theme.colorCategoryList};
  list-style: none;
  margin: 0px;
  padding: 0px;
  border-radius: 10px;
  box-shadow: 0px 0px 6px #dfdfdf;
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

const AuthorProfile = styled.div`
  display: flex;
  align-items: center;
  margin: 8px 0px;
`;

const AuthorProfileImg = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 90px;
  margin-right: 8px;
`;
const AuthorName = styled.p`
  font-size: 14px;
  font-weight: bold;
  line-height: 25px;
  margin: 0px;
  height: 20px;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.p`
  font-size: 26px;
  padding: 20px 0px;
  margin: 0;
`;

const CreatedAt = styled.span`
  font-size: 10px;
  line-height: 25px;
  color: #a7a7a7;
  text-align: end;
  height: 20px;
`;

const QuoteContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30px 0px 40px 0px;
  border-top: 1px solid #797979;
`;
const Quote = styled.p`
  font-size: 18px;
  line-height: 30px;
  margin: 18px 30px;
  max-width: 450px;
  white-space: pre-wrap;
`;
const Content = styled.p`
  font-size: 18px;
  font-weight: bold;
  line-height: 30px;
  margin: 0;
  padding: 16px 0px 50px 0px;
  white-space: pre-wrap;
  border-bottom: 1px solid #797979;
`;

const PostDetail = () => {
  const theme = useTheme();
  // 현재 로그인한 유저 정보 가져오기
  const { loggedInUser } = useGetLoggedInUser();

  // 포스트 정보 가져오기
  const { postId } = useParams() as { postId: string };
  const { postInfo } = useGetPostInfo(postId);

  // 현재 로그인한 사용자가 작성자인지 확인
  const isAuthor =
    loggedInUser && postInfo && loggedInUser?.id === postInfo?.authorId?._id;

  const [showList, setShowList] = useState(false);
  const location = useLocation();

  const navigate = useNavigate();
  const [showPopUp, setShowPopUp] = useState(false);

  // 뒤로가기
  const handleGoToBack = () => {
    if (location.state.from === "main") {
      return navigate("/");
    }
    if (location.state.from === "myPage") {
      return navigate("/mypage");
    }
    if (location.state.from === "userPage") {
      return navigate(`/user-page/${location.state.user}`);
    }
  };

  // 포스트 삭제 확인 팝업
  const handlePostDeletePopUp = () => {
    setShowPopUp(true);
  };

  // 프로필 누르면 해당 유저 프로필로 이동
  const noUser = !postInfo?.authorId?._id;

  const handleProfileClick = () => {
    if (noUser) {
      return;
    }
    if (postInfo?.authorId?._id === loggedInUser?.id) {
      navigate("/mypage");
    } else {
      navigate(`/user-page/${postInfo?.authorId._id}`);
    }
  };

  return (
    <DetailContainer>
      <GotoBackButton onClick={handleGoToBack}>
        <GoToBackBtn />
      </GotoBackButton>
      <TopContainer>
        {isAuthor && (
          <ModifyBtn
            onClick={() => {
              setShowList(!showList);
            }}
          >
            <WriteModifyBtn />
          </ModifyBtn>
        )}
        {showList && (
          <ModifyMenu
            style={{
              boxShadow:
                theme.mode == "lightMode" ? "0px 0px 6px #dfdfdf" : "none",
            }}
          >
            <ModifyItem
              onClick={() =>
                navigate(`/post/${postId}/modify`, {
                  state: { from: location.state.from },
                })
              }
            >
              수정
            </ModifyItem>
            <ModifyItem onClick={handlePostDeletePopUp}>삭제</ModifyItem>
          </ModifyMenu>
        )}
        <Category>{postInfo?.category}</Category>
        <Title>{postInfo?.title}</Title>
      </TopContainer>
      <AuthorProfile>
        <AuthorProfileImg
          src={
            postInfo?.authorId?.profileImage ||
            "https://img1.daumcdn.net/thumb/R1280x0/?fname=http://t1.daumcdn.net/brunch/service/user/7r5X/image/9djEiPBPMLu_IvCYyvRPwmZkM1g.jpg"
          }
          alt='작성자 프로필사진'
          onClick={handleProfileClick}
        />
        <div>
          <AuthorName>
            {postInfo?.authorId?.nickname || "탈퇴한 회원"}
          </AuthorName>
          <CreatedAt>{postInfo?.createdAt.slice(0, 10)}</CreatedAt>
        </div>
      </AuthorProfile>
      <ContentContainer>
        <QuoteContainer>
          <QuoteStartIcon />
          <Quote>{postInfo?.quote}</Quote>
          <QuoteEndIcon />
        </QuoteContainer>
        <Content>{postInfo?.content}</Content>
      </ContentContainer>
      {showPopUp && (
        <PostDeletePopUp
          showPopUp={showPopUp}
          setShowPopUp={setShowPopUp}
          postId={postId}
          form={location.state.from}
        />
      )}
    </DetailContainer>
  );
};

export default PostDetail;
