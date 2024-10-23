import styled from "styled-components";

const CategoryContainer = styled.div`
  width: 120px;
  height: 60px;
  margin: 0 5px;
  display: flex;
  justify-content: center;
  background-color: ${(props) => props.color};
  border-radius: 20px 20px 0 0;
  cursor: pointer;
  opacity: 0.9;

  &:hover {
    opacity: 1;
    transform: translate(0, -10px);
  }
`;

const CategoryText = styled.p`
  margin-top: 0.5rem;
`;

interface CategoryMarkProps {
  category: string;
  color: string;
  onClick: () => void;
}

const CategoryMark = (props: CategoryMarkProps) => {
  const { category, color } = props;
  return (
    <>
      <CategoryContainer color={color}>
        <CategoryText>{category}</CategoryText>
      </CategoryContainer>
    </>
  );
};

export default CategoryMark;
