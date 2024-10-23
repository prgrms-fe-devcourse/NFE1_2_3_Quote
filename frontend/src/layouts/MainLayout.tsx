import Header from "@/components/Header/Header";
import styled from "styled-components";
import { useLocation } from "react-router-dom";

const Layout = styled.div`
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  /* background-color: #f3f3f3; */
  position: relative;
`;

const Container = styled.div`
  width: 960px;
  margin: 0 auto;
`;

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const location = useLocation();

  // 특정 경로에서 Header를 숨김
  const hideHeader =
    location.pathname === "/login" || location.pathname === "/signup";

  return (
    <Layout>
      {!hideHeader && <Header />}
      <Container>{children}</Container>
    </Layout>
  );
};

export default MainLayout;
