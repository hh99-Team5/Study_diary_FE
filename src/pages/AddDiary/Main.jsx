import React from 'react'
import { useInput, useSwitch } from '../../hooks/userHooks'
import Cookies from 'universal-cookie';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { blankInvalidation } from './Functions/DiaryFunction';
import { useMutation } from 'react-query';
import { useQueryClient } from 'react-query';

const AddDiary = () => {
  
  const {value:title, handler:onTitleHandler, ref:titleRef} = useInput();
  const {value:contents, handler:onContentHandler, ref:contentRef } = useInput();
  const cookie = new Cookies();
  const jwtToken = cookie.get('jwtToken');
  const userToken = jwtToken ? jwtToken.replace("Bearer ", "") : "";
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  useEffect(() => {
    console.log("userToken = ", userToken);
    if(!userToken){
      alert("로그인이 필요한 서비스입니다.");
      navigate("/");
    }
  }, [])


  // 일지 추가 mutation
  const addDiaryMutation = useMutation( 
    async (newData) => {
      try {
        const response = await axios.post("http://hanghae-5.ap-northeast-2.elasticbeanstalk.com/api/v1/articles",newData,
        {headers:{'Authorization': `Bearer ${userToken}`}})
        console.log("response = ", response);
      } catch (error) {
        console.log("Mutation error = ", error)
      }
    },{
      onSuccess: () => {
        queryClient.invalidateQueries("diaries")
        alert("등록에 성공했습니다.");
        navigate("/diaryList")
      },
      onError: () => {
        alert("등록실패!");
      }
    }
  )
  // 일지저장하기
  const addDiary = async () =>{
    const newDiary = {title, contents};
    console.log("newDiary = ", newDiary);
    await addDiaryMutation.mutate(newDiary);
  }

  return (
    <div>
      <div>
        <h1>공부 일지 작성</h1>
      </div>
      <div>
        <div>
          <span>제목</span>
          <div><input ref={titleRef} type="text" value={title} onChange={onTitleHandler} /></div>
        </div>
      </div>
      <div>
        <div>
          <span>내용</span>
          <div><textarea ref={contentRef} cols="30" rows="10" value={contents} onChange={onContentHandler}></textarea></div>
        </div>
      </div>
      <div>
        <div>
          <button onClick={() => addDiary()}>저장</button>
          <button onClick={() => navigate("/diaryList")}>취소</button>
        </div>
      </div>
    </div>
  )
}

export default AddDiary