import React from 'react'
import UserModal from '../../components/modals/UserModal'
import ModalPortal from '../../components/modals/Portal'
import useSwitch from '../../hooks/useSwitch'
import { useState } from 'react'

function Main() {
    const {state:modalOn, handleState:handleModal} = useSwitch();
    const [mode, setMode] = useState(null);
    const onModalHandler = (mod) => {
        setMode(mod);
        handleModal();
    }
    return (
    <div>
        <button onClick={() => onModalHandler("LOGIN")}>로그인</button>
        <button onClick={() => onModalHandler("REGISTER")}>회원가입</button>
        <ModalPortal>
            {modalOn && <UserModal mode={mode} onClose={handleModal} />}
        </ModalPortal>
        <button>비회원</button>
    </div>
  )
}

export default Main