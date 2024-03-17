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
import AlertModal from '../../components/modals/AlertModal';

const Main = () => {
    const user = useSelector((state) => state.user.value);
    const navigate = useNavigate();
    const cookie = new Cookies();
    const jwtToken = cookie.get('jwtToken')
    
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [modalMessage, setModalMessage] = useState("");

    console.log("redux user = ", user);
    useEffect(() => {
        if(jwtToken){
            setModalMessage("이미 로그인 된 유저입니다");
            setShowErrorModal(true);
        }
    }, [])
    const { state: modalOn, handleState: handleModal } = useSwitch();
    const [mode, setMode] = useState(null);
    const onModalHandler = (mod) => {
        setMode(mod);
        handleModal();
    }

    const closeModal = () => {
        setShowErrorModal(false);
        navigate("/diaryList");
    };

    return (
        <Wrapper>
            <Container>
                <Icon color={"#3a75ed"}>
                    <FontAwesomeIcon style={{width: "90%", height: "90%"}} icon={faUserCircle} size="3x"/>
                </Icon>
                <SelectArea>
                    <LargeButton color={"#3a75ed"} onClick={() => onModalHandler("LOGIN")}>로그인</LargeButton>
                    <LargeButton color={"#3a75ed"} onClick={() => onModalHandler("REGISTER")}>회원가입</LargeButton>
                    <LargeButton color={"#3a75ed"} onClick={() => navigate('/diaryList')}>비회원</LargeButton>
                </SelectArea>
                <ModalPortal>
                    {modalOn && <UserModal mode={mode} onClose={handleModal} />}
                </ModalPortal>
            </Container>

            {showErrorModal && <AlertModal onClose={closeModal} message={modalMessage} />}
        </Wrapper>
    )
}

export default Main