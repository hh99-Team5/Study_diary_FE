import axios from 'axios';
import React from 'react'
import { useQuery, useQueryClient } from 'react-query';
import { useParams } from 'react-router';
import { IoHeartOutline, IoHeartSharp } from "react-icons/io5";
import { GoComment } from "react-icons/go";


const Diary = () => {
    const { id } = useParams();
    const queryClient = useQueryClient();

    const { isLoading, isError, data: diary } = useQuery(
        ["diary", id],
        () => axios.get(`${process.env.REACT_APP_SERVER_URL}/api/v1/articles/${id}`).then((res) => res.data.data),
    );


    const handleDeleteDiary = async (diaryId) => {
        await axios.delete(`${process.env.REACT_APP_SERVER_URL}/api/v1/articles/${diaryId}`);
        // 쿼리 캐시에서 데이터 삭제
        queryClient.invalidateQueries(["diary", diaryId]);
    }


    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error fetching diary</div>;




    //좋아요
    


    return (
        <div>
            <div>
                <p>{diary.title}</p>
                <div>
                    <span>{diary.writer}</span>
                    <button onClick={() => handleDeleteDiary(diary.id)}>삭제</button>
                </div>
                <div style={{ border: "1px solid black", minHeight: "200px", overflowY: "auto" }}>
                    {diary.contents}
                </div>
            </div>
            <div>
                <IoHeartOutline /><IoHeartSharp />
                <span>좋아요 </span>
                <GoComment />
                <span>댓글 </span>
            </div>
        </div>
    );

}

export default Diary;