import axios from "axios";

export const emailCheckInvalidation = async (email) => {
    if(!email){
        alert("이메일을 입력해주세요");
        return false
    }
    try {
        return await axios.get(`https://www.openmpy.com/api/v1/members/email-check?email=${email}`);        
    } catch (error) {
        console.log("duplicate error = ", error);
    }
}

export const oncheckPwInvalidation = (password, checkPw, pwTextRef) => {
    if(!password){
        alert("비밀번호를 입력해주세요");
        return ""
    }
    if(password === checkPw) {
        pwTextRef.current.style.color = "green";
        let result = {text: "비밀번호가 일치 합니다.", boolean: true};
        return result
    } else {
        pwTextRef.current.style.color = "red"; 
        let result = {text: "비밀번호가 일치 하지 않습니다.", boolean: false};
        return result
    }
}

export const onSubmitInvalidation =  
async(email, emailRef,
    password, passwordRef,
    duplicate,
    pwCheck, checkPwref) => 
    {
    if(!email) {
        alert("이메일을 입력해주세요");
        emailRef.current.focus(); 
        return false
    }
    if(!password) {
        alert("비밀번호를 입력해주세요");
        passwordRef.current.focus();
        return false
    }
    if(duplicate) {
        alert("중복된 이메일 입니다.");
        emailRef.current.focus();
        return false
    }
    if(!pwCheck) {
        alert("비밀 번호 일치여부를 확인해주세요");
        checkPwref.current.focus();
        return false
    }
    return {email, password};
}