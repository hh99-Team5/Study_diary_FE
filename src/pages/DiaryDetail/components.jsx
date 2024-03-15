import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useQuery, useQueryClient, useMutation } from 'react-query';
import { useParams, useNavigate } from 'react-router';
import { IoHeartOutline, IoHeartSharp } from "react-icons/io5";
import { GoComment } from "react-icons/go";
import Cookies from 'universal-cookie';
import { useSwitch, useInput } from '../../hooks/userHooks';
import { diaryUpdateMode } from './UpdateDiary';


const Diary = () => {
    // 남윤하 코드
    const {state:diaryMode, handleState: diaryModeHandler} = useSwitch();
    const {value:diaryContent, handler:diaryContentHandler, ref:diaryContentRef} = useInput();
    const nav = useNavigate();
    // 

    const { id } = useParams();
    const queryClient = useQueryClient();
    const [liked, setLiked] = useState(false);
    const cookie = new Cookies();
    const jwtToken = cookie.get("jwtToken");

    const { isLoading, isError, data: diary } = useQuery(
        ["diary", id],
        async () => {
            const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/v1/articles/${id}`);
            return response.data.data;
        },
    );

    // const handleDeleteDiary = async (diaryId) => {
    //     await axios.delete(`${process.env.REACT_APP_SERVER_URL}/api/v1/articles/${diaryId}`, {
    //         headers: {
    //             Authorization: `${jwtToken}`
    //         }
    //     });
    //     // 쿼리 캐시에서 데이터 삭제
    //     queryClient.invalidateQueries(["diary", diaryId]);
    // }

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
    }, [fetchLikedStatus, jwtToken, id]);



    // 남윤하 코드
    // 작성한 유저 체크 
    let newDiary = diary ? {title: diary.title, contents: diaryContent} : null;

    const token = cookie.get('jwtToken');
    const userToken = token ? token.replace("Bearer ", "") : null;

    // 남윤하 코드
    const diaryUpdateMutation = useMutation(
        async(newData) => {
            try {
                console.log("newData = ", newData);
                const updateDiary = await axios.put(`${process.env.REACT_APP_SERVER_URL}/api/v1/articles/${id}`,
                newData, { headers:{'Authorization': `Bearer ${userToken}`}});
                console.log("updateDiary = ", updateDiary);
            } catch (error) {
                console.log("updateDiary error =", error);
            }
        }, {
            onSuccess: () => {
                queryClient.invalidateQueries(["diary", id]);
                alert("수정에 성공했습니다!");
                diaryModeHandler()
            },
            onError: () => {
                alert("수정에 실패 했습니다.");
            }
    })

    const diaryDeleteMutation = useMutation(
        async (id) => {
            await axios.delete(`${process.env.REACT_APP_SERVER_URL}/api/v1/articles/${id}`, {
                headers: {
                    Authorization: `${jwtToken}`
                }
            })
        },{
            onSuccess: () =>{
                queryClient.invalidateQueries("diaries");
                nav("/diaryList");
                alert("삭제 성공!");
            },
            onError: () => {
                alert("삭제 실패!");
            }
        }
    )
    
    const diaryChangeBtn = async () =>{
        const loginUser = await diaryUpdateMode(userToken);
        if(loginUser.email !== diary.writer) {
            alert(`자신이 작성한 글만 수정 가능합니다.`)
            return
        } 
        diaryModeHandler()
    }

    const diaryUpdateBtn = async (mode) => {
        const loginUser = await diaryUpdateMode(userToken);
        if(loginUser.email !== diary.writer) {
            alert(`자신이 작성한 글만 ${mode} 가능합니다.`)
            return
        } 
        if(mode === "수정"){
            diaryUpdateMutation.mutate(newDiary);
        }
        if(mode === "삭제"){
            diaryDeleteMutation.mutate(id);
        }
    }




    const LikeIcon = liked ? IoHeartSharp : IoHeartOutline;

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error fetching diary</div>;

    return (
        <div>
            <div>
                <p>{diary.title}</p>
                <div>
                    <span>{diary.writer}</span>
                {!diaryMode ?
                    <>
                        <button onClick={() => diaryChangeBtn()}>수정</button>
                        <button onClick={() => diaryUpdateBtn("삭제")}>삭제</button>
                    </>
                    :
                    <>
                        <button onClick={() => diaryUpdateBtn("수정")}>저장</button>
                        <button onClick={() => diaryModeHandler()}>취소</button>
                    </>
                }
                </div>
                
                {!diaryMode ?
                    <div style={{ border: "1px solid black", minHeight: "200px", overflowY: "auto" }}>
                        {diary.contents}
                    </div>
                    :
                    <div style={{ border: "1px solid black", minHeight: "200px", overflowY: "auto" }}>
                        <textarea  cols="30" rows="10" onChange={diaryContentHandler} value={diaryContent} ></textarea>
                    </div>
                }
            </div>
            {!diaryMode ?
            <div>
                <LikeIcon onClick={handleToggleLike} />
                <span>좋아요 {diary.like}</span>
                <GoComment />
                <span>댓글 </span>
            </div>
            :
            <div></div>}
        </div>
    );

}

export default Diary;