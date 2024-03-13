import React from 'react'
import { useState } from 'react';
import { useInput } from '../../hooks/userHooks';
import axios from 'axios';
import { useEffect } from 'react';
import { useRef } from 'react';

function RegisterForm({onClose}) {
    const [ user, setUser ] = useState({});
    const [ duplicate, setDuplicate ] = useState(false);
    const [ pwCheck, setPwCheck ] = useState(false);
    const [ checkText, setCheckText ] = useState('');
    const pwTextRef = useRef(null);

    const {value: email, handler: onEmailChangeHandler, ref:emailRef} = useInput();
    const {value: password, handler: onPasswordChangeHandler, ref:passwordRef} = useInput();
    const {value: checkPw, handler: oncheckPwHandler, ref:checkPwref} = useInput();

    useEffect(() => {
        emailRef.current.focus();
        console.log(user.email);
        if(user.email){
            userReposit();
        }
    }, [user]);

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
        if(!email) {
            alert("이메일을 입력해주세요");
            emailRef.current.focus();
            return
        }
        if(!password) {
            alert("비밀번호를 입력해주세요");
            passwordRef.current.focus();
            return
        }
        if(duplicate) {
            alert("중복된 이메일 입니다.");
            emailRef.current.focus();
            return
        }
        if(!pwCheck) {
            alert("비밀 번호 일치여부를 확인해주세요");
            checkPwref.current.focus();
            return
        }
        setUser({email, password});        
    }


    const emailCheck = async () => {
        if(!email){
            alert("이메일을 입력해주세요");
            return
        }
        try {
            const response = await axios.get(`http://hanghae-5.ap-northeast-2.elasticbeanstalk.com/api/v1/members/email-check?email=${email}`);
            console.log("duplicate response = ", response.data.data.isExist);
            if(response.data.data.isExist){ 
                setDuplicate(true)
                alert("이미 존재하는 이메일 입니다.")
            } else{ 
                setDuplicate(false)
                alert("사용 가능한 이메일 입니다.") 
            }
            
        } catch (error) {
            console.log("duplicate error = ", error);
        }
    }

    const oncheckPw = () => {
        if(!password){
            alert("비밀번호를 입력해주세요");
            setCheckText("")
            return
        }
        if(password === checkPw) {
            setPwCheck(true);
            pwTextRef.current.style.color = "green";
            setCheckText("비밀번호가 일치 합니다.")
        } else {
            setPwCheck(false);
            pwTextRef.current.style.color = "red"; // 
            setCheckText("비밀번호가 일치하지 않습니다.")
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
                <div>Email: <input ref={emailRef} type='email' onChange={onEmailChangeHandler} value={email} />&nbsp;
                <button onClick={() => emailCheck()}>중복검사</button></div>
                <div>Password: <input ref={passwordRef} type="password" onChange={onPasswordChangeHandler} value={password} />&nbsp;
                <button onClick={() => oncheckPw()}>일치검사</button></div>
                <div><p ref={pwTextRef}>{checkText}</p></div>
                <div><input ref={checkPwref} type="password" onChange={oncheckPwHandler} value={checkPw}/></div>
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