import axios from "axios";

export const emailCheckInvalidation = async (email, setModalMessage, setShowErrorModal) => {
    if (!email) {
        setModalMessage("이메일을 입력해주세요");
        setShowErrorModal(true);
        return false;
    }
    try {
        return await axios.get(`https://www.openmpy.com/api/v1/members/email-check?email=${email}`);
    } catch (error) {
        console.log("duplicate error = ", error);
    }
};

export const oncheckPwInvalidation = (password, checkPw, pwTextRef, setModalMessage, setShowErrorModal) => {
    if (!password) {
        setModalMessage("비밀번호를 입력해주세요");
        setShowErrorModal(true);
        return "";
    }
    if (password === checkPw) {
        pwTextRef.current.style.color = "green";
        let result = { text: "비밀번호가 일치 합니다.", boolean: true };
        return result;
    } else {
        pwTextRef.current.style.color = "red";
        let result = { text: "비밀번호가 일치 하지 않습니다.", boolean: false };
        return result;
    }
};

export const onSubmitInvalidation = async (
    email,
    emailRef,
    password,
    passwordRef,
    duplicate,
    pwCheck,
    checkPwref,
    setModalMessage,
    setShowErrorModal
) => {
    if (!email) {
        setModalMessage("이메일을 입력해주세요");
        setShowErrorModal(true);
        emailRef.current.focus();
        return false;
    }
    if (!password) {
        setModalMessage("비밀번호를 입력해주세요");
        setShowErrorModal(true);
        passwordRef.current.focus();
        return false;
    }
    if (duplicate) {
        setModalMessage("중복된 이메일 입니다.");
        setShowErrorModal(true);
        emailRef.current.focus();
        return false;
    }
    if (!pwCheck) {
        setModalMessage("비밀 번호 일치여부를 확인해주세요");
        setShowErrorModal(true);
        checkPwref.current.focus();
        return false;
    }
    return { email, password };
};