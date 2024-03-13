import React from "react";
import styled from "styled-components";
import LoginForm from '../AuthForm/LoginForm';
import RegisterForm from '../AuthForm/RegisterForm';

const UserModal = ({onClose, mode}) => {
  return (
      <Background>
        <Content>
          {mode === "LOGIN" ? <LoginForm onClose={() => onClose()} /> : <RegisterForm onClose={() => onClose()} />}
         </Content>
      </Background>
  );
};

export default UserModal;

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
  text-align: center;
  background-color: rgba(0,0,0,0.2);
`;

const Content = styled.div`
  height: 80%;
  width: 80%;
  position: relative;
  /* overflow: scroll; */
  background: white;
`;