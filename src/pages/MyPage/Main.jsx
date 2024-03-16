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


const Mypage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const cookie = new Cookies();
    const jwtToken = cookie.get("jwtToken");
    const [logUser, setUser] = useState({});
    const [newPassword1, setNewPassword1] = useState('');



    // const [newPassword2, setNewPassword2] = useState('');
    // const [isSamePw, setIsSamePw] = useState('false');
    // const [checkText, setCheckText] = useState('');
    
    if(!jwtToken) {
        alert("로그인이 필요합니다");
        navigate("diaryList")
    }
    

    const searchUser = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/v1/members`,
                {
                    headers: {
                        'Authorization': `${jwtToken}`,
                        'Content-Type': 'application/json'
                    }
                });
                console.log("id = ", +id);
                console.log("response.data.data.id = ", response.data.data.id);
            if(+id !== response.data.data.id) {
                navigate("/diaryList");
                alert("접근이 불가능 합니다");
            }
            setUser(response.data.data);
        } catch (error) {
            console.error('Error fetching liked status:', error);
        }
    };

    // 무한 리렌더링 방지 > 추후에 memoization 사용해보기
    useEffect(() => {
        searchUser()
    }, [])
    

    // const oncheckPw = async () => {
    //     if (newPassword1 !== newPassword2) {
    //         setCheckText('비밀번호가 일치하지 않습니다');
    //         return;
    //     } else {
    //         setCheckText('비밀번호가 일치합니다.');
    //         setIsSamePw(true)
    //     }
    // }

    // const handleChangePassword = async () => {
    //     try {
    //         await axios.put(`${process.env.REACT_APP_SERVER_URL}/api/v1/members`,
    //             { password: newPassword1 },
    //             { headers: { Authorization: `${jwtToken}` } }
    //         );
    //         window.alert('비밀번호가 정상적으로 변경되었습니다.');
    //     } catch (error) {
    //         console.error('Error changing password:', error);
    //     }
    // };

    return (
      <Wrapper>
      <Container>
          <Icon>
              <FontAwesomeIcon style={{width: "90%", height: "90%"}} icon={faUserCircle} size="3x" color="black" />
          </Icon>
          <SelectArea>
              <LoginInfo>아이디: &nbsp; {logUser.email}</LoginInfo>
              <LoginInfo>기존비밀번호: &nbsp;
              <Input type="password" value={newPassword1} onChange={(e) => setNewPassword1(e.target.value)}
                /></LoginInfo>
              <LoginInfo>새 비밀번호: &nbsp;
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