import DropBoxBtn from "@assets/icons/category_dropbox_button.svg?react";
import { useState } from "react";
import styled from "styled-components";

const CategorySelectContainer = styled.div`
  width: 860px;
  margin-top: 40px;
  display: flex;
  flex-direction: row-reverse;
`;

const CategorySelectButton = styled.button`
  width: 110px;
  height: 50px;
  padding: 8px;
  font-size: 20px;
  color: #303030;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  background-color: #f3f3f3;
`;

const DropBoxButton = styled(DropBoxBtn)`
  font-size: 24px;
  margin-left: 4px;
`;

const CategoryListContainer = styled.div`
  width: 150px;
  height: 210px;
  position: absolute;
  right: 40px;
  top: 90px;
  background-color: #fff;
  box-shadow: 0px 0px 6px #dfdfdf;
  border: 1px solid #e3e3e3;
  border-radius: 10px;
`;

const CategoryItem = styled.li`
  &:last-child {
    border: none;
  }
  list-style: none;
  font-size: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px;
  border-bottom: 1px solid #e3e3e3;
`;

interface CategorySelectProps {
  category: string;
  setCategory: (value: string) => void;
}

const CategorySelect = ({ category, setCategory }: CategorySelectProps) => {
  const [showList, setShowList] = useState(false);
  const categoryList = ["도서", "노래", "대사", "인터뷰", "기타"];
  const handleCategorySelect = (value: string) => {
    setCategory(value);
    setShowList(!showList);
  };

  return (
    <div>
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
    </div>
  );
};

export default CategorySelect;
