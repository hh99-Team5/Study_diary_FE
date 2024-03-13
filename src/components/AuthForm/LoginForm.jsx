import React from 'react'
import { useInput } from '../../hooks/userHooks';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';

const LoginForm = ({onClose}) => {

    const {value: username, handler: onEmailChangeHandler, ref:usernameRef} = useInput();
    const {value: password, handler: onPasswordChangeHandler, ref:passwordRef} = useInput();
    const[ user, setUser ] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        usernameRef.current.focus();
        console.log(user);
        if(user.username && user.password){
            userLogin();
        }
    }, [user]);

    const userLogin = async () => {
        try {
            const response = await axios.post('http://hanghae-5.ap-northeast-2.elasticbeanstalk.com/api/v1/members/signin',
        user)
            console.log("login user = ",response);
            if(response.status === 200){
                navigate("/diaryList");
                alert(response.data.message);
            }
        } catch (error) {
            alert(error.response.data.message)
        }
    }
    
    const onSubmitHandler =  async() => {
        if(!username) {
            alert("이메일을 입력해주세요");
            return
        }
        if(!password) {
            alert("비밀번호를 입력해주세요");
            return
        }

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