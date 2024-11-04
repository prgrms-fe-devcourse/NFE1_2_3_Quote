import styled from "styled-components";

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`;

const Content = styled.span`
  visibility: hidden;
  background-color: ${({theme}) => theme.colorCategoryListHover};
  text-align: center;
  width: 14rem;
  border-radius: 4px;
  padding: 8px;
  position: absolute;
  z-index: 1;
  bottom: 130%; 
  left: 50%;
  transform: translateX(-50%);
  opacity: 0;
  transition: opacity 0.3s;
  font-size: 14px;
  
  &::after { //화살표
    content: '';
    position: absolute;
    top: 100%; 
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: ${({theme}) => theme.colorCategoryListHover} transparent transparent transparent;
  }
`;

const HoverElement = styled.div`
  display: inline-block;

  &:hover + ${Content} {
    visibility: visible;
    opacity: 0.8;
  }
`;

interface ToolTipProps {
  children: React.ReactNode;
  message: string;
}

const Tooltip = ({ children, message }: ToolTipProps) => {
  return (
    <Container>  
        <HoverElement>{children}</HoverElement>
        <Content>{message}</Content>
    </Container>
  );
};

export default Tooltip;
