import React from 'react'
import { useState } from 'react';
import { useInput } from '../../hooks/userHooks';
import axios from 'axios';
import { useEffect } from 'react';
import { useRef } from 'react';

function RegisterForm({onClose}) {
    const [ user, setUser ] = useState({});
    const checkPwref = useRef(null);
    const [duplicate, setDuplicate] = useState(false);
    const {value: email, handler: onEmailChangeHandler, ref:emailRef} = useInput();
    const {value: password, handler: onPasswordChangeHandler, ref:passwordRef} = useInput();

    useEffect(() => {
        
        emailRef.current.focus();
        if(duplicate) {
            alert("중복된 이메일 입니다.")
            emailRef.current.focus();
            return
        }

        console.log(user.email);
        if(user.email){
            userReposit();
        }
    }, [user]);

    password && password.length ?  checkPwref.current.disabled=false :  checkPwref.current.disabled=true;

    const userReposit = async () => {
        try {
            const response = await axios.post('http://hanghae-5.ap-northeast-2.elasticbeanstalk.com/api/v1/members/signup',
        user);
            console.log("login user = ",response);
            if(response.status === 201){
                onClose();
                alert("회원가입 성공!");
            }
        } catch (error) {
            alert(error.response.data.message);
        }
    }
    const onSubmitHandler =  async() => {
        setUser({email, password});        
    }

    const emailCheck = async () => {
        try {
            const response = await axios.get(`http://hanghae-5.ap-northeast-2.elasticbeanstalk.com/api/v1/members/email-check?email=${email}`);
            console.log("duplicate response = ", response.data.data.isExist);
            if(response.data.data.isExist){ 
                setDuplicate(true)
                alert("중복된 이메일 입니다.")
            } else{ 
                setDuplicate(false)
                alert("사용 가능한 이메일 입니다.") 
            }
            
        } catch (error) {
            console.log("duplicate error = ", error);
        }
    }

    return (
    <div>
        <div>
            <form onSubmit={(e) => {e.preventDefault()}}>
            <div>
                <h1>회원가입</h1>
            </div>
            <div>
                <div>Email: <input ref={emailRef} type='email' onChange={onEmailChangeHandler} value={email} />&nbsp;<button onClick={() => emailCheck()}>중복검사</button></div>
                <div>Password: <input ref={passwordRef} type="password" onChange={onPasswordChangeHandler} value={password} />&nbsp;<button>일치검사</button></div>
                <div><input ref={checkPwref} type="password" disabled /></div>
            </div>
            <div>
                <button onClick={() => onSubmitHandler()}>회원가입</button>
                <button onClick={onClose}>취소</button>
            </div>
            </form>
        </div>
    </div>
  )
}

export default RegisterForm