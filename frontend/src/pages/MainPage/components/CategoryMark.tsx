import styled from "styled-components";

interface CategoryContainerProps {
  $category: string;
  $active: boolean;
}

const CategoryContainer = styled.div<CategoryContainerProps>`
  width: 120px;
  height: 60px;
  margin: 0 5px;
  display: flex;
  justify-content: center;
  background-color: ${({ theme, $category }) => theme[$category].bgColor};
  border-radius: 20px 20px 0 0;
  cursor: pointer;
  opacity: ${(props) => (props.$active ? "1" : "0.9")};

  transform: ${(props) => (props.$active ? "translate(0, -20px)" : "none")};
  &:hover {
    ${(props) =>
      !props.$active &&
      `opacity: 1;
    transform: translate(0, -10px);
    `}
  }
`;

const CategoryText = styled.p`
  margin-top: 0.5rem;
`;

interface CategoryMarkProps {
  category: string;
  active: boolean;
  onClick: () => void;
}

const CategoryMark = (props: CategoryMarkProps) => {
  const { category, active, onClick } = props;
  return (
    <>
      <CategoryContainer
        $category={category}
        onClick={onClick}
        $active={active}
      >
        <CategoryText>{category}</CategoryText>
      </CategoryContainer>
    </>
  );
};

export default CategoryMark;
