import Header from "@/components/Header/Header";
import styled from "styled-components";

const Layout = styled.div`
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  background-color: #f3f3f3;
`;

const Container = styled.div`
  width: 960px;
  height : calc(100vh - 50px);
  margin: 0 auto;
`;

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <Layout>
      <Header />
      <Container>{children}</Container>
    </Layout>
  );
};

export default MainLayout;
