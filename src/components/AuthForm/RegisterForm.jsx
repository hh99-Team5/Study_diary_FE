import React from 'react'
import { useState } from 'react';
import { useInput } from '../../hooks/userHooks';
import { emailCheckInvalidation, oncheckPwInvalidation, onSubmitInvalidation } from './Functions/RegisterFunctions';
import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useRef } from 'react';
import { Button } from '../styles';
import {
Input,
FormFactor,
FormContentElement,
Wrapper,
Form,
FormTitle,
FormContent,
FormButtonArea,
}
    from './styles';
import AlertModal from '../../components/modals/AlertModal';

function RegisterForm({ onClose }) {
    const [user, setUser] = useState({});
    const [duplicate, setDuplicate] = useState(false);
    const [pwCheck, setPwCheck] = useState(false);
    const [checkText, setCheckText] = useState('');
    const pwTextRef = useRef(null);

    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const navigate = useNavigate();

    const { value: email, handler: onEmailChangeHandler, ref: emailRef } = useInput();
    const { value: password, handler: onPasswordChangeHandler, ref: passwordRef } = useInput();
    const { value: checkPw, handler: oncheckPwHandler, ref: checkPwref } = useInput();

    useEffect(() => {
        emailRef.current.focus();
        console.log(user.email);
        if (user.email) {
            userReposit();
        }
    }, [user]);

    const userReposit = async () => {
        try {
            const response = await axios.post('https://www.openmpy.com/api/v1/members/signup',
                user);
            console.log("login user = ", response);
            if (response.status === 201) {
                setModalMessage("회원가입 성공!");
                setShowSuccessModal(true);
            }
        } catch (error) {
            setModalMessage(error.response.data.message);
            setShowErrorModal(true);
        }
    }

    const onSubmitHandler = async () => {
        const response = await onSubmitInvalidation
            (email, emailRef,
                password, passwordRef,
                duplicate,
                pwCheck, checkPwref,
                setModalMessage, setShowErrorModal);
        if (response) setUser(response);
    }

    const emailCheck = async () => {
        const response = await emailCheckInvalidation(email, setModalMessage, setShowErrorModal);
        if (!response) return

        setDuplicate(response.data.isExist);
        const message = response.data.data.isExist ? "이미 존재하는 이메일 입니다." : "사용 가능한 이메일 입니다.";
        setModalMessage(message);
        setShowErrorModal(true);
    }

    const oncheckPw = () => {
        const response = oncheckPwInvalidation(password, checkPw, pwTextRef, setModalMessage, setShowErrorModal);
        setCheckText(response.text);
        setPwCheck(response.boolean);
    }

    const closeModal = () => {
        setShowErrorModal(false);
        if (showSuccessModal) {
            setShowSuccessModal(false);
            onClose();
            navigate("/");
        }
    };

    return (
        <Wrapper>
            <Form onSubmit={(e) => { e.preventDefault() }}>
                <FormTitle>
                    <h1>회원가입</h1>
                </FormTitle>
                <FormContent>
                    <FormContentElement>
                        <FormFactor>Email</FormFactor>
                        <Input ref={emailRef} type='email' onChange={onEmailChangeHandler} value={email} />
                        <Button onClick={() => emailCheck()}>중복검사</Button>
                    </FormContentElement>
                    <FormContentElement>
                        <FormFactor>Password</FormFactor>
                        <Input ref={passwordRef} type="password" onChange={onPasswordChangeHandler} value={password} />
                        <Button onClick={() => oncheckPw()}>일치검사</Button>
                    </FormContentElement>
                    <FormContentElement>
                        <FormFactor>비밀번호 재입력</FormFactor>
                        <Input ref={checkPwref} type="password" onChange={oncheckPwHandler} value={checkPw} />
                        <div></div>
                    </FormContentElement>
                </FormContent>
                <FormFactor ref={pwTextRef}>{checkText}</FormFactor>
                <FormButtonArea>
                    <Button onClick={() => onSubmitHandler()}>회원가입</Button>
                    <Button onClick={onClose}>취소</Button>
                </FormButtonArea>
            </Form>

            {showSuccessModal && <AlertModal onClose={closeModal} message={modalMessage} />}
            {showErrorModal && <AlertModal onClose={closeModal} message={modalMessage} />}
        </Wrapper>
    )
}

export default RegisterForm