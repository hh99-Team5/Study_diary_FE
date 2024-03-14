import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useQuery, useQueryClient } from 'react-query';
import { useParams } from 'react-router';
import { IoHeartOutline, IoHeartSharp } from "react-icons/io5";
import { GoComment } from "react-icons/go";
import Cookies from 'universal-cookie';


const Diary = () => {
    const { id } = useParams();
    const queryClient = useQueryClient();
    const [liked, setLiked] = useState(false);
    const cookie = new Cookies();
    const jwtToken = cookie.get("jwtToken");


    const { isLoading, isError, data: diary } = useQuery(
        ["diary", id],
        () => axios.get(`${process.env.REACT_APP_SERVER_URL}/api/v1/articles/${id}`).then((res) => res.data.data),
    );


    const handleDeleteDiary = async (diaryId) => {
        await axios.delete(`${process.env.REACT_APP_SERVER_URL}/api/v1/articles/${diaryId}`, {
            headers: {
                Authorization: `${jwtToken}`
            }
        });
        // 쿼리 캐시에서 데이터 삭제
        queryClient.invalidateQueries(["diary", diaryId]);
    }

    //좋아요 여부확인
    const fetchLikedStatus = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_SERVER_URL}/api/v1/articles/${id}/likes`,
                {
                    headers: {
                        Authorization: `${jwtToken}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
            console.log('like?', response.data.data.isChecked);
            setLiked(response.data.data.isChecked);
        } catch (error) {
            console.error('Error fetching liked status:', error);
        }
    };

    //좋아요 토글
    const handleToggleLike = async () => {
        setLiked(!liked);
        try {
            await axios.post(
                `${process.env.REACT_APP_SERVER_URL}/api/v1/articles/${id}/likes`, null,
                { headers: { Authorization: `${jwtToken}` } }
            );
            // 쿼리 캐시에서 데이터 다시 불러오기
            queryClient.invalidateQueries(["diary", id]);
            fetchLikedStatus(); // 좋아요 상태를 다시 가져옴
        } catch (error) {
            console.error('Error toggling like:', error);
            setLiked(!liked);
        }
    }

    useEffect(() => {
        fetchLikedStatus();
    }, [jwtToken, id]);


    const LikeIcon = liked ? IoHeartSharp : IoHeartOutline;


    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error fetching diary</div>;


    return (
        <div>
            <div>
                <p>{diary.title}</p>
                <div>
                    <span>{diary.writer}</span>
                    <button>수정</button>
                    <button onClick={() => handleDeleteDiary(diary.id)}>삭제</button>
                </div>
                <div style={{ border: "1px solid black", minHeight: "200px", overflowY: "auto" }}>
                    {diary.contents}
                </div>
            </div>
            <div>
                <LikeIcon onClick={handleToggleLike} />
                <span>좋아요 {diary.like}</span>
                <GoComment />
                <span>댓글 </span>
            </div>
        </div>
    );

}

export default Diary;