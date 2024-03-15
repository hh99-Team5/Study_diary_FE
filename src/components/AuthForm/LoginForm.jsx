import React from 'react';
import { useInput } from '../../hooks/userHooks';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { userLoginCall, userLoginValidation } from './Functions/LoginFunctions';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../redux/modules/userSlice';


const LoginForm = ({ onClose }) => {
    const { value: username, handler: onEmailChangeHandler, ref: usernameRef } = useInput();
    const { value: password, handler: onPasswordChangeHandler, ref: passwordRef } = useInput();
    const [user, setUser] = useState({});
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    useEffect(() => {
        usernameRef.current.focus();
        if (user.username && user.password) {
            userLogin();
        }
    }, [user]);

    const userLogin = async () => {
        try {
            const response = await userLoginCall(user);
            alert(response.data.message);
            const userData = { email: user.username, position: "member" };
            if (response.status === 200) {
                dispatch(loginUser(userData));
                navigate("/diaryList");
            }
        } catch (error) {
            alert("로그인 실패!");
        }
    }

    const onSubmitHandler = async () => {
        if (userLoginValidation(username, password)) {
            setUser({ username, password });
        } else {
            return;
        }
    }

    return (
        <div>
            <div>
                <form onSubmit={(e) => e.preventDefault()}>
                    <div>
                        <h1>로그인</h1>
                    </div>
                    <div>
                        <div>Email: <input ref={usernameRef} type="email" onChange={onEmailChangeHandler} value={username} /></div>
                        <div>Password: <input ref={passwordRef} type="password" onChange={onPasswordChangeHandler} value={password} /></div>
                    </div>
                    <div>
                        <button onClick={() => onSubmitHandler()}>로그인</button>
                        <button onClick={onClose}>취소</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default LoginForm;
