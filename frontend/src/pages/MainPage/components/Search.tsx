import styled from "styled-components";
import SearchButton from "@assets/icons/search_button.svg?react";

const SearchContainer = styled.div`
  width: 500px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  position: absolute;
  left: 50%;
  top: 30%;
  transform: translate(-50%, -50%);
  z-index: 1;
`;

const ResetSearchButton = styled.button`
  font-size: 14px;
  color: #f3f3f3;
  border: none;
  background: none;
  text-align: end;
  margin: 0.5rem 0;
  cursor: pointer;
`;

const SearchInputContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

const SearchInput = styled.input`
  width: 500px;
  height: 50px;
  border-radius: 25px;
  border: none;
  background-color: #f3f3f3;
  opacity: 0.7;
  padding: 1rem;
`;

const StyledSearchButton = styled(SearchButton)`
  width: 36px;
  height: 36px;
  position: absolute;
  right: 10px;
  cursor: pointer;
`;

const Search = () => {
  return (
    <div>
      <SearchContainer>
        <ResetSearchButton>검색 초기화</ResetSearchButton>
        <SearchInputContainer>
          <SearchInput placeholder='제목을 입력해주세요.' />
          <StyledSearchButton />
        </SearchInputContainer>
      </SearchContainer>
    </div>
  );
};

export default Search;
