import axios from "axios";
import Cookies from "universal-cookie";
import { jwtDecode } from "jwt-decode";
//  로그인 폼

// 1. 로그인 api 호출
export const userLoginCall = async (user) => {
    const cookie = new Cookies();
    try {
        const response = await axios.post('https://www.openmpy.com/api/v1/members/signin',
        user);
        const jwtToken = response.headers.authorization;
        cookie.set('jwtToken', jwtToken, {path: "/", maxAge: 3600});
        cookie.set("id", jwtDecode(jwtToken).id, {path: "/", maxAge: 3600})
        console.log(response);
        return response;
    } catch (error) {
        console.error('로그인 에러:', error);
        cookie.remove('jwtToken');
        throw error; // 에러를 상위로 전파
    }
}
// 2. 유효성검사
export const userLoginValidation = async(username, password) => {
    if(!username) {
        alert("이메일을 입력해주세요");
        return false
    }
    if(!password) {
        alert("비밀번호를 입력해주세요");
        return false
    }  
    return true
}