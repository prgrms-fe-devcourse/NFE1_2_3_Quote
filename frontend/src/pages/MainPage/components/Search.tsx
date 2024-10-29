import styled from "styled-components";
import { useCallback, useState } from "react";
import SearchButton from "@assets/icons/search_button.svg?react";
import AlertPopUp from "@/components/AlertPopUp/AlertPopUp";

// Styled Components

const SearchContainer = styled.div`
  width: 500px;
  display: flex;
  flex-direction: column;
`;

const ResetSearchButton = styled.button`
  align-self: flex-end;
  width: 5rem;
  font-size: 14px;
  color: #f3f3f3;
  border: none;
  background: none;
  text-align: center;
  margin: 0.5rem 0;
  cursor: pointer;
  user-select: none; /* 텍스트 선택 방지 */

  &:focus {
    outline: none;
  }
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
  border: 1px solid ${({ theme }) => theme.colorMainFont};
  background-color: ${({ theme }) => theme.colorBackground};
  color: ${({ theme }) => theme.colorMainFont};
  opacity: 0.7;
  padding: 1rem;

  &::placeholder {
    color: ${({ theme }) => theme.colorMainFont};
    user-select: none; /* 텍스트 선택 방지 */
  }

  &:focus {
    outline-color: ${({ theme }) => theme.colorMain};
  }
`;

const StyledSearchButton = styled(SearchButton)`
  color: ${({ theme }) => theme.colorMainFont};
  width: 36px;
  height: 36px;
  position: absolute;
  right: 10px;
  cursor: pointer;
`;

// Search

interface SearchProps {
  searchWord: string;
  onChangeSearchWord: (searchWord: string) => void;
}

const Search = (props: SearchProps) => {
  const { searchWord, onChangeSearchWord } = props;
  const [searchInput, setSearchInput] = useState<string>(searchWord);
  const [showMessage, setShowMessage] = useState(false);

  //검색
  const handleSearchTitle = () => {
    if (!searchInput) {
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
      }, 2000);
      return;
    }
    onChangeSearchWord(searchInput);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearchTitle();
    }
  };

  //검색 초기화
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
      {showMessage && (
        <AlertPopUp error={true}>검색어를 입력해주세요</AlertPopUp>
      )}
    </>
  );
};

export default Search;
