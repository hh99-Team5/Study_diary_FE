import React from "react";
import styled from "styled-components";
import { Button } from "../../pages/DiaryDetail/styles";

const AlertModal = ({ onClose, message }) => {
  return (
    <Background>
      <Content>
        <Separator />
        <TextContainer>
          <h1>{message}</h1>
        </TextContainer>
        <ButtonContainer>
          <Button border onClick={onClose}>닫기</Button>
        </ButtonContainer>
      </Content>
    </Background>
  );
};

export default AlertModal;

//아래는 styled-components를 통한 스타일링
const Background = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.5);
`;

const Content = styled.div`
  height: 200px;
  width: 300px;
  position: relative;
  background: white;
  border-radius: 20px;
  padding: 20px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Separator = styled.div`
  width: 100%;
  height: 5px;
  background-color: transparent;
  border-bottom: 1px dashed #ced4da;
`;

const TextContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 0.85;
`;

const ButtonContainer = styled.div`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
`;