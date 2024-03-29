import React,{ useContext } from 'react';
import { useInput } from '../../hooks/userHooks';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { userLoginCall, userLoginValidation } from './Functions/LoginFunctions';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../redux/modules/userSlice';
import { Button } from '../styles';
import 
    { 
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

const LoginForm = ({ onClose }) => {
    const { value: username, handler: onEmailChangeHandler, ref: usernameRef } = useInput();
    const { value: password, handler: onPasswordChangeHandler, ref: passwordRef } = useInput();
    const [user, setUser] = useState({});
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [showErrorModal, setShowErrorModal] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    
    useEffect(() => {
        usernameRef.current.focus();
        if (user.username && user.password) {
            userLogin();
        }
    }, [user]);

    const userLogin = async () => {
        try {
            const response = await userLoginCall(user);
            setModalMessage(response.data.message);
            setShowErrorModal(true);
            const userData = { email: user.username, position: "member" };
            if (response.status === 200) {
                dispatch(loginUser(userData));
                navigate("/diaryList");
            }
        } catch (error) {
            setModalMessage("로그인 실패!");
            setShowErrorModal(true);
        }
    }

    const onSubmitHandler = async () => {
        if (userLoginValidation(username, password, setModalMessage, setShowErrorModal)) {
            setUser({ username, password });
        } else {
            return;
        }
    }

    const closeModal = () => {
        setShowErrorModal(false);
    };

    return (
        <Wrapper>
            <Form onSubmit={(e) => e.preventDefault()}>
                <FormTitle>
                    <h1>로그인</h1>
                </FormTitle>
                <FormContent>
                    <FormContentElement>
                        <FormFactor>Email</FormFactor>
                        <Input ref={usernameRef} type="email" onChange={onEmailChangeHandler} value={username} />
                    </FormContentElement>
                    <FormContentElement>
                        <FormFactor>Password </FormFactor>
                        <Input ref={passwordRef} type="password" onChange={onPasswordChangeHandler} value={password} />
                    </FormContentElement>
                </FormContent>
                <FormButtonArea>
                    <Button onClick={() => onSubmitHandler()}>로그인</Button>
                    <Button onClick={onClose}>취소</Button>
                </FormButtonArea>
            </Form>

            {showErrorModal && <AlertModal onClose={closeModal} message={modalMessage} />}
        </Wrapper>
    );
}

export default LoginForm;
