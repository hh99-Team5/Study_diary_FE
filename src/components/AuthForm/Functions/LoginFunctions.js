import axios from "axios";
//  로그인 폼

// 1. 로그인 api 호출
export const userLoginCall = async(user) => {
    try {
        const response = await axios.post('http://hanghae-5.ap-northeast-2.elasticbeanstalk.com/api/v1/members/signin',
    user)
        if(response.status === 200){
            return response
        }
    } catch (error) {
        return error.response
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