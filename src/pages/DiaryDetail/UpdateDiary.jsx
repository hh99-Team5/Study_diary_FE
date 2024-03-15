import axios from "axios";

export const diaryUpdateMode = async(userToken) => {
    try {
        const response = await axios.get('https://www.openmpy.com/api/v1/members',
        { headers:{'Authorization': `Bearer ${userToken}`}})
        return response.data.data
    } catch (error) {
        return null;
    }
}