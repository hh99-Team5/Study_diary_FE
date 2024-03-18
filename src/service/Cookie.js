import Cookies from "universal-cookie";


export const AuthHeader = () => {
    const cookie = new Cookies();
    const jwtToken = cookie.get('jwtToken')
    const headers = {headers: {Authorization: jwtToken}}

    return headers
}



