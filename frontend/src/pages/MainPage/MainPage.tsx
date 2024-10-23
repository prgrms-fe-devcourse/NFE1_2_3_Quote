import MainLayout from "@/layouts/MainLayout";
import MainImage from "@assets/images/mainImage.png";
import styled from "styled-components";
import Search from "./components/Search";

const TopContainer = styled.div`

`;

const MainImg = styled.img`
  position: absolute;
  left: 0;
  width: 100%;
`;

const MainPage = () => {
  return (
    <MainLayout>
      <TopContainer>
        <Search />
        <MainImg src={MainImage} />
      </TopContainer>
    </MainLayout>
  );
};

export default MainPage;
