import DropBoxBtn from "@assets/icons/category_dropbox_button.svg?react";
import { useState } from "react";
import styled from "styled-components";

const CategorySelectContainer = styled.div`
  width: 90%;
  margin-top: 20px;
  display: flex;
  flex-direction: row-reverse;
`;

const CategorySelectButton = styled.button`
  height: 50px;
  padding: 0px;
  font-size: 20px;
  color: #303030;
  display: flex;
  justify-content: end;
  align-items: center;
  border: none;
  background-color: #f3f3f3;
  &:hover {
    cursor: pointer;
  }
`;

const DropBoxButton = styled(DropBoxBtn)`
  font-size: 24px;
  margin-left: 4px;
  &:hover {
    cursor: pointer;
  }
`;

const CategoryListContainer = styled.div`
  width: 135px;
  height: 195px;
  position: absolute;
  right: 25px;
  top: 70px;
  background-color: #fff;
  box-shadow: 0px 0px 6px #dfdfdf;
  border: 1px solid #e3e3e3;
  border-radius: 10px;
  overflow: hidden;
  z-index: 1;
`;

const CategoryItem = styled.li`
  &:last-child {
    border: none;
  }
  &:hover {
    background-color: #d4d4d4;
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
        <CategoryListContainer>
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
