import { AiTwotoneHome } from "react-icons/ai";
import { useLocation, useNavigate } from "react-router";

import { useDispatch } from "react-redux";
import { logoutUser } from "../redux/modules/userSlice";
import Cookies from "universal-cookie";
import { useEffect } from "react";
import ModalPortal from "./modals/Portal";
import ListModal from "./modals/ListModal";
import { useSwitch } from "../hooks/userHooks";
import { useContext } from "react";
import { UserContext } from "../App";
import 
    {
        HeaderBorder,
        StyledSpan,
        HeaderDiv
    } from "./AuthForm/styles";

    
const Header = () => {
    const nav = useNavigate();
    const location = useLocation();
    const cookie = new Cookies();
    const dispatch = useDispatch();
    const userToken = cookie.get('jwtToken');
    const {state, handleState} = useSwitch();
    const {userInfo} = useContext(UserContext);
    useEffect(() => {
    // searchUser();
    },[location.pathname])

    // 홈 경로인 경우 null 반환
    if (location.pathname === "/") {
        return null;
    }

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
                        {location.pathname === `/${userInfo.id}` ? <StyledSpan onClick={() => handleState()}>내가 쓴 글 확인</StyledSpan> : <StyledSpan onClick={() => nav(`/${userInfo.id}`)}>마이페이지</StyledSpan>}
                        
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
