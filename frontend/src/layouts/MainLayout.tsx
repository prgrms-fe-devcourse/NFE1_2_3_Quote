import styled from "styled-components";

const Container = styled.div`
  width: 960px;
  height: 100vh;
  margin: 0 auto;
`;

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return <Container>{children}</Container>;
};

export default MainLayout;
