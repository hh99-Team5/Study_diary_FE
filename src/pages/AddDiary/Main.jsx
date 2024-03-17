import React from 'react'
import { useInput, useSwitch } from '../../hooks/userHooks'
import Cookies from 'universal-cookie';
import { useState, useEffect } from 'react';
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
  MiddleText
} from './styles';
import { ButtonArea, Button } from '../DiaryDetail/styles'
import AlertModal from '../../components/modals/AlertModal';


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

  // 모달 관련 선언
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  useEffect(() => {
    console.log("userToken = ", userToken);
    if (!userToken) {
      return <AlertModal onClose={() => navigate("/")} message="로그인이 필요한 서비스입니다." />;
    }
  }, [])

  // 일지 추가 mutation
  const addDiaryMutation = useMutation(
    async (newData) => {
      try {
        const response = await axios.post("https://www.openmpy.com/api/v1/articles", newData,
          { headers: { 'Authorization': `Bearer ${userToken}` } });
        console.log("response = ", response);
        setModalMessage("등록에 성공했습니다.");
        setShowSuccessModal(true);
        queryClient.invalidateQueries("diaries");
      } catch (error) {
        console.log("Mutation error = ", error);
        setModalMessage("등록에 실패했습니다.");
        setShowErrorModal(true);
      }
    }
  );

  const closeModal = () => {
    setShowErrorModal(false);
    if (showSuccessModal) {
      setShowSuccessModal(false);
      navigate("/diaryList");
    }
  };

  // 일지저장하기
  const addDiary = async () => {
    const newDiary = { title, contents };
    console.log("newDiary = ", newDiary);
    await addDiaryMutation.mutate(newDiary);
  };

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

      {showSuccessModal && <AlertModal onClose={closeModal} message={modalMessage} />}
      {showErrorModal && <AlertModal onClose={closeModal} message={modalMessage} />}
    </MainContainer>
  )
}

export default AddDiary