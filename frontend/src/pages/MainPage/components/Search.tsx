import styled from "styled-components";
import SearchButton from "@assets/icons/search_button.svg?react";
import { useCallback, useRef, useState } from "react";
import { getSearchPostData } from "../apis/postApi";
import { useGetCategoryPostData } from "../hooks/useGetPostData";

const SearchContainer = styled.div`
  width: 500px;
  display: flex;
  flex-direction: column;
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

interface SearchProps {
  searchWord: string;
  onChangeSearchWord: (searchWord: string) => void;
}

const Search = (props: SearchProps) => {
  const { searchWord, onChangeSearchWord } = props;
  const [searchInput, setSearchInput] = useState<string>(searchWord);
  // const inputRef = useRef<HTMLInputElement>(null);
  // const handleSearchTitle = useCallback(() => {
  //   if (!searchWord) {
  //     console.log("검색어를 입력해주세요");
  //     return;
  //   }
  // }, [searchWord]);

  const handleSearchTitle = () => {
    if (!searchInput) {
      console.log("검색어를 입력하세요");
      return;
    }
    onChangeSearchWord(searchInput);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearchTitle();
    }
  };

  const handleResetSearch = useCallback(() => {
    setSearchInput("");
    onChangeSearchWord("");
  }, []);

  return (
    <>
      <SearchContainer>
        <ResetSearchButton onClick={handleResetSearch}>
          검색 초기화
        </ResetSearchButton>
        <SearchInputContainer>
          <SearchInput
            type='text'
            placeholder='제목을 입력해주세요.'
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <StyledSearchButton onClick={handleSearchTitle} />
        </SearchInputContainer>
      </SearchContainer>
    </>
  );
};

export default Search;
