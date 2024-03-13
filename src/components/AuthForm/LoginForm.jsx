import React from 'react'
import { useInput } from '../../hooks/userHooks';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';

function LoginForm({onClose}) {
    const[ user, setUser ] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        usernameRef.current.focus();
        console.log(user);
        if(user){
            userLogin();
        }
    }, [user]);

    const {value: username, handler: onEmailChangeHandler, ref:usernameRef} = useInput();
    const {value: password, handler: onPasswordChangeHandler, ref:passwordRef} = useInput();
    
    const userLogin = async () => {
        try {
            const response = await axios.post('http://hanghae-5.ap-northeast-2.elasticbeanstalk.com/api/v1/members/signin',
        user)
            console.log("login user = ",response);
            if(response.status === 200){
                navigate("/diaryList");
                alert("로그인 성공!");
            }
        } catch (error) {
            console.log("error = ", error.response.data.email);
        }
    }
    
    const onSubmitHandler =  async() => {
        setUser({username, password});        
    }

  return (
    <div>
        <div>
            <form onSubmit={(e) => e.preventDefault()}>
            <div>
                <h1>로그인</h1>
            </div>
            <div>
                <div>Email: <input ref={usernameRef} type="email" onChange={onEmailChangeHandler} value={username}/></div>
                
                <div>Password: <input ref={passwordRef} type="password" onChange={onPasswordChangeHandler} value={password}/></div>
                
            </div>
            <div>
                <button onClick={() => onSubmitHandler()}>로그인</button>
                <button onClick={onClose}>취소</button>
            </div>
            </form>
        </div>
    </div>
  )
}

export default LoginForm