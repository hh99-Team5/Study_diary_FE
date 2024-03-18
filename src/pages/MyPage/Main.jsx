import Cookies from 'universal-cookie';

// fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

// styledComponent
import styled from 'styled-components';
import {
    LargeButton,
    Icon,
    Wrapper,
    SelectArea,
    Container
} from '../../components/styles'


// hook
import { useState } from 'react';
import { useContext } from 'react';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router';
import { UserContext } from '../../App';

// api
import {passwordCheck, updateMember } from '../../service/MemberService';



const Mypage = () => {
    // token
    const cookie = new Cookies();
    const jwtToken = cookie.get("jwtToken");

    // hook
    const navigate = useNavigate();
    const { id } = useParams();
    const {userInfo} = useContext(UserContext);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [checkText, setCheckText] = useState('');
    
    // token 확인
    if(!jwtToken) {
        navigate("/diaryList")
        return
    }

    // loginUser 확인
    if(+id != userInfo.id) {
        navigate("/diaryList")
        return
    }

    // password validation
    
    const checkCurrentPassword = async () => {
        try {
            await passwordCheck();
            return true;
        } catch (error) {
            console.error('Error checking current password:', error);
            return false;
        }
    };

    const handleChangePassword = async () => {
        const isCurrentPasswordCorrect = await checkCurrentPassword();
        if (!isCurrentPasswordCorrect) {
            setCheckText('기존 비밀번호가 잘못 입력되었습니다.');
            return;
        }
        try {
            await updateMember();
            setCheckText('비밀번호가 정상적으로 변경되었습니다.');
        } catch (error) {
            console.error('Error changing password:', error);
        }
    };

    const handleSaveButtonClick = () => {
        if (newPassword !== confirmNewPassword) {
            setCheckText('새 비밀번호와 확인이 일치하지 않습니다.');
            return;
        }
        handleChangePassword();
    };

    return (
        <Wrapper>
            <Container>
                <Icon>
                    <FontAwesomeIcon style={{ width: "90%", height: "90%" }} icon={faUserCircle} size="3x" color="black" />
                </Icon>
                <SelectArea>
                    <LoginInfo>아이디: &nbsp; {userInfo.email}</LoginInfo>
                    <LoginInfo>기존비밀번호: &nbsp;
                        <Input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
                    </LoginInfo>
                    <LoginInfo>새 비밀번호: &nbsp;
                        <Input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                    </LoginInfo>
                    <LoginInfo>새 비밀번호 확인: &nbsp;
                        <Input type="password" value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} />
                    </LoginInfo>
                    {checkText && <div>{checkText}</div>}
                    <LargeButton onClick={handleSaveButtonClick}>저장하기</LargeButton>
                </SelectArea>
            </Container>
        </Wrapper>
    );
};

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