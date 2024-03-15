import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import Cookies from 'universal-cookie'
import { useEffect } from 'react'
import UserModal from '../../components/modals/UserModal'
import ModalPortal from '../../components/modals/Portal'
import { useSwitch } from '../../hooks/userHooks'
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import 
    { 
        LargeButton, 
        Icon, 
        Wrapper,
        SelectArea,
        Container 
    } from '../../components/styles'


const Main = () => {
    const user = useSelector((state) => state.user.value);
    const nav = useNavigate();
    const cookie = new Cookies();
    const jwtToken = cookie.get('jwtToken')
    console.log("redux user = ", user);
    useEffect(() => {
        if(jwtToken){
            alert('이미 로그인 된 유저입니다.')
            nav("/diaryList")
        }
    }, [])

    
    const { state: modalOn, handleState: handleModal } = useSwitch();
    const [mode, setMode] = useState(null);
    const onModalHandler = (mod) => {
        setMode(mod);
        handleModal();
    }
    return (
        <Wrapper>
            <Container>
                <Icon>
                    <FontAwesomeIcon style={{width: "90%", height: "90%"}} icon={faUserCircle} size="3x" color="black" />
                </Icon>
                <SelectArea>
                    <LargeButton onClick={() => onModalHandler("LOGIN")}>로그인</LargeButton>
                    <LargeButton onClick={() => onModalHandler("REGISTER")}>회원가입</LargeButton>
                    <LargeButton onClick={() => nav('/diaryList')}>비회원</LargeButton>
                </SelectArea>
                <ModalPortal>
                    {modalOn && <UserModal mode={mode} onClose={handleModal} />}
                </ModalPortal>
            </Container>
        </Wrapper>
        
    )
}

export default Main