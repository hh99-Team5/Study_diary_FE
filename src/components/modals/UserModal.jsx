import React from "react";
import styled from "styled-components";

const UserModal = ({onClose}) => {

  return (
      <Background>
        <Content>
            <h1>Modal입니다.</h1>
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
`;

const Content = styled.div`
  height: 100%;
  width: 950px;
  margin-top: 70px;
  position: relative;
  overflow: scroll;
  background: #141414;
`;