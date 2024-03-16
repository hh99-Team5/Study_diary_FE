import { AiTwotoneHome } from "react-icons/ai";
import { useLocation, useNavigate } from "react-router";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { logoutUser } from "../redux/modules/userSlice";
import Cookies from "universal-cookie";
import axios from "axios";

const Header = () => {
    const nav = useNavigate();
    const location = useLocation();
    const cookie = new Cookies();
    const dispatch = useDispatch();

    const userToken = cookie.get('jwtToken');


    const searchUser = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/v1/members`,
                {
                    headers: {
                        'Authorization': `${userToken}`,
                        'Content-Type': 'application/json'
                    }
                });
            console.log("response = ", response.data.data)
            return response
        } catch (error) {
            console.error('Error fetching liked status:', error);
        }
    };
    
    
    if(userToken){
        console.log("searchUser = ", searchUser());
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
                        <StyledSpan >마이페이지</StyledSpan>
                        <StyledSpan onClick={() => onLogoutHandler()}>로그아웃</StyledSpan>
                    </div>}
            </HeaderDiv>
            <HeaderBorder />

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