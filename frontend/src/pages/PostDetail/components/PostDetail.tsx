import WriteModifyBtn from "@assets/icons/write_modify_button.svg?react";
import GoToBackBtn from "@assets/icons/goToBack_button.svg?react";
import BookMarkBeforeBtn from "@assets/icons/bookMark_before_select.svg?react";
import BookMarkAfterBtn from "@assets/icons/bookMark_after_select.svg?react";
import QuoteStartIcon from "@assets/icons/quote_start.svg?react";
import QuoteEndIcon from "@assets/icons/quote_end.svg?react";
import styled from "styled-components";
import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import PostDeletePopUp from "./PostDeletePopUp";
import useGetLoggedInUser from "../hooks/useGetLoggedInUser";
import useGetPostInfo from "../hooks/useGetPostInfo";
import useBookmark from "../hooks/useBookmark";
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
  justify-content: space-between;
  position: relative;
  padding-top: 15px;
`;

const Category = styled.p`
  font-size: 14px;
  font-weight: bold;
  line-height: 25px;
`;

const ModifyBtn = styled.button`
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
  flex-direction: column;
  align-items: center;
`;

const AuthorProfileImg = styled.img`
  width: 70px;
  height: 70px;
  border-radius: 90px;
`;
const AuthorName = styled.p`
  font-size: 16px;
  font-weight: bold;
  line-height: 25px;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.p`
  font-size: 26px;
  padding: 16px 8px;
  margin: 0;
  border-bottom: 1px solid #797979;
`;

const CreatedAt = styled.span`
  font-size: 12px;
  line-height: 25px;
  color: #a7a7a7;
  text-align: end;
  padding: 8px;
`;

const QuoteContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px 8px 50px 8px;
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
  padding: 16px 8px 50px 8px;
  white-space: pre-wrap;
  border-bottom: 1px solid #797979;
`;

const BookmarkContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 40px;
`;

const BookmarkBtn = styled.button`
  border: none;
  background: none;
  font-size: 25px;
  margin-top: 25px;
  color: ${({ theme }) => theme.colorMainFont};
`;
const BookmarkCount = styled.p`
  font-size: 14px;
  line-height: 25px;
  margin: -7px;
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

  // 북마크
  const { mutate } = useBookmark();

  const isActive =
    loggedInUser &&
    postInfo &&
    postInfo?.bookMarked.some((item) => item.userId === loggedInUser.id);

  const handleBookMarked = () => {
    mutate(postId);
  };

  return (
    <DetailContainer>
      <GotoBackButton onClick={handleGoToBack}>
        <GoToBackBtn />
      </GotoBackButton>
      <TopContainer>
        <Category>{postInfo?.category}</Category>
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
        <AuthorName>{postInfo?.authorId?.nickname || "탈퇴한 회원"}</AuthorName>
      </AuthorProfile>
      <ContentContainer>
        <Title>{postInfo?.title}</Title>
        <CreatedAt>{postInfo?.createdAt.slice(0, 10)}</CreatedAt>
        <QuoteContainer>
          <QuoteStartIcon />
          <Quote>{postInfo?.quote}</Quote>
          <QuoteEndIcon />
        </QuoteContainer>
        <Content>{postInfo?.content}</Content>
      </ContentContainer>
      <BookmarkContainer>
        <BookmarkBtn onClick={handleBookMarked}>
          {isActive ? <BookMarkAfterBtn /> : <BookMarkBeforeBtn />}
        </BookmarkBtn>
        <BookmarkCount>{postInfo?.bookMarked.length}</BookmarkCount>
      </BookmarkContainer>
      {showPopUp && (
        <PostDeletePopUp
          showPopUp={showPopUp}
          setShowPopUp={setShowPopUp}
          postId={postId}
        />
      )}
    </DetailContainer>
  );
};

export default PostDetail;
