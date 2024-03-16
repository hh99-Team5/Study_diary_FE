import axios from 'axios';
import { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router';
import 
    { 
        LargeButton, 
        Icon, 
        Wrapper,
        SelectArea,
        Container 
    } from '../../components/styles'

import { useContext } from 'react';
import { UserContext } from '../../App';

const Mypage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const cookie = new Cookies();
    const jwtToken = cookie.get("jwtToken");
    const [newPassword1, setNewPassword1] = useState('');

    const {userInfo} = useContext(UserContext);
    console.log("myPage useContext = ", userInfo);
    // const [newPassword2, setNewPassword2] = useState('');
    // const [isSamePw, setIsSamePw] = useState('false');
    // const [checkText, setCheckText] = useState('');
    
    if(!jwtToken) {
        alert("접근이 불가능 합니다");
        navigate("/diaryList")
        return
    }

    if(+id !== userInfo.id) {
        alert("접근이 불가능 합니다");
        navigate("/diaryList");
        return
    }


    return (
      <Wrapper>
      <Container>
          <Icon>
              <FontAwesomeIcon style={{width: "90%", height: "90%"}} icon={faUserCircle} size="3x" color="black" />
          </Icon>
          <SelectArea>
              <LoginInfo>아이디: &nbsp; {userInfo.email}</LoginInfo>
              <LoginInfo>새 비밀번호: &nbsp;
              <Input type="password" value={newPassword1} onChange={(e) => setNewPassword1(e.target.value)}
                /></LoginInfo>
              <LoginInfo>재입력: &nbsp;
              <Input type="password" value={newPassword1} onChange={(e) => setNewPassword1(e.target.value)}
                /></LoginInfo>
              <LargeButton>저장하기</LargeButton>
          </SelectArea>
      </Container>
      </Wrapper>
    )
}

const LoginInfo = styled.div`
    display: flex;
    align-items: center;
    width: 300px;
    height: 40px;
`
const Input = styled.input`
  height: 30px;
  padding: 0 10px;
  border-radius: 10px;
`
export default Mypage;