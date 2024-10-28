import styled, { keyframes } from "styled-components";
import SearchButton from "@assets/icons/search_button.svg?react";
import { useCallback, useState } from "react";


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
  user-select: none; /* 텍스트 선택 방지 */
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
  opacity: 0.7;
  padding: 1rem;
  color : ${({ theme }) => theme.colorMainFont};

  &::placeholder {
    color : ${({ theme }) => theme.colorMainFont};
  }

  &:focus {
    outline-color:  #474040;
  }
  
`;

const StyledSearchButton = styled(SearchButton)`
  color : ${({ theme }) => theme.colorMainFont};
  width: 36px;
  height: 36px;
  position: absolute;
  right: 10px;
  cursor: pointer;
`;

const fadeOut = keyframes`
  0% { opacity: 1; }
  100% { opacity: 0; }
`;

const SearchMessage = styled.div`
  position: fixed;
  top: 70px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #fff;
  color: #303030;
  padding: 10px 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.25);
  font-size: 14px;
  font-weight: bold;
  z-index: 1100;
  pointer-events: none;
  opacity: 1;
  animation: ${fadeOut} 2s ease-in-out 1s forwards;
`;

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
      setShowMessage(true)
      return;
    }
    setShowMessage(false)
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
    setShowMessage(false)
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
      {showMessage && <SearchMessage>검색어를 입력해주세요</SearchMessage>}
    </>
  );
};

export default Search;
