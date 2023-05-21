import React from "react";
import styled from "styled-components";

type SearchProps = {
    msgType: string;
    placeholder?: string;
    searchEvent: (data: string) => void;
}

const Search = ({ msgType, placeholder, searchEvent }: SearchProps) => {
    const [value, setValue] = React.useState<string>('');

    const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    }

    const searchHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        searchEvent(value);
    }

    return (
        <SearchContainer>
            <SearchHeader>찾으시는 {msgType}이 있으신가요?</SearchHeader>
            <SearchWrapper>
                <SearchInput type="text" value={value} onChange={inputHandler} placeholder={placeholder} spellCheck={false} />
                <SearchButton type="button" onClick={searchHandler}>검색</SearchButton>
            </SearchWrapper>
        </SearchContainer>
    )
}

export default Search;

const SearchContainer = styled.div`
    padding: 3rem 0rem;
  ${({ theme }) => theme.devices.desktop} {
    padding: 5rem 10rem;
  }
`;
const SearchHeader = styled.h3`
    text-align: center;
    margin-bottom: 1rem;
    opacity: 0.7;
`;
const SearchWrapper = styled.div`
display: flex;
`;
const SearchButton = styled.button`
background-color: ${({ theme }) => theme.colors.secondary};
padding: 1rem;
border: none;
outline: none;
border-radius: 0px 0.5rem 0.5rem 0px;
color: white;
font-weight: 500;
`;
const SearchInput = styled.input`
    border: 1px solid black;
    border: 1px solid ${({ theme }) => theme.colors.secondary};
    padding: 1rem;
    outline: none;
    flex: 1 0 auto;
    border-radius: 0.5rem 0px 0px 0.5rem;
`;