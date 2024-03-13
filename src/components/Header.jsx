import { AiTwotoneHome } from "react-icons/ai";
import { useNavigate } from "react-router";
import styled from "styled-components";


const Header = () => {
    const nav = useNavigate();

    //로그아웃함수

    return (
        <div>
            <HeaderDiv>
                <AiTwotoneHome size={30} style={{ cursor: 'pointer' }} onClick={() => { nav("/") }} />
                <div>
                    <StyledSpan >마이페이지</StyledSpan>
                    <StyledSpan onClick={() => { /* 로그아웃함수 */ }}>로그아웃</StyledSpan>
                </div>
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