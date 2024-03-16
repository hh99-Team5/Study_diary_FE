import { AiTwotoneHome } from "react-icons/ai";
import { useLocation, useNavigate } from "react-router";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { logoutUser } from "../redux/modules/userSlice";
import Cookies from "universal-cookie";
import axios from "axios";
import { useEffect, useState } from "react";
import ModalPortal from "./modals/Portal";
import ListModal from "./modals/ListModal";
import { useSwitch } from "../hooks/userHooks";

const Header = () => {
    const nav = useNavigate();
    const location = useLocation();
    const cookie = new Cookies();
    const dispatch = useDispatch();
    const [loginUser, setUser] = useState({})
    const userToken = cookie.get('jwtToken');
    const {state, handleState} = useSwitch();

    useEffect(() => {
        searchUser();
        
    },[location.pathname])

    const searchUser = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/v1/members`,
                {
                    headers: {
                        'Authorization': `${userToken}`,
                        'Content-Type': 'application/json'
                    }
                });
                setUser(response.data.data);
                console.log("Header loginUser =", loginUser)
            return response.data.data
        } catch (error) {
            console.error('Error fetching liked status:', error);
        }
    };
    
    if(userToken){
        
    }
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
                        {location.pathname === `/${loginUser.id}` ? <StyledSpan onClick={() => handleState()}>내가 쓴 글 확인</StyledSpan> : <StyledSpan onClick={() => nav(`/${loginUser.id}`)}>마이페이지</StyledSpan>}
                        
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

const HeaderBorder = styled.div`
    width: 100%;
    height: 3px;
    border-bottom: 1px solid gray;
    `

const StyledSpan = styled.span`
    cursor: pointer;
    margin-left: 10px;
    `

const HeaderDiv = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 0 10px;
`