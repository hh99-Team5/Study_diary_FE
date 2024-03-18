import axios from "axios";
import { emailDuplicateCheck } from "../../../service/MemberService";

export const emailCheckInvalidation = async (email, setModalMessage, setShowErrorModal) => {
    const emailPattern = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;

    if (!email) {
        setModalMessage("이메일을 입력해주세요");
        setShowErrorModal(true);
        return false;
    }

    if(!emailPattern.test(email)){
        setModalMessage("올바른 이메일 주소를 입력해주세요.");
        setShowErrorModal(true);
        return;
    }
    try {
        return await emailDuplicateCheck(email);
    } catch (error) {
        console.log("duplicate error = ", error);
    }
};

export const oncheckPwInvalidation = (password, checkPw) => {
    if (password.length < 5) {
        return { text: "비밀번호는 5자 이상이어야 합니다.", boolean: false };
    }
    if (password === checkPw) {
        console.log("비밀번호가 일치합니다.");
        return { text: "비밀번호가 일치합니다.", boolean: true };
    } else {
        return { text: "비밀번호가 일치하지 않습니다.", boolean: false };
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
        checkPwref.current.focus();
        return false;
    }
    return { email, password };
};