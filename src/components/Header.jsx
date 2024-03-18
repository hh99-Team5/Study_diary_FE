import Cookies from "universal-cookie";

//  hook
import { useLocation, useNavigate } from "react-router";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSwitch } from "../hooks/userHooks";
import { useEffect } from "react";

// styledComponent
import 
{
    HeaderBorder,
    StyledSpan,
    HeaderDiv
} from "./AuthForm/styles";
import ModalPortal from "./modals/Portal";
import ListModal from "./modals/ListModal";
import { AiTwotoneHome } from "react-icons/ai";

// api

// vaildation api
import { logoutUser } from "../redux/modules/userSlice";
// service api
import { searchMember } from "../service/MemberService";

    
const Header = () => {
    // hook
    const [userData, setUser] = useState({});
    const nav = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const {state, handleState} = useSwitch();
    
    // token
    const cookie = new Cookies();
    const userToken = cookie.get('jwtToken');
    

    // user장보 호출
    const fetchData = async() => {     
        try {
            const response = await searchMember();
            setUser(response.data.data);
        } catch (error) {
            console.log("error = ", error)
        }
    }

    useEffect(() => {
        fetchData();
    }, [location])


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
