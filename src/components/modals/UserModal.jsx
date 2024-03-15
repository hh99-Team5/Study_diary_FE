import React from "react";
import styled from "styled-components";
import LoginForm from '../AuthForm/LoginForm';
import RegisterForm from '../AuthForm/RegisterForm';
import { Background, Content } from "./styles";

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