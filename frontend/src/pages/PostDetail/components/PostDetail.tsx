import WriteModifyBtn from "@assets/icons/write_modify_button.svg?react";
import GoToBackBtn from "@assets/icons/goToBack_button.svg?react";
import BookMarkBeforeBtn from "@assets/icons/bookMark_before_select.svg?react";
import BookMarkAfterBtn from "@assets/icons/bookMark_after_select.svg?react";
import QuoteStartIcon from "@assets/icons/quote_start.svg?react";
import QuoteEndIcon from "@assets/icons/quote_end.svg?react";
import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
  background-color: #fff;
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
    background-color: #e3e3e3;
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
  margin: 18px;
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
`;
const BookmarkCount = styled.p`
  font-size: 14px;
  line-height: 25px;
  margin: -7px;
`;

const PostDetail = () => {
  const [isAuthor, setIsAuthor] = useState<boolean>(true);
  const [showList, setShowList] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const navigate = useNavigate();
  const handlePostCreatePopUP = () => {};
  const handleBookmark = () => {
    setIsActive(!isActive);
  };
  return (
    <DetailContainer>
      <GotoBackButton>
        <GoToBackBtn />
      </GotoBackButton>
      <TopContainer>
        <Category>{data.category}</Category>
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
          <ModifyMenu>
            <ModifyItem
              onClick={() => {
                navigate("/");
              }}
            >
              수정
            </ModifyItem>
            <ModifyItem onClick={handlePostCreatePopUP}>삭제</ModifyItem>
          </ModifyMenu>
        )}
      </TopContainer>
      <AuthorProfile>
        <AuthorProfileImg
          src={data.authorId.profileImage}
          alt='작성자 프로필사진'
        />
        <AuthorName>{data.authorId.nickname}</AuthorName>
      </AuthorProfile>
      <ContentContainer>
        <Title>{data.title}</Title>
        <CreatedAt>{data.createdAt}</CreatedAt>
        <QuoteContainer>
          <QuoteStartIcon />
          <Quote>{data.quote}</Quote>
          <QuoteEndIcon />
        </QuoteContainer>
        <Content>{data.content}</Content>
      </ContentContainer>
      <BookmarkContainer>
        <BookmarkBtn onClick={handleBookmark}>
          {isActive ? <BookMarkAfterBtn /> : <BookMarkBeforeBtn />}
        </BookmarkBtn>
        <BookmarkCount>{data.bookmarked.length}</BookmarkCount>
      </BookmarkContainer>
    </DetailContainer>
  );
};

export default PostDetail;

export interface Post {
  _id: string;
  category: string;
  title: string;
  content: string;
  quote: string;
  authorId: {
    nickname: string;
    profileImage: string;
  };
  bookmarked: Array<number>;
  createdAt: string;
}

const data: Post = {
  _id: "444",
  category: "노래",
  title: "서시",
  content:
    "오늘은 영화 인사이드 아웃을 봤다. 처음에는 그저 어린이들이 좋아할 만한 애니메이션이라고 생각했는데, 생각보다 훨씬 깊고 많은 것을 느끼게 해주는 영화였다. 이야기 속 주인공은 라일리라는 소녀였지만, 사실 진짜 주인공은 그녀의 머릿속에 있는 감정들이었다. 기쁨, 슬픔, 버럭, 소심, 까칠이라는 다섯 가지 감정이 라일리의 행동과 생각을 조종하는 모습이 너무 신기했다.\r\n처음엔 기쁨이 가장 중요한 감정이라고 생각했는데, 영화가 진행될수록 슬픔이 왜 중요한지 깨닫게 되었다. 평소에는 슬픔이라는 감정을 자주 피하려고만 했는데, 오늘 영화를 보니 슬픔도 우리에게 꼭 필요한 감정이라는 걸 알았다. 슬픔이 있어야 기쁨도 더 크게 느껴지고, 슬픔을 느낄 때 비로소 치유가 시작된다는 사실이 마음 깊이 와닿았다.\n특히 기억들이 어떻게 만들어지고, 시간이 지나면 그 기억이 슬픔이나 다른 감정과 섞일 수 있다는 점도 흥미로웠다. 나 역시 기쁜 기억도 시간이 지나면서 조금씩 다른 감정이 섞이곤 했는데, 그게 나쁜 게 아니라 자연스러운 거라는 걸 알게 되어 위로가 됐다.\n영화 속에서 라일리가 새로운 환경에 적응하지 못하고, 슬프고 화나는 감정이 밀려오는 장면들을 보면서 내가 겪었던 일들이 떠올랐다. 나도 새로운 시작이 두렵고, 그 속에서 불안함과 슬픔을 느낀 적이 있었는데, 그때 나도 감정들이 나를 어떻게 이끌어갔는지 다시 생각해보게 됐다.\n오늘 인사이드 아웃을 보면서 감정의 소중함을 다시 느꼈다. 기쁨만이 좋은 것이 아니라, 슬픔, 화, 두려움 같은 감정도 우리 삶에서 중요한 역할을 한다는 걸 깨달은 날이었다. 감정들을 더 이해하고 받아들이며, 나 자신을 더 아껴줘야겠다는 생각이 든다.",
  quote:
    "죽는 날까지 하늘을 우러러 한 점 부끄럼이 없기를, 잎새에 이는 바람에도 나는 괴로워했다죽는 날까지 하늘을 우러러 한 점 부끄럼이 없기를, 잎새에 이는 바람에도 나는 괴로워했다죽는 날까지 하늘을 우러러 한 점 부끄럼이 없기를, 잎새에 이는 바람에도 나는 괴로워했다죽는 날까지 하늘을 우러러 한 점 부끄럼이 없기를, 잎새에 이는 바람에도 나는 괴로워했다죽는 날까지 하늘을 우러러 한 점 부끄럼이 없기를, 잎새에 이는 바람에도 나는 괴로워했다죽는 날까지 하늘을 우러러 한 점 부끄럼이 없기를, 잎새에 이는 바람에도 나는 괴로워했다 점점점점점",
  authorId: {
    nickname: "테스트123",
    profileImage:
      "https://cdn.pixabay.com/photo/2024/02/26/19/39/monochrome-image-8598798_1280.jpg",
  },
  bookmarked: [1, 1, 1],
  createdAt: "2024-10-24T06:33:01.754Z",
};
