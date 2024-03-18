import { AiTwotoneHome } from "react-icons/ai";
import { useLocation, useNavigate } from "react-router";
import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { logoutUser } from "../redux/modules/userSlice";
import Cookies from "universal-cookie";
import ModalPortal from "./modals/Portal";
import ListModal from "./modals/ListModal";
import { useSwitch } from "../hooks/userHooks";
import { useEffect } from "react";
import 
    {
        HeaderBorder,
        StyledSpan,
        HeaderDiv
    } from "./AuthForm/styles";

    
const Header = () => {
    const [userData, setUser] = useState({});
    const nav = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const cookie = new Cookies();
    const userToken = cookie.get('jwtToken');
    const {state, handleState} = useSwitch();

    const fetchData = async() => {     
        try {
            const response = await axios.get(`https://www.openmpy.com/api/v1/members`, {headers: {Authorization: userToken}});
            console.log("response.data.data = ", response.data.data);
            setUser(response.data.data)
        } catch (error) {
            console.log("error = ", error)
        }
    }
    // const {isLoading, isError, data:userData} = useQuery("user", fetchData)
 


    useEffect(() => {
        fetchData();
    }, [])
    // 홈 경로인 경우 null 반환
    if (location.pathname === "/") {
        return null;
    }
    console.log("header data = ", userData);

    //로그아웃함수
    const onLogoutHandler = () => {
        cookie.remove("jwtToken");
        dispatch(logoutUser());
        alert("로그아웃 되었습니다.");
        nav("/");
    }

    return (
        <div>
            <HeaderDiv>
                <AiTwotoneHome size={30} style={{ cursor: 'pointer' }} onClick={() => { nav("/diaryList") }} />
                    {!userToken ? 
                    <div>
                        <StyledSpan onClick={() => nav("/")} >로그인 하기</StyledSpan> 
                    </div> 
                    : 
                    <div>
                        {location.pathname === `/${userData.id}` ? <StyledSpan onClick={() => handleState()}>내가 쓴 글 확인</StyledSpan> : <StyledSpan onClick={() => nav(`/${userData.id}`)}>마이페이지</StyledSpan>}
                        
                        <StyledSpan onClick={() => onLogoutHandler()}>로그아웃</StyledSpan>
                    </div>}
            </HeaderDiv>
            <HeaderBorder />
            <ModalPortal> 
                {state ?  <ListModal onClose={handleState} /> : null }
            </ModalPortal>

        </div>
    )

}

export default Header;
