import axios from "axios";

export const diaryUpdateMode = async(userToken) => {
    try {
        const response = await axios.get('http://hanghae-5.ap-northeast-2.elasticbeanstalk.com/api/v1/members',
        { headers:{'Authorization': `Bearer ${userToken}`}})
        return response.data.data
    } catch (error) {
        return null;
    }
}