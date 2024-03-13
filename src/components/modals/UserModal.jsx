import React from "react";
import styled from "styled-components";
import LoginForm from '../AuthForm/LoginForm';
import RegisterForm from '../AuthForm/RegisterForm';

const UserModal = ({onClose, mode}) => {
  return (
      <Background>
        <Content>
          {mode === "LOGIN" ? <LoginForm onClose={() => onClose()} /> : <RegisterForm onClose={() => onClose()} />}
          {/* <div>
            <form onSubmit={(e) => {e.preventDefault()}}>
              <div>
                <h1>회원가입</h1>
              </div>
              <div>
                <div>Email: <input type="email" />&nbsp;<button>중복검사</button></div>
                <div>Password: <input type="password" />&nbsp;<button>일치검사</button></div>
                <div><input type="password" disabled /></div>
              </div>
              <div>
                <button>회원가입</button>
                <button onClick={() => onClose}>취소</button>
              </div>
            </form>
          </div> */}
         </ Content>
         {/* 실제로 나올 것은 이 Content 부분 */}
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