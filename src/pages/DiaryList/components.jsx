import React, { useState } from "react"
import { useQuery } from 'react-query';
import axios from "axios";
import { useRef } from "react";


const Diaries = () => {
    //검색조건, 검색어, 검색상태 관리
    const [type, setType] = useState('');
    const [keyword, setKeyword] = useState('');
    const [searched, setSearched] = useState(false);
    const keywordRef = useRef(null);


    //전체 일지 리스트 가져오기
    const { isLoading: isLoadingDiaries, isError: isErrorDiaries, data: diaries } = useQuery(
        "diaries",
        () => axios.get(`${process.env.REACT_APP_SERVER_URL}/api/v1/articles`).then((res) => res.data.data),
        { enabled: !searched || keyword === '' } // 검색하지 않은 경우 or 검색어가 공백인 경우에만 활성화
    );
    console.log("처음 넘어오는 데이터:", diaries);

    // 검색 결과 가져오기
    const { isLoading: isLoadingSearchResults, isError: isErrorSearchResults, data: searchResults, refetch: refetchSearch } = useQuery(
        ["search", type, keyword],
        () => {
            if (searched && keyword !== '') {
                return axios.get(`${process.env.REACT_APP_SERVER_URL}/api/v1/articles/search`, {
                    params: {
                        type,
                        keyword
                    }
                }).then((res) => res.data);
            } else {
                return Promise.resolve({ data: diaries }); // 검색하지 않거나 검색어가 빈 문자열인 경우 전체 목록 리턴
            }
        },
        { enabled: searched && keyword !== '' } // 검색을 했고 검색어가 공백이 아닌 경우에만 활성화
    );



    const handleTypeChange = (e) => {
        setType(e.target.value);
    }

    const handleKeywordChange = (e) => {
        setKeyword(e.target.value);
    }

    const handleSearch = () => {
        console.log(keywordRef.current.value);
        setKeyword(keywordRef.current.value);

        setSearched(true);
        refetchSearch(); // 데이터 다시 가져오기
    }



    if (isLoadingDiaries || isLoadingSearchResults) return <div>Loading...</div>;
    if (isErrorDiaries || isErrorSearchResults) return <div>로딩 중 오류 발생</div>;
    if (!diaries) return null;

    const dataToShow = searched && keyword !== '' ? searchResults : diaries; // 검색결과 : 전체목록

    return (
        <div>
            <div>
                <select value={type} onChange={handleTypeChange}>
                    <option value="writer">작성자</option>
                    <option value="title">제목</option>
                    <option value="content">내용</option>
                </select>
                <input type="text" ref={keywordRef} />
                <button onClick={handleSearch}>검색</button>
                <div>{keyword}</div>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>작성자</th>
                        <th>제목</th>
                        <th>좋아요</th>
                    </tr>
                </thead>
                {dataToShow && dataToShow.length > 0 && (
                    <tbody>
                        {dataToShow.map(diary => (
                            <tr key={diary.id}>
                                <td>{diary.id}</td>
                                <td>{diary.writer}</td>
                                <td>{diary.title}</td>
                                <td>{diary.like}</td>
                            </tr>
                        ))}
                    </tbody>
                )}
            </table>
        </div>
    );
}

export default Diaries;