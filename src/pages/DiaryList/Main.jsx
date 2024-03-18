import Cookies from "universal-cookie";

// hook 
import React, { useState } from "react"
import { useQuery } from 'react-query';
import { useRef } from "react";
import { useNavigate } from "react-router";

// styled Component
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

// api
import 
{ 
    articleList,
    searchArticleList
} from "../../service/ArticleService";

const Diaries = () => {
    const cookie = new Cookies();
    const userToken = cookie.get('jwtToken');
    // console.log("redux user = ", user);

    //검색조건, 검색어, 검색상태 관리
    const [type, setType] = useState('writer');
    const [keyword, setKeyword] = useState('');
    const [searched, setSearched] = useState(false);
    const keywordRef = useRef(null);
    const selectRef = useRef(null);
    const nav = useNavigate();

    // useQuery 적용
    //전체 일지 리스트 가져오기
    const { isLoading: isLoadingDiaries, isError: isErrorDiaries, data: diaries } = useQuery(
        "diaries",
        async() => {
            try {
                const res = await articleList();
                return res.data.data
            } catch (error) {
                console.log("error = ", error);
            }
        },
        { enabled: !searched } // 검색하지 않은 경우 or 검색어가 공백인 경우에만 활성화
    );
    
    // 검색 결과 가져오기
    const { isLoading: isLoadingSearchResults, isError: isErrorSearchResults, data: searchResults } = useQuery(
        ["search", type, keyword],
        async() => {
            try {
                if (searched && keyword !== '') {
                    const res = await searchArticleList({ params: { type, keyword } })
                    return res.data.data
                } else {
                    return Promise.resolve({ data: diaries }); // 검색하지 않거나 검색어가 빈 문자열인 경우 전체 목록 리턴
                }
            } catch (error) {
                console.log("error = ", error)
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

    // 검색결과 zero 처리하기


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