import React from 'react'
import { useInput, useSwitch } from '../../hooks/userHooks'
import Cookies from 'universal-cookie';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { blankInvalidation } from './Functions/DiaryFunction';

const AddDiary = () => {
  
  const {value:title, handler:onTitleHandler, ref:titleRef} = useInput();
  const {value:contents, handler:onContentHandler, ref:contentRef } = useInput();
  
  const {state:modal, handleState:onModalSwitch} = useSwitch();

  const cookie = new Cookies();
  const jwtToken = cookie.get('jwtToken');
  const userToken = jwtToken ? jwtToken.replace("Bearer ", "") : "";
  const navigate = useNavigate();

  useEffect(() => {
    console.log("userToken = ", userToken);
    if(!userToken){
      alert("로그인이 필요한 서비스입니다.");
      navigate("/");
    }
  }, [])

  // 일지저장하기
  const addDiary = async () =>{
    // if(!blankInvalidation(title, titleRef, contents, contentRef)) {
    //   return
    // }
    const newDiary = {title, contents};
    console.log("newDiary = ", newDiary);
    try {
      const response = await addDiaryCall(newDiary);
      console.log("addDiary response = ", response);
      alert("등록에 성공했습니다.");
      navigate("/diaryList")
    } catch (error) {
      alert(error.response.data.data.contents);
    }
  }
  const addDiaryCall = (newDiary) => axios.post("http://hanghae-5.ap-northeast-2.elasticbeanstalk.com/api/v1/articles",
    newDiary,
    {headers:{'Authorization': `Bearer ${userToken}`}}
  )


  // 일지 수정하기
  const updateDiary = async () => {
    console.log("title = ", title, "contents = ", contents);
    const updateDiary = {title, contents};
    try {
      const response = await updateDiaryCall(updateDiary)
      console.log("update response = ", response);
    } catch (error) {
      alert(error.response.data.data.contents);
    }
  }

  const updateDiaryCall = () => {

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
          {/* <div><input ref={titleRef} type="text" value={title} /></div> */}
        </div>
      </div>
      <div>
        <div>
          <span>내용</span>
          <div><textarea ref={contentRef} cols="30" rows="10" value={contents} onChange={onContentHandler}></textarea></div>
          {/* <div><textarea ref={contentRef} cols="30" rows="10" value={content}></textarea></div> */}
        </div>
      </div>
      <div>
          
            <div>
              <button onClick={() => addDiary()}>저장</button>
              <button onClick={() => navigate("/diaryList")}>취소</button>
            </div>
          
            {/* <div>
              <button onClick={() => updateDiary()}>수정</button>
              <button onClick={() => navigate("/diaryList")}>취소</button>
            </div> */}
          
      </div>
    </div>
  )
}

export default AddDiary