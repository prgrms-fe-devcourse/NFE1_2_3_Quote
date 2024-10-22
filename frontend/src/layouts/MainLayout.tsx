import Header from "@/components/Header/Header";
import WriteButton from "@/components/WriteButton/WriteButton";
import styled from "styled-components";

const Container = styled.div`
  width: 960px;
  height: calc(100vh - 50px);
  margin: 0 auto;
`;

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <>
      <Header />
      <Container>{children}
      <WriteButton />
      </Container>

    </>
  );
};

export default MainLayout;
