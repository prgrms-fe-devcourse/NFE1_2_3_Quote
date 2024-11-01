import DropBoxBtn from "@assets/icons/category_dropbox_button.svg?react";
import { useState } from "react";
import styled from "styled-components";
import { useTheme } from "styled-components";

const CategorySelectContainer = styled.div`
  width: 85%;
  padding-top: 20px;
  margin: 50px 0 10px 0;
  display: flex;
  flex-direction: row-reverse;
  position: relative;
`;

const CategorySelectButton = styled.button`
  padding: 0px;
  font-size: 16px;
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
  font-size: 20px;
  margin-left: 4px;
  color: ${({ theme }) => theme.colorMainFont};
  &:hover {
    cursor: pointer;
  }
`;

const CategoryListContainer = styled.div`
  width: 130px;
  position: absolute;
  top: 50px;
  right: -30px;
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
  font-size: 14px;
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
      </CategorySelectContainer>
    </>
  );
};

export default CategorySelect;
