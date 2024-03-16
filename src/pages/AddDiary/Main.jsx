import React from 'react'
import { useInput, useSwitch } from '../../hooks/userHooks'
import Cookies from 'universal-cookie';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { useMutation } from 'react-query';
import { useQueryClient } from 'react-query';
import { useSelector } from 'react-redux';
import {
  MainContainer,
  TitleContainer,
  Title,
  StyledTextarea,
  StyledInput,
  TextAreaContainer,
  InputContainer,
  MiddleText } from './styles';
import { ButtonArea, Button } from '../DiaryDetail/styles'


const AddDiary = () => {
  const user = useSelector((state) => state.user.value);
  console.log("redux user = ", user);
  const { value: title, handler: onTitleHandler, ref: titleRef } = useInput();
  const { value: contents, handler: onContentHandler, ref: contentRef } = useInput();
  const cookie = new Cookies();
  const jwtToken = cookie.get('jwtToken');
  const userToken = jwtToken ? jwtToken.replace("Bearer ", "") : "";
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  useEffect(() => {
    console.log("userToken = ", userToken);
    if (!userToken) {
      alert("로그인이 필요한 서비스입니다.");
      navigate("/");
    }
  }, [])

  // 일지 추가 mutation
  const addDiaryMutation = useMutation(
    async (newData) => {
      try {
        const response = await axios.post("http://hanghae-5.ap-northeast-2.elasticbeanstalk.com/api/v1/articles", newData,
          { headers: { 'Authorization': `Bearer ${userToken}` } })
        console.log("response = ", response);
      } catch (error) {
        console.log("Mutation error = ", error)
      }
    }, {
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
  const addDiary = async () => {
    const newDiary = { title, contents };
    console.log("newDiary = ", newDiary);
    await addDiaryMutation.mutate(newDiary);
  }

  return (
    <MainContainer>
      <TextAreaContainer>
        <TitleContainer>
          <Title>✏️  공부 일지 작성</Title>
        </TitleContainer>
          <InputContainer>
            <MiddleText>제목</MiddleText>
            <div><StyledInput ref={titleRef} type="text" value={title} onChange={onTitleHandler} /></div>
          </InputContainer>

          <InputContainer>
            <MiddleText>내용</MiddleText>
            <div><StyledTextarea ref={contentRef} cols="30" rows="10" value={contents} onChange={onContentHandler}></StyledTextarea></div>
          </InputContainer>

          <ButtonArea>
            <Button border onClick={() => addDiary()}>저장</Button>
            <Button border onClick={() => navigate("/diaryList")}>취소</Button>
          </ButtonArea>
      </TextAreaContainer>
    </MainContainer>
  )
}

export default AddDiary