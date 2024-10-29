import DropBoxBtn from "@assets/icons/category_dropbox_button.svg?react";
import { useState } from "react";
import styled from "styled-components";
import { useTheme } from "styled-components";

const CategorySelectContainer = styled.div`
  width: 90%;
  margin-top: 50px;
  padding-top: 20px;
  display: flex;
  flex-direction: row-reverse;
`;

const CategorySelectButton = styled.button`
  padding: 0px;
  font-size: 20px;
  color: ${({ theme }) => theme.colorMainFont};
  display: flex;
  justify-content: end;
  align-items: center;
  border: none;
  background-color: ${({ theme }) => theme.colorBackground};
  &:hover {
    cursor: pointer;
  }
`;

const DropBoxButton = styled(DropBoxBtn)`
  font-size: 24px;
  margin-left: 4px;
  color: ${({ theme }) => theme.MainFont};
  &:hover {
    cursor: pointer;
  }
`;

const CategoryListContainer = styled.div`
  width: 135px;
  height: 194px;
  position: absolute;
  right: 25px;
  top: 100px;
  background-color: ${({ theme }) => theme.colorCategoryList};
  border-radius: 10px;
  overflow: hidden;
  z-index: 1;
`;

const CategoryItem = styled.li`
  &:last-child {
    border: none;
  }
  &:hover {
    background-color: ${({ theme }) => theme.colorCategoryListHover};
    cursor: pointer;
  }
  list-style: none;
  font-size: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #e3e3e3;
`;

interface CategorySelectProps {
  category: string;
  setCategory: (item: string) => void;
}

const CategorySelect = ({ category, setCategory }: CategorySelectProps) => {
  const theme = useTheme();
  const [showList, setShowList] = useState(false);
  const categoryList = ["도서", "노래", "대사", "인터뷰", "기타"];
  const handleCategorySelect = (item: string) => {
    setCategory(item);
    setShowList(!showList);
  };

  return (
    <>
      <CategorySelectContainer>
        <CategorySelectButton onClick={() => setShowList(!showList)}>
          {category}
          <DropBoxButton />
        </CategorySelectButton>
      </CategorySelectContainer>
      {showList && (
        <CategoryListContainer
          style={{
            boxShadow:
              theme.mode == "lightMode" ? "0px 0px 6px #dfdfdf" : "none",
            border: theme.mode === "lightMode" ? "1px solid #e3e3e3" : "none",
          }}
        >
          {categoryList.map((item, index) => (
            <CategoryItem
              key={index}
              onClick={() => handleCategorySelect(item)}
            >
              {item}
            </CategoryItem>
          ))}
        </CategoryListContainer>
      )}
    </>
  );
};

export default CategorySelect;
