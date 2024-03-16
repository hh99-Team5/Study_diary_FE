import React, { useEffect, useState } from "react"
import { useQuery } from 'react-query';
import axios from "axios";
import { useRef } from "react";
import { useNavigate } from "react-router";
import { useSelector } from 'react-redux';
import Cookies from "universal-cookie";
import 
{ 
  Container,
  Wrapper,
} from "./styles";

import 
{ 
  SelectArea,
  ListArea,
  BtnArea 
} from "./components";


const Diaries = () => {
    const cookie = new Cookies();
    const userToken = cookie.get('jwtToken');
    const user = useSelector((state) => state.user.value);
    // console.log("redux user = ", user);

    //검색조건, 검색어, 검색상태 관리
    const [type, setType] = useState('writer');
    const [keyword, setKeyword] = useState('');
    const [searched, setSearched] = useState(false);
    const keywordRef = useRef(null);
    const selectRef = useRef(null);
    const nav = useNavigate();

    //전체 일지 리스트 가져오기
    const { isLoading: isLoadingDiaries, isError: isErrorDiaries, data: diaries } = useQuery(
        "diaries",
        () => axios.get(`${process.env.REACT_APP_SERVER_URL}/api/v1/articles`).then((res) => res.data.data),
        { enabled: !searched } // 검색하지 않은 경우 or 검색어가 공백인 경우에만 활성화
    );

    // 검색 결과 가져오기
    const { isLoading: isLoadingSearchResults, isError: isErrorSearchResults, data: searchResults } = useQuery(
        ["search", type, keyword],
        () => {
            if (searched && keyword !== '') {
                return axios.get(`${process.env.REACT_APP_SERVER_URL}/api/v1/articles/search`, {
                    params: {
                        type,
                        keyword
                    }
                }).then((res) => res.data.data);
            } else {
                return Promise.resolve({ data: diaries }); // 검색하지 않거나 검색어가 빈 문자열인 경우 전체 목록 리턴
            }
        },
        { enabled: searched } // 검색을 했고 검색어가 공백이 아닌 경우에만 활성화
    );

    const handleSearch = () => {
        const inputValue = keywordRef.current.value;
        setKeyword(inputValue);
        setType(selectRef.current.value);
        if(!keyword){
            setSearched(false);
        }else {

            setSearched(true);
        }
    }

    useEffect(() => {
        if (Array.isArray(searchResults) && searchResults.length === 0 && !isLoadingSearchResults) {
            alert('검색 결과가 없습니다.');
        }
    }, []);
    

    if (isLoadingDiaries || isLoadingSearchResults) return <div>Loading...</div>;
    if (isErrorDiaries || isErrorSearchResults) return <div>로딩 중 오류 발생</div>;

    const dataToShow = searched && searchResults ? searchResults : diaries; // 검색결과 : 전체목록

    const handleDiaryClick = (id) => {
        nav(`/diary/${id}`);
    }

    return (
      <Container>
        <Wrapper>
            <SelectArea selectRef={selectRef} keywordRef={keywordRef} handleSearch={handleSearch} />
            <ListArea dataToShow={dataToShow} handleDiaryClick={handleDiaryClick} />
            {userToken ? <BtnArea nav={() =>nav("/add")} /> : <></>}
            
        </Wrapper>
      </Container>
    );
}

export default Diaries;